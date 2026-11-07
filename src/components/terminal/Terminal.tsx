import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getNode,
  getCanonicalPath,
  listDirectory,
  readFile,
} from '@/data/terminal-fs';

type Line = { text: string; className?: string };

const initialBanner = [
  { text: 'Welcome to AdarshOS v0.1! Type \u2018help\u2019 to see available commands.', className: 'text-emerald-300' },
];

const helpText = `Available commands:
  help: Displays this help message
  whoareyou: Introduces the developer
  ls: List contents of current directory
  cd: Change directory. Usage: cd <directory>
  cat: Display contents of a file. Usage: cat <filename>
  clear: Clear the terminal screen
  hello: Displays a friendly ASCII art greeting
  time: Displays current system time
  sudo: Attempts to use superuser privileges
  fact: Shares a random interesting fact
  exit: Exits the terminal`;

const randFact = () => {
  const facts = [
    'OSINT stands for Open-Source Intelligence — gathering intelligence from publicly available data.',
    'Buffer overflows were analyzed in the 1980s and remain critical memory safety vectors.',
    'pHash uses Discrete Cosine Transform (DCT) to compute perceptual image hashes invariant to scaling and compression.',
    'Digital Forensics uses cryptographic hashing (SHA-256 / MD5) to verify chain of custody.',
    'OWASP Top 10 serves as the gold-standard awareness document for web application vulnerabilities.',
  ];
  return facts[Math.floor(Math.random() * facts.length)];
};

export const Terminal: React.FC<{ onExit?: () => void; fullHeight?: boolean }> = ({ onExit, fullHeight = false }) => {
  const [lines, setLines] = useState<Line[]>(initialBanner);
  const [cwd, setCwd] = useState('/home/adarsh');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollTop = viewRef.current.scrollHeight;
    }
  }, [lines]);

  const push = (text: string, className?: string) => setLines((l) => [...l, { text, className }]);

  const runCommand = (raw: string) => {
    const cmdline = raw.trim();
    if (!cmdline) return;
    setHistory((h) => [cmdline, ...h]);
    setHistIndex(null);
    push(`$ ${cmdline}`, 'text-emerald-400');

    const [cmd, ...args] = cmdline.split(/\s+/);
    const targetArg = args.join(' ').trim();

    switch (cmd.toLowerCase()) {
      case 'help':
        push(helpText);
        break;
      case 'whoareyou':
        push("I'm Adarsh Vardhan — Cybersecurity Postgraduate @ NFSU Bhopal | FACT 2026 Qualified | Google Student Ambassador 2026 | Full-Stack & Security Researcher.");
        break;
      case 'ls': {
        const currentVirtual = cwd === '/home/adarsh' ? '~' : cwd.replace('/home/adarsh', '~');
        const items = listDirectory(currentVirtual, targetArg);
        if (items === null) {
          const fileCheck = readFile(currentVirtual, targetArg);
          if (!fileCheck.notFound && !fileCheck.isDir) {
            push(targetArg);
          } else {
            push(`ls: cannot access '${targetArg}': No such file or directory`, 'text-red-400');
          }
        } else if (items.length > 0) {
          const formatted = items.map((item) => (item.isDir ? `${item.name}/` : item.name)).join('   ');
          push(formatted);
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
          push(`cd: no such file or directory: ${targetArg}`, 'text-red-400');
        } else if (!node.isDir) {
          push(`cd: not a directory: ${targetArg}`, 'text-red-400');
        } else {
          const displayCwd = canonicalVirtual === '~' ? '/home/adarsh' : canonicalVirtual.replace(/^~/, '/home/adarsh');
          setCwd(displayCwd);
        }
        break;
      }
      case 'cat': {
        if (!targetArg) {
          push('usage: cat <filename>', 'text-red-400');
          break;
        }
        const currentVirtual = cwd === '/home/adarsh' ? '~' : cwd.replace('/home/adarsh', '~');
        const fileResult = readFile(currentVirtual, targetArg);
        if (fileResult.notFound) {
          push(`cat: ${targetArg}: No such file or directory`, 'text-red-400');
        } else if (fileResult.isDir) {
          push(`cat: ${targetArg}: Is a directory`, 'text-red-400');
        } else {
          push(fileResult.content ?? '');
        }
        break;
      }
      case 'clear':
        setLines([]);
        break;
      case 'hello': {
        const helloAscii = ` _   _      _ _       
| | | |    | | |      
| |_| | ___| | | ___  
|  _  |/ _ \\ | |/ _ \\ 
| | | |  __/ | | (_) |
\\_| |_/\\___|_|_|\\___/ `;
        push(helloAscii);
        push("Hello, world! 👋\nYou're running AdarshOS terminal.");
        break;
      }
      case 'time':
        push(new Date().toString());
        break;
      case 'sudo':
        push('Nice try — no privileges here.');
        break;
      case 'fact':
        push(randFact());
        break;
      case 'exit':
        if (onExit) onExit();
        else window.location.href = '/';
        break;
      default:
        push(`${cmd}: command not found. Type 'help' for available commands.`, 'text-red-400');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={fullHeight ? 'h-full flex flex-col overflow-hidden' : 'rounded-[1.4rem] border border-white/10 bg-[#050605] p-6'}
    >
      {/* inner screen */}
      <div className={fullHeight ? 'flex-1 flex flex-col bg-[#0a0d0a] text-lg leading-7 text-white/80 overflow-hidden' : 'overflow-auto pr-3'} ref={viewRef} style={fullHeight ? { minHeight: 0 } : { maxHeight: '86vh' }}>
        {!fullHeight && (
          <>
            {lines.map((l, i) => (
              <div key={i} className={l.className ? l.className : ''}>
                <pre className="whitespace-pre-wrap">{l.text}</pre>
              </div>
            ))}
          </>
        )}

        {fullHeight && (
          <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
            <div className="flex-1 overflow-y-auto p-6">
              {lines.map((l, i) => (
                <div key={i} className={l.className ? l.className : ''}>
                  <pre className="whitespace-pre-wrap">{l.text}</pre>
                </div>
              ))}
            </div>

            {/* inline prompt + input at the bottom inside the same screen */}
            <div className="px-6 pb-6 pt-0 flex items-center gap-3">
              <span className="text-emerald-400">{cwd} $</span>
              <div className="flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none"
                  aria-label="Terminal input"
                  autoFocus
                  style={{ caretColor: '#34D399' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
