# CLI Reference

The PlanQK Command Line Interface (CLI) lets you interact with the PlanQk Platform directly from your terminal.
We have installation instructions to guide you through the initial setup in our [quickstart](quickstart.md) guide.

# Installation

To install the PlanQK CLI, you must install Node.js and the npm command line interface using either a
[Node version manager](https://github.com/nvm-sh/nvm) or a [Node installer](https://nodejs.org/en/download).

Then install the PlanQK CLI globally using npm:

```bash
npm install -g @anaqor/planqk
```

You can use the `--help` flag to get information about the supported commands:

``` bash
planqk --help
```

You may also get information about a specific command:

``` bash
planqk <command> --help
```

# Authentication

[Create a Personal Access Token](https://platform.planqk.de/settings/access-tokens) with `api` and `quantum_tokens` scopes.
Please copy the access token to your clipboard, since you will need it in the next steps.

Login to your account using your access token:

```bash
planqk login -t <your access token>
```

<!-- insert usage and commands here -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @anaqor/planqk
$ planqk COMMAND
running command...
$ planqk (--version)
@anaqor/planqk/2.4.3 darwin-arm64 node-v18.17.1
$ planqk --help [COMMAND]
USAGE
  $ planqk COMMAND
...
```

<!-- usagestop -->

### Commands

<!-- commands -->

* [`planqk autocomplete [SHELL]`](#planqk-autocomplete-shell)
* [`planqk create-openapi`](#planqk-create-openapi)
* [`planqk get-context`](#planqk-get-context)
* [`planqk init`](#planqk-init)
* [`planqk list-contexts`](#planqk-list-contexts)
* [`planqk login`](#planqk-login)
* [`planqk logout`](#planqk-logout)
* [`planqk run [SERVICEID]`](#planqk-run-serviceid)
* [`planqk services`](#planqk-services)
* [`planqk set-context [CONTEXTID]`](#planqk-set-context-contextid)
* [`planqk up`](#planqk-up)
* [`planqk serve`](#planqk-serve)

## `planqk autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ planqk autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ planqk autocomplete

  $ planqk autocomplete bash

  $ planqk autocomplete zsh

  $ planqk autocomplete --refresh-cache
```

_See
code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v2.1.9/src/commands/autocomplete/index.ts)_

## `planqk create-openapi`

Creates the OpenAPI definition based on the sample data in the "input" directory. The generated OpenAPI definition is saved in the file "openapi-spec.yml". An existing "openapi-spec.yml" file is saved as "openapi-spec-saved.yml" before it is overwritten.After the generation you may check the generated OpenAPI definition and correct it manually if necessary.

```
USAGE
  $ planqk create-openapi [--wd <value>]

FLAGS
  --wd=<value>  Working dir (e.g., for tests)

DESCRIPTION
  Creates the OpenAPI definition based on the sample data in the "input" directory. The generated OpenAPI definition is
  saved in the file "openapi-spec.yml". An existing "openapi-spec.yml" file is saved as "openapi-spec-saved.yml" before
  it is overwritten.After the generation you may check the generated OpenAPI definition and correct it manually if
  necessary.

EXAMPLES
  $ planqk create-openapi
```

_See code: [dist/commands/create-openapi/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk get-context`

Get the current context, i.e., the personal or organization account you are currently working with.

```
USAGE
  $ planqk get-context

DESCRIPTION
  Get the current context, i.e., the personal or organization account you are currently working with.

EXAMPLES
  $ planqk get-context
```

_See code: [dist/commands/get-context/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk init`

Initialize a PlanQK project.

```
USAGE
  $ planqk init

DESCRIPTION
  Initialize a PlanQK project.

EXAMPLES
  $ planqk init
```

_See code: [dist/commands/init/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk list-contexts`

Retrieves the available contexts, i.e., the personal or organizational accounts available to you to work with.

```
USAGE
  $ planqk list-contexts

DESCRIPTION
  Retrieves the available contexts, i.e., the personal or organizational accounts available to you to work with.

EXAMPLES
  $ planqk list-contexts
```

_See code: [dist/commands/list-contexts/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk login`

Login with your PlanQK Platform credentials

```
USAGE
  $ planqk login [-t <value>]

FLAGS
  -t, --token=<value>  Your personal access token

DESCRIPTION
  Login with your PlanQK Platform credentials

EXAMPLES
  $ planqk login -t <personal access token>
```

_See code: [dist/commands/login/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk logout`

Logout of the PlanQK Platform

```
USAGE
  $ planqk logout

DESCRIPTION
  Logout of the PlanQK Platform

EXAMPLES
  $ planqk logout
```

_See code: [dist/commands/logout/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk run [SERVICEID]`

Creates a job execution of a PlanQK Service

```
USAGE
  $ planqk run [SERVICEID] [-d <value>] [-p <value>] [--data-file <value>] [--params-file <value>]
    [--detached]

FLAGS
  -d, --data=<value>     Input data as JSON string.
  -p, --params=<value>   Parameters as JSON string.
  --data-file=<value>    Relative path to file containing input data.
  --detached             Executes the job in detached mode, i.e., without waiting for it to finish.
  --params-file=<value>  Relative path to file containing params.

DESCRIPTION
  Creates a job execution of a PlanQK Service

EXAMPLES
  $ planqk run

  $ planqk run --detached

  $ planqk run -d '{"values": [10,12]}' -p '{"round_up": true}'

  $ planqk run --data-file=./input/data.json --params-file=./input/params.json
```

_See code: [dist/commands/run/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk services`

List all available services of the current selected context.

```
USAGE
  $ planqk services

DESCRIPTION
  List all available services of the current selected context.

EXAMPLES
  $ planqk services
```

_See code: [dist/commands/services/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk set-context [CONTEXTID]`

Set the current context, i.e., the personal or organization account you are currently working with.

```
USAGE
  $ planqk set-context [CONTEXTID]

DESCRIPTION
  Set the current context, i.e., the personal or organization account you are currently working with.

EXAMPLES
  $ planqk set-context

  $ planqk set-context <context-id>
```

_See code: [dist/commands/set-context/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk up`

Creates or updates a PlanQK Service

```
USAGE
  $ planqk up [--silent]

FLAGS
  --silent  Suppresses all outputs, helpful when executed in a CI/CD pipeline.

DESCRIPTION
  Creates or updates a PlanQK Service

EXAMPLES
  $ planqk up
```

_See code: [dist/commands/up/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_

## `planqk serve`

Launches a web server that enables users to interact with the API. It facilitates service creation, status checks, and cancellation of service executions. A significant advantage is the ability to test services locally before deploying them to the platform

```
USAGE
  $ planqk serve [--port]

FLAGS
  --port  Defines the port on which the serve command is executed.

DESCRIPTION
  Initiates a web server that facilitates API interaction. If the flag is not present, the application uses 8081 as default port.

EXAMPLES
  $ planqk serve -p <port>
```

_See code: [dist/commands/serve/index.ts](https://github.com/PlanQK/planqk-cli/tree/main/src/commands)_
<!-- commandsstop -->
