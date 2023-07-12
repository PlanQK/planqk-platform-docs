# SDK Reference

The `planqk-quantum` library is a SDK for developing quantum circuits using [Qiskit](https://pypi.org/project/qiskit) to be run on quantum devices 
provided by the [PlanQK Platform](https://docs.platform.planqk.de).
The library is a wrapper for the [Qiskit SDK](https://github.com/Qiskit/qiskit-metapackage) and provides the same functionality and syntax.

## Installation

The package is released on PyPI and can be installed via `pip`:

```bash
pip install --upgrade planqk-quantum
```

## Quantum Backends

### IonQ Quantum simulator
GPU-accelerated idealized simulator supporting up to 29 qubits,
using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

### IonQ Harmony
The IonQ Harmony is a trapped ion quantum computer and is dynamically reconfigurable in software to use up to 11 qubits.
All qubits are fully connected, meaning you can run a two-qubit gate between any pair.
For details see the [specification](https://ionq.com/quantum-systems/harmony)

### IonQ Aria
IonQ Aria is IonQ's latest generation of trapped-ion quantum computer. 
With a 23-qubit dynamically reconfigurable system.
For details see the [specification](https://ionq.com/quantum-systems/aria)

### Rigetti Aspen-M-3
Rigetti quantum processors are universal, gate-model machines based on tunable superconducting qubits.
Rigetti Aspen-M-3 is a 79-qubit processor based on scalable multi-chip technology and features enhanced readout capabilities that contribute to better overall circuit fidelities independent of depth and width.
For details see the [specification](https://qcs.rigetti.com/qpus)

### Oxford Quantum Circuits (OQC) Lucy
Oxford Quantum Circuits (OQC) quantum computers are universal, gate-based machines based on superconducting qubits built using proprietary 'Coaxmon' technolog.
OQC Lucy offers an 8 qubit QPU with a topology of a ring where each qubit is connected to its 2 nearest neighbors.
For details see the [specification](https://oxfordquantumcircuits.com/technology)

### :eyes: Coming Soon

We are working on adding more quantum backends to the PlanQK Platform. The following backends are coming soon:

- IBM Quantum

Is your favorite backend missing? [Let us know](https://join.slack.com/t/planqk-platform/shared_invite/zt-1b4899wqr-xqOYLSCr8KqYkREi251NxQ&#41)

## What's next?
Check out the [Tutorial on how to create a PlanQK Service using the `planqk-quantum` library](../../tutorials/tutorial-qiskit.md).