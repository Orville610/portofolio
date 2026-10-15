"use client";

import { useState, type FormEvent } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AdminAccess() {
  const { isAdmin, login, setShowAdminPanel, logout } = usePortfolio();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signIn(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const result = await login(password);
    setPassword(""); setBusy(false);
    if (result.success) setShowAdminPanel(true);
    else setError(result.message);
  }
  async function signOut() {
    setBusy(true);
    const result = await logout();
    setBusy(false);
    if (!result.success) setError(result.message);
  }
  return <section className="mx-auto w-full max-w-md space-y-5 rounded-xl border border-outline-variant bg-surface-container-low p-6">
    <h1 className="font-headline-md text-2xl font-bold">Portfolio admin</h1>
    <p className="text-sm leading-relaxed text-on-surface-variant">Edit your profile, contact details, CV, projects and credentials.</p>
    {isAdmin ? <div className="flex flex-wrap gap-3">
      <button type="button" onClick={() => setShowAdminPanel(true)} className="min-h-11 rounded bg-primary px-4 text-sm font-semibold text-on-primary">Open editor</button>
      <button type="button" onClick={() => void signOut()} disabled={busy} className="min-h-11 rounded border border-outline-variant px-4 text-sm">Sign out</button>
    </div> : <form onSubmit={event => void signIn(event)} className="space-y-4">
      <div><label htmlFor="admin-password" className="mb-2 block text-sm font-semibold">Admin password</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} className="min-h-11 w-full rounded border border-outline-variant bg-background px-3" /></div>
      <button type="submit" disabled={busy} className="min-h-11 w-full rounded bg-primary px-4 text-sm font-semibold text-on-primary disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
    </form>}
    {error && <p role="alert" className="text-sm text-error">{error}</p>}
  </section>;
}
