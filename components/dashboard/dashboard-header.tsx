'use client';

import { motion } from 'framer-motion';
import { Command, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function DashboardHeader() {
  return (
    <motion.header
      className="flex flex-col gap-6 rounded-3xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/50 lg:flex-row lg:items-center lg:justify-between"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-brand-500/40">
          <Command className="h-6 w-6" />
          <motion.span
            className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-500/10 via-brand-400/0 to-transparent blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Micro Interaction Studio</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Engineering emotionally responsive product ecosystems. Tuned in 4.7s ago.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
        <div className="flex w-full items-center rounded-full border border-slate-200/70 bg-slate-50/60 px-4 py-2 text-sm text-slate-500 shadow-inner dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-300 lg:w-80">
          <Sparkles className="mr-3 h-4 w-4 text-brand-500" />
          <span>Search micro interactions, rituals, patterns</span>
        </div>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
