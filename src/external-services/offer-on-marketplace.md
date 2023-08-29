# Publish on Marketplace

Once you have created your service, you can offer it to other PlanQK users by publishing it on the PlanQK Marketplace.
To publish your service, follow the steps below.

### Create an OpenAPI Specification

Each external service needs to provide an OpenAPI specification that describes the service interface and input data to let other PlanQK users discover and understand the capabilities of your service.
Further, this is the technical baseline for PlanQK to integrate your external service.
PlanQK uses the [OpenAPI Specification v3 (OAS3)](https://swagger.io/specification) to describe the API of an external service.

A full example and template is available to <a :href="$withBase('/files/external-service-api-spec.yaml')" download>download</a>.

You can change the API specification of your service at any time by clicking on `Edit Service` on the service details page.

### Create a Pricing Plan

A pricing plan for an external service consists of the products that you, as a service provider, want to charge your customers for.
For example, if you want to charge for API calls, CPU time, and memory time, create a product for each of these.
To charge your customers, [report the usage to our Metering API](report-usage.md).

You can create a pricing plan for your service by following these steps:

1. On the details page of your service, click on `Create Pricing Plan`.
2. On the create pricing plan page, add your products to the pricing plan. For each product provide the following information:
    - **Name**: The name of the product, e.g, `CPU Time`.
    - **Unit Price**: The price per unit of the product, e.g., `0.0001` EUR.
    - **Unit**: The unit describes how the product is sold and appears as a label on customer's invoices.
      For example, if your product is `CPU Time` and is billed _per second_, the unit would be `second`.
3. Click on `Create Plan`.
4. On the services details page you will see your pricing plan with its products.


### Publish your Service to the PlanQK Marketplace

Finally, to publish your service to the PlanQK Marketplace, click on `Publish to Marketplace` on the service details page.
Now, other PlanQK users can discover and subscribe to your service.


