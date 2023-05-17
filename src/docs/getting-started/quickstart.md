# Quickstart
A crash course on using the PlanQK Platform to run an entire Quantum workflow, from development to deployment :rocket:.

## Installation

### 1. Create an account 
If you don't have one yet, [create an account](https://platform.planqk.de/) 

### 2. Install the PlanQK CLI
To install the PlanQK CLI, you must install Node.js and the npm command line interface using either a 
[Node version manager](https://github.com/nvm-sh/nvm)or a [Node installer](https://nodejs.org/en/download).

Then install the PlanQK CLI globally using npm:
```bash
npm install -g @anaqor/planqk
```
For details read the [CLI reference](https://www.npmjs.com/package/@anaqor/planqk)

### 3. Login to your account
- [Create an Access Token](https://platform.planqk.de/settings/access-tokens) and copy the token to your clipboard.
- Login to your account using your access token:

```bash
planqk login -t <your access token>
```


## Create your first project
Create your first project by running the following command:

```bash
planqk init my-project
```

You will be prompted to provide some information about your project configuration.
For this quickstart, select the following configuration:
 - **Quantum Backend**: `NONE`
 - **vCPU**: `0.5 vCPU`
 - **Memory**: `1GB`
 - **Runtime**: `Pyton Template`
 - **Template**: `Vanilla`

This will create a new directory called `my-project` containing all required files to run your quantum code on the PlanQK platform.
You find a detailed description of the template in this [GitHub repository](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/python/vanilla).
It also contains a `planqk.json` file, which contains the project configuration. The file should look like this:

```json
{
  "name": "my-project",
  "description": "<your project description>",
  "quantumBackend": "NONE",
  "resources": {
    "cpu": 0.5,
    "memory": 1
  },
  "runtime": "PYTHON_TEMPLATE"
}
```

## Deploy your service
Deploy your service to the PlanQK Platform. Within your project directory, run:

```bash
planqk up
```

This will build your service, deploy it, and make it accessible to you via a REST API.

## Execute your service
Execute your service with the example input data by running the following command:

```bash
planqk run 
```

As a default, the input data and params are read from the `input.json` and `params.json` file contained in the input directory in your project.

You can also provide the input data and params as command line flags:

```bash
planqk run -d "{"values": [10,12]}" -p "{"round_up": true}"
```

For more details and options see the [CLI reference](https://www.npmjs.com/package/@anaqor/planqk)

## What's next?

<NextSection />