import React from 'react';
import {
  Network,
  ShieldCheck,
  Share2,
  Cpu,
} from 'lucide-react';
import { ResearchInterest } from '../types/researcher';

interface ResearchInterestsSectionProps {
  interests: ResearchInterest[];
}

export const ResearchInterestsSection: React.FC<ResearchInterestsSectionProps> = ({ interests }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      case 'Share2':
        return <Share2 className="w-4 h-4 text-blue-700" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-700" />;
      case 'Network':
      default:
        return <Network className="w-4 h-4 text-amber-700" />;
    }
  };

  return (
    <section id="interests" className="py-16 sm:py-20 border-b border-slate-200/80 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12 pb-4 border-b border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
            Thematic Focus &amp; Agendas
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Research Interests &amp; Core Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Foundational agendas bridging mathematical rigor with high-impact applications in machine learning,
            topological data analysis, and reliable scientific networks.
          </p>
        </div>

        {/* Grid of Research Themes */}
        {interests.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 italic">No research interests documented.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interests.map((interest, index) => (
              <div
                key={interest.id}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-5"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-slate-100 border border-slate-200/80">
                        {getIcon(interest.iconName)}
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Research Diagram Display (if present) */}
                  {interest.imageUrl ? (
                    <div className="rounded-md border border-slate-200 overflow-hidden mb-4 bg-slate-50 aspect-16/9">
                      <img
                        src={interest.imageUrl}
                        alt={`${interest.title} diagram`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl font-semibold text-slate-900 leading-snug">
                    {interest.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 mb-3">
                    {interest.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {interest.description}
                  </p>

                  {/* Core Theoretical Questions */}
                  {interest.keyQuestions && interest.keyQuestions.length > 0 && (
                    <div className="mb-4 space-y-2 border-t border-slate-100 pt-3.5">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Core Theoretical Questions
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 leading-normal">
                        {interest.keyQuestions.map((question, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2">
                            <span className="text-amber-700 font-mono mt-0.5">•</span>
                            <span>{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Methodologies & Active Projects footer */}
                <div className="border-t border-slate-100 pt-3.5 space-y-3">
                  {interest.methodologies && interest.methodologies.length > 0 && (
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Methodological Frameworks
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                        {interest.methodologies.map((m, mIdx) => (
                          <React.Fragment key={mIdx}>
                            <span>{m}</span>
                            {mIdx < interest.methodologies.length - 1 && (
                              <span aria-hidden="true" className="text-slate-300">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {interest.activeProjects && interest.activeProjects.length > 0 && (
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Active Projects &amp; Manuscripts
                      </span>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        {interest.activeProjects.map((p, pIdx) => (
                          <div key={pIdx} className="truncate">
                            &rarr; {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
