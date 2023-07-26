# Quantum Backends

This page provides an overview of the supported quantum hardware and simulators.
For detailed information about each backend, please visit our [quantum backends page](https://platform.planqk.de/quantum-backends).

## Simulators

Simulators are a great way to test your quantum circuits before running them on actual quantum hardware.
We support simulators from Azure Quantum and AWS Braket.

### Azure IonQ Quantum Simulator

GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

| Name                 | Provider      | Status                                     |
|----------------------|---------------|--------------------------------------------|
| `azure.ionq.simulator` | Azure Quantum | <BackendStatus id="azure.ionq.simulator"/> |

### AWS Braket State Vector Simulator (SV1)

SV1 is a fully managed, high-performance, state vector simulator running on AWS.
You can use SV1 to simulate circuits up to 34 qubits.
SV1 is always available, executes your circuits on demand, and you can run multiple circuits in parallel.

| Name        | Provider      | Status                            |
|-------------|---------------|-----------------------------------|
| `aws.sim.sv1` | Azure Quantum | <BackendStatus id="aws.sim.sv1"/> |

### AWS Braket Density Matrix Simulator (DM1)

DM1 is a fully managed, high-performance, density matrix simulator.
You can use DM1 to simulate circuits with noise up to 17 qubits.
DM1 is always available, executes your circuits on demand, and you can run multiple circuits in parallel.

| Name          | Provider      | Status                            |
|---------------|---------------|-----------------------------------|
| `aws.sim.dm1` | Azure Quantum | <BackendStatus id="aws.sim.dm1"/> |

## Quantum Hardware

We provide access to a growing set of quantum hardware from different vendors.
We currently support backends form IonQ, Rigetti, Oxford Quantum Circuits (OQC).

### IonQ Harmony

The IonQ Harmony is a trapped ion quantum computer and is dynamically reconfigurable in software to use up to 11 qubits.
All qubits are fully connected, meaning you can run a two-qubit gate between any pair.
For details see the [specification](https://ionq.com/quantum-systems/harmony)

| Name                 | Provider      | Status                                   |
|----------------------|---------------|------------------------------------------|
| `azure.ionq.harmony` | Azure Quantum | <BackendStatus id="azure.ionq.harmony"/> |
| `aws.ionq.harmony`   | AWS Braket    | <BackendStatus id="aws.ionq.harmony"/>   |

### IonQ Aria

IonQ Aria is IonQ's latest generation of trapped-ion quantum computer.
With a 23-qubit dynamically reconfigurable system.
For details see the [specification](https://ionq.com/quantum-systems/aria)

| Name            | Provider   | Status                              |
|-----------------|------------|-------------------------------------|
| `aws.ionq.aria` | AWS Braket | <BackendStatus id="aws.ionq.aria"/> |

### Rigetti Aspen-M-3

Rigetti quantum processors are universal, gate-model machines based on tunable superconducting qubits.
Rigetti Aspen-M-3 is a 79-qubit processor based on scalable multi-chip technology and features enhanced readout capabilities that contribute to better overall circuit fidelities independent of depth and width.
For details see the [specification](https://qcs.rigetti.com/qpus)

| Name                | Provider   | Status                                  |
|---------------------|------------|-----------------------------------------|
| `aws.rigetti.aspen` | AWS Braket | <BackendStatus id="aws.rigetti.aspen"/> |

### Oxford Quantum Circuits (OQC) Lucy

Oxford Quantum Circuits (OQC) quantum computers are universal, gate-based machines based on superconducting qubits built using proprietary 'Coaxmon' technolog.
OQC Lucy offers an 8 qubit QPU with a topology of a ring where each qubit is connected to its 2 nearest neighbors.
For details see the [specification](https://oxfordquantumcircuits.com/technology)

| Name           | Provider   | Status                             |
|----------------|------------|------------------------------------|
| `aws.oqc.lucy` | AWS Braket | <BackendStatus id="aws.oqc.lucy"/> |

## Coming Soon :eyes:

We are working on adding more quantum backends to the PlanQK Platform.
The following backends are coming soon:

- IBM Quantum

Is your favorite backend missing? [Let us know](https://join.slack.com/t/planqk-platform/shared_invite/zt-1b4899wqr-xqOYLSCr8KqYkREi251NxQ&#41)
