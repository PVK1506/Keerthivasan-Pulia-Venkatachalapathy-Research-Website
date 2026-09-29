import React, { useState } from 'react';
import { FileText, SlidersHorizontal, ExternalLink, Menu, X } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';

interface NavbarProps {
  profile: ResearcherProfile;
  onOpenEditModal: () => void;
  onOpenCVModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenEditModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education & Details', href: '#academic-education' },
    { label: 'Interests', href: '#interests' },
    { label: 'Publications', href: '#publications' },
    { label: 'Engagements', href: '#engagements' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#about" 
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 hover:text-slate-700 transition-colors whitespace-nowrap"
        >
          {profile.name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-slate-950 transition-colors py-1 relative hover:underline underline-offset-8 decoration-slate-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Contact</span>
          </a>

          <button
            type="button"
            onClick={onOpenEditModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 active:scale-[0.98] transition-all whitespace-nowrap shadow-xs"
            title="Edit researcher details, publications, or profile links"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-300" />
            <span>Customize</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-[#FBFBFA] px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <a
              href={profile.links.cvUrl}
              onClick={(e) => {
                if (profile.links.cvUrl.startsWith('#')) {
                  handleNavClick(e, profile.links.cvUrl);
                }
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-md"
            >
              <FileText className="w-4 h-4" />
              View Academic CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
