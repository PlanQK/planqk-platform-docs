# Knowledge Platform
Here, the quantum community comes together and are able to exchange their knowledge and experience. Whether you are interested in the key concepts of certain algorithms or want to see implementations (for various SDKs), this is your place to be.  
This part of the PlanQK Platform is driven by various experts from industry and academia to ensure a high quality standard and up-to-date information for this dynamically developing field.

## Algorithms
Here you find a variety of algorithms for different problems. Either scroll around or, if you are interested in a special (qu-) bit of information, use the search bar at the top right corner to filter the titles.  

### Create and/or edit an algorithm
You can create an algorithm by clicking the "Add Algorithm" button right next to the search bar. After choosing the name and its type, you get to the details view, where you can (and should!) add any information you have.  
If you want to edit an *existing* algorithm, you need the permission to do so from someone with the correct role (see [Permissions](#permissions)).
### Permissions
One of the tabs at the top of an algorithm is "Members". There you can see people and their roles for the current algorithm. Possible roles are "Maintainer", "Owner" and "Viewer". As their names suggest, "Maintainer" and "Owner" of an algorithm can edit it, whereas "Viewer".. well.. can see it, but not edit it. The difference between "Maintainer" and "Owner", however, is that only an "Owner" of an algorithm can actually delete it.

### Markdown & LaTeX
Since a lot of people love math and many algorithms require formulae for a better understanding, we support Markdown combined with Latex for most of the textboxes on our platform. Just use :code:$ latex $ for inline or :code:$$ latex $$ for centered equations. You can see other supported Markdown options whenever you are editing a textbox by clicking on the ?-symbol in the top right corner of the box.

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
For any algorithm you can also add an implementation for other users to see and download, which in principle can be any format (such as a plain .py python file or a .ipynb jupyter notebook). However, these implementations can also be used and executed as [jobs](#jobs-prototype-feature).  

In future updates of the platform, it will also be possible to provide implementations in different ways, such as a remote git repository.

### Provide an implementation for job execution
If you want to allow other users to not only download but also use your implementation and execute it as a job: Awesome! That's the spirit! You now just have to take two things into consideration:  
1. Your implementation **must** be a zipped python module according to the [User Code Template](###User-Code-Template)
2. Change the format of your `user_code.zip` into `user_code.planqk`. This shows the platform, that the provided zip file is in the right format for the platform to deploy it as a service, indicated by the "Create Service" button next to the uploaded implementation.  

**Note:** Similar to algorithms, you have to give users permission to see and use/download your implementation. For that, click on the "Members" tab at the top of a given implementation.  
Now, everyone with a "Viewer" role or above can create a service out of the implementation and run ist as a job.

## Datapools (Soon-to-come)

