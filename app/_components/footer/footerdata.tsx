import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react';

export const footerLinks = [
  {
    title: 'Medeasy',
    span: 'md:col-span-3',
    links: [],
    socials: [
      {
        icon: FacebookIcon,
        href: '#',
      },
      {
        icon: InstagramIcon,
        href: '#',
      },
      {
        icon: LinkedinIcon,
        href: '#',
      },
      {
        icon: TwitterIcon,
        href: '#',
      },
    ],
  },
  {
    title: 'Medeasy',
    span: 'md:col-span-3',
    links: [
      {
        label: 'How it works',
        href: '#',
      },
      {
        label: 'Key services',
        href: '#',
      },
      {
        label: 'Testimonials',
        href: '#',
      },
    ],
    socials: [],
  },
  {
    title: 'Partner with medeasy',
    span: 'md:col-span-3',
    links: [
      {
        label: 'Register as help provider',
        href: '#',
      },
      {
        label: 'Register as account owner',
        href: '#',
      },
    ],
    socials: [],
  },
  {
    title: 'Customer support',
    span: 'md:col-span-3',
    links: [
      {
        label: 'FAQS',
        href: '#',
      },
      {
        label: 'Support Articles',
        href: '#',
      },
      {
        label: 'Returns & Refunds',
        href: '#',
      },
      {
        label: 'Shipping information',
        href: '#',
      },
    ],
    socials: [],
  },
];

export const footerFoterLink = [
  [
    {
      title: `© ${new Date().getFullYear()} Medesay`,
      links: '/',
    },
  ],
  [
    {
      title: 'Terms and Conditions',
      links: '#',
    },
    {
      title: 'Privacy Policy',
      links: '#',
    },
  ],
];
