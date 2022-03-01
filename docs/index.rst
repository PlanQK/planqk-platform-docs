Help
=====

You can give us feedback via the `PlanQK internal issue board <https://github.com/PlanQK/platform/issues>`_. You have to be logged in at GitHub to get access!


Service Platform
================

Generate / Download Template
----------------------------
You can choose to generate a template by following the steps:

#. Execute :code:`npm install -g yo https://github.com/PlanQK/yo-generator-planqk-service.git`

#. Execute :code:`yo planqk-service {name}`

Or you can download the template here (`zip <https://storage.googleapis.com/yeoman-templates/latest/template.zip>`_ | `tar.gz <https://storage.googleapis.com/yeoman-templates/latest/template.tar.gz>`_).

Community Portal
================



Algorithms
----------
You can create an algorithm by performing the following steps:

#. Select ``Algorithms`` in the menu

#. Click the button with the label ``Add Algorithm``

#. Enter the name of the algorithm and select the algorithm type

#. Click the create button

Algorithm Relations
-------------------
You can create an algorithm relation by performing the following steps:

#. Select ``Algorithms`` in the navigation
#. Navigate to the algorithm where the relation should be created

#. On the box called ``Relations to other Algorithms`` click the button with the ``+``. Afterwards a modal called ``Add relation`` will pop up.

#. Enter the name of the target algorithm for the relation beside the label ``Target Algorithm``. After typing three characters you will be presented with a list of available options to choose from. The source algorithm is always the one in which you are creating the relation, hence you have to choose another one as target, otherwise an error will be shown.

#. Choose the type of relation from the dropdown beside the label ``Link Type``.

#. Now you have the option to add a description for the relation in the text area under the label ``Description``.

#. Click the ``Create`` button.

Implementation
--------------
You can create an implementation by performing the following the steps:

#. Go to the ``Detail View`` of an existing algorithm (your implementation will be linked to this algorithm) and choose the ``Implementations`` tab.

#. Click the ``Add Implementation`` button.

#. Enter the name of the implementation.

#. Click the ``Create`` button.

Data Pools
----------
You can create a data pool by performing the following steps:

#. Select ``Data Pools`` in the navigation on the left.

#. Click the ``Add Data Pool`` button.

#. Enter the name of the data pool.

#. Click the ``Create`` button.

Markdown
--------
The markdown fields support the following functions:

#. Render LaTeX code (spaces must be considered): either ``$LaTeX$`` for inline formulas or ``$$ LateX $$`` for formula blocks
#. Quantikz code for rendering quantum circuits: ``\begin{quantikz} code \end{quantikz}``
#. Uploaded sketches (images) can be referenced an loaded by their ID: ``![](sketchId)`` The sketchId can be copied from the list of uploaded sketches.

NISQ Analyzer
=============
The NISQ Analyzer is a research prototype based on the work by Salm et. al. It automatically analyzes implementations of quantum algorithms. The results indicate if a quantum algorithm can be executed on a Quantum Processing Unit (QPU) or simulator. If you want to find out more details, click here.


