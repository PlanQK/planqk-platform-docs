package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformApplicationsApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.ApplicationDto;
import de.stoneone.planqk.api.model.CreateApplicationRequest;
import de.stoneone.planqk.samples.feign.CustomDecoder;

public class ApplicationCreateSample {

    public static void main(String[] args) {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        ServicePlatformApplicationsApi applicationsApi = apiClient.buildClient(ServicePlatformApplicationsApi.class);

        String name = "My Application";
        ApplicationDto application = applicationsApi.createApplication(new CreateApplicationRequest().name(name), null);

        application = applicationsApi.getApplication(application.getId(), null);
    }
}
