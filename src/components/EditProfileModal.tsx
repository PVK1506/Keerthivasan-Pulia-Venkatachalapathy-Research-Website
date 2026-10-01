import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw, Link2, User, BookOpen, ExternalLink, HelpCircle, FileText, Trash2 } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';
import { GoogleScholarIcon, OrcidIcon, LinkedInIcon } from './AcademicBadges';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ResearcherProfile;
  onSave: (updated: ResearcherProfile) => void;
  onResetToDefault: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'publications' | 'metrics'>('links');
  const [formData, setFormData] = useState<ResearcherProfile>(profile);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [pubSearchTerm, setPubSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(profile);
      setConfirmingReset(false);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleRemovePubFromForm = (pubId: string) => {
    const updatedPubs = formData.publications.filter((p) => p.id !== pubId);
    setFormData({
      ...formData,
      publications: updatedPubs,
      metrics: {
        ...formData.metrics,
        publicationsCount: updatedPubs.length,
      },
    });
  };

  const handleClearAllPubsFromForm = () => {
    setFormData({
      ...formData,
      publications: [],
      metrics: {
        ...formData.metrics,
        publicationsCount: 0,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-modal-title"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 id="edit-profile-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              Customize Research Profile
            </h3>
            <p className="text-xs text-slate-500">
              Update your academic identity, verified profile URLs, Google Scholar, ORCID, and CV link.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'links'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Academic Links &amp; Accounts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Identity &amp; Affiliations</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('publications')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'publications'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Manage Publications ({formData.publications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'metrics'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Metrics &amp; Statement</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1 text-xs">
          
          {/* TAB 1: ACADEMIC LINKS & ACCOUNTS */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="bg-amber-50/60 border border-amber-200 p-3 rounded text-amber-900 text-xs">
                Enter your real academic and professional account links below. These will update the header, hero, and contact buttons across the entire website.
              </div>

              {/* Google Scholar Profile */}
              <div>
                <label htmlFor="editGoogleScholar" className="flex items-center gap-1.5 font-medium text-slate-800 mb-1">
                  <GoogleScholarIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Scholar Profile URL *</span>
                </label>
                <input
                  id="editGoogleScholar"
                  type="url"
                  required
                  value={formData.links.googleScholar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, googleScholar: e.target.value }
                    })
                  }
                  placeholder="https://scholar.google.com/citations?user=..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  e.g. https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID
                </span>
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label htmlFor="editLinkedin" className="flex items-center gap-1.5 font-medium text-slate-800 mb-1">
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn Profile URL *</span>
                </label>
                <input
                  id="editLinkedin"
                  type="url"
                  required
                  value={formData.links.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, linkedin: e.target.value }
                    })
                  }
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* ORCID Account & ORCID iD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editOrcidId" className="flex items-center gap-1.5 font-medium text-slate-800 mb-1">
                    <OrcidIcon className="w-3.5 h-3.5" />
                    <span>ORCID iD Identifier *</span>
                  </label>
                  <input
                    id="editOrcidId"
                    type="text"
                    required
                    value={formData.links.orcidId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: {
                          ...formData.links,
                          orcidId: e.target.value,
                          orcid: e.target.value.startsWith('http')
                            ? e.target.value
                            : `https://orcid.org/${e.target.value.replace(/^orcid\.org\//, '')}`
                        }
                      })
                    }
                    placeholder="0000-0002-8419-7231"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editOrcidUrl" className="block font-medium text-slate-800 mb-1">
                    Full ORCID URL *
                  </label>
                  <input
                    id="editOrcidUrl"
                    type="url"
                    required
                    value={formData.links.orcid}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: { ...formData.links, orcid: e.target.value }
                      })
                    }
                    placeholder="https://orcid.org/0000-0002-8419-7231"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Email & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editEmail" className="block font-medium text-slate-800 mb-1">
                    Primary Academic Email *
                  </label>
                  <input
                    id="editEmail"
                    type="email"
                    required
                    value={formData.links.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: { ...formData.links, email: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editGithub" className="block font-medium text-slate-800 mb-1">
                    GitHub Profile (optional)
                  </label>
                  <input
                    id="editGithub"
                    type="url"
                    value={formData.links.github || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: { ...formData.links, github: e.target.value }
                      })
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IDENTITY & AFFILIATIONS */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editName" className="block font-medium text-slate-800 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="editName"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. K. Vasan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editTitle" className="block font-medium text-slate-800 mb-1">
                    Academic Position / Role *
                  </label>
                  <input
                    id="editTitle"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Ph.D. Research Scholar / Doctoral Candidate"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editAdvisor" className="block font-medium text-slate-800 mb-1">
                    Primary Advisor (Professor / PI) *
                  </label>
                  <input
                    id="editAdvisor"
                    type="text"
                    required
                    value={formData.advisor || ''}
                    onChange={(e) => setFormData({ ...formData, advisor: e.target.value })}
                    placeholder="e.g. Prof. David K. Miller"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editAdvisorUrl" className="block font-medium text-slate-800 mb-1">
                    Advisor Website / Profile URL (optional)
                  </label>
                  <input
                    id="editAdvisorUrl"
                    type="url"
                    value={formData.advisorUrl || ''}
                    onChange={(e) => setFormData({ ...formData, advisorUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editCoAdvisor" className="block font-medium text-slate-800 mb-1">
                    Co-Advisor (optional)
                  </label>
                  <input
                    id="editCoAdvisor"
                    type="text"
                    value={formData.coAdvisor || ''}
                    onChange={(e) => setFormData({ ...formData, coAdvisor: e.target.value })}
                    placeholder="e.g. Prof. Elena Rostova"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editStage" className="block font-medium text-slate-800 mb-1">
                    Doctoral Stage / Candidacy
                  </label>
                  <input
                    id="editStage"
                    type="text"
                    value={formData.researchStage || ''}
                    onChange={(e) => setFormData({ ...formData, researchStage: e.target.value })}
                    placeholder="e.g. Ph.D. Candidate (Post-Comprehensive / Thesis Stage)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="editJobMarket" className="block font-medium text-slate-800 mb-1">
                  Current Academic / Career Status
                </label>
                <input
                  id="editJobMarket"
                  type="text"
                  value={formData.jobMarketStatus || ''}
                  onChange={(e) => setFormData({ ...formData, jobMarketStatus: e.target.value })}
                  placeholder="e.g. Open to Research Internships & Postdoctoral Fellowships"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editAffiliation" className="block font-medium text-slate-800 mb-1">
                    Institution / University *
                  </label>
                  <input
                    id="editAffiliation"
                    type="text"
                    required
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editDepartment" className="block font-medium text-slate-800 mb-1">
                    Department
                  </label>
                  <input
                    id="editDepartment"
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editLab" className="block font-medium text-slate-800 mb-1">
                    Laboratory / Research Group
                  </label>
                  <input
                    id="editLab"
                    type="text"
                    value={formData.labName}
                    onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editLocation" className="block font-medium text-slate-800 mb-1">
                    Office / Physical Location
                  </label>
                  <input
                    id="editLocation"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="editBio" className="block font-medium text-slate-800 mb-1">
                  Narrative Bio (Paragraph 1)
                </label>
                <textarea
                  id="editBio"
                  rows={3}
                  value={formData.bio[0] || ''}
                  onChange={(e) => {
                    const newBio = [...formData.bio];
                    newBio[0] = e.target.value;
                    setFormData({ ...formData, bio: newBio });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                ></textarea>
              </div>

              <div>
                <label className="block font-medium text-slate-800 mb-1">
                  Avatar / Headshot Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    id="editAvatarUrl"
                    type="text"
                    value={formData.avatarUrl || ''}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="Paste image URL (https://...) or upload file below"
                    className="flex-1 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />

                  <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 cursor-pointer whitespace-nowrap transition-colors">
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const b64 = ev.target?.result as string;
                            if (b64) {
                              setFormData({ ...formData, avatarUrl: b64 });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarUrl: '' })}
                      className="text-xs text-rose-600 hover:text-rose-800 underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Select any photo from your local files (JPG, PNG) or leave blank for a classic academic monogram.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-3 rounded">
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs">
                    Your Publications ({formData.publications.length})
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Remove already given sample publications, delete individual papers, or clear all to enter your real research papers.
                  </p>
                </div>

                {formData.publications.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllPubsFromForm}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All Papers</span>
                  </button>
                )}
              </div>

              {/* Search publications within modal */}
              {formData.publications.length > 3 && (
                <div>
                  <input
                    type="text"
                    value={pubSearchTerm}
                    onChange={(e) => setPubSearchTerm(e.target.value)}
                    placeholder="Filter publications by title or venue..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              )}

              {/* Publications List */}
              {formData.publications.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-slate-200 rounded p-6">
                  <p className="text-xs text-slate-500 mb-2">No publications currently listed.</p>
                  <p className="text-[11px] text-slate-400">
                    Use the "Add Publication" button on the webpage or paste BibTeX to add your own papers.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[45vh] overflow-y-auto pr-1">
                  {formData.publications
                    .filter((p) =>
                      pubSearchTerm.trim()
                        ? p.title.toLowerCase().includes(pubSearchTerm.toLowerCase()) ||
                          p.venue.toLowerCase().includes(pubSearchTerm.toLowerCase())
                        : true
                    )
                    .map((pub) => (
                      <div
                        key={pub.id}
                        className="p-3 bg-white border border-slate-200 rounded-md flex items-start justify-between gap-3 hover:border-slate-300 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                            <span className="font-semibold text-slate-800">{pub.year}</span>
                            <span>·</span>
                            <span className="capitalize">{pub.venueType}</span>
                            <span>·</span>
                            <span>{pub.venue}</span>
                          </div>
                          <h5 className="font-medium text-slate-900 text-xs mt-0.5 leading-snug line-clamp-2">
                            {pub.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {pub.authors.join(', ')}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemovePubFromForm(pub.id)}
                          className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200/80 rounded hover:bg-rose-100 transition-colors"
                          title="Remove publication"
                        >
                          <Trash2 className="w-3 h-3 text-rose-500" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: METRICS & RESEARCH STATEMENT */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="editStatement" className="block font-medium text-slate-800 mb-1">
                  Research Mission Statement (Featured Quote) *
                </label>
                <textarea
                  id="editStatement"
                  rows={2}
                  required
                  value={formData.researchStatement}
                  onChange={(e) => setFormData({ ...formData, researchStatement: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-serif"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="editTotalCitations" className="block font-medium text-slate-800 mb-1">
                    Total Citations
                  </label>
                  <input
                    id="editTotalCitations"
                    type="number"
                    value={formData.metrics.totalCitations}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, totalCitations: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editHIndex" className="block font-medium text-slate-800 mb-1">
                    h-index
                  </label>
                  <input
                    id="editHIndex"
                    type="number"
                    value={formData.metrics.hIndex}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, hIndex: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="editI10Index" className="block font-medium text-slate-800 mb-1">
                    i10-index
                  </label>
                  <input
                    id="editI10Index"
                    type="number"
                    value={formData.metrics.i10Index}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, i10Index: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {confirmingReset ? (
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded">
                    <span className="text-xs text-rose-800 font-medium">Reset all profile data to default sample?</span>
                    <button
                      type="button"
                      onClick={() => {
                        onResetToDefault();
                        onClose();
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs"
                    >
                      Yes, Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingReset(false)}
                      className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmingReset(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Data to Sample Scholar</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 shadow-xs"
            >
              {showSavedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Profile Changes</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
