# `planqk.json` Reference

The `planqk.json` file contains your service configuration and is used by the PlanQK CLI to deploy and run your service.
It will be generated automatically by the PlanQK CLI and must be located in the root folder of your project.

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

The following properties are supported:

| Property              | Type     | Description                                                                                                                                                                                                         |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`                | `string` | **Required**. The name of your service.                                                                                                                                                                             |
| `description`         | `string` | A short description of your service.                                                                                                                                                                                |
| `quantumBackend`      | `string` | **Required**. The quantum provider your service uses. One of `IBM`, `IONQ`, `DWAVE` or `NONE`.                                                                                                                      |  
| `resources`           | `object` | **Required**. The resource configuration of your service.                                                                                                                                                           |
| `resources.cpu`       | `number` | **Required**. The number of virtual CPU cores to allocate for your service.                                                                                                                                         |
| `resources.memory`    | `number` | **Required**. The amount of memory in GB to allocate for your service.                                                                                                                                              |
| `resources.gpu`       | `object` | The GPU configuration of your service.                                                                                                                                                                              |
| `resources.gpu.type`  | `string` | The type of GPU to allocate for your service. One of `NVIDIA_TESLA_T4` or `NVIDIA_TESLA_V100`.                                                                                                                      |
| `resources.gpu.count` | `number` | The number of GPUs to allocate for your service.                                                                                                                                                                    |
| `runtime`             | `string` | **Required**. The runtime to use for your service. Choose `PYTHON_TEMPLATE` to run quantum services based on our Python starter templates. Choose `DOCKER` to run custom docker images in any programming language. |
| `serviceId`           | `string` | References a deployed service. Gets automatically added on a successful deployment, i.e., after `planqk up`.                                                                                                        |
