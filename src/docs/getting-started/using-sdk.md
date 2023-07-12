# Using the SDK

The `planqk-quantum` SDK provides an easy way for developing quantum circuits
using [Qiskit](https://pypi.org/project/qiskit) to be run on quantum devices
provided by the [PlanQK Platform](https://docs.platform.planqk.de).
The SDK is an extension for the [Qiskit SDK](https://github.com/Qiskit/qiskit-metapackage) and provides the same
functionality and syntax as well as some PlanQK specific commands.

## Installation

You need to have Python 3.7 or higher installed.
The package is released on PyPI and can be installed via `pip`:

```bash
pip install --upgrade planqk-quantum
```

## Execute your first circuit

In your Qiskit code you can access the PlanQK quantum backends through the `PlanqkQuantumProvider` class.
Import the class and instantiate it as shown below:

```python
from planqk.qiskit import PlanqkQuantumProvider
```

If you are already logged in with the [PlanQK CLI](quickstart.md#3-login-to-your-account) you can create the provider object without any parameters:

```python
provider = PlanqkQuantumProvider()
```

Alternatively, you can also create the provider object by passing your PlanQK access token:

```python
provider = PlanqkQuantumProvider(access_token="your-access-token")
```

After you have created the provider object you can list all backends supported by the PlanQK Platform and select the one
you want to use, e.g., the `azure.ionq.simulator` backend:

```python
# list all available PlanQK quantum backends
backends = planqk_provider.backends()

# select a certain backend
backend = provider.get_backend(name="azure.ionq.simulator")
```

Now you can execute your Qiskit circuit on the selected backend, retrieve its `job` object, monitor its execution status, retrieve its results, cancel it etc.
The full example would look like this:

```python
from planqk.qiskit import PlanqkQuantumProvider

from qiskit import execute
from qiskit.circuit import QuantumCircuit
from qiskit.tools.monitor import job_monitor

# instantiate the PlanQK provider and select a backend
provider = PlanqkQuantumProvider()
backend = provider.get_backend(name="azure.ionq.simulator")

# create a qiskit circuit
circuit = QuantumCircuit(3, 3)
circuit.h(0)
circuit.cx(0, 1)
circuit.cx(1, 2)
circuit.measure(range(3), range(3))

# execute circuit on selected backend
job = execute(circuit, backend, shots=1000)

# monitor execution status and retrieve results
job_monitor(job)
```

::: tip NOTE
Executing your Qiskit code on the PlanQK platform may lead to execution costs depending on selected backend and number of shots.
Please find an overview about the costs for each backend [here](../service-platform/pricing.md).
:::

## Deploy your circuit as a PlanQK Service

To deploy your circuit to the PlanQK Platform you may adapt the `program.py` file of the `python-starter` template.

::: tip NOTE
To create a new development project, you may run `planqk init` and select `Starter Qiskit` as coding template.
Further instructions are available [here](quickstart.md#create-your-first-project).
:::

The `program.py` file contains a `run` function which is called when the service is executed.
Copy and paste the code from above into the `run` function and add the following line at the end of the function:

```python
return ResultResponse(result={"status": "COMPLETED"})
```

You may want to add some additional information to the `ResultResponse` object, e.g., the actual results of your circuit.
You are now able to deploy your circuit as a PlanQK Service.

Use `planqk up` to deploy your service to the PlanQK Platform.
Next, you may use `planqk run` to execute your service.


## What's next?

- See our supported [quantum hardware and simulators](quantum-hardware.md).
- Check out the [Tutorial on how to create a PlanQK Service using the `planqk-quantum` library](../../tutorials/tutorial-qiskit.md).
