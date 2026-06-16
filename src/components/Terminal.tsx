"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface LogEntry {
  type: "input" | "output";
  text: string;
  isHtml?: boolean;
}

export default function Terminal() {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", text: "Welcome to Rville Cloud Terminal v1.0.0" },
    { type: "output", text: "Type 'help' to see list of available commands." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input" as const, text: `guest@rville-cloud:~$ ${cmd}` }];

    if (trimmedCmd === "") {
      setHistory(newHistory);
      return;
    }

    let output: LogEntry[] = [];

    switch (trimmedCmd) {
      case "help":
        output = [
          {
            type: "output",
            text: `Available commands:
  about       - Brief bio about Orville
  skills      - List core tech skills & tools
  experience  - View timeline of experience
  projects    - List featured engineering projects
  certs       - View professional certifications
  contact     - Display contact methods
  neofetch    - Show system details & ASCII art
  confetti    - Fire a celebration rocket!
  clear       - Clear the screen`,
          },
        ];
        break;

      case "about":
        output = [
          {
            type: "output",
            text: `Orville Giovanni Sambono
-------------------------
Fresh Software Engineering graduate based in Makassar, Indonesia.
Passionate about self-hosted infrastructure, advanced networking, and web development.
Main goal: Engineering robust solutions from bare metal to the cloud, building resilient systems.`,
          },
        ];
        break;

      case "skills":
        output = [
          {
            type: "output",
            text: `Core Tech Stack:
- Infrastructure: Armbian Linux, Docker, CasaOS
- Networking: Tailscale, ZeroTier, OpenVPN
- Databases: MariaDB, MySQL, SQLite
- Frontend/Backend: HTML, CSS, Javascript, PHP, React, Next.js, Node.js
- Workflow: UI/UX Design, Git, CI/CD, AI Prompting`,
          },
        ];
        break;

      case "experience":
        output = [
          {
            type: "output",
            text: `Professional Experience & Leadership:
- 2025: Cloud Computing Community Leader
  - Orchestrated workshops on Docker, Linux admin, self-hosting.
- 2025: Coordinator at Christosel
  - Handled logistics and technical event operations.
- 2024 - 2025: Board Member at OSIS
  - Student council governance and administrative scripting.`,
          },
        ];
        break;

      case "projects":
        output = [
          {
            type: "output",
            text: `Featured Engineering Projects:
1. Self-Hosted Cloud Infrastructure (Docker, CasaOS, Nextcloud on Armbian Linux)
2. Distributed Database Networking (Tailscale mesh networking for MariaDB instances)
3. Exarabia Product Innovation (Full-stack PHP/CSS product catalog application)`,
          },
        ];
        break;

      case "certs":
        output = [
          {
            type: "output",
            text: `Certifications:
- Digiup Telkom Indonesia: Advanced Cloud Infrastructure & Networking
- Public Speaking & Leadership Workshops: Communication & Team Management`,
          },
        ];
        break;

      case "contact":
        output = [
          {
            type: "output",
            text: `Connection Details:
- Email   : orvillegiovanni@gmail.com
- Github  : github.com (OrvilleGiovanni)
- Whatsapp: Direct message button below`,
          },
        ];
        break;

      case "neofetch":
        output = [
          {
            type: "output",
            isHtml: true,
            text: `<div class="flex gap-4 font-mono leading-tight">
  <div class="text-primary font-bold hidden sm:block">
    .---.      
   (     )     
  (  .---. )   
  ( (     ) )  
   (  ---  )   
    '---'      
  </div>
  <div>
    <span class="text-primary font-bold">guest</span>@<span class="text-secondary font-bold">rville-cloud</span>
    <br/>------------------
    <br/><span class="text-primary">OS:</span> Armbian Linux v25.04 (Bullseye)
    <br/><span class="text-primary">Kernel:</span> 6.1.28-selfhosted
    <br/><span class="text-primary">Uptime:</span> 365d 4h 22m (ONLINE)
    <br/><span class="text-primary">Shell:</span> NextjsTerminal/1.0
    <br/><span class="text-primary">Projects:</span> 3 Active (Docker base)
    <br/><span class="text-primary">Location:</span> Makassar, Indonesia
    <br/><span class="text-primary">Status:</span> Cloud computing finalist 🏆
  </div>
</div>`,
          },
        ];
        break;

      case "confetti":
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#adc6ff", "#4edea3", "#ffb786"],
        });
        output = [
          {
            type: "output",
            text: "🎉 System Celebration Executed! Launching confetti...",
          },
        ];
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = [
          {
            type: "output",
            text: `Command '${cmd}' not found. Type 'help' for available commands.`,
          },
        ];
        break;
    }

    setHistory([...newHistory, ...output]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12" onClick={focusInput}>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest/80 text-on-surface shadow-lg overflow-hidden terminal-glow-hover transition-all duration-300">
        {/* Terminal Header */}
        <div className="px-4 py-3 border-b border-outline-variant bg-surface-container/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error cursor-pointer hover:bg-error/80" onClick={() => setHistory([])} title="Clear terminal" />
            <div className="w-3 h-3 rounded-full bg-tertiary-container" />
            <div className="w-3 h-3 rounded-full bg-secondary-container" />
            <span className="font-code-sm text-xs text-on-surface-variant ml-2 select-none flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-primary" />
              guest@rville-cloud: ~ (interactive)
            </span>
          </div>
          <button
            onClick={() => handleCommand("neofetch")}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-xs font-code-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            neofetch
          </button>
        </div>

        {/* Terminal Content Screen */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto bg-surface/90 scrollbar-hide">
          {history.map((entry, idx) => (
            <div key={idx} className="mb-2">
              {entry.type === "input" ? (
                <div className="text-secondary font-semibold">{entry.text}</div>
              ) : entry.isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: entry.text }} />
              ) : (
                <pre className="whitespace-pre-wrap text-on-surface-variant">{entry.text}</pre>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/40 flex items-center gap-2">
          <span className="text-secondary font-semibold font-mono select-none">guest@rville-cloud:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-grow bg-transparent border-none outline-none focus:ring-0 p-0 text-primary font-mono text-sm caret-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' and press Enter..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button
            onClick={() => handleCommand(input)}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
            title="Run command"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
