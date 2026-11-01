/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Dumbbell, Car, Film, Tv, Gamepad2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PersonalSide: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedPursuit, setSelectedPursuit] = useState<number>(1); // default to automotive concept

  const icons = [Dumbbell, Car, Film, Tv, Gamepad2, Sparkles];

  return (
    <section id="beyond" className="py-24 bg-[#09090c] relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-indigo-400 tracking-wider mb-2 uppercase">
            05. Personal Pursuits & Dimensions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Beyond the screen.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            The disciplines, stories, and aesthetics outside of software that enrich my perspective and creative thinking.
          </p>
        </div>

        {/* Featured Showcase: Automotive Design & Form Studies */}
        <div className="mb-12 rounded-2xl bg-[#0c0c12] border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:h-[380px] bg-black overflow-hidden">
              <img
                src={data.beyondScreen.automotiveImage}
                alt="Automotive aerodynamic supercar concept clay styling and digital vector lines"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0c0c12] opacity-80" />
              
              <div className="absolute top-4 left-4 text-xs font-mono text-neutral-300 bg-black/60 px-3 py-1.5 rounded border border-white/10 backdrop-blur-md">
                Design Study · Automotive Aerodynamics
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 space-y-4">
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                {data.beyondScreen.automotiveSubtitle}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {data.beyondScreen.automotiveTitle}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {data.beyondScreen.automotiveDescription}
              </p>
              <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
                {data.beyondScreen.automotiveAxiom}
              </div>
            </div>

          </div>
        </div>

        {/* Personal Pursuits Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.personalPursuits.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            const isSelected = selectedPursuit === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedPursuit(idx)}
                className={`p-6 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/20 border-indigo-500/40 shadow-lg shadow-indigo-950/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-white/[0.04] text-indigo-400 border border-white/[0.06]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <div className="text-xs text-neutral-400 font-mono mb-3">
                    {item.category}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] text-[11px] text-neutral-400 italic">
                  "{item.takeaway}"
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
