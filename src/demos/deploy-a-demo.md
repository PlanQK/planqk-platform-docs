# Deploy a Demo

To deploy a Demo, simply connect a GitHub repository. 
PlanQK always **deploys the default branch** of your repository and **automatically triggers a re-deployment** every time you push to the default branch.
Each deployed Demo has a resource limit of 1 CPU and 512 MiB of memory and automatically scales to zero when not in use.

## A step-by-step guide to deploy a Demo

A simple way to create a Demo is to use the [Gradio](https://www.gradio.app/) python library.
Gradio lets you build interactive web interfaces in a matter of minutes.
Check out our [Gradio starter template](https://github.com/Anaqor/demo-starter-gradio).
Alternatively, you can deploy any other web app of your choice using Docker.

The following steps show you how to deploy a Demo for your Use Case.

Prerequisites:

- A [Use Case](https://platform.planqk.de/use-cases) you want to deploy a Demo for. 
  Alternatively, create a new Use Case.
- A fork of our [Gradio starter template](https://github.com/Anaqor/demo-starter-gradio).

**To deploy a Demo** for your Use Case click on the Demo tab of your Use Case and click on the **Create Demo** button.

<ImageShadow :src="$withBase('/images/demos/create-a-demo.png')"></ImageShadow>

You will be asked to connect your GitHub account (if you haven't done so already) and to select a repository.
Select the fork of the Gradio starter template you created earlier by clicking on **Connect**.
That's it, you deployed your first Demo!

But there is **one more thing**.
In order to make your Demo work we need to set some environment variables.
[Learn how to set environment variables](environment-variables.md).
