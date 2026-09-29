import React, { useRef } from 'react';
import { MapPin, Building2, BookOpen, Quote, Award, Camera, Trash2, GraduationCap, Sparkles } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';
import { ScholarLinksBar } from './AcademicBadges';

interface HeroSectionProps {
  profile: ResearcherProfile;
  onExplorePublications: () => void;
  onViewCV?: () => void;
  onUpdateAvatar: (avatarUrl: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onExplorePublications,
  onUpdateAvatar,
}) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onUpdateAvatar(base64);
      }
    };
    reader.readAsDataURL(file);

    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Editorial Bio & Affiliation (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Affiliation Header for Research Scholar */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                  {profile.title}
                </span>
                <span aria-hidden="true">·</span>
                <span>{profile.department}</span>
                {profile.researchStage && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-600">{profile.researchStage}</span>
                  </>
                )}
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.15]">
                {profile.name}
              </h1>

              {/* Research Scholar Advisor & Institution Lockup */}
              <div className="mt-3.5 space-y-1.5 text-sm text-slate-700">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Advised by:</span>
                  </div>
                  {profile.advisorUrl ? (
                    <a
                      href={profile.advisorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-900 underline underline-offset-2 hover:text-amber-950 font-semibold"
                    >
                      {profile.advisor}
                    </a>
                  ) : (
                    <span className="font-semibold">{profile.advisor}</span>
                  )}
                  {profile.coAdvisor && (
                    <span className="text-slate-500 text-xs">
                      (Co-Advised by: <strong>{profile.coAdvisor}</strong>)
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{profile.affiliation}</span>
                  </div>
                  <span aria-hidden="true" className="text-slate-300 hidden sm:inline">/</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Mission Statement Quote Box */}
            <div className="p-4 sm:p-5 bg-white border-l-3 border-amber-600 rounded-r-md border-y border-r border-slate-200/90 shadow-2xs">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-700/60 shrink-0 mt-0.5" />
                <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed">
                  "{profile.researchStatement}"
                </p>
              </div>
            </div>

            {/* Narrative Bio (Paragraph 1) */}
            <div className="space-y-3.5 text-slate-700 leading-relaxed text-sm sm:text-base">
              {profile.bio.length > 0 && <p>{profile.bio[0]}</p>}
            </div>

            {/* Academic & Professional Profile Links */}
            <div className="pt-2">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                Scholarly Profiles &amp; Verified Accounts
              </h2>
              <ScholarLinksBar links={profile.links} />
            </div>

            {/* Action buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExplorePublications}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 active:scale-[0.99] transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-slate-200" />
                <span>Browse Publications ({profile.publications.length})</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-xs"
              >
                <span>Contact &amp; Collaborations</span>
              </a>
            </div>

          </div>

          {/* Scholar Identity & Citation Rigor Panel (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-xs space-y-6">
              
              {/* Hidden file input for avatar photo upload */}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />

              {/* Scholar Portrait / Monogram with direct upload option */}
              <div className="flex flex-col items-center text-center">
                <div className="relative group mb-3">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-28 h-28 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-slate-900 text-white flex flex-col items-center justify-center font-serif border-2 border-amber-600/30 shadow-xs">
                      <span className="text-2xl font-bold tracking-tight">KV</span>
                      <span className="text-[10px] tracking-widest uppercase text-amber-200 font-sans mt-0.5">Scholar</span>
                    </div>
                  )}

                  {/* Hover upload trigger overlay */}
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-medium"
                    title="Upload profile picture from device"
                  >
                    <Camera className="w-5 h-5 mb-0.5" />
                    <span>Upload Photo</span>
                  </button>
                </div>

                {/* Direct photo controls */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <Camera className="w-3 h-3 text-slate-500" />
                    <span>{profile.avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                  </button>
                  {profile.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => onUpdateAvatar('')}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-800 px-1.5 py-0.5 rounded hover:bg-rose-50 transition-colors"
                      title="Remove profile picture"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                
                <h3 className="font-serif font-semibold text-lg text-slate-900">{profile.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">{profile.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{profile.labName}</p>

                {profile.jobMarketStatus && (
                  <span className="inline-block mt-2.5 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 leading-tight">
                    ✨ {profile.jobMarketStatus}
                  </span>
                )}
              </div>

              {/* Quantitative Scholarly Metrics (Tabular Rigor) */}
              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scholar Metrics</span>
                  <a
                    href={profile.links.googleScholar}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Google Scholar &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-medium">Citations</div>
                    <div className="text-2xl font-semibold font-mono tabular-nums text-slate-900 mt-0.5">
                      {profile.metrics.totalCitations.toLocaleString()}+
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-medium">h-index</div>
                    <div className="text-2xl font-semibold font-mono tabular-nums text-slate-900 mt-0.5">
                      {profile.metrics.hIndex}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-medium">i10-index</div>
                    <div className="text-2xl font-semibold font-mono tabular-nums text-slate-900 mt-0.5">
                      {profile.metrics.i10Index}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-medium">Papers</div>
                    <div className="text-2xl font-semibold font-mono tabular-nums text-slate-900 mt-0.5">
                      {profile.publications.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Scholar Milestones / Highlights Summary */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  <span>ICML 2026 &amp; NeurIPS 2025 Oral Author</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  <span>ACM SIGKDD Student Travel Awardee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  <span>Visiting Fellow @ Max Planck Institute (MPI MiS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  <span>Graduate Teaching Assistant (CS 8420)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
