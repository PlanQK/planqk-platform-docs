package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.ServiceDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.util.List;

public class ServiceFindAndDeleteSample {

    public static void main(String[] args) {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

        // Either use "getService(...)" to look-up by id, or search for it by name, which is what we show next

        List<ServiceDto> services = servicesApi.getServices("CREATED", "");

        String name = "Your service name";

        // Filter the list by name
        ServiceDto service = services.stream()
            .filter(s -> name.equalsIgnoreCase(s.getName()))
            .findFirst()
            .orElseThrow();

        // Deletes the service
        servicesApi.deleteService(service.getId(), null);
    }
}
