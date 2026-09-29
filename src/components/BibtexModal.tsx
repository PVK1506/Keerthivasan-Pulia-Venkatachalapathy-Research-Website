import React, { useState } from 'react';
import { X, Check, Copy, Download, BookOpen } from 'lucide-react';
import { Publication } from '../types/researcher';

interface BibtexModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({ publication, onClose }) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!publication) return null;

  // Generate APA citation text
  const generateApa = (pub: Publication) => {
    const authorStr = pub.authors.join(', ');
    const venueStr = pub.venue;
    const volStr = pub.volume ? ` ${pub.volume}` : '';
    const issueStr = pub.issue ? `(${pub.issue})` : '';
    const pagesStr = pub.pages ? `, ${pub.pages}` : '';
    const doiStr = pub.doi ? ` https://doi.org/${pub.doi}` : '';
    return `${authorStr} (${pub.year}). ${pub.title}. ${venueStr}${volStr}${issueStr}${pagesStr}.${doiStr}`;
  };

  // Generate IEEE citation text
  const generateIeee = (pub: Publication) => {
    const authorStr = pub.authors.join(', ');
    const venueStr = pub.venue;
    const volStr = pub.volume ? `vol. ${pub.volume}, ` : '';
    const issueStr = pub.issue ? `no. ${pub.issue}, ` : '';
    const pagesStr = pub.pages ? `pp. ${pub.pages}, ` : '';
    return `${authorStr}, "${pub.title}," in ${venueStr}, ${volStr}${issueStr}${pagesStr}${pub.year}.`;
  };

  const copyToClipboard = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const downloadBibFile = () => {
    const element = document.createElement('a');
    const file = new Blob([publication.bibtex], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${publication.id}.bib`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bibtex-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <h3 id="bibtex-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              Citation &amp; BibTeX
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Paper Info */}
          <div>
            <h4 className="font-serif font-medium text-slate-900 text-base leading-snug">
              {publication.title}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {publication.authors.join(' · ')} ({publication.year}) — <em>{publication.venue}</em>
            </p>
          </div>

          {/* Quick Copy APA / IEEE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Formatted Text Citations
              </span>
            </div>

            {/* APA */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 font-mono text-[10px] uppercase block mb-0.5">APA</span>
                <p className="leading-relaxed">{generateApa(publication)}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(generateApa(publication), 'apa')}
                className="shrink-0 p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors"
                title="Copy APA Citation"
              >
                {copiedFormat === 'apa' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* IEEE */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 font-mono text-[10px] uppercase block mb-0.5">IEEE</span>
                <p className="leading-relaxed">{generateIeee(publication)}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(generateIeee(publication), 'ieee')}
                className="shrink-0 p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors"
                title="Copy IEEE Citation"
              >
                {copiedFormat === 'ieee' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* BibTeX Code block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                BibTeX Entry
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadBibFile}
                  className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors px-2 py-1 rounded hover:bg-slate-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .bib</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(publication.bibtex, 'bibtex')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-amber-800 transition-colors px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
                >
                  {copiedFormat === 'bibtex' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy BibTeX</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-md overflow-x-auto selection:bg-amber-400 selection:text-slate-900 leading-relaxed border border-slate-800">
              {publication.bibtex}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
