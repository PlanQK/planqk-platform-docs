# Service Configuration

## Runtime Configuration

After you have created a new service, you can change the runtime configuration on the service detail page.
From the toolbar on the top, select "Edit Service" and then "Runtime Configuration".

You can change the runtime, to be either "Python Template" or "Docker".
Further, you can add additional environment variables to store API keys and other configuration values and secrets.
You can access them in your code like regular environment variables, for example with os.getenv() in Python.

Additionally, you can choose to add your configured provider access tokens to the runtime as environment variables.
If you enable this option, the following environment variables containing your provider access tokens are accessible at runtime: `QISKIT_IBM_TOKEN`.

<LoomVideo url="https://www.loom.com/embed/0d415bfaa4144ec08d2b8736ba72194d?sid=b3026ef5-bfb5-4e91-b3fd-b189c43f9a3f"/>

## Resource Configuration

After you have created a new service, you can change the resource configuration on the service detail page.

<LoomVideo url="https://www.loom.com/embed/3a7022f146fb486da78382909eedf94e?sid=ee1e9d84-eced-4d01-bf8b-69f4ac029034"/>
