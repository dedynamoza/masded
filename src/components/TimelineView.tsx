import React from 'react';
import { MilestoneItem, PhaseGroup } from '../types';
import { MilestoneCard } from './MilestoneCard';
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface TimelineViewProps {
  phases: PhaseGroup[];
  milestones: MilestoneItem[];
  completedIds: number[];
  onToggleComplete: (id: number, e: React.MouseEvent) => void;
  onSelectMilestone: (milestone: MilestoneItem) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  phases,
  milestones,
  completedIds,
  onToggleComplete,
  onSelectMilestone,
}) => {
  return (
    <div className="space-y-12">
      {phases.map((phase, phaseIdx) => {
        const phaseMilestones = milestones.filter((m) => m.phaseId === phase.id);
        const phaseCompletedCount = phaseMilestones.filter((m) =>
          completedIds.includes(m.id)
        ).length;
        const isPhaseFullyDone = phaseCompletedCount === phaseMilestones.length;

        return (
          <div
            key={phase.id}
            className="relative bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs"
          >
            {/* Phase Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${phase.color.badgeBg}`}
                  >
                    {phase.badge}
                  </span>
                  {isPhaseFullyDone && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Fase Selesai
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {phase.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {phase.subtitle}
                </p>
              </div>

              {/* Phase Completion Mini Bar */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-700">
                  {phaseCompletedCount}/{phaseMilestones.length} Tahap
                </span>
                <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(phaseCompletedCount / phaseMilestones.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Milestones Grid / Stepper */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative">
              {phaseMilestones.map((milestone) => {
                const isCompleted = completedIds.includes(milestone.id);
                return (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    phase={phase}
                    isCompleted={isCompleted}
                    onToggleComplete={onToggleComplete}
                    onSelect={onSelectMilestone}
                  />
                );
              })}
            </div>

            {/* Inter-phase Flow Indicator (if not last phase) */}
            {phaseIdx < phases.length - 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-xs flex items-center justify-center text-slate-500">
                  <ArrowDown className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
