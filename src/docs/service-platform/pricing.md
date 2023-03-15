# Pricing

The usage costs for the PlanQK Platform consist of resource costs and marketplace fees.

## Resource Costs

The PlanQK Platform provides classical compute and quantum resources that can be accessed by your PlanQK services or by quantum code from your IDE.

::: tip NOTE
All prices listed here are exclusive of VAT.
The costs for running a PlanQK Service will be calculated based on the total quantity of resources used and will be charged to the user's or organization's account on a monthly basis.
:::

### Classical Compute Resources

| Resource Name | Price                            |
|---------------|----------------------------------|
| API           | € 0.00001 / request              |
| vCPU          | € 0.0000000398 / milliCPU-second |
| Memory        | € 0.000000005 / megabyte-second  |

As an example, running a PlanQK Service with a one gigabyte memory configuration for 1 second consumes 1024 megabyte-seconds.
Similarly, running a PlanQK Service with a 256 megabyte memory configuration for 4 seconds consumes 1024 megabyte-seconds as well.

#### Definitions

* API request:
  An API request is defined as a single HTTP request to your PlanQK Service through the PlanQK Platform Gateway API.
* vCPU per milliCPU-second:
  The virtual CPU resources reserved for your PlanQK Service. A milliCPU-second is defined as the usage of a one thousandth of one virtual CPU for one second.
* Memory per megabyte-second:
  The memory resources reserved for your PlanQK Service. A megabyte-second is defined as the usage of 1 MB of memory for one second.

### Quantum Resources

| Resource Name     | Price            |
|-------------------|------------------|
| IonQ 1-Qubit Gate | € 0.00006 / shot |
| IonQ 2-Qubit Gate | € 0.0006 / shot  |

IonQ resources are charged based on the number of gates in your program, the complexity of the gates you use, and the number of shots.
These units are called gate-shots.

Every quantum program consists of `N` quantum logical gates of one or more qubits, and is executed for a certain number of shots.
The number of gate-shots is calculated by the following formula:

`QGS = N ⋅ C`

where:

* `N` is the number of one- or two-qubit gates submitted
* `C` is the number of execution shots requested

Multi-controlled two-qubit gates are billed as `6 * (N-2)` two-qubit gates, where `N` is the number of qubits involved in the gate.
For example, a NOT gate with three controls would be billed as `(6 * (4-2))` or 12 two-qubit gates.

## Marketplace Fees

The PlanQK Marketplace is a marketplace for quantum services that allows users to discover, evaluate, and use quantum services.
As a service provider, you can offer and commercialize your PlanQK services on the PlanQK Marketplace to other users:

* You can offer your PlanQK Service for free, hence, you bear all the resource costs from above by yourself.
* For [Managed Services](../service-platform/managed-services.md), you can define a markup in percent that will be added to the resource costs for each service execution by respective service consumers.
* For [External Services](../service-platform/external-services.md), you can define a custom pricing plan of your choice, comprising custom products that are metered by yourself and billed through the PlanQK Platform.

Therefore, for non-free PlanQK Services, you will earn a revenue that will be transferred to your revenue account on a monthly basis.
The PlanQK Platform charges a marketplace fee of **20 percent (%)** of the transferred revenue.
