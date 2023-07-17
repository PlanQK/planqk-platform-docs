# Runtime Interface

We offer an asynchronous interface for executing services.
This is because the execution of services might take several hours (e.g., for training variational circuits).
Therefore, each service API employs polling to avoid client timeouts when waiting for [long-running operation](http://restalk-patterns.org/long-running-operation-polling.html) results.

We support two runtime configurations:
(1) Python Templates that are based our [coding templates](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/python) and
(2) Custom Docker Containers that can be run as a one-shot process.

## Python Template

When starting with PlanQK, we recommend using `Python Template` as your runtime configuration.
It is best to use the [PlanQK CLI](../getting-started/quickstart.md) to create a new project based on our coding templates.

### Lifecycle

Our runtime expects a Python package with a `program.py` file.
The `program.py` file must contain a `run()` method that is called by the runtime.
For each service execution, the runtime creates a new Python process and calls this method.

```python
def run(data: Dict[str, Any] = None, params: Dict[str, Any] = None) -> Union[ResultResponse, ErrorResponse]:
    pass
```

### Input

The `run()` method is called with two arguments: `data` and `params`.
Both arguments are dictionaries that contain the input data and parameters for the service execution.
The runtime ensures that the input provided via the Service API in the form of `{ "data": <data>, "params": <params> }` is passed to the `run()` method.

### Output

Our runtime expects the `run()` method to return a `ResultResponse` or `ErrorResponse` object.
Both objects must be JSON serializable and will be returned to the user via the Service API.

Each coding template already contains respective class representations for the `ResultResponse` and `ErrorResponse` objects.

```python
class ErrorResponse(Response):
    def __init__(self, code: str, detail: str):
        self.code = code
        self.detail = detail


class ResultResponse(Response):
    def __init__(self, result: dict, metadata: dict = None):
        self.result = result
        self.metadata = metadata
```

You may exchange the `ResultResponse` and `ErrorResponse` classes with your own classes.
However, you must ensure that your classes are JSON serializable and the name of the class is `ResultResponse` and/or `ErrorResponse`.
Otherwise, the runtime will not be able to serialize your objects and the service execution will fail.

## Custom Docker Container

We recommend using "Docker" only if one of the following reasons apply:

- You need OS-level packages not included in the Python Template. With Docker, you have complete control over your base operating system and installed packages.
- Your application is in a language not yet supported by PlanQK, like Go or Rust.
- You need guaranteed reproducible builds. We release regular updates to our coding templates to improve functionality, security, and performance. While we aim for full backward compatibility, using a Dockerfile is the best way to ensure that your production runtime is always in sync with your local builds.

### Lifecycle:

You have to create a Docker container that can be run as a one-shot process.
This means the Docker container starts, runs your code once and then exits.
You may use exit codes to indicate success or failure of your code.

### Input:

The platform runtime uses the input provided via the Service API in the form of `{ "data": <data>, "params": <params> }`.
The runtime then mounts the input data to `/var/input/data.json` and the parameters to `/var/input/params.json` of the container.
Both files will contain valid JSON strings.

### Output:

Any result that should be returned to the user must be written to standard output (stdout) and prefixed with `PlanQK:Job:Result:`.
Only the first occurrence of the `PlanQK:Job:Result:` marker will be used as the result output of the service.
The result itself must be a valid JSON string, for example (note that the output is a single line):

```
PlanQK:Job:Result: {"sum":42}
```

We also support multi-line result outputs.
In this case, the output must be printed to stdout and wrapped with `PlanQK:Job:MultilineResult`, for example:

```
PlanQK:Job:MultilineResult
{
  "sum": 42
}
PlanQK:Job:MultilineResult
```

We also support interim results, i.e., results that are not the final result of the service but which you want to make available to the user while the service is still running.
In this case, the output must be printed to stdout and prefixed with `PlanQK:Job:InterimResult`, for example:

```
PlanQK:Job:InterimResult: {"sum":25.2}
```

::: warning NOTE
For interim results, the complete JSON string must be printed to a single line.
:::
