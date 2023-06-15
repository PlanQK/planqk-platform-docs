# CLI Reference

The PlanQK Command Line Interface (CLI) lets you interact with the PlanQk platform directly from the terminal.
We have installation instructions to guide you through the initial setup in our [Quickstart](../getting-started/quickstart.md) guide.

You can use the `--help` flag to get information about the supported commands.

``` bash
planqk --help
```

Or you can get information about a specific command by running:

``` bash
planqk <command> --help
```

## Login to your account

Login with your access token.
You can create an access token [here](https://platform.planqk.de/settings/access-tokens).

``` bash
planqk login -t <your access token>
```

## Create a new service project

Creates a new folder in your working directory containing all required files to run your quantum code on the PlanQK platform.
Useful if you want to bootstrap a new service that runs on PlanQK.

``` bash
planqk init <service name>
```

## Deploy your service

Builds your service, deploys it, and makes it accessible to you via a REST API.
Updates your service if it is already deployed.

``` bash
planqk up
```

## Execute your service

Executes your service with the example input data.

``` bash
planqk run
```

For supported flags and arguments run `planqk run --help`.

## List your services

Lists all your services that are deployed on the PlanQK platform.

``` bash
planqk services
```

## Get current account context

Get the current context, i.e. the personal or organization account you are currently working with.

``` bash
planqk get-context
```

## Set account context

Set the current context, i.e. the personal or organization account you are currently working with.

``` bash
planqk set-context
```

## Logout

Logout of your account.

``` bash
planqk logout
```

## PlanQK JSON Reference

The `planqk.json` file contains your service configuration and is used by the PlanQK CLI to deploy and run your service.

Here is an example containing all supported fields:

``` json
{
  "name": "my-service",
  "description": "This service does awesome things.",
  "quantumBackend": "IONQ",
  "resources": {
    "cpu": 2,
    "memory": 4,
    "gpu": {
      "type": "NVIDIA_TESLA_T4",
      "count": 1
    }
  },
  "runtime": "PYTHON_TEMPLATE",
  "serviceId": "99487f0b-21f0-4256-8335-5179d416dbb4"
}
```

This is how to use each field:

`name` 

The name of your service. This name will be used to create a folder in your working directory containing all required files to run your quantum code on the PlanQK platform.

`description`

``

A short description of your service.



The following properties are supported:

| Property         | Type               | Description                                                                                              |
|------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| `name`           | `string`           | **Required**. The name of your service.                                                                  |
| `description`    | `string`           | A short description of your service.                                                                     |
| `quantumBackend` | `IBM               | IONQ                                                                                                     | DWAVE | NONE` | **Required**. The quantum provider your service uses.     |
| `resources`      | `object`           | **Required**. The resource configuration of your service.                                                |
| `runtime`        | `PYTHON_TEMPLATE | DOCKER`                                                                                                  | **Required**. The runtime to use for your service. Choose PYTHON_TEMPLATE to run pyhton quantum services. Choose DOCKER to run custom docker images in any programming language         |
| `serviceId`      | `string`           | References a deployed service of the deployed service. Gets automatically added on succesful deployment. |