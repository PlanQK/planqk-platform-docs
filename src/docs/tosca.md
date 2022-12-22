# OpenTOSCA

[OpenTOSCA](https://www.opentosca.org/) is a toolchain to deploy and manage cloud applications.
It's an implementation of the OASIS standard [TOSCA](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=tosca).
The TOSCA standard allows to create portable descriptions of cloud applications to enable automatic provisioning and management.
It supports declarative and imperative provisioning.
With declarative provisioning you only specify the topology of the components and the
*Declarative TOSCA Runtime Environment*
interprets and provisions it.
This works only for simple applications with limited complexity.
If you need more control you can use imperative provisioning.
For that you have to implement management plans that provision the application.
This allows you to deploy more complex applications, but it's more work than the declarative provisioning.

To get an overview of the terms and concepts of TOSCA, have a look at the [glossary](https://github.com/UST-QuAntiL/tosca-definitions-qc-applications/blob/main/docs/tosca-glossary.md).

An easy way to get started is to set up the [Dockerized OpenTOSCA Environment](https://github.com/OpenTOSCA/opentosca-docker) and follow the guide how to [Model and deploy an application with OpenTOSCA](https://github.com/UST-QuAntiL/tosca-definitions-qc-applications/blob/main/docs/tutorial-model-and-deploy.md).
You can find an overview of the different Docker containers and how they are connected to each other [here](https://github.com/OpenTOSCA/opentosca-docker/blob/main/docs/container-overview.md).

## HOW TOs

+ [Advanced How-To](https://github.com/OpenTOSCA/opentosca-docker/blob/main/docs/advanced-how-to.md)
+ [Deploy in production](https://github.com/OpenTOSCA/opentosca-docker/blob/main/docs/production.md)

## Further Documentation

+ [The OpenTOSCA Ecosystem - Concepts & Tools](https://www.iaas.uni-stuttgart.de/publications/ART-2016-26_The-OpenTOSCA-Ecosystem-Concepts-and-Tools.pdf)
+ [OpenTOSCA presentation](https://www.opentosca.org/documents/presentation-opentosca.pdf)
+ [TOSCA presentation](https://www.opentosca.org/documents/presentation-tosca.pdf)
+ [Winery](https://winery.readthedocs.io/en/latest/user/index.html#)
