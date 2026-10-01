import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  ExternalLink,
  FileText,
  Code,
  Database,
  Quote,
  Presentation,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Publication } from '../types/researcher';

interface PublicationsSectionProps {
  publications: Publication[];
  researcherName: string;
  onOpenBibtexModal: (publication: Publication) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  researcherName,
  onOpenBibtexModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'journal' | 'conference' | 'preprint'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'citations-desc'>('year-desc');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  // Unique publication years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year)));
    return years.sort((a, b) => b - a);
  }, [publications]);

  // Toggle abstract preview
  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter and sort publications
  const filteredPublications = useMemo(() => {
    return publications
      .filter((pub) => {
        if (typeFilter !== 'all' && pub.venueType !== typeFilter) {
          return false;
        }

        if (yearFilter !== 'all' && pub.year.toString() !== yearFilter) {
          return false;
        }

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesTitle = pub.title.toLowerCase().includes(q);
          const matchesAuthors = pub.authors.some((author) => author.toLowerCase().includes(q));
          const matchesVenue = pub.venue.toLowerCase().includes(q);
          const matchesAbstract = pub.abstract.toLowerCase().includes(q);

          if (!matchesTitle && !matchesAuthors && !matchesVenue && !matchesAbstract) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'year-desc') {
          return b.year - a.year || b.citations - a.citations;
        }
        if (sortBy === 'year-asc') {
          return a.year - b.year;
        }
        if (sortBy === 'citations-desc') {
          return b.citations - a.citations || b.year - a.year;
        }
        return 0;
      });
  }, [publications, typeFilter, yearFilter, sortBy, searchQuery]);

  // Export all filtered publications to BibTeX file
  const exportAllBibtex = () => {
    const combinedBibtex = filteredPublications.map((p) => p.bibtex).join('\n\n');
    const blob = new Blob([combinedBibtex], { type: 'text/plain;charset=utf-8' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `${researcherName.replace(/\s+/g, '_')}_publications.bib`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to format authors list highlighting researcher's name
  const renderAuthorList = (authors: string[]) => {
    const nameParts = researcherName.toLowerCase().split(/\s+/).filter(Boolean);
    const lastNamePart = nameParts[nameParts.length - 1] || '';

    return authors.map((author, index) => {
      const lowerAuthor = author.toLowerCase();
      const isResearcher =
        lowerAuthor.includes(lastNamePart) ||
        lowerAuthor.includes('vasan') ||
        lowerAuthor.includes('keerthivasan') ||
        nameParts.some((part) => part.length > 2 && lowerAuthor.includes(part));

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
        
        {/* Section Heading & Download Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
              Peer-Reviewed Works &amp; Preprints
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
              Publications &amp; Manuscripts
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Selected conference proceedings, journal articles, and theoretical preprints in machine learning and network science.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={exportAllBibtex}
              disabled={publications.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs disabled:opacity-40"
              title="Export current list to .bib format"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export BibTeX (.bib)</span>
            </button>
          </div>
        </div>

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

          {/* Filter Bar */}
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
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="year-desc">Newest First</option>
                  <option value="citations-desc">Most Cited</option>
                  <option value="year-asc">Oldest First</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* Publications List */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200/90 rounded-lg p-6">
            <p className="text-sm font-medium text-slate-600">No publications matched your filter criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setYearFilter('all');
              }}
              className="mt-3 text-xs text-amber-800 hover:text-amber-950 underline font-medium"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub) => {
              const isExpanded = expandedAbstracts[pub.id];

              return (
                <article
                  key={pub.id}
                  className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-2xs"
                >
                  {/* Metadata header */}
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
                          <Code className="w-3.5 h-3.5" />
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
                          <Database className="w-3.5 h-3.5" />
                          <span>Dataset</span>
                        </a>
                      )}

                      {/* Presentation Slides */}
                      {pub.slidesUrl && (
                        <a
                          href={pub.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-950"
                        >
                          <Presentation className="w-3.5 h-3.5" />
                          <span>Slides</span>
                        </a>
                      )}
                    </div>

                    {/* Cite / BibTeX button */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenBibtexModal(pub)}
                        className="inline-flex items-center gap-1 px-3 py-1 font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors shadow-2xs"
                      >
                        <Quote className="w-3 h-3 text-slate-600" />
                        <span>Cite / BibTeX</span>
                      </button>
                    </div>

                  </div>

                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
