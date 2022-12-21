# Additional information

## Organizations
Besides their individual accounts, users of the PlanQK platform can also be associated with some organization, e.g. as an employee of a company.
In that context users might want to be able to e.g. publish algorithms or services, as well as execute jobs either as an individual or as part of such an organization.
So, **assuming you are a member of an organization**, you should be aware of the **Account Context** in the top left corner, right above the different sections whenever you are doing something on the platform.

> **Note**: When you are not a member of an organization you will not see the context-drop-down menu associated to it.

> **Important**:
> - As of now, after creating a new service, algoritm, etc. you are **NOT** able to change its context. So, before you do something new, be sure to have selected the correct context for the content you are about to create.
> - Refreshing your browser resets the context to your personal account.

Being a member of an organization you can have one of multiple roles (similar to the roles associated to an algorithm or an implementation).
This, and anything related to your organization(s) can be seen in the corresponding section in the user drop-down menu in the top right corner.
Depending on your role for the organizations you belong to, you can see different information, e.g. other members or the general information.

### Manage Organizations
In the drop-down menu of your personal account in the top right corner you can select the section "Organizations".
Besides the ones your account is already associated to, you also have the option to create a new organization in the top right corner, which requires a name and a billing email.  
In order to allow members of your organization to run quantum services or jobs you should also consider adding a valid Quantum API token.


## Add tokens to your account / organization
When you want to execute services via real quantum backends, you must provide valid tokens, in order to communicate with IBM's or DWave's devices.  
To add a token for your personal account, go to the user-menu in the top right corner and click on "Settings". Under "Quantum Backend Tokens" you can add different tokens to your account, depending on the provider.

**Important:**
These tokens will be used when you hand over a valid cloud `"backend"` (e.g. `"ibmq_qasm_simulator"`) within the `"params"` object in your request (depends on the supported backends of the service).

Alternatively, when you are an owner or maintainer of an organization, you can provide API tokens in the section "Quantum Backend Tokens" of your organization. If provided, every member of the organization can run circuits/jobs with this token, as long as the right context in the top left corner is selected. Like that, all invoices will be sent to the deposited organization billing E-Mail.
