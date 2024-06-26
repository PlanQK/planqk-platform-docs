# Using the SDK

The PlanQK Quantum SDK provides an easy way for developing quantum circuits using [Qiskit](https://pypi.org/project/qiskit) to be run on quantum devices provided by the [PlanQK Platform](https://docs.platform.planqk.de).
The SDK is an extension for the [Qiskit 1.0 SDK](https://github.com/Qiskit/qiskit-metapackage) and provides the same functionality and syntax as well as some PlanQK specific commands.

## Installation

You need to have Python 3.10 or higher installed.
The package is released on PyPI and can be installed via `pip`:

```bash
pip install --upgrade planqk-quantum
```

::: tip NOTE
Ensure that you have versions older than Qiskit SDK 1.0 uninstalled before installing the PlanQK Quantum SDK.
The best way to ensure this is to create a new virtual environment and install the PlanQK Quantum SDK there.
:::

## Execute your first circuit

In your Qiskit code you can access the PlanQK quantum backends through the `PlanqkQuantumProvider` class.
Import the class and instantiate it as shown below:

```python
from planqk.qiskit import PlanqkQuantumProvider
```

If you are already logged in with the [PlanQK CLI](quickstart.md#_3-login-to-your-account) you can create the provider object without any parameters:

```python
provider = PlanqkQuantumProvider()
```

Alternatively, you can also create the provider object by passing your PlanQK [personal access token](manage-access-tokens.md#personal-access-tokens):

```python
provider = PlanqkQuantumProvider(access_token="your-access-token")
```

If you want to login with your organization, you can additionally pass the organization id as a parameter.
The organization id can be found in the organization settings on the PlanQK Platform:

```python
provider = PlanqkQuantumProvider(access_token="your-access-token", organization_id="your-organization-id")
```

After you have created the provider object you can list all backends supported by the PlanQK Platform and select the one
you want to use.
The available backends and their names can be also found [here](quantum-hardware.md#quantum-hardware),  e.g., the `azure.ionq.simulator` backend:

```python
# list all available PlanQK quantum backends
backends = provider.backends()

# select a certain backend
backend = provider.get_backend(name="azure.ionq.simulator")
```

Now you can execute your Qiskit circuit on the selected backend, retrieve its `job` object, retrieve its results, cancel it etc.
The full example would look like this:

```python
from planqk.qiskit import PlanqkQuantumProvider

from qiskit.circuit import QuantumCircuit, transpile

# instantiate the PlanQK provider and select a backend
provider = PlanqkQuantumProvider()
backend = provider.get_backend(name="azure.ionq.simulator")

# create a qiskit circuit
circuit = QuantumCircuit(3, 3)
circuit.h(0)
circuit.cx(0, 1)
circuit.cx(1, 2)
circuit.measure(range(3), range(3))

# transpile circuit for backend
circuit = transpile(circuit, backend)
# execute circuit on selected backend
job = backend.run(circuit, shots=1000)
```

::: tip NOTE
Executing your Qiskit code on the PlanQK platform may lead to execution costs depending on selected backend and number of shots.
Please find an overview about the costs for each backend [on our pricing page](https://platform.planqk.de/pricing).
:::

## Deploy your circuit as a PlanQK Service

To deploy your circuit to the PlanQK Platform you may adapt the `program.py` file of the `python-starter` template.

::: tip NOTE
To create a new development project, you may run `planqk init` and select `Starter Qiskit` as coding template.
Further instructions are available [here](quickstart.md#create-your-first-project).
:::

The `program.py` file contains a `run()` method which is called when the service is executed.
Copy and paste the code from above into the `run()` method and add the following line at the end of the function:

```python
return ResultResponse(result={"status": "COMPLETED"})
```

You may want to add some additional information to the `ResultResponse` object, e.g., the actual results of your circuit.
You are now able to deploy your circuit as a PlanQK Service.

Use `planqk up` to deploy your service to the PlanQK Platform.
Next, you may use `planqk run` to execute your service.

## What's next?

- See our supported [quantum hardware and simulators](quantum-hardware.md).
- Check out the [Tutorial on how to create a PlanQK Service using the PlanQK Quantum SDK](tutorials/tutorial-qiskit.md).
