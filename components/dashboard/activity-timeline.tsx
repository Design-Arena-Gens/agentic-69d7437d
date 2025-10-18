'use client';

import { motion } from 'framer-motion';
import { Activity, Compass, Handshake, Waves, Workflow } from 'lucide-react';
import type { Activity as ActivityItem } from '@/data/metrics';
import type { ComponentType } from 'react';

const iconMap: Record<ActivityItem['type'], ComponentType<{ className?: string }>> = {
  motion: Waves,
  strategy: Compass,
  handoff: Handshake,
  experience: Workflow
};

const colorMap: Record<ActivityItem['type'], string> = {
  motion: 'from-sky-500/90 to-blue-500/80',
  strategy: 'from-violet-500/90 to-brand-500/80',
  handoff: 'from-emerald-500/90 to-teal-500/80',
  experience: 'from-amber-500/90 to-orange-500/80'
};

interface ActivityTimelineProps {
  items: ActivityItem[];
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <div className="relative flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white/60 via-white/30 to-white/10 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:from-slate-900/70 dark:via-slate-900/30 dark:to-slate-950/40">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-400/10">
          <Activity className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Interaction Timeline</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time pulses across the experience lattice.
          </p>
        </div>
      </div>
      <div className="relative mt-4 flex flex-col gap-4">
        <span className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-brand-500/40 via-brand-500/5 to-transparent dark:from-brand-400/40" />
        {items.map((item, index) => {
          const Icon = iconMap[item.type];
          const gradient = colorMap[item.type];

          return (
            <motion.div
              key={item.id}
              className="relative flex items-center gap-4 rounded-2xl border border-transparent bg-white/70 p-4 pl-14 shadow-sm shadow-slate-900/5 transition-all hover:translate-x-2 hover:shadow-glow dark:bg-slate-900/70"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <span className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 shadow ring-8 ring-white/40 dark:border-slate-900/80 dark:bg-slate-900 dark:ring-slate-900/40">
                <motion.span
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white`}
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.span>
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.label}</p>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{item.timestamp}</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/60 dark:bg-slate-800/60">
                  <motion.span
                    className={`block h-full rounded-full bg-gradient-to-r ${gradient}`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${Math.round(item.emphasis * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
