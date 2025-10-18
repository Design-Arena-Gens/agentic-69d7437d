'use client';

import { motion } from 'framer-motion';

interface SparklineProps {
  points: number[];
  trend: 'up' | 'down' | 'steady';
}

const strokePalette: Record<SparklineProps['trend'], string> = {
  up: 'stroke-brand-500',
  down: 'stroke-rose-500',
  steady: 'stroke-amber-500'
};

export function Sparkline({ points, trend }: SparklineProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const normalized = points.map((p) => (p - min) / (max - min || 1));
  const gradientId = `gradient-${trend}`;
  const path = normalized
    .map((value, idx) => {
      const x = (idx / (normalized.length - 1)) * 100;
      const y = 100 - value * 80 - 10;
      return `${idx === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-16 w-full">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(88,119,255,0.2)" />
          <stop offset="100%" stopColor="rgba(88,119,255,0)" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        className={`stroke-[3] drop-shadow-sm ${strokePalette[trend]}`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d={`${path} L100,100 L0,100 Z`}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </svg>
  );
}
