# Community Platform

Here, the quantum community comes together for exchanging their knowledge and experience. Whether you are interested in the key concepts of certain algorithms, want to see implementations (for various SDKs) or learn about real world use cases for quantum computers, this is your place to be.  
This part of the PlanQK Platform is driven by various experts from industry and academia to ensure a high quality standard and up-to-date information for this dynamically developing field.

We invite all users to actively create content and [to publish](#publishing-content) it to make it available to the PlanQK community.
Alternatively, you can [share](#sharing-content-with-certain-users) your content only with a specific user group.

You can also participate by discussing existing content. 
Simply click on "Discussions" tab of the content at hand, which shows past and ongoing threads regarding aspects of e.g. the algorithm.
After opening a new discussion in the top right corner, the authors will be notified and hopefully are able to help you. :)

To ensure theoretical and technical soundness of the content, the experts evaluate each other's contents in the form of [reviews](#reviews).
You can identify reviewed content in the platform by a golden ribbon attached to it.

## Algorithms

Here you find a variety of algorithms for different problems. Either scroll around or, if you are interested in a special (qu-)bit of information, use the search bar at the top right corner to filter the titles.  

### Create and/or edit an algorithm

You can create an algorithm by clicking the "Add Algorithm" button right next to the search bar. After choosing the name and its type, you get to the details view, where you can (and should!) add any information you have.  
If you want to edit an *existing* algorithm, you need the permission to do so from someone with the correct role (see [Permissions](#permissions)).

### Permissions

One of the tabs at the top of an algorithm is "Members". There you can see people and their roles for the current algorithm. Possible roles are "Maintainer", "Owner" and "Viewer". As their names suggest, "Maintainer" and "Owner" of an algorithm can edit it, whereas "Viewer".. well.. can see it, but not edit it. The difference between "Maintainer" and "Owner", however, is that only an "Owner" of an algorithm can actually delete it.

### Markdown & LaTeX

Since a lot of people love math and many algorithms require formulae for a better understanding, we support Markdown combined with Latex for most of the textboxes on our platform. Just use `$ latex $` for inline or `$$ latex $$` for centered equations. You can see other supported Markdown options whenever you are editing a textbox by clicking on the ?-symbol in the top right corner of the box. We use KaTeX to display LaTeX. Click [here](https://katex.org/docs/supported.html) to see the supported KaTeX features.

### Scale Image

If an image is referenced in Markdown, you have the option to scale it using the following syntax:
 ```![](){width=<value><unit>, height=<value><unit>}```.

Any standard CSS unit for width is supported, but we recommend using one of the following: ```px```, ```em```, ```rem``` or ```%```.

### QuanTikz

Sometimes math is just not enough to express certain parts of quantum algorithms which is why we also support [quantikz](https://ctan.org/pkg/quantikz) within latex math mode. So in order to draw circuits just type  

```
$$
\begin{quantikz}
    *cool circuit*
\end{quantikz}
$$
```

### Sketches

When formulae and circuits fail to convey information there is another: Images! You can include any standard picture format (such as .png or .jpg) as a sketch by scrolling down to the bottom of the page within the details view of the algorithm and click on the green + sign at the top right corner in the "Sketches" section. After uploading it, you should see your picture within this section, as well as an ID below it. You can use this ID to include it within your description of the algorithm by the common Markdown syntax (the title does not affect the display of the image at all)

```
![title](*image-id*)
```

## Implementations

For any algorithm you can also add an implementation for other users to see and download, which in principle can be any format (such as a plain .py python file or a .ipynb jupyter notebook). However, these implementations can also be used and executed as [jobs](service_platform.html#jobs).  

In future updates of the platform, it will also be possible to provide implementations in different ways, such as a remote git repository.

### Provide an implementation for job execution

If you want to allow other users to not only download but also use your implementation and execute it as a job: Awesome! That's the spirit! You now just have to take two things into consideration:

1. Your implementation **must** be a zipped python module according to the [User Code Template](service_platform.html#embedding-the-python-code-into-the-user-code-template)
2. Change the format of your `user_code.zip` into `user_code.planqk`. This shows the platform, that the provided zip file is in the right format for the platform to deploy it as a service, indicated by the "Create Service" button next to the uploaded implementation.  

**Note:** Similar to algorithms, you have to give users permission to see and use/download your implementation. For that, click on the "Members" tab at the top of a given implementation.  
Now, everyone with a "Viewer" role or above can create a service out of the implementation and run ist as a job.


## Use Cases
When you have worked on an industrial use case which exploits quantum algorithms for solving and improving one (or even multiple) subproblem(s) you can elaborate on it in this section.
When creating a new use case and after entering its name, you should see 4 tabs at the top, whose contents are described below:

### Details

Most of the important information of your use case must be noted here (otherwise you will not be able to publish your use case).
The summary should contain a *very* short description of the use case, which will be displayed on the preview tile within the quantum service store.
It is limited so 200 characters (less than a tweet!), so keep it simple!
Anything that goes beyond that can be (and should be!) exhaustively described in the eponymous field "Description".  
Similar the description of an algorithm, you can put all information regarding the use case (e.g. how to get from the initial problem statement to the corresponding mathematical subproblem, which can be mapped onto quantum hardware) in here.  
For illustration purposes you can also add some pictures within "Sketches" and reference them within the description field. Also, you should add some application areas and industries, which might be relevant for the use case at hand

### Relations

This section is probably the heart of any use case. Any algorithm or implementation, that is associated to the use case should be noted here. Linking this information helps interested readers to get a better understanding of use case at hand and the methods used by you and your collaborators. If available, possible data pools (which can be used for associated services), as well as Quantum apps can be linked here as well.

### Contacts

If somebody is interested in the use case and read through your description, he or she might be interested in discussing certain aspects of it with you or someone who worked with you on the use case. In order for them to do so, you should add experts of the community (including yourself!) who worked on the use case and could answer questions. 

### Members 

Similar to members from an algorithm, any person that should be able to see/edit/maintain the use case and its contents should be added here.

## Data Pools
The PlanQK platform provides functionality to describe and store different types of data objects through "Data Pools". 
The data pools can be shared with other platform users and [jobs](service_platform.html#jobs).
This means the input for, and the result of job executions can be read from and stored in such data pools, respectively.
Take, for instance, long-running jobs: After completion, the results can be automatically stored inside a data pool and be shared with selected people/organizations who can further process them e.g. in their own jobs.
You do not have to worry about the storage mechanisms of different cloud providers and the hurdles which come up when trying to exchange data between organizations.

### Details
In this section you can upload and download the actual data objects represented by the data pool and retrieve or specify all relevant meta information about them.

### Discussions & Members
Similar to Algorithms the content of data pools can be discussed and shared with other users in the corresponding tab.
Whether the information about a data pool is misleading or the attached file has some error in it: These points should be addressed in the Discussion Tab.
To provide access to the data pool itself, you need to invite users in the members tab and assign a corresponding role to them (for reference, look at the corresponding section for algorithms [here](#permissions)).

## Quantum apps
Once you have implemented an algorithm, e.g., for a certain use case, you can share it with the community as Quantum app (formerly known as qAI app).
You may wonder what is the difference between ["implementations"](#implementations) and Quantum apps?
While implementations are the source code of an implemented algorithm that can be run as a job on the platform, Quantum apps comprise the implementation of the algorithm and all other required software components such as databases, graphical user interfaces, communication middleware, and more.
Quantum apps are provided as "Quantum App Packages" (QAAs) that contain the application component artifacts as well as a [TOSCA](../third_party/tosca.html) deployment model.
This self-contained archive can be processed by any standard-compliant TOSCA engine to deploy the entire application locally or in the cloud.
This allows Quantum apps to be deployed independently of the PlanQK platform.

### Create a Quantum Application Archive (QAA)
The third-party tool OpenTOSCA can be used to create and process QAAs.
More details about how to use OpenTOSCA can be found [here](third_party/tosca.html).

## Pattern Atlas
A common concept for documenting proven solutions and best practices for recurring problems are "patterns".
Patterns provide a textual description with a defined structure that supports the design process of complex systems. Patterns that capture knowledge from a certain domain are organized in a "pattern language".
This also makes it possible to document relationships between patterns, e.g., when certain patterns are frequently used together.

The Pattern Atlas is a pattern repository where different pattern languages can be stored and accessed.
Explore the pattern atlas and find out which proven solutions and best practices have already been collected!

**Note:** For detailed information about the pattern atlas features and their use, please visit the [Pattern Atlas website]("https://pattern-atlas-readthedocs.readthedocs.io"). 
Depending on your rights on the platform, not all described features may be available.

## Publishing Content
To transfer content to the community, you need to publish it.
You can either publish it as read-only or that it can be modified by other community experts.

>**Note:**
>Once content was published, it can neither be unpublished nor be deleted anymore.

Algorithms are always published under [Create Commons license](https://creativecommons.org/licenses/by/4.0/).
For implementations and data pools you can choose between different licenses that need to be assigned in the "Details" tab
before you publish the content.

To publish content perform the following steps:

1. Open the content artefact.
2. Go to the "Community" tab and there click the "Publish to Community" button.
3. Choose if the content is published with viewer or edit-rights.
4. for algorithms and, for algorithms only, accept the license.



## Sharing Content With Certain Users
If you want to stay in control over your content but still want to make accessible to certain PlanQK users, you can share it with them. 

You can assign the following access rights to a user: 

- **Viewer**: Can read the content but not modify it.
- **Maintainer**: Can view and modify the content.             
- **Owner**: Can view, modify and delete the content, i.e. she has the same right as you. If you delete your account, and you are the only owner the content is deleted. If there are other owners to content is not deleted. 

To share the content and to assign the access rights:

1. Open the content artefact.
2. Go to the "Members" tab and enter the name of the user you want to share it with  (at least the first three letters of the username have to be provided).
3. In the dropdown choose if the access rights of the user and click the "Assign" button.


## Reviews
Currently, the community content artefacts algorithms, implementations, data pools and Quantum apps can be reviewed by one or more experts.
An artefact being marked as *Reviewed* implies that it meets high quality standards.
It can be compared to a thumbs-up in social networks.
Hence, if the reviewer does not accept a reviewed artefact, it is neither deleted from the platform nor marked as technically incorrect.

If at least one expert accepted the content, it is considered as reviewed and marked accordingly with a golden ribbon.
The reviewers assigned to an artefacts, are listed in its "Community" tab.
The review comments can be found and discussed in the "Discussions" tab (tagged with "Review").

>**Note:**
>Reviews can be only created for published artefacts.

### Creating a Review
As reviewer your platform account has a special role assigned that enables you to create a review for a published artefacts.
Reviewers are appointed by the scientific counsel of PlanQK.

To create a review perform the following steps:

1. Login to the platform and open the community artefact, e.g., an algorithm, that you want to review.
2. Click in the "Community" tab and there on the button "Start Review". The artefact is now marked as *Under Review*.
3. Verify the correctness of the artefact's content and leave your comments in the "Discussions" tab. You can tag a discussion topic as review related by enabling the toggle "This discussion relates to a review".
4. If you accept the content, click on "Confirm Review" and the artefact is marked as *Reviewed*. Click on "Withdraw Review" if the content needs improvement. In this case the artefact is marked as *Not Reviewed* since we don't reject content.

You can also withdraw your confirmed review any time later.
However, if you are withdrawing your review from an artefact that has a confirmed review from another reviewer,
the artefact is still considered as being reviewed.

>We are happy to welcome new reviewers. If you are interested, please feel free to [contact us](mailto:support@planqk.de).

