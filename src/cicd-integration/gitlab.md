# Use GitLab Workflows to deploy to PlanQK

To setup a deploy job in a GitLab workflow you can use the below provided definition of a deploy stage.
It uses the [PlanQK CLI](../cli-reference) to update your service on PlanQK.

To setup the workflow for a new service proceed with the [general setup](introduction) of your git repo on GitLab, such that you have wired your service code with a PlanQK service referenced in the `planqk.json`.

Then create a CICD-pipeline that deploys service updates on PlanQK whenever you create new tag on GitLab via the following steps that must be executed in the root of your local clone of your GitLab repository:

1. Create the file `.gitlab-ci.yml` via `touch .gitlab-ci.yml`
2. Paste the following snippet into `.gitlab-ci.yml` and save the file

    ```yaml
    stages:
    - deploy

    deploy-to-planqk:
    stage: deploy
    rules:
        - if: $CI_COMMIT_TAG
    image: node:21-slim
    before_script:
        - npm install -g @anaqor/planqk
    script:
        - planqk login -t $PLANQK_TOKEN
        - planqk set-context $CONTEXT_ID
        - planqk up --silent
    ```

3. Commit and push these changes to your remote via `git add . && git commit -m "add CD workflow" && git push`

The deploy job requires the environment variables `PLANQK_TOKEN` and `CONTEXT_ID` being set, which you can setup in the settings of your repository (see [here](https://docs.gitlab.com/ee/ci/variables/#for-a-project)).
If you have setup the workflow and the environment variables correctly, the workflow will run once you create a new tag in your GitLab repository.
