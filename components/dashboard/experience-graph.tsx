'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  intensity: number;
}

const nodes: Node[] = [
  { id: 'gesture', label: 'Gesture', x: 18, y: 72, intensity: 0.7 },
  { id: 'response', label: 'Response Delay', x: 45, y: 26, intensity: 0.92 },
  { id: 'handoff', label: 'Handoff', x: 64, y: 64, intensity: 1 },
  { id: 'feedback', label: 'Haptic Feedback', x: 32, y: 48, intensity: 0.61 },
  { id: 'composure', label: 'Composure Loop', x: 78, y: 38, intensity: 0.84 }
];

const connections: [string, string][] = [
  ['gesture', 'feedback'],
  ['feedback', 'response'],
  ['response', 'handoff'],
  ['handoff', 'composure'],
  ['composure', 'feedback']
];

const gradients = [
  'from-brand-500',
  'from-purple-500',
  'from-emerald-500',
  'from-sky-500',
  'from-amber-500'
];

export function ExperienceGraph() {
  const nodeWithGradient = nodes.map((node, idx) => ({
    ...node,
    gradient: gradients[idx % gradients.length]
  }));

  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-50/90 via-white/50 to-slate-100/20 p-6 dark:border-slate-800/60 dark:from-slate-900/70 dark:via-slate-900/40 dark:to-slate-950/40">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Experience Constellation</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dynamic motion lattice tuned for micro interaction resonance.
          </p>
        </div>
        <div className="rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-brand-500 shadow dark:bg-slate-900/70 dark:text-brand-400">
          Auto-Orchestrating
        </div>
      </div>
      <div className="relative mt-6 flex-1 rounded-2xl bg-gradient-to-tr from-white/10 via-brand-500/5 to-transparent p-4 dark:from-slate-900/40 dark:via-brand-500/5">
        <div className="absolute inset-0">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {connections.map(([startId, endId]) => {
              const startNode = nodes.find((n) => n.id === startId);
              const endNode = nodes.find((n) => n.id === endId);
              if (!startNode || !endNode) return null;
              return (
                <motion.line
                  key={`${startId}-${endId}`}
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth={0.6}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 0.8, pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: 'easeInOut' }}
                />
              );
            })}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(88,119,255,0.15)" />
                <stop offset="100%" stopColor="rgba(100,220,255,0.0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {nodeWithGradient.map((node) => {
          const pulseDelay = node.intensity * 2;
          const scale = 0.95 + node.intensity * 0.1;
          return (
            <motion.div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              whileHover={{ scale: scale + 0.1 }}
            >
              <motion.span
                layoutId={node.id}
                style={{ width: `${48 + node.intensity * 20}px`, height: `${48 + node.intensity * 20}px` }}
                className={cn(
                  'relative flex items-center justify-center rounded-full bg-gradient-to-br to-transparent shadow-lg shadow-brand-500/20 backdrop-blur',
                  node.gradient
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.95, scale }}
                transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
              >
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/40 bg-white/60 text-xs font-semibold text-slate-600 shadow-inner dark:border-slate-900/40 dark:bg-slate-900/70 dark:text-slate-200">
                  {node.label}
                </div>
                <motion.span
                  className="absolute inset-0 rounded-full border border-white/40 opacity-0 group-hover:opacity-100 dark:border-slate-800/50"
                  initial={{ opacity: 0 }}
                  animate={{ scale: [1, 1.28, 1], opacity: [0, 0.65, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: pulseDelay }}
                />
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500 shadow-sm dark:bg-slate-900/70 dark:text-slate-300"
              >
                Energy {Math.round(node.intensity * 100)}%
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
