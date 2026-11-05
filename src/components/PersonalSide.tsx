/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Dumbbell, Car, Film, Tv, Gamepad2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PersonalSide: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedPursuit, setSelectedPursuit] = useState<number>(1);

  const icons = [Dumbbell, Car, Film, Tv, Gamepad2, Sparkles];

  return (
    <section id="beyond" className="py-24 bg-black relative border-t border-neutral-900 text-white">
      {/* Decorative Matrix Grid */}
      <div
        aria-hidden="true"
        className="absolute top-10 right-10 w-32 h-32 bg-dot-matrix opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span>( 05 )</span>
            <span className="text-neutral-600">/</span>
            <span>PERSONAL PURSUITS</span>
          </div>
          <h2 className="font-dot text-3xl sm:text-5xl font-black tracking-wider text-white mb-4">
            BEYOND THE SCREEN.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            The disciplines, stories, and aesthetics outside of software that enrich my perspective and creative thinking.
          </p>
        </div>

        {/* Featured Showcase: Automotive Design & Form Studies */}
        <div className="mb-12 rounded-3xl bg-[#090909] border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:h-[380px] bg-black overflow-hidden">
              <img
                src={data.beyondScreen.automotiveImage}
                alt="Automotive aerodynamic supercar concept clay styling and digital vector lines"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#090909] opacity-90" />
              
              <div className="absolute top-4 left-4 text-xs font-mono text-white bg-black/80 px-3 py-1.5 rounded-full border border-neutral-800 backdrop-blur-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
                <span>FORM STUDY // AERODYNAMICS</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 space-y-4">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                {data.beyondScreen.automotiveSubtitle}
              </div>
              <h3 className="font-dot text-2xl font-bold text-white tracking-wider">
                {data.beyondScreen.automotiveTitle}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                {data.beyondScreen.automotiveDescription}
              </p>
              <div className="pt-3 border-t border-neutral-800 text-xs font-mono text-neutral-300">
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
                className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-950 border-white shadow-lg'
                    : 'bg-[#090909] border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl bg-black text-white border border-neutral-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 border border-neutral-800 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white tracking-wide mb-1 font-sans">
                    {item.title}
                  </h4>
                  <div className="text-xs text-neutral-400 font-mono mb-3">
                    {item.category}
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-300 font-mono italic">
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
