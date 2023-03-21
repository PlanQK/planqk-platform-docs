# Meter External Service

In this tutorial you will learn how to create an external service with a pay-per-use pricing plan
and report the usage of your service to our metering API.
Further reading on external services can be found in our [External Services documentation](../docs/service-platform/external-services.md).


For this tutorial you need an infrastructure to host the example service. 
An easy and free solution is [render](https://render.com/) but you can also use any other hosting provider of your choice.


## 1. Host Example Service

As our external service we use a simple Python service as shown below.
The services has a single POST endpoint that returns a random number.
For each request to the service, an API call is reported to the metering API.
To do so, a POST request is sent to https://platform.planqk.de/qc-catalog/external-services/metering with the following request body:

```json
{
  "correlationId": correlation_id,
  "productId": API_PRODUCT_ID,
  "count": 1
}
```

- The `correlationId` is needed to correlate your reported usage to the corresponding user of your service.
  The correlation id is obtained from the `x-correlation-id` header of the request that was forwarded by the PlanQK API Gateway to your service.
- The `productId` holds the id of the API product you want to report. We will learn how to obtain the id in the next step.
- The `count` is the quantity of units you want to report in this case we report 1 API call.

For authentication, an access token is provided in the `X-Auth-Token` header field.
In the following steps, you will learn how to obtain the API product ID and access token.

```python
from typing import Union
import os
import requests

from fastapi import FastAPI, Request

app = FastAPI()


@app.post("/")
def run(request: Request):
    correlation_id = request.headers.get("x-correlation-id")
    reportApiUsage(correlation_id)
    # Here do your logic e.g execute your quantum algorithm
    ...
    return {"result": some_result}


def reportApiUsage(correlation_id: Union[str, None]):
    METERING_API_URL = "https://platform.planqk.de/qc-catalog/external-services/metering"
    ACCESS_TOKEN = os.getenv("ACCESS_TOKEN", None)
    API_PRODUCT_ID = os.getenv("API_PRODUCT_ID", None)
    _

    payload = {
        "correlationId": correlation_id,
        "productId": API_PRODUCT_ID,
        "count": 1,
    }
    r = requests.post(METERING_API_URL, json=payload, headers={"X-Auth-Token": ACCESS_TOKEN})
```

## 2. Create the external service

Once you have successfully deployed the service on the infrastructure of your choice, you can create the external service on the PlanQK Platform.
To do so, follow these steps:

1. Go to the [create service page](https://platform.planqk.de/services/new).
2. Enter a name for your service.
3. Under `Service Type` select `External Service`.
4. Enter the URL of your service.
7. Add the API specification for your service.
8. Finally, click on `Create Service`.

## 3. Create a pay-per-use pricing plan for your service
Next, create a pay-per-use pricing plan for your service containing a product for API calls.
You can create a pricing plan for your service by following these steps:

1. On the details page of your service, click on `Create Pricing Plan`.
2. On the create pricing plan page, add a products to the pricing plan and enter the following values:
    - **Name**: `API` 
    - **Unit Price**: `0.00001`, or any other price you want to charge for an API call
    - **Unit**: `call`
3. Click on `Create Plan`.
4. On the services details page you will see your pricing plan.

## 4. Create Access Token for your service

## 5. Add environment variables to your service

## 6. Test your service










