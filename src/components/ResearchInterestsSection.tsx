import React from 'react';
import { Network, ShieldCheck, Share2, Cpu, ArrowRight } from 'lucide-react';
import { ResearchInterest } from '../types/researcher';

interface ResearchInterestsSectionProps {
  interests: ResearchInterest[];
  onSelectTopic: (topicId: string) => void;
  selectedTopicId: string | null;
}

export const ResearchInterestsSection: React.FC<ResearchInterestsSectionProps> = ({
  interests,
  onSelectTopic,
  selectedTopicId,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Network':
        return <Network className="w-5 h-5 text-amber-700" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-blue-700" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-700" />;
      default:
        return <Network className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <section id="interests" className="py-16 sm:py-20 border-b border-slate-200/80 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
            Thematic Focus & Agendas
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Research Interests & Core Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our lab tackles the computational limits of large relational data, bridging foundational mathematics
            with high-impact deployments in network science, reliable AI, and complex systems.
          </p>
        </div>

        {/* 2x2 Grid of Research Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interests.map((interest, index) => {
            const isSelected = selectedTopicId === interest.id;

            return (
              <div
                key={interest.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-amber-50/40 border-amber-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-slate-100 border border-slate-200/60">
                        {getIcon(interest.iconName)}
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-medium">
                        0{index + 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectTopic(interest.id)}
                      className={`text-xs font-medium inline-flex items-center gap-1 transition-colors ${
                        isSelected
                          ? 'text-amber-900 font-semibold underline'
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      <span>{isSelected ? 'Filtering papers' : 'Filter papers'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl font-semibold text-slate-900 leading-snug">
                    {interest.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 mb-3">
                    {interest.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-5">
                    {interest.description}
                  </p>

                  {/* Key Questions */}
                  <div className="mb-5 space-y-2 border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                </div>

                {/* Methodologies & Active Projects footer */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
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

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Active Projects
                    </span>
                    <div className="text-xs text-slate-600 space-y-0.5">
                      {interest.activeProjects.map((p, pIdx) => (
                        <div key={pIdx} className="truncate">
                          &rarr; {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
