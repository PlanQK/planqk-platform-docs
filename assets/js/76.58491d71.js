(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{372:function(t,e,s){"use strict";s.r(e);var a=s(7),n=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"utilize-the-planqk-service-sdk-for-local-development"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#utilize-the-planqk-service-sdk-for-local-development"}},[t._v("#")]),t._v(" Utilize the PlanQK Service SDK for Local Development")]),t._v(" "),e("p",[t._v("This tutorial provides step-by-step guidance on how to create services, monitor their statuses, retrieve their results, and cancel their executions locally. To accomplish this objective, the tutorial utilizes the PlanQK Service SDK and PlanQK CLI.")]),t._v(" "),e("p",[t._v("Prerequisites:\nEnsure that Docker is installed and running properly. For detailed documentation, please refer to the following link: "),e("a",{attrs:{href:"https://www.docker.com/products/docker-desktop/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Docker Desktop"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"deploying-the-services-locally-with-the-planqk-cli"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#deploying-the-services-locally-with-the-planqk-cli"}},[t._v("#")]),t._v(" Deploying the Services locally with the PlanQK CLI")]),t._v(" "),e("p",[t._v("To install the PlanQK CLI, you must install Node.js and the npm command line interface using either a\n"),e("a",{attrs:{href:"https://github.com/nvm-sh/nvm",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node version manager"),e("OutboundLink")],1),t._v(" or a "),e("a",{attrs:{href:"https://nodejs.org/en/download",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node installer"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("p",[t._v("Then install the PlanQK CLI globally using npm:")]),t._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-g")]),t._v(" @anaqor/planqk\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("Once the installation is complete, start by navigating to the directory where your project, which includes the service, is located.")]),t._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" my-project\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("Next, run the following command:")]),t._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("planqk serve\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("Once the SERVICE is up and running, you can access its API under http://localhost:8081/. For additional details regarding the "),e("code",[t._v("planqk serve")]),t._v(" functionality, please refer to the documentation available "),e("a",{attrs:{href:"https://docs.platform.planqk.de/cli-reference.html#planqk-serve",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("h2",{attrs:{id:"accessing-a-service-with-the-planqk-service-sdk"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#accessing-a-service-with-the-planqk-service-sdk"}},[t._v("#")]),t._v(" Accessing a Service with the PlanQK Service SDK")]),t._v(" "),e("p",[t._v("Supported operations are: creating, monitoring the status of the service, retrieving the execution result and cancelling the execution of the service.")]),t._v(" "),e("p",[t._v("Begin by installing the PlanQK Service SDK using pip.")]),t._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("pip "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--upgrade")]),t._v(" planqk-service-sdk\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("Replace the placeholders your_consumer_key and your_secret_key in the code snippet below with the credentials provided in one of your platform applications. Additionally, configure the service_endpoint to the URL where planqk sere operates. In the example below, the server is operating on the default URL.")]),t._v(" "),e("div",{staticClass:"language-python line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" planqk"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("service"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("client "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" PlanqkServiceClient\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Your consumer key and secret")]),t._v("\nconsumer_key "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your_consumer_key"')]),t._v("\nconsumer_secret "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your_consumer_secret"')]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Service endpoint")]),t._v("\nservice_endpoint "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://localhost:8081/"')]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Initialize the client")]),t._v("\nclient "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" PlanqkServiceClient"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("service_endpoint"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consumer_key"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" consumer_secret"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br")])]),e("p",[t._v("You can initiate executions as illustrated in the following example:")]),t._v(" "),e("div",{staticClass:"language-python line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[t._v("data "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dataValue"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"abc"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dce"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nparams "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"paramsValue"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"abc"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dce"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# start execution")]),t._v("\njob "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("start_execution"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("data"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" params"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("params"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br")])]),e("p",[t._v("To check the status of an execution, utilize the following code snippet:")]),t._v(" "),e("div",{staticClass:"language-python line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# get execution status")]),t._v("\nstatus "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("get_status"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("job"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])]),e("p",[t._v("Retrieve the result of an execution with the following example:")]),t._v(" "),e("div",{staticClass:"language-python line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# get execution result")]),t._v("\nresult "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" client"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("get_result"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("job"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])]),e("p",[t._v("Lastly, to cancel an execution, follow this example:")]),t._v(" "),e("div",{staticClass:"language-python line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# get execution result")]),t._v("\nclient"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cancel_execution"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("job"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])])])}),[],!1,null,null,null);e.default=n.exports}}]);