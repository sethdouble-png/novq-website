'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PressItem } from '@/lib/types';
import ImageUpload from './ImageUpload';

interface PressManagerProps {
  profileId: string | null;
  pressItems: PressItem[];
  onUpdate: () => void;
}

export default function PressManager({ profileId, pressItems, onUpdate }: PressManagerProps) {
  const [itemsList, setItemsList] = useState<PressItem[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link_url: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setItemsList(pressItems);
  }, [pressItems]);

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      link_url: '',
      image_url: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId || !formData.title) {
      setMessage('Title is required');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (editingId) {
        // Update
        const { error } = await supabase
          .from('press_items')
          .update(formData)
          .eq('id', editingId);

        if (error) {
          setMessage(`Error: ${error.message}`);
          return;
        }
      } else {
        // Create
        const { error } = await supabase.from('press_items').insert([
          {
            profile_id: profileId,
            ...formData,
            sort_order: itemsList.length,
          },
        ]);

        if (error) {
          setMessage(`Error: ${error.message}`);
          return;
        }
      }

      setMessage(editingId ? 'Press item updated!' : 'Press item added!');
      handleReset();
      onUpdate();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: PressItem) => {
    setFormData({
      title: item.title,
      description: item.description || '',
      link_url: item.link_url || '',
      image_url: item.image_url || '',
    });
    setEditingId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this press item?')) return;

    try {
      const { error } = await supabase.from('press_items').delete().eq('id', id);

      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }

      setMessage('Press item deleted!');
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
            message.includes('successfully') || message.includes('added') || message.includes('updated')
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
          {editingId ? 'Edit Press Item' : 'Add Press Item'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Press Title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="input-field"
              placeholder="Press description or article excerpt..."
            />
          </div>

          <div>
            <label htmlFor="link_url" className="block text-sm font-medium text-gray-300 mb-2">
              Article Link
            </label>
            <input
              id="link_url"
              type="url"
              value={formData.link_url}
              onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          <ImageUpload
            label="Press Image"
            currentImageUrl={formData.image_url}
            onUpload={(url) => setFormData({ ...formData, image_url: url })}
            onDelete={() => setFormData({ ...formData, image_url: '' })}
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
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
      {itemsList.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#f5f5f7]">Press Items ({itemsList.length})</h3>
          {itemsList.map((item) => (
            <div key={item.id} className="card">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[#f5f5f7]">{item.title}</p>
                  {item.description && (
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-950/50 text-blue-200 border border-blue-800 rounded text-sm font-medium hover:bg-blue-900/50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
