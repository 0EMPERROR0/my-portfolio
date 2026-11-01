/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  technologies: string[];
  imageUrl: string;
  imageAlt: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  keyFeatures: {
    title: string;
    description: string;
  }[];
}

export interface InterestCategory {
  id: string;
  name: string;
  description: string;
  items: {
    name: string;
    focus: string;
    tags: string[];
  }[];
}

export interface CommunityRole {
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  impactItems: string[];
}

export interface PersonalInterest {
  title: string;
  category: string;
  description: string;
  takeaway: string;
  badge: string;
}
