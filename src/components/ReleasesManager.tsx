'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Release } from '@/lib/types';
import ImageUpload from './ImageUpload';

interface ReleasesManagerProps {
  profileId: string | null;
  releases: Release[];
  onUpdate: () => void;
}

export default function ReleasesManager({ profileId, releases, onUpdate }: ReleasesManagerProps) {
  const [releasesList, setReleasesList] = useState<Release[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    listen_url: '',
    release_date: '',
    is_featured: false,
    is_upcoming: false,
    pre_save_url: '',
    pre_order_url: '',
    enable_alerts: true,
    cover_image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setReleasesList(releases);
  }, [releases]);

  const handleReset = () => {
    setFormData({
      title: '',
      subtitle: '',
      listen_url: '',
      release_date: '',
      is_featured: false,
      is_upcoming: false,
      pre_save_url: '',
      pre_order_url: '',
      enable_alerts: true,
      cover_image_url: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId || !formData.title || !formData.listen_url) {
      setMessage('Title and listen URL are required');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (editingId) {
        // Update
        const { error } = await supabase
          .from('releases')
          .update(formData)
          .eq('id', editingId);

        if (error) {
          setMessage(`Error: ${error.message}`);
          return;
        }
      } else {
        // Create
        const { error } = await supabase.from('releases').insert([
          {
            profile_id: profileId,
            ...formData,
            sort_order: releasesList.length,
          },
        ]);

        if (error) {
          setMessage(`Error: ${error.message}`);
          return;
        }
      }

      setMessage(editingId ? 'Release updated!' : 'Release added!');
      handleReset();
      onUpdate();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (release: Release) => {
    setFormData({
      title: release.title,
      subtitle: release.subtitle || '',
      listen_url: release.listen_url,
      release_date: release.release_date || '',
      is_featured: release.is_featured,
      is_upcoming: release.is_upcoming || false,
      pre_save_url: release.pre_save_url || '',
      pre_order_url: release.pre_order_url || '',
      enable_alerts: release.enable_alerts ?? true,
      cover_image_url: release.cover_image_url || '',
    });
    setEditingId(release.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this release?')) return;

    try {
      const { error } = await supabase.from('releases').delete().eq('id', id);

      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }

      setMessage('Release deleted!');
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
            message.includes('successfully') || message.includes('Release') || message.includes('updated') || message.includes('added')
              ? 'bg-green-950/50 border border-green-800 text-green-200'
              : 'bg-red-950/50 border border-red-800 text-red-200'
          }`}
        >
          {message}
        </div>
      )}

      {/* Form */}
      <div className="card">
        <h3 className="text-lg font-bold text-[#f5f5f7] mb-4">
          {editingId ? 'Edit Release' : 'Add New Release'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Release Title"
                required
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300 mb-2">
                Subtitle
              </label>
              <input
                id="subtitle"
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="input-field"
                placeholder="EP / Album / Single"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="listen_url" className="block text-sm font-medium text-gray-300 mb-2">
                Listen URL *
              </label>
              <input
                id="listen_url"
                type="url"
                value={formData.listen_url}
                onChange={(e) => setFormData({ ...formData, listen_url: e.target.value })}
                className="input-field"
                placeholder="https://spotify.com/..."
                required
              />
            </div>

            <div>
              <label htmlFor="release_date" className="block text-sm font-medium text-gray-300 mb-2">
                Release Date
              </label>
              <input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded border-[#1a1a2e] bg-[#0f0f15] text-[#e11d48]"
              />
              <span className="text-sm font-medium text-gray-300">Featured Release</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_upcoming}
                onChange={(e) => setFormData({ ...formData, is_upcoming: e.target.checked })}
                className="w-4 h-4 rounded border-[#1a1a2e] bg-[#0f0f15] text-[#e11d48]"
              />
              <span className="text-sm font-medium text-gray-300">Upcoming Release</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pre_save_url" className="block text-sm font-medium text-gray-300 mb-2">
                Pre-Save URL (optional)
              </label>
              <input
                id="pre_save_url"
                type="url"
                value={formData.pre_save_url}
                onChange={(e) => setFormData({ ...formData, pre_save_url: e.target.value })}
                className="input-field"
                placeholder="https://pre.ffm.to/..."
              />
            </div>

            <div>
              <label htmlFor="pre_order_url" className="block text-sm font-medium text-gray-300 mb-2">
                Pre-Order URL (optional)
              </label>
              <input
                id="pre_order_url"
                type="url"
                value={formData.pre_order_url}
                onChange={(e) => setFormData({ ...formData, pre_order_url: e.target.value })}
                className="input-field"
                placeholder="https://store.example.com/..."
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enable_alerts}
              onChange={(e) => setFormData({ ...formData, enable_alerts: e.target.checked })}
              className="w-4 h-4 rounded border-[#1a1a2e] bg-[#0f0f15] text-[#e11d48]"
            />
            <span className="text-sm font-medium text-gray-300">Enable Release Alerts for Subscribers</span>
          </label>

          <ImageUpload
            label="Cover Image"
            currentImageUrl={formData.cover_image_url}
            onUpload={(url) => setFormData({ ...formData, cover_image_url: url })}
            onDelete={() => setFormData({ ...formData, cover_image_url: '' })}
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Release' : 'Add Release'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      {releasesList.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#f5f5f7]">Releases ({releasesList.length})</h3>
          {releasesList.map((release) => (
            <div key={release.id} className="card">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[#f5f5f7]">{release.title}</p>
                  {release.subtitle && (
                    <p className="text-sm text-gray-400">{release.subtitle}</p>
                  )}
                  {release.release_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(release.release_date).toLocaleDateString()}
                    </p>
                  )}
                  {release.is_featured && (
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-950/50 text-yellow-200 text-xs rounded border border-yellow-800">
                      Featured
                    </span>
                  )}
                  {release.is_upcoming && (
                    <span className="inline-block mt-2 ml-2 px-2 py-1 bg-blue-950/50 text-blue-200 text-xs rounded border border-blue-800">
                      Upcoming
                    </span>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(release)}
                    className="px-3 py-1 bg-blue-950/50 text-blue-200 border border-blue-800 rounded text-sm font-medium hover:bg-blue-900/50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(release.id)}
                    className="px-3 py-1 bg-red-950/50 text-red-200 border border-red-800 rounded text-sm font-medium hover:bg-red-900/50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
