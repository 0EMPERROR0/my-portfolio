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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#090909] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col text-white"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span className="text-neutral-400">SPECIFICATION // {project.shortTitle.toUpperCase()}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Visual Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-800 bg-black">
            <img
              src={project.imageUrl}
              alt={project.imageAlt || project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-85" />
            
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400">
                  {project.subtitle}
                </span>
                <h3 id="modal-project-title" className="font-dot text-2xl sm:text-3xl font-black text-white tracking-wider">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Tab Navigation inside Modal */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            <button
              type="button"
              onClick={() => setSelectedDemoTab('overview')}
              className={`px-4 py-2 text-xs font-mono rounded-full transition-colors flex items-center gap-2 ${
                selectedDemoTab === 'overview'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>PROJECT SPECIFICATION</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedDemoTab('simulator')}
              className={`px-4 py-2 text-xs font-mono rounded-full transition-colors flex items-center gap-2 ${
                selectedDemoTab === 'simulator'
                  ? 'bg-neutral-800 text-white font-semibold border border-neutral-600'
                  : 'text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#d71920]" />
              <span>INTERACTIVE SIMULATOR</span>
            </button>
          </div>

          {selectedDemoTab === 'overview' ? (
            <div className="space-y-8">
              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-neutral-400 mb-2 uppercase">
                  // CONTEXT & ARCHITECTURE
                </h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {project.longDescription}
                </p>
              </div>

              {/* Core Highlights */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-neutral-400 mb-3 uppercase">
                  // KEY CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-black border border-neutral-800 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d71920] shrink-0 mt-1.5" />
                      <span className="text-xs text-neutral-200 font-mono">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Breakdown */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-neutral-400 mb-3 uppercase">
                  // ENGINEERING PILLARS
                </h4>
                <div className="space-y-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-black border border-neutral-800"
                    >
                      <div className="text-xs font-mono font-bold text-white mb-1">
                        0{idx + 1} // {feat.title.toUpperCase()}
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Technologies */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-neutral-400 mb-2 uppercase">
                  // TECH STACK
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-300">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800"
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
                <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
                      APEX Speech & Automation Engine
                    </span>
                    <span className="text-neutral-400">Malayalam Phonetic Dispatch</span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Test how APEX processes natural Malayalam and English voice inputs to trigger localized desktop commands.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {malayalamDemos.map((demo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveMalayalamVoice(idx)}
                        className={`p-3 text-left rounded-xl border text-xs transition-colors font-mono ${
                          activeMalayalamVoice === idx
                            ? 'bg-neutral-900 border-white text-white'
                            : 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-white">{demo.mal}</div>
                        <div className="text-[10px] text-neutral-400 mt-1">{demo.eng}</div>
                      </button>
                    ))}
                  </div>

                  {/* Terminal Execution Preview */}
                  <div className="p-4 rounded-xl bg-[#050505] border border-neutral-800 font-mono text-xs space-y-2">
                    <div className="text-neutral-400 flex items-center justify-between text-[11px]">
                      <span>STATUS: EXECUTING</span>
                      <span className="text-[#d71920]">{malayalamDemos[activeMalayalamVoice].status}</span>
                    </div>
                    <div className="text-neutral-200">
                      &gt; Voice input: "{malayalamDemos[activeMalayalamVoice].mal}"
                    </div>
                    <div className="text-white pt-2 border-t border-neutral-800/80">
                      {malayalamDemos[activeMalayalamVoice].response}
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'campusbite' && (
                <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
                      CampusBite Live Preordering Simulator
                    </span>
                    <span className="text-neutral-400">University Cafeteria</span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Simulate how students preorder cafeteria items between classes and receive automated digital pickup tokens.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                    {['Thai Green Curry', 'Spicy Burger', 'Smoothie', 'Avo-Toast'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedFoodItem(item);
                          setTokenGenerated(null);
                        }}
                        className={`p-3 text-left rounded-xl border text-xs transition-colors ${
                          selectedFoodItem === item
                            ? 'bg-neutral-900 border-white text-white'
                            : 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-white">{item}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">Counter 1</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#050505] border border-neutral-800 font-mono">
                    <div>
                      <div className="text-xs text-neutral-400">Item: {selectedFoodItem}</div>
                      <div className="text-xs text-neutral-300 mt-0.5">Est. Prep: ~7 mins</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateToken}
                      className="px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-full transition-colors"
                    >
                      Pre-order
                    </button>
                  </div>

                  {tokenGenerated && (
                    <div className="p-4 rounded-2xl bg-[#0c0c0c] border border-neutral-700 text-center space-y-1">
                      <div className="text-xs font-mono text-neutral-400">DIGITAL PICKUP TOKEN</div>
                      <div className="font-dot text-3xl font-black text-white tracking-widest">
                        {tokenGenerated}
                      </div>
                      <div className="text-xs text-neutral-400 font-mono">
                        Ready status will illuminate when prepared.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {project.id === 'portfolio' && (
                <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
                      Nothing-Inspired Monochrome System
                    </span>
                    <span className="text-neutral-400">Parthiv R Studio</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                      <div className="text-xs text-white mb-1">Monochrome Canvas</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                        Pure black (`#000000`), subtle dark charcoal surfaces, stark white typography.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                      <div className="text-xs text-white mb-1">Nothing Red Accent</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                        Restrained `#d71920` red dot indicators inspired by Nothing OS recording glyphs.
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                      <div className="text-xs text-white mb-1">Dot-Matrix Type</div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                        Doto variable dot-matrix display face for selective prominent headings.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-transparent hover:bg-white/[0.06] border border-neutral-800 hover:border-neutral-600 rounded-full transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry regarding ${project.shortTitle}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full transition-colors"
              >
                <span>DISCUSS PROJECT</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              CLOSE [ESC]
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
