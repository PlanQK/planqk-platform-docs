# Quickstart

## Install the PlanQK CLI

```bash
npm install -g plank 

# or use npx

# or
brew install plank

# or
choco install plank

# or
apt install plank

# or
curl .../install.sh | bash
```

## Create a vanilla PlanQK Coding Project

```bash
planqk init my-project
```

## Create a PlanQK Coding Project with a template

```bash
planqk init --template template-qiskit my-project

planqk init --template tempalte-dwave my-project

planqk init --template template-ionq my-project

planqk init --template template-docker my-project
```



> `planqk.json` with defaults. 
> User can adapt, name, description, quantum backend, resource settings, runtime config (docker or python), etc.

```json
{
  "name": "my-project",
  "description": "My first PlanQK project",
  "quantumBackend": "qiskit",
  "resources": {
    "cpu": 1,
    "memory": "1Gi",
    "gpu": 0
  },
  "runtime": {
    "type": "docker"
  },
  "serviceId": "<uuid>",
  "organizationId": "<uuid>"
}
```

>
> Use and execute service from IDE (aka. as standalone execution)
> 


```bash
cd my-project

planqk up
```
