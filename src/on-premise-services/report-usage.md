# Report Service Usage

To charge your customers for using your service, you need to report the usage to our Metering API.
The PlanQK Platform aggregates all reported usage events and charges your customers at the end of each month.

### Authentication

The Metering API uses access tokens to authenticate requests.
You can view and manage your personal access tokens in your [settings](https://platform.planqk.de/settings/access-tokens).
For authentication, provide your access token in the `X-Auth-Token` header field for each request.

### `POST /qc-catalog/external-services/metering`

This endpoint is used to report the usage of your on-premise service.
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
