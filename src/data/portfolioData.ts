/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, InterestCategory, CommunityRole, PersonalInterest } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Parthiv R',
  role: 'Computer Science & Engineering Undergraduate',
  institution: 'Sree Buddha College of Engineering',
  affiliation: 'Kerala Technological University (KTU)',
  location: 'Kerala, India',
  email: 'Parthiv99100@gmail.com',
  github: 'https://github.com/0EMPERROR0',
  linkedin: 'https://www.linkedin.com/in/parthiv-r-57b2b1374/',
  tagline: 'Building intelligent systems and meaningful digital experiences.',
  bio: "I'm a Computer Science and Engineering student passionate about full-stack development, applied machine learning, and creating technology that feels intuitive to use.",
  detailedBio: [
    'I am Parthiv R, a Computer Science and Engineering undergraduate at Sree Buddha College of Engineering affiliated with Kerala Technological University.',
    'I enjoy building full-stack web applications and exploring applied machine learning.',
    'My work bridges technical problem-solving with intuitive user experiences. My interests extend beyond software engineering into minimalist design, automotive design concepts, and visual creativity.',
    'I believe in continuous learning, experimentation, and building things that solve meaningful problems.'
  ],
  communityQuote:
    'I enjoy being part of communities that encourage experimentation, collaboration, and learning. Through workshops, makeathons, and creative events, I contribute to building an environment where people can explore technology together.'
};

