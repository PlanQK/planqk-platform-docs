# Manage Access Tokens

In PlanQK, access tokens are used in token-based authentications to allow users to access the PlanQK API or to let PlanQK at runtime access the API of a quantum backend provider.

PlanQK supports two types of access tokens:
(1) **Personal Access Tokens**
for accessing the PlanQK API, e.g., by the [PlanQK CLI](cli-reference.md) to automate the interaction with the PlanQK Platform or by the [PlanQK Quantum SDK](sdk-reference.md) to develop and execute quantum circuits using our Qiskit extension, and
(2) **Provider Access Tokens**
to allow PlanQK accessing the API of quantum backend providers at runtime.
This is especially useful when you want to execute your quantum solutions using your own accounts for certain quantum backends (bring your own token).

## Personal Access Tokens

You can use personal access tokens to access the PlanQK API, e.g., by the [PlanQK CLI](cli-reference.md) or by the [PlanQK Quantum SDK](sdk-reference.md).
Further, you can use them to authenticate any custom application that wants to interact with the PlanQK Platform API.

<LoomVideo url="https://www.loom.com/embed/b7bdfe322e72401d80782aaa28dbcfeb?sid=61f62d05-4c81-41fa-9903-073000fc1958"/>

To create a personal access token to your account, go to the user-menu in the top right corner and click on "Settings".
Under "Personal Access Tokens" you can create new personal access tokens and manage existing ones.

You can use different scopes to set the permission levels granted to the token.
For example, for using the **PlanQK CLI**, make sure you at least select the `api` scope.
For using the **PlanQK Quantum SDK**, make sure you select the `api` and `quantum_tokens` scopes.

::: tip Note
Personal access tokens can only be created for user accounts.
You can use your personal access token to interact with organizations you are a member of.
:::

## Provider Access Tokens

By bringing your own access tokens, you can use your own accounts for certain quantum backends.
This allows PlanQK to access quantum backend providers at runtime.

<LoomVideo url="https://www.loom.com/embed/330cb6ae8f3a4a29bf904ed9cef038fb?sid=bd3bc415-fc0c-45f7-bcff-57ca4cd70acf"/>

To add a token for your account, go to the user-menu in the top right corner and click on "Settings".
Under "Provider Access Tokens" you can add different tokens to your account, depending on the provider.

Alternatively, when you are an owner or maintainer of an organization, you can provide access tokens in the section "Provider Access Tokens" of your organization settings.
If provided, every member of the organization can run circuits/jobs with these access tokens.
