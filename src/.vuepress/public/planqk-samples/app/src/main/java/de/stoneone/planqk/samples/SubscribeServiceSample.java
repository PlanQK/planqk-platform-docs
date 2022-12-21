package de.stoneone.planqk.samples;

import de.stoneone.planqk.api.ServicePlatformApplicationsApi;
import de.stoneone.planqk.api.ServicePlatformMarketplaceApi;
import de.stoneone.planqk.api.ServicePlatformServicesApi;
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.api.model.ApiDto;
import de.stoneone.planqk.api.model.ApplicationDto;
import de.stoneone.planqk.api.model.BuildJobDto;
import de.stoneone.planqk.api.model.CreateApplicationRequest;
import de.stoneone.planqk.api.model.CreateSubscriptionRequest;
import de.stoneone.planqk.api.model.PricingPlanDto;
import de.stoneone.planqk.api.model.SubscriptionDto;
import de.stoneone.planqk.samples.feign.CustomDecoder;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * In this example we assume you either have a published PlanQK Service available in
 * the PlanQK Marketplace or you may just use an existing PlanQK Service from the PlanQK Marketplace.
 */
public class SubscribeServiceSample {

    public static void main(String[] args) throws Exception {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));

        /*
         * Create a PlanQK Application
         */
        ServicePlatformApplicationsApi applicationsApi = apiClient.buildClient(ServicePlatformApplicationsApi.class);

        String applicationName = "My Application";
        ApplicationDto application = applicationsApi.createApplication(new CreateApplicationRequest().name(applicationName), null);

        application = applicationsApi.getApplication(application.getId(), null);

        /*
         * Find a PlanQK Service in the PlanQK Marketplace
         */
        ServicePlatformMarketplaceApi marketplaceApi = apiClient.buildClient(ServicePlatformMarketplaceApi.class);

        // Either use "findService(...)" to look-up by id (the id of a service can be found in
        // Marketplace > Services > Service Details > Technical Specifications), or search for it by name, which is what we show next

        // Get all available PlanQK Services
        List<ApiDto> services = marketplaceApi.findServices();

        String serviceName = "My Service";

        // Filter the list by name
        ApiDto service = services.stream().filter(s -> serviceName.equalsIgnoreCase(s.getName())).findAny().orElseThrow();

        /*
         * Each PlanQK Service has at least one pricing plan.
         * You must select a suitable one, either a "free" plan if available of a "paid" plan.
         */

        // We assume here your selected PlanQK Service provides a "free" plan
        PricingPlanDto freePlan =
            service.getPricingPlans().stream().filter(p -> PricingPlanDto.TypeEnum.FREE == p.getType()).findFirst().orElseThrow();

        /*
         * Subscribe your application with the published service
         */
        CreateSubscriptionRequest subscriptionRequest = new CreateSubscriptionRequest()
            .applicationId(application.getId())
            .pricingPlanId(freePlan.getId());

        marketplaceApi.createSubscription(service.getId(), subscriptionRequest);

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
