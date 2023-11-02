# Implementations

For any algorithm you can also add an implementation for other users to see and download, which in principle can be any format (such as a plain .py python file or a .ipynb jupyter notebook).
However, these implementations can also be used and executed as [jobs](../managed-services/managed-services-jobs.md).

In future updates of the platform, it will also be possible to provide implementations in different ways, such as a remote git repository.

### Provide an implementation for job execution

If you want to allow other users to not only download but also use your implementation and execute it as a job: Awesome!
That's the spirit! You now just have to take two things into consideration:

1. Your implementation **must** be a zipped python module according to our [User Code Templates](https://github.com/PlanQK/planqk-platform-samples/tree/master/coding-templates/python)
2. Change the format of your `user_code.zip` into `user_code.planqk`. This shows the platform, that the provided zip file is in the right format for the platform to deploy it as a service, indicated by the "Create Service" button next to the uploaded implementation.

::: tip Note
Similar to algorithms, you have to give users permission to see and use/download your implementation.
For that, click on the "Members" tab at the top of a given implementation.  
Now, everyone with a "Viewer" role or above can create a service out of the implementation and run ist as a job.
:::