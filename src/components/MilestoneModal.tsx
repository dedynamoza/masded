import React, { useState } from 'react';
import { MilestoneItem, PhaseGroup } from '../types';
import { LOCATION_BADGE_MAP } from '../data/roadmapData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Clock, 
  UserCheck, 
  FileCheck, 
  FileText, 
  Scale, 
  Lightbulb, 
  MapPin, 
  AlertTriangle,
  Building2,
  FileSignature,
  CircleDollarSign,
  Globe,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MilestoneModalProps {
  milestone: MilestoneItem | null;
  phase: PhaseGroup | undefined;
  isCompleted: boolean;
  totalMilestones: number;
  onClose: () => void;
  onToggleComplete: (id: number) => void;
  onNavigate: (stepNumber: number) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  milestone,
  phase,
  isCompleted,
  totalMilestones,
  onClose,
  onToggleComplete,
  onNavigate,
}) => {
  const [showLegal, setShowLegal] = useState(false);
  const [showTips, setShowTips] = useState(false);

  if (!milestone) return null;

  const badgeInfo = LOCATION_BADGE_MAP[milestone.locationCategory];

  const renderIcon = (cat: MilestoneItem['locationCategory']) => {
    switch (cat) {
      case 'notaris':
        return <FileSignature className="w-3.5 h-3.5" />;
      case 'finance':
        return <CircleDollarSign className="w-3.5 h-3.5" />;
      case 'bpn':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'field':
        return <MapPin className="w-3.5 h-3.5" />;
      case 'oss':
        return <Globe className="w-3.5 h-3.5" />;
      case 'internal':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      default:
        return <Building2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Spacious Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            
            {/* Badges & Meta */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                style={{ backgroundColor: milestone.nodeColorHex }}
                className="w-7 h-7 rounded-xl text-white text-xs font-black flex items-center justify-center shadow-xs"
              >
                #{milestone.stepNumber}
              </span>

              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${phase?.color.badgeBg || 'bg-slate-100 text-slate-700'}`}>
                {phase?.badge}
              </span>

              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${badgeInfo.bg} ${badgeInfo.text} ${badgeInfo.border}`}>
                {renderIcon(milestone.locationCategory)}
                <span>{milestone.location}</span>
              </span>

              {milestone.isCritical && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Syarat Mutlak KBLI 61104
                </span>
              )}
            </div>
            
            {/* Title & Short Summary */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {milestone.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {milestone.shortDesc}
              </p>
            </div>

            {/* Compact Time & PIC Container (Smaller font & subtle container) */}
            <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 py-1.5 px-3 bg-white border border-slate-200/90 rounded-lg text-xs shadow-2xs mt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="text-slate-500 text-[11px]">Waktu:</span>
                <span className="font-bold text-slate-800 text-[11px]">{milestone.estimatedTime}</span>
              </div>

              <div className="w-px h-3 bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="text-slate-500 text-[11px]">PIC:</span>
                <span className="font-bold text-slate-800 text-[11px]">{milestone.pic}</span>
              </div>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
          
          {/* Simple Explanation */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Penjelasan Ringkas
            </h4>
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 text-slate-700 leading-relaxed text-sm">
              {milestone.detailedExplanation}
            </div>
          </div>

          {/* Inputs & Outputs Grid (Clean 2-Column Spacious Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Prerequisite / Input Documents */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Dokumen Persyaratan (Input)</span>
              </h4>
              <ul className="space-y-2">
                {milestone.inputs.map((inp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Legal Products */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Hasil / Dokumen Terbit (Output)</span>
              </h4>
              <ul className="space-y-2">
                {milestone.outputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Collapsible Accordion: Dasar Hukum & Tips Lapangan */}
          <div className="space-y-3 pt-2">
            
            {/* Dasar Hukum (Collapsible / Hide & Unhide) */}
            {milestone.regulatoryNotes && (
              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setShowLegal((prev) => !prev)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-blue-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-4 h-4 text-blue-700 shrink-0" />
                    <span className="text-xs font-bold text-blue-950">
                      Dasar Hukum & Regulasi
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold">
                    <span>{showLegal ? 'Sembunyikan' : 'Lihat Dasar Hukum'}</span>
                    {showLegal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {showLegal && (
                  <div className="px-4 pb-3.5 pt-1 text-xs text-blue-900 border-t border-blue-200/60 leading-relaxed font-medium bg-blue-50/30">
                    {milestone.regulatoryNotes}
                  </div>
                )}
              </div>
            )}

            {/* Tips Lapangan (Collapsible / Hide & Unhide) */}
            {milestone.tips && (
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setShowTips((prev) => !prev)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-amber-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-amber-950">
                      Tips Lapangan & Catatan Teknis
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                    <span>{showTips ? 'Sembunyikan' : 'Lihat Tips'}</span>
                    {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {showTips && (
                  <div className="px-4 pb-3.5 pt-1 text-xs text-amber-900 border-t border-amber-200/60 leading-relaxed font-medium bg-amber-50/30">
                    {milestone.tips}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer: Navigation & Completion Toggle */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-200/80 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3">
          
          {/* Navigation Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowLegal(false);
                setShowTips(false);
                onNavigate(milestone.stepNumber - 1);
              }}
              disabled={milestone.stepNumber <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs font-bold text-slate-600 px-1.5">
              {milestone.stepNumber} / {totalMilestones}
            </span>

            <button
              onClick={() => {
                setShowLegal(false);
                setShowTips(false);
                onNavigate(milestone.stepNumber + 1);
              }}
              disabled={milestone.stepNumber >= totalMilestones}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mark Complete Button */}
          <button
            onClick={() => onToggleComplete(milestone.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isCompleted ? 'Tahap Selesai (Klik Batal)' : 'Tandai Selesai'}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
