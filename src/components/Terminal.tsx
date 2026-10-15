"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { site } from "@/lib/site";

interface LogEntry { type: "input" | "output"; text: string }
const commands = ["help", "about", "skills", "experience", "projects", "certs", "contact", "neofetch", "confetti", "admin", "sudo", "weather", "matrix", "speedtest", "clear"];

export default function Terminal() {
  const { portfolioData, isAdmin, login, setShowAdminPanel } = usePortfolio();
  const [user, setUser] = useState("guest");
  const [passwordPrompt, setPasswordPrompt] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([{ type: "output", text: "Welcome to Rville Cloud Terminal. Type 'help' to explore my work." }]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [history]);
  const append = (...entries: LogEntry[]) => setHistory(previous => [...previous, ...entries].slice(-200));
  const output = (text: string) => append({ type: "output", text });

  async function runCommand(raw: string) {
    if (busy) return;
    setInput("");
    if (passwordPrompt) {
      append({ type: "input", text: "[password entered]" });
      setBusy(true);
      const result = await login(raw);
      setBusy(false);
      setPasswordPrompt(false);
      output(result.success ? "Signed in. Opening the admin panel…" : result.message);
      if (result.success) setShowAdminPanel(true);
      return;
    }
    const command = raw.trim().toLowerCase();
    append({ type: "input", text: `${user}@rville:~$ ${raw}` });
    if (!command) return;
    setCommandHistory(previous => previous.at(-1) === command ? previous : [...previous, command].slice(-100));
    setHistoryIndex(-1);
    if (command === "sudo rville") { setUser("rville"); output("Switched to the rville terminal profile. This does not grant admin access."); return; }
    if (command === "admin" || command === "sudo su") {
      if (command === "sudo su" && user === "guest") { output("Permission denied. Use 'sudo rville' first, or 'admin' to sign in."); return; }
      if (isAdmin) { setShowAdminPanel(true); return; }
      output("Admin password:");
      setPasswordPrompt(true);
      return;
    }
    switch (command) {
      case "help": output(`Available commands:
about       - About Orville
skills      - Current tools and skills
experience  - Community and leadership experience
projects    - Featured projects
certs       - Learning and certifications
contact     - Contact details
neofetch    - Portfolio summary (simulation)
confetti    - Celebrate
admin       - Sign in to edit the portfolio
sudo        - Terminal profile commands
weather     - Sample weather output (not live)
matrix      - A small terminal easter egg
speedtest   - Simulated speed test (not a measurement)
clear       - Clear the terminal

Use ↑/↓ for history and Ctrl+Space for autocomplete. Tab moves between controls.`); break;
      case "about": output(`${portfolioData.hero.firstName} ${portfolioData.hero.lastName}\n${portfolioData.hero.title}\n${portfolioData.hero.description}`); break;
      case "skills": output("Core Tech Stack:\n" + portfolioData.skills.map(skill => "- " + skill).join("\n")); break;
      case "experience": output("Experience & Leadership:\n" + portfolioData.experience.map(item => `${item.year}: ${item.role} — ${item.organization}\n${item.description}`).join("\n\n")); break;
      case "projects": output("Featured Engineering Projects:\n" + portfolioData.projects.map((project, index) => `${index + 1}. ${project.title}\n${project.description}`).join("\n\n")); break;
      case "certs": output("Certifications:\n" + portfolioData.certifications.map(cert => `${cert.title}\n${cert.desc}`).join("\n\n")); break;
      case "contact": output(`Connection Details:\nEmail: ${portfolioData.settings.email}\nGitHub: ${site.github}\nLinkedIn: ${site.linkedin}`); break;
      case "neofetch": output(`RVILLE — portfolio simulation\n-----------------------------\nFocus: Web development, Linux, cloud\nProjects: ${portfolioData.projects.length}\nLocation: Makassar, Indonesia\nKernel: Browser-based simulation; no remote shell\nWebsite: ${site.url}`); break;
      case "confetti":
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
          try { const { default: confetti } = await import("canvas-confetti"); confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, disableForReducedMotion: true }); }
          catch { output("Celebration ready 🎉"); }
        }
        output("🎉 Thanks for exploring my work!"); break;
      case "weather": output("Sample weather — not live data\nMakassar: 31°C, partly cloudy.\nThis is a terminal demonstration."); break;
      case "speedtest": output("SIMULATION — no network speed was measured.\nExample download: 945 Mbps\nExample upload: 480 Mbps\nExample latency: 4 ms"); break;
      case "matrix": output("Wake up, Neo…\n10100110 01011010 10110100"); break;
      case "sudo": output("usage: sudo rville | sudo su"); break;
      case "clear": setHistory([]); break;
      default: output(`Command '${raw}' not found. Type 'help' for available commands.`);
    }
  }
  return <section className="overflow-hidden border-t border-outline-variant" aria-label="Interactive terminal">
    <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container-low px-4 py-3">
      <p className="font-code-sm text-xs text-on-surface-variant">{user}@rville:~ — local simulation</p>
      <div className="flex gap-2">
        {isAdmin && <button type="button" onClick={() => setShowAdminPanel(true)} className="min-h-11 px-2 text-xs font-semibold text-primary-text">Open admin</button>}
        <button type="button" onClick={() => setHistory([])} className="inline-flex min-h-11 items-center gap-2 px-2 text-xs text-on-surface-variant" aria-label="Clear terminal"><RotateCcw className="h-4 w-4" aria-hidden="true" />Clear</button>
      </div>
    </div>
    <div ref={outputRef} role="log" aria-label="Terminal output" aria-live="polite" className="max-h-80 min-h-48 overflow-y-auto bg-surface-container-lowest p-4 font-code-sm text-sm leading-relaxed">
      {history.map((entry, index) => <pre key={index} className={`mb-3 whitespace-pre-wrap break-words ${entry.type === "input" ? "text-primary-text" : "text-on-surface-variant"}`}>{entry.text}</pre>)}
    </div>
    <div className="flex items-center gap-2 border-t border-outline-variant px-4 py-2">
      <label htmlFor="terminal-input" className="sr-only">{passwordPrompt ? "Admin password" : "Terminal command"}</label>
      <span className="shrink-0 font-code-sm text-xs text-secondary" aria-hidden="true">{passwordPrompt ? "Password:" : ">_"}</span>
      <input id="terminal-input" ref={inputRef} type={passwordPrompt ? "password" : "text"} disabled={busy} value={input} onChange={event => setInput(event.target.value)}
        onKeyDown={event => {
          if (event.key === "Enter") { event.preventDefault(); void runCommand(input); }
          else if (event.key === "Escape" && passwordPrompt) { setPasswordPrompt(false); setInput(""); }
          else if (!passwordPrompt && event.key === "ArrowUp" && commandHistory.length) {
            event.preventDefault();
            const index = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(index); setInput(commandHistory[index]);
          } else if (!passwordPrompt && event.key === "ArrowDown") {
            event.preventDefault();
            const index = historyIndex < 0 || historyIndex >= commandHistory.length - 1 ? -1 : historyIndex + 1;
            setHistoryIndex(index); setInput(index === -1 ? "" : commandHistory[index]);
          } else if (!passwordPrompt && event.ctrlKey && event.code === "Space") {
            event.preventDefault();
            const match = commands.find(command => input.trim() && command.startsWith(input.trim().toLowerCase()));
            if (match) setInput(match);
          }
        }}
        placeholder={passwordPrompt ? "Enter admin password" : "Type 'help' and press Enter..."} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
        className="min-h-11 min-w-0 flex-1 rounded bg-transparent px-2 font-code-sm text-sm text-primary-text outline-offset-2 disabled:opacity-60" />
      <button type="button" onClick={() => void runCommand(input)} disabled={busy} aria-label="Run command" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-on-surface-variant hover:text-primary-text disabled:opacity-50"><Play className="h-4 w-4" aria-hidden="true" /></button>
    </div>
    <p className="px-4 pb-3 text-xs text-on-surface-variant">{busy ? "Signing in…" : "↑/↓ history · Ctrl+Space autocomplete · Tab moves focus"}</p>
  </section>;
}
