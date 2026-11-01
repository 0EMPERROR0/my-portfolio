/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, InterestCategory, CommunityRole, PersonalInterest } from '../types/portfolio';
import {
  PERSONAL_INFO,
  PROJECTS,
  TECHNICAL_INTERESTS,
  LEADERSHIP_ROLES,
  PERSONAL_PURSUITS,
} from '../data/portfolioData';

export interface PortfolioDataState {
  hero: {
    greeting: string;
    tagline: string;
    bio: string;
    photoUrl: string;
    statusText: string;
    collegeBadge: string;
    locationText: string;
  };
  personalInfo: {
    name: string;
    role: string;
    institution: string;
    affiliation: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    detailedBio: string[];
    communityQuote: string;
  };
  projects: Project[];
  interests: InterestCategory[];
  leadership: CommunityRole[];
  personalPursuits: PersonalInterest[];
  beyondScreen: {
    automotiveImage: string;
    automotiveTitle: string;
    automotiveSubtitle: string;
    automotiveDescription: string;
    automotiveAxiom: string;
  };
  contact: {
    heading: string;
    description: string;
  };
}

const DEFAULT_PORTFOLIO_STATE: PortfolioDataState = {
  hero: {
    greeting: "Hey, I'm Parthiv.",
    tagline: PERSONAL_INFO.tagline,
    bio: PERSONAL_INFO.bio,
    photoUrl: '/assets/aistudio/IMG-20260629-WA0039_05fb8796.jpg',
    statusText: 'CS Undergraduate',
    collegeBadge: 'Sree Buddha College of Engineering',
    locationText: 'Kerala, India',
  },
  personalInfo: {
    name: PERSONAL_INFO.name,
    role: PERSONAL_INFO.role,
    institution: PERSONAL_INFO.institution,
    affiliation: PERSONAL_INFO.affiliation,
    location: PERSONAL_INFO.location,
    email: PERSONAL_INFO.email,
    github: PERSONAL_INFO.github,
    linkedin: PERSONAL_INFO.linkedin,
    detailedBio: [...PERSONAL_INFO.detailedBio],
    communityQuote: PERSONAL_INFO.communityQuote,
  },
  projects: [...PROJECTS],
  interests: [...TECHNICAL_INTERESTS],
  leadership: [...LEADERSHIP_ROLES],
  personalPursuits: [...PERSONAL_PURSUITS],
  beyondScreen: {
    automotiveImage: '/src/assets/images/automotive_concept_sketch_1793534902253.jpg',
    automotiveTitle: 'Automotive Design Concepts',
    automotiveSubtitle: 'Form, Surfacing & Function',
    automotiveDescription:
      'Fascinated by aerodynamic contours, clay modeling, and structural efficiency in automotive prototyping. The harmony of engineering constraints and sculptural beauty is a constant source of inspiration for how software interfaces should feel.',
    automotiveAxiom:
      'Axiom: Eliminating drag in aerodynamics equals eliminating friction in user interfaces.',
  },
  contact: {
    heading: 'Have something interesting in mind?',
    description:
      "I'm always interested in connecting with people, exploring ideas, and building something meaningful.",
  },
};

const STORAGE_KEY = 'parthiv_portfolio_content_v2';
const PASSCODE_STORAGE_KEY = 'parthiv_portfolio_admin_passcode';
const AUTH_SESSION_KEY = 'parthiv_portfolio_is_authenticated';

interface PortfolioContextType {
  data: PortfolioDataState;
  updateData: (updater: (prev: PortfolioDataState) => PortfolioDataState) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
  isAdminAuthenticated: boolean;
  verifyPasscode: (inputPasscode: string) => boolean;
  changePasscode: (currentPass: string, newPass: string) => boolean;
  logoutAdmin: () => void;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  isAdminModalOpen: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure photoUrl exists
        if (!parsed.hero.photoUrl) {
          parsed.hero.photoUrl = '/assets/aistudio/IMG-20260629-WA0039_05fb8796.jpg';
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data', e);
    }
    return DEFAULT_PORTFOLIO_STATE;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio state', e);
    }
  }, [data]);

  const updateData = (updater: (prev: PortfolioDataState) => PortfolioDataState) => {
    setData((prev) => updater(prev));
  };

  const resetToDefaults = () => {
    setData(DEFAULT_PORTFOLIO_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hero && parsed.personalInfo && parsed.projects) {
        setData(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const getStoredPasscode = (): string => {
    return localStorage.getItem(PASSCODE_STORAGE_KEY) || 'parthiv';
  };

  const verifyPasscode = (inputPasscode: string): boolean => {
    const currentPasscode = getStoredPasscode();
    // Allow either the customized passcode, 'parthiv', or '99100'
    const isValid =
      inputPasscode === currentPasscode ||
      inputPasscode.trim().toLowerCase() === 'parthiv' ||
      inputPasscode.trim() === '99100';

    if (isValid) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    }
    return isValid;
  };

  const changePasscode = (currentPass: string, newPass: string): boolean => {
    if (!verifyPasscode(currentPass)) return false;
    if (!newPass || newPass.trim().length < 4) return false;
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPass.trim());
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAdminModalOpen(false);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        isAdminAuthenticated,
        verifyPasscode,
        changePasscode,
        logoutAdmin,
        openAdminModal,
        closeAdminModal,
        isAdminModalOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
