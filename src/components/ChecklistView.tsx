import React, { useState } from 'react';
import { MilestoneItem, PhaseGroup } from '../types';
import { LOCATION_BADGE_MAP } from '../data/roadmapData';
import { 
  Check, 
  Search, 
  Filter, 
  Clock, 
  UserCheck, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ChecklistViewProps {
  milestones: MilestoneItem[];
  phases: PhaseGroup[];
  completedIds: number[];
  onToggleComplete: (id: number) => void;
  onSelectMilestone: (milestone: MilestoneItem) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  milestones,
  phases,
  completedIds,
  onToggleComplete,
  onSelectMilestone,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterPhase, setFilterPhase] = useState<number | 'all'>('all');

  const filtered = milestones.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pic.toLowerCase().includes(searchTerm.toLowerCase());

    const isDone = completedIds.includes(item.id);
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? isDone
        : !isDone;

    const matchesPhase = filterPhase === 'all' ? true : item.phaseId === filterPhase;

    return matchesSearch && matchesStatus && matchesPhase;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tahapan, dokumen, lokasi, atau PIC..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Phase Filter */}
          <select
            value={filterPhase}
            onChange={(e) => setFilterPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">Semua Fase (1-3)</option>
            <option value="1">Fase 1: Transaksi & Akta</option>
            <option value="2">Fase 2: Pertanahan & ATR/BPN</option>
            <option value="3">Fase 3: Legalitas & NIB</option>
          </select>

          {/* Status Filter */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({milestones.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'pending' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum ({milestones.length - completedIds.length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === 'completed' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Selesai ({completedIds.length})
            </button>
          </div>
        </div>

      </div>

      {/* Table List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
              <th className="pb-3 px-3 w-12 text-center">Status</th>
              <th className="pb-3 px-3 w-14 text-center">No</th>
              <th className="pb-3 px-4">Nama Tahapan & Deskripsi Singkat</th>
              <th className="pb-3 px-4">Lokasi Pengurusan</th>
              <th className="pb-3 px-4">Estimasi</th>
              <th className="pb-3 px-4">PIC</th>
              <th className="pb-3 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  Tidak ada tahapan yang sesuai dengan filter pencarian.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isDone = completedIds.includes(item.id);
                const badgeInfo = LOCATION_BADGE_MAP[item.locationCategory];

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 transition-colors group ${
                      isDone ? 'bg-emerald-50/15' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => onToggleComplete(item.id)}
                        className={`w-6 h-6 rounded-lg border inline-flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 text-transparent hover:border-slate-400 bg-white'
                        }`}
                        title={isDone ? 'Batal Selesai' : 'Tandai Selesai'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </td>

                    {/* Number */}
                    <td className="py-4 px-3 text-center font-bold text-slate-700">
                      #{item.stepNumber}
                    </td>

                    {/* Title & Desc */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="flex items-center gap-2">
                        <span
                          onClick={() => onSelectMilestone(item)}
                          className={`font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors ${
                            isDone ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.isCritical && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                            Krusial
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.shortDesc}</p>
                    </td>

                    {/* Location Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border ${badgeInfo.bg} ${badgeInfo.text} ${badgeInfo.border}`}
                      >
                        {item.location}
                      </span>
                    </td>

                    {/* Estimated Time */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                      {item.estimatedTime}
                    </td>

                    {/* PIC */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600">
                      {item.pic}
                    </td>

                    {/* Detail Button */}
                    <td className="py-4 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectMilestone(item)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <span>Detail</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
