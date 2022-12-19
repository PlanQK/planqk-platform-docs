package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.ServiceDefinitionDto;
import de.stoneone.planqk.api.model.ServiceDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.io.File;

public class ServiceExternalCreateSample {

    public static void main(String[] args) throws Exception {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

        String name = "Your service name";
        String description = "Your service description";
        String productionEndpoint = "Your public endpoint URL";
        File apiDefinition = new File("Absolute path to your OpenAPI definition");

        /*
         * Uncomment one of the following lines if your self-hosted service communicates with of the quantum cloud providers,
         * e.g., with IBM Quantum Cloud or D-Wave Leap.
         */
        String quantumBackend = "NONE";
        // String quantumBackend = "IBM";
        // String quantumBackend = "DWAVE";

        ServiceDto service = servicesApi.createExternalService(
            name,
            productionEndpoint,
            description,
            quantumBackend,
            "NONE", // no security config
            null, // username
            null, // password
            null,
            apiDefinition
        );

        // A PlanQK Service consists of a list of ServiceDefinitionDto objects. A service definition represents a certain version of a
        // PlanQK Service. At the moment, there will always be one service definition object in the list. In the future, you will be
        // able to maintain multiple versions of your service.
        ServiceDefinitionDto version = service.getServiceDefinitions().stream().findFirst().orElseThrow();

        service = servicesApi.getService(service.getId(), null);
    }
}
