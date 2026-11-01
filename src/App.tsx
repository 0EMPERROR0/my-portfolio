/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Interests } from './components/Interests';
import { Leadership } from './components/Leadership';
import { PersonalSide } from './components/PersonalSide';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminSettingsModal } from './components/AdminSettingsModal';

function PortfolioMain() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'interests', 'community', 'beyond', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.35 && rect.bottom >= windowHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Interests />
        <Leadership />
        <PersonalSide />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Owner Admin / CMS Settings Modal */}
      <AdminSettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
