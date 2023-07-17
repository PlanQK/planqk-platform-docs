# Runtime Interface







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
