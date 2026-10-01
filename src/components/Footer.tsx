import React from 'react';
import { ArrowUp, Globe } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';
import { GoogleScholarIcon, OrcidIcon, LinkedInIcon } from './AcademicBadges';

interface FooterProps {
  profile: ResearcherProfile;
  onOpenSyncModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenSyncModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white border-t border-slate-200 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Scholar name & affiliation */}
        <div className="text-center sm:text-left space-y-1">
          <div className="font-serif font-semibold text-slate-900 text-sm">
            {profile.name}
          </div>
          <p className="text-slate-500 text-xs">
            {profile.affiliation} · {profile.department}
          </p>
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} {profile.name}. All research content licensed under CC BY 4.0.
          </p>
        </div>

        {/* Center: Quick academic accounts links */}
        <div className="flex items-center gap-4 text-slate-600">
          <a
            href={profile.links.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
            title="Google Scholar Profile"
          >
            <GoogleScholarIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.links.orcid}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
            title={`ORCID: ${profile.links.orcidId}`}
          >
            <OrcidIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {onOpenSyncModal && (
            <button
              type="button"
              onClick={onOpenSyncModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
              title="View or copy published webpage URL with your data"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Published URL</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 p-1.5 rounded hover:bg-slate-100 transition-colors"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="hidden sm:inline">Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
