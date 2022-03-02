from urllib.request import urlretrieve
# Configuration file for the Sphinx documentation builder.

# -- Project information

project = 'PlanQK'
copyright = '2022 PlanQK'
author = 'StoneOne'

# -- General configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
    'm2r2'
]

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']


# -- Options for HTML output
html_theme = 'bizstyle'

# -- Options for EPUB output
epub_show_urls = 'footnote'


html_static_path = ['../_static']

html_style = 'css/planqk-styles.css'

html_logo = '../_static/css/planqk_beta.png'
html_theme_options = {
    'logo_only': True,
    'display_version': False,
}

def setup(app):
    app.add_css_file('css/planqk-styles.css')
    
import os

# Get the current working directory
cwd = os.getcwd()


# Print the current working directory
print("Current working directory: {0}".format(cwd))
arr = os.listdir('.')
print(arr)

# Retrieve markup content from external sources - if the content changes in external sources, rebuild the PlanQK docs
urlretrieve (
    "https://raw.githubusercontent.com/PlanQK/expert-platform-docker/planqk/README.md",
    "nisq_analyzer.md"
)

