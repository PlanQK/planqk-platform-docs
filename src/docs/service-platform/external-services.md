# External Services

External services allow you to integrate, commercialize, and monetize your self-hosted quantum services via the PlanQK platform.
Your service can be hosted on the infrastructure of your choice and the PlanQK Platform manages the access and billing for you.

Related Tutorial: [Create and Test an External Service](../../tutorials/tutorial-meter-external-service.md)

## Create an External Service

To create an external service, go to the [create service page](https://platform.planqk.de/services/new) and provide the following information:

| Property               | Description                                                                                                                                                                             |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name                   | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                            |
| Service Type           | Select "External Service".                                                                                                                                                              |
| Service Endpoint       | Enter the public endpoint (URL) of your service.                                                                                                                                        |    
| Security Configuration | Define how the PlanQK Platform authenticates requests to your service. At the moment, Basic Authentication using username and password is supported.                                    |
| Quantum Backend        | Select one of the supported quantum backends your quantum code is using. Customers can use this information to find your service in the marketplace.                                    |
| API Specification      | Click on "Import from OpenAPI File" if you already have prepared an OpenAPI specification for your service. You can leave this empty for now and supply an OpenAPI specification later. |
| Description            | Provide any additional meaningful information you want to provide to other PlanQK users.                                                                                                |

Finally, click on "Create Service" to create your service.

## Offer your Service to other PlanQK Users

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

If you decided to offer your service with a commercial pricing plan, read on and learn how to charge your customers for using your service.

## Meter Service Usage

To charge your customers for using your service, you need to report the usage to our Metering API.
The PlanQK Platform aggregates all reported usage events and charges your customers at the end of each month.

### Authentication

The Metering API uses access tokens to authenticate requests.
You can view and manage your personal access tokens in your [settings](https://platform.planqk.de/settings/access-tokens).
For authentication, provide your access token in the `X-Auth-Token` header field for each request.

### `POST /qc-catalog/external-services/metering`

This endpoint is used to report the usage of your external service.
The request body must contain a `correlationId`, which is forwarded by the PlanQK API Gateway upon service execution.
The PlanQK Platform then logs a usage event for the corresponding product item (`productId`) and the submitted count.

**Request Body:**

```json
{
  "correlationId": "string",
  "productId": "string",
  "count": 0
}
```

- The `correlationId` is needed to correlate your reported usage to the corresponding user of your service.
  You can obtain the correlation id from the `x-correlation-id` header of the request that was forwarded by our API Gateway to your service.
- The `productId` is the id of the product you want to report.
  You can find the id of your product in the pricing plan table on the service details page.
- The `count` is the quantity of units you want to report.

**Example:**

```shell
curl -X 'POST' 'https://platform.planqk.de/qc-catalog/external-services/metering' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: <your access token>' \
  -d '{
    "correlationId": "bXlleHRlcm5hbHNlcnZpY2VuYW1lOnRoZWFwcGxpY2F0aW9ubmFtZXRoYXRpc3N1YnNjcmliZWQ=",
    "productId": "prod_YX8skS2X",
    "count": 10
}'
```

### Test your metering logic

To verify that your service is correctly reporting usage to the Metering API, you can use the Metering Test Mode.

You can use the test mode by following these steps:

1. On the service details page, click on `Publish Internal`. This will make your service accessible only to you.
2. Subscribe to the service using one of your [Applications](https://platform.planqk.de/applications).
3. Execute the service.
4. Your service logic need to obtain the correlation id from the `x-correlation-id` header of the request that was forwarded by our API Gateway to your service.
5. Meter the usage of your service by calling the Metering API with the correlation id you obtained in the previous step.
6. On the service details page, click on `Metering Events`. This will show you the metering events that were reported to our Metering API.
