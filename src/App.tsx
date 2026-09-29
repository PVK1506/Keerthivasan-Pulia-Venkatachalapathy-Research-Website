/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ResearcherProfile, Publication, EngagementItem } from './types/researcher';
import { INITIAL_RESEARCHER_PROFILE } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchInterestsSection } from './components/ResearchInterestsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { EngagementsSection } from './components/EngagementsSection';
import { CVSection } from './components/CVSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BibtexModal } from './components/BibtexModal';
import { EditProfileModal } from './components/EditProfileModal';
import { AddPublicationModal } from './components/AddPublicationModal';
import { AddEngagementModal } from './components/AddEngagementModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { NewsSection } from './components/NewsSection';

const STORAGE_KEY = 'kvasan_research_scholar_profile_v3';

export default function App() {
  const [profile, setProfile] = useState<ResearcherProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure engagements and news arrays exist
        if (!parsed.engagements) {
          parsed.engagements = INITIAL_RESEARCHER_PROFILE.engagements;
        }
        if (!parsed.news) {
          parsed.news = INITIAL_RESEARCHER_PROFILE.news;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load profile from localStorage:', e);
    }
    return INITIAL_RESEARCHER_PROFILE;
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddPubModalOpen, setIsAddPubModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [isAddEngModalOpen, setIsAddEngModalOpen] = useState(false);
  const [editingEngagement, setEditingEngagement] = useState<EngagementItem | null>(null);

  // Lightbox state
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

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  // Handlers
  const handleSaveProfile = (updated: ResearcherProfile) => {
    setProfile(updated);
  };

  const handleUpdateAvatar = (avatarUrl: string) => {
    setProfile((prev) => ({
      ...prev,
      avatarUrl,
    }));
  };

  const handleResetToDefault = () => {
    setProfile(INITIAL_RESEARCHER_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    setSelectedTopicId(null);
  };

  const handleSavePublication = (pub: Publication) => {
    setProfile((prev) => {
      const exists = prev.publications.some((p) => p.id === pub.id);
      let updatedPubs: Publication[];
      if (exists) {
        updatedPubs = prev.publications.map((p) => (p.id === pub.id ? pub : p));
      } else {
        updatedPubs = [pub, ...prev.publications];
      }
      return {
        ...prev,
        publications: updatedPubs,
        metrics: {
          ...prev.metrics,
          publicationsCount: updatedPubs.length,
        },
      };
    });
    setEditingPublication(null);
  };

  const handleDeletePublication = (pubId: string) => {
    setProfile((prev) => {
      const updatedPubs = prev.publications.filter((p) => p.id !== pubId);
      return {
        ...prev,
        publications: updatedPubs,
        metrics: {
          ...prev.metrics,
          publicationsCount: updatedPubs.length,
        },
      };
    });
    if (editingPublication?.id === pubId) {
      setEditingPublication(null);
    }
  };

  const handleClearAllPublications = () => {
    setProfile((prev) => ({
      ...prev,
      publications: [],
      metrics: {
        ...prev.metrics,
        publicationsCount: 0,
      },
    }));
    setEditingPublication(null);
  };

  const handleRestoreSamplePublications = () => {
    setProfile((prev) => ({
      ...prev,
      publications: INITIAL_RESEARCHER_PROFILE.publications,
      metrics: {
        ...prev.metrics,
        publicationsCount: INITIAL_RESEARCHER_PROFILE.publications.length,
      },
    }));
  };

  const handleSaveEngagement = (item: EngagementItem) => {
    setProfile((prev) => {
      const exists = prev.engagements.some((e) => e.id === item.id);
      if (exists) {
        return {
          ...prev,
          engagements: prev.engagements.map((e) => (e.id === item.id ? item : e)),
        };
      }
      return {
        ...prev,
        engagements: [item, ...prev.engagements],
      };
    });
    setEditingEngagement(null);
  };

  const handleUpdateEngagementPhotos = (engagementId: string, newPhotos: string[]) => {
    setProfile((prev) => ({
      ...prev,
      engagements: prev.engagements.map((e) =>
        e.id === engagementId ? { ...e, photos: newPhotos } : e
      ),
    }));
  };

  const handleDeleteEngagement = (engagementId: string) => {
    setProfile((prev) => ({
      ...prev,
      engagements: prev.engagements.filter((e) => e.id !== engagementId),
    }));
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

  const handleSelectTopicFromInterests = (topicId: string) => {
    setSelectedTopicId(topicId);
    const pubSection = document.getElementById('publications');
    if (pubSection) {
      pubSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPublications = () => {
    const pubSection = document.getElementById('publications');
    if (pubSection) {
      pubSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCV = () => {
    if (profile.links.cvUrl.startsWith('http')) {
      window.open(profile.links.cvUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const cvSection = document.getElementById('academic-cv');
    if (cvSection) {
      cvSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 3-Zone Top Bar Navigation Contract */}
      <Navbar
        profile={profile}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Editorial Scholar Hero with Photo Upload & Verified Socials */}
        <HeroSection
          profile={profile}
          onExplorePublications={handleScrollToPublications}
          onViewCV={handleScrollToCV}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Recent News & Doctoral Milestones */}
        <NewsSection news={profile.news} />

        {/* Research Interests & Foundational Questions */}
        <ResearchInterestsSection
          interests={profile.interests}
          selectedTopicId={selectedTopicId}
          onSelectTopic={handleSelectTopicFromInterests}
        />

        {/* Integrated Publications List with Filtering, Search & BibTeX */}
        <PublicationsSection
          publications={profile.publications}
          interests={profile.interests}
          researcherName={profile.name}
          selectedTopicId={selectedTopicId}
          onClearTopicFilter={() => setSelectedTopicId(null)}
          onSelectTopicFilter={(topicId) => setSelectedTopicId(topicId)}
          onOpenBibtexModal={(pub) => setSelectedBibtexPub(pub)}
          onOpenAddPublication={() => {
            setEditingPublication(null);
            setIsAddPubModalOpen(true);
          }}
          onEditPublication={(pub) => {
            setEditingPublication(pub);
            setIsAddPubModalOpen(true);
          }}
          onDeletePublication={handleDeletePublication}
          onClearAllPublications={handleClearAllPublications}
          onRestoreSamplePublications={handleRestoreSamplePublications}
        />

        {/* Scientific Engagement, Conference Presentations & Lab Visits with Photo Gallery */}
        <EngagementsSection
          engagements={profile.engagements}
          onOpenAddModal={() => {
            setEditingEngagement(null);
            setIsAddEngModalOpen(true);
          }}
          onOpenEditModal={(item) => {
            setEditingEngagement(item);
            setIsAddEngModalOpen(true);
          }}
          onDeleteEngagement={handleDeleteEngagement}
          onUpdateEngagementPhotos={handleUpdateEngagementPhotos}
          onOpenPhotoLightbox={handleOpenPhotoLightbox}
        />

        {/* Full Academic Curriculum Vitae (Printable & Downloadable) */}
        <CVSection
          profile={profile}
          onEditCV={() => setIsEditModalOpen(true)}
        />

        {/* Contact, Lab Affiliation & Academic Inquiries */}
        <ContactSection profile={profile} />
      </main>

      {/* Editorial Footer */}
      <Footer
        profile={profile}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* BibTeX & Citation Modal */}
      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />

      {/* Profile & Academic Links Customizer Modal with Photo Upload */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onResetToDefault={handleResetToDefault}
      />

      {/* Add / Import Publication Modal */}
      <AddPublicationModal
        isOpen={isAddPubModalOpen}
        onClose={() => {
          setIsAddPubModalOpen(false);
          setEditingPublication(null);
        }}
        onSave={handleSavePublication}
        onDelete={handleDeletePublication}
        initialPublication={editingPublication}
        interests={profile.interests}
        researcherName={profile.name}
      />

      {/* Add / Edit Engagement Modal with Photo Uploading */}
      <AddEngagementModal
        isOpen={isAddEngModalOpen}
        onClose={() => {
          setIsAddEngModalOpen(false);
          setEditingEngagement(null);
        }}
        onSave={handleSaveEngagement}
        onDelete={handleDeleteEngagement}
        initialItem={editingEngagement}
      />

      {/* Photo Lightbox Modal */}
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

    </div>
  );
}
