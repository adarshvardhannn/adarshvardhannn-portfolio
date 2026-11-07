export const Background = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,255,158,0.12),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(6,9,6,1)_0%,rgba(5,6,5,1)_100%)]" />
    <div className="absolute inset-0 grid-fine opacity-[0.22]" />
    <div className="noise-layer absolute inset-0 opacity-[0.08]" />
    <div className="absolute left-[-10%] top-[-8%] h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px] animate-pulseGlow" />
    <div className="absolute right-[-12%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-lime-400/6 blur-[180px] animate-float" />
    <div className="absolute bottom-[-10%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-white/5 blur-[180px]" />
  </div>
);
