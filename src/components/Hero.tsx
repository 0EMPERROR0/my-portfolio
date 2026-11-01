/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Sparkles, SlidersHorizontal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data, openAdminModal, isAdminAuthenticated } = usePortfolio();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#08080a]"
    >
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-tr from-indigo-900/15 via-violet-800/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status & Academic Affiliation (Clean unboxed text, no pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-6 font-mono tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>{data.hero.statusText}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{data.hero.collegeBadge}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>KTU</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.08] text-balance">
              {data.hero.greeting}
            </h1>

            {/* Supporting Heading */}
            <h2 className="text-xl sm:text-2xl font-medium text-neutral-300 mb-5 leading-snug tracking-tight text-balance">
              {data.hero.tagline}
            </h2>

            {/* Bio Description */}
            <p className="text-base text-neutral-400 max-w-xl leading-relaxed mb-8">
              {data.hero.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-950/40 hover:shadow-indigo-600/20 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 w-full sm:w-auto"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 w-full sm:w-auto"
              >
                <span>Get In Touch</span>
                <Mail className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            {/* Verified Social & Profiles */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/[0.06] w-full">
              <a
                href={data.personalInfo.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${data.personalInfo.email}`}
                className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Right Column: Parthiv R Portrait Showcase (Replaces APEX preview) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="group relative w-full max-w-[380px]">
              
              {/* Ambient backdrop glow for the portrait */}
              <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500/20 via-violet-500/10 to-transparent rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Portrait Frame Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c14] shadow-2xl shadow-black/90">
                
                {/* Photo Container */}
                <div className="relative aspect-[3/4] w-full bg-black overflow-hidden">
                  <img
                    src={data.hero.photoUrl}
                    alt={`${data.personalInfo.name} Portrait`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('public/')) {
                        target.src = '/public' + data.hero.photoUrl;
                      }
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  
                  {/* Subtle lighting scrim to ensure legibility and dark mood */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60" />

                  {/* Corner Accent badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-mono text-neutral-200 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>Computer Science & Eng.</span>
                  </div>

                  {/* Owner quick edit button */}
                  <button
                    type="button"
                    onClick={openAdminModal}
                    title="Customize photo and content"
                    aria-label="Customize photo and content"
                    className="absolute top-4 right-4 p-2 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md text-neutral-400 hover:text-white border border-white/10 transition-colors opacity-70 group-hover:opacity-100 focus:opacity-100"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>

                  {/* Caption & Identity Overlay at Bottom of Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-white tracking-tight">
                        {data.personalInfo.name}
                      </div>
                      <span className="text-[11px] font-mono text-indigo-400">
                        {data.hero.locationText}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 font-normal">
                      {data.hero.collegeBadge}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/[0.08]">
                      <span>Full-Stack & Applied ML</span>
                      <span className="text-neutral-400">Kerala, India</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 pt-8 flex items-center justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-neutral-400 group-hover:text-indigo-400 transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
};
