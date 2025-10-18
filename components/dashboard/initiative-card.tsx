'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, Compass, Timer } from 'lucide-react';
import type { Initiative } from '@/data/metrics';
import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';

interface InitiativeCardProps {
  initiative: Initiative;
  index: number;
}

const statusStyles: Record<Initiative['status'], string> = {
  Active: 'bg-emerald-500/10 text-emerald-500',
  Exploring: 'bg-sky-500/10 text-sky-500',
  Pending: 'bg-amber-500/10 text-amber-500'
};

const statusIcons: Record<Initiative['status'], ComponentType<{ className?: string }>> = {
  Active: CheckCircle2,
  Exploring: Compass,
  Pending: CircleDashed
};

export function InitiativeCard({ initiative, index }: InitiativeCardProps) {
  const Icon = statusIcons[initiative.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.08 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white/70 p-4 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/60"
    >
      <div className="flex flex-1 items-center gap-4">
        <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 dark:bg-brand-400/10')}>
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{initiative.title}</h4>
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest', statusStyles[initiative.status])}>
              {initiative.status}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Timer className="h-4 w-4" />
              {initiative.eta}
            </span>
            <span className="font-medium text-slate-600 dark:text-slate-300">Owner: {initiative.owner}</span>
          </div>
        </div>
      </div>
      <div className="flex w-32 flex-col items-end">
        <span className="font-mono text-2xl font-semibold text-brand-500 dark:text-brand-400">
          {initiative.completion}%
        </span>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/80">
          <motion.span
            initial={{ width: '0%' }}
            whileInView={{ width: `${initiative.completion}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
