/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, Award, Heart, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Leadership: React.FC = () => {
  const { data } = usePortfolio();

  const getRoleIcon = (org: string) => {
    if (org.includes('TinkerHub')) return Users;
    if (org.includes('IEEE')) return Award;
    if (org.includes('NSS')) return Heart;
    return Terminal;
  };

  return (
    <section id="community" className="py-24 scroll-mt-16 bg-black relative border-t border-neutral-900 text-white">
      {/* Decorative Dot Matrix */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-8 w-28 h-28 bg-dot-matrix opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />
            <span>( 04 )</span>
            <span className="text-neutral-600">/</span>
            <span>COMMUNITY & LEADERSHIP</span>
          </div>
          <h2 className="font-dot text-3xl sm:text-5xl font-black tracking-wider text-white mb-4">
            BUILDING TOGETHER.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Fostering peer learning, technical workshops, and collaborative exploration within engineering groups.
          </p>
        </div>

        {/* Featured Editorial Quote with Red Accent Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090909] border border-neutral-800 mb-14 relative overflow-hidden">
          <div className="flex items-start gap-5">
            <span className="w-1.5 h-12 rounded-full bg-[#d71920] shrink-0 mt-1 shadow-[0_0_12px_rgba(215,25,32,0.8)]" />
            <div className="space-y-3">
              <blockquote className="text-base sm:text-xl font-medium text-white leading-relaxed font-sans">
                "{data.personalInfo.communityQuote}"
              </blockquote>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="text-white font-medium">{data.personalInfo.name}</span>
                <span className="text-neutral-600">/</span>
                <span>TinkerHub Head Coordinator & Engineering Student</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Editorial Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.leadership.map((role, idx) => {
            const Icon = getRoleIcon(role.organization);
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#090909] border border-neutral-800 hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-white flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#d71920]" />
                      {role.type}
                    </span>
                    <span>{role.period}</span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="p-2.5 rounded-2xl bg-black text-white border border-neutral-800 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide font-sans">
                        {role.role}
                      </h3>
                      <div className="text-xs font-mono text-neutral-400">
                        {role.organization}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                    {role.description}
                  </p>
                </div>

                {/* Key Activities / Impact List */}
                <div className="space-y-2 pt-4 border-t border-neutral-800/80 font-mono text-xs">
                  {role.impactItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-neutral-300">
                      <span className="text-[#d71920] shrink-0 font-bold">&gt;</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
