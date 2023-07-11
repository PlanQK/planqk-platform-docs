# Manage Access Tokens

In PlanQK, access tokens are used in token-based authentications to allow users to access the PlanQK API or to let PlanQK at runtime access the API of a quantum backend provider.

PlanQK supports two types of access tokens:
(1) **Personal Access Tokens**
for accessing the PlanQK API, e.g., by the [PlanQK CLI](cli-reference.md) to automate the interaction with the PlanQK Platform or by the [PlanQK Quantum SDK](sdk-reference.md) to develop and execute quantum circuits using our Qiskit extension, and
(2) **Quantum Backend Tokens**
to allow PlanQK accessing the API of quantum backend providers at runtime.
This is especially useful when you want to execute your quantum solutions using your own accounts for certain quantum backends (bring your own token).

## Personal Access Tokens

## Quantum Backend Tokens

<LoomVideo url="https://www.loom.com/share/25663a0e9a594f1a8e92a68de64f35d6?sid=c2abd3ef-f7af-44b9-ad0e-a5c05d722b88"/>




When you want to execute services via real quantum backends, you must provide valid tokens, in order to communicate with IBM's or DWave's devices.  
To add a token for your personal account, go to the user-menu in the top right corner and click on "Settings". Under "Quantum Backend Tokens" you can add different tokens to your account, depending on the provider.

::: tip IMPORTANT
These tokens will be used when you hand over a valid cloud `"backend"` (e.g. `"ibmq_qasm_simulator"`) within the `"params"` object in your request (depends on the supported backends of the service).
:::

Alternatively, when you are an owner or maintainer of an organization, you can provide API tokens in the section "Quantum Backend Tokens" of your organization.
If provided, every member of the organization can run circuits/jobs with this token, as long as the right context in the top left corner is selected.
Like that, all invoices will be sent to the deposited organization billing E-Mail.



