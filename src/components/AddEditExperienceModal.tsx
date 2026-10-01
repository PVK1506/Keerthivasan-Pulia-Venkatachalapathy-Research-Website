import React, { useState, useEffect } from 'react';
import { X, Briefcase, Check } from 'lucide-react';
import { ExperienceItem } from '../types/researcher';

interface AddEditExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exp: ExperienceItem) => void;
  initialItem?: ExperienceItem | null;
}

export const AddEditExperienceModal: React.FC<AddEditExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
}) => {
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    department: '',
    period: '',
    description: '',
  });

  useEffect(() => {
    if (initialItem) {
      setFormData({
        role: initialItem.role || '',
        organization: initialItem.organization || '',
        department: initialItem.department || '',
        period: initialItem.period || '',
        description: initialItem.description || '',
      });
    } else {
      setFormData({
        role: '',
        organization: '',
        department: '',
        period: '',
        description: '',
      });
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.organization.trim()) return;

    const item: ExperienceItem = {
      id: initialItem?.id || `exp-${Date.now()}`,
      role: formData.role.trim(),
      organization: formData.organization.trim(),
      department: formData.department.trim() || undefined,
      period: formData.period.trim() || 'Present',
      description: formData.description.trim() || undefined,
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
        aria-labelledby="exp-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-800" />
            <h3 id="exp-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              {initialItem ? 'Edit Research Experience' : 'Add Research Experience'}
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
            <label htmlFor="expRole" className="block font-medium text-slate-800 mb-1">
              Role / Academic Appointment *
            </label>
            <input
              id="expRole"
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Visiting Research Fellow, Postdoctoral Researcher, Research Scientist Intern"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          </div>

          <div>
            <label htmlFor="expOrg" className="block font-medium text-slate-800 mb-1">
              Institution / Laboratory / Organization *
            </label>
            <input
              id="expOrg"
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="e.g. Max Planck Institute for Mathematics in the Sciences (MPI MiS) or Google Research"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="expDept" className="block font-medium text-slate-800 mb-1">
                Department / Group (optional)
              </label>
              <input
                id="expDept"
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Complex Systems & Geometry Group"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
              />
            </div>

            <div>
              <label htmlFor="expPeriod" className="block font-medium text-slate-800 mb-1">
                Duration / Period *
              </label>
              <input
                id="expPeriod"
                type="text"
                required
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="e.g. Fall 2025 or 2022 – Present"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="expDesc" className="block font-medium text-slate-800 mb-1">
              Research Activities &amp; Contributions
            </label>
            <textarea
              id="expDesc"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe research responsibilities, theoretical investigations, advisors, or key project outcomes..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs leading-relaxed"
            ></textarea>
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
              <span>{initialItem ? 'Update Experience' : 'Save Experience'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
