import React from 'react';
import { MilestoneItem, PhaseGroup } from '../types';
import { LOCATION_BADGE_MAP } from '../data/roadmapData';
import { 
  FileSignature, 
  CircleDollarSign, 
  Building2, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Check, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface MilestoneCardProps {
  milestone: MilestoneItem;
  phase: PhaseGroup;
  isCompleted: boolean;
  onToggleComplete: (id: number, e: React.MouseEvent) => void;
  onSelect: (milestone: MilestoneItem) => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  phase,
  isCompleted,
  onToggleComplete,
  onSelect,
}) => {
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
    <div
      onClick={() => onSelect(milestone)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-4 sm:p-5 flex flex-col justify-between ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/20 shadow-2xs hover:border-emerald-300'
          : milestone.isCritical
          ? 'border-blue-300 shadow-xs hover:shadow-md hover:border-blue-500 ring-1 ring-blue-400/30'
          : 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300'
      }`}
    >
      {/* Top Bar: Step Number, Location Badge, & Checkbox */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Step Number Badge */}
            <span
              className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : milestone.isCritical
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
              }`}
            >
              {milestone.stepNumber}
            </span>

            {/* Location Tag */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg border ${badgeInfo.bg} ${badgeInfo.text} ${badgeInfo.border}`}
            >
              {renderIcon(milestone.locationCategory)}
              <span className="truncate max-w-[130px] sm:max-w-none">{milestone.location}</span>
            </span>

            {/* Critical Indicator for PKKPR / OSS */}
            {milestone.isCritical && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                Krusial
              </span>
            )}
          </div>

          {/* Complete Checklist Toggle */}
          <button
            onClick={(e) => onToggleComplete(milestone.id, e)}
            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                : 'border-slate-300 text-transparent hover:border-slate-400 bg-slate-50'
            }`}
            title={isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
          >
            <Check className={`w-3.5 h-3.5 ${isCompleted ? 'stroke-[3]' : ''}`} />
          </button>

        </div>

        {/* Title */}
        <h3
          className={`text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug ${
            isCompleted ? 'line-through text-slate-500' : ''
          }`}
        >
          {milestone.title}
        </h3>

        {/* 1-Sentence Sub-description (Default View) */}
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
          {milestone.shortDesc}
        </p>
      </div>

      {/* Footer Info: Estimated Time & Click Indicator */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{milestone.estimatedTime}</span>
        </div>

        <div className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
          <span>Detail</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

    </div>
  );
};
