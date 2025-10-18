'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex h-10 w-16 items-center rounded-full bg-slate-200/80 p-2 shadow-inner transition hover:shadow-glow dark:bg-slate-800/80"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={isDark ? 'dark' : 'light'}
          layout
          initial={{ opacity: 0, scale: 0.6, x: isDark ? 14 : -14 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.6, x: isDark ? 14 : -14 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow dark:bg-slate-900"
        >
          {isDark ? <Moon className="h-4 w-4 text-slate-200" /> : <Sun className="h-4 w-4 text-amber-500" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
