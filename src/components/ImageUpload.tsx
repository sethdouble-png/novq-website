'use client';

import { useState } from 'react';
import { uploadImage, deleteImage, getImagePathFromUrl } from '@/lib/storageUtils';
import ImageWithFallback from './ImageWithFallback';

interface ImageUploadProps {
  currentImageUrl: string | null | undefined;
  onUpload: (url: string) => void;
  onDelete?: () => void;
  label: string;
}

export default function ImageUpload({
  currentImageUrl,
  onUpload,
  onDelete,
  label,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload
      const url = await uploadImage(file);
      if (url) {
        onUpload(url);
      } else {
        setError('Failed to upload image');
      }
    } catch (err) {
      setError('Error uploading image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentImageUrl || !onDelete) return;

    setUploading(true);
    try {
      const filePath = getImagePathFromUrl(currentImageUrl);
      if (filePath) {
        const deleted = await deleteImage(filePath);
        if (deleted) {
          onDelete();
        } else {
          setError('Failed to delete image');
        }
      }
    } catch (err) {
      setError('Error deleting image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300">{label}</label>

      {error && (
        <div className="bg-red-950/50 border border-red-800 rounded p-2 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        {preview || currentImageUrl ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#1a1a2e]">
            <ImageWithFallback
              src={preview || currentImageUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
            />
            <span className="btn-primary inline-block">
              {uploading ? 'Uploading...' : 'Choose Image'}
            </span>
          </label>

          {currentImageUrl && (
            <button
              onClick={handleDelete}
              disabled={uploading}
              className="btn-secondary text-sm"
            >
              {uploading ? 'Deleting...' : 'Delete Image'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
