'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import type { MetricCard } from '@/data/metrics';
import { Sparkline } from './sparkline';

interface MetricCardProps {
  metric: MetricCard;
  index: number;
}

const gradientMap = {
  up: 'from-brand-500/15 via-brand-400/10 to-brand-500/0',
  down: 'from-rose-500/20 via-rose-400/10 to-rose-500/0',
  steady: 'from-amber-500/15 via-amber-400/10 to-amber-500/0'
} as const;

export function MetricCard({ metric, index }: MetricCardProps) {
  const isPositive = metric.trend === 'up';
  const isNegative = metric.trend === 'down';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/60"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[metric.trend]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {metric.value}
          </p>
        </div>
        <motion.div
          className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          {isPositive && <ArrowUpRight className="h-4 w-4 text-emerald-500" />}
          {isNegative && <ArrowDownRight className="h-4 w-4 text-rose-500" />}
          {!isPositive && !isNegative && <Minus className="h-4 w-4 text-amber-500" />}
          <span className={isNegative ? 'text-rose-500' : isPositive ? 'text-emerald-500' : 'text-amber-500'}>
            {metric.change > 0 ? '+' : ''}
            {metric.change}%
          </span>
        </motion.div>
      </div>

      <div className="relative mt-6">
        <Sparkline points={metric.sparkline} trend={metric.trend} />
      </div>
    </motion.div>
  );
}
