'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function QuickAddSpotifyTracks() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddTracks = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Not authenticated. Please log in again.');
      }

      const response = await fetch('/api/add-spotify-tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add tracks');
      }

      setMessage({
        type: 'success',
        text: `✅ ${data.message}. Added 3 Spotify tracks to your releases!`,
      });

      // Refresh the page to show the new tracks
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Error: ${error instanceof Error ? error.message : 'Failed to add tracks'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a2e] p-6 rounded-lg mb-6">
      <h3 className="text-lg font-bold text-[#f5f5f7] mb-4">Quick Add Spotify Tracks</h3>
      <p className="text-gray-400 mb-4">
        Click the button below to automatically add the 3 provided Spotify tracks to your releases:
      </p>
      <ul className="text-gray-400 text-sm mb-4 space-y-1">
        <li>✓ Spotify Track 1</li>
        <li>✓ Spotify Track 2</li>
        <li>✓ Spotify Track 3</li>
      </ul>

      <button
        onClick={handleAddTracks}
        disabled={loading}
        className="w-full py-3 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
      >
        {loading ? 'Adding tracks...' : 'Add 3 Spotify Tracks'}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-900/30 text-green-300 border border-green-700'
              : 'bg-red-900/30 text-red-300 border border-red-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
