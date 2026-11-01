/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data, openAdminModal, isAdminAuthenticated } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#060608] border-t border-white/[0.06] text-neutral-400">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.04]">
          
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded border border-white/10 bg-white/[0.04] text-xs font-mono font-medium text-indigo-300">
              PR
            </span>
            <div className="text-sm font-medium text-neutral-200">
              Designed & Built by {data.personalInfo.name}.
            </div>
          </div>

          {/* Nav quick links */}
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#interests" className="hover:text-white transition-colors">Interests</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#beyond" className="hover:text-white transition-colors">Beyond</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${data.personalInfo.email}`}
              aria-label="Email Parthiv"
              className="p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            &copy; {currentYear} {data.personalInfo.name}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>{data.personalInfo.institution} · KTU</span>
            
            <button
              type="button"
              onClick={openAdminModal}
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-indigo-400 transition-colors p-1"
            >
              <Shield className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Owner Studio (Active)' : 'Owner Access'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
