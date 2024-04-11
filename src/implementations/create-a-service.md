# Create a PlanQK service
This step-by-step guide will teach you how to create a PlanQK service based on your implementation.
You will learn how to initialize a Docker Python project using the [PlanQK CLI](../cli-reference.md), push its code to an implementation and create a PlanQK managed service based on it.
This guide assumes that you already know the basics about [managed services](../managed-services/introduction.md) and [implementations](../implementations/getting-started.md).

### Requirements

This guide assumes that you have the latest version of PlanQK cli installed on your machine.
If not you can install it by following the instructions in the [CLI reference](../cli-reference.md).


### Initialize a Docker Python Starter project
The PlanQK CLI provides you with a set of starter templates to help you get started quickly with your quantum services.
You can see the full list of available templates in our [GitHub repository](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates).
In this tutorial we will use the **Docker Python Starter** template to create a new service based on custom Docker containers.
To initialize the project, run the following command in your terminal:

```bash
planqk init
```

In the interactive prompt:

1. Choose a name, e.g., `my-service`.
2. Select `Docker Python Starter` as coding template.
3. Choose your resource configuration.

After the initialization, you will find a new folder with the name of your service in the current directory.
For sake of simplicity will not get into details of the generated code in this tutorial.
You can check out the README file in the generated project for more information.

### Create an implementation and push the code
Next, [create a new Implementation](https://platform.planqk.de/v2/implementations/new) and upload the code of your service.
You can follow the steps in the [Getting Started](../implementations/getting-started.md) guide.
After refreshing your implementation page, you should see all your added files.
Similar to the screenshot below.

<ImageShadow :src="$withBase('/images/implementations/implementation-with-dockerfile.png')" />


### Create a service based on the implementation
As your service code includes a Dockerfile, you should see the "Create Service" button in the action bar of your implementation page.
Click on the button to create a new PlanQk service based on your implementation.
Navigate to the [Services](https://platform.planqk.de/services) page to see your new service.
Congratulations, you have successfully created a PlanQK service based on your implementation 🎉.
