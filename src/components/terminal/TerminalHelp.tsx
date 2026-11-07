import React from 'react';
import { motion } from 'framer-motion';

const commands = [
  'help — Displays help',
  'whoareyou — Introduces the developer',
  'ls — List directory contents',
  'cd <dir> — Change directory',
  'cat <file> — Show file contents',
  'clear — Clear screen',
  'hello — Fancy hello',
  'time — Current time',
  'sudo — Try superuser',
  'fact — Random fact',
  'exit — Exit terminal',
];

export const TerminalHelp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="relative w-full max-w-2xl glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Terminal Commands</h3>
          <button onClick={onClose} className="text-sm text-emerald-300">Close</button>
        </div>
        <div className="grid gap-2">
          {commands.map((c) => (
            <div key={c} className="font-mono text-sm text-white/80">{c}</div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TerminalHelp;
