import React, { useState, useRef } from 'react';
import { X, Upload, Plus, Trash2, Calendar, MapPin, Presentation, Image as ImageIcon } from 'lucide-react';
import { EngagementItem } from '../types/researcher';

interface AddEngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: EngagementItem) => void;
  onDelete?: (id: string) => void;
  initialItem?: EngagementItem | null;
}

export const AddEngagementModal: React.FC<AddEngagementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialItem,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [formData, setFormData] = useState({
    type: initialItem?.type || ('presentation' as EngagementItem['type']),
    title: initialItem?.title || '',
    role: initialItem?.role || 'Invited Speaker',
    eventOrHost: initialItem?.eventOrHost || '',
    location: initialItem?.location || '',
    date: initialItem?.date || '',
    talkTitle: initialItem?.talkTitle || '',
    hostPerson: initialItem?.hostPerson || '',
    description: initialItem?.description || '',
    slidesUrl: initialItem?.slidesUrl || '',
    videoUrl: initialItem?.videoUrl || '',
    photos: initialItem?.photos || ([] as string[]),
  });

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, base64],
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.eventOrHost) return;

    const item: EngagementItem = {
      id: initialItem?.id || `eng-${Date.now()}`,
      type: formData.type,
      title: formData.title,
      role: formData.role,
      eventOrHost: formData.eventOrHost,
      location: formData.location,
      date: formData.date || 'Recent',
      talkTitle: formData.talkTitle || undefined,
      hostPerson: formData.hostPerson || undefined,
      description: formData.description,
      slidesUrl: formData.slidesUrl || undefined,
      videoUrl: formData.videoUrl || undefined,
      photos: formData.photos,
    };

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-eng-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-amber-700" />
            <h3 id="add-eng-modal-title" className="font-serif font-semibold text-slate-900 text-lg">
              {initialItem ? 'Edit Scientific Engagement' : 'Add Presentation or Academic Visit'}
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
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1 text-xs">
          
          {/* Engagement Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engType" className="block font-medium text-slate-700 mb-1">
                Engagement Category *
              </label>
              <select
                id="engType"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="presentation">Conference Presentation (Oral/Spotlight)</option>
                <option value="keynote">Invited Keynote / Plenary Address</option>
                <option value="visit">Academic &amp; Research Lab Visit / Fellowship</option>
                <option value="workshop">Workshop Organizer / Seminar Series</option>
              </select>
            </div>

            <div>
              <label htmlFor="engRole" className="block font-medium text-slate-700 mb-1">
                Role / Title of Engagement *
              </label>
              <input
                id="engRole"
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Keynote Speaker / Visiting Fellow"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Title and Event/Host */}
          <div>
            <label htmlFor="engTitle" className="block font-medium text-slate-700 mb-1">
              Headline Title *
            </label>
            <input
              id="engTitle"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. ICML 2025 Keynote on Higher-Order Graph Learning"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-serif text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engEventOrHost" className="block font-medium text-slate-700 mb-1">
                Event / Host Institution *
              </label>
              <input
                id="engEventOrHost"
                type="text"
                required
                value={formData.eventOrHost}
                onChange={(e) => setFormData({ ...formData, eventOrHost: e.target.value })}
                placeholder="e.g. Max Planck Institute for Mathematics in the Sciences"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label htmlFor="engLocation" className="block font-medium text-slate-700 mb-1">
                Location (City, Country) *
              </label>
              <input
                id="engLocation"
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Leipzig, Germany / Vancouver, BC, Canada"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engDate" className="block font-medium text-slate-700 mb-1">
                Date / Duration *
              </label>
              <input
                id="engDate"
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g. July 2025 or Sept – Oct 2025"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label htmlFor="engHostPerson" className="block font-medium text-slate-700 mb-1">
                Host Professor / Organizer (optional)
              </label>
              <input
                id="engHostPerson"
                type="text"
                value={formData.hostPerson}
                onChange={(e) => setFormData({ ...formData, hostPerson: e.target.value })}
                placeholder="e.g. Host: Prof. Dr. Jürgen Jost"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Talk Title */}
          <div>
            <label htmlFor="engTalkTitle" className="block font-medium text-slate-700 mb-1">
              Delivered Talk Title / Lecture Topic (optional)
            </label>
            <input
              id="engTalkTitle"
              type="text"
              value={formData.talkTitle}
              onChange={(e) => setFormData({ ...formData, talkTitle: e.target.value })}
              placeholder="e.g. Cellular Sheaves and Spectral Invariants in Graph Transformers"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono text-xs"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="engDescription" className="block font-medium text-slate-700 mb-1">
              Summary &amp; Highlights *
            </label>
            <textarea
              id="engDescription"
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the scientific discussions, key insights presented, audience engagement, or collaborative experiments conducted during the visit..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 resize-y"
            ></textarea>
          </div>

          {/* Resource Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engSlidesUrl" className="block font-medium text-slate-700 mb-1">
                Slides Link (URL, optional)
              </label>
              <input
                id="engSlidesUrl"
                type="text"
                value={formData.slidesUrl}
                onChange={(e) => setFormData({ ...formData, slidesUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>

            <div>
              <label htmlFor="engVideoUrl" className="block font-medium text-slate-700 mb-1">
                Recording / Video Link (URL, optional)
              </label>
              <input
                id="engVideoUrl"
                type="text"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>
          </div>

          {/* PHOTOS UPLOAD SECTION */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-semibold text-slate-800 block">
                  Engagement &amp; Visit Photos
                </span>
                <span className="text-[11px] text-slate-500">
                  Upload conference podium photos, lab whiteboard discussions, or group photos from your device.
                </span>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-slate-600" />
                <span>Upload Photos</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Photos Preview Grid */}
            {formData.photos.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                {formData.photos.map((photo, pIdx) => (
                  <div key={pIdx} className="relative group rounded border border-slate-200 overflow-hidden aspect-4/3 bg-slate-100">
                    <img
                      src={photo}
                      alt={`Upload preview ${pIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(pIdx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-90 hover:opacity-100 transition-opacity shadow-xs"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-lg p-5 text-center cursor-pointer transition-colors bg-slate-50/50"
              >
                <ImageIcon className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <span className="text-xs text-slate-600 font-medium block">
                  Click here or press "Upload Photos" to add conference or visit images
                </span>
                <span className="text-[10px] text-slate-400">
                  PNG, JPG, WebP accepted · multiple selections supported
                </span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {initialItem && onDelete ? (
              confirmingDelete ? (
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">
                  <span className="text-xs text-rose-800 font-medium">Remove engagement?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(initialItem.id);
                      onClose();
                    }}
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
                  <span>Delete Engagement</span>
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
                <Plus className="w-3.5 h-3.5" />
                <span>{initialItem ? 'Update Engagement' : 'Save Engagement'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
