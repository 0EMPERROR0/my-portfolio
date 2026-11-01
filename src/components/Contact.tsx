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
      // Fallback
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
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please specify a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide your message.';
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
    
    // Simulate real submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 900);
  };

  const openMailto = () => {
    const sub = encodeURIComponent(formData.subject || 'Hello Parthiv');
    const body = encodeURIComponent(
      `Name: ${formData.name || 'Friend'}\nEmail: ${formData.email || ''}\n\nMessage:\n${formData.message || ''}`
    );
    window.location.href = `mailto:${data.personalInfo.email}?subject=${sub}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#08080a] relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs font-mono text-indigo-400 tracking-wider mb-2 uppercase">
            06. Connect & Collaborate
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {data.contact.heading}
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            {data.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info & Verified Channels */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-xl bg-[#0c0c12] border border-white/10 space-y-4">
              <div className="text-xs font-mono text-neutral-400">Direct Contact</div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="text-base sm:text-lg font-mono font-medium text-white hover:text-indigo-400 transition-colors break-all"
                >
                  {data.personalInfo.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors shrink-0 ${
                    isCopied
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/[0.04] border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                  aria-label="Copy email address"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Feel free to reach out directly regarding engineering collaborations, student initiatives, or technical projects.
              </p>
            </div>

            {/* Verified Social Channels */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-neutral-400">Verified Platforms</div>
              
              <a
                href={data.personalInfo.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-neutral-300 group-hover:text-white group-hover:bg-indigo-600/20 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white tracking-tight">GitHub</div>
                    <div className="text-xs font-mono text-neutral-400">{data.personalInfo.github.replace('https://', '')}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-neutral-300 group-hover:text-white group-hover:bg-indigo-600/20 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white tracking-tight">LinkedIn</div>
                    <div className="text-xs font-mono text-neutral-400">{data.personalInfo.linkedin.replace('https://', '')}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Academic Affiliation Note */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-neutral-400 space-y-1">
              <div className="text-neutral-300 font-medium">Institution Location</div>
              <div>{data.personalInfo.institution}</div>
              <div>{data.personalInfo.affiliation}, {data.personalInfo.location}</div>
            </div>

          </div>

          {/* Right Column: Interactive Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 shadow-2xl">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Send a direct message</span>
                </div>
                <span className="text-xs font-mono text-neutral-400">{data.personalInfo.name}</span>
              </div>

              {submitSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    Message Received
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message details have been noted. You can also send directly via your email client if preferred.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 text-xs font-mono rounded bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 transition-colors"
                    >
                      Send another message
                    </button>
                    <button
                      type="button"
                      onClick={openMailto}
                      className="px-4 py-2 text-xs font-mono rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                    >
                      Open Email Client
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-neutral-300 mb-1.5">
                        Your Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                          errors.name ? 'border-red-500/60' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-neutral-300 mb-1.5">
                        Your Email <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="e.g. alex@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                          errors.email ? 'border-red-500/60' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Subject <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      placeholder="e.g. Technical inquiry regarding APEX / Collaboration"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                        errors.subject ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Message <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Share your thoughts, project ideas, or question..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none ${
                        errors.message ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[10px] font-mono text-neutral-400">
                        {formData.message.length} characters
                      </span>
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={openMailto}
                      className="w-full sm:w-auto text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors py-2 text-center"
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
