'use client';

import Link from 'next/link';

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Reporting', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
];

const socialLinks = [
  { label: 'Twitter', href: '#', icon: '𝕏' },
  { label: 'Facebook', href: '#', icon: 'f' },
  { label: 'Instagram', href: '#', icon: '📷' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
];

export default function FooterLinks() {
  return (
    <>
      {/* Links Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 font-semibold text-gray-900">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Section */}
        <div>
          <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                title={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
