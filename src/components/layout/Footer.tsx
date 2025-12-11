'use client';

import FooterLinks from './FooterLinks';
import Newsletter from './Newsletter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12">
          <Newsletter />
        </div>

        {/* Links Section */}
        <div className="mb-8">
          <FooterLinks />
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gray-200" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600">
          <p>
            © {currentYear} Lelang Online. All rights reserved. | Built with ❤️ by the
            Lelang Team
          </p>
        </div>
      </div>
    </footer>
  );
}
