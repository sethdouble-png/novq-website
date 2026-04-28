'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Link as LinkType } from '@/lib/types';

interface LinksManagerProps {
  profileId: string | null;
  links: LinkType[];
  onUpdate: () => void;
}

export default function LinksManager({ profileId, links, onUpdate }: LinksManagerProps) {
  const [linksList, setLinksList] = useState<LinkType[]>([]);
  const [formData, setFormData] = useState({ label: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLinksList(links);
  }, [links]);

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId || !formData.label || !formData.url) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('links').insert([
        {
          profile_id: profileId,
          label: formData.label,
          url: formData.url,
          sort_order: linksList.length,
          is_active: true,
        },
      ]);

      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }

      setFormData({ label: '', url: '' });
      setMessage('Link added successfully!');
      onUpdate();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase.from('links').delete().eq('id', id);

      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }

      setMessage('Link deleted successfully!');
      onUpdate();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('links')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }

      onUpdate();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.includes('successfully')
              ? 'bg-green-950/50 border border-green-800 text-green-200'
              : 'bg-red-950/50 border border-red-800 text-red-200'
          }`}
        >
          {message}
        </div>
      )}

      {/* Add Link Form */}
      <div className="card">
        <h3 className="text-lg font-bold text-[#f5f5f7] mb-4">Add New Link</h3>
        <form onSubmit={handleAddLink} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-300 mb-2">
                Label (e.g., "Spotify", "Instagram")
              </label>
              <input
                id="label"
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="input-field"
                placeholder="Spotify"
                required
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                URL
              </label>
              <input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="input-field"
                placeholder="https://spotify.com/..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Link'}
          </button>
        </form>
      </div>

      {/* Links List */}
      {linksList.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#f5f5f7]">Existing Links</h3>
          {linksList.map((link) => (
            <div key={link.id} className="card flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-[#f5f5f7]">{link.label}</p>
                <p className="text-sm text-gray-400 break-all">{link.url}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleActive(link.id, link.is_active)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    link.is_active
                      ? 'bg-green-950/50 text-green-200 border border-green-800'
                      : 'bg-gray-950/50 text-gray-400 border border-gray-800'
                  }`}
                >
                  {link.is_active ? 'Active' : 'Inactive'}
                </button>

                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="px-3 py-1 bg-red-950/50 text-red-200 border border-red-800 rounded text-sm font-medium hover:bg-red-900/50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
