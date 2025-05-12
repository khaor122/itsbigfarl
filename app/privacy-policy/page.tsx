// app/privacy-policy/page.tsx

'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function PrivacyPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "'Big Farl' Membership",
    description: "Join 'Big Farl' exclusive membership with a retro video game experience",
    image: "/images/character-1.png",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "9.99",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: " 'Big Farl'",
    },
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-green-400 font-mono">
        <div className="main-content w-full">
          <Header />

          
            <div className="max-w-3xl mx-auto p-6 text-gray-800">
              <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-sm text-gray-500 mb-6">
                <strong>Effective Date:</strong> May 10, 2025<br />
                <strong>Last Updated:</strong> May 10, 2025
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">Introduction</h2>
              <p>
                At <strong>Big Farl</strong> ("we," "us," or "our"), your privacy is important to us. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website, <a href="https://itsbigfarl.studio" className="text-blue-600 underline">itsbigfarl.studio</a>, or interact with our
                content and services.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
              <h3 className="font-medium">a. Personal Information</h3>
              <ul className="list-disc list-inside mb-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing or shipping address</li>
                <li>Payment details (when purchases or bookings are made)</li>
              </ul>
              <h3 className="font-medium">b. Non-Personal Information</h3>
              <ul className="list-disc list-inside mb-2">
                <li>Browser type and device information</li>
                <li>IP address</li>
                <li>Date and time of visit</li>
                <li>Pages viewed and referring URLs</li>
              </ul>
              <h3 className="font-medium">c. Cookies and Tracking Technologies</h3>
              <p className="mb-4">
                We use cookies, web beacons, and similar technologies to enhance user experience, analyze site usage,
                and support marketing efforts. You can adjust your browser settings to disable cookies if you prefer.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside mb-4">
                <li>Deliver content, services, or merchandise</li>
                <li>Process payments and manage transactions</li>
                <li>Respond to inquiries and support requests</li>
                <li>Improve website functionality and user experience</li>
                <li>Send updates, promotions, or marketing emails (you can unsubscribe anytime)</li>
                <li>Analyze trends and user behavior</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">3. Information Sharing</h2>
              <p>
                We do not sell or lease your personal data. We may share your information only with:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Service providers who help operate our website or manage our business (e.g., payment processors)</li>
                <li>Legal authorities if required by law or to protect our rights</li>
                <li>Marketing tools and analytics partners (on an anonymized basis when possible)</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard measures to secure your data. While we strive to protect your personal
                information, no method of electronic transmission or storage is completely secure.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights and Choices</h2>
              <p>You may:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Access, update, or request deletion of your personal data</li>
                <li>Unsubscribe from emails via the provided link</li>
                <li>Block cookies through your browser settings</li>
              </ul>
              <p className="mb-4">
                To request changes to your personal data, please email us at
                <a href="mailto:admin@itsbigfarl.studio" className="text-blue-600 underline">admin@itsbigfarl.studio</a>.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">6. Third-Party Links</h2>
              <p className="mb-4">
                Our site may include links to external websites. We are not responsible for the privacy practices or content of
                third-party websites. Please review their policies separately.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">7. Children's Privacy</h2>
              <p className="mb-4">
                Big Farl does not knowingly collect data from individuals under 13 years of age. If we become aware that
                such data has been collected, we will delete it promptly.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated
                effective date. Please review it regularly to stay informed.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact:
              </p>

            </div>

         
          <Footer />
        </div>
      </main>
    </>
  );
}
