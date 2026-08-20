import React from 'react';
import { MilestoneItem, PhaseGroup } from '../types';
import { LOCATION_BADGE_MAP } from '../data/roadmapData';
import { MilestoneCard } from './MilestoneCard';
import { 
  FileSignature, 
  CircleDollarSign, 
  Building2, 
  MapPin, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

interface SwimlaneViewProps {
  milestones: MilestoneItem[];
  phases: PhaseGroup[];
  completedIds: number[];
  onToggleComplete: (id: number, e: React.MouseEvent) => void;
  onSelectMilestone: (milestone: MilestoneItem) => void;
}

interface SwimlaneLane {
  id: string;
  name: string;
  category: MilestoneItem['locationCategory'];
  desc: string;
  icon: React.ReactNode;
  milestoneIds: number[];
}

export const SwimlaneView: React.FC<SwimlaneViewProps> = ({
  milestones,
  phases,
  completedIds,
  onToggleComplete,
  onSelectMilestone,
}) => {
  const lanes: SwimlaneLane[] = [
    {
      id: 'notaris',
      name: 'Kantor Notaris & PPAT',
      category: 'notaris',
      desc: 'Pembuatan Akta PPJB, Validasi Pajak Lahan & Administrasi Hukum',
      icon: <FileSignature className="w-5 h-5 text-amber-600" />,
      milestoneIds: [1, 2],
    },
    {
      id: 'internal',
      name: 'Internal PT ISP (Finance & Legal)',
      category: 'internal',
      desc: 'Pembayaran Capex, Rekap Dokumen Perusahaan & Koordinasi Legal',
      icon: <ShieldCheck className="w-5 h-5 text-slate-700" />,
      milestoneIds: [3, 9],
    },
    {
      id: 'bpn',
      name: 'Kantor Pertanahan ATR/BPN & Lapangan',
      category: 'bpn',
      desc: 'Pertimbangan Teknis (Pertek), Peta Poligon, SPS Billing, & Pengukuran Kadastral',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      milestoneIds: [4, 5, 6, 7],
    },
    {
      id: 'oss',
      name: 'Sistem OSS-RBA, PTSP & Kominfo',
      category: 'oss',
      desc: 'Persetujuan PKKPR, Verifikasi Sektor Telekomunikasi, & Terbit NIB KBLI 61104',
      icon: <Globe className="w-5 h-5 text-purple-600" />,
      milestoneIds: [8, 10, 11],
    },
  ];

  return (
    <div className="space-y-6">
      {lanes.map((lane) => {
        const laneMilestones = milestones.filter((m) => lane.milestoneIds.includes(m.id));

        return (
          <div
            key={lane.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs"
          >
            {/* Lane Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                {lane.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {lane.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lane.desc}
                </p>
              </div>
            </div>

            {/* Lane Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {laneMilestones.map((m) => {
                const phase = phases.find((p) => p.id === m.phaseId)!;
                const isCompleted = completedIds.includes(m.id);
                return (
                  <MilestoneCard
                    key={m.id}
                    milestone={m}
                    phase={phase}
                    isCompleted={isCompleted}
                    onToggleComplete={onToggleComplete}
                    onSelect={onSelectMilestone}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
