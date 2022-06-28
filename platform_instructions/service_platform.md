# Service Platform

You have your quantum code ready in a Python file and want to provide it to others as a service via the PlanQK platform?
Great!
Only a few more steps until your service is ready and can be deployed for customers to subscribe to them.
Any questions regarding this process, as well as subscribing to service and job executions will be answered here.

## Service Provisioning

## TL;DR
1. Download the user code template [here](https://storage.googleapis.com/yeoman-templates/latest/template.zip).  
2. Extract files and switch directory:
   ```bash
   unzip template.zip planqk_service
   cd planqk_service
   ```
    **Recommended**: Develop and test in a dedicated conda environment:
    ```bash 
    conda env create -f environment.yml
    conda activate planqk-service
    ```
3. Include your quantum code in `program.py`, add required packages in `requirements.txt` and (optionally) describe the API for your service in `openapi-spec.yml`.
4. Test functionality locally:
    ```bash
    python -m src
    ```
5. Compress files important for the service creation:
   ```bash
   zip -r user_code.zip src requirements.txt openapi-spec.yml
   ```
6. Test functionality via docker:
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
7. Create your service on the [PlanQK](https://platform.planqk.de) platform with the `user_code.zip` file.

## Detailed Version

You should solely focus on the development of great quantum algorithms.
Our platform helps you to transforming them into services that can be called by external customers via standardized HTTP interfaces.
In order to deploy your algorithm as a service and to provide them in the quantum service store, you need to follow these steps:

1. Embed your python code into our user code template.
2. Test your service locally and with Docker.
3. Deploy the service on the PlanQK platform.

Each of these points will be discussed in detail in the upcoming sections.

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
We recommend building your service from within a dedicated and fresh conda environment, s.t. you can simply install and track all required packages and see possible dependency issues early on.  
For this reason, the template already contains an `environment.yml` file from which a fresh environment can be created and activated by running
```bash
conda create -f environment.yml
conda activate planqk-service
```
from within the template folder. And now, this is where the fun (a.k.a the service creation) begins.  

The most important method, which takes the user input and generates the output of interest is the `run` method inside `program.py`.

> **Important:** 
> Do not rename either the `src` folder, the `program.py` package, as well as the `run`-method inside `program.py`.
> These are fixed entry points for the service. Changing their names will result in a malfunctioning service.

From the start, you should be able to run `python -m src` from within the `user_code` folder, which is our goal when replacing the provided dummy code with your own.
Running this line will execute the `__main__`-method, which in turn reads in files from the `input` folder to be used as input for the `run` method.
Inputs should be in a JSON-conform format with the properties `"data"` and `"params"`.
Remember, that within JSON-format the property of an object must be of type string.

Any required python package (like numpy, pandas, ...) must be mentioned within the - you guessed it - `requirements.txt` with its corresponding version number in the pip-installation format (e.g. `numpy==1.19.0`).
If no version number is provided the latest stable version of the package will be installed.
These packages can then be imported within any python file associated to the service.

If you have additional python files, which are necessary for executing your code, you can simply put them into the `libs` folder and import them via relative imports into your program (e.g. additional functions can be stored in `libs/helpers.py` and can be imported within `program.py` with the syntax `from .libs/helpers import *`).

> **Important:**
> If you plan to run your program on real quantum hardware or cloud simulators, your program should expect some valid `"backend"` string within the `"params"` object (e.g. `"backend": "ibmq_qasm_simulator"` or `"backend": "ibmq_manila"`).

At last, you must zip (at minimum) the `src` folder and `requirements.txt`, which will be the file you upload in order to create a service.
Note, that you must not zip the `user_code` folder itself but its content.
To do this, use the following command while being in the folder:
```
zip -r user_code.zip src requirements.txt openapi-spec.yml
```
This creates a `user_code.zip` file that you can upload to the PlanQK platform in order to create a service.

> **Recommended:**
> After being able to run your code as a module and if you're interested in offering your service via an API to others, you should also take the time to adapt the `openapi-spec.yml` file, in order to describe your API.

### 2. Test your Service locally and with Docker

Before deploying it on the PlanQK platform, you should test the correct behaviour of your service on your local machine.
This will help you to identify and correct potential errors before the actual deployment process.

#### Local testing

At first, as described in the beginning of the previous section, execute your service locally by running
```bash 
python -m src
```
> **Note**: Please ensure that `requirements.txt` contains *all* necessary packages for executing your program. You can easily check this by testing the local execution in a fresh conda environment with the packages from the file according to
> ```bash 
> conda env create -f environment.yml -n service_test
> conda activate service_test
> pip install -r requirements.txt
> python -m src
> ```
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
> **Note**:
> For GitBash users on Windows, replace 
> ```bash
> PROJECT_ROOT=(`pwd`)
> ```
> with
> ```bash
> PROJECT_ROOT=(/`pwd`)
> ```
> 
> For Windows command-prompt users, you can use the following command:
> ```bash
> docker run -it \
>   -e BASE64_ENCODED=false \
>   -e LOG_LEVEL=DEBUG \
>   -v %cd%/input/data.json:/var/input/data/data.json \
>   -v %cd%/input/params.json:/var/input/params/params.json \
>   planqk-service
> ```


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

> **Note**:
> In general, the maximum default length of environment variables in Linux-based systems is at 128KiB.
> On Windows, the maximum default length is at 32KiB.

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

### 2.5 Create an API Spec File for your Service

Although not absolutely necessary for providing a service, we do strongly recommend to write an API description for your service.
This API description gives users of the service a manual on how they are able to communicate with the service, namely how they can send the input for problems and receive the solutions.  
On the PlanQK platform we support the OpenAPI 3.0 (formerly Swagger) format for describing the REST methods used for communicating with the service.
Since the execution of services might take several hours (e.g. for training variational circuits) we support an asynchronous communication.  
The user code template already includes the file `openapi-spec.yml`, which is a generic API description and can (and should!) be adapted for your own service.
This especially refers to defining the types of input and output for the corresponding REST-methods which will be described below.  

#### `GET /`

Gives the user the information, whether the service is available at all.

#### `POST /`

The POST method is used to send input for the service execution. Using this method gives gives back an execution id, which is required for receiving results of the execution.

#### `GET /{id}`

The ID generated by the POST method can be used for this method to check on the status of the service execution.
The possible status values are quite self-explanatory but just to make sure:  

If the execution is still running, you should get `"status": "RUNNING"` or `"status": "PENDING"` (especially in the beginning ).

When the execution finished successfully, you should see `"status": "SUCCEEDED"`.

If you get either `"status": "FAILED"` or `"status": "UNKNOWN"`... Well, apparently something went wrong. Hopefully, you get some information on what went wrong with the next method.


#### `GET /{id}/result`

If the service execution either failed or succeeded, you can get the results (or details on the occurred problems) via this method.
Within the API description you should describe for this method what kind of output the user has to expect when successfully running the service.

### 3. Deploy Services on the PlanQK Platform

When you have zipped your code and successfully tested it via Docker, creating a service via the platform is easy:
From the landing page, go to [My Services](https://platform.planqk.de/services).
Here you need to click on `Create Service` in the top right corner.

> **Important**:
> You need to add a valid credit card before being able to create services. 
> This card is used to charge you for the costs that emerge from hosting the service on the platform.
> To add the card go to [Payments](https://platform.planqk.de/settings/payments).
> Since the platform is still under development, the payments are just simulated.
> Therefore, you can provide a [test credit card number](https://stripe.com/docs/testing#europe-and-middle-east). 
> A detailed step-by-step tutorial is described in this [video](https://www.loom.com/share/1ddf3b919bbc4219883f576931a14a12).

You will be directed to an interface, where you can provide information, as well as the actual user code.

**Service Properties:**

| Property          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name              | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Service Import    | Click on "Import from file" and upload your zipped service. The option "Import from URL" can be used if your service is running somewhere (e.g., on your own infrastructure) and you just want the PlanQK platform to manage the access to it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| API Specification | Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. If you did not prepare one, but you want to test the communication with you service (via a GET), you may upload the default OpenAPI file that was provided with this template.                                                                                                                                                                                                                                                                                                                                                                                              |
| Description       | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Quantum Backend   | As of February 2022, only IBM and DWave are supported quantum backends and only one can be picked. These options are only available, if you have stored a token for the corresponding provider within your account (see [Add tokens to your account](additional_information.html#add-tokens-to-your-account)). If you are working with local simulators only (e.g., when using the `AerBackend` from qiskit or the `SimulatedAnnealingSampler` from the DWave anneal package) you can choose any backend or the option "None", since locally running code does not get affected by the choice (e.g. it is perfectly fine to run local qiskit code and having qiskit in the requirements-file when clicking on the DWave option). |
| Pricing Plans     | Will be important for when you want to offer your service via the quantum service store and charge your customers for using them. If you just want to test your service, you should select "Free".|

And there you go. As soon as you click on "Create Service", the containerization and deployment starts. 
As soon as it's finished (as indicated in the "My Services" section with a green checkmark) you will be able to publish your service to the quantum service store or for internal use and test your service thoroughly.

## Communicating with a Service
Examples showing how to utilize results from services (e.g. via Jupyter notebooks) can be found in [this](https://github.com/PlanQK/service-usage-examples) repository.
## Subscribing to Services using Applications

Whenever you want to interact with services from the [Quantum Service Store](https://platform.planqk.de/marketplace/apis), you must be subscribed to them from within an application.
Applications hold all necessary information for a secure communication with the service from an external source.
This includes a public and secret key pair, as well as a token- and service endpoint.
The former is used for generating a Bearer token, which is required for sending requests to the latter.  
Note, that different applications can subscribe to the same service without additional cost (as long as the service is not subscribed as pay per use).

> **Important**:
> To test the correct behaviour of *your own services* you should publish it "for internal use".
> In order to test it, you can use any of your applications to subscribe to this service.

## Jobs (Prototype Feature)

Besides ongoing and potentially long-lasting services, the PlanQK platform also provides a prototype functionality for executing jobs.
These jobs are pretty similar to services except that jobs can *only* be executed via the platform and only once.

### Create Jobs

When being in the "Jobs" tab you should see a (possibly empty) list of finished jobs.
If you did not execute any jobs yet, it's time to change that. 
So click on "Create Job" in the top right corner and we will guide you through the necessary steps to do so!

#### 1. Service

You have to select a service that should be run as a job.
This can either be one of your own services or (and that is the neat part of this feature) an implementation provided for any of the algorithms.
Just choose an available and suitable implementation out of the list (in that context, suitable means an implementation according to the description in the [Implementations](knowledge_platform.html#provide-an-implementation-for-job-execution) section).
If an API file was provided within the implementation, you should see it at the bottom of the page.

#### 2. Input

In general, services that run via the PlanQK platform, require two, possibly empty, fields as input.
These fields are `"data"` and  `"params"` (if you have worked with the user code template, you should have seen these already (hopefully!)).
The field `"data"` should include all the data required for the problem at hand, e.g. a QUBO, a dictionary of coefficients from a Hamiltonian or a number to be factorized (think big!).
The `params` field should contain additional (meta-)information such as the number of qubits, the number of variational layers for a circuit or the name of the backend.
Note, the data or param size must not exceed 1 MB.



**Important:**
The input of this step are the components of the `"data"` field of the implementation.

You have the option to hand over the input as a single JSON object, such as

```
{
    "key1": val1,
    "key2": val2,
    ...
}
```

or load an existing input from the Data Pools.

#### 3. Algorithm Parameters

Similar to the section above, the algorithm parameters refer to the corresponding `"params"` field of the service.
You have the option to include them via key value pairs or directly via a JSON object, similar to the input data.
