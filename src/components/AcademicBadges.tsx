import React from 'react';
import { ExternalLink, Mail, Github, FileText } from 'lucide-react';
import { SocialLinks } from '../types/researcher';

// Custom SVG Icons for academic platforms
export const GoogleScholarIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.8 3.8v7.2L12 24l7.2-3.5v-7.2L24 9.5 12 0zm0 3.7 7.5 5.8-7.5 5.8-7.5-5.8L12 3.7z" />
  </svg>
);

export const OrcidIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 256 256" fill="currentColor">
    <path
      fill="#A6CE39"
      d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0z"
    />
    <path
      fill="#FFFFFF"
      d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 62.9c-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8 9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zM108.9 79.1h39.7c26.1 0 42.1 17.5 42.1 44.7 0 27.4-16 44.9-42.1 44.9h-39.7V79.1zm15.4 75.3h22.6c17.2 0 27.6-11.4 27.6-30.6 0-19-10.4-30.4-27.6-30.4h-22.6v61z"
    />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface ScholarLinksBarProps {
  links: SocialLinks;
  variant?: 'prominent' | 'compact' | 'footer';
  className?: string;
}

export const ScholarLinksBar: React.FC<ScholarLinksBarProps> = ({ links, variant = 'prominent', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <a
          href={links.googleScholar}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:text-blue-700 transition-colors"
          title="Google Scholar Profile"
        >
          <GoogleScholarIcon className="w-3.5 h-3.5 text-blue-600" />
          <span>Scholar</span>
        </a>
        <a
          href={links.orcid}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:text-[#A6CE39] transition-colors"
          title={`ORCID: ${links.orcidId}`}
        >
          <OrcidIcon className="w-3.5 h-3.5" />
          <span>ORCID</span>
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:text-blue-600 transition-colors"
          title="LinkedIn Profile"
        >
          <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
          <span>LinkedIn</span>
        </a>
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
            title="GitHub Code & Repos"
          >
            <Github className="w-3.5 h-3.5 text-slate-800" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Google Scholar Link */}
      <a
        href={links.googleScholar}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-blue-400 hover:text-blue-700 hover:shadow-xs transition-all"
      >
        <GoogleScholarIcon className="w-4 h-4 text-blue-600 group-hover:scale-105 transition-transform" />
        <span className="font-semibold">Google Scholar</span>
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
      </a>

      {/* ORCID Profile Link with iD */}
      <a
        href={links.orcid}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-emerald-400 hover:text-emerald-800 hover:shadow-xs transition-all"
      >
        <OrcidIcon className="w-4 h-4 group-hover:scale-105 transition-transform" />
        <span>ORCID: <strong className="font-mono text-slate-700 group-hover:text-emerald-900">{links.orcidId || 'Profile'}</strong></span>
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
      </a>

      {/* LinkedIn Profile Link */}
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-xs transition-all"
      >
        <LinkedInIcon className="w-4 h-4 text-[#0A66C2] group-hover:scale-105 transition-transform" />
        <span className="font-semibold">LinkedIn</span>
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
      </a>

      {/* Academic CV Link */}
      <a
        href={links.cvUrl}
        className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-amber-500 hover:text-amber-800 hover:shadow-xs transition-all"
      >
        <FileText className="w-4 h-4 text-amber-700 group-hover:scale-105 transition-transform" />
        <span className="font-semibold">Academic CV</span>
        <span className="text-[10px] text-slate-500 group-hover:text-amber-700">PDF / View</span>
      </a>

      {/* Email Link */}
      <a
        href={`mailto:${links.email}`}
        className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md hover:border-slate-400 hover:text-slate-950 hover:shadow-xs transition-all"
      >
        <Mail className="w-4 h-4 text-slate-600 group-hover:scale-105 transition-transform" />
        <span>{links.email}</span>
      </a>
    </div>
  );
};
