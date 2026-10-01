import React, { useState } from 'react';
import { Mail, MapPin, Building, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { ResearcherProfile } from '../types/researcher';
import { ScholarLinksBar } from './AcademicBadges';

interface ContactSectionProps {
  profile: ResearcherProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    institution: '',
    subject: 'Research Collaboration Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderEmail || !formData.message) return;

    // Simulate sending inquiry and mailto trigger
    setSubmitted(true);
    const mailtoUrl = `mailto:${profile.links.email}?subject=${encodeURIComponent(
      `[Academic Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `From: ${formData.senderName} (${formData.institution || 'Independent'})\nEmail: ${formData.senderEmail}\n\n${formData.message}`
    )}`;

    // Optional window.open mail client trigger
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5">
            Communication &amp; Inquiries
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Contact &amp; Lab Affiliations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Reach out for research collaborations, visiting scholar inquiries, prospective Ph.D. mentorship, or keynote speaking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details & Academic Profiles (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-xs space-y-5">
              <h3 className="font-serif font-semibold text-slate-900 text-base">
                Office &amp; Lab Coordinates
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-medium">{profile.labName}</strong>
                    <span>{profile.department}</span>
                    <br />
                    <span>{profile.affiliation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-medium">Physical Location</strong>
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-medium">Direct Email</strong>
                    <a
                      href={`mailto:${profile.links.email}`}
                      className="text-amber-900 font-mono hover:underline"
                    >
                      {profile.links.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Official Academic Accounts
                </h4>
                <ScholarLinksBar links={profile.links} variant="prominent" />
              </div>
            </div>

          </div>

          {/* Academic Inquiry / Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif font-semibold text-slate-900 text-lg">
                  Send an Academic Inquiry
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Directly sends your note to <span className="font-mono text-slate-700">{profile.links.email}</span>.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-md text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif font-medium text-slate-900 text-base">Inquiry Prepared</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Your inquiry details have been drafted. If your mail client didn't open automatically, you can also write directly to{' '}
                    <a href={`mailto:${profile.links.email}`} className="text-emerald-800 font-bold underline font-mono">
                      {profile.links.email}
                    </a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ senderName: '', senderEmail: '', institution: '', subject: 'Research Collaboration Inquiry', message: '' });
                    }}
                    className="mt-3 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="senderName" className="block font-medium text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="senderName"
                        type="text"
                        required
                        value={formData.senderName}
                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                        placeholder="e.g. Prof. Alan Turing"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="senderEmail" className="block font-medium text-slate-700 mb-1">
                        Your Academic / Work Email *
                      </label>
                      <input
                        id="senderEmail"
                        type="email"
                        required
                        value={formData.senderEmail}
                        onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                        placeholder="e.g. scholar@university.edu"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="institution" className="block font-medium text-slate-700 mb-1">
                        Institution / Affiliation
                      </label>
                      <input
                        id="institution"
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        placeholder="e.g. Stanford University / DeepMind"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-medium text-slate-700 mb-1">
                        Inquiry Topic / Reason *
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="Research Collaboration Inquiry">Research Collaboration</option>
                        <option value="Paper Questions & Code Inquiries">Paper / Code Questions</option>
                        <option value="Ph.D. / Postdoc Application Inquiry">Prospective Ph.D. / Postdoc</option>
                        <option value="Invited Talk / Seminar Invitation">Seminar / Keynote Invitation</option>
                        <option value="General Inquiry">General Academic Correspondence</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-medium text-slate-700 mb-1">
                      Message / Proposal *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your research question, collaboration idea, or reason for correspondence..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Replies are sent to your provided email address.
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
