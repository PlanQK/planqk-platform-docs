# Utilize the PlanQK Service SDK for Local Development

This tutorial provides step-by-step guidance on how to create services, monitor their statuses, retrieve their results, and cancel their executions locally. To accomplish this objective, the tutorial utilizes the PlanQK Service SDK and PlanQK CLI.

Prerequisites:
Ensure that Docker is installed and running properly. For detailed documentation, please refer to the following link: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Deploying the Services locally with the PlanQK CLI

To install the PlanQK CLI, you must install Node.js and the npm command line interface using either a
[Node version manager](https://github.com/nvm-sh/nvm) or a [Node installer](https://nodejs.org/en/download).

Then install the PlanQK CLI globally using npm:

```bash
npm install -g @anaqor/planqk
```

Once the installation is complete, start by navigating to the directory where your project, which includes the service, is located.

```bash
cd my-project
```

Next, run the following command:

```bash
planqk serve
```

Once the SERVICE is up and running, you can access its API under http://localhost:8081/. For additional details regarding the `planqk serve` functionality, please refer to the documentation available [here](https://docs.platform.planqk.de/cli-reference.html#planqk-serve).

## Accessing a Service with the PlanQK Service SDK

Supported operations are: creating, monitoring the status of the service, retrieving the execution result and cancelling the execution of the service.

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
