import { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-70 mix-blend-screen"
      style={{
        background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, rgba(68, 255, 153, 0.11), transparent 45%)`,
      }}
    />
  );
};
