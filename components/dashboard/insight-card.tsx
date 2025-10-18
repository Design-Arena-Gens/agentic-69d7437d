'use client';

import { motion } from 'framer-motion';
import { Flame, Sparkle, TrendingUp } from 'lucide-react';
import type { InteractionInsight } from '@/data/metrics';
import { cn } from '@/lib/utils';

const iconMap = {
  Gestures: Flame,
  Feedback: Sparkle,
  Experience: TrendingUp
} as const;

interface InsightCardProps {
  insight: InteractionInsight;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const Icon = iconMap[insight.category as keyof typeof iconMap] ?? TrendingUp;
  const positive = insight.delta >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/10 to-brand-500/5 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 dark:via-brand-400/20" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <span className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-400/10', positive ? 'text-emerald-500' : 'text-rose-400')}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {insight.category}
              </p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{insight.title}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{insight.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold',
              positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            )}
          >
            {positive ? '+' : ''}
            {insight.delta}%
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            Sentiment
            <span className="font-mono text-sm text-brand-500 dark:text-brand-400">{insight.sentiment}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-6 h-2 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/80">
        <motion.span
          initial={{ width: '0%' }}
          whileInView={{ width: `${Math.max(0, Math.min(100, insight.sentiment))}%` }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-500 via-purple-500 to-blue-500 shadow-glow"
        />
      </div>
    </motion.article>
  );
}
