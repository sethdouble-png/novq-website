'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import ProfileForm from '@/components/ProfileForm';
import SiteSettingsForm from '@/components/SiteSettingsForm';
import LinksManager from '@/components/LinksManager';
import ReleasesManager from '@/components/ReleasesManager';
import PressManager from '@/components/PressManager';
import { Profile, SiteSettings, Link as LinkType, Release, PressItem } from '@/lib/types';

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';

  const [profile, setProfile] = useState<Profile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) return;

      // Fetch or create profile
      let profileData = await fetchProfile(user.id);
      if (!profileData) {
        profileData = await createDefaultProfile(user.id);
      }
      if (profileData) {
        setProfile(profileData);

        // Fetch other data
        const [settingsData, linksData, releasesData, pressData] = await Promise.all([
          fetchSiteSettings(user.id),
          fetchLinks(user.id),
          fetchReleases(user.id),
          fetchPressItems(user.id),
        ]);

        setSiteSettings(settingsData);
        setLinks(linksData);
        setReleases(releasesData);
        setPressItems(pressData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      .single();
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
            {profile && <ProfileForm profile={profile} onUpdate={fetchAllData} />}
          </div>
        )}

        {tab === 'settings' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Site Settings</h2>
            {profile && (
              <SiteSettingsForm
                settings={siteSettings}
                profileId={profile.id}
                onUpdate={fetchAllData}
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
                onUpdate={fetchAllData}
              />
            )}
          </div>
        )}

        {tab === 'releases' && (
          <div>
            <h2 className="text-3xl font-bold text-[#f5f5f7] mb-8">Releases</h2>
            {profile && (
              <ReleasesManager
                profileId={profile.id}
                releases={releases}
                onUpdate={fetchAllData}
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
                onUpdate={fetchAllData}
              />
            )}
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
