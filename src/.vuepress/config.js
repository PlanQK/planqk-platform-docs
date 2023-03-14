const { description } = require('../../package')

module.exports = {
  base: '/',

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'PlanQK Docs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: "shortcut icon", href: "/favicon.ico" }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/planqk.png',

    lastUpdated: 'Last Updated',

    repo: '',
    docsRepo: 'PlanQK/planqk-platform-docs',
    docsDir: 'src',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Help us improve this page!',

    smoothScroll: true,

    nav: [
      {
        text: 'Documentation',
        link: '/docs/',
      },
      {
        text: 'Tutorials & Cookbooks',
        link: '/tutorials/'
      },
      {
        text: 'PlanQK Platform',
        link: 'https://platform.planqk.de/'
      }
    ],

    sidebar: {
      '/docs/': [
        {
          title: 'Documentation',
          collapsable: false,
          children: [
            '',
            'community-platform',
            'marketplace',
            'additional-information'
          ]
        },
        {
          title: 'Service Platform',
          collapsable: false,
          children: [
            'service-platform/managed-services',
            'service-platform/managed-services-jobs',
            'service-platform/external-services',
            'service-platform/applications',
            'service-platform/using-a-service',
            'service-platform/pricing',
          ]
        },
        {
          title: 'Third Party',
          collapsable: false,
          children: [
            'nisq-analyzer',
            'tosca',
          ]
        }
      ],
      '/tutorials/': [
        {
          title: 'Tutorials',
          collapsable: false,
          children: [
            'tutorial-dwave',
            'tutorial-qiskit',
          ]
        },
        {
          title: 'Cookbooks',
          collapsable: false,
          children: [
            'cookbook-java',
            'cookbook-python'
          ]
        }
      ],
    }
  },

  markdown: {
    lineNumbers: true
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['vuepress-plugin-code-copy', {
      color: '#fff',
    }],
    ['@vuepress/last-updated', {
      dateOptions: {
        hour12: false
      }
    }]
  ]
}
