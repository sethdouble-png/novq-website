import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact - NovQ',
  description: 'Get in touch with NovQ. Reach out for inquiries, collaborations, or feedback.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050509] text-[#f5f5f7]">
      <Header />
      <div className="section-container pt-28 pb-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#e11d48]">Get In Touch</p>
            <h1 className="mt-4 text-4xl font-semibold text-[#f5f5f7]">Contact NovQ</h1>
            <p className="mt-4 text-base leading-8 text-gray-300">
              Have a question, collaboration idea, or feedback? We'd love to hear from you. Reach out using the information below.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <ContactForm />
          </div>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-6 text-2xl font-semibold text-[#f5f5f7]\">What to Include</h2>
            <p className="text-gray-300 leading-8 mb-4">
              To help us assist you better, please include the following in your message:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Your name and email address</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>A clear subject line describing your inquiry</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Details about your message or request</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Any relevant links or attachments</span>
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-6 text-2xl font-semibold text-[#f5f5f7]\">Types of Inquiries</h2>
            <p className="text-gray-300 leading-8 mb-4">
              NovQ welcomes all inquiries, including:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>General questions about music and productions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Collaboration and feature opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Press and media inquiries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Feedback and suggestions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e11d48] font-bold mt-1">•</span>
                <span>Licensing and synchronization requests</span>
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
            <h2 className="mb-4 text-2xl font-semibold text-[#f5f5f7]\">Privacy</h2>
            <p className="text-gray-300 leading-8">
              Your contact information will be kept confidential and only used to respond to your inquiry. Please review our <a href="/privacy" className="text-[#e11d48] hover:underline">privacy policy</a> for more details.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
