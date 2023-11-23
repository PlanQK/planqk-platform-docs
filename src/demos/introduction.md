# Introduction

PlanQK Demos make it easy for you to create and host interactive web interfaces for your quantum and machine learning use cases.
Watch the video below for a quick introduction to Demos.

<LoomVideo url="https://www.loom.com/embed/75a481472d9847f39ff352c563c1a0ea?sid=cff9fe67-f5ae-4aa4-a992-2a4086c3765b"/>

## Deploy a Demo

A simple way to create a Demo is to use the [Gradio](https://www.gradio.app/) python library.
Gradio lets you build interactive web interfaces in a matter of minutes.
Check out our [Gradio starter template](https://github.com/Anaqor/gradio-example).
Alternatively, you can deploy any other web app of your choice using Docker.

The following steps show you how to deploy a Demo for your Use Case:

Prerequisites:

- A [Use Case](https://platform.planqk.de/use-cases) you want to deploy a Demo for. Alternatively, create a new Use Case.
- A fork of our [Gradio starter template](https://github.com/Anaqor/gradio-example).

**To deploy a Demo** for your Use Case click on the Demo tab of your Use Case and click on the **Create Demo** button.
You will be asked to connect your GitHub account (if you haven't done already) and to select a repository.
Select the fork of the Gradio starter template you created earlier by clicking on **Connect**.
Thats it, you deployed your first Demo!

But there is one more thing. In order to make your Demo work we need to set some environment variables.
Read the next section to learn how to do that.

## Setting Environment Variables
If your demo requires environment variables (for instance, secret keys or tokens), you can set them in the **Settings** of your Demo.
You can access them in your code like regular environment variables, for example with ```os.getenv()``` in Python.

As an example, below is an excerpt of our [Gradio starter template](https://github.com/Anaqor/gradio-example)

```python
import os
from planqk.service.client import PlanqkServiceClient

consumer_key = os.getenv('CONSUMER_KEY', None)
consumer_secret = os.getenv('CONSUMER_SECRET', None)
service_endpoint = "https://gateway.platform.planqk.de/anaqor/quantum-random-number-generator/1.0.0"

def run(n_numbers: int):
    client = PlanqkServiceClient(service_endpoint, consumer_key, consumer_secret)
    job = client.start_execution(data=data, params=params)
    result = client.get_result(job.id)

    random_number_list = result["result"]["random_number_list"]
    return ", ".join([str(x) for x in random_number_list])
```

The code calls the [Quantum Random Number Generator Service](https://platform.planqk.de/marketplace/apis/88b46e18-3d5f-4674-ba04-0d3416c0decd) using the [planqk-service-sdk](https://pypi.org/project/planqk-service-sdk/1.0.1/).
The service is available as a free service on the PlanQK Marketplace.
To access the service, a [subscription to the service](https://docs.platform.planqk.de/using-a-service.html#subscribe-to-a-planqk-service-published-on-the-planqk-marketplace) is needed and the consumer key and secret of the subscribed Application needs to be added as environment variables to the Demo.

![Environment Variables](/images/demos/environment-variables.png)

