# Managed Services

Managed Services enable you to run your quantum code on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware.
We containerize and deploy your quantum code fully automatically and make it accessible through well-known protocols (HTTP/S) – you bring the code, we do the REST.
We enable developers to focus on writing their quantum code in Python (and other languages) to build quantum solutions for tomorrow's challenges.

A Managed Service consists of your quantum code, metadata describing the service, and configuration information for the execution of the service.
By using our coding templates, you can easily turn your ideas into running quantum solutions at rapid speed.

Once deployed, you can asynchronously execute your service and retrieve the results.
Further, you can share your services with your colleagues or even external parties, everything through an [HTTP API](managed-services-api-spec.md).

::: tip Quickstart Guide
Check out our [quickstart](../getting-started/quickstart.md) guide to get started with Managed Services using the PlanQK CLI.
:::

## Create a Managed Service

You can create a Managed Service either via the [PlanQK CLI](../getting-started/cli-reference.md) or via the [create service page](https://platform.planqk.de/services/new) of our UI.

### Using the PlanQK CLI (recommended)

We strongly recommend to use the [PlanQK CLI](../getting-started/quickstart.md) to create new Managed Service.
You could select a general starter template or choose one specifically for a certain quantum provider or backend.
Furthermore, it provides you with commands to directly package and deploy your quantum code along with the metadata and configuration.

::: tip Check out the README
Take a look into the `README.md` file of your created project to get started.
It contains all the information you need to run and test your code locally as well as to deploy it to the PlanQK Platform.
:::

### Using the PlanQK Platform UI

On the [create service page](https://platform.planqk.de/services/new) of our UI you can create a new Managed Service by uploading a ZIP file containing your quantum code.

You have to zip (at minimum) the `src` folder and the Conda `environment.yml` file from your created project folder.
**You must not zip the project folder itself but its content.**
You may execute the following from within the project folder: `zip -r planqk.zip src environment.yml`.

Now that you have your code in a zip-file, fill out the form and import the `planqk.zip` file you created before.
And there you go.
As soon as the containerization of your code has finished you are able to run jobs against your service.
Further, you may publish it for internal use or into the PlanQK Marketplace to share it with other users.

## Service Metadata

The following table describes the metadata properties of a service.

| Property        | Description                                                                                                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name            | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                                                                                      |
| Service Type    | Select "Managed Services" and upload your code archive (ZIP). The option "External Service" can be used if your service is running somewhere (e.g., on your own infrastructure) and you just want the PlanQK Platform to manage the access to it. |
| Description     | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here.                                               |
| Quantum Backend | Select one of the supported quantum backends your quantum code is using. Currently only one can be picked and serves as a label for your service when published or visible to other users.                                                        |

## Service Configuration

The following table describes the configuration capabilities of a service.

| Property               | Description                                                                                                                                                                                                                                                |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Runtime Configuration  | PlanQK supports to run your service based on the PlanQK Coding Template and custom Docker containers. Choose "Python Template" for selecting the PlanQK Coding Template as your runtime. Choose "Docker" for selecting the custom Docker container option. |
| Resource Configuration | Define and configure the allocated resources when your service is executed.                                                                                                                                                                                |
| API Specification      | Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. You can leave this empty to use the default OpenAPI specification.                                    |
