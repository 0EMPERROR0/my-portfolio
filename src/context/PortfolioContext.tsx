/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { supabase } from '../lib/supabase';
import {
  Project,
  InterestCategory,
  CommunityRole,
  PersonalInterest,
} from '../types/portfolio';
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
    automotiveImage:
      '/src/assets/images/automotive_concept_sketch_1793534902253.jpg',
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
const PORTFOLIO_ROW_ID = '00000000-0000-4000-8000-000000000001';
const ADMIN_EMAIL = 'parthiv99100@gmail.com';

interface PortfolioContextType {
  data: PortfolioDataState;
  updateData: (updater: (prev: PortfolioDataState) => PortfolioDataState) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
  isAdminAuthenticated: boolean;
  verifyPasscode: (password: string) => Promise<boolean>;
  changePasscode: (currentPass: string, newPass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  isAdminModalOpen: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<PortfolioDataState>(
    DEFAULT_PORTFOLIO_STATE
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Restore the Supabase session and load the shared portfolio content.
  useEffect(() => {
    let active = true;

    const loadPortfolio = async () => {
      try {
        const { data: result, error } = await supabase
          .from('portfolio_content')
          .select('content')
          .eq('id', PORTFOLIO_ROW_ID)
          .maybeSingle();

        if (error) throw error;

        if (active && result?.content) {
          setData(result.content as PortfolioDataState);
        }
      } catch (error) {
        console.error('Failed to load portfolio from Supabase:', error);
      } finally {
        if (active) setContentLoaded(true);
      }
    };

    const restoreSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (active) {
        setIsAdminAuthenticated(!!sessionData.session);
      }

      await loadPortfolio();
    };

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setIsAdminAuthenticated(!!session);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Keep a local backup, but Supabase is the shared source of truth.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save local portfolio backup:', error);
    }
  }, [data]);

  // Save changes to Supabase only after an admin has authenticated.
  useEffect(() => {
    if (!isAdminAuthenticated || !contentLoaded) return;

    const timeout = window.setTimeout(async () => {
      const { error } = await supabase.from('portfolio_content').upsert(
        {
          id: PORTFOLIO_ROW_ID,
          content: data,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (error) {
        console.error('Failed to save portfolio to Supabase:', error);
      }
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [data, isAdminAuthenticated, contentLoaded]);

  const verifyPasscode = useCallback(async (password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    if (error) {
      console.error('Admin login failed:', error.message);
      return false;
    }

    // If the database is still empty, migrate this browser's existing
    // portfolio content after the admin has successfully signed in.
    const { data: existing, error: readError } = await supabase
      .from('portfolio_content')
      .select('content')
      .eq('id', PORTFOLIO_ROW_ID)
      .maybeSingle();

    if (readError) {
      console.error('Could not check existing portfolio content:', readError);
      return false;
    }

    if (existing?.content) {
      setData(existing.content as PortfolioDataState);
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.hero && parsed?.personalInfo && Array.isArray(parsed?.projects)) {
            setData(parsed as PortfolioDataState);
          }
        }
      } catch (error) {
        console.error('Could not read local portfolio backup:', error);
      }
    }

    setContentLoaded(true);
    return true;
  }, []);

  const changePasscode = useCallback(
    async (_currentPass: string, newPass: string) => {
      if (!newPass || newPass.trim().length < 8) return false;

      const { error } = await supabase.auth.updateUser({
        password: newPass,
      });

      if (error) {
        console.error('Password update failed:', error.message);
        return false;
      }

      return true;
    },
    []
  );

  const logoutAdmin = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Admin logout failed:', error.message);
    }

    setIsAdminAuthenticated(false);
    setIsAdminModalOpen(false);
  }, []);

  const updateData = (updater: (prev: PortfolioDataState) => PortfolioDataState) => {
    setData((prev) => updater(prev));
  };

  const resetToDefaults = () => {
    setData(DEFAULT_PORTFOLIO_STATE);
  };

  const exportDataJson = () => JSON.stringify(data, null, 2);

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);

      if (
        parsed?.hero &&
        parsed?.personalInfo &&
        Array.isArray(parsed?.projects)
      ) {
        setData(parsed as PortfolioDataState);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

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