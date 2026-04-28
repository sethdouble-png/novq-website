'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Profile } from '@/lib/types';
import ImageUpload from './ImageUpload';

interface ProfileFormProps {
  profile: Profile | null;
  onUpdate: () => void;
}

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<Profile>>({
    display_name: '',
    tagline: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (field: 'avatar_url' | 'hero_image_url', url: string) => {
    setFormData((prev) => ({ ...prev, [field]: url }));
    setMessage('Image uploaded. Save changes to confirm.');
  };

  const handleImageDelete = async (field: 'avatar_url' | 'hero_image_url') => {
    setFormData((prev) => ({ ...prev, [field]: null }));
    setMessage('Image deleted. Save changes to confirm.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!profile?.id) {
        setMessage('Error: No profile ID');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', profile.id);

      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }

      setMessage('Profile updated successfully!');
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
          <label htmlFor="display_name" className="block text-sm font-medium text-gray-300 mb-2">
            Display Name
          </label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            value={formData.display_name || ''}
            onChange={handleChange}
            className="input-field"
            placeholder="NovQ"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-300 mb-2">
            Tagline
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            value={formData.tagline || ''}
            onChange={handleChange}
            className="input-field"
            placeholder="Music Producer & Artist"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
          rows={6}
          className="input-field"
          placeholder="Tell us about yourself..."
        />
      </div>

      <ImageUpload
        label="Avatar Image"
        currentImageUrl={formData.avatar_url}
        onUpload={(url) => handleImageUpload('avatar_url', url)}
        onDelete={() => handleImageDelete('avatar_url')}
      />

      <ImageUpload
        label="Hero Background Image"
        currentImageUrl={formData.hero_image_url}
        onUpload={(url) => handleImageUpload('hero_image_url', url)}
        onDelete={() => handleImageDelete('hero_image_url')}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
