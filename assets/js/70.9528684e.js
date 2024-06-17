(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{367:function(t,e,a){"use strict";a.r(e);var o=a(7),r=Object(o.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"the-workflow-editor"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#the-workflow-editor"}},[t._v("#")]),t._v(" The workflow editor")]),t._v(" "),e("p",[t._v("To open the workflow editor, go to the details page of your service and click on "),e("em",[t._v("Edit Service/Workflow")])]),t._v(" "),e("h2",{attrs:{id:"start-editing"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#start-editing"}},[t._v("#")]),t._v(" Start Editing")]),t._v(" "),e("p",[t._v("When you start editing the first time, the workflow consists only of the start node:")]),t._v(" "),e("img",{attrs:{width:"768",src:t.$withBase("/images/workflow/workflow-editor-start.png"),alt:""}}),t._v(" "),e("p",[t._v("On the left side you find a panel which contains all possible node-types. Drag and drop a node into the editor area to start editing the workflow.")]),t._v(" "),e("p",[t._v("Here are some examples of how a workflow may look like at the end:")]),t._v(" "),e("img",{attrs:{width:"768",src:t.$withBase("/images/workflow/workflow-editor-examples.png"),alt:""}}),t._v(" "),e("h2",{attrs:{id:"bpmn"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bpmn"}},[t._v("#")]),t._v(" BPMN")]),t._v(" "),e("p",[t._v("The workflows are based on the BPMN standard.\nFor a more detailed description of how BPMN works, visit the related documentation on "),e("a",{attrs:{href:"https://docs.camunda.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Camunda"),e("OutboundLink")],1),t._v(" e.g. "),e("a",{attrs:{href:"https://docs.camunda.io/docs/components/modeler/bpmn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Camunda BPMN"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("h3",{attrs:{id:"nodes"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nodes"}},[t._v("#")]),t._v(" Nodes")]),t._v(" "),e("p",[t._v("Here you find a brief description of the main node types, needed to build a useful PlanQK-workflow.")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Node Type")]),t._v(" "),e("th",[t._v("Image")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("Start")]),t._v(" "),e("td",[e("img",{attrs:{width:"64",src:t.$withBase("/images/workflow/workflow-editor-node-start.png"),alt:""}})]),t._v(" "),e("td",[t._v("The entry point for each workflow.")])]),t._v(" "),e("tr",[e("td",[t._v("End")]),t._v(" "),e("td",[e("img",{attrs:{width:"64",src:t.$withBase("/images/workflow/workflow-editor-node-end.png"),alt:""}})]),t._v(" "),e("td",[t._v("The final node. Here the execution ends.")])]),t._v(" "),e("tr",[e("td",[t._v("Service Task")]),t._v(" "),e("td",[e("img",{attrs:{width:"64",src:t.$withBase("/images/workflow/workflow-editor-node-service-task.png"),alt:""}})]),t._v(" "),e("td",[t._v("References a subscribed PlanQK-Service. When executed, the PlanQK-service is called.")])]),t._v(" "),e("tr",[e("td",[t._v("Gateway")]),t._v(" "),e("td",[e("img",{attrs:{width:"64",src:t.$withBase("/images/workflow/workflow-editor-node-gateway.png"),alt:""}})]),t._v(" "),e("td",[t._v("Dependent on a condition the service flow can continue with different branches.")])]),t._v(" "),e("tr",[e("td",[t._v("Data Map Object")]),t._v(" "),e("td",[e("img",{attrs:{width:"64",src:t.$withBase("/images/workflow/workflow-editor-node-data-map-object.png"),alt:""}})]),t._v(" "),e("td",[t._v("Here you can define input/output data for you service invocations.")])])])]),t._v(" "),e("h3",{attrs:{id:"add-a-planqk-service-node"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#add-a-planqk-service-node"}},[t._v("#")]),t._v(" Add a PlanQK Service Node")]),t._v(" "),e("p",[t._v("To call a PlanQK service you have to add a service node and assign the service you want to call.")]),t._v(" "),e("img",{attrs:{width:"768",src:t.$withBase("/images/workflow/workflow-editor-add-service-node.png"),alt:""}}),t._v(" "),e("p",[t._v("Click on the change type icon and then on "),e("em",[t._v("PlanQK Service Tasks")]),t._v(".\nFrom the list of services, choose the one you want to call here.")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),e("p",[t._v("Only services you are subscribed on can be used within a workflow.")])]),t._v(" "),e("h4",{attrs:{id:"configure-input-data-for-the-service-node"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#configure-input-data-for-the-service-node"}},[t._v("#")]),t._v(" Configure input data for the service node")]),t._v(" "),e("p",[t._v('Assume the service node needs an input parameter with name "date" and type "string".\nYou can either directly hard code this input value in the service node or configure a parameter name which then has to be given at call time.')]),t._v(" "),e("p",[t._v("In both cases, click on the service node to open the content menu on the right side of the editor.\n"),e("img",{attrs:{width:"128",src:t.$withBase("/images/workflow/workflow-editor-service-node-configuration.png"),alt:""}}),t._v("\nClick on the plus icon of the Inputs row.")]),t._v(" "),e("p",[t._v('If you want the parameter to be hard coded, just enter "date" as name and the wished date in the correct format, e.g. "2024-04-01" as value.')]),t._v(" "),e("p",[t._v('If you want the parameter to be taken from the list of parameters you pass at service invocation, enter "data" as name and a reference to the parameter name where you pass the value later, e.g. ${myServiceData}.')]),t._v(" "),e("h3",{attrs:{id:"add-a-data-object-to-pass-input-data-to-node"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#add-a-data-object-to-pass-input-data-to-node"}},[t._v("#")]),t._v(" Add a Data Object to pass Input data to Node")]),t._v(" "),e("p",[t._v("An alternative way to configure input and output data is to add data objects to the workflow, connect them with the service nodes, and configure the data within these data objects.\nAn advantage of this is, that the data-flow is more explicit visible within the workflow.")]),t._v(" "),e("p",[t._v("The behaviour is the same, it is also possible to mix data configuration at service node with data configuration via data objects.")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),e("p",[t._v("If an input parameter is defined in both ways, at the service node and via a data object, the configuration via data object has the higher priority.")])]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),e("p",[t._v("If input data is hard coded in the workflow, it is not possible to overwrite the data at call invocation.\nSo it is not possible to pass different data for different execution runs of the workflow.")])])])}),[],!1,null,null,null);e.default=r.exports}}]);