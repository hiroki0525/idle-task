// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const repositoryUrl = 'https://github.com/hiroki0525/idle-task';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'idle-task',
  tagline: 'Dinosaurs are cool',
  // favicon: 'img/favicon.ico',
  url: 'https://hiroki0525.github.io',
  baseUrl: '/idle-task/',
  organizationName: 'hiroki0525',
  projectName: 'idle-task',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: repositoryUrl,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/logo.png',
      navbar: {
        title: 'idle-task',
        // logo: {
        //   alt: 'idle-task Logo',
        //   src: 'img/logo.png',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: repositoryUrl,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'API',
                to: '/category/api',
              },
              {
                label: 'Recipes',
                to: '/recipes',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: repositoryUrl,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} idle-task. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
