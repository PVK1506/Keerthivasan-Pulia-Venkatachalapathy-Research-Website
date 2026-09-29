import React, { useState, useEffect } from 'react';
import { X, Plus, Sparkles, BookOpen, Trash2, Check } from 'lucide-react';
import { Publication, ResearchInterest } from '../types/researcher';

interface AddPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pub: Publication) => void;
  onDelete?: (id: string) => void;
  initialPublication?: Publication | null;
  interests: ResearchInterest[];
  researcherName: string;
}

export const AddPublicationModal: React.FC<AddPublicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialPublication,
  interests,
  researcherName,
}) => {
  const [mode, setMode] = useState<'form' | 'bibtex'>('form');
  const [bibtexInput, setBibtexInput] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    venue: '',
    venueType: 'conference' as Publication['venueType'],
    doi: '',
    pdfUrl: '',
    codeUrl: '',
    datasetUrl: '',
    slidesUrl: '',
    topicId: interests[0]?.id || 'graph-learning',
    abstract: '',
    citations: 0,
  });

  // Pre-fill or reset state when modal opens or initialPublication changes
  useEffect(() => {
    if (initialPublication) {
      setFormData({
        title: initialPublication.title || '',
        authors: initialPublication.authors ? initialPublication.authors.join(', ') : researcherName,
        year: initialPublication.year || new Date().getFullYear(),
        venue: initialPublication.venue || '',
        venueType: initialPublication.venueType || 'conference',
        doi: initialPublication.doi || '',
        pdfUrl: initialPublication.pdfUrl || '',
        codeUrl: initialPublication.codeUrl || '',
        datasetUrl: initialPublication.datasetUrl || '',
        slidesUrl: initialPublication.slidesUrl || '',
        topicId: initialPublication.topicId || (interests[0]?.id || 'graph-learning'),
        abstract: initialPublication.abstract || '',
        citations: initialPublication.citations || 0,
      });
      setBibtexInput(initialPublication.bibtex || '');
      setMode('form');
    } else {
      setFormData({
        title: '',
        authors: `${researcherName}, Co-Author Name`,
        year: new Date().getFullYear(),
        venue: '',
        venueType: 'conference',
        doi: '',
        pdfUrl: '',
        codeUrl: '',
        datasetUrl: '',
        slidesUrl: '',
        topicId: interests[0]?.id || 'graph-learning',
        abstract: '',
        citations: 0,
      });
      setBibtexInput('');
      setMode('form');
    }
  }, [initialPublication, isOpen, researcherName, interests]);

  if (!isOpen) return null;

  // Basic BibTeX parser helper
  const parseBibtex = (raw: string): Partial<Publication> => {
    const titleMatch = raw.match(/title\s*=\s*[{"]([^}"]+)[}"]/i);
    const authorMatch = raw.match(/author\s*=\s*[{"]([^}"]+)[}"]/i);
    const yearMatch = raw.match(/year\s*=\s*[{"]?(\d{4})[}"]?/i);
    const journalMatch = raw.match(/journal\s*=\s*[{"]([^}"]+)[}"]/i);
    const booktitleMatch = raw.match(/booktitle\s*=\s*[{"]([^}"]+)[}"]/i);
    const doiMatch = raw.match(/doi\s*=\s*[{"]([^}"]+)[}"]/i);
    const pagesMatch = raw.match(/pages\s*=\s*[{"]([^}"]+)[}"]/i);

    const authors = authorMatch ? authorMatch[1].split(/\s+and\s+/i) : [researcherName];
    const venue = journalMatch ? journalMatch[1] : (booktitleMatch ? booktitleMatch[1] : 'Conference Proceedings');
    const venueType: Publication['venueType'] = journalMatch ? 'journal' : 'conference';

    return {
      title: titleMatch ? titleMatch[1] : 'Untitled Research Paper',
      authors,
      year: yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear(),
      venue,
      venueType,
      doi: doiMatch ? doiMatch[1] : undefined,
      pages: pagesMatch ? pagesMatch[1] : undefined,
      abstract: 'Abstract extracted from publication entry.',
      bibtex: raw,
    };
  };

  const handleBibtexSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bibtexInput.trim()) return;

    const parsed = parseBibtex(bibtexInput);
    const pubToSave: Publication = {
      id: initialPublication?.id || `pub-${Date.now()}`,
      title: parsed.title || 'Untitled Publication',
      authors: parsed.authors || [researcherName],
      year: parsed.year || new Date().getFullYear(),
      venue: parsed.venue || 'Peer-Reviewed Conference',
      venueType: parsed.venueType || 'conference',
      doi: parsed.doi,
      pdfUrl: '#',
      codeUrl: '',
      abstract: parsed.abstract || 'Empirical and theoretical investigation presented at the conference.',
      citations: initialPublication?.citations || 0,
      topicId: interests[0]?.id || 'graph-learning',
      bibtex: bibtexInput.trim(),
    };

    onSave(pubToSave);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.venue) return;

    const authorsList = formData.authors
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const cleanBibtex = `@${formData.venueType === 'journal' ? 'article' : 'inproceedings'}{pub_${Date.now()},
  title={${formData.title}},
  author={${authorsList.join(' and ')}},
  ${formData.venueType === 'journal' ? 'journal' : 'booktitle'}={${formData.venue}},
  year={${formData.year}}${formData.doi ? `,\n  doi={${formData.doi}}` : ''}
}`;

    const pubToSave: Publication = {
      id: initialPublication?.id || `pub-${Date.now()}`,
      title: formData.title,
      authors: authorsList.length > 0 ? authorsList : [researcherName],
      year: Number(formData.year),
      venue: formData.venue,
      venueType: formData.venueType,
      doi: formData.doi || undefined,
      pdfUrl: formData.pdfUrl || undefined,
      codeUrl: formData.codeUrl || undefined,
      datasetUrl: formData.datasetUrl || undefined,
      slidesUrl: formData.slidesUrl || undefined,
      abstract: formData.abstract || 'Investigation into theoretical and applied computational methodologies.',
      citations: Number(formData.citations) || 0,
      topicId: formData.topicId,
      bibtex: initialPublication?.bibtex || cleanBibtex,
    };

    onSave(pubToSave);
    onClose();
  };

  const handleDelete = () => {
    if (!initialPublication || !onDelete) return;
    onDelete(initialPublication.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-pub-modal-title"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <h3 id="add-pub-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              {initialPublication ? 'Edit Publication Details' : 'Add New Publication'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (only when creating new) */}
        {!initialPublication && (
          <div className="px-6 pt-4 border-b border-slate-200 flex items-center gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode('form')}
              className={`pb-2.5 transition-colors border-b-2 ${
                mode === 'form'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Fill Publication Form
            </button>
            <button
              type="button"
              onClick={() => setMode('bibtex')}
              className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1 ${
                mode === 'bibtex'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Import via BibTeX</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {mode === 'bibtex' && !initialPublication ? (
            <form onSubmit={handleBibtexSubmit} className="space-y-4">
              <div>
                <label htmlFor="bibtexEntry" className="block font-medium text-slate-700 mb-1">
                  Paste Raw BibTeX Entry *
                </label>
                <textarea
                  id="bibtexEntry"
                  rows={8}
                  required
                  value={bibtexInput}
                  onChange={(e) => setBibtexInput(e.target.value)}
                  placeholder={`@article{vasan2026example,
  title={Scalable Representation Learning on Hypergraphs},
  author={Vasan, K. and Miller, D.},
  journal={IEEE Transactions on Knowledge and Data Engineering},
  year={2026}
}`}
                  className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-100 rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                ></textarea>
                <p className="text-[11px] text-slate-500 mt-1">
                  Titles, authors, years, and venue will be automatically parsed and indexed into your profile.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 shadow-xs"
                >
                  Import Paper
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="pubTitle" className="block font-medium text-slate-700 mb-1">
                  Paper Title *
                </label>
                <input
                  id="pubTitle"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Provably Expressive Higher-Order Graph Transformers"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-serif text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pubAuthors" className="block font-medium text-slate-700 mb-1">
                    Authors (comma separated) *
                  </label>
                  <input
                    id="pubAuthors"
                    type="text"
                    required
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    placeholder="e.g. Keerthivasan P V, Co-Author 1, Co-Author 2"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="pubYear" className="block font-medium text-slate-700 mb-1">
                    Publication Year *
                  </label>
                  <input
                    id="pubYear"
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pubVenue" className="block font-medium text-slate-700 mb-1">
                    Venue Name (Conference or Journal) *
                  </label>
                  <input
                    id="pubVenue"
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g. NeurIPS 2026 / Nature Machine Intelligence / arXiv"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="pubType" className="block font-medium text-slate-700 mb-1">
                    Venue Category
                  </label>
                  <select
                    id="pubType"
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="conference">Conference Proceedings</option>
                    <option value="journal">Peer-Reviewed Journal</option>
                    <option value="preprint">Preprint (arXiv / Tech Report)</option>
                    <option value="chapter">Book Chapter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pubTopic" className="block font-medium text-slate-700 mb-1">
                    Research Interest Topic
                  </label>
                  <select
                    id="pubTopic"
                    value={formData.topicId}
                    onChange={(e) => setFormData({ ...formData, topicId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    {interests.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pubDoi" className="block font-medium text-slate-700 mb-1">
                    DOI Identifier (optional)
                  </label>
                  <input
                    id="pubDoi"
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    placeholder="e.g. 10.1145/3643890"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="pubPdf" className="block font-medium text-slate-700 mb-1">
                    PDF URL (optional)
                  </label>
                  <input
                    id="pubPdf"
                    type="text"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="pubCode" className="block font-medium text-slate-700 mb-1">
                    Code Repo URL (optional)
                  </label>
                  <input
                    id="pubCode"
                    type="text"
                    value={formData.codeUrl}
                    onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="pubCitations" className="block font-medium text-slate-700 mb-1">
                    Citations Count
                  </label>
                  <input
                    id="pubCitations"
                    type="number"
                    value={formData.citations}
                    onChange={(e) => setFormData({ ...formData, citations: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pubAbstract" className="block font-medium text-slate-700 mb-1">
                  Abstract
                </label>
                <textarea
                  id="pubAbstract"
                  rows={3}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Summary of research problem, methodology, and empirical findings..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                ></textarea>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                {initialPublication && onDelete ? (
                  confirmingDelete ? (
                    <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">
                      <span className="text-xs text-rose-800 font-medium">Remove paper?</span>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs"
                      >
                        Yes, Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingDelete(false)}
                        className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Publication</span>
                    </button>
                  )
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-2">
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
                    <Check className="w-3.5 h-3.5" />
                    <span>{initialPublication ? 'Update Publication' : 'Save Publication'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
