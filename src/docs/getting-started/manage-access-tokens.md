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

By bringing your own access tokens, you can use your own accounts for certain quantum backends.
This allows PlanQK to access quantum backend providers at runtime.

<LoomVideo url="https://www.loom.com/embed/25663a0e9a594f1a8e92a68de64f35d6?sid=6b59ae19-3d55-4754-94cc-f102ade591aa"/>

To add a token for your account, go to the user-menu in the top right corner and click on "Settings".
Under "Quantum Backend Tokens" you can add different tokens to your account, depending on the provider.

Alternatively, when you are an owner or maintainer of an organization, you can provide access tokens in the section "Quantum Backend Tokens" of your organization settings.
If provided, every member of the organization can run circuits/jobs with these access tokens.
