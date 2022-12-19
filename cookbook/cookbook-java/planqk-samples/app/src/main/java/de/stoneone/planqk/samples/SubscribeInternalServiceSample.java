package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformApplicationsApi;
import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.ApplicationDto;
import de.stoneone.planqk.api.model.BuildJobDto;
import de.stoneone.planqk.api.model.CreateApplicationRequest;
import de.stoneone.planqk.api.model.CreateInternalSubscriptionRequest;
import de.stoneone.planqk.api.model.ServiceDefinitionDto;
import de.stoneone.planqk.api.model.ServiceDto;
import de.stoneone.planqk.api.model.SubscriptionDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.io.File;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SubscribeInternalServiceSample {

    private static final Logger log = LoggerFactory.getLogger(ServicePublishSample.class);

    public static void main(String[] args) throws Exception {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        /*
         * Create a managed PlanQK Service and publish it internally
         */
        ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

        String serviceName = "Your service name";
        String quantumBackend = "NONE";
        String description = "Your service description";
        File userCode = new File("Absolute path to the user_code.zip file");
        File apiDefinition = new File("Absolute path to the OpenAPI definition");
        Integer cpuConfiguration = null; // null to use default CPU configuration: 1 vCPU
        Integer memoryConfiguration = null; // null to use default memory configuration: 2048 = 2GB
        String usePlatformToken = "FALSE"; // FALSE to use own backend tokens in case 'quantumBackend' is 'DWAVE' or 'IBM'

        ServiceDto service = servicesApi.createManagedService(
            serviceName,
            description,
            quantumBackend,
            usePlatformToken,
            cpuConfiguration,
            memoryConfiguration,
            null,
            userCode,
            apiDefinition
        );

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

        // Retrieve a list of all active subscriptions of an application
        List<SubscriptionDto> subscriptions = applicationsApi.getApplicationSubscriptions(application.getId(), null);
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
}
