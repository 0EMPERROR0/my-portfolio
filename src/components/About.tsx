/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Code2, Compass, Sparkles, Dumbbell, Film, Gamepad2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const facets = [
    {
      icon: GraduationCap,
      code: '01_ACADEMIC',
      title: 'Academic Foundation',
      institution: data.personalInfo.institution,
      affiliation: data.personalInfo.affiliation,
      text: 'Pursuing Computer Science & Engineering in Kerala, India. Grounded in core algorithmic problem solving, operating systems, and distributed web paradigms.'
    },
    {
      icon: Code2,
      code: '02_ENGINEERING',
      title: 'Full-Stack & Applied ML',
      institution: 'Engineering Practice',
      affiliation: 'Frontend · Backend · ML',
      text: 'Architecting complete software systems and translating machine learning models into intuitive, tactile web utilities that solve practical campus and personal challenges.'
    },
    {
      icon: Compass,
      code: '03_INDUSTRIAL',
      title: 'Design & Automotive Sensibility',
      institution: 'Visual Craft',
      affiliation: 'Minimalism · Ergonomics',
      text: 'Inspired by aerodynamic form factors and Nothing-style industrial transparency, where engineering constraints dictate sculptural elegance and zero visual drag.'
    },
    {
      icon: Sparkles,
      code: '04_MINDSET',
      title: 'Continuous Experimentation',
      institution: 'Philosophy',
      affiliation: 'Curiosity · Iteration',
      text: 'Committed to hands-on prototyping, community open-source initiatives, and building technology that feels effortless and purposeful to interact with.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-black relative border-t border-neutral-900 text-white">
      {/* Background Decorative Matrix Grid */}
      <div
        aria-hidden="true"
        className="absolute top-10 right-8 w-32 h-32 bg-dot-matrix opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header (Nothing Style) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span>( 01 )</span>
            <span className="text-neutral-600">/</span>
            <span>ABOUT ME</span>
          </div>
          <h2 className="font-dot text-3xl sm:text-5xl font-black tracking-wider text-white mb-4">
            A LITTLE ABOUT ME.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Bridging technical problem-solving with intuitive user experiences, shaped by continuous curiosity and restrained design.
          </p>
        </div>

        {/* Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
            <p className="text-lg sm:text-xl text-white font-medium leading-snug">
              I am <span className="font-dot tracking-wide text-white font-bold">{data.personalInfo.name}</span>, a developer and designer who treats code as a precision tool to simplify complex software.
            </p>

            <p className="text-neutral-400">
              {data.personalInfo.detailedBio[0] ||
                `Studying Computer Science and Engineering at ${data.personalInfo.institution} (affiliated with ${data.personalInfo.affiliation}), I devote my time to exploring full-stack web architectures and applied machine learning.`}
            </p>

            <p className="text-neutral-400">
              {data.personalInfo.detailedBio[2] ||
                `My work focuses on the intersection of deep technical logic and intuitive user experiences. My interests extend beyond software engineering into minimalist design, automotive design concepts, and visual creativity.`}
            </p>

            {/* Quote Block with Red Indicator */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 relative">
              <div className="flex items-start gap-3">
                <span className="w-1 h-8 rounded-full bg-[#d71920] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-mono">
                    "{data.personalInfo.detailedBio[3] || 'I believe in continuous learning, experimentation, and building things that solve meaningful problems.'}"
                  </p>
                  <div className="text-[11px] font-mono text-neutral-400">
                    // CORE PHILOSOPHY
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white hover:text-neutral-300 transition-colors group"
              >
                <span>EXPLORE FEATURED PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Facets Technical Spec Modules */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
            {facets.map((facet, idx) => {
              const Icon = facet.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-neutral-900 text-white border border-neutral-800">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-white tracking-wide">
                          {facet.title}
                        </h3>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          {facet.institution}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {facet.code}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-10">
                    {facet.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Life Outside Technology Strip */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-[#d71920]" />
              <span>Personal Pursuits</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-neutral-200">
              Strength training, automotive concepts, cinema, anime, and video games.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-neutral-400 text-xs font-mono">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Dumbbell className="w-3.5 h-3.5 text-neutral-300" /> Strength Training
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Film className="w-3.5 h-3.5 text-neutral-300" /> Cinema & Anime
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Gamepad2 className="w-3.5 h-3.5 text-neutral-300" /> Interactive Gaming
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
