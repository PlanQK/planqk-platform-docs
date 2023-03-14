# Tutorial: Executing Qiskit Circuits with the PlanQK Quantum Platform Library
This tutorial describes how you can use the PlanQK quantum package to execute your Qiskit code on different quantum backends supported by PlanQK. 
Since it is a wrapper of the corresponding part of the Qiskit SDK, you can use backends the same way, as you would do in your regular Qiskit code.

You can use the library either directly from your favorite IDE or in a [PlanQK service](../docs/service-platform.md).

## Setup

### Install the PlanQK Quantum Platform Library
To install the PlanQK Quantum Platform Library you need to have Python 3.7. or higher installed.
The package is released on PyPI and can be installed via `pip`:

```bash
pip install planqk-quantum
```

### Create an Access Token
To access the quantum backends from your Qiskit code you need to have a valid PlanQK account and a quantum access token.
This token is used to authenticate your requests to the PlanQK platform and to track the usage costs of your quantum executions.

Login at [platform.planqk.de](https://platform.planqk.de), go to `Settings` and create a new `Personal Access Token` with the scopes `api` and `quantum_tokens`.
Copy your new token and store it in a safe place.

## Backend Selection & Execution
In your Qiskit code you can access the PlanQK quantum backends through the `PlanqkQuantumProvider` object.
You need to import this object and pass your access token to it, as shown in the example below.

```python
from planqk.qiskit import PlanqkQuantumProvider

# set your PlanQK access token
planqk_token = "YOUR_ACCESS_TOKEN"
provider = PlanqkQuantumProvider(access_token=planqk_token)
```

::: tip NOTE
If your Qiskit code is executed in a PlanQK service, the access token is automatically set by the platform. 
In this case the `access_token` parameter can be omitted. If it is set it is replaced by the service token. 
:::

After you have created the provider object you can list all backends supported by the PlanQK platform and select the one you want to use, e.g. the `ionq.simulator`:

```python
# list all available PlanQK quantum backends
backends = planqk_provider.backends()

# select certain backend
backend = provider.get_backend(name="ionq.simulator")
```

Now you can execute your Qiskit circuit on the selected backend, retrieve its `job` object, monitor its execution status, retrieve its results, cancel it etc.

```python
from qiskit import execute
from qiskit.circuit import QuantumCircuit
from qiskit.tools.monitor import job_monitor

# create a qiskit circuit
circuit = QuantumCircuit(3,3)
circuit.h(0)
circuit.cx(0,1)
circuit.cx(1,2)
circuit.measure(range(3), range(3))

# execute circuit on selected backend
job = execute(circuit, backend, shots=1000)

# monitor execution status and retrieve results
job_monitor(job)
```

::: tip NOTE
Executing your Qiskit code on the PlanQK platform may lead to execution costs depending on selected backend and number of shots. 
Please find an overview about the costs for each backend [here](../docs/resource-costs.md). 
:::


