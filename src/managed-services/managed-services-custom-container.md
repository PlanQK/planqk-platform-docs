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

For more information on how to deal with input and output data, see our runtime interface documentation for [custom Docker containers](managed-services-runtime-interface.md#custom-docker-container).

## What's next?

- Learn how to create an [API specification](managed-services-api-spec.md) for your service.
- [Deploy your service](managed-services.md#create-a-managed-service) using our CLI or web application.
