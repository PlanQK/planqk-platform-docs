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
    ['link', { rel: "stylesheet", href: "/material-symbols/outlined.css" }],
    ['link', { rel: "stylesheet", href: "/material-symbols/customization.css" }],
    ['link', { rel: "stylesheet", href: "/fontawesome/css/all.css" }],

    // Plausible
    ['script', {
      defer: "defer",
      "data-domain": "docs.platform.planqk.de",
      src: "https://plausible.anaqor.io/js/script.outbound-links.file-downloads.tagged-events.js"
    }],
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
        link: '/',
      },
      {
        text: 'Tutorials & Cookbooks',
        link: '/tutorials/'
      },
      {
        text: 'PlanQK Platform',
        link: 'https://platform.planqk.de/'
      },
      {
        text: 'Pricing',
        link: 'https://platform.planqk.de/pricing'
      },
      {
        text: 'Slack',
        link: 'https://join.slack.com/t/planqk-platform/shared_invite/zt-1b4899wqr-xqOYLSCr8KqYkREi251NxQ'
      },
    ],

    sidebar: {
      '/tutorials/': [
        {
          title: 'Tutorials',
          collapsable: false,
          children: [
            'tutorial-dwave',
            'tutorial-qiskit',
            'tutorial-meter-external-service',
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
      '/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            'quickstart',
            'using-sdk',
            'quantum-hardware',
            'sdk-reference',
            'cli-reference',
            'planqk-json-reference',
            'manage-organizations',
            'manage-access-tokens'
          ]
        },
        {
          title: 'Managed Services',
          collapsable: false,
          children: [
            'managed-services/introduction',
            'managed-services/managed-services-runtime-interface',
            'managed-services/service-configuration',
            'managed-services/managed-services-api-spec',
            'managed-services/managed-services-jobs',
            'managed-services/managed-services-custom-container',
          ]
        },
        {
          title: 'Using a Service',
          collapsable: false,
          children: [
            'applications',
            'using-a-service',
          ]
        },
        {
          title: 'On-premise Services',
          collapsable: true,
          children: [
            'on-premise-services/introduction',
            'on-premise-services/offer-on-marketplace',
            'on-premise-services/report-usage',
          ]
        },
        {
          title: 'Demos',
          collapsable: true,
          children: [
            'demos/introduction',
            'demos/deploy-a-demo',
            'demos/environment-variables',
            'demos/starter-templates',
          ]
        },
        {
          title: 'Community Platform',
          collapsable: true,
          children: [
            'community-platform/overview',
            'community-platform/algorithms',
            'community-platform/implementations',
            'community-platform/data-pools',
            'community-platform/use-cases',
            'community-platform/quantum-apps',
            'community-platform/pattern-atlas',
            'community-platform/markdown-latex-editor',
            'community-platform/manage-permissions',
            'community-platform/publish-content',
            'community-platform/reviews',
          ]
        },
        {
          title: 'Third Party',
          collapsable: true,
          children: [
            'nisq-analyzer',
            'tosca',
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
    '@adamdehaven/vuepress-plugin-custom-tooltip',
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
