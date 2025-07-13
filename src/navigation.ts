import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Product',
      links: [
        {
          text: 'The Vault',
          href: getPermalink('/vault'),
        },
        {
          text: 'AI Agents',
          href: getPermalink('/agents'),
        },
        {
          text: 'Foundry',
          href: getPermalink('/foundry'),
        },
        {
          text: 'Alignment',
          href: getPermalink('/alignment'),
        },
      ],
    },
    {
      text: 'Solutions',
      links: [
        {
          text: 'Use Cases',
          href: getPermalink('/use-cases'),
        },
        {
          text: 'Playbooks',
          href: getPermalink('/playbooks'),
        },
        {
          text: 'Demo',
          href: getPermalink('/demo'),
        },
      ],
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Blog',
          href: getBlogPermalink(),
        },
        {
          text: 'FAQ',
          href: getPermalink('/faq'),
        },
        {
          text: 'Whitepaper',
          href: getPermalink('/whitepaper'),
        },
        {
          text: 'Privacy',
          href: getPermalink('/legal/privacy'),
        },
      ],
    },
  ],
  actions: [{ text: 'Join Waitlist', href: getPermalink('/subscribe'), target: '_self' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'The Vault', href: getPermalink('/vault') },
        { text: 'AI Agents', href: getPermalink('/agents') },
        { text: 'Foundry', href: getPermalink('/foundry') },
        { text: 'Alignment', href: getPermalink('/alignment') },
        { text: 'Demo', href: getPermalink('/demo') },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Use Cases', href: getPermalink('/use-cases') },
        { text: 'Playbooks', href: getPermalink('/playbooks') },
        { text: 'FAQ', href: getPermalink('/faq') },
        { text: 'Whitepaper', href: getPermalink('/whitepaper') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/legal/privacy') },
        { text: 'Terms of Service', href: getPermalink('/legal/terms') },
        { text: 'Data Use Policy', href: getPermalink('/legal/data-use') },
        { text: 'Cookie Policy', href: getPermalink('/legal/cookies') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Careers', href: '#' },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/legal/terms') },
    { text: 'Privacy Policy', href: getPermalink('/legal/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: '#' },
  ],
  footNote: `
    <span class="text-sm text-gray-600 dark:text-gray-400">
      © 2024 SalesTag. All rights reserved. Built for the future of sales.
    </span>
  `,
};
