package de.stoneone.planqk.samples;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.stoneone.planqk.api.ServicePlatformApplicationsApi;
import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.AccessTokenDto;
import de.stoneone.planqk.api.model.ApplicationDto;
import de.stoneone.planqk.api.model.BuildJobDto;
import de.stoneone.planqk.api.model.CreateApplicationRequest;
import de.stoneone.planqk.api.model.CreateInternalSubscriptionRequest;
import de.stoneone.planqk.api.model.ServiceDefinitionDto;
import de.stoneone.planqk.api.model.ServiceDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import de.stoneone.planqk.samples.model.ServiceExecutionDto;
import java.io.File;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServiceExecutionSample {

    private static final Logger log = LoggerFactory.getLogger(ServicePublishSample.class);

    private static final OkHttpClient httpClient = new OkHttpClient();
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        /*
         * Create a managed PlanQK Service and publish it internally
         */
        ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

        String serviceName = "Your service name";
        String type = "MANAGED";
        String quantumBackend = "NONE";
        String description = "Your service description";
        File userCode = new File("Absolute path to the user_code.zip file");
        File apiDefinition = new File("Absolute path to the OpenAPI definition");

        ServiceDto service = servicesApi.createService(serviceName, type, quantumBackend, description, null, null, userCode, apiDefinition);

        // A PlanQK Service consists of a list of ServiceDefinitionDto objects. A service definition represents a certain version of a
        // PlanQK Service. At the moment, there will always be one service definition object in the list. In the future, you will be
        // able to maintain multiple versions of your service.
        ServiceDefinitionDto version = service.getServiceDefinitions().stream().findFirst().orElseThrow();

        waitForServiceToBeCreated(servicesApi, service.getId(), version.getId());

        // Publish the service for internal use (only you can subscribe to it and, for example, execute PlanQK Jobs with it)
        version = servicesApi.publishServiceInternal(service.getId(), version.getId(), null);

        // Internally published services are in lifecycle state "ACCESSIBLE"
        if (version.getLifecycle() != ServiceDefinitionDto.LifecycleEnum.ACCESSIBLE) {
            log.warn("Service could not be published internally");
        }

        /*
         * Create a PlanQK Application
         */
        ServicePlatformApplicationsApi applicationsApi = apiClient.buildClient(ServicePlatformApplicationsApi.class);

        String name = "My Application";
        ApplicationDto application = applicationsApi.createApplication(new CreateApplicationRequest().name(name), null);

        application = applicationsApi.getApplication(application.getId(), null);

        /*
         * Subscribe your application with the internally published service
         */
        CreateInternalSubscriptionRequest subscriptionRequest = new CreateInternalSubscriptionRequest()
            .serviceId(service.getId())
            .applicationId(application.getId());
        applicationsApi.createInternalSubscription(application.getId(), subscriptionRequest, null);

        /*
         * You require an access token to execute a PlanQK Service.
         *
         * This access token must be sent as "Authorization" header in any request of the PlanQK
         * Service API. The header must follow the following template: "Authorization: Bearer <your access token>"
         */
        AccessTokenDto accessToken = applicationsApi.getAccessToken(application.getId(), null);

        /*
         * Each managed PlanQK Service provides three HTTP endpoints as its API (this may differ for "external" PlanQK
         * Services, therefore, check in "Marketplace > Services > Service Details > Technical Specifications" the published API description):
         *
         * (1) "POST /": Executes the service in an asynchronous fashion; returns an execution id
         * (2) "GET /<execution id>": Used to check the status of your execution
         * (3) "GET /<execution id>/result": Used to retrieve the final result for your execution
         *
         * In the following, we use the open source library "OkHttp" to execute HTTP requests. Further, we use Jackson
         * to deserialize the response types to a custom DTO class.
         */

        // Prepare input file containing the "data" and "params" JSON structure:
        File input = new File("Absolute path to your input file, e.g., 'input.json'");

        // Prepare the HTTP payload to trigger an execution
        RequestBody payload = RequestBody.create(input, MediaType.parse("application/json"));

        // Execute the service
        // Note the use of the custom DTO class "ServiceExecutionDto" to represent the response type of the call below
        ServiceExecutionDto execution = executeService(version, payload, accessToken);

        execution = waitForExecutionToBeFinished(version, execution, accessToken);
        log.info("Execution status: {}", execution.getStatus());

        if ("SUCCEEDED".equals(execution.getStatus())) {
            String result = getExecutionResult(version, execution, accessToken);
            log.info("Execution result: {}", result);
        }
    }

    /**
     * Waits up to 5 minutes till the PlanQK Service has been created, otherwise an exception is thrown.
     */
    private static void waitForServiceToBeCreated(ServicePlatformServicesApi serviceApi, UUID serviceId, UUID versionId) throws Exception {
        int timer = 0;
        BuildJobDto build;
        do {
            TimeUnit.SECONDS.sleep(15);

            // Check build status
            build = serviceApi.getBuildStatus(serviceId, versionId, null);

            if ((timer += 15) > 300) {
                throw new RuntimeException("Timeout exceeded waiting for PlanQK Service to be created");
            }
        } while (build.getStatus() == BuildJobDto.StatusEnum.WORKING || build.getStatus() == BuildJobDto.StatusEnum.QUEUED);

        if (build.getStatus() == BuildJobDto.StatusEnum.FAILURE) {
            throw new RuntimeException("Error creating PlanQK Service");
        }
    }

    /**
     * Waits up to 5 minutes for a PlanQK Service execution to finish.
     */
    private static ServiceExecutionDto waitForExecutionToBeFinished(ServiceDefinitionDto version,
                                                                    ServiceExecutionDto execution,
                                                                    AccessTokenDto accessToken) throws Exception {
        int timer = 0;
        ServiceExecutionDto e = execution;
        do {
            TimeUnit.SECONDS.sleep(15);

            // Check execution status
            e = getExecutionStatus(version, e, accessToken);

            if ((timer += 15) > 300) {
                throw new RuntimeException("Timeout exceeded waiting for PlanQK Service execution to be finished");
            }
        } while ("PENDING".equals(execution.getStatus()) || "RUNNING".equals(execution.getStatus()) || "UNKNOWN".equals(execution.getStatus()));

        return e;
    }

    private static ServiceExecutionDto executeService(ServiceDefinitionDto version, RequestBody body, AccessTokenDto accessToken) throws Exception {
        Request request = new Request.Builder()
            .post(body)
            .url(version.getGatewayEndpoint())
            .addHeader("Authorization", "Bearer " + accessToken.getToken())
            .addHeader("Content-Type", "application/json")
            .build();
        String json;
        try (Response response = httpClient.newCall(request).execute()) {
            json = response.body().string();
        }
        return objectMapper.readValue(json, ServiceExecutionDto.class);
    }

    private static ServiceExecutionDto getExecutionStatus(ServiceDefinitionDto version, ServiceExecutionDto execution, AccessTokenDto accessToken)
        throws Exception {
        Request request = new Request.Builder()
            .get()
            .url(version.getGatewayEndpoint() + "/" + execution.getId())
            .addHeader("Authorization", "Bearer " + accessToken.getToken())
            .build();
        String json;
        try (Response response = httpClient.newCall(request).execute()) {
            json = response.body().string();
        }
        return objectMapper.readValue(json, ServiceExecutionDto.class);
    }

    private static String getExecutionResult(ServiceDefinitionDto version, ServiceExecutionDto execution, AccessTokenDto accessToken)
        throws Exception {
        Request request = new Request.Builder()
            .get()
            .url(version.getGatewayEndpoint() + "/" + execution.getId() + "/result")
            .addHeader("Authorization", "Bearer " + accessToken.getToken())
            .build();
        String json;
        try (Response response = httpClient.newCall(request).execute()) {
            json = response.body().string();
        }
        return json;
    }
}
