import React, { useState, useRef } from 'react';
import { MilestoneItem, PhaseGroup } from '../types';
import { 
  Check, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';

interface SerpentineGraphViewProps {
  milestones: MilestoneItem[];
  phases: PhaseGroup[];
  completedIds: number[];
  onToggleComplete: (id: number, e: React.MouseEvent) => void;
  onSelectMilestone: (milestone: MilestoneItem) => void;
}

export const SerpentineGraphView: React.FC<SerpentineGraphViewProps> = ({
  milestones,
  phases,
  completedIds,
  onToggleComplete,
  onSelectMilestone,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group milestones by serpentine rows:
  // Row 1 (Left -> Right): Nodes 1, 2, 3, 4
  // Row 2 (Right -> Left): Nodes 5, 6, 7, 8
  // Row 3 (Left -> Right): Nodes 9, 10, 11
  const row1 = milestones.slice(0, 4); // 1, 2, 3, 4
  const row2 = milestones.slice(4, 8); // 5, 6, 7, 8
  const row3 = milestones.slice(8, 11); // 9, 10, 11

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.4, Math.max(0.75, Number((prev + delta).toFixed(2)))));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      
      {/* Top Toolbar: View Controls, Legend & Zoom */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
        
        {/* Helper text */}
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Klik salah satu <strong>Node / Kartu Proses</strong> untuk melihat dokumen persyaratan & regulasi detail.</span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => handleZoom(-0.1)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Perkecil (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 px-2 min-w-[3.5rem] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.1)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Perbesar (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors ml-1 border-l border-slate-200 pl-1.5"
              title="Reset Tampilan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Spacious Interactive Canvas Container */}
      <div
        ref={scrollContainerRef}
        className="relative overflow-x-auto overflow-y-auto p-6 sm:p-10 min-h-[660px] flex items-center justify-center bg-white transition-all select-none"
      >
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
            minWidth: '1240px',
            width: '1240px',
          }}
          className="relative pt-10 pb-12 px-6"
        >

          {/* SVG Connecting Tracks Layer (The winding Serpentine / S-Curve lines) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Defs for gradients & filters */}
            <defs>
              <filter id="shadow-track" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#94a3b8" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Row 1 Track: Start Pill (x: 230) -> Node 1 (370) -> Node 2 (610) -> Node 3 (850) -> Node 4 (1090) */}
            <path
              d="M 230 80 L 1090 80"
              fill="none"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Right U-Turn Curve (Top Curve): Connects Row 1 (at x: 1090, y: 80) down to Row 2 (at x: 1090, y: 310) - widened to the right */}
            <path
              d="M 1090 80 C 1260 80, 1260 310, 1090 310"
              fill="none"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Row 2 Track: Node 5 (1090) -> Node 6 (850) -> Node 7 (610) -> Node 8 (370) */}
            <path
              d="M 1090 310 L 370 310"
              fill="none"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Left U-Turn Curve (Bottom Curve): Connects Row 2 (at x: 370, y: 310) down to Row 3 (at x: 370, y: 540) - widened to the left */}
            <path
              d="M 370 310 C 200 310, 200 540, 370 540"
              fill="none"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Row 3 Track: Node 9 (370) -> Node 10 (610) -> Node 11 (850) -> Finish Pill (980) */}
            <path
              d="M 370 540 L 980 540"
              fill="none"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* ============================================================ */}
          {/* ROW 1: Nodes 1, 2, 3, 4 (Left to Right)                       */}
          {/* ============================================================ */}
          <div className="relative h-[230px]">
            
            {/* Start Pill Badge (Left Header) */}
            <div className="absolute left-[10px] top-[46px] z-10">
              <div className="h-[68px] px-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25 border-2 border-white">
                <Sparkles className="w-5 h-5 text-blue-200 animate-spin-slow" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Start Process</div>
                  <div className="text-sm font-extrabold tracking-tight whitespace-nowrap">Pengurusan Lahan & NIB</div>
                </div>
              </div>
            </div>

            {/* Node 1: TTD LOI dan PPJB */}
            <RoadmapNode
              item={milestones[0]}
              xPos={370}
              yPos={80}
              isCompleted={completedIds.includes(milestones[0].id)}
              isActive={activeHoverId === milestones[0].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 2: Invoice Notaris & Penjual */}
            <RoadmapNode
              item={milestones[1]}
              xPos={610}
              yPos={80}
              isCompleted={completedIds.includes(milestones[1].id)}
              isActive={activeHoverId === milestones[1].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 3: Pembayaran Finance */}
            <RoadmapNode
              item={milestones[2]}
              xPos={850}
              yPos={80}
              isCompleted={completedIds.includes(milestones[2].id)}
              isActive={activeHoverId === milestones[2].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 4: Pengurusan Pertek & Peta Polygon */}
            <RoadmapNode
              item={milestones[3]}
              xPos={1090}
              yPos={80}
              isCompleted={completedIds.includes(milestones[3].id)}
              isActive={activeHoverId === milestones[3].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />
          </div>

          {/* ============================================================ */}
          {/* ROW 2: Nodes 5, 6, 7, 8 (Right to Left flow)                 */}
          {/* ============================================================ */}
          <div className="relative h-[230px]">
            
            {/* Node 5: Surat Perintah Setor (SPS) (x: 1090) */}
            <RoadmapNode
              item={milestones[4]}
              xPos={1090}
              yPos={80}
              isCompleted={completedIds.includes(milestones[4].id)}
              isActive={activeHoverId === milestones[4].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 6: Permohonan Hak Baru / Pengalihan Hak (x: 850) */}
            <RoadmapNode
              item={milestones[5]}
              xPos={850}
              yPos={80}
              isCompleted={completedIds.includes(milestones[5].id)}
              isActive={activeHoverId === milestones[5].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 7: Pernyataan Fisik & Pengukuran Bidang Tanah (x: 610) */}
            <RoadmapNode
              item={milestones[6]}
              xPos={610}
              yPos={80}
              isCompleted={completedIds.includes(milestones[6].id)}
              isActive={activeHoverId === milestones[6].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 8: Pengurusan PKKPR (Izin Lokasi) [Krusial] (x: 370) */}
            <RoadmapNode
              item={milestones[7]}
              xPos={370}
              yPos={80}
              isCompleted={completedIds.includes(milestones[7].id)}
              isActive={activeHoverId === milestones[7].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />
          </div>

          {/* ============================================================ */}
          {/* ROW 3: Nodes 9, 10, 11 + Finish Goal Pill                     */}
          {/* ============================================================ */}
          <div className="relative h-[230px]">
            
            {/* Node 9: Preparasi Dokumen Legalitas PT (x: 370) */}
            <RoadmapNode
              item={milestones[8]}
              xPos={370}
              yPos={80}
              isCompleted={completedIds.includes(milestones[8].id)}
              isActive={activeHoverId === milestones[8].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 10: Input OSS & Verifikasi Sistem (x: 610) */}
            <RoadmapNode
              item={milestones[9]}
              xPos={610}
              yPos={80}
              isCompleted={completedIds.includes(milestones[9].id)}
              isActive={activeHoverId === milestones[9].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Node 11: Penerbitan Surat NIB & Izin Usaha (x: 850) */}
            <RoadmapNode
              item={milestones[10]}
              xPos={850}
              yPos={80}
              isCompleted={completedIds.includes(milestones[10].id)}
              isActive={activeHoverId === milestones[10].id}
              onHover={setActiveHoverId}
              onToggleComplete={onToggleComplete}
              onSelect={onSelectMilestone}
            />

            {/* Finish Success Trophy Goal Pill (x: 1060) */}
            <div className="absolute left-[980px] top-[46px] z-10">
              <div className="h-[68px] px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 border-2 border-white">
                <Award className="w-6 h-6 text-emerald-100" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">Hasil Akhir</div>
                  <div className="text-sm font-extrabold tracking-tight whitespace-nowrap">NIB KBLI 61104 Terbit!</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Quick Legend */}
      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold text-slate-700">Keterangan Alur:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#98d833]" />
            Fase 1: Transaksi & Akta (#1 - #3)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#56a1ff]" />
            Fase 2: Pertanahan & ATR/BPN (#4 - #8)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#10b981]" />
            Fase 3: Legalitas & NIB Kominfo (#9 - #11)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Node 8 (PKKPR): Syarat Mutlak Sistemik
          </span>
        </div>
      </div>

    </div>
  );
};

interface RoadmapNodeProps {
  item: MilestoneItem;
  xPos: number;
  yPos: number;
  isCompleted: boolean;
  isActive: boolean;
  onHover: (id: number | null) => void;
  onToggleComplete: (id: number, e: React.MouseEvent) => void;
  onSelect: (item: MilestoneItem) => void;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  item,
  xPos,
  yPos,
  isCompleted,
  isActive,
  onHover,
  onToggleComplete,
  onSelect,
}) => {
  return (
    <div
      style={{
        left: `${xPos}px`,
        top: `${yPos}px`,
        transform: 'translate(-50%, -28px)',
      }}
      className="absolute z-20"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 1. Main Circular Numbered Node */}
      <div className="relative flex flex-col items-center">
        
        <button
          onClick={() => onSelect(item)}
          style={{ backgroundColor: item.nodeColorHex }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-md border-4 border-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
            isActive ? 'scale-110 ring-4 ring-blue-400/50 shadow-xl' : ''
          }`}
          title={`${item.title} - Klik untuk melihat detail`}
        >
          {isCompleted ? (
            <Check className="w-7 h-7 stroke-[3.5]" />
          ) : (
            item.stepNumber
          )}
        </button>

        {/* Small Completed Tag on Top */}
        {isCompleted && (
          <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full p-1 border-2 border-white shadow-xs">
            <Check className="w-3 h-3 stroke-[3]" />
          </span>
        )}

        {/* 2. Drop-down Stem / Connector Line to the Label Box */}
        <div className="w-[3px] h-6 bg-slate-400 mt-1" />

        {/* 3. Minimalist Process Label Box */}
        <div
          onClick={() => onSelect(item)}
          className={`w-52 ${item.cardBg} border ${item.cardBorder} rounded-xl p-3 shadow-xs cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${
            isActive ? 'ring-2 ring-blue-500/40 shadow-md -translate-y-1' : ''
          } ${isCompleted ? 'opacity-90' : ''}`}
        >
          {/* Process Title (Clean & concise) */}
          <div className="flex items-start justify-between gap-1 mb-1.5">
            <h4
              className={`text-xs font-bold text-slate-800 leading-snug line-clamp-2 ${
                isCompleted ? 'line-through text-slate-500' : ''
              }`}
            >
              {item.title}
            </h4>

            {/* Tiny Toggle Button */}
            <button
              onClick={(e) => onToggleComplete(item.id, e)}
              className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-300 bg-white text-transparent hover:border-slate-400'
              }`}
              title={isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Pill Date & Location Info (Matching the calendar badge in reference) */}
          <div
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${item.tagBg} ${item.tagText} border-black/5 truncate max-w-full`}
          >
            <Calendar className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.estimatedTime}</span>
            <span className="text-black/30">•</span>
            <span className="truncate">{item.location}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
