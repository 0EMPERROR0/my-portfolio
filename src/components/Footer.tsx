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
    <footer className="py-12 bg-black border-t border-neutral-900 text-neutral-400 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <span className="font-dot text-xl font-bold text-white">
              P
            </span>
            <div className="text-xs text-neutral-300">
              DESIGNED & BUILT BY {data.personalInfo.name.toUpperCase()}
            </div>
          </div>

          {/* Nav quick links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#interests" className="hover:text-white transition-colors">Skills</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#beyond" className="hover:text-white transition-colors">Beyond</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile"
              className="p-2 rounded-full border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${data.personalInfo.email}`}
              aria-label="Email Parthiv"
              className="p-2 rounded-full border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            &copy; {currentYear} {data.personalInfo.name.toUpperCase()} // ALL RIGHTS RESERVED
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>{data.personalInfo.institution} · KTU</span>
            
            <button
              type="button"
              onClick={openAdminModal}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors p-1"
            >
              <Shield className="w-3 h-3 text-[#d71920]" />
              <span>{isAdminAuthenticated ? 'OWNER STUDIO [ACTIVE]' : 'OWNER ACCESS'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
