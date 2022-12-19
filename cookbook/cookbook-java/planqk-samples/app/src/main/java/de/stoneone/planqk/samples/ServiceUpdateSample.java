package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.BuildJobDto;
import de.stoneone.planqk.api.model.IndustryDto;
import de.stoneone.planqk.api.model.ServiceDefinitionDto;
import de.stoneone.planqk.api.model.ServiceDto;
import de.stoneone.planqk.api.model.UpdateVersionRequest;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class ServiceUpdateSample {

    public static void main(String[] args) throws Exception {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

        String serviceName = "Your service name";
        String quantumBackend = "NONE";
        String description = "Your service description";
        File userCode = new File("Absolute path to the user_code.zip file");
        File apiDefinition = new File("Absolute path to the OpenAPI definition");
        Integer cpuConfiguration = null; // null to use default CPU configuration: 1 vCPU
        Integer memoryConfiguration = null; // null to use default memory configuration: 2048 = 2GB
        String usePlatformToken = "FALSE"; // false to use own backend tokens in case 'quantumBackend' is 'DWAVE' or 'IBM'

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

        service = servicesApi.getService(service.getId(), null);

        /*
         * Update description and related industries
         */
        // Retrieve a list of available industries
        List<IndustryDto> industries = servicesApi.getIndustries();

        // Retrieve 'information_technology' industry from the list
        IndustryDto informationTechnology = industries.stream()
            .filter(industry -> "information_technology".equals(industry.getName()))
            .findFirst()
            .orElseThrow();

        // Create the update request payload
        UpdateVersionRequest updateRequest = new UpdateVersionRequest()
            .description("Updated description")
            .addIndustriesItem(new IndustryDto().id(informationTechnology.getId()));

        version = servicesApi.updateServiceVersion(service.getId(), version.getId(), updateRequest, null);

        // Remove all assigned industries
        updateRequest = new UpdateVersionRequest();
        updateRequest.setIndustries(new ArrayList<>());
        version = servicesApi.updateServiceVersion(service.getId(), version.getId(), updateRequest, null);

        /*
         * Updates the source code of the service
         */
        userCode = new File("Path to the updated user_code.zip file");
        version = servicesApi.updateSourceCode(service.getId(), version.getId(), userCode, null);

        waitForServiceToBeCreated(servicesApi, service.getId(), version.getId());

        /*
         * Updates the API Definition
         */
        apiDefinition = new File("Path to the updated API definition");
        servicesApi.updateApiDefinition(service.getId(), version.getId(), apiDefinition, null);
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
