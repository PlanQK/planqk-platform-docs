# Introduction

On-premise services allow you to integrate, commercialize, and monetize your self-hosted quantum services via the PlanQK platform.
Your service can be hosted on the infrastructure of your choice and the PlanQK Platform manages the access and billing for you.

Related Tutorial: [Create and Test an On-premise Service](../tutorials/tutorial-meter-external-service.md)

## Create an On-premise Service

To create an on-premise service, go to the [create service page](https://platform.planqk.de/services/new) and provide the following information:

| Property               | Description                                                                                                                                                                             |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name                   | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                            |
| Service Type           | Select "On-premise Service".                                                                                                                                                              |
| Service Endpoint       | Enter the public endpoint (URL) of your service.                                                                                                                                        |    
| Security Configuration | Define how the PlanQK Platform authenticates requests to your service. At the moment, Basic Authentication using username and password is supported.                                    |
| API Specification      | Click on "Import from OpenAPI File" if you already have prepared an OpenAPI specification for your service. You can leave this empty for now and supply an OpenAPI specification later. |
| Description            | Provide any additional meaningful information you want to provide to other PlanQK users.                                                                                                |

Finally, click on "Create Service" to create your service.


