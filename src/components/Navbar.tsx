/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, SlidersHorizontal, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { data, openAdminModal, isAdminAuthenticated } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (Ctrl+Shift+P or Cmd+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        openAdminModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openAdminModal]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#interests', id: 'interests' },
    { label: 'Community', href: '#community', id: 'community' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);
    if (nextClicks >= 3) {
      openAdminModal();
      setLogoClicks(0);
    } else {
      handleNavClick('#home');
      setTimeout(() => setLogoClicks(0), 1500);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/[0.08] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
        
        {/* Zone 1: Dot-Matrix Brand Monogram */}
        <a
          href="#home"
          onClick={handleLogoClick}
          title="Parthiv R (Triple click for Owner Settings)"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded p-1"
        >
          {/* Dot-matrix style 'P' logo like reference */}
          <span className="font-dot text-2xl font-black text-white tracking-wider group-hover:text-neutral-300 transition-colors">
            P
          </span>
          <span className="text-xs font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            .tech
          </span>
        </a>

        {/* Zone 2: Nothing-style Navigation with Restrained Red Active Dot */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                  isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d71920] shrink-0 shadow-[0_0_8px_rgba(215,25,32,0.6)]" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Discreet Owner Access & Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openAdminModal}
            title={isAdminAuthenticated ? 'Owner Studio (Active)' : 'Owner Access (Passcode required)'}
            aria-label="Owner Settings Menu"
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
              isAdminAuthenticated
                ? 'bg-neutral-900 border-[#d71920] text-[#d71920]'
                : 'bg-transparent border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
            }`}
          >
            {isAdminAuthenticated ? <Shield className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={openAdminModal}
            aria-label="Owner Settings Menu"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-black text-neutral-400 hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-black text-neutral-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-black/98 border-b border-white/10 shadow-2xl">
          <nav className="flex flex-col gap-3 font-mono text-xs tracking-wider">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`py-2 border-b border-white/[0.04] flex items-center gap-2 transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d71920]" />}
                  <span>{link.label}</span>
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAdminModal();
              }}
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.04] rounded-full border border-white/10"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Owner Settings Menu</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
