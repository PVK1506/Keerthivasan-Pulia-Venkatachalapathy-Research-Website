import React, { useState } from 'react';
import { Bell, ExternalLink, Calendar, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsItem } from '../types/researcher';

interface NewsSectionProps {
  news: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const [showAll, setShowAll] = useState(false);

  if (!news || news.length === 0) return null;

  const displayedNews = showAll ? news : news.slice(0, 4);

  const getTagColor = (tag?: string) => {
    switch (tag?.toLowerCase()) {
      case 'paper':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'award':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'talk':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'visit':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <section className="py-8 bg-amber-50/30 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 shadow-xs">
          
          {/* Section Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h2 className="font-serif text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
                Recent News &amp; Research Milestones
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Doctoral Updates
            </span>
          </div>

          {/* News List */}
          <div className="space-y-3">
            {displayedNews.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed"
              >
                <div className="flex items-center gap-2 sm:w-36 shrink-0 font-mono text-xs font-medium text-slate-500">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{item.date}</span>
                </div>

                <div className="flex-1 flex flex-wrap items-baseline gap-2">
                  {item.tag && (
                    <span
                      className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border font-medium ${getTagColor(
                        item.tag
                      )}`}
                    >
                      {item.tag}
                    </span>
                  )}
                  <span>{item.content}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-0.5 text-xs text-amber-800 hover:underline font-medium ml-1"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show more toggle */}
          {news.length > 4 && (
            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span>{showAll ? 'Show Fewer Updates' : `View All ${news.length} Milestones`}</span>
                {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
