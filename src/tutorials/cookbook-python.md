# Automate PlanQK using Python

This cookbook for python contains general instructions and recipes on how to programmatically perform certain tasks within the PlanQK Platform.
The instructions are written as step-by-step guides on which you can follow like a usual tutorial.

::: tip NOTE
The cookbook uses a Python code generator to create a [PlanQK Platform API](https://platform.planqk.de/qc-catalog/swagger-ui/index.html) client to perform certain operations.
A general API description of all supported operations can be found [here](https://platform.planqk.de/qc-catalog/swagger-ui/index.html).
:::

## How to set up a PlanQK integration project?

First of all, create a project folder.
Afterwards, create the following folder structure and files:

```
.
├── requirements.txt
└── src
    └── application.py
```

::: tip
A complete Python project including a couple of example can be found [here](https://github.com/PlanQK/planqk-platform-samples/tree/master/planqk-api/python/planqk-samples).
:::


You can set up a new Python virtual environment for your project, e.g., you may use Conda and the following commands:

```bash
conda env create -f environment.yml
conda activate planqk-samples
```

After we have the proper structure we have to install the required third-party dependencies.
Add the following third-party dependencies to your local `requirements.txt` file:

```
certifi >= 14.5.14
frozendict ~= 2.3.4
python-dateutil ~= 2.7.0
setuptools >= 21.0.0
typing_extensions ~= 4.3.0
urllib3 ~= 1.26.7
```

Afterwards, execute the following command to install them:

```bash
pip install -r requirements.txt
```

After the installation of the `requirements.txt` we can install the [openapi-generator-cli](https://openapi-generator.tech/docs/installation):

```bash
npm install -g @openapitools/openapi-generator-cli
```

Generate the API client project in a new directory and don't forget to copy it in your `./src` folder like shown below:

```bash
mkdir generator-output && cd generator-output

openapi-generator-cli version-manager set 5.4.0
openapi-generator-cli generate -g python -i https://platform.planqk.de/qc-catalog/v3/api-docs
cp -R openapi_client ../src
```

## How to authenticate with the PlanQK platform?

First of all, create a python script called `application.py`.
You may place this file into `./src` or into your desired package structure.

Add the following content as a minimal baseline:

```python
from openapi_client.configuration import Configuration
from openapi_client.api_client import ApiClient

api_key = {'apiKey': 'Your personal access token'}
configuration = Configuration(api_key=api_key)

api_client = ApiClient(configuration=configuration)
```

Next, you have to create a [personal access token](https://platform.planqk.de/settings/access-tokens).

1. Log-in to the PlanQK Platform and go to `Settings > Personal Access Tokens`.
2. Click on **Add Access Token.**
3. Select an unique name for your token.
4. At least select the `api` scope for the new token.
5. After the token is generated, copy it and use it to authenticate with PlanQK as shown in the example below.

Add your token to the respective `api_key` dictionary:

```python
api_key = {'apiKey': 'Your personal access token'}
```

To verify the communication with the PlanQK Platform,
you may add the following code and afterwards execute the created `application.py` script:

```python
# API interface to manage PlanQK Services
service_api = ServicePlatformServicesApi(api_client=api_client)

lifecycle = "CREATED"
service_api.get_services(lifecycle=lifecycle)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/authentication_sample.py)

## How to create a managed PlanQK Service?

In the following we assume you already have a PlanQK Service implemented and the zipped code archive ready to use.
For the following tutorial, you just need to download the [PlanQK user code template](https://storage.googleapis.com/yeoman-templates/latest/template.zip) and rename it to `user_code.zip`.

::: details
However, to implement a fresh new PlanQK Service for the PlanQK Platform you need to complete the following prerequisites:

1. First, you need to download or generate the PlanQK user code template as explained in the [documentation](https://docs.platform.planqk.de/en/latest/platform_instructions/service_platform.html#embedding-the-python-code-into-the-user-code-template).
2. Implement your service logic by modifying the PlanQK user code template according to your business requirements.
3. Before deploying it to the PlanQK platform, you should test the correct behaviour of your service on [your local machine](https://docs.platform.planqk.de/en/latest/platform_instructions/service_platform.html#test-your-service-locally-and-with-docker).
   This will help you to identify and correct potential errors before the actual deployment process.
4. Create a ZIP archive of your PlanQK Service code.
5. Although not absolutely necessary for providing a service, we do strongly recommend to write an [API description](https://docs.platform.planqk.de/en/latest/platform_instructions/service_platform.html#create-an-api-spec-file-for-your-service) for your PlanQK service.
   This API description gives users of the service a manual on how they are able to communicate with the service, namely how they can send the input for problems and receive the solutions.
   :::

Now, that you have your zip archive ready (e.g., a file called `user_code.zip`), you have to specify the following information to create a PlanQK Service programmatically:

| Attribute name   | Description                                                                        |
|------------------|------------------------------------------------------------------------------------|
| `name`           | Your desired name for your PlanQK Service (required)                               |
| `description`    | A detailed description of your service (optional)                                  |                                                                  |
| `userCode`       | For managed services, specify the path to your zipped code archive                 |
| `apiDefinition`  | Specify the path to your OpenAPI description for your service (optional)           |

Extend your `application.py` script and add the following:

```python
# API interface to manage PlanQK Services
service_api = ServicePlatformServicesApi(api_client=api_client)

"""
At the moment each managed PlanQK Service may communicate with exactly one quantum cloud provider,
 e.g., with IBM Quantum Cloud or D-Wave Leap. To configure the service properly, you may uncomment
 one of the following lines.
"""
quantumBackend = "NONE"  # Default value
# quantumBackend = "IBM";
# quantumBackend = "DWAVE";

name = "Your service name"
description = "Your service description"
use_platform_token = "FALSE"  # FALSE to use own backend tokens in case 'quantumBackend' is 'DWAVE', 'IBM' etc.
cpu = 500  # minimum
memory = 2048  # default memory configuration: 2048 = 2GB
user_code = open('Absolute path to the user_code.zip file', 'rb')
api_definition = open('Absolute path to the OpenAPI definition', 'rb')
user_code = open('Absolute path to the user_code.zip file', 'rb')
api_definition = open('Absolute path to the OpenAPI definition', 'rb')

service = services_api.create_managed_service(
    name=name,
    quantum_backend=quantumBackend,
    description=description,
    use_platform_token=use_platform_token,
    cpu=cpu,
    memory=memory,
    user_code=user_code,
    api_definition=api_definition
)
```

The service creation takes approx. one or two minutes to complete.
You can go to [My Services](https://platform.planqk.de/services) and observe the build status.

A PlanQK Service can have multiple versions.
Therefore, each service object has a list of so-called _service definitions_ aka. _versions_.
However, at the moment, there will always be one service definition.
In the future, you will be able to maintain multiple versions of your service with this.

Extend your `application.py` as follows:

```python
version = service.service_definitions[0]
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/create_managed_service_sample.py)

## How to wait until a managed PlanQK Service has been built by the PlanQK Platform?

As mentioned above the service creation takes approx. one or two minutes to complete.
Hence, you need to wait for the creation process to be completed.

The following code block shows some boilerplate code to wait until the PlanQK Service has been successfully created:

```python
"""
Waits up to 5 minutes till the PlanQK Service has been created.
"""
def wait_for_service_to_be_created():
    timer = 0
    # Check build status
    build_status = service_api.get_build_status(service_id=service.id, version_id=version.id)
    while build_status['status'] == 'WORKING' or build_status['status'] == 'QUEUED':
        time.sleep(15)
        timer += 15
        if timer > 300:
            break
        # Check build status again to see if job failed or succeeded
        build_status = service_api.get_build_status(service_id=service.id, version_id=version.id)
        if build_status['status'] == 'SUCCESS':
            print("Service successfully created")
            break
        elif build_status['status'] == 'FAILURE':
            print("Error creating PlanQK Service")
            break
```

::: warning
You may adapt the code above with your own logic before use this in any production-like environment.
:::

Add the above method to your `application.py` and call it.

```python
wait_for_service_to_be_created()
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/create_managed_service_sample.py)

## How to connect a self-hosted service with the PlanQK Platform?

You can connect a self-hosted service with the PlanQK Platform by creating a so-called "external" service
if you just want the PlanQK platform to manage the access to it.

The following properties are required to create a self-hosted PlanQK Service:

| Attribute name       | Description                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------------|
| `name`               | Your desired name for your PlanQK Service (required)                                          |
| `quantumBackend`     | The quantum backend your self-hosted service uses. Options: `NONE`, `DWAVE`, `IBM` (required) |
| `description`        | A detailed description of your service (optional)                                             |
| `productionEndpoint` | Supply a valid URL to your self-hosted service (required)                                     |
| `apiDefinition`      | Specify the path to your OpenAPI description for your service (optional)                      |

Extend or adapt your `application.py` script and add the following:

```python
# API interface to manage PlanQK Services
service_api = ServicePlatformServicesApi(api_client=api_client)

"""
Uncomment one of the following lines if your self-hosted service communicates with of the quantum cloud providers,
e.g., with IBM Quantum Cloud or D-Wave Leap.
"""
quantumBackend = "NONE"  # Default value
# quantumBackend = "IBM";
# quantumBackend = "DWAVE";

name = "Your service name"
production_endpoint = "Your public endpoint URL"
description = "Your service description"
api_definition = open("Absolute path to your OpenAPI definition", 'rb')

service = service_api.create_external_service(
    name=name,
    url=production_endpoint,
    quantum_backend=quantumBackend,
    description=description,
    api_definition=api_definition
)
```

In this case, it is not necessary to wait for the service to be created.
You are immediately able to work with your new service like described in the following sections.

A PlanQK Service can have multiple versions.
Therefore, each service object has a list of so-called _service definitions_ aka. _versions_.
However, at the moment, there will always be one service definition.
In the future, you will be able to maintain multiple versions of your service with this.

Extend your `application.py` as follows:

```python
version = service.service_definitions[0]
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/create_external_service_sample.py)

## How to update a PlanQK Service?

You may update your service in case you want to change certain information.
The following attributes can be updated:

- The description of your service
- The related industries your service can be used in
- Your API definition describing the service interface
- The updated service code supplied inside a zip archive

As a prerequisite, you need a ready to use PlanQK Service:

```python
service = services_api.create_managed_service("""...""")
version = service.service_definitions[0]

wait_for_service_to_be_created()
```

Alternatively, you may search for an existing PlanQK Service using its ID or by its name.

* Search by ID:
```python
service = services_api.get_service(<id>)
```

* Search by name:
```python
lifecycle = 'CREATED'
services = services_api.get_services(lifecycle=lifecycle)

found_service = None
name = "My service name"

# Filter the list by name
for service in services:
   if service['name'] == name:
      found_service = service
```

**Update description and related industries:**

First, you need to retrieve a list of all industries and select an appropriate industry id to be assigned to your service:

```python
# Retrieve a list of available industries
industries = services_api.get_industries()

# Retrieve 'information_technology' industry from the list
information_technology = None
industry_name = 'information_technology'
for industry in industries:
    if industry['name'] == industry_name:
        information_technology = IndustryDto(id=industry['id'], name=industry['name'])   
```

Then, use the following code to update your service:

```python
update_version_request = UpdateVersionRequest(description="Updated description", industries=[information_technology])
version = services_api.update_service_version(service_id=service.id, version_id=version.id,update_version_request=update_version_request)
```

To remove all assigned industries, apply the following code:

```python
update_version_request = UpdateVersionRequest(industries=[])
version = services_api.update_service_version(service_id=service.id, version_id=version.id, update_version_request=update_version_request)
```

**Update your service code:**

```python
updated_user_code = open('Path to the updated user_code.zip file', 'rb')
services_api.update_source_code(service_id=service.id, version_id=version.id, source_code=updated_user_code)

wait_for_service_to_be_created()
```

**Update your API definition:**

```python
updated_api_definition = open('Path to the updated API definition', 'rb')
services_api.update_api_definition(service_id=service.id, version_id=version.id, file=updated_api_definition)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/update_service_sample.py)

## How to delete a PlanQK Service?

Assuming you already created a PlanQK Service, you can delete it by using its ID and the `delete_service()` method.
To get a PlanQK Service ID, you may search for an existing service:

```python
lifecycle = 'CREATED'
services = services_api.get_services(lifecycle=lifecycle)

found_service = None
name = "My service name"

# Filter the list by name
for service in services:
   if service['name'] == name:
      found_service = service
```

Afterwards, you can add the following to your `application.py`:

```python
services_api.delete_service(found_service.id)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/find_and_delete_service_sample.py)

## How to make my PlanQK Service accessible to other users?

There are two ways to make a service accessible for other users:
(1) You can publish your service internally to run PlanQK Jobs or test its correct behaviour or
(2) publicly via the PlanQK Marketplace if you want to monetize your service.

### Publish service internally

Assuming you already created a PlanQK Service, you can add the following to your `application.py`:

```python
version = services_api.publish_service_internal(service_id=service.id, version_id=version.id)
```

You may check if your service is in the correct lifecycle state:

```python
if version.lifecycle == "ACCESSIBLE":
    print("service successfully published")
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/publish_service_internal_sample.py)

### Publish service to PlanQK Marketplace

Assuming you already created a PlanQK Service, you can add the following to your `application.py`:

```python
version = services_api.publish_service(service_id=service.id, version_id=version.id)
```

You may check if your service is in the correct lifecycle state:

```python
if version.lifecycle == "PUBLISHED":
    print("service successfully published")
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/publish_service_sample.py)

### Unpublish a PlanQK Service

Either way, you can use the following code to simply unpublish your PlanQK Service again:

```python
services_api.unpublish_service(service_id=service.id, version_id=version.id)
```

## How to create a PlanQK Application?

To access any PlanQK Service programmatically, you have to create a PlanQK Application.
A PlanQK Application conveys the credentials used to authenticate your PlanQK Service execution requests.
Further, a PlanQK Application is used to subscribe to one or more PlanQK Services - either your own services or services from other users.
This means, the PlanQK Application itself handles the _authentication_ and a subscription to a service handles the _authorization_.

Extend the `application.py` as follows:

```python
# API interface to manage PlanQK Applications
application_api = ServicePlatformApplicationsApi(api_client=api_client)

application_name = "My Application"
create_app_request = CreateApplicationRequest(name=application_name)
application = application_api.create_application(create_app_request)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/create_application_sample.py)

## How to delete a PlanQK Application?

Assuming you already created a PlanQK Application, you can delete it by using its ID and the `delete_application()` method.
To get a PlanQK Service ID, you may search for an existing service:

```python
applications = applications_api.get_applications()

found_application = None
name = 'My Application'

# Filter the list by name
for application in applications:
   if application['name'] == name:
      found_application = application
```

Afterwards, you can add the following to your `application.py` to delete your PlanQK Application:

```python
applications_api.delete_application(found_application.id)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/find_and_delete_application_sample.py)

