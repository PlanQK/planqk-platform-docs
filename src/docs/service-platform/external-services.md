# External Services
External services allow you to integrate, market, and monetize your self-hosted quantum services via the PlanQK platform.

## Create an External Service
To create an external service, go to the [create service page](https://platform.planqk.de/services/new) and provide the following information:

| Property | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
|--|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                                                                                                                                                                                                                                                                           |
| Service Type | Select "External Service".                                                                                                                                                                                                                                                                                                                                                                                                             |
| URL | Enter the URL of your service.                                                                                                                                                                                                                                                                                                                                                           |    
| Security Configuration | Define how the PlanQK platform authenticates requests to your service. At the moment, Basic Authentication using username and password is supported. |
| Quantum Backend | Select one of the supported quantum backends your quantum code is using. Customers can use this information to find your service in the marketplace. |
| API Specification | Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. You can leave this empty to use the default OpenAPI specification supplied with this template.                                                                                                                                                                                    |
| Description | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here.

Finally, click on "Create Service" to create your service.

## Create a Pricing Plan
A pricing plan for an external service consists of the products that you, as a service provider, want to charge your customers for.
For example, if you want to charge for API calls, CPU time, and memory time, create a product for each of these.
You can create a pricing plan for your service by following these steps:

1. On the details page of your service, click on `Create Pricing Plan`.
2. On the create pricing plan page, add your products to the pricing plan. For each product provide the following information:
   -  **Name**: The name of the product.
   -  **Unit Price**: The price per unit of the product.
   -  **Unit**: The unit describes how the product is sold and appears as a label on customer's invoices. 
   For example, if your product is CPU time and is billed per second, the unit would be "second".
3. Click on `Create Plan`.
4. On the services details page you will see your pricing plan with its products.

## Metering API
In order to charge your customers for using your service, you need to report the usage to our metering API.
The PlanQK platform aggregates all reported usage events and charge your customers at the end of each month.

::: tip Authentication
The metering API uses access tokens to authenticate requests.
You can view and manage your personal access tokens in your [settings](https://platform.planqk.de/settings/access-tokens).
For authentication, provide your access token in the `X-Auth-Token` header field for each request.
:::

To report the usage of your external service, send a POST request to ```https://platform.planqk.de/qc-catalog/external-services/metering```.
The body of the request must contain the following information:

```json
{
  "itemId": string
  "count": integer
  "correlationId": string
}
```

- The `itemId` is the id of the product you want to report.
  You can find the id of your product in the pricing plan table on the service details page.
- The `count` is the quantity of units you want to report.
- The `correlationId` is needed to correlate your reported usage to the corresponding user of your service.
  You can obtain the correlation id from the `x-correlation-id` header of the request that was forwarded by our API Gateway to your service.

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





