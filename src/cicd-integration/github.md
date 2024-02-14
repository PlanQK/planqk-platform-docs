# Use GitHub Workflows to deploy to PlanQK

To setup a deploy job in a GitHub workflow you can use the [GitHub Action](https://github.com/marketplace/actions/update-planqk-service) provided by [Anaqor](https://anaqor.io) to update your service on the PlanQK platform.
It is an easy to use wrapper around the [PlanQK CLI](../cli-reference), which ultimately updates your service.

To setup the workflow for a new service proceed with the [general setup](introduction) of your git repo on GitHub, such that you have wired your service code with a PlanQK service referenced in the `planqk.json`.

Then create a CICD-pipeline that deploys service updates on PlanQK whenever you create new releases on GitHub via the following steps that must be executed in your local clone of your GitHub repository:

1. Create the folder structure `.github/workflows` in the root of your repository via `mkdir -p .github/workflows`
2. Create file `CD.yml` specifying the github workflow via `touch .github/workflows/CD.yml`
3. Paste the following snippet into `CD.yml` and save the file
```
name: CD

# Controls when the workflow will run
on:
  # Triggers the workflow on new releases
  release:
    types: [ released ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  # This workflow contains a single job called "deploy"
  deploy:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v4

      # Updates your service on PanQK
      - uses: PlanQK/update-service-action@v1
        with:
          PLANQK_TOKEN: ${{ secrets.PLANQK_TOKEN }}
          CONTEXT_ID: ${{ secrets.CONTEXT_ID }}
```
4. Commit and push these changes to your remote via `git add . && git commit -m "add CD workflow"`

The action `PlanQK/update-service-action@v1` requires `PLANQK_TOKEN` and `CONTEXT_ID` as inputs, which you have to setup as [Repository Secretes](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) of your repository on GitHub.
If you have setup the repository correctly, you will find a workflow called `CD` when navigating to the `Actions` of your GitHub repository.
You can trigger the automatic deployment of service updates either manually or by creating [releases from your codebase](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
