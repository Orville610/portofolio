"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LogOut, Plus, Save, Trash2, X } from "lucide-react";
import { usePortfolio, type CertificationData, type ExperienceData, type ProjectData } from "@/context/PortfolioContext";
import type { SaveResult } from "@/lib/portfolio";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  url?: boolean;
  email?: boolean;
  required?: boolean;
}
function Field({ id, label, value, onChange, multiline, url, email, required }: FieldProps) {
  const className = "min-h-11 w-full rounded-md border border-outline-variant bg-background px-3 py-2 text-sm text-on-surface";
  return <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-semibold text-on-surface-variant">{label}</label>
    {multiline ? <textarea id={id} value={value} onChange={event => onChange(event.target.value)} rows={3} required={required} className={className} /> : <input id={id} type={url ? "url" : email ? "email" : "text"} value={value} onChange={event => onChange(event.target.value)} required={required} className={className} />}
  </div>;
}
const tabs = ["settings", "hero", "skills", "experience", "projects", "achievement", "certs"] as const;
type Tab = typeof tabs[number];

export default function AdminPanel() {
  const { portfolioData, saveData, logout, login, setShowAdminPanel } = usePortfolio();
  const [draft, setDraft] = useState(() => structuredClone(portfolioData));
  const [tab, setTab] = useState<Tab>("settings");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SaveResult | null>(null);
  const [password, setPassword] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialogRef.current?.showModal(); }, []);
  function close() { dialogRef.current?.close(); setShowAdminPanel(false); }
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setResult(null);
    try {
      const data = { ...draft, projects: draft.projects.map(item => ({ ...item, tags: [...new Set(item.tags.map(tag => tag.trim()).filter(Boolean))] })) };
      setResult(await saveData(data));
    }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true);
    const response = await logout();
    setBusy(false);
    if (!response.success) setResult(response);
  }
  async function signIn() {
    setBusy(true);
    const response = await login(password);
    setPassword("");
    setBusy(false);
    setResult(response.success ? { success: true, message: "Signed in again. Your draft is ready to save." } : { ...response, requiresLogin: true });
  }
  const experience = (index: number, patch: Partial<ExperienceData>) => setDraft(value => ({ ...value, experience: value.experience.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  const project = (index: number, patch: Partial<ProjectData>) => setDraft(value => ({ ...value, projects: value.projects.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  const certification = (index: number, patch: Partial<CertificationData>) => setDraft(value => ({ ...value, certifications: value.certifications.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  const remove = (key: "skills" | "experience" | "projects" | "certifications", index: number) => setDraft(value => ({ ...value, [key]: value[key].filter((_, i) => i !== index) }));
  const add = () => setDraft(value => {
    if (tab === "skills") return { ...value, skills: [...value.skills, "New skill"] };
    if (tab === "experience") return { ...value, experience: [...value.experience, { year: String(new Date().getFullYear()), role: "New role", organization: "Organization", description: "Describe your contribution.", iconName: "Briefcase" }] };
    if (tab === "projects") return { ...value, projects: [...value.projects, { filename: "project", title: "New project", description: "Describe the problem and your contribution.", tags: [], category: "Web Dev" }] };
    return { ...value, certifications: [...value.certifications, { title: "New credential", desc: "Describe the course or certification." }] };
  });
  return <dialog ref={dialogRef} aria-labelledby="admin-title" onCancel={event => { event.preventDefault(); close(); }} className="m-auto h-[90dvh] max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-5xl overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low p-0 text-on-surface shadow-2xl backdrop:bg-background/85 backdrop:backdrop-blur-sm">
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-outline-variant p-4">
        <h2 id="admin-title" className="mr-auto font-headline-md text-lg font-bold">Portfolio editor</h2>
        <button type="button" onClick={() => void signOut()} disabled={busy} className="flex min-h-11 items-center gap-2 px-2 text-sm"><LogOut className="h-4 w-4" aria-hidden="true" />Sign out</button>
        <button type="button" onClick={close} aria-label="Close Admin Panel" className="flex h-11 w-11 items-center justify-center"><X aria-hidden="true" /></button>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-outline-variant px-4 py-2" role="group" aria-label="Editor sections">
        {tabs.map(item => <button key={item} type="button" aria-pressed={tab === item} onClick={() => setTab(item)} className={`min-h-11 rounded-md px-3 text-sm font-semibold capitalize ${tab === item ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}>{item === "certs" ? "Credentials" : item.charAt(0).toUpperCase() + item.slice(1)}</button>)}
      </div>
      <form id="portfolio-editor" onSubmit={event => void save(event)} className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
        {(["skills", "experience", "projects", "certs"] as string[]).includes(tab) && <button type="button" onClick={add} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-outline-variant px-3 text-sm font-semibold text-primary-text"><Plus className="h-4 w-4" aria-hidden="true" />Add {tab === "certs" ? "credential" : tab === "skills" ? "skill" : tab === "projects" ? "project" : "role"}</button>}
        {tab === "settings" && <>
          <p className="text-sm text-on-surface-variant">Use direct HTTPS image links. Leave the photo or CV URL blank to use the built-in portrait or printable resume.</p>
          <Field id="settings-email" label="Contact email" email required value={draft.settings.email} onChange={email => setDraft(data => ({ ...data, settings: { ...data.settings, email } }))} />
          <Field id="settings-profileImageUrl" label="Profile photo URL" url value={draft.settings.profileImageUrl || ""} onChange={profileImageUrl => setDraft(data => ({ ...data, settings: { ...data.settings, profileImageUrl } }))} />
          <Field id="settings-resumeUrl" label="CV / resume URL" url value={draft.settings.resumeUrl || ""} onChange={resumeUrl => setDraft(data => ({ ...data, settings: { ...data.settings, resumeUrl } }))} />
        </>}
        {tab === "achievement" && <>
          <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={Boolean(draft.achievement)} onChange={event => setDraft(data => ({ ...data, achievement: event.target.checked ? { title: "Achievement", year: String(new Date().getFullYear()), organization: "Organization", description: "Describe your achievement." } : null }))} />Show achievement</label>
          {draft.achievement && ([["title", "Achievement title"], ["year", "Year"], ["organization", "Organization"], ["description", "Description"], ["proofUrl", "Proof URL (optional)"]] as const).map(([key, label]) => <Field key={key} id={"achievement-" + key} label={label} value={draft.achievement?.[key] || ""} required={key !== "proofUrl"} multiline={key === "description"} url={key === "proofUrl"} onChange={value => setDraft(data => ({ ...data, achievement: data.achievement ? { ...data.achievement, [key]: value } : undefined }))} />)}
        </>}
        {tab === "hero" && ([
          ["firstName", "First name"], ["lastName", "Last name"], ["title", "Professional title"], ["description", "Introduction"],
        ] as const).map(([key, label]) => <Field key={key} id={"hero-" + key} label={label} value={draft.hero[key]} multiline={key === "description"} required onChange={value => setDraft(data => ({ ...data, hero: { ...data.hero, [key]: value } }))} />)}
        {tab === "skills" && draft.skills.map((skill, index) => <div key={index} className="flex items-end gap-2"><div className="flex-1"><Field id={"skill-" + index} label={"Skill " + (index + 1)} value={skill} required onChange={value => setDraft(data => ({ ...data, skills: data.skills.map((item, i) => i === index ? value : item) }))} /></div><button type="button" onClick={() => remove("skills", index)} aria-label={"Delete skill " + (index + 1)} className="h-11 w-11 text-error"><Trash2 className="mx-auto h-5 w-5" aria-hidden="true" /></button></div>)}
        {tab === "experience" && draft.experience.map((item, index) => <fieldset key={index} className="space-y-4 rounded-lg border border-outline-variant p-4">
          <legend className="px-2 font-semibold">Role {index + 1}</legend>
          {([["year", "Dates"], ["role", "Role"], ["organization", "Organization"], ["description", "Contribution"], ["iconName", "Icon (Users, GitBranch, ClipboardList or Briefcase)"]] as const).map(([key, label]) => <Field key={key} id={`experience-${index}-${key}`} label={label} value={item[key]} required multiline={key === "description"} onChange={value => experience(index, { [key]: value })} />)}
          <button type="button" onClick={() => remove("experience", index)} className="min-h-11 text-sm text-error">Delete role</button>
        </fieldset>)}
        {tab === "projects" && draft.projects.map((item, index) => <fieldset key={index} className="space-y-4 rounded-lg border border-outline-variant p-4">
          <legend className="px-2 font-semibold">Project {index + 1}</legend>
          {([["filename", "Display filename"], ["title", "Project title"], ["description", "Summary"], ["category", "Category"], ["slug", "Page slug (optional)"], ["githubUrl", "GitHub URL (optional)"], ["liveUrl", "Demo URL (optional)"], ["imageUrl", "Project photo URL (optional)"], ["imageAlt", "Photo description (accessibility)"], ["problem", "Problem / goal"], ["approach", "Your approach"], ["outcome", "Result (use verified facts)"]] as const).map(([key, label]) => <Field key={key} id={`project-${index}-${key}`} label={label} value={item[key] || ""} required={["filename", "title", "description", "category"].includes(key)} multiline={["description", "problem", "approach", "outcome"].includes(key)} url={key === "githubUrl" || key === "liveUrl" || key === "imageUrl"} onChange={value => project(index, { [key]: value || undefined })} />)}
          <Field id={"project-tags-" + index} label="Tags (comma separated)" value={item.tags.join(",")} onChange={value => project(index, { tags: value.split(",") })} />
          <button type="button" onClick={() => remove("projects", index)} className="min-h-11 text-sm text-error">Delete project</button>
        </fieldset>)}
        {tab === "certs" && draft.certifications.map((item, index) => <fieldset key={index} className="space-y-4 rounded-lg border border-outline-variant p-4">
          <legend className="px-2 font-semibold">Credential {index + 1}</legend>
          {([["title", "Credential title"], ["desc", "Description"], ["issuer", "Issuer"], ["issuedAt", "Date issued"], ["credentialUrl", "Verification URL (optional)"]] as const).map(([key, label]) => <Field key={key} id={`cert-${index}-${key}`} label={label} value={item[key] || ""} required={key === "title" || key === "desc"} multiline={key === "desc"} url={key === "credentialUrl"} onChange={value => certification(index, { [key]: value })} />)}
          <button type="button" onClick={() => remove("certifications", index)} className="min-h-11 text-sm text-error">Delete credential</button>
        </fieldset>)}
      </form>
      <div className="space-y-3 border-t border-outline-variant p-4">
        {result && <p role={result.success ? "status" : "alert"} className={`text-sm ${result.success ? "text-on-surface" : "text-error"}`}>{result.message}</p>}
        {result?.requiresLogin && <div className="flex flex-wrap items-end gap-2"><div className="flex-1"><label htmlFor="reauth-password" className="mb-2 block text-sm">Admin password</label><input id="reauth-password" type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="min-h-11 w-full rounded border border-outline-variant bg-background px-3" /></div><button type="button" disabled={busy} onClick={() => void signIn()} className="min-h-11 rounded bg-primary px-4 text-on-primary">Sign in again</button></div>}
        <div className="flex justify-end gap-3"><button type="button" onClick={close} className="min-h-11 rounded border border-outline-variant px-4 text-sm">Close</button><button type="submit" form="portfolio-editor" disabled={busy} className="inline-flex min-h-11 items-center gap-2 rounded bg-primary px-4 text-sm font-semibold text-on-primary disabled:opacity-60"><Save className="h-4 w-4" aria-hidden="true" />{busy ? "Saving…" : "Save Changes"}</button></div>
      </div>
    </div>
  </dialog>;
}
