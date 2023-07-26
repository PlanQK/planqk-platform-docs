# D-Wave Service on PlanQK

This tutorial shows how to create a D-Wave flavored PlanQK Service.
The guide shows step by step the certain development stages and milestones and will guide you through the whole process.
Further readings and information can be found in our general [PlanQK Service Platform Documentation](../docs/index.md).
If you got stuck or if you have general questions, please consider [joining our Slack channel](../index.md#got-a-question-or-problem) or create a respective issue on our [issue board](https://github.com/PlanQK/platform#planqk-platform-issue-repository).


## Preparation

1. [Download the user code template](https://storage.googleapis.com/yeoman-templates/latest/template.zip).
2. Extract the ZIP archive: `unzip template.zip -d planqk-dwave`
3. Open the `planqk-dwave` in your IDE of choice, e.g., VSCode.

From here, we will work inside the `src` to folder to develop a very simple D-Wave program from scratch.
The final result will look like the two D-Wave examples inside the `examples` directory.
First we will develop the project towards `dwave-hello-ide` to have a working example that can be run from within your IDE or console.
Afterwards, we will develop the project towards `dwave-hello-service` to upload, deploy, and operate the prepared program on the PlanQK Platform.


## Project Setup

A D-Wave program, or a D-Wave PlanQK Service in the end, requires the D-Wave Ocean SDK.
Therefore, open the `environment.yml` file and add `dwave-ocean-sdk` to the pip modules to be installed.
Afterwards, the file should look like the following:

```yaml
name: planqk-service
#channels:
#  - conda-forge
#  - defaults
dependencies:
    - python>=3.6,<3.10
    - pip>=21
    - pip:
        - loguru # required
        - dwave-ocean-sdk
#variables:
#  LOG_LEVEL: INFO
````

You can now set up a fresh environment using Conda:

````bash
conda env create -f environment.yml
conda activate planqk-service
````

Conda and the `environment.yml` file are used by the PlanQK Platform at runtime.
However, if you do not have Conda installed on your local computer, you may add the D-Wave Ocean SDK to the `requirements.txt` file.
Then, you are able to initialize a Python virtual environment using the tooling of your choice, e.g., `pyenv` or `venv`.

Once you activated your virtual environment, you could install any other third-party library using `pip`:

```bash
pip install <name>
````

With this setup, you are now able to run the Python `src` folder as module from your console:

```bash
python3 -m src
```


## Extend the PlanQK Coding Template

Open the `program.py` in your IDE.
The `run()` method is the main handler function and the entry point for your program.
The method takes two arguments:
(1) a `data` dictionary holding any input data being processed by the service,
and (2) a `params` dictionary holding additional (meta-)information for the execution such as the number of shots or the number of variational layers for a circuit.
It is also important that the `run()` method returns a `Response` object.
It must either be of type `ResultResponse` in case of a successful response or of type `ErrorResponse` in case an error occurred.

At this stage you can remove the whole template code from within the `run()` method.

Next, you can add some D-Wave code.
For example, copy and paste the following code to the `run()` method (as usual in Python, you may copy the imports to the top of the file):

```python
import dimod
import numpy as np
from dwave.system import LeapHybridSampler

sampler = LeapHybridSampler(solver={"category": "hybrid"})
bqm = dimod.generators.ran_r(1, 300)

sample_set = sampler.sample(bqm)

sample = sample_set.lowest()
sample_result = next(sample.data(fields={"sample", "energy"}))
```

The code first instantiates a D-Wave sampler object (`LeapHybridSampler`) and creates a random QUBO problem (`dimod.generators.ran_r(1, 300)`).
We execute the problem by calling the `sample()` method of the sampler object.
For the sake of this demo, we select afterwards the solution with the lowest energy and extract the result data.

As mentioned before, we have to return an object of type `Response`.
We therefore can use the following code to create a json-serializable solution dictionary along with a metadata dictionary and return a respective `ResultResponse`:

```python
result = {
    "solution": {str(key): int(val) for key, val in sample_result.sample.items()}
}
metadata = {
    "energy": sample_result.energy,
}

return ResultResponse(metadata=metadata, result=result)
```

If you would now try to execute the code using `python3 -m src` the program will fail with the error `API token not defined`.
This means the program code does not contain any authentication credentials to successfully execute the program against the D-Wave Leap cloud backend.

To overcome this issue you have to do several steps:
First, add the following constant somewhere between the global import statements and the `run()` method:

```python
PLANQK_PERSONAL_ACCESS_TOKEN = "your personal access token"
```

Next, go to <https://platform.planqk.de>, navigate to your user settings and create a "Personal Access Token" with `api` and `quantum_tokens` permission levels enabled (scope).
Respectively assign your personal access token to the `PLANQK_PERSONAL_ACCESS_TOKEN` constant.

Further, in your PlanQK user settings, go to "Provider Access Tokens" and add your personal D-Wave Leap access token.

Finally, you can change the instantiation of the `LeapHybridSampler` object as follows:

```python
sampler = LeapHybridSampler(solver={"category": "hybrid"},
                            endpoint="https://platform.planqk.de/dwave/sapi/v2",
                            token=PLANQK_PERSONAL_ACCESS_TOKEN)
```

When everything is set up, you can now successfully execute your program using `python3 -m src`.
The output should look similar to the following:

```json
{"result": {"solution": {"0": -1, "1": 1, "2": 1, ...}}, "metadata": {"energy": -3844.0}}
```

::: details Source Code (program.py)
```python
"""
Template for implementing services running on the PlanQK platform
"""

import math
from typing import Dict, Any, Optional, Union

from loguru import logger

# Import response wrappers:
# - use ResultResponse to return computation results
# - use ErrorResponse to return meaningful error messages to the caller
from .libs.return_objects import ResultResponse, ErrorResponse
# Import your own libs
from .libs.utilities import add

PLANQK_PERSONAL_ACCESS_TOKEN = "your personal access token"

def run(data: Optional[Dict[str, Any]] = None, params: Optional[Dict[str, Any]] = None) \
      -> Union[ResultResponse, ErrorResponse]:
  """
  Default entry point of your code. Start coding here!

  Parameters:
      data (Optional[Dict[str, Any]]): The input data sent by the client
      params (Optional[Dict[str, Any]]): Contains parameters, which can be set by the client for parametrizing the execution

  Returns:
      response: (ResultResponse | ErrorResponse): Response as arbitrary json-serializable dict or an error to be passed back to the client
  """

  import dimod
  import numpy as np
  from dwave.system import LeapHybridSampler

  sampler = LeapHybridSampler(solver={"category": "hybrid"},
                              endpoint="https://platform.planqk.de/dwave/sapi/v2",
                              token=PLANQK_PERSONAL_ACCESS_TOKEN)
  bqm = dimod.generators.ran_r(1, 300)

  sample_set = sampler.sample(bqm)

  sample = sample_set.lowest()
  sample_result = next(sample.data(fields={"sample", "energy"}))

  result = {
      "solution": {str(key): int(val) for key, val in sample_result.sample.items()}
  }
  metadata = {
      "energy": sample_result.energy,
  }

  return ResultResponse(metadata=metadata, result=result)
```
:::


## Containerize your Code

The PlanQK Coding Template already contains a `Dockerfile` which can be used to locally build a Docker container.
This replicates in your local environment what the PlanQK Platform does at runtime, which is quite useful for local testing before creating a PlanQK Service on the PlanQK Platform.

First, from within the `planqk-dwave` folder, build the container:

```bash
docker pull ghcr.io/planqk/job-template:latest-base-1.0.0
docker build -t planqk-service .
```

The build command packages your `src` folder, installs respective third-party dependencies defined in the `environment.yml` file, and prepares your code for execution.

This simple example does not utilize any input data nor input parameters.
Therefore, run the container as follows (replace the value of `PLATFORM_TOKEN` with your PlanQK personal access token):

```bash
docker run -it \
-e FRAMEWORK=DWAVE \
-e DWAVE_ENDPOINT=https://platform.planqk.de/dwave/sapi/v2 \
-e PLATFORM_TOKEN=<add your PlanQK personal access token> \
-e BASE64_ENCODED=false \
-e LOG_LEVEL=DEBUG \
planqk-service
```

The output looks similar to the following:

```
2022-11-29 14:29:30.659 | DEBUG    | __main__:<module>:18 - Template Version: 1.31.2
2022-11-29 14:29:30.664 | DEBUG    | __main__:<module>:21 - Entry Point: app.user_code.src.program:run
2022-11-29 14:29:30.665 | DEBUG    | __main__:<module>:24 - Selected Framework: DWAVE
2022-11-29 14:29:30.665 | DEBUG    | __main__:<module>:39 - Token: ********63122
2022-11-29 14:29:30.666 | DEBUG    | app.helpers:get_input_data:14 - Base64 encoded data? False
2022-11-29 14:29:30.666 | INFO     | app.helpers:get_input_data:17 - Using input data from file '/var/input/data/data.json'
2022-11-29 14:29:30.669 | DEBUG    | __main__:<module>:50 - Data (encoded=False): {}
2022-11-29 14:29:30.669 | DEBUG    | app.helpers:get_input_params:33 - Base64 encoded params? False
2022-11-29 14:29:30.670 | INFO     | app.helpers:get_input_params:36 - Using input params from file '/var/input/params/params.json'
2022-11-29 14:29:30.671 | DEBUG    | __main__:<module>:53 - Parameter (encoded=False): {}
2022-11-29 14:29:30.673 | INFO     | app.interceptor_framework:run:47 - Loading interceptors for framework 'DWAVE'
2022-11-29 14:29:30.682 | INFO     | app.interceptor_framework.framework.dwave.dwave:load_interceptors:92 - D-Wave interceptors loaded
2022-11-29 14:29:33.128 | DEBUG    | app.interceptor_framework.framework.dwave.dwave_client_interceptor:intercept_execute:36 - Config: service_execution_id=None, endpoint=https://platform.planqk.de/dwave/sapi/v2, token=True
2022-11-29 14:29:33.129 | INFO     | app.interceptor_framework.framework.dwave.dwave_client_interceptor:intercept_execute:44 - D-Wave config injected into 'Client.from_config()'
2022-11-29 14:31:36.468 | INFO     | app.handler:run:36 - Execution Time (in sec): 125.7941

Job:ResultResponse: {"metadata": {"energy": -3844.0}, "result": {"solution": {"0": -1, "1": -1, "10": -1, "100": -1, ...}}}
```

You are now prepared to create a PlanQK Service.


## Create a PlanQK Service

To create a PlanQK Service, you have to package your program code along with the `environment.yml` file into a ZIP file.

::: tip NOTE
Before creating the archive, modify the `program.py` and **remove your personal access token**.
For example, change the value of the `PLANQK_PERSONAL_ACCESS_TOKEN` constant to `noop`.
The PlanQK Platform will instrument your code respectively such that your code runs successfully against the D-Wave Leap cloud.
:::

Execute the following command to package the program code and the required metadata files:

```bash
zip -r user_code.zip src environment.yml openapi-spec.yml requirements.txt
```

Afterwards, navigate to <https://platform.planqk.de> and create a new PlanQK Service
([more info](../docs/service-platform.md#4-deploy-services-on-the-planqk-platform))
or, if you have the [PlanQK CLI](../docs/service-platform.md#41-using-the-planqk-cli) installed, execute the following command:

```bash
planqk login -t <your PlanQK personal access token>
planqk up --file=user_code.zip
```

Congratulations.
You have successfully created your own PlanQK Service.

**What's next?**

So, as a very fist step you may want to test your newly created service on PlanQK.
You can now *publish your service for internal use* and read on how to use the service utilizing PlanQK Applications.
Just follow the steps in the [Using a Service](../docs/service-platform.md#using-a-service) section in our documentation.

As an alternative, you could also try out PlanQK Jobs with your new service.
More information about PlanQK Jobs and how to use them can be found in our general [documentation](../docs/service-platform.md#jobs).