## How to subscribe to internally published PlanQK Services?

To test the correct behaviour of your own services you may publish it _for internal use_.
This means only you can subscribe to it by a PlanQK Application.

As a prerequisite for the subscription you need a PlanQK Service:

```python
service = services_api.create_managed_service("""...""")
version = service.service_definitions[0]

wait_for_service_to_be_created()
```

Then, publish your new service internally:

```python
version = services_api.publish_service_internal("""...""")
```

Afterwards, you have to create a PlanQK Application to establish a subscription:

```python
application = application_api.create_application("""...""")
```

Finally, create a _subscription request_ object and trigger the operation:

```python
subscription_request = CreateInternalSubscriptionRequest(application_id=application.id, service_id=service.id)
applications_api.create_internal_subscription(id=application.id, create_internal_subscription_request=subscription_request)
```

You may add the following code to retrieve a list of all active subscriptions:

```python
subscriptions = applications_api.get_application_subscriptions(id=application.id)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/subscribe_internal_service_sample.py)

## How to subscribe to PlanQK Services published in the PlanQK Marketplace?

Whenever you want to interact with services from the marketplace, you must be subscribed to them with an application.
Applications hold all necessary information, e.g., authentication credentials, for a secure communication with the service from an external source.

In this step, we assume you want to subscribe to any service in the PlanQK Marketplace (which is not necessarily yours).

As a prerequisite for the subscription you need a PlanQK Application:

```python
application = application_api.create_application("""...""")
```

At this stage, you have two options:
(1) You may search for a service in PlanQK Marketplace programmatically, e.g., by the service name, or
(2) you may look up the PlanQK Service ID on the PlanQK Platform (`Marketplace > Services > Service Details > Technical Specifications`) to directly subscribe to it.

### Search by name programmatically


```python
# Get all available PlanQK Services
services = marketplace_api.find_services()

