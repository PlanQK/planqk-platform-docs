# Platform Usage Costs
The usage costs for the Plank platform consist of resource costs, provider fees, and transaction fees.

- Resource Costs
- Provider Fee

## PlanQK Resource Usage Costs
The PlanQK-Platform provides classical compute and quantum resources that can be accessed by your PlanQK services or by quantum code on your dev machine.
The following table summarizes these costs:

| Resource Name     | Price per Usage                |
|-------------------|--------------------------------|
| API Calls         | € 0.000012 / calls             |
| Memory Time       | € 0.000000006 / MB-second      |
| vCPU Time         | € 0.00000004776 / milliCPU-sec |
| IonQ 2-Qubit Gate | € 0.0006 / shot                |
| IonQ 1-Qubit Gate | € 0.000048 / shot              |


The costs of a service are determined by multiplying the price per unit by the quantity of units used during the service execution. 
For example, if your service API is called the execution of 1000 IonQ 2-Qubit Gates, the cost of that service will be € 0.6 (1000 * € 0.0006).

### Classical Resources

### API Calls ###
This number of calls of your service through the PlanQK-Platform API. A call is defined as a single call to the API.

### Memory Time ###
The memory resources consumed by your service. An MB-second is defined as the usage of 1 MB of memory resources for 1 second.

### vCPU Time ###
The virtual CPU resources used by your service. A milliCPU-sec is defined as the usage of 1 milliCPU-second of virtual CPU resources.

## IonQ Quantum Resources ##

IonQ charges based on the number of gates in your program, the complexity of the gates you use, and the number of shots. 
These units are called gate-shots.

Every quantum program consists of N quantum logical gates of one or more qubits, and is executed for a certain number of shots. 
The number of gate-shots is calculated by the following formula:

QGS = N ⋅ C

where:

N is the number of one- or two-qubit gates submitted
C is the number of execution shots requested
Multi-controlled two-qubit gates are billed as 6 * (N-2) two-qubit gates, where N is the number of qubits involved in the gate. 
For example, a NOT gate with three controls would be billed as (6 * (4-2)) or 12 two-qubit gates. One-qubit gates are billed as 0.225 of a two-qubit gate (rounded down).

TODO passt hier unsere rechnung überhaupt? 

### IonQ 2-Qubit Gate ###
This service provides access to a 2-qubit gate in the IonQ quantum computer. A shot is defined as a single execution of the gate on the quantum computer.

### IonQ 1-Qubit Gate ###
This service provides access to a 1-qubit gate in the IonQ quantum computer. A shot is defined as a single execution of the gate on the quantum computer.

Note: All prices listed above are exclusive of VAT. The cost of a service will be calculated based on the total quantity of resources used and will be charged to the user's account on a monthly basis.


## Marketplace Fees
- 20 percent of services provided in the marketplace
- Based on revenue 
