### Markdown & LaTeX

Since a lot of people love math and many algorithms require formulae for a better understanding, we support Markdown combined with Latex for most of the textboxes on our platform.
Just use `$ latex $` for inline or `$$ latex $$` for centered equations. You can see other supported Markdown options whenever you are editing a textbox by clicking on the ?-symbol in the top right corner of the box.
We use KaTeX to display LaTeX.
Click [here](https://katex.org/docs/supported.html) to see the supported KaTeX features.

### Scale Image

If an image is referenced in Markdown, you have the option to scale it using the following syntax:

``` md
![](){width=<value><unit>, height=<value><unit>}
```

Any standard CSS unit for width is supported, but we recommend using one of the following: ```px```, ```em```, ```rem``` or ```%```.

### QuanTikz

Sometimes math is just not enough to express certain parts of quantum algorithms which is why we also support [quantikz](https://ctan.org/pkg/quantikz) within latex math mode. So in order to draw circuits just type

``` md
$$
\begin{quantikz}
    *cool circuit*
\end{quantikz}
$$
```

### Sketches

When formulae and circuits fail to convey information there is another: Images!
You can include any standard picture format (such as .png or .jpg) as a sketch by scrolling down to the bottom of the page within the details view of the algorithm and click on the green + sign at the top right corner in the "Sketches" section.
After uploading it, you should see your picture within this section, as well as an ID below it.
You can use this ID to include it within your description of the algorithm by the common Markdown syntax (the title does not affect the display of the image at all)

``` 
![title](*image-id*)
```