# Quickstart

A crash course on using the PlanQK Platform to run an entire Quantum workflow, from development to deployment :rocket:.

## Installation

### 1. Create an account

If you don't have one yet, [create an account](https://platform.planqk.de/)

### 2. Install the PlanQK CLI

To install the PlanQK CLI, you must install Node.js and the npm command line interface using either a
[Node version manager](https://github.com/nvm-sh/nvm) or a [Node installer](https://nodejs.org/en/download).

Then install the PlanQK CLI globally using npm:

```bash
npm install -g @anaqor/planqk
```

For details read the [CLI reference](./cli-reference.md)

### 3. Login to your account

- [Create an Access Token](https://platform.planqk.de/settings/access-tokens) with the scope `api` and `quantum_tokens`
  and copy the token to your clipboard.
- Login to your account using your access token:

```bash
planqk login -t <your access token>
```

## Create your first project

Create your first project by running the following command:

```bash
planqk init
```

You will be prompted to provide some information about your project configuration.
For this quickstart, select the following configuration:
- **Name**: `my-project`
- **Template**: `Python Starter IonQ` (Premium Account required) | `Starter Qiskit` (Free Account)
- **vCPU**: `0.5 vCPU`
- **Memory**: `1GB`

::: tip
Access to IonQ's quantum computers requires a Premium Account. If you don't have one, you can use
our `Starter Qiskit` template.
:::

This will create a new directory called `my-project` containing all required files to run your quantum code on the
PlanQK Platform.
The starter templates implement quantum random number generation using either the IonQ Simulator or the Qiskit Aer Simulator.
You can find a detailed description of the templates in
this [GitHub repository](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/python).
It also contains a `planqk.json` file, which contains the project configuration. The file should look like this:

```json
{
  "name": "my-project",
  "description": "<your project description>",
  "quantumBackend": "IONQ",
  "resources": {
    "cpu": 0.5,
    "memory": 1
  },
  "runtime": "PYTHON_TEMPLATE"
}
```

## Test your service locally

Let's test your service locally before deploying it to the PlanQK Platform.
First, switch to your project directory:

```bash
cd my-project
```

Then, install the required dependencies. We recommend using a dedicated [conda](https://docs.conda.io/en/latest/)
environment.
As an alternative, you can use the requirements.txt to install the dependencies with the tooling of your choice.

With conda run:

```bash
conda env create -f environment.yml
conda activate my-project
```

Finally, run your service locally:

```bash
python -m src
```

The output should look like this:

```json
{"result": {"random_number": 216}, "metadata": {"execution_time": 9.327}}
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
After a successful execution, the output should look like this:

```bash
Running Job (a7a3422b-9522-408b-96c9-32cdb497b12b)... Job succeeded.
See result at https://platform.planqk.de/jobs/a7a3422b-9522-408b-96c9-32cdb497b12b
```

As a default, the input data and params are read from the `input.json` and `params.json` file contained in the input
directory in your project.

You can also provide the input data and params as command line flags:

```bash
planqk run -d '{"values": [10,12]}' -p '{"round_up": true}'
```

For more details and options see the [CLI reference](https://www.npmjs.com/package/@anaqor/planqk)

## What's next?

<NextSection />
