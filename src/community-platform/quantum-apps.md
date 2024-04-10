# Quantum apps
Once you have implemented an algorithm, e.g., for a certain use case, you can share it with the community as Quantum app (formerly known as qAI app).
You may wonder what is the difference between Implementations and Quantum apps?
While implementations are the source code of an implemented algorithm that can be run as a job on the platform, Quantum apps comprise the implementation of the algorithm and all other required software components such as databases, graphical user interfaces, communication middleware, and more.
Quantum apps are provided as "Quantum App Packages" (QAAs) that contain the application component artifacts as well as a [TOSCA](../tosca.md) deployment model.
This self-contained archive can be processed by any standard-compliant TOSCA engine to deploy the entire application locally or in the cloud.
This allows Quantum apps to be deployed independently of the PlanQK platform.

### Create a Quantum Application Archive (QAA)
The third-party tool OpenTOSCA can be used to create and process QAAs.
More details about how to use OpenTOSCA can be found [here](../tosca.md).
