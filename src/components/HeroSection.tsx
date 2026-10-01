import React from 'react';
import {
  Building2,
  MapPin,
  GraduationCap,
  Quote,
  BookOpen,
} from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';
import { ScholarLinksBar } from './AcademicBadges';

interface HeroSectionProps {
  profile: ResearcherProfile;
  onExplorePublications: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onExplorePublications,
}) => {
  return (
    <section id="about" className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200/80 bg-slate-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Scholarly Dossier & Narrative (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Academic Status Eyebrow & Wordmark */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span>
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

            {/* Narrative Bio (Single Paragraph) */}
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
              
              {/* Scholar Portrait / Monogram */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
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

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
