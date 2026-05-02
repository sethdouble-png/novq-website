import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy - NovQ',
  description: 'Read the privacy policy for NovQ, covering how personal data is collected, used, and protected.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-[#f5f5f7]">
      <Header />
      <div className="section-container pt-28 pb-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#e11d48]">Privacy Policy</p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f5f5f7]">Your privacy matters at NovQ</h1>
            <p className="mt-4 text-base leading-8 text-gray-300">
              This page explains how NovQ collects, uses, and protects the information you share. We keep your data safe, transparent, and only use it to deliver a better experience.
            </p>
          </div>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Information We Collect</h2>
            <p className="text-gray-300 leading-8">
              We collect information you provide when you contact us, join an email list, or request updates. This may include your name, email address, and details of your message. We also collect non-personal analytics that help us understand how visitors use the site.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">How We Use Your Information</h2>
            <p className="text-gray-300 leading-8">
              We use your information to respond to inquiries, send occasional updates, and manage the site. We do not sell personal information to third parties, and we only share data when required by law or with trusted service providers who help run the website.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Cookies and Tracking</h2>
            <p className="text-gray-300 leading-8">
              We may use cookies and similar tracking tools to improve site performance, remember preferences, and analyze visitor behavior. These tools help make the website faster and more relevant, and you can manage cookie settings in your browser.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Data Security</h2>
            <p className="text-gray-300 leading-8">
              We implement reasonable security controls to protect your data from unauthorized access. While we strive to maintain secure systems, no method of transmission over the internet is 100% secure, so please do not submit highly sensitive information unless necessary.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Your Choices</h2>
            <p className="text-gray-300 leading-8">
              You can choose not to provide personal information, but this may limit how we can respond. If you want to review, update, or remove your information, contact us through the website.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Contact</h2>
            <p className="text-gray-300 leading-8">
              If you have questions or concerns about this privacy policy, please contact NovQ through the contact options available on the site.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
