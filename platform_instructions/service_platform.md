# Service Platform

You have your quantum code ready in a Python file and want to provide it to others as a service via the PlanQK platform?
Great!
Only a few more steps until your service is ready and can be deployed for customers to subscribe to them.
Any questions regarding this process, as well as subscribing to services and job executions will be answered here.

## Service Provisioning

You should solely focus on the development of great quantum algorithms. 
Our platform helps you transforming them into services that can be called by external customers via standardized HTTP interfaces. 
In order to deploy your algorithm as a service and to provide them in the platform's marketplace, you need to follow these steps:

1. Embed your python code into our user code template.
2. Test your service locally with Docker.
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
user_code
├── Dockerfile
├── openapi-spec.yml
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

The most important method, which takes the user input and generates the output of interest is the :code:`run` method inside :code:`program.py`.

>**Important:** Do not rename either the :code:`src` folder, the :code:`program.py` package, as well as the :code:`run` method inside program.py. These are fixed entry points for the service. Changing their names will result in a malfunctioning service.

From the start, you should be able to run :code:`python -m src` from within the :code:`user_code` folder, which is our goal when replacing the provided dummy code with your own. 
Running this line will execute the :code:`__main__`-method.
Here you can test your program with a JSON-conform input format, that has the properties :code:`"data"` and :code:`"params"`.
Remember, that within JSON-format any property of an object must be of type string.  

Any required python package (like numpy, pandas, ...) must be mentioned within the - you guessed it - :code:`requirements.txt` with its corresponding version number in the pip-installation format (e.g. :code:`numpy==1.19.0`). These packages can than be imported within any python file.  

If you have written packages yourself, which are required for your service, you can simply put them into the :code:`libs` folder and import them via relative imports into your program.  

>**Important:** If you plan to run your program on real quantum hardware or cloud simulators, your program should expect some valid :code:`"backend"` string within the :code:`"params"` object (e.g. :code:`"backend": 'ibmq_qasm_simulator'` or :code:`"backend": 'ibmq_manila`). 

>**Recommended:** After being able to run your code as a module and if you're interested in offering your service via an API to others, you should also take the time to adapt the :code:`openapi-spec.yml` file, in order to describe your API.

At last, you must zip (at minimum) the :code:`src` folder and :code:`requirements.txt`, which will be the file you upload in order to create a service.  
**Note:** You must not zip the :code:`user_code` folder itself but its content.

### 2. Test your Service using Docker

You should test your service on your local machine before deploying it on the PlanQK platform.
This will help you identifying and correcting potential errors before the actual deployment process.

You may utilize Docker to test your current implementation. In general, by following the described procedure you replicate the steps performed by the PlanQK platform, which is a way to verify your service in an early stage.

#### Build the Docker Image

In your command line tool go to your user code directory and perform the following command that creates a Docker image with the tag `planqk-service`, which contains your service.

```bash
docker build -t planqk-service .
```

#### Start the Docker container

