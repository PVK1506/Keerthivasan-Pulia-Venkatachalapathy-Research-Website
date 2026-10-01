import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Upload, Image as ImageIcon, Check, Sparkles, BookOpen } from 'lucide-react';
import { ResearchInterest } from '../types/researcher';

interface AddEditInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (interest: ResearchInterest) => void;
  initialInterest?: ResearchInterest | null;
}

export const AddEditInterestModal: React.FC<AddEditInterestModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialInterest,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    iconName: 'Network',
    keyQuestions: [''],
    methodologies: '',
    activeProjects: [''],
  });

  useEffect(() => {
    if (initialInterest) {
      setFormData({
        title: initialInterest.title || '',
        subtitle: initialInterest.subtitle || '',
        description: initialInterest.description || '',
        imageUrl: initialInterest.imageUrl || '',
        iconName: initialInterest.iconName || 'Network',
        keyQuestions: initialInterest.keyQuestions?.length > 0 ? initialInterest.keyQuestions : [''],
        methodologies: initialInterest.methodologies ? initialInterest.methodologies.join(', ') : '',
        activeProjects: initialInterest.activeProjects?.length > 0 ? initialInterest.activeProjects : [''],
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        imageUrl: '',
        iconName: 'Network',
        keyQuestions: [''],
        methodologies: '',
        activeProjects: [''],
      });
    }
  }, [initialInterest, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        if (base64) {
          setFormData((prev) => ({ ...prev, imageUrl: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      keyQuestions: [...prev.keyQuestions, ''],
    }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.keyQuestions];
      updated[index] = value;
      return { ...prev, keyQuestions: updated };
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyQuestions: prev.keyQuestions.filter((_, i) => i !== index),
    }));
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      activeProjects: [...prev.activeProjects, ''],
    }));
  };

  const handleProjectChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.activeProjects];
      updated[index] = value;
      return { ...prev, activeProjects: updated };
    });
  };

  const handleRemoveProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      activeProjects: prev.activeProjects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const cleanedQuestions = formData.keyQuestions.map((q) => q.trim()).filter(Boolean);
    const cleanedProjects = formData.activeProjects.map((p) => p.trim()).filter(Boolean);
    const cleanedMethodologies = formData.methodologies
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const updatedInterest: ResearchInterest = {
      id: initialInterest?.id || `interest-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim() || 'Foundational Research Focus',
      description: formData.description.trim(),
      imageUrl: formData.imageUrl || undefined,
      iconName: formData.iconName || 'Network',
      keyQuestions: cleanedQuestions.length > 0 ? cleanedQuestions : ['How can we characterize theoretical expressivity in this domain?'],
      methodologies: cleanedMethodologies.length > 0 ? cleanedMethodologies : ['Empirical analysis', 'Mathematical modeling'],
      activeProjects: cleanedProjects.length > 0 ? cleanedProjects : ['Ongoing research investigations'],
    };

    onSave(updatedInterest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-interest-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <h3 id="add-interest-title" className="font-serif font-semibold text-slate-900 text-lg">
              {initialInterest ? 'Edit Research Interest & Core Questions' : 'Add Research Interest'}
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
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1 text-xs">
          
          {/* Title & Subtitle */}
          <div className="space-y-4">
            <div>
              <label htmlFor="interestTitle" className="block font-medium text-slate-800 mb-1">
                Research Theme Title *
              </label>
              <input
                id="interestTitle"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Topological Deep Learning & Higher-Order Networks"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
              />
            </div>

            <div>
              <label htmlFor="interestSubtitle" className="block font-medium text-slate-800 mb-1">
                Subtitle / Mathematical Domain
              </label>
              <input
                id="interestSubtitle"
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Sheaf Theory, Cellular Complexes & Hodge Laplacians"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
              />
            </div>

            <div>
              <label htmlFor="interestDescription" className="block font-medium text-slate-800 mb-1">
                Problem Statement & Overview
              </label>
              <textarea
                id="interestDescription"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain the foundational research problem, theoretical motivation, and practical significance..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Photo / Diagram Upload */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block text-xs">
                  Research Diagram / Methodology Photo
                </span>
                <span className="text-[11px] text-slate-500">
                  Attach an architectural figure, scientific diagram, or whiteboard illustration for this research topic.
                </span>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>{formData.imageUrl ? 'Change Photo' : 'Upload Photo'}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {formData.imageUrl && (
              <div className="relative group rounded border border-slate-200 overflow-hidden bg-white max-w-sm">
                <img
                  src={formData.imageUrl}
                  alt="Research interest preview"
                  className="w-full h-36 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, imageUrl: '' }))}
                  className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded text-xs hover:bg-rose-700 shadow-xs flex items-center gap-1"
                  title="Remove this photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              </div>
            )}
          </div>

          {/* Core Theoretical Questions */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800 text-xs">
                Core Theoretical Questions
              </label>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-950 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.keyQuestions.map((q, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-700 font-mono text-xs">•</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    placeholder="e.g. Under what cellular decomposition does sheaf diffusion surpass standard message passing?"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                  {formData.keyQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Methodological Frameworks */}
          <div className="pt-2 border-t border-slate-100">
            <label htmlFor="methodologiesInput" className="block font-medium text-slate-800 mb-1">
              Methodological Frameworks (comma-separated)
            </label>
            <input
              id="methodologiesInput"
              type="text"
              value={formData.methodologies}
              onChange={(e) => setFormData({ ...formData, methodologies: e.target.value })}
              placeholder="e.g. Cellular Cosheaves, Spectral Graph Theory, Hodge Decomposition"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Active Projects */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800 text-xs">
                Active Projects &amp; Manuscripts
              </label>
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-950 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.activeProjects.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">&rarr;</span>
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => handleProjectChange(idx, e.target.value)}
                    placeholder="e.g. SheafDiffusion: Scalable cellular Laplacians on large molecular graphs"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                  {formData.activeProjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
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
              <span>{initialInterest ? 'Update Research Interest' : 'Save Research Interest'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
