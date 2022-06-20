from _datetime import datetime

from recommonmark.parser import CommonMarkParser
from recommonmark.transform import AutoStructify

# -- Project information

project = 'PlanQK'
copyright = '{} PlanQK'.format(datetime.now().year)
author = 'StoneOne AG'

# -- General configuration

extensions = [
    'recommonmark',
    'sphinx.ext.autosectionlabel',
    'sphinx_markdown_tables',
]

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']

exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', '_legacy', 'README.md', 'index.html']

source_parsers = {
    '.md': CommonMarkParser,
}

# -- Options for HTML output
html_theme = 'bizstyle'

# -- Options for EPUB output
epub_show_urls = 'footnote'

html_static_path = ['_static']

html_style = '_static/css/planqk-styles.css'

html_logo = '_static/css/planqk-beta.png'
html_theme_options = {
    'logo_only': True,
    'display_version': False,
}

def setup(app):
    app.add_css_file('css/planqk-styles.css')
    app.add_config_value('recommonmark_config', {
        'auto_toc_tree': False,
        'enable_eval_rst': True,
        'enable_math': True,
        'enable_inline_math': False,
    }, True)
    app.add_transform(AutoStructify)
