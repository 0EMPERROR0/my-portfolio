/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Code, Brain, Compass, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Interests: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'ALL DOMAINS', icon: Layers },
    { id: 'development', name: 'DEVELOPMENT', icon: Code },
    { id: 'ai', name: 'MACHINE LEARNING', icon: Brain },
    { id: 'design', name: 'DESIGN & FORM', icon: Compass },
  ];

  const filteredCategories =
    activeCategory === 'all'
      ? data.interests
      : data.interests.filter((cat) => cat.id === activeCategory);

  return (
    <section id="interests" className="py-24 bg-black relative border-t border-neutral-900 text-white">
      {/* Background Decorative Matrix Grid */}
      <div
        aria-hidden="true"
        className="absolute top-10 right-8 w-28 h-28 bg-dot-matrix opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span>( 03 )</span>
            <span className="text-neutral-600">/</span>
            <span>DOMAINS & SKILLS</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-dot text-3xl sm:text-5xl font-black tracking-wider text-white mb-3">
                TECHNICAL INTERESTS.
              </h2>
              <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
                Areas I actively investigate across software architecture, intelligent algorithms, and industrial digital form.
              </p>
            </div>

            {/* Segmented Category Filter (Monochrome Pills) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-950 rounded-full border border-neutral-800 shrink-0 font-mono">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-full transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-12">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="space-y-5">
              
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-neutral-800 font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
                  <span className="text-sm font-bold text-white tracking-wider">
                    {cat.name.toUpperCase()}
                  </span>
                  <span className="text-xs text-neutral-400">
                    [{cat.items.length} MODULES]
                  </span>
                </div>
                <p className="text-xs text-neutral-400 max-w-md font-sans">
                  {cat.description}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-dot text-sm font-bold text-neutral-400 mb-2">
                        0{idx + 1}.
                      </div>
                      <h4 className="text-sm font-semibold text-white tracking-wide mb-2 font-sans">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-sans">
                        {item.focus}
                      </p>
                    </div>

                    {/* Unboxed inline tags */}
                    <div className="pt-3 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-400 flex flex-wrap gap-1">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-neutral-400">
                          {tag}{tIdx < item.tags.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Note on verified learning */}
        <div className="mt-12 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>// APPROACH: HANDS-ON IMPLEMENTATION & ACADEMIC RIGOR</span>
          <span className="text-white">{data.personalInfo.institution}</span>
        </div>

      </div>
    </section>
  );
};
