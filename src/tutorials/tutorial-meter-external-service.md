# Meter an External Service

In this tutorial you will learn how to create an external service with a pay-per-use pricing plan
and report the usage of your service to our metering API.
Further reading on external services can be found in our [External Services documentation](../docs/service-platform/external-services.md).

## The Example Service

As our example we use a simple FastAPI service that reports for each request an API call to the metering API.
You can find the complete code of the service in [this GitHub repo](https://github.com/PlanQK/planqk-platform-samples/tree/master/python/external-service-sample).
An excerpt of the service with the metering code is shown below:

```python
def meter_api_usage(request: Union[Request, None]):
    correlation_id = request.headers.get("x-correlation-id")
    PLANQK_METERING_API = "https://platform.planqk.de/qc-catalog/external-services/metering"
    ACCESS_TOKEN = os.getenv("ACCESS_TOKEN", None)
    PRODUCT_ID = os.getenv("PRODUCT_ID", None)

    payload = {
        "correlationId": correlation_id,
        "productId": PRODUCT_ID,
        "count": 1
    }
    r = requests.post(METERING_API_URL, json=payload, headers={"X-Auth-Token": ACCESS_TOKEN})
```

The `meter_api_usage` method sends a POST request to https://platform.planqk.de/qc-catalog/external-services/metering with the following request body:
- The `correlationId` is needed to correlate your reported usage to the corresponding user of your service.
  The correlation id is obtained from the `x-correlation-id` header of the request that was forwarded by the PlanQK API Gateway to your service.
- The `productId` holds the id of the API product you want to report. We will learn how to obtain the id in the next step.
- The `count` is the quantity of units you want to report in this case we report 1 API call.

For authentication, an access token is provided in the `X-Auth-Token` header field.

The API product id and the access token are provided as environment variables to the service.
In the following steps, you will learn how to obtain both the API product ID and access token.

## Host the example service
First you need to deploy the service on an infrastructure of your choice.
An easy and free solution is [Render](https://render.com/).

You can deploy this example to render with just a couple of clicks:

- Go to [Render](https://dashboard.render.com/select-repo?type=web) 
- Create new "Web Service" from "Public Git repository"
    - Use `https://github.com/PlanQK/planqk-platform-samples` as public repository URL
    - Choose a region close to you
    - Use `master` as branch
    - Use `python/external-service-sample` as root directory
    - Use `Docker` as runtime
    - Choose an instance type, i.e., the "Free" plan is just fine
    - Click "Create Web Service"
    - And your done your service should be up and running in a few minutes  🎉

## Create the external service on PlanQK

Once you have successfully deployed the service on the infrastructure of your choice, you can create the external service on the PlanQK Platform.
To do so, follow these steps:

1. Go to the [create service page](https://platform.planqk.de/services/new).
2. Enter a name for your service.
3. Under `Service Type` select `External Service`.
4. Enter the URL of your service.
7. Add the [API specification](https://raw.githubusercontent.com/PlanQK/planqk-platform-samples/master/python/external-service-sample/api-spec.yaml) for your service. Use right click 'save as' to download. 
8. Finally, click on `Create Service`.

## Create a pay-per-use pricing plan for your service
Next, create a pay-per-use pricing plan for your service containing a product for API calls.
You can create a pricing plan for your service by following these steps:

1. On the details page of your service, click on `Create Pricing Plan`.
2. On the create pricing plan page, add a product to the pricing plan and enter the following values:
    - **Name**: `API` 
    - **Unit Price**: `0.00001`, or any other price you want to charge for an API call
    - **Unit**: `call`
3. Click on `Create Plan`.
4. On the services details page you will see your pricing plan with the product `API`.
5. Copy the ID of your API product by clicking on the copy icon.
6. Add the ID as environment variable to your service.

## Create an Access Token for your service
Requests to the metering API must be authenticated with an access token.
You can create an access token on the [Personal Access Tokens](https://platform.planqk.de/settings/access-tokens) page of your account.
The access token must have the `API` scope.
**Important**: Save the token as you will need it in the next step.

Once you have created the access token, you can add it as environment variable to your service.

## Test your service
Once you have added the API product ID and access token to your service, its time to test if everything works.
You can test your service using our Metering Test Mode by following these steps:
1. Publish your service internal by clicking on `Publish Internal` on the service details page.
2. Create an Application on the [Applications](https://platform.planqk.de/applications) page.
3. Subscribe to your service by clicking on `Subscribe to Service` on the application details page. 
You should see your service on the subscription list of the application
4. Click on the `Try it out` button of your subscription. 
5. On the `Try it out` page, send a POST request to your service. 
6. On the details page of your service, click on the `Metering Events` to show the test metering history of your service. 
There you should see the API call you just sent.
    








