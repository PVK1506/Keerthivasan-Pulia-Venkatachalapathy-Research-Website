import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, UploadCloud, FileCode } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';

interface PublishSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ResearcherProfile;
  onImportProfile: (imported: ResearcherProfile) => void;
}

export const PublishSyncModal: React.FC<PublishSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  onImportProfile,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isOpen) return null;

  // The official published URL from environment metadata
  const publishedBaseUrl = 'https://ais-pre-ypyyz6dwb6rlnnumzj6ht3-962760668989.asia-east1.run.app';

  // Construct the standalone sync URL that carries the full profile in the fragment
  const profileJsonString = JSON.stringify(profile);
  const syncUrl = `${publishedBaseUrl}#data=${encodeURIComponent(profileJsonString)}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(syncUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 3000);
    } catch {
      // fallback
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(profileJsonString);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 3000);
    } catch {
      // fallback
    }
  };

  const handleApplyImport = () => {
    setImportError(null);
    try {
      const parsed = JSON.parse(importJsonText.trim());
      if (!parsed || typeof parsed !== 'object' || !parsed.name) {
        setImportError('Invalid profile data. Must be a valid JSON object with a "name" property.');
        return;
      }
      onImportProfile(parsed);
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      setImportError(`JSON parse error: ${err?.message || 'Invalid format'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sync-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-800" />
            <h3 id="sync-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              Published Webpage URL &amp; Data Sync
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

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-700 leading-relaxed">
          
          {/* Main Sync URL Box */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 text-sm">
                1-Click Published Webpage URL
              </span>
              <span className="text-[10px] text-amber-900 font-mono font-medium px-2 py-0.5 bg-amber-100/70 rounded">
                Preloaded With Your Data
              </span>
            </div>
            
            <p className="text-slate-600">
              Opening this URL transfers and saves all your updated publications, research experience, education degrees, and contact details directly onto the published domain:
            </p>

            <div className="p-2.5 bg-white border border-amber-200 rounded font-mono text-[11px] text-slate-800 break-all select-all">
              {syncUrl.slice(0, 85)}...
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied to Clipboard!' : 'Copy Webpage URL'}</span>
              </button>

              <a
                href={syncUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                <span>Open Published Webpage</span>
              </a>
            </div>
          </div>

          {/* Backup / Export Raw JSON */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-900 text-sm">
                  Export Data JSON
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyJson}
                className="text-xs text-amber-800 hover:text-amber-950 font-medium inline-flex items-center gap-1"
              >
                {copiedJson ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedJson ? 'JSON Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <p className="text-slate-600">
              Copy your entire profile as JSON. You can paste this to the AI assistant anytime to permanently bake it into the source files!
            </p>
          </div>

          {/* Manual JSON Import Area */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-900 text-sm">
                Import Profile Data
              </span>
            </div>
            <p className="text-slate-600">
              If you have previously exported your profile JSON, paste it here to apply it to this browser:
            </p>
            <textarea
              rows={3}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='Paste { "name": "Keerthivasan P V", ... } here'
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono text-[11px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            {importError && (
              <p className="text-rose-600 font-medium">{importError}</p>
            )}
            {importSuccess && (
              <p className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Profile imported successfully!</span>
              </p>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleApplyImport}
                disabled={!importJsonText.trim()}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors disabled:opacity-40"
              >
                Apply Data
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 flex justify-end bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
