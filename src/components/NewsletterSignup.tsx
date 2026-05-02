'use client';

import { useState, type FormEvent } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Subscription failed.');
      }

      setStatus('success');
      setMessage('You are now subscribed for updates.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage((error as Error).message || 'Unable to subscribe.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-[#1a1a2e] bg-[#0b0b15]/70 p-8 shadow-xl shadow-[#00000040]">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#e11d48]">Newsletter</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#f5f5f7]">Stay updated on new releases</h2>
        <p className="mt-3 text-gray-300">Subscribe for release news, studio updates, and exclusive drops.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-3xl border border-[#1a1a2e] bg-[#090913] px-4 py-3 text-[#f5f5f7] outline-none transition focus:border-[#e11d48]"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-[#e11d48] px-6 py-3 text-sm font-semibold text-[#f5f5f7] transition hover:bg-[#c81d42] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Joining...' : 'Join'}
        </button>
      </div>

      {status !== 'idle' && (
        <p className={`text-sm ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
