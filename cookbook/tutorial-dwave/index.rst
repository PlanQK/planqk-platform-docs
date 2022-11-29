**********************************
Tutorial: D-Wave Service on PlanQK
**********************************

This tutorial shows how to create a D-Wave flavored PlanQK Service.
The guide shows step by step the certain development stages and milestones and will guide you through the whole process.
Further readings and information can be found in our general `PlanQK Service Platform documentation <https://docs.platform.planqk.de/>`_.
If you got stuck or if you haven general questions, please consider `joining our Slack channel <https://docs.platform.planqk.de/en/latest/index.html#got-a-question-or-problem>`_ or create a respective issue on our `issue board <https://github.com/PlanQK/platform#planqk-platform-issue-repository>`_.


Preparation
===========

#. `Download the user code template <https://storage.googleapis.com/yeoman-templates/latest/template.zip>`_.
#. Extract the ZIP archive: ``unzip template.zip planqk-dwave``
#. Open the ``planqk-dwave`` in your IDE of choice, e.g., VSCode.

From here, we will work the ``src`` to folder to develop a very simple D-Wave program from scratch.
The final result will look like the two D-Wave examples inside the ``examples`` directory.
First we will develop the project towards ``dwave-hello-ide`` to have a working example that can be run from within your IDE or console.
Afterwards, we will develop the project towards ``dwave-hello-service`` to upload, deploy, and operate the prepared program on the PlanQK Platform.


Project Setup
=============

A D-Wave program, or a D-Wave PlanQK Service in the end, requires the D-Wave SDK.
Therefore, open the ``environment.yml`` file and add ``dwave-ocean-sdk`` to the pip modules to be installed.
Afterwards, the file should look like the following:

.. code-block:: yaml
   :linenos:

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

Furthermore, you may want to add the D-Wave SDK also to the ``requirements.txt`` file.
Then, you are able to initialize a Python virtual environment.
You could use the ``requirements.txt`` to create a virtual environment with the tooling of your choice or you use Conda:

.. code-block:: bash
   :linenos:

   conda env create -f environment.yml
   conda activate planqk-service

Once you activated your virtual environment, you could install any other third-party library using ``pip``:

.. code-block:: bash
   :linenos:

   pip install <name>

With this setup, you are now able to run the Python ``src`` folder as module from your console:

.. code-block:: bash
   :linenos:

   python3 -m src


Extend the PlanQK Coding Template
=================================

Open the ``program.py`` in your IDE.
The ``run()`` method is the main handler function and the entry point for your program.
The method takes two arguments:
(1) a ``data`` dictionary holding any input data being processed by the service,
and (2) a ``params`` dictionary holding additional (meta-)information for the execution such as the number of shots or the number of variational layers for a circuit.
It is also important that the ``run()`` method returns a ``Response`` object.
It must either be of type ``ResultResponse`` in case of a successful response or of type ``ErrorResponse`` in case an error occurred.

At this stage you can remove the whole template code from within the ``run()`` method.

Next, you can add some D-Wave code.
For example, copy and paste the following code to the ``run()`` method:

.. code-block:: python
   :linenos:

    import dimod
    import numpy as np
    from dwave.system import LeapHybridSampler

    sampler = LeapHybridSampler(solver={"category": "hybrid"})
    bqm = dimod.generators.ran_r(1, 300)

    sample_set = sampler.sample(bqm)

    sample = sample_set.lowest()
    sample_result = next(sample.data(fields={"sample", "energy"}))

The code first instantiates a D-Wave sampler object (``LeapHybridSampler``) and creates a random QUBO (``dimod.generators.ran_r(1, 300)``).
We execute the QUBO by calling the ``sample()`` method of the sampler object.
For the sake of this demo, we select afterwards the solution with the lowest energy and extract the result data.

As mentioned before, we have to return an object of type ``Response``.
We therefore can use the following code to create a json-serializable solution dictionary along with a metadata dictionary and return a respective ``ResultResponse``:

.. code-block:: python
   :linenos:

    result = {
        "solution": {str(key): int(val) for key, val in sample_result.sample.items()}
    }
    metadata = {
        "energy": sample_result.energy,
    }

    return ResultResponse(metadata=metadata, result=result)

If you now try to execute the code using ``python3 -m src`` the program will fail with the error ``API token not defined``.
This means the program code does not contain any authentication credentials to successfully execute the program against the D-Wave Leap cloud backend.

To overcome this issue you have to do several steps:
First, add the following constant somewhere between the global import statements and the ``run()`` method:

.. code-block:: python
   :linenos:

   PLANQK_PERSONAL_ACCESS_TOKEN = "your personal access token"

Next, go to `<https://platform.planqk.de>`_, navigate to your user settings and create a "Personal Access Token" with ``api`` and ``quantum_tokens`` scope.
Respectively assign your personal access token to the ``PLANQK_PERSONAL_ACCESS_TOKEN`` constant.

Further, in your PlanQK user settings, go to to "Quantum Backend Tokens" and add your personal D-Wave Leap access token.

Finally, you can change the instantiation of the ``LeapHybridSampler`` object as follows:

.. code-block:: python
   :linenos:

   sampler = LeapHybridSampler(solver={"category": "hybrid"},
                               endpoint="https://platform.planqk.de/dwave/sapi/v2",
                               token=PLANQK_PERSONAL_ACCESS_TOKEN)

When everything is set up, you can now successfully execute your program using ``python3 -m src``.
The output should look similar to the following:

.. code-block:: json

   {"result": {"solution": {"0": -1, "1": 1, "2": 1, ...}}, "metadata": {"energy": -3844.0}}

.. collapse:: Source Code (program.py)

   .. code-block:: python
      :linenos:

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
