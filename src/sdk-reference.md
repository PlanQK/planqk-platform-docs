# SDK Reference

The PlanQK Quantum SDK provides an easy way for developing quantum circuits using [Qiskit](https://pypi.org/project/qiskit) to be run on [quantum hardware and simulators supported](quantum-hardware.md) by the [PlanQK Platform](https://docs.platform.planqk.de).
It is an **extension** for the [Qiskit SDK](https://github.com/Qiskit/qiskit-metapackage).
This means that you're able to seamlessly integrate and reuse your existing Qiskit code, leveraging the power and familiarity of a framework you're already accustomed to.

## Installation

The package is released on PyPI and can be installed via `pip`:

```bash
pip install --upgrade planqk-quantum
```

## Using the SDK

The SDK, based on Qiskit, enables access to quantum hardware and simulators using the Qiskit syntax. To list and access the quantum backends supported by Planqk, you will need to use either the `PlanqkQuantumProvider` or the `PlanqkQiskitRuntimeService` class.
The latter one is used to access the IBM backends while the former one is used to access all other backends.

### Authentication

To use the SDK, you need to authenticate using an access token with at least the `quantum-tokens` scope.
The token can be generated [here](https://platform.planqk.de/settings/access-tokens).
This token can be set in two ways:

1. Automatically, by logging in through the [PlanQK CLI](quickstart.md#_3-login-to-your-account). The command to login via CLI is `planqk login -t <your_access_token>`. This method will automatically inject the access token when you instantiate the `PlanqkQuantumProvider` class.

2. Explicitly, during instantiation of the `PlanqkQuantumProvider` or the `PlanqkQiskitRuntimeService` class as shown in the example below. This method overrides any access token that has been automatically injected through the PlanQK CLI login.

If the access token is not set or if it is invalid or has expired, an `InvalidAccessTokenError` is thrown. 
You need to generate a new token and login again. 

### Example Usage

```python
from planqk.qiskit import PlanqkQuantumProvider

# Initialize the provider with your access token
provider = PlanqkQuantumProvider(access_token="your_access_token")

backends = provider.backends()

# Select a certain backend
backend = provider.get_backend(name="azure.ionq.simulator")
```

::: tip IMPORTANT
Note: You need to set an access token having at least the `quantum-tokens` scope to use the PlanqkQuantumProvider class.
You can either set it explicitly in the constructor `PlanqkQuantumProvider(access_token = "my_token")` or use the [PlanQK CLI to login](quickstart.md#_3-login-to-your-account).
In latter case the token is automatically applied when you instantiate the `PlanqkQuantumProvider` class.
If the access token is not set or if it is invalid, an `InvalidAccessTokenError` is thrown.
You can generate a new token [here](https://platform.planqk.de/settings/access-tokens).
If you apply the token through login, you need to log in again with the PlanQK CLI and pass the new token as argument.
:::

## Supported Operations

### PlanqkQuantumProvider
This section provides a brief overview of the most important classes and methods in the SDK. For a more detailed description, please refer to the SDK's API documentation.

#### Provider

The `PlanqkQuantumProvider` class is an extension for the [Qiskit Provider](https://qiskit.org/documentation/stubs/qiskit.providers.ProviderV1.get_backend.html#qiskit.providers.ProviderV1.get_backend).

| Method              | Description                                                                                                                            |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `backends()`        | This method returns a list of backends supported by PlanQK. Please note that currently, backend filtering is not supported.            |
| `get_backend(name)` | This method returns a single backend that matches the specified name. If the backend cannot be found, a `PlanqkClientError` is thrown. |

#### Backend

The `PlanqkBackend` class represents a [Qiskit Backend](https://qiskit.org/documentation/stubs/qiskit.providers.BackendV2.html).
It provides information about quantum backends (e.g., number of qubits, qubit connectivity, etc.) and enables you to run quantum circuits on the backend.
Please note that currently, only circuits with gate-based operations are supported while pulse-based operations are not supported.

The `PlanqkBackend` class supports the following methods:

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

#### Jobs & Results

The `PlanqkJob` represents a [Qiskit Job](https://qiskit.org/documentation/stubs/qiskit.providers.JobV1.html#jobv1). 
It provides status information about a job (e.g., job id, status, etc.) and enables you to access the job result as soon as the job execution has completed successfully.

##### Methods

| Method     | Description                                                                                                                                                                                                    |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `status()` | Returns the status of the job. The [Qiskit job states](https://qiskit.org/documentation/stubs/qiskit.providers.JobStatus.html) are: `INITIALIZING`, `QUEUED`, `RUNNING`, `CANCELLED`, `DONE`, `ERROR`.         |
| `result()` | Returns the result of the job. It blocks until the job execution has completed successfully. If the job execution has failed, a `PlanqkClientError` is thrown indicating that the job result is not available. |
| `cancel()` | Cancels the job execution. If the job execution has already completed or if it has failed, this method has no effect.                                                                                          |

##### Results

The type of result depends on the backend where the job was executed. Currently, only measurement result histograms are supported.
The histogram is represented as a dictionary where the keys are the measured qubit states and the values are the number of occurrences.
The measured qubit states are represented as bit-strings where the qubit farthest to the right is the most significant and has the highest index (little-endian).
If supported by the backend, the result also contains the memory of the job execution, i.e., the qubit state of each individual shot.

##### Attributes

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

### PlanqkQiskitRuntimeService

The `PlanqkQiskitRuntimeService` class is an extension of the [Qiskit Runtime Service](https://qiskit.org/ecosystem/ibm-runtime/stubs/qiskit_ibm_runtime.QiskitRuntimeService.html).
It enables you to run quantum circuits on the IBM backends using the Qiskit Runtime.
The framework provides computational primitives tailored for fundamental quantum computing operations, enhanced with integrated error suppression and mitigation functionalities. 
These primitives operate within sessions, enabling the joint execution of multiple circuits on a quantum device without being interrupted by other users’ jobs.
This results in a significant reduction of the overall execution time.
In the example below two circuits are executed within the same session.
The first job waits in the queue. The session starts, if this job is executed on the backend.
After the first job is finished, the second job of the session is instantly executed on the backend without being queued again. 

```python
service = PlanqkQiskitRuntimeService()
circuit_1 = QuantumCircuit(2, 2)
...
circuit_2 = QuantumCircuit(3, 3)
...

with Session(service=service, backend="ibmq_qasm_simulator") as session:
    # Submit a request to the Sampler primitive within the session.
    sampler = Sampler(session=session, options=options)
    job = sampler.run(circuits=circuit_1)
    print(f"Sampler results: {job.result()}")
    ...
    job = sampler.run(circuits=circuit_2)
    print(f"Sampler results: {job.result()}")
```

#### Provider
Such as the `PlanqkQuantumProvider`, the `PlanqkQiskitRuntimeService` also provides the methods for retrieving backends:

| Method              | Description                                                                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `backends()`        | This method returns a list of backends supported by the `PlanqkQiskitRuntimeService`.                                                                                     |
| `get_backend(name)` | This method returns a single backend that matches the specified name. If the backend cannot be found or if it is not supported, a `QiskitBackendNotFoundError` is thrown. |


#### Session
As session groups a collection of iterative job execution calls to a quantum computer.
A session is created by instantiating the `Session` class. 
To instantiate a session, you need to provide the following constructor parameters: 
* `service` - Must be set to a `PlanqkQiskitRuntimeService` object.
* `backend` - The name of the backend you want to use.

More detailed information about the attributes and methods provided by the `Session` calls can be found [here](https://qiskit.org/ecosystem/ibm-runtime/stubs/qiskit_ibm_runtime.Session.html).

#### Primitives
Primitives are core functions that make it easier to build modular algorithms and applications.
They enhance the ways how users can run jobs on quantum computers.
Currently, the `Sampler` and the `Estimator` primitives are supported.

##### Sampler
This primitive is similar to the `backend.run()` operation.  
It takes circuits as input and returns a quasi-probability distribution over the measurement outcomes. 
This generalizes histograms from quantum circuits, allowing for mitigation of readout errors. 
More information about using this primitive can be found [here](https://qiskit.org/ecosystem/ibm-runtime/tutorials/how-to-getting-started-with-sampler.html).

##### Estimator

The estimator primitive allows you to efficiently calculate and interpret expectation values of quantum operators. 
You specify circuits that prepare quantum states and then Pauli-basis observables to measure on those states. 
The estimator can use advanced error suppression and mitigation capabilities to improve the accuracy of the returned expectation values.

To use the estimator, you need to create a circuit and one or more observables, that represent the physical properties of your quantum system you want to measure.
You run the estimator as job by passing the circuit and the observables to the `Estimator` primitive within a session.

```python
circuit = QuantumCircuit(2, 2)
...
observable = SparsePauliOp("XZ")

with Session(service=service, backend="ibmq_qasm_simulator") as session:
    # Submit a request to the Estimator primitive within the session.
    estimator = Estimator(session=session)
    job = estimator.run(circuits=circuit, observables=observable)
    print(f"Estimator results: {job.result()}")
```

More information about the estimator primitive can be found [here](https://qiskit.org/ecosystem/ibm-runtime/tutorials/how-to-getting-started-with-estimator.html).


## What's next?

- See our supported [quantum hardware and simulators](quantum-hardware.md)
- Check out the [Tutorial on how to create a PlanQK Service using the PlanQK Quantum SDK](tutorials/tutorial-qiskit.md).
