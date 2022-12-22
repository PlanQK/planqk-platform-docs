---
footer: © Copyright 2023 Anaqor AG
---

# NISQ Analyzer

The [NISQ Analyzer](https://github.com/UST-QuAntiL/nisq-analyzer) is a research prototype based on [Salm et al.](https://link.springer.com/chapter/10.1007/978-3-030-64846-6_5).
It automatically analyzes implementations of quantum algorithms.
The results indicate if a quantum algorithm can be executed on a Quantum Processing Unit (QPU) or simulator.
It also enables the analysis and selection of suitable QPUs based on a specific quantum algorithm implementation.
Based on [Salm et al.](https://link.springer.com/chapter/10.1007/978-3-030-87568-8_4), it enables the automated comparison of available quantum compilers to support the selection of the most suitable compiled quantum circuit.

## User Guide to Run the NISQ Analyzer on PlanQK Platform Data

This guidance guides you through the [QC Atlas UI](https://github.com/UST-QuAntiL/qc-atlas-ui) for applying
the [NISQ Analyzer](https://github.com/UST-QuAntiL/nisq-analyzer) on given implementations of the PlanQK Platform for
selecting suitable quantum computers.

### Getting started using the NISQ Analyzer for the PlanQK Platform

To use the NISQ Analyzer on the PlanQK platform content, currenly only Qiskit-based implementations are supported. Thus
the _technology_ field is used to specify the used SDK, i.e., Qiskit, while the version field specifies the programming
languages used, e.g., Qiskit or OpenQASM. Please note that currently only the first file on the platform is used by the
NISQ Analyzer for analyzing and executing the implementation. A current limitation is that only fixed circuits, i.e.,
circuits that do not require input parameters, can be executed. The Shor implementation is such an example.

#### 0. Prerequisites

+ Docker Engine - [Install Guide](https://docs.docker.com/engine/install/)
+ Docker Compose - [Install Guide](https://docs.docker.com/compose/install/)
+ Clone [quantil-docker repository](https://github.com/UST-QuAntiL/quantil-docker)
+ Required ports are listed [here](https://github.com/UST-QuAntiL/quantil-docker#readme)

#### 1. Add Qiskit Credentials to docker-compose.override.yml

1. Copy [docker-compose.nisq.analyzer.override.yml](https://docs.platform.planqk.de/en/latest/docker-compose.nisq.analyzer.override.yml) file
   to `docker-compose.override.yml`.
2. Insert your Qiskit token at `QPROV_IBMQ_TOKEN: 'your-qiskit-token-here'` in the new `docker-compose.override.yml`.

**Note:** Currently only quantum computers of IBMQ are supported.

#### 2. Run QC Atlas UI and the NISQ Analyzer

Open a console, navigate to the folder of the quantil-docker, and run the following commands:

1. `docker-compose --profile nisqAnalyzer pull`
2. `docker-compose build db`
3. `docker-compose --profile nisqAnalyzer up`

After a few seconds, the ecosystem is up and running and you can access it via the browser on <http://localhost:80>. The
QC Atlas UI is visible.

#### 3. Login to PlanQK Platform

To login in to the platform, click the user button on the top right and insert your PlanQK platform username and
password.

<img width="1590" alt="platform-login" src="https://user-images.githubusercontent.com/23473511/122178127-983ce800-ce86-11eb-9514-f5beb4d62285.png">

Now, the list of algorithms available in the platform are displayed.

#### 4. Using the NISQ Analyzer for selecting suitable quantum computers for a specific implementation

1. Navigate to the desired algorithm and click on it.
2. In context of the algorithm, click on _Implementations_ and select the given implementation.

<img width="1590" alt="implementations" src="https://user-images.githubusercontent.com/23473511/122180174-793f5580-ce88-11eb-88b1-a7094319a81e.png">

3. In context of the implementation, click on the _NISQ Analyzer_ tab.

<img width="1590" alt="implementation-NISQ-Analyzer" src="https://user-images.githubusercontent.com/23473511/122180990-37fb7580-ce89-11eb-9ccf-5a96557c3bf8.png">

4. To start the quantum computer selection, click on _New Analysis_, select the vendor and insert your Qiskit token. You
   can also enable/disable if simulators should be included. Then, click ok to start the analysis.
5. Now a new analysis job is created. When the analysis job is finished a _Show analysis_ button occurs on the right
   side. While waiting, you can browse through the QC Atlas UI.
6. When clicking on the _Show analysis_ button suitable quantum computers (and simulators) are listed.

<img width="1590" alt="analysis-result" src="https://user-images.githubusercontent.com/23473511/122182995-18654c80-ce8b-11eb-9044-be4f09ca3317.png">

7. You can also execute the implementation on the suitable quantum computers (and simulators) by clicking the _Execute_
   button. After clicking, the _Show result_ button occurs which expands the table row and displays status and result of
   the execution.
8. When the execution is complete, the result is displayed.

<img width="1590" alt="execution-result" src="https://user-images.githubusercontent.com/23473511/122183561-a2adb080-ce8b-11eb-94ac-c366dc8a0264.png">

#### 5. Stop the environment

1. To stop the environment go to the console window with the docker-compose running, stop the process (e.g.
   control+shift+C for Mac).
2. To remove all volumes run `docker-compose down -v`.
