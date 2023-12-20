# Set Environment Variables

If your demo requires environment variables (for instance, [Application credentials](../applications.md)), you can set them in the **Settings** of your Demo.
You can access them in your code like regular environment variables, for example with ```os.getenv()``` in Python.

As an example, below is an excerpt of our [Gradio starter template](https://github.com/Anaqor/demo-starter-gradio):

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
To access the service, a [subscription to the service](https://docs.platform.planqk.de/using-a-service.html#subscribe-to-a-planqk-service-published-on-the-planqk-marketplace) is needed.
We can add the consumer key and secret of the subscribed Application as environment variables to the Demo.

<ImageShadow :src="$withBase('/images/demos/environment-variables.png')"></ImageShadow>
