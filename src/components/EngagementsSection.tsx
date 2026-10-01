import React, { useState } from 'react';
import {
  Compass,
  Presentation,
  MapPin,
  Calendar,
  FileText,
  Video,
  Image as ImageIcon,
} from 'lucide-react';
import { EngagementItem } from '../types/researcher';

interface EngagementsSectionProps {
  engagements: EngagementItem[];
  onOpenPhotoLightbox: (photos: string[], startIndex: number, title: string, subtitle?: string) => void;
}

export const EngagementsSection: React.FC<EngagementsSectionProps> = ({
  engagements,
  onOpenPhotoLightbox,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'keynote' | 'visit' | 'presentation'>('all');

  const filteredEngagements = engagements.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <section id="engagements" className="py-16 sm:py-20 border-b border-slate-200/80 bg-white/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
            Academic Outreach &amp; Global Mobility
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Scientific Engagement &amp; Academic Visits
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Invited keynote addresses, conference oral presentations, university research visits, and institute fellowships.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-md text-xs font-medium w-fit mb-8">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Engagements ({engagements.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('keynote')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'keynote'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Keynotes
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('visit')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'visit'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lab Visits &amp; Fellowships
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('presentation')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'presentation'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conference Presentations
          </button>
        </div>

        {/* Engagements Timeline / Feed */}
        {filteredEngagements.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-xs text-slate-500">No engagements found for this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEngagements.map((item) => {
              const isVisit = item.type === 'visit';

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-lg p-6 hover:border-slate-300 transition-all shadow-2xs space-y-4"
                >
                  {/* Top Header metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 uppercase">
                        {isVisit ? 'Research Lab Visit' : (item.type === 'keynote' ? 'Invited Keynote' : 'Conference Presentation')}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
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
                  {item.photos && item.photos.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Documentation &amp; Event Photos ({item.photos.length})</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                        {item.photos.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            className="relative group rounded border border-slate-200 overflow-hidden bg-slate-100 aspect-square cursor-pointer"
                            onClick={() =>
                              onOpenPhotoLightbox(
                                item.photos,
                                pIdx,
                                item.title,
                                `${item.eventOrHost} · ${item.date}`
                              )
                            }
                          >
                            <img
                              src={photo}
                              alt={`${item.title} photo ${pIdx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-medium">
                              View
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Material Links (Slides & Video) */}
                  {(item.slidesUrl || item.videoUrl) && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-medium">
                      {item.slidesUrl && (
                        <a
                          href={item.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-950 underline underline-offset-4"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-700" />
                          <span>Presentation Slides</span>
                        </a>
                      )}
                      {item.videoUrl && (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-950 underline underline-offset-4"
                        >
                          <Video className="w-3.5 h-3.5 text-amber-700" />
                          <span>Watch Recorded Talk</span>
                        </a>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
