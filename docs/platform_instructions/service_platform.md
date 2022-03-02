# Service Platform

You have your quantum code ready in a Python file and want to provide it to others via the PlanQK platform? Great! Only a few more steps until your service is ready and can be deployed! Any questions regarding this process are answered here.  
Also, if you want to subscribe to services from the quantum service store or run jobs you find some information on that here as well.

## My Services
Here you find your already deployed and published services and can add new ones, as long as they are present in the format specified by the [user code template](###user-code-template).

### User code template
Your code must be structured in a (not too) specific way. But first you must download or generate the template.  
In order to generate it, follow these two steps
1. Execute :code:`npm install -g yo https://github.com/PlanQK/yo-generator-planqk-service.git`

2. Execute :code:`yo planqk-service {name}`

Alternatively, download the general template as a zip file via these links: ([zip](https://storage.googleapis.com/yeoman-templates/latest/template.zip) | [tar.gz](https://storage.googleapis.com/yeoman-templates/latest/template.tar.gz)) 
  
After generating/extracting it, you should find the following structure:
```
user_code
├── openapi-spec.yml
├── requirements.txt
└── src
    ├── __init__.py
    ├── __main__.py
    ├── libs
    │   ├── __init__.py
    │   ├── return_objects.py
    │   └── ...
    └── program.py
```
From the start, you should be able to run :code:`python -m src` from within the :code:`user_code` folder, which is our goal when replacing the dummy addition code with your own.  

The most important method, which takes the user input and generates the output of interest is the :code:`run` method inside :code:`program.py`.

**Important:** Do not rename either the :code:`src` folder, the :code:`program.py` package, as well as the :code:`run` method inside program.py. These are fixed entry points for the service. Changing their names will result in a malfunctioning service.

The goal is to be able to run :code:`src` as a module, namely execute :code:`python -m src` when inside the user_code folder. This will execute the :code:`__main__`-method. Here you can test your program with a JSON-conform input format, that has the properties :code:`"data"` and :code:`"params"` . Remember, that within JSON-format any property of an object must be of type string.  

Any required python package (like numpy, pandas, ...) must be mentioned within the, you guessed it, :code:`requriements.txt` with their version number in the pip-installation format (e.g. :code:`numpy==1.19.0`). These packages can than be imported within any pyhton file needed.  

If you have written packages yourself, which are required for your service, you can simply put them into the :code:`libs` folder and import them via relative imports into your program.  

**Important:** If you plan to run your program on real quantum hardware or cloud simulators, your program should expect some valid :code:`"backend"` string within the :code:`"params"` object (e.g. :code:`"backend": 'ibmq_qasm_simulator'` or :code:`"backend": 'ibmq_manila`).

**Recommended:** After being able to run your code as a module and if you're interested in offering your service via an API to others, you should also take the time to adapt the :code:`openapi-spec.yml` file, in order to describe your API.

At last, you must zip (at minimum) the :code:`src` folder and :code:`requirements.txt`, which will be the file you upload in order to create a service.  
**Note:** You must not zip the :code:`user_code` folder itself but its content.

### Create Services
When you have your zipped user code ready, creating a service via the platform is easy: From the landing page, go to "[Service Platform > My Services](https://platform.planqk.de/services)". Here you need to click on :code:`Create Service` in the top right corner.  
**Note**: You need to create a valid credit card before being able to create services. A step-by-step tutorial is described in this [video](https://www.loom.com/share/1ddf3b919bbc4219883f576931a14a12).

#### Name
Choose a meaningful name for your service. If you publish your service later on, this >name will be displayed to other users.

#### Service import  
Click on "Import from file" and upload your zipped service.
The option "Import from URL" can be used if your service is running somewhere (e.g. on your own infrastructure) and you just want the PlanQK platform to manage access to it.  

#### API Specification  
Click on "Import from OpenAPI File" if you have prepared an OpenAPI specification for your service describing your service interface and input data. If you did not prepare one but you  want to test the communication with you service (via a GET), upload the default OpenAPI-File that was provided in the template.

#### Description
Other users will see this description of the service, if its name sparked some interest and they clicked on it in the marketplace. So any additional information you want to provide goes in here.

#### Quantum Backend  
As of February 2022, only IBM and DWave are supported quantum backends and only one can be picked. These options are only available, if you have stored a token for the corresponding provider within your account (see [Add tokens to your account](#add-tokens-to-your-account)).  
If you are working with local simulators only (e.g. when using the :code:`AerBackend` from qiskit or the :code:`SimulatedAnnealingSampler` from the dwave neal package) you can choose any backend or the option "None", since locally running code does not get affected by the choice (e.g. it is perfectly fine to run local qiskit code and having qiskit in the requirements-file when clicking on the Dwave option).

#### Pricing Plans
Will be important for when you want to offer your service via the marketplace and charge your customers for using them.
If you just want to test your service, you should select "Free".  

And there you go. As soon as you click on "Create Service", the containerization and deployment starts. As soon as it's finished (as indicated in the "My services" section) you will be able to publish and test your service thoroughly.

## My Applications
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