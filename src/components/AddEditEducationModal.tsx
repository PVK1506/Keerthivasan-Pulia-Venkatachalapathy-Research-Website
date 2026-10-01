import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Check } from 'lucide-react';
import { EducationItem } from '../types/researcher';

interface AddEditEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (edu: EducationItem) => void;
  initialItem?: EducationItem | null;
}

export const AddEditEducationModal: React.FC<AddEditEducationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
}) => {
  const [formData, setFormData] = useState({
    degree: '',
    field: '',
    institution: '',
    year: '',
    dissertation: '',
    advisor: '',
    honors: '',
  });

  useEffect(() => {
    if (initialItem) {
      setFormData({
        degree: initialItem.degree || '',
        field: initialItem.field || '',
        institution: initialItem.institution || '',
        year: initialItem.year || '',
        dissertation: initialItem.dissertation || '',
        advisor: initialItem.advisor || '',
        honors: initialItem.honors || '',
      });
    } else {
      setFormData({
        degree: '',
        field: '',
        institution: '',
        year: '',
        dissertation: '',
        advisor: '',
        honors: '',
      });
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.degree || !formData.institution) return;

    const item: EducationItem = {
      id: initialItem?.id || `edu-${Date.now()}`,
      degree: formData.degree.trim(),
      field: formData.field.trim() || formData.degree.trim(),
      institution: formData.institution.trim(),
      year: formData.year.trim(),
      dissertation: formData.dissertation.trim() || undefined,
      advisor: formData.advisor.trim() || undefined,
      honors: formData.honors.trim() || undefined,
    };

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edu-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-800" />
            <h3 id="edu-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              {initialItem ? 'Edit Education Degree' : 'Add Education Degree'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label htmlFor="eduDegree" className="block font-medium text-slate-800 mb-1">
              Degree &amp; Program *
            </label>
            <input
              id="eduDegree"
              type="text"
              required
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g. Ph.D. in Computer Science & Engineering"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="eduInstitution" className="block font-medium text-slate-800 mb-1">
                Institution / University *
              </label>
              <input
                id="eduInstitution"
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. Institute for Computational Systems"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
              />
            </div>

            <div>
              <label htmlFor="eduYear" className="block font-medium text-slate-800 mb-1">
                Year / Period *
              </label>
              <input
                id="eduYear"
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. 2022 – Present (Expected 2027)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="eduDissertation" className="block font-medium text-slate-800 mb-1">
              Dissertation / Thesis Title
            </label>
            <input
              id="eduDissertation"
              type="text"
              value={formData.dissertation}
              onChange={(e) => setFormData({ ...formData, dissertation: e.target.value })}
              placeholder="e.g. Topological Sheaf Neural Networks for Expressive Graph Learning"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          </div>

          <div>
            <label htmlFor="eduAdvisor" className="block font-medium text-slate-800 mb-1">
              Advisor(s) / Committee
            </label>
            <input
              id="eduAdvisor"
              type="text"
              value={formData.advisor}
              onChange={(e) => setFormData({ ...formData, advisor: e.target.value })}
              placeholder="e.g. Advised by Prof. David K. Miller"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          </div>

          <div>
            <label htmlFor="eduHonors" className="block font-medium text-slate-800 mb-1">
              Honors / Distinction
            </label>
            <input
              id="eduHonors"
              type="text"
              value={formData.honors}
              onChange={(e) => setFormData({ ...formData, honors: e.target.value })}
              placeholder="e.g. University Doctoral Fellowship, Magna Cum Laude"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
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
              <span>{initialItem ? 'Update Degree' : 'Save Degree'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
