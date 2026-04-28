'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { SiteSettings } from '@/lib/types';

interface SiteSettingsFormProps {
  settings: SiteSettings | null;
  profileId: string | null;
  onUpdate: () => void;
}

export default function SiteSettingsForm({
  settings,
  profileId,
  onUpdate,
}: SiteSettingsFormProps) {
  const [formData, setFormData] = useState<Partial<SiteSettings>>({
    hero_heading: '',
    hero_subheading: '',
    background_video_url: '',
    theme_accent_color: '#e11d48',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!profileId) {
        setMessage('Error: No profile ID');
        return;
      }

      if (settings?.id) {
        // Update existing
        const { error } = await supabase
          .from('site_settings')
          .update(formData)
          .eq('id', settings.id);

        if (error) {
          setMessage(`Error: ${error.message}`);
          return;
        }
      } else {
        // Create new
        const { error } = await supabase.from('site_settings').insert([
          {
            profile_id: profileId,
            ...formData,
          },
        ]);

        if (error) {
          setMessage(`Error: ${error.message}`);
          return;
        }
      }

      setMessage('Site settings updated successfully!');
      onUpdate();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="hero_heading" className="block text-sm font-medium text-gray-300 mb-2">
            Hero Heading
          </label>
          <input
            id="hero_heading"
            name="hero_heading"
            type="text"
            value={formData.hero_heading || ''}
            onChange={handleChange}
            className="input-field"
            placeholder="NovQ"
          />
        </div>

        <div>
          <label htmlFor="hero_subheading" className="block text-sm font-medium text-gray-300 mb-2">
            Hero Subheading
          </label>
          <input
            id="hero_subheading"
            name="hero_subheading"
            type="text"
            value={formData.hero_subheading || ''}
            onChange={handleChange}
            className="input-field"
            placeholder="Music Producer & Artist"
          />
        </div>
      </div>

      <div>
        <label htmlFor="background_video_url" className="block text-sm font-medium text-gray-300 mb-2">
          Background Video URL (optional)
        </label>
        <input
          id="background_video_url"
          name="background_video_url"
          type="url"
          value={formData.background_video_url || ''}
          onChange={handleChange}
          className="input-field"
          placeholder="https://example.com/video.mp4"
        />
        <p className="text-xs text-gray-500 mt-1">
          If set, video will play in hero background. Format: MP4, WebM
        </p>
      </div>

      <div>
        <label htmlFor="theme_accent_color" className="block text-sm font-medium text-gray-300 mb-2">
          Theme Accent Color
        </label>
        <div className="flex gap-4 items-end">
          <input
            id="theme_accent_color"
            name="theme_accent_color"
            type="color"
            value={formData.theme_accent_color || '#e11d48'}
            onChange={handleChange}
            className="w-20 h-10 rounded cursor-pointer border border-[#1a1a2e]"
          />
          <input
            type="text"
            value={formData.theme_accent_color || '#e11d48'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                theme_accent_color: e.target.value,
              }))
            }
            className="input-field flex-1"
            placeholder="#e11d48"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
