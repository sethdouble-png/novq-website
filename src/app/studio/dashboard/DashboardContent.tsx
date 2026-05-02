'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import ProfileForm from '@/components/ProfileForm';
import SiteSettingsForm from '@/components/SiteSettingsForm';
import LinksManager from '@/components/LinksManager';
import ReleasesManager from '@/components/ReleasesManager';
import PressManager from '@/components/PressManager';
import QuickAddSpotifyTracks from '@/components/QuickAddSpotifyTracks';
import SpotifyEmbedManager from '@/components/SpotifyEmbedManager';

import {
  Profile,
  SiteSettings,
  Link as LinkType,
  Release,
  PressItem,
} from '@/lib/types';

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';

  const [profile, setProfile] = useState<Profile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // 1. Load session FIRST (fixes 401)
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // ProtectedRoute will handle redirect, but stop execution
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // 2. Fetch or create profile
      let profileData = await fetchProfile(userId);
      if (!profileData) {
        profileData = await createDefaultProfile(userId);
      }

      setProfile(profileData);

      // 3. Fetch all other data in parallel
      const [settingsData, linksData, releasesData, pressData] = await Promise.all([
        fetchSiteSettings(userId),
        fetchLinks(userId),
        fetchReleases(userId),
        fetchPressItems(userId),
      ]);

      setSiteSettings(settingsData);
      setLinks(linksData);
      setReleases(releasesData);
      setPressItems(pressData);

      setLoading(false);
    };

    load();
  }, []);

  // -----------------------------
  // FETCH FUNCTIONS
  // -----------------------------

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return data;
  };

  const createDefaultProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          display_name: 'NovQ',
          tagline: 'Music Producer & Artist',
          bio: 'Creating cinematic soundscapes that push the boundaries of music production.',
        },
      ])
      .select()
      .single();
    return data;
  };

  const fetchSiteSettings = async (userId: string) => {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .eq('profile_id', userId)
      .limit(1)
      .maybeSingle();
    return data;
  };

  const fetchLinks = async (userId: string) => {
    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', userId)
      .order('sort_order', { ascending: true });
    return data || [];
  };

  const fetchReleases = async (userId: string) => {
    const { data } = await supabase
      .from('releases')
      .select('*')
      .eq('profile_id', userId)
      .order('sort_order', { ascending: true });
    return data || [];
  };

  const fetchPressItems = async (userId: string) => {
    const { data } = await supabase
      .from('press_items')
      .select('*')
      .eq('profile_id', userId)
      .order('sort_order', { ascending: true });
    return data || [];
  };

  // -----------------------------
  // RENDER
  // -----------------------------

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout activeTab={tab}>
        {tab === 'profile' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Profile Settings</h2>
            {profile && <ProfileForm profile={profile} onUpdate={() => router.refresh()} />}
          </div>
        )}

        {tab === 'settings' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Site Settings</h2>
            {profile && (
              <SiteSettingsForm
                settings={siteSettings}
                profileId={profile.id}
                onUpdate={() => router.refresh()}
              />
            )}
          </div>
        )}

        {tab === 'links' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Links & Social</h2>
            {profile && (
              <LinksManager
                profileId={profile.id}
                links={links}
                onUpdate={() => router.refresh()}
              />
            )}
          </div>
        )}

        {tab === 'releases' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Releases</h2>
            <QuickAddSpotifyTracks />
            {profile && (
              <ReleasesManager
                profileId={profile.id}
                releases={releases}
                onUpdate={() => router.refresh()}
              />
            )}
          </div>
        )}

        {tab === 'press' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Press / EPK</h2>
            {profile && (
              <PressManager
                profileId={profile.id}
                pressItems={pressItems}
                onUpdate={() => router.refresh()}
              />
            )}
          </div>
        )}

        {tab === 'embeds' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Spotify Embeds</h2>
            {profile && (
              <SpotifyEmbedManager
                profileId={profile.id}
                onUpdate={() => router.refresh()}
              />
            )}
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
