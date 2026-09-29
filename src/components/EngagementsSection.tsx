import React, { useState, useRef } from 'react';
import {
  Presentation,
  MapPin,
  Calendar,
  ExternalLink,
  Video,
  FileText,
  Upload,
  Plus,
  Image as ImageIcon,
  Compass,
  Users,
  Pencil,
  Trash2
} from 'lucide-react';
import { EngagementItem } from '../types/researcher';
import { ConfirmDialogModal } from './ConfirmDialogModal';

interface EngagementsSectionProps {
  engagements: EngagementItem[];
  onOpenAddModal: () => void;
  onOpenEditModal?: (item: EngagementItem) => void;
  onDeleteEngagement?: (id: string) => void;
  onUpdateEngagementPhotos: (engagementId: string, newPhotos: string[]) => void;
  onOpenPhotoLightbox: (photos: string[], startIndex: number, title: string, subtitle?: string) => void;
}

export const EngagementsSection: React.FC<EngagementsSectionProps> = ({
  engagements,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteEngagement,
  onUpdateEngagementPhotos,
  onOpenPhotoLightbox,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'presentation' | 'visit'>('all');
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<EngagementItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEngagements = engagements.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'presentation') {
      return item.type === 'presentation' || item.type === 'keynote' || item.type === 'workshop';
    }
    return item.type === 'visit';
  });

  const triggerUploadForEngagement = (id: string) => {
    setActiveUploadId(id);
    fileInputRef.current?.click();
  };

  const handleCardPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeUploadId) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentItem = engagements.find((item) => item.id === activeUploadId);
    const existingPhotos = currentItem?.photos || [];

    const newPhotos: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          newPhotos.push(base64);
        }
        processed++;
        if (processed === files.length) {
          onUpdateEngagementPhotos(activeUploadId, [...existingPhotos, ...newPhotos]);
          setActiveUploadId(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section id="engagements" className="py-16 sm:py-20 border-b border-slate-200/80 bg-white/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hidden File Input for Card-level uploads */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleCardPhotoUpload}
          className="hidden"
        />

        {/* Section Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
              Academic Outreach &amp; Global Mobility
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
              Scientific Engagement &amp; Academic Visits
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Invited keynote addresses, conference oral presentations, university research visits, and institute fellowships.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Engagement / Visit</span>
            </button>
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md text-xs font-medium w-fit mb-8">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Engagements ({engagements.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('presentation')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              filterType === 'presentation'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conference Presentations &amp; Keynotes
          </button>
          <button
            type="button"
            onClick={() => setFilterType('visit')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              filterType === 'visit'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Academic &amp; Lab Visits
          </button>
        </div>

        {/* Engagements Grid / Timeline List */}
        {filteredEngagements.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg p-6">
            <Presentation className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-600">No engagements matching this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEngagements.map((item) => {
              const isVisit = item.type === 'visit';

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-lg p-6 transition-all hover:border-slate-300 hover:shadow-xs space-y-4"
                >
                  {/* Top Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="font-mono text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 uppercase">
                        {isVisit ? 'Research Lab Visit' : (item.type === 'keynote' ? 'Invited Keynote' : 'Conference Presentation')}
                      </div>

                      {onOpenEditModal && (
                        <button
                          type="button"
                          onClick={() => onOpenEditModal(item)}
                          className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors"
                          title="Edit engagement"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onDeleteEngagement && (
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 transition-colors"
                          title="Remove engagement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Host/Event */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        {isVisit ? <Compass className="w-3.5 h-3.5 text-amber-700" /> : <Presentation className="w-3.5 h-3.5 text-amber-700" />}
                        <strong className="text-slate-800">{item.eventOrHost}</strong>
                      </div>
                      {item.hostPerson && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-slate-600">{item.hostPerson}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Talk Title / Lecture if applicable */}
                  {item.talkTitle && (
                    <div className="p-3 bg-slate-50 rounded border-l-2 border-amber-600 text-xs text-slate-700">
                      <span className="font-semibold text-slate-900 block mb-0.5">Delivered Presentation / Lecture:</span>
                      <span className="font-serif italic text-sm text-slate-900">"{item.talkTitle}"</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.description}
                  </p>

                  {/* PHOTO GALLERY SECTION */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Documentation &amp; Event Photos ({item.photos.length})</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => triggerUploadForEngagement(item.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-amber-950 px-2 py-1 bg-amber-50 hover:bg-amber-100 rounded border border-amber-200/80 transition-colors"
                      >
                        <Upload className="w-3 h-3 text-amber-700" />
                        <span>Upload Photos</span>
                      </button>
                    </div>

                    {item.photos.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {item.photos.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() => onOpenPhotoLightbox(item.photos, pIdx, item.title, `${item.eventOrHost} · ${item.location}`)}
                            className="relative group cursor-pointer overflow-hidden rounded border border-slate-200 aspect-4/3 bg-slate-100 shadow-2xs hover:border-slate-400 transition-all"
                          >
                            <img
                              src={photo}
                              alt={`${item.title} photo ${pIdx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                              Enlarge ⤢
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div 
                        onClick={() => triggerUploadForEngagement(item.id)}
                        className="border border-dashed border-slate-200 rounded p-4 text-center cursor-pointer hover:border-slate-300 hover:bg-slate-50/50 transition-colors"
                      >
                        <p className="text-xs text-slate-500">
                          No photos added yet. Click <strong className="text-slate-800">"Upload Photos"</strong> to attach conference presentation pictures or lab visit moments.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Resource Links (Slides, Video) */}
                  {(item.slidesUrl || item.videoUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                      {item.slidesUrl && (
                        <a
                          href={item.slidesUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-amber-800 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Presentation Slides</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                      {item.videoUrl && (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Talk Recording / Stream</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* Delete Engagement Confirm Dialog */}
        <ConfirmDialogModal
          isOpen={!!itemToDelete}
          title="Remove Engagement Entry"
          message={`Are you sure you want to remove "${itemToDelete?.title}" from your engagements?`}
          confirmLabel="Yes, Remove"
          confirmVariant="danger"
          onConfirm={() => {
            if (itemToDelete && onDeleteEngagement) {
              onDeleteEngagement(itemToDelete.id);
              setItemToDelete(null);
            }
          }}
          onCancel={() => setItemToDelete(null)}
        />

      </div>
    </section>
  );
};
