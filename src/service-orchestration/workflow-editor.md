# The workflow editor

To open the workflow editor, go to the details page of your service and click on _Edit Service/Workflow_

## Start Editing

When you start editing the first time, the workflow consists only of the start node:

   <img width="768" :src="$withBase('/images/workflow/workflow-editor-start.png')" alt="">

On the left side you find a panel which contains all possible node-types. Drag and drop a node into the editor area to start editing the workflow.

Here are some examples of how a workflow may look like at the end:

   <img width="768" :src="$withBase('/images/workflow/workflow-editor-examples.png')" alt="">

## BPMN

The workflows are based on the BPMN standard.
For a more detailed description of how BPMN works, visit the related documentation on [Camunda](https://docs.camunda.io/) e.g. [Camunda BPMN](https://docs.camunda.io/docs/components/modeler/bpmn/).

### Nodes

Here you find a brief description of the main node types, needed to build a useful PlanQK-workflow.

| Node Type       | Image                                                                                                 | Description                                                                          |
|-----------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Start           | <img width="64" :src="$withBase('/images/workflow/workflow-editor-node-start.png')" alt="">           | The entry point for each workflow.                                                   |
| End             | <img width="64" :src="$withBase('/images/workflow/workflow-editor-node-end.png')" alt="">             | The final node. Here the execution ends.                                             |
| Service Task    | <img width="64" :src="$withBase('/images/workflow/workflow-editor-node-service-task.png')" alt="">    | References a subscribed PlanQK-Service. When executed, the PlanQK-service is called. |
| Gateway         | <img width="64" :src="$withBase('/images/workflow/workflow-editor-node-gateway.png')" alt="">         | Dependent on a condition the service flow can continue with different branches.      |
| Data Map Object | <img width="64" :src="$withBase('/images/workflow/workflow-editor-node-data-map-object.png')" alt=""> | Here you can define input/output data for you service invocations.                   |


### Add a PlanQK Service Node

To call a PlanQK service you have to add a service node and assign the service you want to call.

   <img width="768" :src="$withBase('/images/workflow/workflow-editor-add-service-node.png')" alt="">

Click on the change type icon and then on _PlanQK Service Tasks_.
From the list of services, choose the one you want to call here.

Note: Only services you are subscribed on can be used within a workflow.

#### Configure input data for the service node

Assume the service node needs an input parameter with name "date" and type "string".
You can either directly hard code this input value in the service node or configure a parameter name which then has to be given at call time.

In both cases, click on the service node to open the content menu on the right side of the editor.
<img width="128" :src="$withBase('/images/workflow/workflow-editor-service-node-configuration.png')" alt="">
Click on the plus icon of the Inputs row.

If you want the parameter to be hard coded, just enter "date" as name and the wished date in the correct format, e.g. "2024-04-01" as value.

If you want the parameter to be taken from the list of parameters you pass at service invocation, enter "data" as name and a reference to the parameter name where you pass the value later, e.g. ${myServiceData}.



### Add a Data Object to pass Input data to Node

#### Hard code input data

#### Configure Data

### Add a Data Object to get Output data from Node

