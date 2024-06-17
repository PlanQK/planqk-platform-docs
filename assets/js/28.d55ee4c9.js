(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{323:function(t,e,a){"use strict";a.r(e);var s=a(7),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"use-gitlab-workflows-to-deploy-to-planqk"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#use-gitlab-workflows-to-deploy-to-planqk"}},[t._v("#")]),t._v(" Use GitLab Workflows to deploy to PlanQK")]),t._v(" "),e("p",[t._v("To setup a deploy job in a GitLab workflow you can use the below provided definition of a deploy stage.\nIt uses the "),e("a",{attrs:{href:"../cli-reference"}},[t._v("PlanQK CLI")]),t._v(" to update your service on PlanQK.")]),t._v(" "),e("p",[t._v("To setup the workflow for a new service proceed with the "),e("a",{attrs:{href:"introduction"}},[t._v("general setup")]),t._v(" of your git repo on GitLab, such that you have wired your service code with a PlanQK service referenced in the "),e("code",[t._v("planqk.json")]),t._v(".")]),t._v(" "),e("p",[t._v("Then create a CICD-pipeline that deploys service updates on PlanQK whenever you create new tag on GitLab via the following steps that must be executed in the root of your local clone of your GitLab repository:")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("Create the file "),e("code",[t._v(".gitlab-ci.yml")]),t._v(" via "),e("code",[t._v("touch .gitlab-ci.yml")])])]),t._v(" "),e("li",[e("p",[t._v("Paste the following snippet into "),e("code",[t._v(".gitlab-ci.yml")]),t._v(" and save the file")]),t._v(" "),e("div",{staticClass:"language-yaml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stages")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" deploy\n\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("deploy-to-planqk")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" deploy\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("rules")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("if")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $CI_COMMIT_TAG\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" node"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("21"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("slim\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("before_script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" npm install "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("g @anaqor/planqk\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" planqk login "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("t $PLANQK_TOKEN\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" planqk set"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("context $CONTEXT_ID\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" planqk up "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("silent\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br")])])]),t._v(" "),e("li",[e("p",[t._v("Commit and push these changes to your remote via "),e("code",[t._v('git add . && git commit -m "add CD workflow" && git push')])])])]),t._v(" "),e("p",[t._v("The deploy job requires the environment variables "),e("code",[t._v("PLANQK_TOKEN")]),t._v(" and "),e("code",[t._v("CONTEXT_ID")]),t._v(" being set, which you can setup in the settings of your repository (see "),e("a",{attrs:{href:"https://docs.gitlab.com/ee/ci/variables/#for-a-project",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),e("OutboundLink")],1),t._v(").\nIf you have setup the workflow and the environment variables correctly, the workflow will run once you create a new tag in your GitLab repository.")])])}),[],!1,null,null,null);e.default=n.exports}}]);