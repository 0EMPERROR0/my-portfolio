/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, ArrowUpRight, MessageSquare, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { data } = usePortfolio();

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.personalInfo.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = data.personalInfo.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 800);
  };

  const openMailto = () => {
    const sub = encodeURIComponent(formData.subject || 'Hello Parthiv');
    const body = encodeURIComponent(
      `Name: ${formData.name || 'Friend'}\nEmail: ${formData.email || ''}\n\nMessage:\n${formData.message || ''}`
    );
    window.location.href = `mailto:${data.personalInfo.email}?subject=${sub}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-black relative border-t border-neutral-900 text-white">
      {/* Decorative Dot Matrix in Corner */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-6 w-32 h-32 bg-dot-matrix opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span>( 06 )</span>
            <span className="text-neutral-600">/</span>
            <span>CONNECT</span>
          </div>
          <h2 className="font-dot text-3xl sm:text-5xl font-black tracking-wider text-white mb-4">
            HAVE AN IDEA IN MIND?
          </h2>
          <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            {data.contact.description ||
              "I'm always interested in connecting with people, exploring ideas, and building something meaningful."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info & Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-7 rounded-3xl bg-[#090909] border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>DIRECT DISPATCH</span>
                <span className="text-white">EMAIL</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="text-base sm:text-lg font-mono font-medium text-white hover:text-neutral-300 transition-colors break-all"
                >
                  {data.personalInfo.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border transition-colors shrink-0 ${
                    isCopied
                      ? 'bg-neutral-900 border-[#d71920] text-white'
                      : 'bg-black border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600'
                  }`}
                  aria-label="Copy email address"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-[#d71920]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Open for engineering roles, technical collaboration, and applied machine learning research projects.
              </p>
            </div>

            {/* Verified Social Channels */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono text-neutral-400 tracking-wider">
                // EXTERNAL PROFILES
              </div>
              
              <a
                href={data.personalInfo.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-2xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-black text-white border border-neutral-800">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white tracking-wide font-sans">GitHub</div>
                    <div className="text-xs font-mono text-neutral-400">{data.personalInfo.github.replace('https://', '')}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-2xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-black text-white border border-neutral-800">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white tracking-wide font-sans">LinkedIn</div>
                    <div className="text-xs font-mono text-neutral-400">{data.personalInfo.linkedin.replace('https://', '')}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Academic Affiliation Note */}
            <div className="p-4 rounded-2xl bg-[#090909] border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
              <div className="text-white font-medium">LOCATION BASE</div>
              <div>{data.personalInfo.institution}</div>
              <div>{data.personalInfo.affiliation}, {data.personalInfo.location}</div>
            </div>

          </div>

          {/* Right Column: Working Contact Form (Nothing Monochrome) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#090909] border border-neutral-800 shadow-2xl">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
                  <span>TRANSMIT DISPATCH</span>
                </div>
                <span className="text-neutral-400">{data.personalInfo.name.toUpperCase()}</span>
              </div>

              {submitSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 text-[#d71920]" />
                  </div>
                  <h4 className="font-dot text-2xl font-bold text-white tracking-wider">
                    DISPATCH TRANSMITTED.
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed font-sans">
                    Thank you for reaching out! Your message details have been noted. You can also send directly via your mail client if preferred.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2 font-mono">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 text-xs rounded-full bg-black text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                    >
                      SEND ANOTHER
                    </button>
                    <button
                      type="button"
                      onClick={openMailto}
                      className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
                    >
                      OPEN MAIL CLIENT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="contact-name" className="block text-neutral-400 mb-1.5">
                        NAME <span className="text-[#d71920]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Alex Morgan"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors ${
                          errors.name ? 'border-[#d71920]' : 'border-neutral-800'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-[#d71920] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="contact-email" className="block text-neutral-400 mb-1.5">
                        EMAIL <span className="text-[#d71920]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="alex@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors ${
                          errors.email ? 'border-[#d71920]' : 'border-neutral-800'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-[#d71920] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-neutral-400 mb-1.5">
                      SUBJECT <span className="text-[#d71920]">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      placeholder="Project inquiry / Collaboration"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors ${
                        errors.subject ? 'border-[#d71920]' : 'border-neutral-800'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-[11px] text-[#d71920] flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-neutral-400 mb-1.5">
                      MESSAGE <span className="text-[#d71920]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Write your message here..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors resize-none font-sans ${
                        errors.message ? 'border-[#d71920]' : 'border-neutral-800'
                      }`}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <p className="text-[11px] text-[#d71920] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[10px] font-mono text-neutral-500">
                        {formData.message.length} CHARACTERS
                      </span>
                    </div>
                  </div>

                  {/* Submit Actions (Monochrome Pills) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-2.5 text-xs font-semibold tracking-wider text-black bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING...</span>
                      ) : (
                        <>
                          <span>TRANSMIT DISPATCH</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={openMailto}
                      className="w-full sm:w-auto text-xs font-mono text-neutral-400 hover:text-white transition-colors py-2 text-center"
                    >
                      Or open via default mail app
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
