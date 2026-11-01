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
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Interests', href: '#interests' },
    { label: 'Community', href: '#community' },
    { label: 'Beyond', href: '#beyond' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-xl shadow-black/40'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={handleLogoClick}
          title="Click to go Home (triple click opens Owner Settings)"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded border border-white/10 bg-white/[0.04] text-xs font-mono font-medium text-indigo-300 transition-colors group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10">
            PR
          </span>
          <span className="font-medium text-neutral-200 tracking-tight group-hover:text-white transition-colors">
            {data.personalInfo.name}
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded ${
                  isActive ? 'text-white' : 'hover:text-neutral-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Discreet Owner Access */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openAdminModal}
            title={isAdminAuthenticated ? 'Owner Studio (Logged In)' : 'Owner Access (Passcode required)'}
            aria-label="Owner Settings Menu"
            className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${
              isAdminAuthenticated
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {isAdminAuthenticated ? <Shield className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600/90 hover:bg-indigo-600 rounded-md transition-all duration-150 shadow-sm shadow-indigo-950/60 hover:shadow-indigo-500/20 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle & Quick Settings */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={openAdminModal}
            aria-label="Owner Settings Menu"
            className="flex items-center justify-center w-10 h-10 rounded border border-white/10 bg-white/[0.04] text-neutral-400 hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="flex items-center justify-center w-10 h-10 rounded border border-white/10 bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#0c0c10]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-2 text-base font-medium text-neutral-300 hover:text-white border-b border-white/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.04] rounded border border-white/10"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Owner Settings Menu</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
