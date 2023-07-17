# Custom Docker Containers

We support custom Docker containers to run your service.
You may consider using "Docker" as your service runtime in the following scenarios:

- You need OS-level packages not included in the Python Template. With Docker, you have complete control over your base operating system and installed packages.
- Your application is in a language not yet supported by PlanQK, like Go or Rust.
- You need guaranteed reproducible builds. We release regular updates to our coding templates to improve functionality, security, and performance. While we aim for full backward compatibility, using a Dockerfile is the best way to ensure that your production runtime is always in sync with your local builds.

::: warning Be compliant with our runtime interface
You cannot run an arbitrary Docker container. You must comply with our [runtime interface](managed-services-runtime-interface.md#custom-docker-container).
:::

## Set up a Custom Docker Container Project

::: tip Project Templates
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

::: tip Use the PlanQK CLI
You may use the [PlanQK CLI](https://docs.platform.planqk.de/docs/getting-started/quickstart.html#installation) to create a new custom Docker container project.
Just select a suitable starter project when running `planqk init`.
:::

It is important that there is a file called `Dockerfile` in the root directory of the project.
The `Dockerfile` is the file that defines the Docker image that will be built.
And optionally, there is a file called `openapi-spec.yml` in the root directory of the project.
The `openapi-spec.yml` is the file that defines the API of the service ([more information](managed-services-api-spec.md)).
The `input` folder may contain the input data and parameters to test your application locally.
The `src` folder contains any source code required to run your application.
You may extend this structure depending on your needs.

To test your application and run it application using Docker, make sure you have Docker installed on your system, navigate to the root directory of the project, and run the following commands:

```bash
docker build -t your-app .

PROJECT_ROOT=(`pwd`)
docker run -it -v $PROJECT_ROOT/input:/var/input your-app
```

::: tip Windows Users
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

### Create an API Specification File for your Service

Although not absolutely necessary for providing a service, we do strongly recommend to write (or customize) an API description for your service.
This API description gives users of the service a manual on how they are able to communicate with the service, namely how they can send the input for problems and receive the solutions.  
On the PlanQK platform we support the OpenAPI 3.0 (formerly Swagger) format for describing the REST methods used for communicating with the service.

Since the execution of services might take several hours (e.g., for training variational circuits) we support an asynchronous communication.
The [PlanQK Platform samples for custom Docker containers](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/docker)
already include the file `openapi-spec.yml`, which is a generic API description and can (and should!) be adapted for your own service.
This especially refers to defining the types of input and output for the corresponding REST-methods which will be described below.

::: tip API Specification Details
Learn more about our API endpoints and how to describe input data and output responses [here](managed-services-api-spec.md).
:::

### Deploy your Service on the PlanQK Platform

When you have zipped your code and successfully tested it via Docker, creating a service via the platform is easy:
you can create it either via the [PlanQK CLI](../getting-started/cli-reference.md) or via the [create service page](https://platform.planqk.de/services/new) of our UI.

::: tip Create a Managed Service
Learn more about how to create a managed service [here](managed-services.md#create-a-managed-service)
:::

And there you go.
As soon as you click on "Create Service", the containerization and deployment starts.
As soon as it's finished (as indicated in the "My Services" section with a green checkmark) you will be able to publish your service to the quantum service store or for internal use and test your service thoroughly.
