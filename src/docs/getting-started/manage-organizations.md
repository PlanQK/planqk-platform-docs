# Manage Organizations
Organizations allow you to collaborate with your team. Besides their individual accounts, users of the PlanQK platform can also be associated with some organization, e.g. as an employee of a company.
In that context users might want to be able to e.g. publish algorithms or services, as well as execute jobs either as an individual or as part of such an organization. 

<LoomVideo url="https://www.loom.com/embed/cd7316d29c4749ee8e45ad9fdc9bb024?sid=9f084d42-8e2b-4597-9b45-5a00a7eb0a02"
style="margin-top: 1em" />

In the drop-down menu of your personal account in the top right corner you can select the section "Organizations".
Besides the ones your account is already associated to, you also have the option to create a new organization, which requires a name and a billing address.  

Under the menu item "Members" you can easily add members to the organization and assign them one of multiple roles (similar to the roles associated to an algorithm or an implementation):
- Viewer: Can see the content of the organization, but cannot edit or create content.
- Maintainer: Can create new content, edit existing content, but cannot delete content.
- Owner: Can create, edit and delete hole content of the organization. Owner can add new members, assign them different roles, and can delete members. Of course, the owner can see the entire organization profile and edit it.

The added member will receive an email invitation that must be confirmed. After that, the member can see the organization in his account context drop-down menu.

## Switch Context between Personal Account and Organization
**Assuming you are a member of an organization**, you should be aware of the **Account Context** in the top left corner, right above the different sections whenever you are doing something on the platform.

**Note**: When you are not a member of an organization you will not see the context-drop-down menu associated to it.

::: tip IMPORTANT
- As of now, after creating a new service, algorithm, etc. you are **NOT** able to change its context. So, before you do something new, be sure to have selected the correct context for the content you are about to create.
- Refreshing your browser resets the context to your personal account.
  :::

<LoomVideo url="https://www.loom.com/embed/d9340d05b88d4d2793365b6d99b30c6a?sid=b0d6a7b5-749b-43b1-b188-cc0d7071ef91"
style="margin-top: 2em" />

## Quantum Backend Tokens
**Note**: This can only be set by the owner of the organization.

In order to allow members of your organization to run quantum services or jobs you should also consider adding a valid Quantum API token.