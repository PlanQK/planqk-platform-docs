# CICD-Integration with PlanQK

You can integrate PlanQK with your CICD-pipelines to continuously deploy and update your services running on the PlanQK platform using the [PlanQK CLI](../cli-reference) to setup a deploy stage.
In the following, the general strategy is described how to leverage the CLI along with the required prerequisites.
You can use this strategy as a blueprint to develop your own CICD-integrations, nevertheless, we provide also directly usable templates for several CICD-systems as listed by the table below.

## General Strategy

### Prerequisites

1. Setup a git repository and clone it to your machine, note that the following steps assume that you are in the folder of the git repository on your local machine
2. Install the [PlanQK CLI](../cli-reference)
3. Create a [PlanQK Access Token](../manage-access-tokens)

### General Setup to automate the Deployment of your code to PlanQK Services

To automate the deployment of your code to a service on PlanQK, you have to setup your codebase and wire it with the targeted service.
This can easily be done by using the PlanQK CLI to initially create a service from your codebase, which automatically saves the `serviceId` of the created service in the `planqk.json` of your codebase.
The following steps show how you can scaffold an initial service implementation and create a service on PlanQK, which is then wired with the service implementation.

1. Authorize the CLI with your [PlanQK Access Token](../manage-access-tokens) via `planqk login -t <your-token>`
2. Setup a project using `planqk init` of the [PlanQK CLI](../cli-reference)
3. Chose the context the service shall be deployed to on PlanQK via `planqk set-context <context-id>` (you can list your available contexts via `planqk list-contexts`)
4. Create the service on PlanQK via `planqk up`
5. Commit this state to your git repository (`git add . && git commit -m "initial commit"`) and push it to your remote (`git push`)

You will recognize that the service is created on PlanQK and that the ID of the created service is set as `serviceId` in the `planqk.json` in your codebase.
This way, your codebase is wired with a specific service on PlanQK and whenever you execute `planqk up` again, the service will be updated with the state of your codebase.
You can make use of this mechanism in your CICD-pipeline to create a deploy job that can be triggered on events like new releases or even pushes to your codebase.
Thereby, assure that your install the [PlanQK CLI](../cli-reference) in your deploy job, provide it with the respective [PlanQK Access Token](../manage-access-tokens) and context-id.
Then, the deploy job can deploy an updated version of your service via `planqk up`.
