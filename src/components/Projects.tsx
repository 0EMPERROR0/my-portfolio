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
    <section id="projects" className="py-24 bg-[#08080a] relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs font-mono text-indigo-400 tracking-wider mb-2 uppercase">
            02. Featured Engineering Work
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
                Selected Projects.
              </h2>
              <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
                Exploring desktop automation, regional language interfaces, and campus digital utilities.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              {data.projects.length} Projects Documented
            </div>
          </div>
        </div>

        {/* Featured Project Showcase: APEX (Large Flagship Presentation) */}
        <div className="mb-14">
          <div className="group relative rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-black/40 overflow-hidden">
                <img
                  src={featuredApex.imageUrl}
                  alt={featuredApex.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0c0c12] opacity-80" />
                
                {/* Visual Banner Tag (unboxed clean text) */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Featured Flagship Project</span>
                </div>
              </div>

              {/* Right Column: Project Narrative & Metadata */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
                    <span>{featuredApex.shortTitle}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{featuredApex.subtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                    {featuredApex.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                    {featuredApex.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-6">
                    {featuredApex.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-mono text-neutral-400">
                    {featuredApex.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(featuredApex)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <span>View Project & Simulator</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={featuredApex.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl bg-[#0c0c12] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Visual Preview */}
                  <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-3 left-3 text-[11px] font-mono text-neutral-300 bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                      {project.shortTitle}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
                      <span>{project.shortTitle}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>{project.subtitle}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-2.5">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {project.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-neutral-400">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>View Project Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
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
