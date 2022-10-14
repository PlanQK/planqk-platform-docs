package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.BuildJobDto;
import de.stoneone.planqk.api.model.ServiceDefinitionDto;
import de.stoneone.planqk.api.model.ServiceDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.io.File;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServicePublishSample {

    private static final Logger log = LoggerFactory.getLogger(ServicePublishSample.class);

    public static void main(String[] args) throws Exception {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

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

        // Publish the service (will be available in PlanQK Marketplace to all other PlanQK users)
        version = servicesApi.publishService(service.getId(), version.getId(), null);

        // Published services are in lifecycle state "PUBLISHED"
        if (version.getLifecycle() != ServiceDefinitionDto.LifecycleEnum.PUBLISHED) {
            log.warn("Service could not be published");
        }

        // You may unpublish the service afterwards
        // servicesApi.unpublishService(service.getId(), version.getId(), null);
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
