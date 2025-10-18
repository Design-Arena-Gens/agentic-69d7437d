'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bolt, Gauge, Infinity as InfinityIcon, LifeBuoy, Timer } from 'lucide-react';

const presets = [
  {
    id: 'kinetic',
    label: 'Kinetic Drift',
    description: 'Elastic easing with momentum capture.',
    color: 'from-brand-500/80 to-sky-500/90'
  },
  {
    id: 'resonance',
    label: 'Resonance Loop',
    description: 'Dual-stage resonance for haptic fidelity.',
    color: 'from-purple-500/80 to-fuchsia-500/80'
  },
  {
    id: 'feather',
    label: 'Feather Glide',
    description: 'Featherweight transitions with soft landing.',
    color: 'from-emerald-500/80 to-teal-500/80'
  }
] as const;

const controls = [
  { id: 'latency', label: 'Latency', icon: Timer, min: 40, max: 120 },
  { id: 'density', label: 'Density', icon: Gauge, min: 10, max: 90 },
  { id: 'resilience', label: 'Resilience', icon: LifeBuoy, min: 20, max: 80 }
] as const;

export function MicroInteractionPanel() {
  const [activePreset, setActivePreset] = useState<(typeof presets)[number]['id']>('kinetic');
  const [controlValues, setControlValues] = useState<Record<string, number>>({
    latency: 78,
    density: 42,
    resilience: 65
  });

  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white/80 via-white/40 to-slate-100/20 p-6 backdrop-blur-2xl dark:border-slate-800/60 dark:from-slate-950/80 dark:via-slate-900/40 dark:to-slate-900/20"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
    >
      <motion.div
        className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-brand-500/10 to-purple-500/0 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-400/10">
              <Bolt className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Micro Interaction Engine</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Calibrate how motion, latency, and feedback harmonize together.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {presets.map((preset) => (
              <motion.button
                key={preset.id}
                onClick={() => setActivePreset(preset.id)}
                className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 p-4 text-left transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/50 dark:bg-slate-900/60"
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-0 transition-opacity duration-500 ${
                    activePreset === preset.id ? 'opacity-30' : ''
                  }`}
                />
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{preset.label}</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{preset.description}</p>
                  <AnimatePresence>
                    {activePreset === preset.id && (
                      <motion.span
                        layoutId="preset-active"
                        className="mt-3 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-brand-500 shadow-sm dark:bg-slate-900/90 dark:text-brand-400"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                      >
                        Active
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="relative flex-1 rounded-3xl border border-slate-200/60 bg-white/60 p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                Fine Controls
              </p>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Precision tuning spectrum
              </h4>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500 dark:bg-brand-400/10 dark:text-brand-400">
              <InfinityIcon className="h-4 w-4" />
              Live
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {controls.map((control, idx) => {
              const Icon = control.icon;
              const value = controlValues[control.id] ?? 0;
              const percentage = ((value - control.min) / (control.max - control.min)) * 100;

              return (
                <div key={control.id} className="rounded-2xl border border-slate-200/60 p-4 dark:border-slate-800/60">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-300">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-brand-500 dark:bg-slate-800">
                        <Icon className="h-4 w-4" />
                      </span>
                      {control.label}
                    </div>
                    <span className="font-mono text-sm text-brand-500 dark:text-brand-400">{value}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="range"
                      min={control.min}
                      max={control.max}
                      value={value}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);
                        setControlValues((previous) => ({
                          ...previous,
                          [control.id]: nextValue
                        }));
                      }}
                      className="h-1 w-full accent-brand-500"
                    />
                    <span className="text-xs text-slate-400 dark:text-slate-500">{Math.round(percentage)}%</span>
                  </div>
                  <motion.div
                    className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/60 dark:bg-slate-800/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-brand-500 via-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
