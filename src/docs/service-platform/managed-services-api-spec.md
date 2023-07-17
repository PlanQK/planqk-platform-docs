# API Specification

Each service that is managed by PlanQK may provide a detailed API specification.
This specification is used to describe the interface of the service and the input data that is required to execute the service.
We use the [OpenAPI Specification v3 (OAS3)](https://swagger.io/specification) to describe the API of a service.

## Endpoints

Managed Services expose an API to asynchronously execute the service and retrieve the results.
The following table lists the available endpoints:

| Method | Path                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|:-------|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`  | `/`                     | Gives the user the information, whether the service is available at all.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `POST` | `/`                     | This method is used to start a service execution while sending the appropriate input. It returns an execution ID, which is required for receiving results of the execution.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `GET`  | `/{id}`                 | The ID generated via the `POST` method can be used here in order to check on the status of the service execution. The possible status values are quite self-explanatory but just to make sure: if the execution is still running, you should get `"status": "RUNNING"` or `"status": "PENDING"` (especially in the beginning). When the execution finished successfully, you should see `"status": "SUCCEEDED"`. If you get either `"status": "FAILED"` or `"status": "UNKNOWN"`... Well, apparently something went wrong. Hopefully, you get some information on what went wrong with the next method. |    
| `GET`  | `/{id}/result`          | Returns the result of a service execution if the status is either succeeded or failed (details on the occurred problems). Similar to the example illustrated for the `POST` method, you should describe for this endpoint what kind of output the user has to expect when successfully running the service.                                                                                                                                                                                                                                                                                             |
| `GET`  | `/{id}/interim-results` | Via this endpoint, possible intermediate results of the service execution can be retrieved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `PUT`  | `/{id}/cancel`          | After starting a service execution, it can be canceled via this method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

::: warning IMPORTANT
Do **NOT** change the operations or add new ones, otherwise communicating with the service will not work as intended.
:::

## Describing your API

::: tip API Specification Template  
Our default API specification, which can be used as a template, is available to <a :href="$withBase('/files/default-api-spec.yaml')" download>download</a>.
:::

As a service provider, you can (and should) change titles and descriptions for the different endpoints, as well as the API itself.
Besides that, it is highly recommended to describe the format of the inputs and outputs withing the `components.schemas` section of the API specification.
This is especially important for the `POST /` endpoint, since it defines what kind of input data may be provided by the user.
Further, the response specification for `GET /{id}/result` endpoint is equally important, since it defines what kind of output the user can expect when successfully running the service.

### Title and Description

We highly recommend to change the title and description of the API to match your service.

| Field              | Description                     |
|:-------------------|:--------------------------------|
| `info.title`       | The title of the API.           |
| `info.description` | A short description of the API. |

Example:

```yaml
info:
  title: Managed PlanQK Service
  description: |
    Generic API description for a managed PlanQK Service.
```

### Input Data and Parameters

Each managed service retrieves input data and parameters from the user when executed (via the `POST /` endpoint).
If you are using a Python template, the input data and parameters are provided as dictionary objects of the `run()` method.
In case you are using [Custom Docker Containers](managed-services-custom-container.md), the input data and parameters are mounted to `/var/input/data.json` and `/var/input/params.json` of the container.

| Field                            | Description                         |
|:---------------------------------|:------------------------------------|
| `components.schemas.inputData`   | The schema of the input data.       |
| `components.schemas.inputParams` | The schema of the input parameters. |

Example:

```yaml
components:
  schemas:
    inputData:
      type: object
      properties:
        n_bits:
          type: integer
          minimum: 2
          description: Number of qubits to use, defines the range of random numbers between 0 and 2^n_bits - 1
          example: 8
    inputParams:
      type: object
      example: {}
```

In general, input data should encode the information about the actual problem (e.g., the entries of a QUBO-matrix) while input parameters are additional information to influence the evaluation (e.g., the number of ancillary qubits for an execution).
In this example the service expects the integer-typed input `n_bits`, which should at least be `2` and has an example value of `8`.
The input parameters are empty in this example, but you can add additional parameters as needed.

Learn more about how to define the schema of your input data and parameters [here](https://swagger.io/specification/#schema-object) or which data types are supported [here](https://swagger.io/specification/#data-types).

### Responses (aka. Output)

A service may return different kinds of responses.
Result responses are returned when the service execution finished successfully.
The result response contains the actual result of the service execution as well as additional metadata.
Error responses are returned when the service execution failed.
The error response contains information about the error that occurred during the service execution.
Interim result responses may be provided during the service execution to convey intermediate results to the user.

| Field                                      | Description                                |
|:-------------------------------------------|:-------------------------------------------|
| `components.schemas.resultResponse`        | The schema of the result response.         |
| `components.schemas.errorResponse`         | The schema of the error response.          |
| `components.schemas.interimResultResponse` | The schema of the interim result response. |

Example:

```yaml
components:
  schemas:
    resultResponse:
      type: object
      properties:
        result:
          type: object
          description: service-specific result object
          properties:
          counts_dict:
            type: object
            additionalProperties:
              type: integer
            example:
              00: 548
              11: 476
        metadata:
          type: object
          description: service-specific metadata object which contains additional information besides the actual results
          properties:
            num_qubits:
              type: integer
              example: 2
            eval_time:
              type: number
              example: 1.04
    errorResponse:
      # adapt the schema of this error response to your needs
      type: object
      properties:
        code:
          type: string
          description: service-specific error code representing the type of problem encountered
        detail:
          type: string
          description: service-specific error message describing the detail of the problem encountered
    interimResultResponse:
      type: object
      properties:
        eval_time:
          type: number
          example: 0.3
```

Learn more about how to define the schema of your input data and parameters [here](https://swagger.io/specification/#schema-object) or which data types are supported [here](https://swagger.io/specification/#data-types).
