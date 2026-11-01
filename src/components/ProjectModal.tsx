/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle, Terminal, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [selectedDemoTab, setSelectedDemoTab] = useState<'overview' | 'simulator'>('overview');
  
  // APEX Malayalam/English test state
  const [activeMalayalamVoice, setActiveMalayalamVoice] = useState<number>(0);
  
  // CampusBite interactive state
  const [selectedFoodItem, setSelectedFoodItem] = useState<string>('Thai Green Curry');
  const [tokenGenerated, setTokenGenerated] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const malayalamDemos = [
    {
      mal: 'തുറക്കുക ബ്രൗസർ',
      eng: 'Open browser',
      status: 'DISPATCH_APP // BROWSER',
      response: 'APEX: Opening browser workspace on default screen.'
    },
    {
      mal: 'സിസ്റ്റം നില പരിശോധിക്കുക',
      eng: 'Check system status',
      status: 'DIAGNOSTIC_QUERY',
      response: 'APEX: CPU load 14%, RAM 3.2GB utilized, network latency 12ms.'
    },
    {
      mal: 'റിമൈൻഡർ സജ്ജമാക്കുക',
      eng: 'Set a reminder for lecture',
      status: 'SCHEDULER_CREATE',
      response: 'APEX: Reminder scheduled for 2:00 PM: "CS Lab Session".'
    }
  ];

  const handleGenerateToken = () => {
    const randomToken = `CB-${Math.floor(100 + Math.random() * 900)}`;
    setTokenGenerated(randomToken);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0c0c12] border border-white/10 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-mono text-neutral-400">Project Exploration</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Visual Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-black/40">
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-300">
                  {project.subtitle}
                </span>
                <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Tab Navigation inside Modal */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <button
              type="button"
              onClick={() => setSelectedDemoTab('overview')}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-2 ${
                selectedDemoTab === 'overview'
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Project Overview & Architecture</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedDemoTab('simulator')}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-2 ${
                selectedDemoTab === 'simulator'
                  ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Feature Sandbox</span>
            </button>
          </div>

          {selectedDemoTab === 'overview' ? (
            <div className="space-y-8">
              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  System Context & Purpose
                </h4>
                <p className="text-base text-neutral-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Core Highlights (Unboxed text) */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Key Focal Points
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-200 font-medium">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Breakdown */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Architectural Pillars
                </h4>
                <div className="space-y-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                    >
                      <div className="text-sm font-semibold text-white mb-1">
                        {feat.title}
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-300">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Sandbox Tab */
            <div className="space-y-6">
              {project.id === 'apex' && (
                <div className="p-6 rounded-xl bg-black/60 border border-white/[0.08] space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-indigo-400">APEX Speech & Automation Engine</span>
                    <span className="text-neutral-400">Malayalam Phonetic Dispatch</span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Test how APEX processes natural Malayalam and English voice inputs to trigger localized desktop commands.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {malayalamDemos.map((demo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveMalayalamVoice(idx)}
                        className={`p-3 text-left rounded-lg border text-xs transition-colors ${
                          activeMalayalamVoice === idx
                            ? 'bg-indigo-950/60 border-indigo-500 text-white'
                            : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="font-medium text-neutral-100">{demo.mal}</div>
                        <div className="text-[11px] text-neutral-400 mt-1">{demo.eng}</div>
                      </button>
                    ))}
                  </div>

                  {/* Terminal Execution Preview */}
                  <div className="p-4 rounded-lg bg-[#07070a] border border-white/[0.06] font-mono text-xs space-y-2">
                    <div className="text-neutral-400 flex items-center justify-between">
                      <span>Status: ACTIVE_EXECUTION</span>
                      <span className="text-indigo-400">{malayalamDemos[activeMalayalamVoice].status}</span>
                    </div>
                    <div className="text-neutral-200">
                      &gt; Voice capture: "{malayalamDemos[activeMalayalamVoice].mal}"
                    </div>
                    <div className="text-indigo-300 pt-1 border-t border-white/[0.06]">
                      {malayalamDemos[activeMalayalamVoice].response}
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'campusbite' && (
                <div className="p-6 rounded-xl bg-black/60 border border-white/[0.08] space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-indigo-400">CampusBite Live Ordering Simulator</span>
                    <span className="text-neutral-400">University Cafeteria</span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Simulate how students preorder items between classes and receive automated digital pickup tokens.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Thai Green Curry', 'Spicy Chicken Burger', 'Superfood Smoothie', 'Avo-Toast Bowl'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedFoodItem(item);
                          setTokenGenerated(null);
                        }}
                        className={`p-3 text-left rounded-lg border text-xs transition-colors ${
                          selectedFoodItem === item
                            ? 'bg-indigo-950/60 border-indigo-500 text-white'
                            : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="font-medium text-neutral-100">{item}</div>
                        <div className="text-[10px] text-neutral-400 mt-1">Canteen Kitchen A</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#07070a] border border-white/[0.06]">
                    <div>
                      <div className="text-xs text-neutral-400 font-mono">Selected: {selectedFoodItem}</div>
                      <div className="text-xs text-neutral-300 mt-0.5">Estimated Prep Time: ~7 mins</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateToken}
                      className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
                    >
                      Pre-order Now
                    </button>
                  </div>

                  {tokenGenerated && (
                    <div className="p-4 rounded-lg bg-indigo-950/40 border border-indigo-500/40 text-center space-y-1">
                      <div className="text-xs font-mono text-indigo-300">Digital Pickup Token Generated</div>
                      <div className="text-3xl font-extrabold text-white tracking-widest font-mono">
                        {tokenGenerated}
                      </div>
                      <div className="text-xs text-neutral-300">
                        Present this token at Counter 2 when marked "Ready for Pickup".
                      </div>
                    </div>
                  )}
                </div>
              )}

              {project.id === 'portfolio' && (
                <div className="p-6 rounded-xl bg-black/60 border border-white/[0.08] space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-indigo-400">Design Engineering System</span>
                    <span className="text-neutral-400">Parthiv R Brand Architecture</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.06]">
                      <div className="text-xs font-mono text-indigo-300 mb-1">60-30-10 Palette</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        60% Obsidian Black (`#08080a`), 30% Charcoal Slate, 10% Indigo focal accents.
                      </p>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.06]">
                      <div className="text-xs font-mono text-indigo-300 mb-1">Anti-Slop Discipline</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        No code-comment headers, zero pill enclosures for metadata, no decorative pulsing dots.
                      </p>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.06]">
                      <div className="text-xs font-mono text-indigo-300 mb-1">Typography Math</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        Plus Jakarta Sans paired with JetBrains Mono tabular numerals for precision.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry regarding ${project.shortTitle}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-indigo-300 hover:text-indigo-200 bg-indigo-950/30 hover:bg-indigo-950/60 border border-indigo-500/20 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span>Discuss Project</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Close Viewer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