In this case, you need to pass the input (`"data"` and `"params"` separately) as environment variables (base64 encoded) into the container.
You can either use command line tools like `base64` or [Base64 Encoder](https://www.base64encode.org) for encoding the input.

For example, to create a base64 encoded string of the `"data"` part of the `input.json` file, execute the following:

```bash
base64 -w 0 <<EOF
{"values": [100, 50, 200, 70, 0.69]}
EOF

>> eyJ2YWx1ZXMiOiBbMTAwLCA1MCwgMjAwLCA3MCwgMC42OV19
```

To create a base64 encoded string of the `"params"` part, execute the following:

```bash
base64 -w 0 <<EOF
{"round_off": false}
EOF

>> eyJyb3VuZF9vZmYiOiBmYWxzZX0=
```
Afterwards, start the container with the environment variables `INPUT_DATA` and `INPUT_PARAMS` as follows:
```bash
docker run -it \
  -e INPUT_PARAMS=eyJyb3VuZF9vZmYiOiBmYWxzZX0= \
  -e INPUT_DATA=eyJ2YWx1ZXMiOiBbMTAwLCA1MCwgMjAwLCA3MCwgMC42OV19 \
  planqk-service
```
If the services executed seccessfully, you should see something like `Job:ResulsResponse:` followed by the output you defined for your service.

### 3. Deploy Services on the PlanQK Platform

When you have your zipped your code and successfully tested it via Docker, creating a service via the platform is easy: From the landing page, go to 
[My Services](https://platform.planqk.de/services). Here you need to click on :code:`Create Service` in the top right corner. 
 
>**Note**: You need to add a valid credit card before being able to create services. This card is used to charge you for the costs that emerge from hosting the service on the platform. To add the card go to [Payments](https://platform.planqk.de/settings/payments). Since the platform is still under development, the payments are just simulated. Therefore, you can provide a [test credit card number](https://stripe.com/docs/testing#europe-and-middle-east). A detailed step-by-step tutorial is described in this [video](https://www.loom.com/share/1ddf3b919bbc4219883f576931a14a12).


You will be directed to an interface, which requires several information in order to deploy your service.

**Service Properties:**

| Property          | Description|
|-------------------|------------|
| Name              | Choose a meaningful name for your service. If you publish your service later on, this name will be displayed to other users. |
| Service Import    | Click on "Import from file" and upload your zipped service. The option "Import from URL" can be used if your service is running somewhere (e.g., on your own infrastructure) and you just want the PlanQK platform to manage the access to it. |
| API Specification | Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. If you did not prepare one, but you want to test the communication with you service (via a GET), you may upload the default OpenAPI file that was provided with this template.|
| Description       | Other users will see this description of the service, if its name sparked some interest, and they clicked on it in the marketplace. So any additional information you want to provide goes in here.|
| Quantum Backend   | As of February 2022, only IBM and DWave are supported quantum backends and only one can be picked. These options are only available, if you have stored a token for the corresponding provider within your account (see [Add tokens to your account](#add-tokens-to-your-account)). If you are working with local simulators only (e.g., when using the `AerBackend` from qiskit or the `SimulatedAnnealingSampler` from the DWave anneal package) you can choose any backend or the option "None", since locally running code does not get affected by the choice (e.g. it is perfectly fine to run local qiskit code and having qiskit in the requirements-file when clicking on the DWave option). |
| Pricing Plans     | Will be important for when you want to offer your service via the marketplace and charge your customers for using them. If you just want to test your service, you should select "Free".|

And there you go. As soon as you click on "Create Service", the containerization and deployment starts. As soon as it's finished (as indicated in the "My Services" section with a green checkmark) you will be able to publish and test your service thoroughly.


## Subscribing and using Services
Whenever you want to communicate with services from the [Quantum Service Store](#quantum-service-store), you must be subscribed to them within an application. Applications hold all necessary information for communication with the service from an external source. This includes a public and secret key pair, as well as a token- and service endpoint. The former is used for generating a Bearer token, which is required for sending requests to the latter.  
**Note:** Different applications can subscribe to the same service without additional cost (as long as the service is not subscribed as pay per use).

## Jobs (Prototype Feature)
Besides ongoing and potentially long-lasting services, the PlanQK platform also provides a prototype functionality for executing jobs. Theses jobs are pretty similar to services except that jobs can *only* be executed via the platform and only once.

### Create Jobs
When being in the "Jobs" tab you should see a (possibly empty) list of finished jobs. If you did not execute any jobs yet, it's time to change that. So click on "Create Job" in the top right corner and we will guide you through the necessary steps to do so!

#### 1. Service
You have to select a service that should be run as a job. This can either be one of your own services or (and that is the neat part of this feature) an implementation provided for any of the algorithms. Just choose an available and suitable implementation out of the list (in that context, suitable means an implementation according to the description in the [Implementations](###provide-an-implementation-for-job-execution) section). If an API file was provided within the implementation, you should see it at the bottom of the page.

#### 2. Input
In general, services that run via the PlanQK platform, require two, possibly empty, fields as input. These fields are :code:`"data"` and  :code:`"params"` (if you have worked with the user code template, you should have seen these already (hopefully!)). The field :code:`"data"` should include all the necessary.. well.. data, that is necessary for the problem at hand, e.g. a QUBO, a dictionary of coefficients from a Hamiltonian or a number to be factorized (think big!). The :code:`params` field should contain additional (meta-)information such as the number of qubits, the number of variational layers for a circuit or the name of the backend.  

**Important:** The input of this step are the components of the :code:`"data"` field of the implementation.  

You have the option to hand over the input as a single JSON object, such as
```json
{
    "key1": val1,
    "key2": val2,
    ...
}
```
or load an existing input from the Data Pools.

#### 3. Algorithm Parameters
Similar to the section above, the algorithm parameters refer to the corresponding :code:`"params"` field of the service. You have the option to invlude them via key value pairs or directly via a JSON object, similar to the input data.
