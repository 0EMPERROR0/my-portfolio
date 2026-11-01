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
      title: 'Academic Foundation',
      institution: data.personalInfo.institution,
      affiliation: data.personalInfo.affiliation,
      text: 'Currently pursuing Computer Science & Engineering in Kerala, India. Grounded in core computer science principles, algorithmic problem solving, and modern software paradigms.'
    },
    {
      icon: Code2,
      title: 'Full-Stack & Applied ML',
      institution: 'Engineering Practice',
      affiliation: 'Frontend · Backend · ML',
      text: 'Passionate about building complete web architectures and taking applied machine learning models out of notebooks into practical, responsive software that real people can use daily.'
    },
    {
      icon: Compass,
      title: 'Design & Automotive Sensibility',
      institution: 'Visual Craft',
      affiliation: 'Minimalism · Ergonomics',
      text: 'My interests reach beyond conventional code into industrial design, aerodynamic form factors, and minimalist user interfaces where every element has purpose and elegance.'
    },
    {
      icon: Sparkles,
      title: 'Continuous Experimentation',
      institution: 'Mindset',
      affiliation: 'Curiosity · Iteration',
      text: 'Belief in continuous hands-on building, rapid prototyping, and solving authentic friction points—from campus canteen queues to autonomous desktop agents.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#09090c] relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs font-mono text-indigo-400 tracking-wider mb-2 uppercase">
            01. Background & Perspective
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            A little about me.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Bridging technical problem-solving with intuitive user experiences, shaped by continuous curiosity and thoughtful design.
          </p>
        </div>

        {/* Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-xl sm:text-2xl text-neutral-100 font-medium leading-snug">
              I am <span className="text-white font-semibold">{data.personalInfo.name}</span>, an engineering undergraduate who views code as a creative medium to simplify complex systems.
            </p>

            <p className="text-neutral-300">
              {data.personalInfo.detailedBio[0] ||
                `Studying Computer Science and Engineering at ${data.personalInfo.institution} (affiliated with ${data.personalInfo.affiliation}), I devote my time to exploring full-stack web architectures and applied machine learning.`}
            </p>

            <p className="text-neutral-300">
              {data.personalInfo.detailedBio[2] ||
                `My work focuses on the intersection of deep technical logic and intuitive user experiences. My interests extend beyond software engineering into minimalist design, automotive design concepts, and visual creativity.`}
            </p>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] relative">
              <p className="text-sm sm:text-base italic text-neutral-200 leading-relaxed font-sans">
                "{data.personalInfo.detailedBio[3] || 'I believe in continuous learning, experimentation, and building things that solve meaningful problems.'}"
              </p>
              <div className="mt-3 text-xs font-mono text-indigo-400">
                — Core Philosophy
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
              >
                <span>Explore my featured projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Facets Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {facets.map((facet, idx) => {
              const Icon = facet.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3.5 mb-2.5">
                    <div className="p-2 rounded-lg bg-indigo-950/40 text-indigo-400 border border-indigo-500/20 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">
                        {facet.title}
                      </h3>
                      <div className="text-xs text-neutral-400 font-mono">
                        {facet.institution} · {facet.affiliation}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-11">
                    {facet.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Life Outside Technology Preview (Editorial Bar) */}
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Life Outside Tech
            </div>
            <div className="text-sm font-medium text-neutral-200">
              Strength training, automotive concepts, cinema, anime, and video games.
            </div>
          </div>
          <div className="flex items-center gap-6 text-neutral-400 text-xs">
            <span className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors">
              <Dumbbell className="w-3.5 h-3.5 text-indigo-400" /> Strength Training
            </span>
            <span className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors">
              <Film className="w-3.5 h-3.5 text-indigo-400" /> Cinema & Anime
            </span>
            <span className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors">
              <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" /> Gaming
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
