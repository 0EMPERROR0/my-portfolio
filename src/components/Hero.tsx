/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Github, Linkedin, Mail, SlidersHorizontal, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data, openAdminModal } = usePortfolio();

  return (
    <section
      id="home"
      className="relative min-h-[96vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden bg-black text-white"
    >
      {/* Decorative Dot Matrix Clusters (Matching Reference Image) */}
      <div
        aria-hidden="true"
        className="absolute top-24 left-6 sm:left-12 w-28 h-28 bg-dot-matrix opacity-40 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 right-6 sm:right-12 w-44 h-44 bg-dot-matrix opacity-35 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy (Nothing Aesthetic) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Top Greeting Kicker */}
            <div className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 mb-2">
              Hello, I'm
            </div>

            {/* Prominent Dot-Matrix Name */}
            <h1 className="font-dot text-4xl sm:text-6xl lg:text-7xl font-black tracking-wider text-white leading-none mb-3 text-balance">
              {data.personalInfo.name || 'Parthiv R'}
            </h1>

            {/* Restrained Red Accent Line */}
            <div className="w-12 h-[2.5px] bg-[#d71920] mb-4 shadow-[0_0_10px_rgba(215,25,32,0.8)]" />

            {/* Subtitle / Academic Status */}
            <h2 className="text-sm sm:text-base font-mono text-neutral-200 tracking-wide mb-4">
              {data.hero.statusText || 'B.Tech CSE Student'}
            </h2>

            {/* Bio Description Paragraph */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed mb-8 font-normal font-sans">
              {data.hero.bio ||
                'Building practical and innovative software solutions with a focus on AI, usability, and real-world impact.'}
            </p>

            {/* Action Buttons (Monochrome Pills) */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-semibold tracking-wider text-black bg-white hover:bg-neutral-200 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-medium tracking-wider text-white bg-transparent hover:bg-white/[0.06] border border-neutral-700 hover:border-neutral-400 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 w-full sm:w-auto"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social Icons (Clean Monochrome) */}
            <div className="flex items-center gap-5 pt-4">
              <a
                href={data.personalInfo.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub Profile"
                className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn Profile"
                className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${data.personalInfo.email}`}
                aria-label="Send Email"
                className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Clean Portrait Photo Frame (No phone design overlay) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Clean Framed Card */}
              <div className="relative rounded-3xl border border-neutral-800 bg-[#090909] p-2.5 shadow-2xl overflow-hidden group">
                
                {/* Photo Container */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black">
                  <img
                    src={data.hero.photoUrl}
                    alt={`${data.personalInfo.name} Portrait`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('public/')) {
                        target.src = '/public' + data.hero.photoUrl;
                      }
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Subtle bottom gradient to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Top-Right Red Accent Recording Dot */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-neutral-800 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d71920] shadow-[0_0_8px_rgba(215,25,32,0.8)]" />
                    <span className="text-[10px] font-mono text-neutral-300 tracking-wider">LIVE</span>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-dot text-base font-bold text-white tracking-wider">
                        {data.personalInfo.name.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {data.hero.locationText || 'KERALA'}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-neutral-400">
                      {data.hero.collegeBadge || 'SREE BUDDHA COLLEGE OF ENG'}
                    </div>
                  </div>

                  {/* Owner Quick Edit Button */}
                  <button
                    type="button"
                    onClick={openAdminModal}
                    title="Open Owner CMS Studio"
                    aria-label="Customize Hero & Content"
                    className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/70 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-md"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator (Chevron Down) */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="group flex flex-col items-center text-neutral-500 hover:text-white transition-colors p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
