# NISQ Analyzer

The [NISQ Analyzer](https://github.com/UST-QuAntiL/nisq-analyzer) is a research prototype based on the work by [Salm et al.](https://link.springer.com/chapter/10.1007/978-3-030-64846-6_5). 
It automatically analyzes implementations of quantum algorithms and recommends compilation results for suitable Quantum Processing Units (QPUs). 
Thereby, the analysis and selection of suitable QPUs can be initiated for a specific implementation.
Based on the work by [Salm et al.](https://link.springer.com/chapter/10.1007/978-3-030-87568-8_4), the NISQ Analyzer also enables the automated comparison of available quantum compilers for a specific QPU to support the selection of the most suitable compilation result.
Besides the selection of compilation results and QPUs, it also enables the selection of suitable quantum algorithm implementations based on a given problem instance.
Furthermore, the content of the PlanQK platform can be accessed to apply the NISQ Analyzer.

## User Guide to Run the NISQ Analyzer on PlanQK Platform Data

This guidance guides you through the [QC Atlas UI](https://github.com/UST-QuAntiL/qc-atlas-ui) for applying
the [NISQ Analyzer](https://github.com/UST-QuAntiL/nisq-analyzer) on given implementations of the PlanQK Platform for
selecting suitable quantum computers.

### Getting started to use the NISQ Analyzer for the PlanQK Platform content

From the platform's point of view to use the NISQ Analyzer on the platform content, currently, only Qiskit-based implementations are supported. Thus,
the _technology_ field of the platform is used to specify the used SDK, i.e., Qiskit, while the version field specifies the programming
languages used, e.g., Qiskit or OpenQASM. Please note that only the first file on the platform is used by the
NISQ Analyzer for analyzing and executing the implementation. An actual limitation is that only fixed circuits of the platform, i.e.,
circuits that do not require input parameters, can be executed. The Shor implementation is such an example.

### Run and apply the NISQ Analyzer

#### 0. Prerequisites

+ Docker Engine - [Install Guide](https://docs.docker.com/engine/install/)
+ Docker Compose - [Install Guide](https://docs.docker.com/compose/install/)
+ Clone [nisq-analyzer-content repository](https://github.com/UST-QuAntiL/nisq-analyzer-content/tree/paper/pre-selection)
+ Required ports are listed [here](https://github.com/UST-QuAntiL/nisq-analyzer-content/tree/paper/pre-selection/pre-selection/Docker)

#### 1. Add Qiskit Credentials to docker-compose.override.yml

1. Copy `_docker-compose.override.yml` file to `docker-compose.override.yml`.
2. Insert your Qiskit token at `QPROV_IBMQ_TOKEN` in the new `docker-compose.override.yml`.

**Note:** Currently only quantum computers of IBMQ are supported.

#### 2. Run QC Atlas UI, the NISQ Analyzer, and all additionally required components

Open a console, navigate to the [`Docker`](https://github.com/UST-QuAntiL/nisq-analyzer-content/tree/paper/pre-selection/pre-selection/Docker) folder of the nisq-analyzer-content repository, and run the following commands:

1. `docker-compose pull`
2. `docker-compose build db`
3. `docker-compose up`

After a few moments, the ecosystem is up and running and you can access it via the browser on <http://localhost:80>. The
QC Atlas UI is visible.

#### 3. Apply the NISQ Analyzer

**The guidance about how to apply the NISQ Analyzer can be viewed [here](https://quantil.readthedocs.io/en/latest/user-guide/nisq-analyzer/).**

#### 4. Stop the environment

1. To stop the environment go to the console window with the docker-compose running, stop the process (e.g.
   control+shift+C for Mac).
2. To remove all volumes run `docker-compose down -v`.
