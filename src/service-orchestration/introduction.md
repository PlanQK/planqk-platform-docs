# Introduction

With Service Orchestration you have the ability build larger services from existing services.

Service Orchestration means, that you build a new service by setting up a workflow where you call existing services in a defined order and where you can use the results of a service call as input for a following service call.

A Service Orchestration therefore consists of a workflow (on BPMN base) which can be deployed and executed on a workflow engine (we use camunda).

Usually you can set up such a workflow without the need of writing code. Only in case the data transfer between the service calls is not trivial, you may need to write some simple expressions or script statements.

Once deployed, you can asynchronously execute your service and retrieve the results.

## Create a Service Orchestration

You can create a Service Orchestration via the [create service page](https://platform.planqk.de/services/new) of our UI.

On the [create service page](https://platform.planqk.de/services/new) of our UI, select Orchestration Service as service type and enter at least a meaningful name.

The service will be created with a default workflow which consists only of a start node.
You have to edit, deploy and publish the workflow before you can execute the service. 

## Service Metadata

The following table describes the metadata properties of a service.

| Property     | Description                                                                                                                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name         | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                                        |
| Service Type | Select "Service Orchestration".                                                                                                                                                                     |
| Description  | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here. |

