/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, Award, Heart, Terminal, Quote } from 'lucide-react';
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
    <section id="community" className="py-24 bg-[#08080a] relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-indigo-400 tracking-wider mb-2 uppercase">
            04. Community & Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Building Together.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Fostering peer learning, technical workshops, and collaborative exploration within engineering communities.
          </p>
        </div>

        {/* Featured Editorial Quote */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c12] border border-white/10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex items-start gap-4">
            <Quote className="w-8 h-8 text-indigo-400 shrink-0 opacity-70 mt-1" />
            <div className="space-y-3">
              <blockquote className="text-lg sm:text-xl font-medium text-neutral-100 leading-relaxed font-sans">
                "{data.personalInfo.communityQuote}"
              </blockquote>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="text-white font-medium">{data.personalInfo.name}</span>
                <span>·</span>
                <span>Community Coordinator & Engineering Student</span>
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
                className="p-7 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-indigo-400">{role.type}</span>
                    <span>{role.period}</span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="p-2.5 rounded-lg bg-indigo-950/40 text-indigo-400 border border-indigo-500/20 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {role.role}
                      </h3>
                      <div className="text-xs font-medium text-neutral-300">
                        {role.organization}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {role.description}
                  </p>
                </div>

                {/* Key Activities / Impact List */}
                <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                  {role.impactItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80 shrink-0 mt-1.5" />
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
