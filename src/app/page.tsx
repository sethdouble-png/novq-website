'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReleaseCard from '@/components/ReleaseCard';
import PressCard from '@/components/PressCard';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import NewsletterSignup from '@/components/NewsletterSignup';
import StreamingPlatformIcon from '@/components/StreamingPlatformIcon';
import { supabase } from '@/lib/supabaseClient';
import { Profile, Release, Link as LinkType, PressItem, SiteSettings } from '@/lib/types';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [pressItems, setPressItems] = useState<PressItem[]>([]);
  const [spotifyEmbeds, setSpotifyEmbeds] = useState<Array<{ id: string; embed_code: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch site settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (settingsData) {
        setSiteSettings(settingsData);
      }

      // Fetch releases
      const { data: releasesData } = await supabase
        .from('releases')
        .select('*')
        .order('sort_order', { ascending: true });

      if (releasesData) {
        setReleases(releasesData);
      }

      // Fetch active links
      const { data: linksData } = await supabase
        .from('links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (linksData) {
        setLinks(linksData);
      }

      // Fetch press items
      const { data: pressData } = await supabase
        .from('press_items')
        .select('*')
        .order('sort_order', { ascending: true });

      if (pressData) {
        setPressItems(pressData);
      }

      // Fetch Spotify embeds from server API
      const embedsResponse = await fetch('/api/spotify-embeds');
      if (embedsResponse.ok) {
        const embedsData = await embedsResponse.json();
        const sortedEmbeds = (embedsData || []).slice().sort(
          (a: { created_at: string }, b: { created_at: string }) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setSpotifyEmbeds(sortedEmbeds);
      } else {
        console.error('Failed to fetch Spotify embeds:', embedsResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const cleanup = setupRealtimeSubscriptions();
    return cleanup;
  }, []);

  const setupRealtimeSubscriptions = () => {
    // Subscribe to profile changes
    supabase
      .channel('profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload) => {
        if (payload.new) {
          setProfile(payload.new as Profile);
        }
      })
      .subscribe();

    // Subscribe to site settings changes
    supabase
      .channel('site_settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
        if (payload.new) {
          setSiteSettings(payload.new as SiteSettings);
        }
      })
      .subscribe();

    // Subscribe to releases changes
    supabase
      .channel('releases')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'releases' }, () => {
        supabase
          .from('releases')
          .select('*')
          .order('sort_order', { ascending: true })
          .then(({ data }) => {
            if (data) setReleases(data);
          });
      })
      .subscribe();

    // Subscribe to links changes
    supabase
      .channel('links')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'links' }, () => {
        supabase
          .from('links')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
          .then(({ data }) => {
            if (data) setLinks(data);
          });
      })
      .subscribe();

    // Subscribe to press items changes
    supabase
      .channel('press_items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'press_items' }, () => {
        supabase
          .from('press_items')
          .select('*')
          .order('sort_order', { ascending: true })
          .then(({ data }) => {
            if (data) setPressItems(data);
          });
      })
      .subscribe();

    return () => {
      supabase.removeAllChannels();
    };
  };

  return (
    <main className="min-h-screen bg-[#050509]">
      <Header />

      {/* Hero Section */}
      <Hero
        heading={siteSettings?.hero_heading || 'NovQ'}
        subheading={siteSettings?.hero_subheading || 'Music Producer & Artist'}
        backgroundImage={profile?.hero_image_url}
        backgroundVideo={siteSettings?.background_video_url}
      />

      {/* About Section */}
      {profile && (
        <section id="about" className="section-container">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="mb-4 sm:mb-6 text-[#f5f5f7]">About NovQ</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                {profile.bio || 'Creating cinematic soundscapes that push the boundaries of music production.'}
              </p>
              {profile.tagline && (
                <p className="text-[#e11d48] font-semibold">{profile.tagline}</p>
              )}
            </div>

            <div className="relative aspect-square rounded-lg overflow-hidden border border-[#1a1a2e]">
              <ImageWithFallback
                src={profile.avatar_url}
                alt="NovQ"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Music / Releases Section */}
      {releases.length > 0 && (
        <>
          {/* Upcoming Releases */}
          {releases.filter(r => r.is_upcoming).length > 0 && (
            <section id="upcoming" className="section-container">
              <h2 className="mb-6 sm:mb-12 text-[#f5f5f7]">Upcoming Releases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {releases
                  .filter(r => r.is_upcoming)
                  .sort((a, b) => new Date(a.release_date || '').getTime() - new Date(b.release_date || '').getTime())
                  .map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                  ))}
              </div>
            </section>
          )}

          {/* Latest Releases */}
          {releases.filter(r => !r.is_upcoming).length > 0 && (
            <section id="music" className="section-container">
              <h2 className="mb-6 sm:mb-12 text-[#f5f5f7]">Latest Releases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {releases
                  .filter(r => !r.is_upcoming)
                  .sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime())
                  .map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                  ))}
              </div>
            </section>
          )}
        </>
      )}

        <section id="music" className="section-container">
          <h2 className="mb-6 sm:mb-12 text-[#f5f5f7]">Featured Tracks</h2>
          <div className="space-y-6 sm:space-y-10">
            {spotifyEmbeds.map((embed, index) => (
            <div key={embed.id} className="spotify-embed-wrapper">
              {index === 0 && (
                <div className="mb-4 inline-flex items-center rounded-full bg-[#e11d48] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white font-semibold">
                  New Release
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: embed.embed_code }}
                className="spotify-embed-container"
              />
            </div>
          ))}
          </div>
        </section>

        <section id="links" className="section-container">
          <h2 className="mb-6 sm:mb-12 text-[#f5f5f7]">Stream & Follow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center justify-between gap-3 group text-sm sm:text-base"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <StreamingPlatformIcon url={link.url} />
                  <span className="font-semibold text-[#f5f5f7] group-hover:text-[#e11d48] transition-colors truncate">
                    {link.label}
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-[#e11d48] transition-colors flex-shrink-0">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="press" className="section-container">
          <h2 className="mb-6 sm:mb-12 text-[#f5f5f7]">Press & EPK</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pressItems.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        </section>

      <section className="section-container">
        <NewsletterSignup />
      </section>

      <Footer />
    </main>
  );
}

