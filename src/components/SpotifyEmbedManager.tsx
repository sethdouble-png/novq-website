'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface SpotifyEmbed {
  id: string;
  embed_code: string;
  sort_order: number;
  created_at: string;
}

interface SpotifyEmbedManagerProps {
  profileId: string;
  onUpdate?: () => void;
}

export default function SpotifyEmbedManager({ profileId, onUpdate }: SpotifyEmbedManagerProps) {
  const [embeds, setEmbeds] = useState<SpotifyEmbed[]>([]);
  const [embedCode, setEmbedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchEmbeds();
  }, [profileId]);

  const fetchEmbeds = async () => {
    try {
      const response = await fetch('/api/spotify-embeds');
      if (!response.ok) {
        throw new Error('Failed to load embeds');
      }

      const data = await response.json();
      setEmbeds(data || []);
    } catch (error) {
      console.error('Error fetching embeds:', error);
      setMessage({ type: 'error', text: 'Failed to load embeds' });
    }
  };

  const handleAddEmbed = async () => {
    if (!embedCode.trim()) {
      setMessage({ type: 'error', text: 'Please paste an embed code' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (!token) {
        throw new Error('Please sign in again before adding embeds.');
      }

      const response = await fetch('/api/spotify-embeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ embed_code: embedCode }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add embed');
      }

      setEmbedCode('');
      setMessage({ type: 'success', text: '✅ Spotify embed added successfully!' });
      fetchEmbeds();
      onUpdate?.();

      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      console.error('Error adding embed:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to add embed' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmbed = async (id: string) => {
    if (!confirm('Delete this embed?')) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (!token) {
        throw new Error('Please sign in again before deleting embeds.');
      }

      const response = await fetch(`/api/spotify-embeds?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete embed');
      }

      setMessage({ type: 'success', text: '✅ Embed deleted!' });
      fetchEmbeds();
      onUpdate?.();

      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      console.error('Error deleting embed:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to delete embed' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Embed Form */}
      <div className="bg-[#1a1a2e] p-6 rounded-lg">
        <h3 className="text-lg font-bold text-[#f5f5f7] mb-4">Add Spotify Embed</h3>
        <p className="text-sm text-gray-400 mb-4">
          Paste the full Spotify iframe embed code below:
        </p>

        <textarea
          value={embedCode}
          onChange={(e) => setEmbedCode(e.target.value)}
          placeholder={`Paste Spotify iframe code here, e.g.:
<iframe style="border-radius: 12px" src="https://open.spotify.com/embed/track/..."></iframe>`}
          className="w-full h-32 p-3 bg-[#050509] border border-[#1a1a2e] rounded-lg text-[#f5f5f7] font-mono text-sm focus:outline-none focus:border-[#e11d48] resize-none"
        />

        <button
          onClick={handleAddEmbed}
          disabled={loading}
          className="mt-4 w-full py-3 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Adding...' : 'Add Spotify Embed'}
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

      {/* Embeds List */}
      {embeds.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#f5f5f7]">Saved Embeds ({embeds.length})</h3>

          {embeds.map((embed) => (
            <div key={embed.id} className="bg-[#1a1a2e] p-6 rounded-lg">
              {/* Preview */}
              <div className="mb-4 overflow-hidden rounded-lg bg-[#050509]">
                <div
                  dangerouslySetInnerHTML={{ __html: embed.embed_code }}
                  className="spotify-embed-container"
                />
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <p>Added: {new Date(embed.created_at).toLocaleDateString()}</p>
                  <p>Sort Order: {embed.sort_order}</p>
                </div>

                <button
                  onClick={() => handleDeleteEmbed(embed.id)}
                  className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-semibold rounded-lg transition-colors border border-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {embeds.length === 0 && (
        <div className="text-center py-12 bg-[#1a1a2e] rounded-lg">
          <p className="text-gray-400">No Spotify embeds yet. Add your first embed above!</p>
        </div>
      )}
    </div>
  );
}
