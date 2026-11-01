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
    { id: 'all', name: 'All Areas', icon: Layers },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'ai', name: 'Artificial Intelligence', icon: Brain },
    { id: 'design', name: 'Design & Systems', icon: Compass },
  ];

  const filteredCategories =
    activeCategory === 'all'
      ? data.interests
      : data.interests.filter((cat) => cat.id === activeCategory);

  return (
    <section id="interests" className="py-24 bg-[#09090c] relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-indigo-400 tracking-wider mb-2 uppercase">
            03. Focus & Curiosities
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
                Technical Interests.
              </h2>
              <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
                Areas I actively explore across engineering, intelligent models, and functional design systems.
              </p>
            </div>

            {/* Segmented Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] rounded-lg border border-white/[0.06] shrink-0">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
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
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-white tracking-tight">
                    {cat.name}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    ({cat.items.length} focus areas)
                  </span>
                </div>
                <p className="text-xs text-neutral-400 max-w-md">
                  {cat.description}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-indigo-400 mb-2">
                        {String(idx + 1).padStart(2, '0')}.
                      </div>
                      <h4 className="text-sm font-semibold text-white tracking-tight mb-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                        {item.focus}
                      </p>
                    </div>

                    {/* Unboxed inline tags */}
                    <div className="pt-3 border-t border-white/[0.04] text-[11px] font-mono text-neutral-400 flex flex-wrap gap-1">
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
        <div className="mt-12 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Approach: Project-based implementation & continuous academic curiosity</span>
          <span className="text-indigo-400">{data.personalInfo.institution}</span>
        </div>

      </div>
    </section>
  );
};
