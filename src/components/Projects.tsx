/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredApex = data.projects.find((p) => p.featured) || data.projects[0];
  const otherProjects = data.projects.filter((p) => p.id !== featuredApex?.id);

  if (!featuredApex) return null;

  return (
    <section id="projects" className="py-24 bg-black relative border-t border-neutral-900 text-white">
      {/* Decorative Dot Matrix in Corner */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-6 w-36 h-36 bg-dot-matrix opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span>( 02 )</span>
            <span className="text-neutral-600">/</span>
            <span>ENGINEERING ARCHIVE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-dot text-3xl sm:text-5xl font-black tracking-wider text-white mb-3">
                SELECTED PROJECTS.
              </h2>
              <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
                Autonomous desktop systems, regional language interaction, and full-stack campus software.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              [{data.projects.length} UNITS DOCUMENTED]
            </div>
          </div>
        </div>

        {/* Featured Flagship Project: APEX */}
        <div className="mb-14">
          <div className="group relative rounded-3xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 transition-all duration-300 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={featuredApex.imageUrl}
                  alt={featuredApex.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02] filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#090909] opacity-90" />
                
                {/* Visual Banner Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d71920] shadow-[0_0_8px_rgba(215,25,32,0.8)]" />
                  <span>FLAGSHIP_01</span>
                </div>
              </div>

              {/* Right Column: Project Narrative & Metadata */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                    <span className="text-white font-medium">{featuredApex.shortTitle}</span>
                    <span aria-hidden="true" className="text-neutral-700">/</span>
                    <span>{featuredApex.subtitle}</span>
                  </div>

                  <h3 className="font-dot text-2xl sm:text-3xl font-bold text-white tracking-wider mb-3">
                    {featuredApex.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                    {featuredApex.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-6 font-mono text-xs">
                    {featuredApex.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-neutral-300">
                        <span className="w-1 h-1 rounded-full bg-[#d71920] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-8 text-xs font-mono text-neutral-400">
                    {featuredApex.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions (Monochrome) */}
                <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(featuredApex)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-mono font-medium tracking-wider text-black bg-white hover:bg-neutral-200 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  >
                    <span>EXPLORE PROJECT & SIMULATOR</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={featuredApex.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono text-neutral-400 hover:text-white bg-transparent hover:bg-white/[0.04] border border-neutral-800 hover:border-neutral-600 rounded-full transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project, pIdx) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Visual Preview */}
                  <div className="relative aspect-[16/10] bg-black overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-300 bg-black/80 px-2.5 py-1 rounded-full border border-neutral-800 backdrop-blur-md">
                      0{pIdx + 2} // {project.shortTitle}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                      <span className="text-white">{project.shortTitle}</span>
                      <span aria-hidden="true" className="text-neutral-700">/</span>
                      <span>{project.subtitle}</span>
                    </div>

                    <h3 className="font-dot text-xl sm:text-2xl font-bold text-white tracking-wider mb-2.5">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5 font-sans">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5 font-mono text-xs">
                      {project.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-neutral-300">
                          <span className="w-1 h-1 rounded-full bg-[#d71920] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-neutral-400">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-7 pt-0 border-t border-neutral-800/60 mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-neutral-300 transition-colors"
                  >
                    <span>VIEW DETAILS & SANDBOX</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
