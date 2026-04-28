import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (
  file: File,
  folder: string = 'images'
): Promise<string | null> => {
  try {
    const uniqueFilename = `${uuidv4()}-${file.name}`;
    const filePath = `${folder}/${uniqueFilename}`;

    const { error } = await supabase.storage
      .from('novq-media')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('novq-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
  }
};

export const deleteImage = async (filePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('novq-media')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting image:', err);
    return false;
  }
};

export const getImagePathFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/storage/v1/object/public/novq-media/');
    return parts[1] || '';
  } catch {
    return '';
  }
};
