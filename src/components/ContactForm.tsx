'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to send message.');
      }

      setStatus('success');
      setFormData(initialState);
    } catch (error) {
      setStatus('error');
      setErrorMessage((error as Error).message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-300">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-3xl border border-[#1a1a2e] bg-[#090913] px-4 py-3 text-[#f5f5f7] outline-none transition focus:border-[#e11d48]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-3xl border border-[#1a1a2e] bg-[#090913] px-4 py-3 text-[#f5f5f7] outline-none transition focus:border-[#e11d48]"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-300">Subject</span>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-3xl border border-[#1a1a2e] bg-[#090913] px-4 py-3 text-[#f5f5f7] outline-none transition focus:border-[#e11d48]"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-300">Message</span>
        <textarea
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-3xl border border-[#1a1a2e] bg-[#090913] px-4 py-3 text-[#f5f5f7] outline-none transition focus:border-[#e11d48]"
        />
      </label>

      {status === 'success' && (
        <p className="rounded-3xl border border-green-500 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          Message sent successfully. Thank you!
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-3xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center rounded-full bg-[#e11d48] px-8 py-3 text-sm font-semibold text-[#f5f5f7] transition hover:bg-[#c81d42] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
