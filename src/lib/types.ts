export type Profile = {
  id: string;
  display_name: string;
  tagline: string;
  bio: string;
  hero_image_url: string | null;
  avatar_url: string | null;
  updated_at: string;
};

export type Link = {
  id: string;
  label: string;
  url: string;
  sort_order: number;
  is_active: boolean;
};

export type Release = {
  id: string;
  title: string;
  subtitle: string;
  cover_image_url: string | null;
  listen_url: string;
  release_date: string;
  sort_order: number;
  is_featured: boolean;
  is_upcoming: boolean;
  pre_save_url: string | null;
  pre_order_url: string | null;
  enable_alerts: boolean;
};

export type PressItem = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  sort_order: number;
};

export type SiteSettings = {
  id: string;
  hero_heading: string;
  hero_subheading: string;
  background_video_url: string | null;
  theme_accent_color: string;
};
