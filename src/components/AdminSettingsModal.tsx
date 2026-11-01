/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Key,
  Save,
  RotateCcw,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Download,
  Image as ImageIcon,
  Layers,
  User,
  FolderGit2,
  BookOpen,
  Sparkles,
  HeartHandshake,
  Compass,
  Mail,
  Shield,
  Eye,
  LogOut,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';

export const AdminSettingsModal: React.FC = () => {
  const {
    data,
    updateData,
    resetToDefaults,
    exportDataJson,
    importDataJson,
    isAdminAuthenticated,
    verifyPasscode,
    changePasscode,
    logoutAdmin,
    closeAdminModal,
    isAdminModalOpen,
  } = usePortfolio();

  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'hero' | 'projects' | 'about' | 'interests' | 'leadership' | 'beyond' | 'contact' | 'backup'
  >('hero');

  // Change password states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangeStatus, setPassChangeStatus] = useState<string | null>(null);

  // Status feedback toast
  const [saveToast, setSaveToast] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const heroPhotoInputRef = useRef<HTMLInputElement>(null);
  const projectPhotoInputRef = useRef<HTMLInputElement>(null);
  const [activeEditingProjectId, setActiveEditingProjectId] = useState<string>(data.projects[0]?.id || 'apex');

  if (!isAdminModalOpen) return null;

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPasscode(passcodeInput)) {
      setAuthError('');
      setPasscodeInput('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateData((prev) => ({
          ...prev,
          hero: {
            ...prev.hero,
            photoUrl: reader.result as string,
          },
        }));
        triggerSaveNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProjectImageUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateData((prev) => ({
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === projectId ? { ...p, imageUrl: reader.result as string } : p
          ),
        }));
        triggerSaveNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      title: 'New Project Title',
      shortTitle: 'New Project',
      subtitle: 'Sub-heading or Core Technology',
      description: 'A concise summary of what this project accomplishes and why it matters.',
      longDescription: 'Detailed architectural overview, problem statement, and engineering process.',
      highlights: ['Key Capability 1', 'Key Capability 2'],
      technologies: ['React', 'TypeScript', 'Node.js'],
      imageUrl: '/src/assets/images/campusbite_canteen_app_1793534903090.jpg',
      imageAlt: 'Project preview screenshot',
      githubUrl: data.personalInfo.github,
      featured: false,
      keyFeatures: [
        {
          title: 'Core Architecture',
          description: 'Implementation details and modular component architecture.',
        },
      ],
    };

    updateData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
    setActiveEditingProjectId(newId);
    triggerSaveNotification();
  };

  const handleDeleteProject = (id: string) => {
    if (data.projects.length <= 1) {
      alert('You must have at least one project.');
      return;
    }
    if (confirm('Are you sure you want to delete this project?')) {
      updateData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
      const remaining = data.projects.filter((p) => p.id !== id);
      if (remaining.length > 0) {
        setActiveEditingProjectId(remaining[0].id);
      }
      triggerSaveNotification();
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (changePasscode(currentPass, newPass)) {
      setPassChangeStatus('Passcode updated successfully!');
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setPassChangeStatus(null), 3000);
    } else {
      setPassChangeStatus('Failed: Current passcode is incorrect or new passcode is too short (< 4 characters).');
    }
  };

  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parthiv-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!jsonInput.trim()) return;
    const success = importDataJson(jsonInput);
    if (success) {
      setImportStatus('Portfolio data imported successfully!');
      setJsonInput('');
      triggerSaveNotification();
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Invalid JSON format. Please verify the structure.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all site content back to original defaults?')) {
      resetToDefaults();
      triggerSaveNotification();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={closeAdminModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#0c0c14] border border-white/15 rounded-2xl shadow-2xl shadow-black/95 overflow-hidden my-4 max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <h2 id="admin-modal-title" className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <span>Owner Studio & Content Management</span>
                {isAdminAuthenticated && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Authenticated
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400">
                Exclusive control room for Parthiv R to modify all texts, images, and projects.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] rounded border border-white/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            )}
            <button
              type="button"
              onClick={closeAdminModal}
              aria-label="Close settings"
              className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save confirmation toast */}
        {saveToast && (
          <div className="absolute top-16 right-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-mono rounded shadow-lg animate-in fade-in slide-in-from-top-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Changes applied & saved!</span>
          </div>
        )}

        {/* Content Area */}
        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Owner Access Verification
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                This administrative suite allows instant customization of all site content, images, and structure. Enter your access passcode to proceed.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter passcode (default: parthiv)"
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center font-mono"
                />
                {authError && (
                  <p className="mt-2 text-xs text-red-400 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-lg shadow-indigo-950"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Control Suite</span>
              </button>

              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.06]">
                Default passcode: <code className="text-neutral-300">parthiv</code> or <code className="text-neutral-300">99100</code>
              </div>
            </form>
          </div>
        ) : (
          /* Main Authenticated Editor */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 p-4 border-b md:border-b-0 md:border-r border-white/[0.08] bg-white/[0.01] shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
              {[
                { id: 'hero', label: 'Hero & Photo', icon: User },
                { id: 'projects', label: 'Projects & Work', icon: FolderGit2 },
                { id: 'about', label: 'About & Narrative', icon: BookOpen },
                { id: 'interests', label: 'Technical Interests', icon: Sparkles },
                { id: 'leadership', label: 'Leadership', icon: HeartHandshake },
                { id: 'beyond', label: 'Beyond Screen', icon: Compass },
                { id: 'contact', label: 'Contact & Links', icon: Mail },
                { id: 'backup', label: 'Security & Backup', icon: Key },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-left ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: HERO & PHOTO */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">Hero Section & Photo</h3>
                    <span className="text-xs font-mono text-indigo-400">Section 00</span>
                  </div>

                  {/* Photo Customizer */}
                  <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                    <div className="text-xs font-mono text-neutral-300">Hero Portrait Photo</div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-28 h-36 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0">
                        <img
                          src={data.hero.photoUrl}
                          alt="Parthiv R Portrait Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-3 w-full">
                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            ref={heroPhotoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleHeroPhotoUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => heroPhotoInputRef.current?.click()}
                            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New Photo</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateData((prev) => ({
                                ...prev,
                                hero: {
                                  ...prev.hero,
                                  photoUrl: '/assets/aistudio/IMG-20260629-WA0039_05fb8796.jpg',
                                },
                              }));
                              triggerSaveNotification();
                            }}
                            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg border border-white/10 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset to Default Photo</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                            Or direct image URL / path:
                          </label>
                          <input
                            type="text"
                            value={data.hero.photoUrl}
                            onChange={(e) => {
                              updateData((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, photoUrl: e.target.value },
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-neutral-200 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Headings and Bio */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Main Greeting Heading
                      </label>
                      <input
                        type="text"
                        value={data.hero.greeting}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, greeting: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Supporting Heading / Tagline
                      </label>
                      <input
                        type="text"
                        value={data.hero.tagline}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, tagline: e.target.value },
                            personalInfo: { ...prev.personalInfo, tagline: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Hero Bio Summary
                      </label>
                      <textarea
                        rows={3}
                        value={data.hero.bio}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, bio: e.target.value },
                            personalInfo: { ...prev.personalInfo, bio: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white leading-relaxed resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1">Status Text</label>
                        <input
                          type="text"
                          value={data.hero.statusText}
                          onChange={(e) => {
                            updateData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, statusText: e.target.value },
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1">Institution</label>
                        <input
                          type="text"
                          value={data.hero.collegeBadge}
                          onChange={(e) => {
                            updateData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, collegeBadge: e.target.value },
                              personalInfo: { ...prev.personalInfo, institution: e.target.value },
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={data.hero.locationText}
                          onChange={(e) => {
                            updateData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, locationText: e.target.value },
                              personalInfo: { ...prev.personalInfo, location: e.target.value },
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-base font-semibold text-white">Project Showcase Manager</h3>
                      <p className="text-xs text-neutral-400">Edit titles, descriptions, screenshots, and tech tags.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {/* Project Selector Pills */}
                  <div className="flex flex-wrap items-center gap-2 pb-2">
                    {data.projects.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActiveEditingProjectId(p.id)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors flex items-center gap-2 ${
                          activeEditingProjectId === p.id
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]'
                        }`}
                      >
                        <span>{p.shortTitle || p.title}</span>
                        {p.featured && <span className="text-[10px] text-indigo-300">★</span>}
                      </button>
                    ))}
                  </div>

                  {/* Active Project Editor */}
                  {(() => {
                    const project = data.projects.find((p) => p.id === activeEditingProjectId);
                    if (!project) return null;

                    return (
                      <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-indigo-400">ID: {project.id}</span>
                            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer ml-4">
                              <input
                                type="checkbox"
                                checked={project.featured || false}
                                onChange={(e) => {
                                  updateData((prev) => ({
                                    ...prev,
                                    projects: prev.projects.map((p) =>
                                      p.id === project.id ? { ...p, featured: e.target.checked } : p
                                    ),
                                  }));
                                }}
                                className="rounded text-indigo-600"
                              />
                              <span>Featured (Flagship presentation)</span>
                            </label>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteProject(project.id)}
                            className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1">Project Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                updateData((prev) => ({
                                  ...prev,
                                  projects: prev.projects.map((p) =>
                                    p.id === project.id ? { ...p, title: e.target.value } : p
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1">Subtitle / Descriptor</label>
                            <input
                              type="text"
                              value={project.subtitle}
                              onChange={(e) => {
                                updateData((prev) => ({
                                  ...prev,
                                  projects: prev.projects.map((p) =>
                                    p.id === project.id ? { ...p, subtitle: e.target.value } : p
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Descriptions */}
                        <div>
                          <label className="block text-xs font-mono text-neutral-300 mb-1">Short Card Description</label>
                          <textarea
                            rows={2}
                            value={project.description}
                            onChange={(e) => {
                              updateData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((p) =>
                                  p.id === project.id ? { ...p, description: e.target.value } : p
                                ),
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-neutral-300 mb-1">
                            Long Architectural Description (Modal View)
                          </label>
                          <textarea
                            rows={3}
                            value={project.longDescription}
                            onChange={(e) => {
                              updateData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((p) =>
                                  p.id === project.id ? { ...p, longDescription: e.target.value } : p
                                ),
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white resize-none"
                          />
                        </div>

                        {/* Image Uploader & Preview */}
                        <div className="p-4 rounded-lg bg-black/60 border border-white/10 space-y-3">
                          <div className="text-xs font-mono text-neutral-300">Project Screenshot / Image</div>
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-2 w-full">
                              <input
                                ref={projectPhotoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProjectImageUpload(project.id, e)}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => projectPhotoInputRef.current?.click()}
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload New Screenshot</span>
                              </button>
                              <input
                                type="text"
                                value={project.imageUrl}
                                onChange={(e) => {
                                  updateData((prev) => ({
                                    ...prev,
                                    projects: prev.projects.map((p) =>
                                      p.id === project.id ? { ...p, imageUrl: e.target.value } : p
                                    ),
                                  }));
                                }}
                                placeholder="Or enter image URL"
                                className="w-full px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-xs text-neutral-300 font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <label className="block text-xs font-mono text-neutral-300 mb-1">
                            Technologies (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={project.technologies.join(', ')}
                            onChange={(e) => {
                              const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                              updateData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((p) =>
                                  p.id === project.id ? { ...p, technologies: list } : p
                                ),
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                          />
                        </div>

                        {/* GitHub & Live URL */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1">GitHub Repo URL</label>
                            <input
                              type="text"
                              value={project.githubUrl}
                              onChange={(e) => {
                                updateData((prev) => ({
                                  ...prev,
                                  projects: prev.projects.map((p) =>
                                    p.id === project.id ? { ...p, githubUrl: e.target.value } : p
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1">Live Demo URL (optional)</label>
                            <input
                              type="text"
                              value={project.liveUrl || ''}
                              onChange={(e) => {
                                updateData((prev) => ({
                                  ...prev,
                                  projects: prev.projects.map((p) =>
                                    p.id === project.id ? { ...p, liveUrl: e.target.value } : p
                                  ),
                                }));
                              }}
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 3: ABOUT ME */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">About Me Narrative & Philosophy</h3>
                    <span className="text-xs font-mono text-indigo-400">Section 01</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Core Philosophy Quote
                      </label>
                      <textarea
                        rows={2}
                        value={data.personalInfo.detailedBio[3] || ''}
                        onChange={(e) => {
                          const updated = [...data.personalInfo.detailedBio];
                          updated[3] = e.target.value;
                          updateData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, detailedBio: updated },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Editorial Paragraph 1 (Identity & Perspective)
                      </label>
                      <textarea
                        rows={3}
                        value={data.personalInfo.detailedBio[0] || ''}
                        onChange={(e) => {
                          const updated = [...data.personalInfo.detailedBio];
                          updated[0] = e.target.value;
                          updateData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, detailedBio: updated },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">
                        Editorial Paragraph 2 (Focus & Design Intersections)
                      </label>
                      <textarea
                        rows={3}
                        value={data.personalInfo.detailedBio[2] || ''}
                        onChange={(e) => {
                          const updated = [...data.personalInfo.detailedBio];
                          updated[2] = e.target.value;
                          updateData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, detailedBio: updated },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TECHNICAL INTERESTS */}
              {activeTab === 'interests' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">Technical Interests & Categories</h3>
                    <span className="text-xs font-mono text-indigo-400">Section 03</span>
                  </div>

                  <div className="space-y-6">
                    {data.interests.map((category, catIdx) => (
                      <div key={category.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={category.name}
                            onChange={(e) => {
                              const updated = [...data.interests];
                              updated[catIdx] = { ...updated[catIdx], name: e.target.value };
                              updateData((prev) => ({ ...prev, interests: updated }));
                            }}
                            className="text-sm font-bold text-white bg-transparent border-b border-white/10 focus:border-indigo-500 focus:outline-none px-1"
                          />
                          <span className="text-xs font-mono text-neutral-400">{category.id}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {category.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="p-3 rounded-lg bg-black/60 border border-white/[0.06] space-y-2">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const updated = [...data.interests];
                                  const items = [...updated[catIdx].items];
                                  items[itemIdx] = { ...items[itemIdx], name: e.target.value };
                                  updated[catIdx] = { ...updated[catIdx], items };
                                  updateData((prev) => ({ ...prev, interests: updated }));
                                }}
                                className="w-full text-xs font-semibold text-neutral-200 bg-transparent border-b border-white/10 focus:outline-none"
                              />
                              <textarea
                                rows={2}
                                value={item.focus}
                                onChange={(e) => {
                                  const updated = [...data.interests];
                                  const items = [...updated[catIdx].items];
                                  items[itemIdx] = { ...items[itemIdx], focus: e.target.value };
                                  updated[catIdx] = { ...updated[catIdx], items };
                                  updateData((prev) => ({ ...prev, interests: updated }));
                                }}
                                className="w-full text-[11px] text-neutral-400 bg-transparent resize-none focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LEADERSHIP */}
              {activeTab === 'leadership' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">Leadership & Community Roles</h3>
                    <span className="text-xs font-mono text-indigo-400">Section 04</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Featured Community Quote
                    </label>
                    <textarea
                      rows={2}
                      value={data.personalInfo.communityQuote}
                      onChange={(e) => {
                        updateData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, communityQuote: e.target.value },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    {data.leadership.map((role, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400">Role Title</label>
                            <input
                              type="text"
                              value={role.role}
                              onChange={(e) => {
                                const updated = [...data.leadership];
                                updated[idx] = { ...updated[idx], role: e.target.value };
                                updateData((prev) => ({ ...prev, leadership: updated }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400">Organization</label>
                            <input
                              type="text"
                              value={role.organization}
                              onChange={(e) => {
                                const updated = [...data.leadership];
                                updated[idx] = { ...updated[idx], organization: e.target.value };
                                updateData((prev) => ({ ...prev, leadership: updated }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400">Description</label>
                          <textarea
                            rows={2}
                            value={role.description}
                            onChange={(e) => {
                              const updated = [...data.leadership];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              updateData((prev) => ({ ...prev, leadership: updated }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-neutral-300 resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: BEYOND SCREEN */}
              {activeTab === 'beyond' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">Beyond the Screen & Automotive Concepts</h3>
                    <span className="text-xs font-mono text-indigo-400">Section 05</span>
                  </div>

                  {/* Automotive Showcase */}
                  <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                    <div className="text-xs font-mono text-neutral-300">Automotive Design Showcase</div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        value={data.beyondScreen.automotiveImage}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            beyondScreen: { ...prev.beyondScreen, automotiveImage: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={data.beyondScreen.automotiveDescription}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            beyondScreen: { ...prev.beyondScreen, automotiveDescription: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-neutral-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* 6 Pursuits */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-neutral-300">Personal Pursuits List</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.personalPursuits.map((pursuit, idx) => (
                        <div key={idx} className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
                          <input
                            type="text"
                            value={pursuit.title}
                            onChange={(e) => {
                              const updated = [...data.personalPursuits];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateData((prev) => ({ ...prev, personalPursuits: updated }));
                            }}
                            className="w-full text-xs font-bold text-white bg-transparent border-b border-white/10 focus:outline-none"
                          />
                          <textarea
                            rows={2}
                            value={pursuit.description}
                            onChange={(e) => {
                              const updated = [...data.personalPursuits];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              updateData((prev) => ({ ...prev, personalPursuits: updated }));
                            }}
                            className="w-full text-[11px] text-neutral-400 bg-transparent resize-none focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: CONTACT & LINKS */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">Contact & Profile Links</h3>
                    <span className="text-xs font-mono text-indigo-400">Section 06</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">GitHub Profile URL</label>
                      <input
                        type="text"
                        value={data.personalInfo.github}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, github: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={data.personalInfo.linkedin}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1">Contact Heading</label>
                      <input
                        type="text"
                        value={data.contact.heading}
                        onChange={(e) => {
                          updateData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, heading: e.target.value },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: SECURITY & BACKUP */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-base font-semibold text-white">Security & Backup Control</h3>
                    <span className="text-xs font-mono text-indigo-400">Settings</span>
                  </div>

                  {/* Change Passcode */}
                  <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Key className="w-4 h-4 text-indigo-400" />
                      <span>Change Owner Passcode</span>
                    </div>

                    <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">Current Passcode</label>
                          <input
                            type="password"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            placeholder="Current passcode"
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">New Passcode</label>
                          <input
                            type="password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            placeholder="New passcode (min 4 chars)"
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                      >
                        Update Passcode
                      </button>

                      {passChangeStatus && (
                        <p className="text-xs text-indigo-300 font-mono mt-1">{passChangeStatus}</p>
                      )}
                    </form>
                  </div>

                  {/* Backup / Export / Import */}
                  <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <Download className="w-4 h-4 text-indigo-400" />
                      <span>Export & Import Portfolio Configuration</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleExport}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Full JSON Backup</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Factory Reset All Content</span>
                      </button>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] space-y-2">
                      <label className="block text-[11px] font-mono text-neutral-400">
                        Paste JSON Configuration to Restore / Import:
                      </label>
                      <textarea
                        rows={3}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste exported portfolio JSON here..."
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-neutral-300 font-mono resize-none"
                      />
                      <button
                        type="button"
                        onClick={handleImport}
                        disabled={!jsonInput.trim()}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded transition-colors"
                      >
                        Import JSON Configuration
                      </button>
                      {importStatus && (
                        <p className="text-xs text-indigo-300 font-mono">{importStatus}</p>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
