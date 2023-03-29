# Jobs

The PlanQK Platform provides the functionality to execute **managed services** directly via the platform.
We refer to this feature as
_Jobs_ and they are either based your own services, services in an organization, or subscribed services via the PlanQK marketplace.
Jobs can be especially useful when experimenting with implementations for quantum hardware and when intending to share results with other users of the platform in the form of a [data pool](src/docs/community-platform.md#data-pools).

## Job Overview

When being in the "Jobs" tab you should see a (possibly empty) list of finished jobs.
If you did not execute any jobs yet, it's time to change that.
So click on "Create Job" in the top right corner, and the interface guides you through the necessary steps.

## Create a Job

### Select a Service

You have to select a service that should be run as a job.
Once selected, you will see the API details at the bottom of the page.

::: tip NOTE
You may create new services via the [Services](src/docs/service-platform/managed-services.md) tab or by creating a service from an existing implementation in the PlanQK Community.
Any implementation provided according to the steps described [here](src/docs/community-platform.md#provide-an-implementation-for-job-execution) and to which you have access can be used for jobs.
In order to do so, click on "Create Service" button next to the file for the implementation of your choice.
After the service has been created it should appear in the list of available services for your job.
:::

### Input Data and Parameters

In general, services that run via the PlanQK Platform, require two, possibly empty, fields as input.
These fields are `"data"` and  `"params"` (if you have worked with the user code template, you should have seen them already).
The field `"data"` should provide all the data required for the problem at hand, e.g., a QUBO.
The `"params"` field should provide additional (meta-)information for the execution such as the number of iterations, the number of variational layers for a circuit or the name of the backend.
Note, the data or param size must not exceed 1 MB.

#### Input Data

The input of this step refer to the corresponding `"data"` field of a service implementation (`program.py`).
You have the option to hand over the input as a single JSON object or load an existing input object from the [Data Pools](src/docs/community-platform.md#data-pools).

#### Job Parameters

Similar to the section above, the job parameters refer to the corresponding `"params"` field of a service implementation (`program.py`).
You have the option to include them via key-value pairs or directly as a JSON object, similar to the input data.

### Advanced Settings

Right now, there's not much for this point except for the option to save the results of your job in a data pool, i.e., to share the result with other users.

## Job Results

Now, after you clicked on "Run" you will be direct to the page dedicated to the result and details of your job.
Directly after starting it, you will probably just see "Input Data" and "Job Parameters" fields containing the information you just provided the step prior.  
After the job has (hopefully successfully) finished, the status icon switches to one of two things: It being a green checkmark says - Hooray!
Your job has been executed without any errors, and you see your result either directly on that page or, if you chose that option, in a specifically created data pool.  
On the other hand, if the status switches to a red cross, something went wrong.
For that reason we included the **Logs** of the job in the top right corner for your convenience.
The information you find there hopefully helps in identifying if something in the provided data was missing or whether the service itself is malfunctioning.
