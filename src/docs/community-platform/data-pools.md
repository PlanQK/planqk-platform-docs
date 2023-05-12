# Data Pools
The PlanQK platform provides functionality to describe and store different types of data objects through "Data Pools".
The data pools can be shared with other platform users and [jobs](service-platform.md#jobs).
This means the input for, and the result of job executions can be read from and stored in such data pools, respectively.
Take, for instance, long-running jobs: After completion, the results can be automatically stored inside a data pool and be shared with selected people/organizations who can further process them e.g. in their own jobs.
You do not have to worry about the storage mechanisms of different cloud providers and the hurdles which come up when trying to exchange data between organizations.

### Details
In this section you can upload and download the actual data objects represented by the data pool and retrieve or specify all relevant meta information about them.

### Discussions & Members
Similar to Algorithms the content of data pools can be discussed and shared with other users in the corresponding tab.
Whether the information about a data pool is misleading or the attached file has some error in it: These points should be addressed in the Discussion Tab.
To provide access to the data pool itself, you need to invite users in the members tab and assign a corresponding role to them (for reference, look at the corresponding section for algorithms [here](#permissions)).