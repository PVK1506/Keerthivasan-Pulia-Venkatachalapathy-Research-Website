import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  FileText,
  Code2,
  Database,
  Quote,
  ChevronDown,
  ChevronUp,
  Download,
  Plus,
  SlidersHorizontal,
  Bookmark,
  Pencil,
  Trash2,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { Publication, ResearchInterest } from '../types/researcher';
import { ConfirmDialogModal } from './ConfirmDialogModal';

interface PublicationsSectionProps {
  publications: Publication[];
  researcherName: string;
  onOpenBibtexModal: (pub: Publication) => void;
  onOpenAddPublication: () => void;
  onEditPublication: (pub: Publication) => void;
  onDeletePublication: (id: string) => void;
  onClearAllPublications: () => void;
  onRestoreSamplePublications?: () => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  researcherName,
  onOpenBibtexModal,
  onOpenAddPublication,
  onEditPublication,
  onDeletePublication,
  onClearAllPublications,
  onRestoreSamplePublications,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'journal' | 'conference' | 'preprint'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  // In-app confirmation dialog state (no window.confirm)
  const [pubToDelete, setPubToDelete] = useState<Publication | null>(null);
  const [showClearAllDialog, setShowClearAllDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleConfirmDeleteSingle = () => {
    if (pubToDelete) {
      const title = pubToDelete.title;
      onDeletePublication(pubToDelete.id);
      setPubToDelete(null);
      showToast(`Removed "${title.length > 50 ? title.substring(0, 50) + '...' : title}" from profile.`);
    }
  };

  const handleConfirmClearAll = () => {
    onClearAllPublications();
    setShowClearAllDialog(false);
    showToast('All publications cleared. You can now add your real papers or restore samples.');
  };

  // Collect available unique years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
    return years;
  }, [publications]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter & sort logic
  const filteredPublications = useMemo(() => {
    return publications
      .filter((pub) => {
        // Type filter
        if (typeFilter !== 'all' && pub.venueType !== typeFilter) {
          return false;
        }

        // Year filter
        if (yearFilter !== 'all' && pub.year.toString() !== yearFilter) {
          return false;
        }

        // Full text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = pub.title.toLowerCase().includes(q);
          const matchesAuthors = pub.authors.some((a) => a.toLowerCase().includes(q));
          const matchesVenue = pub.venue.toLowerCase().includes(q);
          const matchesAbstract = pub.abstract.toLowerCase().includes(q);
          if (!matchesTitle && !matchesAuthors && !matchesVenue && !matchesAbstract) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'citations') {
          return b.citations - a.citations;
        }
        return b.year - a.year;
      });
  }, [publications, typeFilter, yearFilter, searchQuery, sortBy]);

  // Export full bibliography as .bib
  const exportAllBibtex = () => {
    const allBib = filteredPublications.map((p) => p.bibtex).join('\n\n');
    const blob = new Blob([allBib], { type: 'text/plain' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `${researcherName.replace(/\s+/g, '_')}_publications.bib`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to format authors list highlighting researcher's name
  const renderAuthorList = (authors: string[]) => {
    const lastNamePart = researcherName.split(' ').pop()?.toLowerCase() || '';

    return authors.map((author, index) => {
      const isResearcher =
        author.toLowerCase().includes(lastNamePart) ||
        author.toLowerCase().includes('vasan');

      return (
        <React.Fragment key={index}>
          <span className={isResearcher ? 'font-bold text-slate-950 underline decoration-slate-300' : 'text-slate-700'}>
            {author}
          </span>
          {index < authors.length - 1 && <span className="text-slate-400">, </span>}
        </React.Fragment>
      );
    });
  };

  return (
    <section id="publications" className="py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
              Peer-Reviewed Scholarly Output
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
              Integrated Publication List
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Showing <strong className="font-mono tabular-nums text-slate-900">{filteredPublications.length}</strong> of{' '}
              <strong className="font-mono tabular-nums text-slate-900">{publications.length}</strong> peer-reviewed papers, conference proceedings, and preprints.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {publications.length > 0 ? (
              <button
                type="button"
                onClick={() => setShowClearAllDialog(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors"
                title="Remove all publications to start with a blank list"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Papers</span>
              </button>
            ) : onRestoreSamplePublications ? (
              <button
                type="button"
                onClick={onRestoreSamplePublications}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Restore Sample Papers</span>
              </button>
            ) : null}

            <button
              type="button"
              onClick={exportAllBibtex}
              disabled={publications.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors disabled:opacity-40"
              title="Export current list to .bib format"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export BibTeX</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddPublication}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Publication</span>
            </button>
          </div>
        </div>

        {/* Action Feedback Toast */}
        {toastMessage && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-md flex items-center justify-between text-xs text-emerald-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-600 hover:text-emerald-950 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Filter Controls Bar */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, title, co-author (e.g. Miller, Lin), or venue (e.g. ICML, TPAMI)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Bar (Segmented Controls compliant with zero-pill rule for interactive buttons) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            
            {/* Type selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md text-xs font-medium">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  typeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Papers ({publications.length})
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('journal')}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  typeFilter === 'journal'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Journals
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('conference')}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  typeFilter === 'conference'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Conferences
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('preprint')}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  typeFilter === 'preprint'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Preprints
              </button>
            </div>

            {/* Dropdown Filters: Year, Sort */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              
              {/* Year Select */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Year:</span>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Select */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="year">Newest First</option>
                  <option value="citations">Most Cited</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* Publication Cards List */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg p-8">
            <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-medium text-slate-900">No publications found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              No papers matched your search query or filter criteria. Try resetting filters or clearing search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setYearFilter('all');
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub) => {
              const isExpanded = !!expandedAbstracts[pub.id];

              return (
                <article
                  key={pub.id}
                  className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-2xs"
                >
                  {/* Clean unboxed metadata header */}
                  <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-3 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums font-semibold text-slate-900">{pub.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize font-medium text-slate-700">{pub.venueType}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono tabular-nums text-slate-600">
                      <span>Citations: <strong className="text-slate-900">{pub.citations}</strong></span>
                    </div>
                  </div>

                  {/* Publication Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
                    {pub.doi ? (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-800 hover:underline transition-colors"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>

                  {/* Authors */}
                  <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                    {renderAuthorList(pub.authors)}
                  </div>

                  {/* Venue and Publication Coordinates */}
                  <div className="mt-1.5 text-xs text-slate-600 italic">
                    {pub.venue}
                    {pub.volume && `, Vol. ${pub.volume}`}
                    {pub.issue && `(${pub.issue})`}
                    {pub.pages && `, pp. ${pub.pages}`}
                  </div>

                  {/* Expandable Abstract Preview */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded">
                      <span className="font-semibold text-slate-900 block mb-1">Abstract:</span>
                      {pub.abstract}
                    </div>
                  )}

                  {/* Action Link Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    
                    {/* Primary paper resource links */}
                    <div className="flex flex-wrap items-center gap-3">
                      
                      {/* Abstract toggle button */}
                      <button
                        type="button"
                        onClick={() => toggleAbstract(pub.id)}
                        className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-950 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Abstract' : 'View Abstract'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {/* DOI */}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
                        >
                          <span>DOI</span>
                          <ExternalLink className="w-3 h-3 text-blue-500" />
                        </a>
                      )}

                      {/* PDF */}
                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-amber-800 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </a>
                      )}

                      {/* Code Repository */}
                      {pub.codeUrl && (
                        <a
                          href={pub.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-950"
                        >
                          <Code2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Code</span>
                        </a>
                      )}

                      {/* Dataset */}
                      {pub.datasetUrl && (
                        <a
                          href={pub.datasetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-950"
                        >
                          <Database className="w-3.5 h-3.5 text-slate-500" />
                          <span>Dataset</span>
                        </a>
                      )}
                    </div>

                    {/* Action buttons: Cite, Edit, Remove */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenBibtexModal(pub)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                      >
                        <Quote className="w-3 h-3 text-slate-600" />
                        <span>Cite / BibTeX</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditPublication(pub)}
                        className="inline-flex items-center gap-1 px-2 py-1 font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                        title="Edit publication details"
                      >
                        <Pencil className="w-3 h-3 text-slate-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPubToDelete(pub)}
                        className="inline-flex items-center gap-1 px-2 py-1 font-medium text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200/80 transition-colors"
                        title="Remove this publication"
                      >
                        <Trash2 className="w-3 h-3 text-rose-500" />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>

                </article>
              );
            })}
          </div>
        )}

        {/* Confirmation Modal: Delete Single Publication */}
        <ConfirmDialogModal
          isOpen={!!pubToDelete}
          title="Remove Publication"
          message={`Are you sure you want to remove "${pubToDelete?.title}" from your profile? This entry will be permanently deleted from your publication list and citation counts will update accordingly.`}
          confirmLabel="Yes, Remove Paper"
          cancelLabel="Cancel"
          confirmVariant="danger"
          onConfirm={handleConfirmDeleteSingle}
          onCancel={() => setPubToDelete(null)}
        />

        {/* Confirmation Modal: Clear All Publications */}
        <ConfirmDialogModal
          isOpen={showClearAllDialog}
          title="Clear All Publications"
          message="Are you sure you want to remove all publications from your profile? This will clear the entire list so you can enter your own real papers. You can always restore the sample publications at any time using the 'Restore Sample Papers' button."
          confirmLabel="Yes, Clear All Papers"
          cancelLabel="Cancel"
          confirmVariant="danger"
          onConfirm={handleConfirmClearAll}
          onCancel={() => setShowClearAllDialog(false)}
        />

      </div>
    </section>
  );
};
