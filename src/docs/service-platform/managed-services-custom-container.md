# Custom Docker Containers

PlanQK supports to run your managed services based on a custom Docker container.
You may consider using "Docker" as your service runtime in the following scenarios:

- You need OS-level packages not included in the Python Template. With Docker, you have complete control over your base operating system and installed packages.
- Your application is in a language not yet supported by PlanQK, like Go or Rust.
- You need guaranteed reproducible builds. We release regular updates to our coding templates to improve functionality, security, and performance. While we aim for full backward compatibility, using a Dockerfile is the best way to ensure that your production runtime is always in sync with your local builds.

::: tip NOTE
With PlanQK you cannot run an arbitrary Docker container. You must comply with PlanQK's runtime interface.
:::

## Runtime Interface

#### Lifecycle:

You have to create a Docker container that can be run as a one-shot process.
This means the Docker container starts, runs your code once and then exits.
You may use exit codes to indicate success or failure of your code.

#### Input:

The platform runtime uses the input provided via the Service API in the form of `{ "data": <data>, "params": <params> }`.
The runtime then mounts the input data to `/var/input/data.json` and the parameters to `/var/input/params.json` of the container.
Both files will contain valid JSON strings.

#### Output:

You could use a logging library or simply standard output (stdout) to show any processing relevant information to your users.
For example, users may obtain these logs from a PlanQK Job they have run against your service.

Additionally, the platform requires that any **result** output produced by the service to be in a specific format.
Specifically, the output must be printed to standard output (stdout) and prefixed with `PlanQK:Job:Result:`.
Only the first stdout output using this marker will be used as the result output of the service.
The output itself must also be a valid JSON string.

An example of a valid result output could look like this (note that the output is a single line):

```
PlanQK:Job:Result: {"sum":42}
```

PlanQK also supports multi-line result outputs.
In this case, the output must be printed to stdout and wrapped with `PlanQK:Job:MultilineResult`.
For example:

```
PlanQK:Job:MultilineResult
{
  "sum": 50
}
PlanQK:Job:MultilineResult
```

Further, PlanQK also supports interim results, i.e., results that are not the final result of the service but which you want to make available to the user while the service is still running.
In this case, the output must be printed to stdout and prefixed with `PlanQK:Job:InterimResult`.
For example:

```
PlanQK:Job:InterimResult: {"sum":25.2}
```

## Set up a Custom Docker Container Project

::: tip TIP
Examples for custom Docker container projects can be found in the [PlanQK Platform Samples](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/docker).
:::

The starting folder structure of the project could look like this:

```
.
├── Dockerfile
├── openapi-spec.yml
├── input
│   └── ...
└── src
    └── ...
```

::: tip TIP
You may use the [PlanQK CLI](https://docs.platform.planqk.de/docs/getting-started/quickstart.html#installation) to create a new custom Docker container project.
Just select a suitable starter project when running `planqk init`.
:::

It is important that there is a file called `Dockerfile` in the root directory of the project.
The `Dockerfile` is the file that defines the Docker image that will be built.
And optionally, there is a file called `openapi-spec.yml` in the root directory of the project.
The `openapi-spec.yml` is the file that defines the API of the service.
The `input` folder may contain the input data and parameters to test your application locally.
The `src` folder contains any source code required to run your application.
You may extend this structure depending on your needs.

To test your application and run it application using Docker, make sure you have Docker installed on your system, navigate to the root directory of the project, and run the following commands:

```bash
docker build -t your-app .

PROJECT_ROOT=(`pwd`)
docker run -it -v $PROJECT_ROOT/input:/var/input your-app
```

::: tip NOTE

For GitBash users on Windows, replace

```bash
PROJECT_ROOT=(`pwd`)
```

with

```bash
PROJECT_ROOT=(/`pwd`)
```

For Windows command-prompt users, you can use the following command:

```bash
docker run -it -v %cd%/input:/var/input your-app
```

:::

This assumes that you have an input data file `data.json` and an optional parameters file `params.json` in `./input`.
The `-v` option is used to mount this directory as volumes in the Docker container.
The application may read the input from `/var/input/data.json` and parameters from `/var/input/params.json` respectively.
The Docker container runs the application and returns the result as output, printed to stdout and prefixed by `PlanQK:Job:Result:`.

## Create your Service on the PlanQK Platform

If you have already completed your custom Docker container project and are now looking to offer it as a service through the PlanQK platform, you are on the right track!
With just a few more steps, your service can be deployed and made available for customers to subscribe to.
This guide will provide you with all the necessary information about the process of subscribing to services and executing jobs, as well as answering any questions you may have.

### Create an API Spec File for your Service

Although not absolutely necessary for providing a service, we do strongly recommend to write (or customize) an API description for your service.
This API description gives users of the service a manual on how they are able to communicate with the service, namely how they can send the input for problems and receive the solutions.  
On the PlanQK platform we support the OpenAPI 3.0 (formerly Swagger) format for describing the REST methods used for communicating with the service.

Since the execution of services might take several hours (e.g., for training variational circuits) we support an asynchronous communication.
The [PlanQK Platform samples for custom Docker containers](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/docker)
already include the file `openapi-spec.yml`, which is a generic API description and can (and should!) be adapted for your own service.
This especially refers to defining the types of input and output for the corresponding REST-methods which will be described below.

#### `GET /`

Gives the user the information, whether the service is available at all.

#### `POST /`

The POST method is used to start a service execution while sending the appropriate input.
This method returns an execution id, which is required for receiving results of the execution.

#### `GET /{id}`

The ID generated by the POST method can be used for this method to check on the status of the service execution.
The possible status values are quite self-explanatory but just to make sure:

If the execution is still running, you should get `"status": "RUNNING"` or `"status": "PENDING"` (especially in the beginning ).

When the execution finished successfully, you should see `"status": "SUCCEEDED"`.

If you get either `"status": "FAILED"` or `"status": "UNKNOWN"`... Well, apparently something went wrong. Hopefully, you get some information on what went wrong with the next method.

#### `GET /{id}/result`

If the service execution either failed or succeeded, you can get the results (or details on the occurred problems) via this method.
Within the API description you should describe for this method what kind of output the user has to expect when successfully running the service.

### Deploy your Service on the PlanQK Platform

When you have zipped your code and successfully tested it via Docker, creating a service via the platform is easy:
From the landing page, go to [My Services](https://platform.planqk.de/services).
Here you need to click on `Create Service` in the top right corner.

You will be directed to an interface, where you can provide information, as well as the actual user code.

**Service Properties:**

| Property               | Description                                                                                                                                                                                                                                         |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name                   | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                                                                                        |
| Service Type           | Select "Managed Services" and upload your service ZIP archive. The option "External Service" can be used if your service is running somewhere (e.g., on your own infrastructure) and you just want the PlanQK Platform to manage the access to it.  |
| Runtime Configuration  | Choose "Docker" for selecting the custom Docker container option as your Runtime Configuration.                                                                                                                                                     |
| Resource Configuration | Define and configure the allocated resources when your PlanQK Service is executed.                                                                                                                                                                  |
| Quantum Backend        | Select one of the supported quantum backends your quantum code is using. Customers can use this information to find your service in the marketplace.                                                                                                |
| API Specification      | Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. You can leave this empty to use the default OpenAPI specification supplied with this template. |
| Description            | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here.                                                 |

And there you go.
As soon as you click on "Create Service", the containerization and deployment starts.
As soon as it's finished (as indicated in the "My Services" section with a green checkmark) you will be able to publish your service to the quantum service store or for internal use and test your service thoroughly.