export const PROJECTS: Project[] = [
  {
    id: 'apex',
    title: 'APEX – Autonomous Personal Edge eXecutor',
    shortTitle: 'APEX',
    subtitle: 'Intelligent Desktop Assistant with Bilingual Language Capabilities',
    description:
      'An intelligent personal desktop assistant inspired by the concept of JARVIS. Explores building an AI-powered assistant capable of interacting with the computer, understanding commands, and communicating naturally, including Malayalam language capabilities.',
    longDescription:
      'APEX represents an exploration into autonomous edge execution and localized contextual assistance. Designed to transcend standard scripted macros, APEX interprets user intent via natural language, executes system-level operations, manages workspace context, and bridges multilingual interaction with dedicated support for Malayalam verbal instructions.',
    highlights: [
      'AI-Powered Personal Assistance',
      'Desktop & Workspace Automation',
      'Natural Language Interaction',
      'Malayalam Communication Capabilities',
      'Intelligent Command Execution'
    ],
    technologies: ['Python', 'Natural Language Processing', 'Desktop Automation', 'Speech Recognition', 'Local AI Models', 'Edge Execution'],
    imageUrl: '/src/assets/images/apex_desktop_assistant_1793534900490.jpg',
    imageAlt: 'APEX Autonomous Personal Edge eXecutor interface showcasing voice spectrum and Malayalam language telemetry',
    githubUrl: 'https://github.com/0EMPERROR0',
    featured: true,
    keyFeatures: [
      {
        title: 'Bilingual Voice & Text Pipeline',
        description: 'Processes commands natively in both English and Malayalam, enabling accessible regional voice interaction.'
      },
      {
        title: 'System & Workflow Orchestration',
        description: 'Automates file indexing, system diagnostic retrieval, application scheduling, and personalized desktop workflows.'
      },
      {
        title: 'Autonomous Edge Model Architecture',
        description: 'Prioritizes local compute to reduce external latency and retain strict local privacy over user context and keystrokes.'
      }
    ]
  },
  {
    id: 'campusbite',
    title: 'CampusBite – Digital Canteen Preordering Platform',
    shortTitle: 'CampusBite',
    subtitle: 'Streamlined Campus Food Ordering & Digital Queue Management',
    description:
      'A web-based campus canteen food preordering platform designed to make food ordering more convenient for students and eliminate congestion during peak break hours.',
    longDescription:
      'CampusBite solves the everyday friction of university cafeteria congestion. By providing real-time menu availability, digital preordering, and smart pick-up token generation, students can reserve meals between lectures and collect them without waiting in extended queues.',
    highlights: [
      'Digital Canteen Ordering',
      'Food Preordering System',
      'Convenient Student UX',
      'Full-Stack Web Architecture'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST API'],
    imageUrl: '/src/assets/images/campusbite_canteen_app_1793534903090.jpg',
    imageAlt: 'CampusBite digital cafeteria food preordering dashboard with live tokens and active orders',
    githubUrl: 'https://github.com/0EMPERROR0',
    featured: false,
    keyFeatures: [
      {
        title: 'Real-Time Menu & Inventory Sync',
        description: 'Shows live meal availability and prep statuses to avoid ordering items that have run out.'
      },
      {
        title: 'Dynamic Pickup Token Generation',
        description: 'Issues algorithmic queue numbers and notifications as cafeteria staff advance meal preparation.'
      },
      {
        title: 'Mobile-Optimized Touch Ordering',
        description: 'Designed specifically for rapid multi-item selection on mobile devices between lectures.'
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio & Creative Archive',
    shortTitle: 'Portfolio',
    subtitle: 'Modern Engineering Showcase & Editorial Experience',
    description:
      'A personal portfolio website created to showcase projects, technical interests, and creative work with uncompromising typography, zero-slop restraint, and fluid interactions.',
    longDescription:
      'Built from the ground up as a bespoke digital home that balances rigorous technical engineering with refined editorial aesthetics. Demonstrates production-grade component modularity, accessible color contrast, smooth compositor-driven animations, and responsive layouts across all device classes.',
    highlights: [
      'Personal Branding',
      'Frontend Development',
      'Visual Design',
      'User Experience'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    imageUrl: '/src/assets/images/automotive_concept_sketch_1793534902253.jpg',
    imageAlt: 'Creative design engineering concept aesthetic illustrating minimalist technology and automotive styling',
    githubUrl: 'https://github.com/0EMPERROR0',
    featured: false,
    keyFeatures: [
      {
        title: 'Zero-Slop Clean Aesthetic',
        description: 'Avoids generic templates, unboxed metadata hierarchy, strictly intentional typography, and 60-30-10 color discipline.'
      },
      {
        title: 'Interactive Project Explorations',
        description: 'Features interactive simulated environments for testing APEX Malayalam commands and CampusBite ordering flows.'
      },
      {
        title: 'Fluid & Accessible Choreography',
        description: 'Built with motion tokens that respect prefers-reduced-motion while providing tactile micro-interactions.'
      }
    ]
  }
];

export const TECHNICAL_INTERESTS: InterestCategory[] = [
  {
    id: 'development',
    name: 'Development',
    description: 'Engineering resilient web applications from clean frontends to structured server architectures.',
    items: [
      {
        name: 'Full-Stack Development',
        focus: 'End-to-end architecture bridging user interfaces with server-side logic and database persistence.',
        tags: ['System Architecture', 'Component Modeling', 'Integration']
      },
      {
        name: 'Frontend Engineering',
        focus: 'Crafting responsive, accessible, and high-performance interfaces with modern React and TypeScript.',
        tags: ['React', 'TypeScript', 'Performance', 'State Architecture']
      },
      {
        name: 'Backend Development',
        focus: 'Designing reliable application backends, API endpoints, and clean data contracts.',
        tags: ['Node.js', 'Express', 'REST APIs', 'Server Logic']
      },
      {
        name: 'Web Applications',
        focus: 'Building practical web platforms that resolve authentic real-world workflows and student needs.',
        tags: ['Scalability', 'Security', 'User Workflows']
      }
    ]
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Investigating intelligent models, autonomous agents, and practical natural language pipelines.',
    items: [
      {
        name: 'Applied Machine Learning',
        focus: 'Translating algorithmic ML concepts into concrete software utilities and assistive tools.',
        tags: ['Model Integration', 'Data Processing', 'Practical AI']
      },
      {
        name: 'Large Language Models',
        focus: 'Leveraging contextual generative models for automated reasoning, summarization, and query handling.',
        tags: ['Context Management', 'Prompt Design', 'Inference Optimization']
      },
      {
        name: 'AI Agents',
        focus: 'Designing autonomous workflows where agents perceive environments, plan steps, and execute commands.',
        tags: ['Autonomous Execution', 'Tool Calling', 'Decision Loops']
      },
      {
        name: 'Natural Language Processing',
        focus: 'Exploring multi-language text processing and phonetic handling, with special focus on Malayalam.',
        tags: ['Malayalam NLP', 'Phonetics', 'Intent Parsing']
      }
    ]
  },
  {
    id: 'design',
    name: 'Design & Visual Systems',
    description: 'Merging technical precision with clean aesthetics, functional ergonomics, and visual balance.',
    items: [
      {
        name: 'UI/UX Design',
        focus: 'Architecting intuitive user journeys with clear visual hierarchies and zero unnecessary friction.',
        tags: ['Information Architecture', 'User Empathy', 'Wireframing']
      },
      {
        name: 'Minimalist Interfaces',
        focus: 'Eliminating visual noise, pill enclosures, and decorative clutter to let core content breathe.',
        tags: ['Editorial Layouts', 'Negative Space', 'Typographic Hierarchy']
      },
      {
        name: 'Creative Technology',
        focus: 'Experimenting at the intersection of code, interactive visuals, and tactile web interfaces.',
        tags: ['Interactive Canvases', 'Micro-interactions', 'Visual Computing']
      },
      {
        name: 'Automotive Design Concepts',
        focus: 'Studying aerodynamic form factors, surfacing tension, and ergonomic cockpit instrumentation.',
        tags: ['Aerodynamics', 'Form Follows Function', 'Industrial Aesthetics']
      }
    ]
  }
];

export const LEADERSHIP_ROLES: CommunityRole[] = [
  {
    role: 'Head Coordinator',
    organization: 'TinkerHub',
    period: 'Active Term',
    type: 'Leadership & Community',
    description:
      'Leading peer-to-peer technical learning communities, driving hands-on bootcamps, and fostering collaborative learning culture across the campus.',
    impactItems: [
      'Organized collaborative developer workshops and student makeathons.',
      'Facilitated open source discovery and peer-learning study circles.',
      'Mentored emerging engineers in modern development tools and workflows.'
    ]
  },
  {
    role: 'Secretary',
    organization: 'IEEE Sensors Council',
    period: 'Active Term',
    type: 'Student Branch Leadership',
    description:
      'Coordinating technical symposia, member engagements, and guest lectures on sensor networks, IoT instrumentation, and embedded technologies.',
    impactItems: [
      'Administered council communications, meeting agendas, and institutional event reporting.',
      'Spearheaded technical talk sessions exploring applied hardware and sensor integration.',
      'Coordinated cross-disciplinary participation between CS and Electronics departments.'
    ]
  },
  {
    role: 'Volunteer',
    organization: 'National Service Scheme (NSS)',
    period: 'Community Service',
    type: 'Social & Civic Engagement',
    description:
      'Actively volunteering in civic welfare drives, environmental preservation camps, digital literacy programs, and community support initiatives.',
    impactItems: [
      'Participated in campus social service drives and community welfare outreach.',
      'Supported local digital literacy efforts and public awareness campaigns.',
      'Demonstrated teamwork and leadership in grassroots institutional programs.'
    ]
  },
  {
    role: 'Volunteer',
    organization: 'Coding Club',
    period: 'Academic Engagement',
    type: 'Technical Mentorship',
    description:
      'Supporting fellow students in algorithmic problem solving, competitive programming fundamentals, and project-based development sprints.',
    impactItems: [
      'Assisted junior students with debugging fundamentals and logic building.',
      'Collaborated on campus hackathons, code jams, and logic challenges.',
      'Promoted clean code standards and version control practices.'
    ]
  }
];

export const PERSONAL_PURSUITS: PersonalInterest[] = [
  {
    title: 'Strength Training',
    category: 'Discipline & Body Conditioning',
    description:
      'Dedicated to progressive overload, functional movement patterns, and physical resilience. The disciplined routine of strength training grounds my cognitive focus and instills patience.',
    takeaway: 'Progressive overload mirrors iterative software refinement: daily consistency yields compounding results.',
    badge: 'Discipline'
  },
  {
    title: 'Automotive Design Concepts',
    category: 'Industrial Form & Aerodynamics',
    description:
      'Fascinated by high-performance vehicle architecture, clay styling modeling, aerodynamic airflow lines, and interior cockpit ergonomics where form rigorously follows function.',
    takeaway: 'Every curve in aerodynamic design serves airflow, just as every element in software must serve user intent.',
    badge: 'Form & Function'
  },
  {
    title: 'Movies & Cinema',
    category: 'Narrative & Visual Direction',
    description:
      'Appreciating cinematic compositions, deliberate color grading, atmospheric pacing, and sound design that immerses viewers in distinct emotional worlds.',
    takeaway: 'Deep appreciation for visual storytelling informs my approach to pacing and hierarchy in web interfaces.',
    badge: 'Visual Craft'
  },
  {
    title: 'Anime & Television Series',
    category: 'World Building & Storytelling',
    description:
      'Drawn to intricate world-building, high-stakes narrative arcs, and dynamic character psychology found across premier anime and long-form television storytelling.',
    takeaway: 'Great world-building demonstrates how complex interconnected systems can feel completely cohesive.',
    badge: 'Narrative Depth'
  },
  {
    title: 'Video Games',
    category: 'Interactive Mechanics & UX',
    description:
      'Analyzing interactive design, tactile control feedback loops, real-time procedural rendering, and immersive audio-visual environments.',
    takeaway: 'Game mechanics represent the pinnacle of responsive interactive feedback loops.',
    badge: 'Interactive Art'
  },
  {
    title: 'Creative Exploration',
    category: 'Cross-Disciplinary Curiosity',
    description:
      'Constantly synthesizing ideas across disciplines—from typography and industrial design to emerging machine learning paradigms and Malayalam linguistics.',
    takeaway: 'Breakthrough solutions frequently emerge when viewing technical problems through a creative lens.',
    badge: 'Curiosity'
  }
];
