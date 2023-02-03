# Service Platform

You have your quantum code ready in a Python file and want to provide it to others as a service via the PlanQK platform?
Great!
Only a few more steps until your service is ready and can be deployed for customers to subscribe to them.
Any questions regarding this process, as well as subscribing to service and job executions will be answered here.

## Service Provisioning - TL;DR

1. [Download the user code template](https://storage.googleapis.com/yeoman-templates/latest/template.zip).
2. Extract files and switch directory:
   ```bash
   unzip template.zip planqk_service
   cd planqk_service
   ```
    
3. Recommended: Create a conda environment and activate it:
    ```bash 
    conda env create -f environment.yml
    conda activate planqk-service
    ```
4. Include your quantum code in `program.py`, add required packages in `environment.yml` and (optionally) describe the API for your service in `openapi-spec.yml`.
5. Test functionality locally:
    ```bash
    python3 -m src
    ```
6. Compress files important for the service creation:
   ```bash
   zip -r user_code.zip src environment.yml openapi-spec.yml requirements.txt
   ```
7. Test functionality via docker:
    - Build image:
      ```bash
      docker pull ghcr.io/planqk/job-template:latest-base-1.0.0
      docker build -t planqk-service .
      ```
    - Run container with data and parameters from `input` folder in working directory:
      ```bash
      PROJECT_ROOT=(`pwd`) 
      docker run -it \
        -e BASE64_ENCODED=false \
        -e LOG_LEVEL=DEBUG \
        -v $PROJECT_ROOT/data.json:/var/input/data/data.json \
        -v $PROJECT_ROOT/params.json:/var/input/params/params.json \
        planqk-service
      ```
8. Create your service on the [PlanQK](https://platform.planqk.de) platform with the `user_code.zip` file.

## Service Provisioning - Detailed Version

You should solely focus on the development of great quantum algorithms.
Our platform helps you to transforming them into services that can be called by external customers via standardized HTTP interfaces.
In order to deploy your algorithm as a service and to provide them in the quantum service store, you need to follow these steps:

1. Embed your python code into our user code template.
2. Test your service locally and with Docker.
3. Deploy the service on the PlanQK platform.

Each of these points will be discussed in detail in the upcoming sections.

::: tip IMPORTANT
To follow this tutorial additional dependencies have to be installed.
These are the [Conda](https://docs.conda.io/projects/conda/en/latest/index.html) CLI (e.g., by installing [Anaconda](https://docs.anaconda.com/anaconda/install/)) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) CLI.
:::

### 1. Embedding the Python Code into the User Code Template

First, you need to download or generate the template.  
In order to generate it, follow these steps:

```bash
npm install -g yo
npm install -g @stoneone/generator-planqk-service

yo @stoneone/planqk-service <name>
```

Alternatively, the template can be downloaded as a zip file via these links: ([zip](https://storage.googleapis.com/yeoman-templates/latest/template.zip) | [tar.gz](https://storage.googleapis.com/yeoman-templates/latest/template.tar.gz))

After generating/extracting it, you should find the following structure:

```
.
├── Dockerfile
├── openapi-spec.yml
├── environment.yml
├── requirements.txt
├── input
│   └── ...
└── src
    ├── __init__.py
    ├── __main__.py
    ├── libs
    │   ├── __init__.py
    │   ├── return_objects.py
    │   └── ...
    └── program.py
```

We recommend building your service from within a dedicated and fresh Conda environment, s.t. you can simply install and track all required packages and see possible dependency issues early on.  
For this reason, the template already contains an `environment.yml` file from which a fresh environment can be created and activated by running the following command from within the template folder:

::: tip HINT
As an alternative to Conda, you may use `requirements.txt` to create a virtual environment with the tooling of your choice.
:::

```bash
conda env create -f environment.yml
conda activate planqk-service
```

And now, this is where the fun (a.k.a the service creation) begins.
You are now able to run the Python program as follows:

```bash
python3 -m src
```

The most important method, which takes the user input and generates the output of interest is the `run()` method inside `program.py`.

::: tip IMPORTANT
 Do not rename either the `src` folder, the `program.py` package, as well as the `run`-method inside `program.py`.
 These are fixed entry points for the service.
 Changing their names will result in a malfunctioning service.
:::

From the start, you should be able to run `python3 -m src` from within the `user_code` folder, which is our goal when replacing the provided dummy code with your own.
Running this line will execute the `__main__`-method, which in turn reads in files from the `input` folder to be used as input for the `run()` method.
The content of the `data.json` and the `params.json` files are passed as Python dictionaries to the `run()` method.
Remember, that within JSON-format the property of an object must be of type string.

Any required Python package (like numpy, pandas, ...) must be mentioned within the - you guessed it - `environment.yml` with its corresponding version number in the pip-installation format (e.g. `numpy==1.19.0`).
For other virtual environment tools you may specify the versions in a `requirements.txt` file.
However, you have to specify everything in the `environment.yml` file as well as this file is used by the PlanQK Platform at runtime.
If no version number is provided the latest stable version of the package will be installed.
These packages can then be imported within any python file associated to the service.

If you have additional Python files, which are necessary for executing your code, you can simply put them into the `libs` folder and import them via relative imports into your program (e.g. additional functions can be stored in `libs/helpers.py` and can be imported within `program.py` with the syntax `from .libs/helpers import *`).

::: tip IMPORTANT
If you plan to run your program on real quantum hardware or cloud simulators, your program should expect some valid `"backend"` string within the `"params"` object (e.g. `"backend": "ibmq_qasm_simulator"` or `"backend": "ibmq_manila"`).
:::

At last, you must zip (at minimum) the `src` folder and `environment.yml`, which will be the file you upload in order to create a service.
Note, that you must not zip the `user_code` folder itself but its content.
To do this, use the following command while being in the folder:

```
zip -r user_code.zip src environment.yml openapi-spec.yml requirements.txt
```

This creates a `user_code.zip` file that you can upload to the PlanQK platform in order to create a service.

::: tip RECOMMENDED
After being able to run your code as a module and if you're interested in offering your service via an API to others, you should also take the time to adapt the `openapi-spec.yml` file, in order to describe your API.
:::

### 2. Test your Service locally and with Docker

Before deploying it on the PlanQK platform, you should test the correct behaviour of your service on your local machine.
This will help you to identify and correct potential errors before the actual deployment process.

#### Local testing

At first, as described in the beginning of the previous section, execute your service locally by running

```bash 
python3 -m src
```

 **NOTE:** Please ensure that the `environment.yml` file contains _all_ necessary packages for executing your program.
 You can easily check this by testing the local execution in a fresh conda environment with the packages from the file:

 ```bash 
 conda env create -f environment.yml -n planqk-service-test
 conda activate planqk-service-test
 python3 -m src
 ```

If this runs smoothly and as expected, you should also test your implementation by utilizing Docker.
In general, by following the described procedure you replicate the steps performed by the PlanQK platform, which is a way to verify your service in an early stage.

#### Build the Docker Image

```bash
docker pull ghcr.io/planqk/job-template:latest-base-1.0.0
docker build -t planqk-service .
```

#### Start the Docker Container

You need to pass the `"data"` and `"params"` attributes as JSON-serialized objects into the container, either in the form of separate files or as environment variables (base64 encoded).

When mounting separate files, use the destination paths `/var/input/data/data.json` for the input data and `/var/input/params/params.json` for additional execution parameters.  
Assuming you stored them in the according input folder as `data.json` and `params.json` the container can be started via the following command:

```bash
PROJECT_ROOT=(`pwd`) 
docker run -it \
  -e BASE64_ENCODED=false \
  -e LOG_LEVEL=DEBUG \
  -v $PROJECT_ROOT/data.json:/var/input/data/data.json \
  -v $PROJECT_ROOT/params.json:/var/input/params/params.json \
  planqk-service
```

 **NOTE:**
 For GitBash users on Windows, replace
 ```bash
 PROJECT_ROOT=(`pwd`)
 ```
 with
 ```bash
 PROJECT_ROOT=(/`pwd`)
 ```

 For Windows command-prompt users, you can use the following command:
 ```bash
 docker run -it \
   -e BASE64_ENCODED=false \
   -e LOG_LEVEL=DEBUG \
   -v %cd%/input/data.json:/var/input/data/data.json \
   -v %cd%/input/params.json:/var/input/params/params.json \
   planqk-service
 ```

If the service executed successfully, you should see something like `Job:ResulsResponse:` followed by the output you defined for your service.
Otherwise, if you see `Job:ErrorResponse`: Bad news, something went wrong.
However, the details of the response hopefully give you a clue as to what the problem was.

Alternatively, you could also pass any input by environment variables.
You can either use command line tools like `base64` or [Base64 Encoder](https://www.base64encode.org) for encoding the input.
For example, to create a base64 encoded string of the `"data"` part of the `input.json` file, execute the following:

```bash
base64 -w 0 <<EOF
{"values": [100, 50, 200, 70, 0.69]}
EOF

>> eyJ2YWx1ZXMiOiBbMTAwLCA1MCwgMjAwLCA3MCwgMC42OV19
```

::: tip NOTE 
In general, the maximum default length of environment variables in Linux-based systems is at 128KiB.
On Windows, the maximum default length is at 32KiB.
:::

To create a base64 encoded string of the `"params"` part, execute the following:

```bash
base64 -w 0 <<EOF
{"round_off": false}
EOF

>> eyJyb3VuZF9vZmYiOiBmYWxzZX0=
```

Afterwards, start the container with the environment variables `DATA_VALUE` and `PARAMS_VALUE` as follows:

```bash
docker run -it \
  -e DATA_VALUE=eyJ2YWx1ZXMiOiBbMTAwLCA1MCwgMjAwLCA3MCwgMC42OV19 \
  -e PARAMS_VALUE=eyJyb3VuZF9vZmYiOiBmYWxzZX0= \
  planqk-service
```

### 3. Create an API Spec File for your Service

Although not absolutely necessary for providing a service, we do strongly recommend to write an API description for your service.
This API description gives users of the service a manual on how they are able to communicate with the service, namely how they can send the input for problems and receive the solutions.  
On the PlanQK platform we support the OpenAPI 3.0 (formerly Swagger) format for describing the REST methods used for communicating with the service.
Since the execution of services might take several hours (e.g. for training variational circuits) we support an asynchronous communication.  
The user code template already includes the file `openapi-spec.yml`, which is a generic API description and can (and should!) be adapted for your own service.
This especially refers to defining the types of input and output for the corresponding REST-methods which will be described below.

#### `GET /`

Gives the user the information, whether the service is available at all.

#### `POST /`

The POST method is used to start a service execution while sending the appropriate input.
This method returns an execution id, which is required for receiving results of the execution.

#### `GET /{id}`

The ID generated by the POST method can be used for this method to check on the status of the service execution.
The possible status values are quite self-explanatory but just to make sure:

If the execution is still running, you should get `"status": "RUNNING"` or `"status": "PENDING"` (especially in the beginning ).

When the execution finished successfully, you should see `"status": "SUCCEEDED"`.

If you get either `"status": "FAILED"` or `"status": "UNKNOWN"`... Well, apparently something went wrong. Hopefully, you get some information on what went wrong with the next method.

#### `GET /{id}/result`

If the service execution either failed or succeeded, you can get the results (or details on the occurred problems) via this method.
Within the API description you should describe for this method what kind of output the user has to expect when successfully running the service.

### 4. Deploy Services on the PlanQK Platform

When you have zipped your code and successfully tested it via Docker, creating a service via the platform is easy:
From the landing page, go to [My Services](https://platform.planqk.de/services).
Here you need to click on `Create Service` in the top right corner.

You will be directed to an interface, where you can provide information, as well as the actual user code.

**Service Properties:**

| Property          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name              | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                                                                                                                                                                                                                                                                                                                                                           |
| Service Import    | Click on "Import from file" and upload your zipped service. The option "Import from URL" can be used if your service is running somewhere (e.g., on your own infrastructure) and you just want the PlanQK platform to manage the access to it.                                                                                                                                                                                                                                                                         |
| API Specification | Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. You can leave this empty to use the default OpenAPI specification supplied with this template.                                                                                                                                                                                                                                                                    | 
| Description       | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here.                                                                                                                                                                                                                                                                                                                    |
| Quantum Backend   | Currently, only IBM and D-Wave are supported quantum backends and only one can be picked. Afterwards, you have to decide to use your own Quantum Backend Token ([more info](additional-information.md)) or whether you let PlanQK manage it for you. If you are working with local simulators only (e.g., when using the `AerBackend` from Qiskit or the `SimulatedAnnealingSampler` from the D-Wave anneal package) you may choose the option "None", since locally running code does not get affected by the choice. |
| Pricing Plans     | Will be important for when you want to offer your service via the marketplace and charge your customers for using them. If you just want to test your service, you should select "Free".                                                                                                                                                                                                                                                                                                                               |

And there you go. As soon as you click on "Create Service", the containerization and deployment starts.
As soon as it's finished (as indicated in the "My Services" section with a green checkmark) you will be able to publish your service to the quantum service store or for internal use and test your service thoroughly.

#### 4.1 Using the PlanQK CLI

As an alternative to section 3, you could also use the PlanQK CLI to deploy your service on the PlanQK Platform.

| Platform              | Download                                                                                               |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| macOS (Apple Silicon) | [Download](https://storage.googleapis.com/planqk-cli/v1.1.0/planqk-v1.1.0-f24f039-darwin-arm64.tar.gz) |
| macOS (Intel)         | [Download](https://storage.googleapis.com/planqk-cli/v1.1.0/planqk-v1.1.0-f24f039-darwin-x64.tar.gz)   |
| Linux ARM             | [Download](https://storage.googleapis.com/planqk-cli/v1.1.0/planqk-v1.1.0-f24f039-linux-arm.tar.gz)    |
| Linux x64             | [Download](https://storage.googleapis.com/planqk-cli/v1.1.0/planqk-v1.1.0-f24f039-linux-x64.tar.gz)    |
| Windows x64           | [Download](https://storage.googleapis.com/planqk-cli/v1.1.0/planqk-v1.1.0-f24f039-win32-x64.tar.gz)    |
| Windows x86           | [Download](https://storage.googleapis.com/planqk-cli/v1.1.0/planqk-v1.1.0-f24f039-win32-x86.tar.gz)    |

1. Download the CLI
2. Extract the archive and add the full path to the `planqk/bin` directory to your `PATH` variable, extend either `$PATH` for Linux/macOS or `%PATH%` for Windows.
3. Open a command prompt and type: `planqk`
4. First of all, you have to log-in:
    1. Open [platform.planqk.de](https://platform.planqk.de), go to `Settings` and create a new `Personal Access Token` with at least `api` scope.
    2. Copy your new token and execute `planqk login -t <value>`
5. Finally, navigate to your user code project and, for example, execute the following:
    1. `zip -r user_code.zip src environment.yml openapi-spec.yml requirements.txt`
    2. `planqk up --file=user_code.zip --api-spec=openapi-spec.yml`
    3. Complete the prompts to finally create your service on the PlanQK Platform
6. Open [platform.planqk.de](https://platform.planqk.de), go to `My Services` and either publish it to the marketplace or for internal use.

::: tip NOTE 
At the moment you can only create "free" services.
:::

<details>
   <summary>CLI Commands</summary>

**`planqk login`**

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

**`planqk logout`**

Logout of the PlanQK Platform

```
USAGE
  $ planqk logout

DESCRIPTION
  Logout of the PlanQK Platform

EXAMPLES
  $ planqk logout
```

**`planqk up`**

Creates a PlanQK Service

```
USAGE
  $ planqk up [-n <value>] [-d <value>] [-q NONE|IBM|DWAVE] [--file <value>] [--api-spec <value>]

FLAGS
  -d, --description=<value>       The description of your PlanQK Service
  -n, --name=<value>              The name of your PlanQK Service
  -q, --quantum-backend=<option>  The quantum backend used by your PlanQK Service
                                  <options: NONE|IBM|DWAVE>
  --api-spec=<value>              The OpenAPI definition file describing your service API
  --file=<value>                  The ZIP archive containing your service source that follows the PlanQK user code
                                  template

DESCRIPTION
  Creates and updates a PlanQK Service

EXAMPLES
  $ planqk up --file=user_code.zip --api-spec=openapi-spec.yml
```

**`planqk help [COMMAND]`**

Display help for planqk.

```
USAGE
  $ planqk help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for planqk.
```

**`planqk autocomplete [SHELL]`**

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

</details>

The next sections guide you through how to use the newly created service.

## Using a Service

After a quantum service was published, you need to subscribe to it through _applications_ first.
Then you can interact with it in order to execute its business logic either through HTTP or directly from your own code through Java, Python oder JavaScript clients.
You can download the clients from the platform's service page in the [Marketplace](https://platform.planqk.de/marketplace/apis).  
To be language independent we will focus on HTTP examples in this section.

Examples showing how to utilize results from services (e.g. via Jupyter notebooks) can be found in [this](https://github.com/PlanQK/service-usage-examples) repository.

### Subscribing to Services using Applications

Whenever you want to interact with services from the marketplace, you must be subscribed to them with an application.
[Applications](https://platform.planqk.de/applications) hold all necessary information for a secure communication with the service from an external source.
This includes a public and secret key pair, as well as a token- and service endpoint.
The former is used for generating an Authorization token, which is required for sending requests to the latter.

::: tip IMPORTANT
To test the correct behaviour of _your own services_ you should publish it "for internal use".
In order to test it, you can use any of your applications to subscribe to this service.
:::

There are two ways to subscribe to a service. One is to subscribe to an internal service, the other is to subscribe to a service that has been published on the marketplace.

### Subscribe to an internal service

1. Navigate to the details page of your service

    <img width="40%" alt="service-overview" src="./assets/service-overview.png">
    
2. Click on the "Publish Internal" button

    <img width="40%" alt="service-details-page" src="./assets/service-details-page.png">

3. Navigate to the details page of your application

    <img width="40%" alt="application-overview" src="./assets/application-overview.png">

4. Press the "Subscribe to Service" button
5. A modal dialog appears in which you have to select the published service

    <img width="40%" alt="internal-service-subscription" src="./assets/internal-service-subscription.png">

6. After you have selected the correct service, click on the "Subscribe" button in the modal dialog


### Subscribe to a service published on the marketplace

1. Navigate in the upper navigation bar to the "Marketplace" mask

    <img width="40%" alt="navigation-bar" src="./assets/navigation-bar.png">

2. Select "Services" from the navigation menu

    <img height="200px" alt="marketplace-service-overview" src="./assets/marketplace-service-overview.png">

3. Select a service you want to subscribe to and navigate to its details page
4. Select the pricing plan that suits you and click on the "Subscribe" button of the respective pricing plan. A modal dialog will show up

    <img width="40%" alt="select-pricing-plan" src="./assets/select-pricing-plan.png">

4. Finally, select the application and press the "Subscribe" button

    <img width="40%" alt="application-selection" src="./assets/application-selection.png">


The token can be requested from the platform's token endpoint by providing the client credentials, i.e. the _Consumer Key_ and _Consumer Secret_ of your application.

1. Go to your application in the [Applications](https://platform.planqk.de/applications) section
2. Copy the curl command into your clipboard by clicking the "Copy Text" button. The command contains already the consumer key and secret encoded as Base64 string.
3. Paste and execute the command in your favorite shell.
4. The value of the property `"access_token"` contains the authorization token.

An example curl command copied for retrieving the token is presented below:

```
curl -k -X POST https://gateway.am.platform.planqk.de/token -d "grant_type=client_credentials" -H "Authorization: Basic b2g3cWROZHBCZ0N1OGZ1dV8xMjlORkZBbnNZYTpSaGtVYndhamY4WEh6NktpOXdFZUVhVF9LdGth"
```

The response of the command reveals the authorization token:

```json
{"access_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUX...","scope":"default","token_type":"Bearer","expires_in":3600}
```

You need to add this token in each subsequent HTTP request to the `"Authorization: Bearer"` header field to authenticate yourself.
Then token has an expiration time, i.e., after it expired you need to obtain a new one with the curl command above.

### Starting Service Execution

To start the execution of a service, you need to provide the following information:

1. **Service Endpoint URL**: Can be obtained from the subscriptions section of your application that subscribed to the service
2. **Authorization Bearer Token**: Can be obtained from platform's token endpoint as described in the previous section
3. **Header Fields**: `Content-Type` and  `Accept` are both set to `application/json`
4. **Input Data**: Either passed as [value or as data pool reference](#input-data)
5. **Parameters**: Either passed as [value or as data pool reference](#input-parameters)

An example curl call is shown below:

```
curl -X 'POST' \
  'https://gateway.am.platform.planqk.de/70b6e720-dcec-4b9b-a462-a6fdaf400bfa/myservice/1.0.0/' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXp...' \
  -d '{
    "data": {
      "values": [
        100,
        50,
      ]
    },
    "params": {
      "round_off": false
    }
  }'
```

For each call a new service execution is created.
The id of the service execution and its initial execution state is returned by the POST request.
The POST above returns for instance the following result:

```json
{"id":"02e0d85a-5a95-4abe-a642-1ee9a94fdf14","status":"PENDING","createdAt":"2022-09-19 16:45:24"}%
```

The execution id can be used to query the state and the result of a service execution.

#### Service Execution State & Result

Since a service execution is performed asynchronously, you need to query its state to know if its execution completed.
After a service was completed you can retrieve the result.
Therefore, a service provides a set of [REST endpoints](#_3-create-an-api-spec-file-for-your-service) to query the state of each of its executions.

The state can be retrieved by calling the endpoint `GET /{id}`.
The state of our example service execution with id `02e0d85a-5a95-4abe-a642-1ee9a94fdf14` can be for instance retrieved with the following request:

```
curl -X 'GET' \
  'https://gateway.am.platform.planqk.de/70b6e720-dcec-4b9b-a462-a6fdaf400bfa/myservice/1.0.0/02e0d85a-5a95-4abe-a642-1ee9a94fdf14' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ...'
```

If the execution is still running, you should get `"status": "RUNNING"` or `"status": "PENDING"`.
When the execution finished successfully, you should see `"status": "SUCCEEDED"`.
If you get either `"status": "FAILED"` or `"status": "UNKNOWN"` something went wrong.

You can retrieve the result or the cause of an error through the endpoint `GET /{id}/result`:

```
curl -X 'GET' \
  'https://gateway.am.platform.planqk.de/70b6e720-dcec-4b9b-a462-a6fdaf400bfa/myservice/1.0.0/02e0d85a-5a95-4abe-a642-1ee9a94fdf14/result' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer ...'
```

If the service execution succeeded, the response contains the `"result"` property containing the response as JSON object plus an optional metadata field:

```
{"metadata":null,"result":{"sum":420.69}}
```

In case of an error the message may contain an error `"code"` and an error `"detail"` property, for example:

```json
{"code":"CONNECTION_ERROR","detail":"Backend host could not be found."}
```

#### Input Data

Input data being processed by the service can be either passed as **value** or as **[data pool](community-platform.md#data-pools)**.

::: tip IMPORTANT
Currently, only JSON is supported as service input.
Binary and stream data support will be added in the future.
:::

To pass input data as value, provide the `"data"` object as payload of the POST request as shown in the example above.  
You can pass as value for the `"data"` object an arbitrary key-value JSON map:

```
{
  "key1": val1,
  "key2": val2,
  ...
}
```

Input data passed by value are limited to a maximum size of 1MB.
To pass larger data sets to a service, you can use data pools instead.
This also enables you to easily reuse data provided by other platform users.

To pass the content of a data pool as input, specify the keyword `"dataRef"` instead of `"data"` followed by a colon and a JSON object referencing the file within the data pool.
Therefore, the object specifies the id of the data pool `"dataPoolId"`, the id of the data source descriptor `"dataSourceDescriptorId"` and the id of the actual file `"fileId"`.

Here the call of our example service with a data pool reference is shown:

```
curl -X 'POST' \
  'https://gateway.am.platform.planqk.de/70b6e720-dcec-4b9b-a462-a6fdaf400bfa/myservice/1.0.0/' \
  ...
  -d '{
    "dataRef": {
      "dataPoolId": "2a7d74a6-0bb5-400a-8a0c-7125aef5613e",
      "dataSourceDescriptorId": "040cdf8f-a2c8-449d-a534-498c597b124c",
      "fileId": "c52e7fa2-d971-4249-b4b4-aecedf8e3068"
    },
    "params": {...}
  }'
```

To obtain the data pool file reference object perform the following steps:

1. Go to your data pool in the [data pool](https://platform.planqk.de/datapools) section.
2. Click the "Copy Text" button of the respective file to copy the file reference object to your clipboard.

#### Input Parameters

Input parameters provide additional (meta-)information for the execution such as the number of shots, the number of variational layers for a circuit or the name of the backend.
Like input data, they can be either provided as value or as data pool.

To provide them as value use the `"params"` key with an arbitrary key-value JSON map as value as shown in the example at the beginning of this section.

Use the key `"paramsRef"` to reference the parameter value data pool content.
This you can reuse your parameter settings for different service executions.

```
curl -X 'POST' \
  'https://gateway.am.platform.planqk.de/70b6e720-dcec-4b9b-a462-a6fdaf400bfa/myservice/1.0.0/' \
  ...
  -d '{
    "data": {...},
    "paramsRef": {
      "dataPoolId": "e06c3254-34d1-11ed-a261-0242ac120002",
      "dataSourceDescriptorId": "040cdf8f-a2c8-449d-a534-498c597b124c",
      "fileId": "c52e7fa2-d971-4249-b4b4-aecedf8e3068"
    }
  }'
```

## Jobs

The PlanQK Platform also provides the functionality to execute services directly via the platform without the need of dealing with the underlying REST methods when communicating with existing services.
We refer to this feature as _Jobs_ and they are either based your own services or on suitable implementations provided by the community.
Jobs can be especially useful when experimenting with implementations for quantum hardware and when intending to share results with other users of the platform in the form of a [data pool](community-platform.md#data-pools).

### Create Jobs

When being in the "Jobs" tab you should see a (possibly empty) list of finished jobs.
If you did not execute any jobs yet, it's time to change that.
So click on "Create Job" in the top right corner, and the interface guides you through the necessary steps.

#### 1. Service (from Implementation)

You have to select a service that should be run as a job.
This can either be one of your own services or (and that is the neat part of this feature) an implementation provided for any of the algorithms.
Any implementation provided according to the steps described [here](community-platform.md#provide-an-implementation-for-job-execution) and to which you have access can be used for jobs.
In order to do so, click on "Create Service" button next to the file for the implementation of your choice.
After the service has been created it should appear in the list of available services for your job.  
Also, if an API file was provided for your selected service, you should see it at the bottom of the page.

#### 2. Input Data

In general, services that run via the PlanQK platform, require two, possibly empty, fields as input.
These fields are `"data"` and  `"params"` (if you have worked with the user code template, you should have seen them already).
The field `"data"` should provide all the data required for the problem at hand, e.g., a QUBO.
The `"params"` field should provide additional (meta-)information for the execution such as the number of iterations, the number of variational layers for a circuit or the name of the backend.
Note, the data or param size must not exceed 1 MB.

::: tip IMPORTANT
The input of this step are the components of the `"data"` field of the implementation.
:::

You have the option to hand over the input as a single JSON object or load an existing input object from the [Data Pools](community-platform.md#data-pools).

#### 3. Job Parameters

Similar to the section above, the job parameters refer to the corresponding `"params"` field of a service.
You have the option to include them via key-value pairs or directly as a JSON object, similar to the input data.

#### 4. Advanced Settings

Right now, there's not much for this point except for the option to save the results of your job in a data pool to e.g. share them with other users.

### Job Results

Now, after you clicked on "Run" you will be direct to the page dedicated to the result and details of your job.
Directly after starting it, you will probably just see "Input Data" and "Job Parameters" fields containing the information you just provided the step prior.  
After the job has (hopefully successfully) finished, the status icon switches to one of two things: It being a green checkmark says - Hooray!
Your job has been executed without any errors, and you see your result either directly on that page or, if you chose that option, in a specifically created data pool.  
On the other hand, if the status switches to a red cross, something went wrong.
For that reason we included the **Logs** of the job in the top right corner for your convenience.
The information you find there hopefully helps in identifying if something in the provided data was missing or whether the service itself is malfunctioning.
