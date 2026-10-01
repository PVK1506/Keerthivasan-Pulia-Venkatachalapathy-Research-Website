/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ResearcherProfile,
  Publication,
} from './types/researcher';
import { INITIAL_RESEARCHER_PROFILE } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AcademicEducationSection } from './components/AcademicEducationSection';
import { ResearchInterestsSection } from './components/ResearchInterestsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { EngagementsSection } from './components/EngagementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BibtexModal } from './components/BibtexModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { PublishSyncModal } from './components/PublishSyncModal';

const STORAGE_KEYS = [
  'kvasan_research_scholar_profile_v6',
  'kvasan_research_scholar_profile_v5',
  'kvasan_research_scholar_profile_v4',
  'kvasan_research_scholar_profile_v3',
  'kvasan_research_scholar_profile_v2',
  'kvasan_research_scholar_profile',
];

export default function App() {
  // Retrieve profile with automatic support for URL data hashes (#data=... or #profile=...) and localStorage
  const [profile, setProfile] = useState<ResearcherProfile>(() => {
    // 1. Check if URL hash contains a pre-encoded profile transfer payload
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#data=') || hash.startsWith('#profile=')) {
        try {
          const payloadStr = hash.replace(/^#(data|profile)=/, '');
          const decoded = decodeURIComponent(payloadStr);
          const parsed = JSON.parse(decoded);
          if (parsed && typeof parsed === 'object' && parsed.name) {
            localStorage.setItem('kvasan_research_scholar_profile_v6', JSON.stringify(parsed));
            // Clean hash from URL bar
            window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
            return { ...INITIAL_RESEARCHER_PROFILE, ...parsed };
          }
        } catch (err) {
          console.error('Failed to parse profile from URL hash:', err);
        }
      }
    }

    // 2. Check localStorage across all known keys
    try {
      for (const key of STORAGE_KEYS) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            return {
              ...INITIAL_RESEARCHER_PROFILE,
              ...parsed,
              bio: parsed.bio && parsed.bio.length > 0 ? parsed.bio : INITIAL_RESEARCHER_PROFILE.bio,
              publications: parsed.publications && parsed.publications.length > 0 ? parsed.publications : INITIAL_RESEARCHER_PROFILE.publications,
              engagements: parsed.engagements && parsed.engagements.length > 0 ? parsed.engagements : INITIAL_RESEARCHER_PROFILE.engagements,
              interests: parsed.interests && parsed.interests.length > 0 ? parsed.interests : INITIAL_RESEARCHER_PROFILE.interests,
              education: parsed.education && parsed.education.length > 0 ? parsed.education : INITIAL_RESEARCHER_PROFILE.education,
              experience: parsed.experience && parsed.experience.length > 0 ? parsed.experience : INITIAL_RESEARCHER_PROFILE.experience,
              links: { ...INITIAL_RESEARCHER_PROFILE.links, ...(parsed.links || {}) },
              metrics: { ...INITIAL_RESEARCHER_PROFILE.metrics, ...(parsed.metrics || {}) },
            };
          }
        }
      }
    } catch (e) {
      console.error('Failed to load profile from localStorage:', e);
    }
    return INITIAL_RESEARCHER_PROFILE;
  });

  // Modal States
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Lightbox state for documentation and conference photos
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    photos: string[];
    currentIndex: number;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    photos: [],
    currentIndex: 0,
    title: '',
  });

  // Check URL hash on subsequent hashchange events
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#data=') || hash.startsWith('#profile=')) {
        try {
          const payloadStr = hash.replace(/^#(data|profile)=/, '');
          const decoded = decodeURIComponent(payloadStr);
          const parsed = JSON.parse(decoded);
          if (parsed && typeof parsed === 'object' && parsed.name) {
            setProfile((prev) => ({ ...prev, ...parsed }));
            localStorage.setItem('kvasan_research_scholar_profile_v6', JSON.stringify(parsed));
            window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
          }
        } catch (err) {
          console.error('Failed to handle hashchange:', err);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleImportProfile = (imported: ResearcherProfile) => {
    setProfile(imported);
    try {
      localStorage.setItem('kvasan_research_scholar_profile_v6', JSON.stringify(imported));
    } catch (e) {
      console.error('Failed to save imported profile:', e);
    }
  };

  const handleOpenPhotoLightbox = (
    photos: string[],
    startIndex: number,
    title: string,
    subtitle?: string
  ) => {
    setLightboxState({
      isOpen: true,
      photos,
      currentIndex: startIndex,
      title,
      subtitle,
    });
  };

  const handleScrollToPublications = () => {
    const pubSection = document.getElementById('publications');
    if (pubSection) {
      pubSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Editorial Navigation Top Bar */}
      <Navbar profile={profile} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Editorial Scholar Hero */}
        <HeroSection
          profile={profile}
          onExplorePublications={handleScrollToPublications}
        />

        {/* Research Experience & Education Degrees */}
        <AcademicEducationSection profile={profile} />

        {/* Research Interests & Core Questions */}
        <ResearchInterestsSection interests={profile.interests} />

        {/* Publications List with Search, Filter & BibTeX Citation modal */}
        <PublicationsSection
          publications={profile.publications}
          researcherName={profile.name}
          onOpenBibtexModal={(pub) => setSelectedBibtexPub(pub)}
        />

        {/* Scientific Engagement, Conference Presentations & Lab Visits */}
        <EngagementsSection
          engagements={profile.engagements}
          onOpenPhotoLightbox={handleOpenPhotoLightbox}
        />

        {/* Contact Coordinates & Academic Inquiry Form */}
        <ContactSection profile={profile} />
      </main>

      {/* Clean Academic Footer with Published URL & Sync Trigger */}
      <Footer
        profile={profile}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Public Visitor: BibTeX & Citation Modal */}
      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />

      {/* Public Visitor: Photo Lightbox Modal */}
      <PhotoLightboxModal
        isOpen={lightboxState.isOpen}
        photos={lightboxState.photos}
        currentIndex={lightboxState.currentIndex}
        title={lightboxState.title}
        subtitle={lightboxState.subtitle}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        onNext={() =>
          setLightboxState((prev) => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.photos.length,
          }))
        }
        onPrev={() =>
          setLightboxState((prev) => ({
            ...prev,
            currentIndex:
              (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length,
          }))
        }
      />

      {/* Published Webpage URL & Cross-Origin Data Sync Modal */}
      <PublishSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        profile={profile}
        onImportProfile={handleImportProfile}
      />

    </div>
  );
}
