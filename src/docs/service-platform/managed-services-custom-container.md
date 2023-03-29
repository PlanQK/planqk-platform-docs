# Managed Services using Custom Docker Containers

PlanQK support to run your service based on a custom Docker container.
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

The platform runtime uses the input provided via the Service API in the form of { "data": <data>, "params": <params> }.
The runtime then mounts the input data to `/var/input/data.json` and the parameters to `/var/input/params.json` of the container.
Both files will contain valid JSON strings.

#### Output:

You could use a logging library or simply standard output (stdout) to show any processing relevant information to your users.
For example, users may obtain these logs from a PlanQK Job they have run against your service.

Additionally, the platform requires that any **result** output produced by the service to be in a specific format.
Specifically, the output must be printed to standard output (stdout) and prefixed with `PlanQK:Job:Result:`.
Only the first stdout output using this marker will be used as the result output of the service.
The output itself must also be a valid JSON string.
