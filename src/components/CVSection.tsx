import React from 'react';
import {
  FileText,
  Printer,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  DollarSign,
  Users
} from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';

interface CVSectionProps {
  profile: ResearcherProfile;
  onEditCV: () => void;
}

export const CVSection: React.FC<CVSectionProps> = ({ profile, onEditCV }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="academic-cv" className="py-16 sm:py-20 border-b border-slate-200/80 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CV Header with Document Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
              Curriculum Vitae
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
              Academic Curriculum Vitae
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Full record of academic appointments, education, funded research grants, honors, teaching, and professional service.
            </p>
          </div>

          {/* Action buttons for CV */}
          <div className="flex flex-wrap items-center gap-2.5 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>

            {profile.links.cvUrl.startsWith('http') ? (
              <a
                href={profile.links.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-200" />
                <span>Open PDF Document</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onEditCV}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
                title="Attach external hosted PDF CV link"
              >
                <FileText className="w-3.5 h-3.5 text-slate-200" />
                <span>Set External PDF URL</span>
              </button>
            )}
          </div>
        </div>

        {/* Printable Academic CV Document Canvas */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-xs space-y-12">
          
          {/* Header of Printable CV */}
          <div className="border-b border-slate-200 pb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {profile.name}
            </h1>
            <p className="text-sm font-medium text-slate-700 mt-1">
              {profile.title} · {profile.department}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.affiliation} · {profile.location}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              <span>Email: {profile.links.email}</span>
              <span aria-hidden="true">·</span>
              <span>ORCID: {profile.links.orcidId}</span>
              <span aria-hidden="true">·</span>
              <span>Google Scholar: Verified Scholar</span>
            </div>
          </div>

          {/* Section: Academic Appointments & Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Briefcase className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                Academic Appointments &amp; Professional Experience
              </h3>
            </div>

            <div className="space-y-5">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm">
                  <div className="sm:col-span-3 text-xs font-mono font-medium text-slate-500 pt-0.5">
                    {exp.period}
                  </div>
                  <div className="sm:col-span-9 space-y-1">
                    <h4 className="font-semibold text-slate-900">{exp.role}</h4>
                    <p className="text-slate-600 text-xs">
                      {exp.organization}{exp.department ? `, ${exp.department}` : ''}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                Education
              </h3>
            </div>

            <div className="space-y-5">
              {profile.education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm">
                  <div className="sm:col-span-3 text-xs font-mono font-medium text-slate-500 pt-0.5">
                    {edu.year}
                  </div>
                  <div className="sm:col-span-9 space-y-1">
                    <h4 className="font-semibold text-slate-900">{edu.degree}</h4>
                    <p className="text-slate-700 text-xs">
                      {edu.institution} — <em>{edu.field}</em>
                    </p>
                    {edu.dissertation && (
                      <p className="text-xs text-slate-600 italic">
                        Dissertation: "{edu.dissertation}"
                      </p>
                    )}
                    {edu.advisor && (
                      <p className="text-xs text-slate-500">
                        Advisor: {edu.advisor}
                      </p>
                    )}
                    {edu.honors && (
                      <p className="text-xs text-amber-900 font-medium">
                        Honors: {edu.honors}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Sponsored Grants & Research Funding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                Sponsored Research Grants &amp; Contracts
              </h3>
            </div>

            <div className="space-y-4">
              {profile.grants.map((grant) => (
                <div key={grant.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm">
                  <div className="sm:col-span-3 text-xs font-mono font-medium text-slate-500 pt-0.5">
                    {grant.period}
                  </div>
                  <div className="sm:col-span-9 space-y-0.5">
                    <h4 className="font-semibold text-slate-900 leading-snug">{grant.title}</h4>
                    <p className="text-xs text-slate-600">
                      Funding Agency: <strong className="text-slate-800">{grant.fundingAgency}</strong> · Amount:{' '}
                      <strong className="text-slate-800 font-mono">{grant.amount}</strong> · Role: {grant.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Honors, Awards & Distinctions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Award className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                Honors &amp; Fellowships
              </h3>
            </div>

            <div className="space-y-3">
              {profile.awards.map((award) => (
                <div key={award.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm">
                  <div className="sm:col-span-3 text-xs font-mono font-medium text-slate-500 pt-0.5">
                    {award.year}
                  </div>
                  <div className="sm:col-span-9 space-y-0.5">
                    <h4 className="font-semibold text-slate-900">{award.title}</h4>
                    <p className="text-xs text-slate-600">
                      Conferred by {award.conferringBody}
                      {award.description && ` — ${award.description}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Teaching & Course Mentorship */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                Teaching &amp; Curriculum Instruction
              </h3>
            </div>

            <div className="space-y-3">
              {profile.teaching.map((teach) => (
                <div key={teach.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm">
                  <div className="sm:col-span-3 text-xs font-mono font-medium text-slate-500 pt-0.5">
                    {teach.terms}
                  </div>
                  <div className="sm:col-span-9 space-y-0.5">
                    <h4 className="font-semibold text-slate-900">
                      <span className="font-mono text-xs text-amber-900 mr-2">{teach.courseCode}</span>
                      {teach.courseTitle}
                    </h4>
                    <p className="text-xs text-slate-600">
                      Role: {teach.role} · {teach.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Academic & Professional Service */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Users className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                Professional Service &amp; Scientific Reviewing
              </h3>
            </div>

            <div className="space-y-3">
              {profile.service.map((serv) => (
                <div key={serv.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm">
                  <div className="sm:col-span-3 text-xs font-semibold text-slate-700 pt-0.5">
                    {serv.category}
                  </div>
                  <div className="sm:col-span-9 text-xs text-slate-600 leading-relaxed">
                    {serv.details}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
