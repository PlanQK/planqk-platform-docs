# Qiskit SDK Reference

The PlanQK Quantum SDK provides an easy way for developing quantum circuits using [Qiskit](https://pypi.org/project/qiskit) to be run on [quantum hardware and simulators supported](quantum-hardware.md) by the [PlanQK Platform](https://docs.platform.planqk.de).
It is an **extension** for the [Qiskit SDK](https://github.com/Qiskit/qiskit-metapackage).
This means that you're able to seamlessly integrate and reuse your existing Qiskit code, leveraging the power and familiarity of a framework you're already accustomed to.

## Installation

The package is released on PyPI and can be installed via `pip`:

```bash
pip install --upgrade planqk-quantum
```

## Using the SDK

As the SDK is based on Qiskit, you can use the Qiskit syntax to access quantum hardware and simulators.
To list and access the quantum backends supported by Planqk, you'll need to use the `PlanqkQuantumProvider` class.

Here's an example:

```python
from planqk.qiskit import PlanqkQuantumProvider

provider = PlanqkQuantumProvider()
backends = provider.backends()

# select a certain backend
backend = provider.get_backend(name="azure.ionq.simulator")
```

::: tip IMPORTANT
Note: You need to set an access token having at least the `quantum-tokens` scope to use the PlanqkQuantumProvider class.
You can either set it explicitly in the constructor `PlanqkQuantumProvider(access_token = "my_token")` or use the [PlanQK CLI to login](quickstart.md#3-login-to-your-account).
In latter case the token is automatically applied when you instantiate the `PlanqkQuantumProvider` class.
If the access token is not set or if it is invalid, an `InvalidAccessTokenError` is thrown.
You can generate a new token [here](https://platform.planqk.de/settings/access-tokens).
If you apply the token through login, you need to log in again with the PlanQK CLI and pass the new token as argument.
:::

## Supported Operations

This section provides a brief overview of the most important classes and methods in the SDK. For a more detailed description, please refer to the SDK's API documentation.

### Provider

The `PlanqkQuantumProvider` class is a wrapper for the [Qiskit Provider](https://qiskit.org/documentation/stubs/qiskit.providers.ProviderV1.get_backend.html#qiskit.providers.ProviderV1.get_backend).

| Method              | Description                                                                                                                            |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `backends()`        | This method returns a list of backends supported by PlanQK. Please note that currently, backend filtering is not supported.            |
| `get_backend(name)` | This method returns a single backend that matches the specified name. If the backend cannot be found, a `PlanqkClientError` is thrown. |

### Backend

The `PlanqkBackend` class is based on the IBM [`BackendV2`](https://qiskit.org/documentation/stubs/qiskit.providers.BackendV2.html) class.
A `Backend` object provides information about quantum backends (e.g., number of qubits, qubit connectivity, etc.) and enables you to run quantum circuits on the backend.
Please note that currently, only circuits with gate-based operations are supported while pulse-based operations are not supported.

The `Backend` class supports the following methods:

| Method                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `configuration()`      | Returns the backend configuration data. This method is included for compatibility with older versions of Qiskit.                                                                                                                                                                                                                                                                                                                                                      |
| `run(circuit, shots)`  | Executes a single circuit on the backend as a job (multiple circuits are currently not supported). You also need to specify the number of shots. The minimum and maximum number of supported shots differ for each backend and can be obtained from the backend properties `min_shots` and `max_shots`, respectively. A `PlanqkClientError` is thrown if the job input is invalid or if the designated backend is offline and does not accept new jobs in the moment. |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `retrieve_job(job_id)` | Retrieves a job from the backend using the provided id. If a job cannot be found a `PlanqkClientError` is thrown.                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                       |

This example shows how to run a circuit on a backend:

```python
# Create a circuit
circuit = QuantumCircuit(2, 2)
circuit.h(0)
circuit.cx(0, 1)
circuit.measure(range(2), range(2))
...
# Run the circuit on the backend
job = backend.run(circuit, shots=10)

# Retrieve a job by id
job = backend.retrieve_job("6ac422ad-c854-4af4-b37a-efabb159d92e")
```

### Jobs & Results

The `PlanqkJob` class is based on the [Qiskit Job class](https://qiskit.org/documentation/stubs/qiskit.providers.JobV1.html#jobv1). It provides status information about a job (e.g., job id, status, etc.) and enables you to access the job result as soon as the job execution has completed successfully.

#### Methods

| Method     | Description                                                                                                                                                                                                    |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `status()` | Returns the status of the job. The [Qiskit job states](https://qiskit.org/documentation/stubs/qiskit.providers.JobStatus.html) are: `INITIALIZING`, `QUEUED`, `RUNNING`, `CANCELLED`, `DONE`, `ERROR`.         |
| `result()` | Returns the result of the job. It blocks until the job execution has completed successfully. If the job execution has failed, a `PlanqkClientError` is thrown indicating that the job result is not available. |
| `cancel()` | Cancels the job execution. If the job execution has already completed or if it has failed, this method has no effect.                                                                                          |

#### Results

The type of result depends on the backend where the job was executed. Currently, only measurement result histograms are supported.
The histogram is represented as a dictionary where the keys are the measured qubit states and the values are the number of occurrences.
The measured qubit states are represented as bit-strings where the qubit farthest to the right is the most significant and has the highest index (little-endian).
If supported by the backend, the result also contains the memory of the job execution, i.e., the qubit state of each individual shot.

#### Attributes

| Attribute | Description                                             |
|-----------|---------------------------------------------------------|
| `counts`  | Returns the histogram of the job result as a JSON dict. |
| `memory`  | Returns the memory as a JSON dict.                      |

Here is an example of how to access these attributes:

```python
result = job.result()
print(result.counts)
# Expected output, e.g., {"11": 6, "00": 4}
print(result.memory)
# Expected output, e.g., ['00', '11', '11', '00', '11', '00', '11', '11', '00', '11']
```

## What's next?

- See our supported [quantum hardware and simulators](quantum-hardware.md)
- Check out the [Tutorial on how to create a PlanQK Service using the PlanQK Quantum SDK](../../tutorials/tutorial-qiskit.md).
