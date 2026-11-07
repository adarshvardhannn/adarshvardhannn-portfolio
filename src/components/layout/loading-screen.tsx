import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show ? (
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050705]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      >
        <motion.div
          className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(68,255,153,0.6)]" />
          <span className="font-display text-sm tracking-[0.3em] text-white/80">LOADING</span>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
