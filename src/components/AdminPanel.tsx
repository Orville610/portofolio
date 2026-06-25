"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio, PortfolioData, ProjectData, ExperienceData, CertificationData } from "@/context/PortfolioContext";
import { X, Save, Trash2, Plus, LogOut, Code, Briefcase, Award, User, Layers, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function AdminPanel() {
  const { portfolioData, saveData, isAdmin, showAdminPanel, setShowAdminPanel, setIsAdmin } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState<"hero" | "skills" | "experience" | "projects" | "certs">("hero");
  const [localData, setLocalData] = useState<PortfolioData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Sync with context data when panel is opened
  useEffect(() => {
    if (showAdminPanel && portfolioData) {
      setLocalData(JSON.parse(JSON.stringify(portfolioData)));
    }
  }, [showAdminPanel, portfolioData]);

  if (!isAdmin || !showAdminPanel || !localData) return null;

  const handleClose = () => {
    setShowAdminPanel(false);
    setSaveMessage("");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminPanel(false);
    setSaveMessage("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    
    const res = await saveData(localData);
    
    setIsSaving(false);
    setSaveMessage(res.message);

    // Launch confetti to celebrate!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#e50914", "#ff453a", "#4edea3"]
    });

    setTimeout(() => {
      handleClose();
    }, 1800);
  };

  // Helper for Hero fields
  const handleHeroChange = (field: string, value: string) => {
    setLocalData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          [field]: value
        }
      };
    });
  };

  // Helper for Skills
  const handleSkillChange = (index: number, value: string) => {
    setLocalData(prev => {
      if (!prev) return prev;
      const nextSkills = [...prev.skills];
      nextSkills[index] = value;
      return { ...prev, skills: nextSkills };
    });
  };

  const addSkill = () => {
    setLocalData(prev => {
      if (!prev) return prev;
      return { ...prev, skills: [...prev.skills, "New Skill"] };
    });
  };

  const removeSkill = (index: number) => {
    setLocalData(prev => {
      if (!prev) return prev;
      return { ...prev, skills: prev.skills.filter((_, i) => i !== index) };
    });
  };

  // Helpers for Experience
  const handleExperienceChange = (index: number, field: keyof ExperienceData, value: string) => {
    setLocalData(prev => {
      if (!prev) return prev;
      const nextExp = [...prev.experience];
      nextExp[index] = { ...nextExp[index], [field]: value };
      return { ...prev, experience: nextExp };
    });
  };

  const addExperience = () => {
    setLocalData(prev => {
      if (!prev) return prev;
      const newExp: ExperienceData = {
        year: "2026",
        role: "Software Developer",
        organization: "New Company",
        description: "Describe your accomplishments here.",
        iconName: "Briefcase"
      };
      return { ...prev, experience: [newExp, ...prev.experience] };
    });
  };

  const removeExperience = (index: number) => {
    setLocalData(prev => {
      if (!prev) return prev;
      return { ...prev, experience: prev.experience.filter((_, i) => i !== index) };
    });
  };

  // Helpers for Projects
  const handleProjectChange = (index: number, field: keyof ProjectData, value: any) => {
    setLocalData(prev => {
      if (!prev) return prev;
      const nextProjects = [...prev.projects];
      nextProjects[index] = { ...nextProjects[index], [field]: value };
      return { ...prev, projects: nextProjects };
    });
  };

  const handleProjectTagsChange = (index: number, tagsString: string) => {
    const tagsArray = tagsString.split(",").map(t => t.trim()).filter(Boolean);
    handleProjectChange(index, "tags", tagsArray);
  };

  const addProject = () => {
    setLocalData(prev => {
      if (!prev) return prev;
      const newProj: ProjectData = {
        filename: "main.py",
        title: "New Showcased Project",
        description: "Detailed description of project engineering achievements.",
        tags: ["React", "Docker"],
        githubUrl: "#",
        category: "Web Dev"
      };
      return { ...prev, projects: [...prev.projects, newProj] };
    });
  };

  const removeProject = (index: number) => {
    setLocalData(prev => {
      if (!prev) return prev;
      return { ...prev, projects: prev.projects.filter((_, i) => i !== index) };
    });
  };

  // Helpers for Certifications
  const handleCertChange = (index: number, field: keyof CertificationData, value: string) => {
    setLocalData(prev => {
      if (!prev) return prev;
      const nextCerts = [...prev.certifications];
      nextCerts[index] = { ...nextCerts[index], [field]: value };
      return { ...prev, certifications: nextCerts };
    });
  };

  const addCert = () => {
    setLocalData(prev => {
      if (!prev) return prev;
      const newCert: CertificationData = {
        title: "New Certification",
        desc: "Organization or details"
      };
      return { ...prev, certifications: [...prev.certifications, newCert] };
    });
  };

  const removeCert = (index: number) => {
    setLocalData(prev => {
      if (!prev) return prev;
      return { ...prev, certifications: prev.certifications.filter((_, i) => i !== index) };
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="w-full max-w-5xl h-[90vh] bg-surface-container-low border border-outline-variant/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative glow-primary-md">
        
        {/* Dashboard Header */}
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary w-5 h-5" />
            <span className="font-code-sm text-sm font-bold text-on-surface">SYS.ADMIN // PORTFOLIO CONTROL CENTER</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md bg-error-container/30 hover:bg-error-container text-error text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex flex-grow overflow-hidden flex-col md:flex-row">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container/20 p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0 scrollbar-hide">
            <button
              onClick={() => setActiveTab("hero")}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium font-code-sm flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === "hero"
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <User className="w-4 h-4" />
              Bio &amp; Title
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium font-code-sm flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === "skills"
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Layers className="w-4 h-4" />
              Tech Stack
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium font-code-sm flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === "experience"
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Experience
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium font-code-sm flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === "projects"
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Code className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("certs")}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium font-code-sm flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === "certs"
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Award className="w-4 h-4" />
              Certifications
            </button>
          </div>

          {/* Form Editing Area */}
          <div className="flex-grow overflow-y-auto p-6 bg-surface-container-lowest/30">
            {activeTab === "hero" && (
              <div className="space-y-5 max-w-2xl">
                <h3 className="font-headline-md text-lg font-bold text-primary border-b border-outline-variant/30 pb-2">Profile &amp; Biography</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant font-code-sm">FIRST NAME</label>
                    <input
                      type="text"
                      className="bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface"
                      value={localData.hero.firstName}
                      onChange={(e) => handleHeroChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant font-code-sm">LAST NAME</label>
                    <input
                      type="text"
                      className="bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface"
                      value={localData.hero.lastName}
                      onChange={(e) => handleHeroChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant font-code-sm">JOB TITLE / SPECIFICATION</label>
                  <input
                    type="text"
                    className="bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface"
                    value={localData.hero.title}
                    onChange={(e) => handleHeroChange("title", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant font-code-sm">BIOGRAPHY DESCRIPTION</label>
                  <textarea
                    rows={5}
                    className="bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface resize-none leading-relaxed"
                    value={localData.hero.description}
                    onChange={(e) => handleHeroChange("description", e.target.value)}
                  />
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                  <h3 className="font-headline-md text-lg font-bold text-primary">Tech Stack &amp; Skills</h3>
                  <button
                    onClick={addSkill}
                    className="px-2.5 py-1 rounded bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Skill
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {localData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-surface-container-low/50 border border-outline-variant/40 rounded-lg group"
                    >
                      <input
                        type="text"
                        className="flex-grow bg-transparent border-none outline-none focus:ring-0 p-0 text-sm text-on-surface font-code-sm font-semibold"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                        title="Delete skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                  <h3 className="font-headline-md text-lg font-bold text-primary">Experience &amp; Leadership Timeline</h3>
                  <button
                    onClick={addExperience}
                    className="px-2.5 py-1 rounded bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Role
                  </button>
                </div>

                <div className="space-y-6">
                  {localData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="p-5 border border-outline-variant bg-surface-container-low/30 rounded-xl space-y-4 relative group"
                    >
                      <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-surface-container-high cursor-pointer"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">YEAR</label>
                          <input
                            type="text"
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={exp.year}
                            onChange={(e) => handleExperienceChange(index, "year", e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">ROLE / TITLE</label>
                          <input
                            type="text"
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">ICON TYPE</label>
                          <select
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={exp.iconName}
                            onChange={(e) => handleExperienceChange(index, "iconName", e.target.value)}
                          >
                            <option value="Users">Users Icon</option>
                            <option value="GitBranch">GitBranch Icon</option>
                            <option value="ClipboardList">Clipboard Icon</option>
                            <option value="Briefcase">Briefcase Icon</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface-variant font-code-sm">ORGANIZATION / COMPANY</label>
                        <input
                          type="text"
                          className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                          value={exp.organization}
                          onChange={(e) => handleExperienceChange(index, "organization", e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface-variant font-code-sm">DESCRIPTION</label>
                        <textarea
                          rows={3}
                          className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none resize-none"
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                  <h3 className="font-headline-md text-lg font-bold text-primary">Featured Engineering Projects</h3>
                  <button
                    onClick={addProject}
                    className="px-2.5 py-1 rounded bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-6">
                  {localData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-5 border border-outline-variant bg-surface-container-low/30 rounded-xl space-y-4 relative group"
                    >
                      <button
                        onClick={() => removeProject(index)}
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-surface-container-high cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">FILENAME (e.g. main.py)</label>
                          <input
                            type="text"
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none font-mono"
                            value={project.filename}
                            onChange={(e) => handleProjectChange(index, "filename", e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">PROJECT TITLE</label>
                          <input
                            type="text"
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={project.title}
                            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">CATEGORY</label>
                          <select
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={project.category}
                            onChange={(e) => handleProjectChange(index, "category", e.target.value)}
                          >
                            <option value="Docker">Docker</option>
                            <option value="Networking">Networking</option>
                            <option value="Web Dev">Web Dev</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">GITHUB URL</label>
                          <input
                            type="text"
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={project.githubUrl || ""}
                            onChange={(e) => handleProjectChange(index, "githubUrl", e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-on-surface-variant font-code-sm">LIVE DEMO URL</label>
                          <input
                            type="text"
                            className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                            value={project.liveUrl || ""}
                            onChange={(e) => handleProjectChange(index, "liveUrl", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface-variant font-code-sm">TAGS (COMMA SEPARATED)</label>
                        <input
                          type="text"
                          className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                          value={project.tags.join(", ")}
                          onChange={(e) => handleProjectTagsChange(index, e.target.value)}
                          placeholder="Docker, Nginx, Linux"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-on-surface-variant font-code-sm">DESCRIPTION</label>
                        <textarea
                          rows={3}
                          className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none resize-none"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "certs" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                  <h3 className="font-headline-md text-lg font-bold text-primary">Credentials &amp; Certifications</h3>
                  <button
                    onClick={addCert}
                    className="px-2.5 py-1 rounded bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Cert
                  </button>
                </div>

                <div className="space-y-4">
                  {localData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-4 border border-outline-variant bg-surface-container-low/30 rounded-xl space-y-3 relative group"
                    >
                      <button
                        onClick={() => removeCert(index)}
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-surface-container-high cursor-pointer"
                        title="Delete Certification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex flex-col gap-1.5 max-w-lg">
                        <label className="text-xs font-semibold text-on-surface-variant font-code-sm">CERTIFICATION TITLE</label>
                        <input
                          type="text"
                          className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                          value={cert.title}
                          onChange={(e) => handleCertChange(index, "title", e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-on-surface-variant font-code-sm">ORGANIZATION / DATE / DETAILS</label>
                        <input
                          type="text"
                          className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none"
                          value={cert.desc}
                          onChange={(e) => handleCertChange(index, "desc", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Footer / Save Bar */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {saveMessage && (
            <div className={`text-xs font-bold font-code-sm px-3 py-1.5 rounded-md ${
              saveMessage.includes("locally") || saveMessage.includes("read-only")
                ? "bg-secondary-container/20 text-secondary border border-secondary/20"
                : "bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 animate-pulse"
            }`}>
              {saveMessage}
            </div>
          )}

          <div className="flex items-center gap-3 sm:ml-auto w-full sm:w-auto">
            <button
              onClick={handleClose}
              disabled={isSaving}
              className="flex-grow sm:flex-grow-0 px-4 py-2 border border-outline-variant rounded-md hover:bg-surface-container-high text-sm font-semibold text-on-surface transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-grow sm:flex-grow-0 px-5 py-2 bg-primary hover:bg-primary/95 text-on-primary rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover-glow-primary-lg cursor-pointer transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