found_service = None
name = "My Service Name"

# Filter the list by name
for service in services:
    if service['name'] == name:
       found_service = service
```

### Use PlanQK Service ID found on PlanQK Platform

```python
service = marketplace_api.find_service(<service id>)
```

### Select a suitable pricing plan

Each PlanQK Service has at least one pricing plan.
You must select a suitable one, either a "free" plan if available of a "paid" plan, to create an active subscription.

```python
# We assume here your selected PlanQK Service provides a "free" plan
free_plan = service['pricing_plans'][0]
```

### Create the subscription

```python
create_subscription_request = CreateSubscriptionRequest(application_id=application.id, pricing_plan_id=free_plan.id)
marketplace_api.create_subscription(id=service.id, create_subscription_request=create_subscription_request)
```

You may add the following code to retrieve a list of all active subscriptions:

```python
subscriptions = applications_api.get_application_subscriptions(id=application.id)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/subscribe_service_sample.py)

## Working with PlanQK Organizations

To interact with organizations we first have to create one.
Following this [link](https://docs.platform.planqk.de/en/latest/platform_instructions/additional_information.html#organizations) you can find more information about organizations and how to create one.

To perform operations in organization-context, you need to add the ID of your organization to the respective API operations
For example, the `create_managed_service(...)` method has an `x_organization_id` parameter that must be use in this regard.
If this parameter is not set, you operate in your personal space.

::: tip
The ID of your organization can be found on your [organization details page](https://platform.planqk.de/settings/organizations) on the PlanQK Platform.
:::

Extend your `application.py` class and add the following:

```python
organization_id = "<id of your organization>";
```

### Share a PlankQK Service in an Organization

```python
name = "Your service name"
quantumBackend = "NONE"  # Default value
description = "Your service description"
use_platform_token = "FALSE"  # FALSE to use own backend tokens in case 'quantumBackend' is 'DWAVE', 'IBM' etc.
cpu = 500  # minimum
memory = 2048  # default memory configuration: 2048 = 2GB
user_code = open('Absolute path to the user_code.zip file', 'rb')
api_definition = open('Absolute path to the OpenAPI definition', 'rb')

service = services_api.create_managed_service(
    name=name,
    quantum_backend=quantumBackend,
    description=description,
    use_platform_token=use_platform_token,
    cpu=cpu,
    memory=memory,
    user_code=user_code,
    api_definition=api_definition
)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/organization_sample.py)

### Share a PlanQK Application in an Organization

```python
create_app_request = CreateApplicationRequest(name="My Application")
application = applications_api.create_application(create_application_request=create_app_request, x_organization_id=organization_id)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/organization_sample.py)

### Create internal subscriptions to PlanQK Services within an Organization

```python
subscription_request = CreateInternalSubscriptionRequest(application_id=application.id, service_id=service.id)

applications_api.create_internal_subscription(
    id=application.id,
    create_internal_subscription_request=subscription_request,
    x_organization_id=organization_id
)
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/organization_sample.py)

## How to execute a PlanQK service?

For the sake of the tutorial we assume you either published your own PlanQK Service internally and subscribed to it, or you just subscribed to PlanQK Service found on the PlanQK Marketplace.

First of all, you have to acquire an access token based on your PlanQK Application credentials.
Extend your `application.py` with the following:

```python
access_token = applications_api.get_access_token(id=application.id)['token']
```

::: tip NOTE
This access token must be sent as "Authorization" header in any request of the PlanQK Service API.
The header must follow the following template: `Authorization: Bearer <your access token>`.
:::

Each managed PlanQK Service provides three HTTP endpoints as its API (this may differ for "external" PlanQK Services, therefore, check in "Marketplace > Services > Service Details > Technical Specifications" the published API description):

1. `POST /`: Executes the service in an asynchronous fashion and returns an execution id
2. `GET /<execution id>`: Used to check the status of your execution
3. `GET /<execution id>/result`: Used to retrieve the final result for your execution

Let's prepare the input for the service execution.
Create a file, e.g. `input.json`, containing the `data` and `params` JSON structure as described by the PlanQK Service API description.

::: details Example: input.json
```json
{
  "data": {
    "values": [
      1,
      5.2,
      20,
      7,
      9.4
    ]
  },
  "params": {
    "round_off": true
  }
}
```
:::

Extend your `application.py` with the following:

```python
input_data = open("Absolute path to your input file, e.g., 'input.json'", 'rb')

# Prepare the HTTP payload to trigger an execution
service_endpoint = version.gateway_endpoint
default_headers = {
    "Authorization": f"Bearer {access_token}",
    'Content-Type': 'application/json'
}
```

Now execute the service with the following code:

```python
execution = requests.post(url=service_endpoint, data=input_data, headers=default_headers)
```

Due to the fact the execution is asynchronous, you have to wait until the has been successfully executed.
Extend your `application.py` with the following code:

```python
current_status = wait_for_execution_to_be_finished()
print(f"The service execution is: {current_status}")
```

::: details Method wait_for_execution_to_be_finished()
```python
# Waits up to 5 minutes for a PlanQK Service execution to finish.
def wait_for_execution_to_be_finished():
    status_timer = 0
    execution_status = requests.get(url=status_url, headers=default_headers).json()['status']
    while execution_status == 'PENDING':
        time.sleep(15)
        status_timer += 15
        if status_timer > 300:
            print("Timeout exceeded waiting for PlanQK Service execution to be finished")
            break
        execution_status = requests.get(url=status_url, headers=default_headers).json()['status']
        if execution_status == 'SUCCEEDED' or execution_status == 'FAILED':
            return execution_status
            break
```
:::

If the service execution was successful, you may retrieve the result of it:

```python
if current_status == 'SUCCEEDED':
    result = requests.get(url=status_url + '/result', headers=default_headers).json()
    print(f"The service execution result: {result}")
```

Congratulation, you successfully executed your subscribed PlanQK Service.

[Code Example](https://github.com/PlanQK/planqk-platform-samples/blob/master/planqk-api/python/planqk-samples/src/service_execution_sample.py)
