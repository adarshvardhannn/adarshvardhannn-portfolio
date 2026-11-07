import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteShell } from '@/layouts/site-shell';
import { useState, useEffect, useRef } from 'react';
import {
  getNode,
  getCanonicalPath,
  listDirectory,
  readFile,
} from '@/data/terminal-fs';

type OutputLine = { text: string; type: 'command' | 'output' | 'error' };

export const TerminalPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([
    { text: "Welcome to AdarshOS v0.1! Type 'help' to see available commands.", type: 'output' },
  ]);
  const [cwd, setCwd] = useState('/home/adarsh');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    // Auto-scroll to bottom
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    const updateOverflow = () => {
      const el = outputRef.current;
      if (!el) return;
      setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    };

    updateOverflow();

    const el = outputRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [output]);

  const addOutput = (text: string, type: OutputLine['type'] = 'output') => {
    setOutput((prev) => [...prev, { text, type }]);
  };

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    addOutput(`$ ${cmd}`, 'command');
    setHistory([cmd, ...history]);
    setHistIndex(null);
    setInput('');

    const [command, ...args] = cmd.trim().split(/\s+/);
    const targetArg = args.join(' ').trim();

    switch (command.toLowerCase()) {
      case 'help':
        addOutput('AdarshOS Shell Commands:');
        addOutput('  ls [dir]      - List directory contents');
        addOutput('  cd <dir>      - Change directory (e.g. cd projects, cd skills, cd contact, cd ..)');
        addOutput('  cat <file>    - Display file contents (e.g. cat MobileSentinel.txt)');
        addOutput('  whoareyou     - Overview about the developer');
        addOutput('  clear         - Clear terminal screen');
        addOutput('  hello         - Friendly ASCII art greeting');
        addOutput('  time          - Display current system time');
        addOutput('  fact          - Random tech / cybersecurity fact');
        addOutput('  sudo          - Request superuser privileges');
        addOutput('  exit          - Return to portfolio home');
        addOutput('');
        addOutput("Tip: Explore folders with 'cd projects', 'cd skills', 'cd contact', or 'cd ..' to go back.");
        break;

      case 'whoareyou':
        addOutput("I'm Adarsh Vardhan — Cybersecurity Postgraduate @ NFSU Bhopal | FACT 2026 Qualified | Google Student Ambassador 2026 | Full-Stack & Security Researcher.");
        addOutput('Building modern security assessment platforms, forensic tools, and intelligent full-stack workflows.');
        addOutput("Explore my files: try 'ls', 'cd projects', or 'cat about.ts'.");
        break;

      case 'ls': {
        const currentVirtual = cwd === '/home/adarsh' ? '~' : cwd.replace('/home/adarsh', '~');
        const items = listDirectory(currentVirtual, targetArg);

        if (items === null) {
          const fileCheck = readFile(currentVirtual, targetArg);
          if (!fileCheck.notFound && !fileCheck.isDir) {
            addOutput(targetArg);
          } else {
            addOutput(`ls: cannot access '${targetArg}': No such file or directory`, 'error');
          }
        } else if (items.length === 0) {
          // Empty folder
        } else {
          const formatted = items
            .map((item) => (item.isDir ? `${item.name}/` : item.name))
            .join('   ');
          addOutput(formatted);
        }
        break;
      }

      case 'cd': {
        if (!targetArg || targetArg === '~' || targetArg === '/home/adarsh') {
          setCwd('/home/adarsh');
          break;
        }

        const currentVirtual = cwd === '/home/adarsh' ? '~' : cwd.replace('/home/adarsh', '~');
        const canonicalVirtual = getCanonicalPath(currentVirtual, targetArg);
        const node = getNode(canonicalVirtual);

        if (!node) {
          addOutput(`cd: no such file or directory: ${targetArg}`, 'error');
        } else if (!node.isDir) {
          addOutput(`cd: not a directory: ${targetArg}`, 'error');
        } else {
          const displayCwd = canonicalVirtual === '~' ? '/home/adarsh' : canonicalVirtual.replace(/^~/, '/home/adarsh');
          setCwd(displayCwd);
        }
        break;
      }

      case 'cat': {
        if (!targetArg) {
          addOutput('usage: cat <filename>', 'error');
          break;
        }

        const currentVirtual = cwd === '/home/adarsh' ? '~' : cwd.replace('/home/adarsh', '~');
        const fileResult = readFile(currentVirtual, targetArg);

        if (fileResult.notFound) {
          addOutput(`cat: ${targetArg}: No such file or directory`, 'error');
        } else if (fileResult.isDir) {
          addOutput(`cat: ${targetArg}: Is a directory`, 'error');
        } else {
          addOutput(fileResult.content ?? '');
        }
        break;
      }

      case 'clear':
        setOutput([]);
        break;

      case 'hello': {
        const helloAscii = ` _   _      _ _       
| | | |    | | |      
| |_| | ___| | | ___  
|  _  |/ _ \\ | |/ _ \\ 
| | | |  __/ | | (_) |
\\_| |_/\\___|_|_|\\___/ `;
        addOutput(helloAscii);
        addOutput("Hello, world! 👋 You're running AdarshOS terminal.");
        break;
      }

      case 'time':
        addOutput(new Date().toString());
        break;

      case 'sudo':
        addOutput('Nice try — no privileges here.');
        break;

      case 'fact': {
        const facts = [
          'OSINT stands for Open-Source Intelligence — uncovering intelligence from publicly accessible data.',
          'Buffer overflows were analyzed in the 1980s and remain critical memory safety vulnerabilities.',
          'pHash uses Discrete Cosine Transform (DCT) to generate perceptual hashes invariant to scaling and minor edits.',
          'OWASP Top 10 is the global industry standard awareness document for web application security.',
          'Digital Forensics uses cryptographic hashing (SHA-256 / MD5) to verify evidence chain-of-custody.',
          'Multi-modal VLMs (GPT-4o, Gemini 1.5) apply Chain-of-Thought reasoning directly across visual evidence and claim text.',
        ];
        addOutput(facts[Math.floor(Math.random() * facts.length)]);
        break;
      }

      case 'exit':
        navigate('/');
        break;

      default:
        addOutput(`${command}: command not found. Type 'help' for available commands.`, 'error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = histIndex === null ? 0 : Math.min(history.length - 1, histIndex + 1);
      setHistIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      if (histIndex === null) return setInput('');
      const nextIndex = histIndex - 1;
      if (nextIndex < 0) {
        setHistIndex(null);
        setInput('');
      } else {
        setHistIndex(nextIndex);
        setInput(history[nextIndex] ?? '');
      }
    }
  };

  return (
    <SiteShell hideNavAndFooter>
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Top-Left Go Back Button */}
        <div className="absolute left-6 top-6 z-20">
          <button
            onClick={() => {
              if (showHelp) {
                setShowHelp(false);
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-2 text-zinc-400 hover:text-white font-sans text-sm font-medium transition-colors focus:outline-none"
          >
            <span className="text-base">&lt;</span>
            <span>Go Back</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!showHelp ? (
            /* Terminal Screen */
            <motion.div
              key="terminal-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl min-h-0 flex flex-col shadow-2xl"
            >
              <div className="rounded-lg border border-zinc-800/80 bg-[#0d0e12] overflow-hidden flex flex-col min-h-0 h-[65vh]">
                {/* Terminal Header */}
                <div className="flex shrink-0 items-center justify-between bg-[#18181c] px-4 py-3 border-b border-zinc-800/60">
                  {/* macOS Window Controls */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Right Aligned Title */}
                  <div className="flex items-center gap-2 text-zinc-400/90 font-sans text-xs md:text-sm font-medium">
                    <span className="font-mono text-zinc-500">&gt;_</span>
                    <span>AdarshOS Terminal</span>
                  </div>
                </div>

                {/* Scrollable Terminal Body containing both Output and Inline Input */}
                <div
                  ref={outputRef}
                  onClick={() => inputRef.current?.focus()}
                  className={`flex-1 min-h-0 bg-[#0a0b0d] p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-y-auto overscroll-contain ${hasOverflow ? 'thin-scrollbar' : 'scrollbar-hidden'}`}
                  style={{ scrollBehavior: 'auto' }}
                  onWheel={(event) => {
                    event.stopPropagation();
                    const el = outputRef.current;
                    if (!el) return;
                    el.scrollTop += event.deltaY;
                  }}
                >
                  {output.map((line, i) => (
                    <div key={i} className="mb-1">
                      {line.type === 'command' ? (
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="text-[#60a5fa] font-semibold">{cwd}</span>
                          <span className="text-white/90">$</span>
                          <span className="text-white">{line.text.replace(/^\$\s*/, '')}</span>
                        </div>
                      ) : (
                        <div
                          className={
                            line.type === 'error'
                              ? 'text-red-400 whitespace-pre-wrap'
                              : line.text.startsWith('Welcome to')
                              ? 'text-[#4ade80] whitespace-pre-wrap'
                              : 'text-white/80 whitespace-pre-wrap'
                          }
                        >
                          {line.text}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Inline Prompt Input Line */}
                  <div className="flex items-center gap-x-2 mt-1">
                    <span className="text-[#60a5fa] font-semibold">{cwd}</span>
                    <span className="text-white/90">$</span>
                    <div className="relative flex-1 min-h-[1.5rem] flex items-center">
                      <div className="pointer-events-none whitespace-pre-wrap text-white">
                        {input}
                        <span className="ml-0.5 inline-block h-[1.1em] w-[0.72ch] translate-y-[0.1em] bg-white terminal-block-cursor align-middle" />
                      </div>
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="absolute inset-0 w-full bg-transparent text-transparent outline-none caret-transparent font-mono text-xs md:text-sm"
                        aria-label="Terminal input"
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Help Screen Guide Card */
            <motion.div
              key="help-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl min-h-0 flex flex-col shadow-2xl"
            >
              <div className="rounded-lg border border-zinc-800/80 bg-[#0d0e12] overflow-hidden flex flex-col min-h-0 h-[65vh]">
                {/* Guide Header */}
                <div className="flex shrink-0 items-center justify-between bg-[#18181c] px-4 py-3 border-b border-zinc-800/60">
                  {/* macOS Window Controls */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Right Aligned Guide Title */}
                  <div className="flex items-center gap-2 text-zinc-400/90 font-sans text-xs md:text-sm font-medium">
                    <span>~/AdarshOS Terminal Guide & Feedback</span>
                  </div>
                </div>

                {/* Guide Body */}
                <div className="flex-1 min-h-0 bg-[#0a0b0d] p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-y-auto thin-scrollbar text-[#4ade80] whitespace-pre-wrap text-left">
{`Welcome to AdarshOS Terminal!

Available Commands:
1. whoareyou - Learn about the developer
2. cd [directory] - Change directory
3. ls - List files in the current directory
4. cat [filename] - View contents of a file
5. clear - Clear the terminal screen
6. hello - Get a friendly ASCII art greeting
7. time - Check the current time
8. fact - Learn a random fact
9. sudo - Gain superuser privileges
10. exit - Exit the terminal

Tip: Type 'help' for a list of available commands`}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle ? Button (only shown on terminal screen) */}
        {!showHelp && (
          <div className="absolute right-6 bottom-6 z-20">
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 focus:outline-none"
              aria-label="Terminal help"
            >
              <span className="font-sans text-sm font-medium">?</span>
            </button>
          </div>
        )}
      </section>
    </SiteShell>
  );
};

export default TerminalPage;
