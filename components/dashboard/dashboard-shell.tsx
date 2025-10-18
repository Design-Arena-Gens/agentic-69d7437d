'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from './dashboard-header';
import { MetricCard } from './metric-card';
import { InsightCard } from './insight-card';
import { InitiativeCard } from './initiative-card';
import { ExperienceGraph } from './experience-graph';
import { MicroInteractionPanel } from './micro-interaction-panel';
import { ActivityTimeline } from './activity-timeline';
import { metrics, interactionInsights, initiatives, activities } from '@/data/metrics';

export function DashboardShell() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
      <DashboardHeader />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.id} metric={metric} index={index} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <MicroInteractionPanel />
          <div className="grid gap-4 md:grid-cols-2">
            {interactionInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <ExperienceGraph />
          <ActivityTimeline items={activities} />
        </div>
      </section>

      <motion.section
        className="grid gap-4 rounded-3xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/50"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Initiatives
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Design-engineered shipping lanes
            </h2>
          </div>
          <button className="rounded-full border border-transparent bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/40 transition hover:shadow-glow dark:bg-brand-400">
            Deploy Sequence
          </button>
        </div>
        <div className="grid gap-4">
          {initiatives.map((initiative, index) => (
            <InitiativeCard key={initiative.id} initiative={initiative} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
