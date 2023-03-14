# External Services
External services allow you to integrate your self-hosted quantum services into the PlanQK platform.

## Create an external service
To create an external service, follow these steps:
  1. Go to the [create service page](https://platform.planqk.de/services/new).
  2. Enter a name for your service.
  3. Under `Service Type` select `External Service`.
  4. Enter the URL of your service.
  5. Optionally, you can define an [authentication method](external-services.md#add-an-authentication-method) for your service. 
  6. Under `Quantum Backend` select the quantum backend your service is using. Customers can use this information to find your service on the [marketplace](../marketplace.md).
  7. Optionally, you can add a description and API specification for your service. You can also provide this information later.
  8. Finally, click on `Create Service`.

## Add an authentication method
The authentication method defines how the PlanQK platform authenticates requests to your service. 
At the moment, Basic Authentication using username and password is supported.
Under Security Configuration, select `Basic Authentication` and enter your username and password.

## Create a pricing plan for your service
A pricing plan for an external service consists of the products that you, as a service provider, want to charge your customers for.
For example, if you want to charge for API calls, CPU time, and memory time, create a product for each of these.
You can create a pricing plan for your service by following these steps:

1. On the details page of your service, click on `Create Pricing Plan`.
2. On the create pricing plan page, add your products to the pricing plan. For each product provide its name, unit price, and unit.
3. Click on `Create Plan`.
4. On the services details page you will see your pricing plan with its products.

## Report product usage of your external service
::: tip Authentication
The metering API uses access tokens to authenticate requests.
You can view and manage your personal access tokens in your [settings](https://platform.planqk.de/settings/access-tokens).
For authentication, provide your access token in the `X-Auth-Token` header field for each request.
:::

To report the usage of your external service, send a POST request to ```https://platform.planqk.de/qc-catalog/external-services/metering```.
The body of the request must contain the following information:

```json
{
  "itemId": "YOUR_PRODUCT_ID",
  "count": "ITEM_COUNT",
  "correlationId": "YOUR_CORRELATING_ID"
}
```

- The `itemId` is the id of the product you want to report.
  You can find the id of your product in the pricing plan table on the service details page.
- The `count` is the quantity of units you want to report.
- The `correlationId` is needed to correlate your reported usage to the corresponding user of your service.
  You can obtain the correlation id from the `x-correlation-id` header of the request that was forwarded by our gateway to your API.

The Python code below shows a simple example for metering API calls.
Here for each request to the service, a usage of the API product with count 1 is reported to the metering API.

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
    
    payload = {
        "itemId": os.getenv("API_PRODUCT_ID", None),
        "count": 1,
        "correlationId": correlation_id
    }
    r = requests.post(METERING_API_URL, json=payload, headers={"X-Auth-Token": ACCESS_TOKEN})
```





