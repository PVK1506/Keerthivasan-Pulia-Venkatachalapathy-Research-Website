import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';

interface AcademicEducationSectionProps {
  profile: ResearcherProfile;
}

export const AcademicEducationSection: React.FC<AcademicEducationSectionProps> = ({ profile }) => {
  const experiences = profile.experience || [];
  const educations = profile.education || [];

  return (
    <section id="academic-education" className="py-16 sm:py-20 border-b border-slate-200/80 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
            Academic Background &amp; Career
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Research Experience &amp; Education
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Research appointments, fellowships, laboratory affiliations, and formal academic degrees.
          </p>
        </div>

        {/* 2-Column Grid: Research Experience & Education Degrees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Column 1: Research Experience Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="w-4 h-4 text-amber-800" />
              <h3 className="font-serif font-semibold text-slate-900 text-base">
                Research Experience ({experiences.length})
              </h3>
            </div>

            {experiences.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 italic">No research experience entries listed.</p>
            ) : (
              <div className="space-y-5 divide-y divide-slate-100">
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className={idx > 0 ? 'pt-4' : ''}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif font-semibold text-slate-900 text-sm">
                        {exp.role}
                      </h4>
                      <span className="font-mono text-xs text-slate-500">{exp.period}</span>
                    </div>

                    <p className="text-xs font-medium text-slate-800 mt-1">
                      {exp.organization}
                    </p>
                    {exp.department && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {exp.department}
                      </p>
                    )}

                    {exp.description && (
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Education Degrees Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <GraduationCap className="w-4 h-4 text-amber-800" />
              <h3 className="font-serif font-semibold text-slate-900 text-base">
                Education &amp; Degrees ({educations.length})
              </h3>
            </div>

            {educations.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 italic">No formal education entries listed.</p>
            ) : (
              <div className="space-y-5 divide-y divide-slate-100">
                {educations.map((item, idx) => (
                  <div key={item.id || idx} className={idx > 0 ? 'pt-4' : ''}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif font-semibold text-slate-900 text-sm">
                        {item.degree}
                      </h4>
                      <span className="font-mono text-xs text-slate-500">{item.year}</span>
                    </div>

                    <p className="text-xs font-medium text-slate-700 mt-1">
                      {item.institution}
                    </p>

                    {item.dissertation && (
                      <p className="text-xs text-slate-600 mt-1.5 italic">
                        Dissertation: "{item.dissertation}"
                      </p>
                    )}

                    {item.advisor && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.advisor}
                      </p>
                    )}

                    {item.honors && (
                      <span className="inline-block mt-1 text-[11px] text-amber-900 font-medium">
                        ✦ {item.honors}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
