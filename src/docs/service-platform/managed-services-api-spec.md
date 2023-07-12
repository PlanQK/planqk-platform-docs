# API Specification

Each service that is managed by PlanQK may provide a detailed API specification.
This specification is used to describe the interface of the service and the input data that is required to execute the service.
We use the [OpenAPI Specification v3 (OAS3)](https://swagger.io/specification) to describe the API of a service.

## Endpoints

Each managed service supports the following endpoints:

::: tip IMPORTANT
Do **NOT** change the operations or add new ones, otherwise communicating with the service will not work as intended.
:::

| Method | Path                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|:-------|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`  | `/`                     | Gives the user the information, whether the service is available at all.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `POST` | `/`                     | This method is used to start a service execution while sending the appropriate input. It returns an execution ID, which is required for receiving results of the execution.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `GET`  | `/{id}`                 | The ID generated via the `POST` method can be used here in order to check on the status of the service execution. The possible status values are quite self-explanatory but just to make sure: if the execution is still running, you should get `"status": "RUNNING"` or `"status": "PENDING"` (especially in the beginning). When the execution finished successfully, you should see `"status": "SUCCEEDED"`. If you get either `"status": "FAILED"` or `"status": "UNKNOWN"`... Well, apparently something went wrong. Hopefully, you get some information on what went wrong with the next method. |    
| `GET`  | `/{id}/result`          | Returns the result of a service execution if the status is either succeeded or failed (details on the occurred problems). Similar to the example illustrated for the `POST` method, you should describe for this endpoint what kind of output the user has to expect when successfully running the service.                                                                                                                                                                                                                                                                                             |
| `GET`  | `/{id}/interim-results` | Via this endpoint, possible intermediate results of the service execution can be retrieved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `PUT`  | `/{id}/cancel`          | After starting a service execution, it can be canceled via this method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Describing your API

As a service provider, you can (and should) change titles and descriptions for the different endpoints, as well as the API itself.
Besides that, it is highly recommended to describe the format of the inputs (section `requestBody`) and outputs (section `responses`) for your service within the `POST` method.

Our default API specification, which can be used as a template, is available to <a :href="$withBase('/files/default-api-spec.yaml')" download>download</a>.

### Title and Description

### the Input / Output format

When looking at e.g. the request body of the `POST` method within the provided API description file for the Qiskit starter as an example, it looks as follows:

```yaml
requestBody:
  required: true
  content:
    application/json:
      schema:
        type: object
        properties:
          data:
            type: object
            properties:
              n_bits:
                type: integer
                minimum: 2
                description: Number of qubits to use, defines the range of random numbers between 0 and 2^n_bits - 1
                example: 8
          params:
            type: object
            example: { }
```

It should always contain two (possibly empty) properties: `data` and `params` which your service expects.
The first should encode the information about the actual problem (e.g. the entries of a QUBO-matrix) while the second refers to additional parameters for the evaluation (e.g. the number of ancillary qubits for an execution).
In this example the service expects the integer-typed input `n_bits`, which should at least be 2 and has an example value of 8.
Exactly this schema, as well as the one for a response with a successful status code should be adapted to represent the input and output of your service.
For a list of supported data types, please refer to the OpenAPI [guide](https://swagger.io/docs/specification/data-models/data-types/).
