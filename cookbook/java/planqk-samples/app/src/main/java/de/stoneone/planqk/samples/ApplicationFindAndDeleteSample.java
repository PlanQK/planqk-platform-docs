package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformApplicationsApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.ApplicationDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.util.List;

public class ApplicationFindAndDeleteSample {

    public static void main(String[] args) {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        ServicePlatformApplicationsApi applicationsApi = apiClient.buildClient(ServicePlatformApplicationsApi.class);

        // Either use "getApplication(...)" to look-up by id, or search for it by name, which is what we show next

        // Get all applications
        List<ApplicationDto> applications = applicationsApi.getApplications(null);

        String name = "My Application";

        // Filter the list by name
        ApplicationDto application = applications.stream()
            .filter(a -> name.equalsIgnoreCase(a.getName()))
            .findFirst()
            .orElseThrow();

        // Deletes the application
        applicationsApi.deleteApplication(application.getId(), null);
    }
}
