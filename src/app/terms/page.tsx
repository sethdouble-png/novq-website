import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service - NovQ',
  description: 'Read the terms of service for NovQ, including user responsibilities, intellectual property, and liability limits.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-[#f5f5f7]">
      <Header />
      <div className="section-container pt-28 pb-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#e11d48]">Terms of Service</p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f5f5f7]">NovQ Terms and Conditions</h1>
            <p className="mt-4 text-base leading-8 text-gray-300">
              These terms explain how you may use the NovQ website and what you can expect from us. Please review them before using the site.
            </p>
          </div>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Acceptance of Terms</h2>
            <p className="text-gray-300 leading-8">
              By accessing or using this website, you agree to these terms. If you do not agree, please do not use the site.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Permitted Use</h2>
            <p className="text-gray-300 leading-8">
              You may use NovQ for lawful, personal, non-commercial purposes. You agree not to damage, interfere with, or misuse the site or any services provided here.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Intellectual Property</h2>
            <p className="text-gray-300 leading-8">
              All content on this website, including text, images, audio, and design, is owned by NovQ or used with permission. You may not copy, reproduce, or distribute content without explicit permission.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Third-Party Links</h2>
            <p className="text-gray-300 leading-8">
              The site may contain links to third-party sites. NovQ is not responsible for the content or policies of those sites and you access them at your own risk.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Disclaimer of Warranties</h2>
            <p className="text-gray-300 leading-8">
              The website is provided "as is" without warranties of any kind. NovQ does not guarantee the accuracy, reliability, or completeness of the content.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Limitation of Liability</h2>
            <p className="text-gray-300 leading-8">
              NovQ is not liable for damages arising from your use of the site. This includes any direct, indirect, incidental, or consequential losses.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Changes to Terms</h2>
            <p className="text-gray-300 leading-8">
              We may update these terms at any time. Continued use of the website after changes means you accept the revised terms.
            </p>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">Contact</h2>
            <p className="text-gray-300 leading-8">
              If you have any questions about these terms, please reach out through the contact options on the site.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
