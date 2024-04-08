# Utilize the PlanQK Service SDK for local development using PlanQK CLI

This tutorial outlines how to create, check the status and cancel service executions using both the PlanQK Service SDK and PlanQK CLI.


## Using PlanQK CLI

Begin by navigating to the directory where your project, containing the service, is located.

```bash
cd my-project
```

Next, run the following command:

```bash
planqk serve
```

Once the server is up and running, you can utilize http://localhost:8081/ as the URL to access the API. For additional details regarding the `planqk serve` functionality, please refer to the documentation available [here](https://docs.platform.planqk.de/cli-reference.html#planqk-serve).

## Getting Started with PlanQK Service SDK

Begin by installing the PlanQK Service SDK using pip.

```bash
pip install --upgrade planqk-service-sdk
```
Replace the placeholders your_consumer_key and your_secret_key in the code snippet below with the credentials provided in one of your platform applications. Additionally, configure the service_endpoint to the URL where planqk sere operates. In the example below, the server is operating on the default URL.



```python
from planqk.service.client import PlanqkServiceClient

# Your consumer key and secret
consumer_key = "your_consumer_key"
consumer_secret = "your_consumer_secret"

# Service endpoint
service_endpoint = "http://localhost:8081/"

# Initialize the client
client = PlanqkServiceClient(service_endpoint, consumer_key, consumer_secret)
```

You can initiate executions as illustrated in the following example:

```python
data = {"dataValue" : ["abc", "dce"]}
params = {"paramsValue" : ["abc", "dce"]}

# start execution
job = client.start_execution(data=data, params=params)
```

To check the status of an execution, utilize the following code snippet:

```python
# get execution status
status = client.get_status(job.id)
```

Retrieve the result of an execution with the following example:


```python
# get execution result
result = client.get_result(job.id)
```
Lastly, to cancel an execution, follow this example:

```python
# get execution result
client.cancel_execution(job.id)
```
