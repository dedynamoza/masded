import React, { useState, useEffect } from 'react';
import { PHASES, MILESTONES } from './data/roadmapData';
import { MilestoneItem, ViewMode, PhaseId } from './types';
import { Navbar } from './components/Navbar';
import { RegulatoryBanner } from './components/RegulatoryBanner';
import { SerpentineGraphView } from './components/SerpentineGraphView';
import { TimelineView } from './components/TimelineView';
import { SwimlaneView } from './components/SwimlaneView';
import { ChecklistView } from './components/ChecklistView';
import { MilestoneModal } from './components/MilestoneModal';
import { KbliInfoModal } from './components/KbliInfoModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { 
  Route,
  GitCommit, 
  Layers, 
  ListTodo, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Printer,
  Info,
  Building2,
  ShieldCheck,
  Globe,
  Radio
} from 'lucide-react';

const STORAGE_KEY = 'kbli61104_completed_milestones';

export default function App() {
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Default to the 'graph' (Serpentine S-Curve visual matching the user's reference image)
  const [activeView, setActiveView] = useState<ViewMode>('graph');
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);
  const [isKbliInfoOpen, setIsKbliInfoOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [phaseFilter, setPhaseFilter] = useState<PhaseId | 'all'>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [completedIds]);

  const handleToggleComplete = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenReset = () => {
    setIsResetModalOpen(true);
  };

  const handleExecuteReset = () => {
    setCompletedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const handleHighlightPkkpr = () => {
    const pkkprMilestone = MILESTONES.find((m) => m.id === 8);
    if (pkkprMilestone) {
      setSelectedMilestone(pkkprMilestone);
    }
  };

  const handleNavigateModal = (stepNumber: number) => {
    const target = MILESTONES.find((m) => m.stepNumber === stepNumber);
    if (target) {
      setSelectedMilestone(target);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered milestones based on phase selection
  const filteredMilestones = phaseFilter === 'all' 
    ? MILESTONES 
    : MILESTONES.filter((m) => m.phaseId === phaseFilter);

  const filteredPhases = phaseFilter === 'all'
    ? PHASES
    : PHASES.filter((p) => p.id === phaseFilter);

  const selectedPhase = selectedMilestone 
    ? PHASES.find((p) => p.id === selectedMilestone.phaseId) 
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navigation */}
      <Navbar
        completedCount={completedIds.length}
        totalCount={MILESTONES.length}
        onReset={handleOpenReset}
        onOpenKbliInfo={() => setIsKbliInfoOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[98%] 2xl:max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-6">
        
        {/* Regulatory Alert Banner */}
        <RegulatoryBanner onHighlightPkkpr={handleHighlightPkkpr} />

        {/* View Switcher Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs">
          
          {/* View Modes Tabs */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start sm:self-auto w-full sm:w-auto flex-wrap">
            <button
              onClick={() => setActiveView('graph')}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === 'graph'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Route className="w-4 h-4" />
              <span>Visual Flow Path (S-Curve)</span>
            </button>

            <button
              onClick={() => setActiveView('stepper')}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === 'stepper'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitCommit className="w-4 h-4" />
              <span>Timeline Kartu</span>
            </button>

            <button
              onClick={() => setActiveView('swimlane')}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === 'swimlane'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Matriks Stakeholder</span>
            </button>

            <button
              onClick={() => setActiveView('checklist')}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === 'checklist'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListTodo className="w-4 h-4" />
              <span>Tabel Checklist</span>
            </button>
          </div>

          {/* Stepper Phase Filter */}
          {activeView === 'stepper' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setPhaseFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  phaseFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Semua Fase
              </button>
              <button
                onClick={() => setPhaseFilter(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  phaseFilter === 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                Fase 1: Transaksi
              </button>
              <button
                onClick={() => setPhaseFilter(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  phaseFilter === 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                Fase 2: ATR/BPN & PKKPR
              </button>
              <button
                onClick={() => setPhaseFilter(3)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  phaseFilter === 3
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                Fase 3: Legalitas & NIB
              </button>
            </div>
          )}

        </div>

        {/* Dynamic View Rendering */}
        {activeView === 'graph' && (
          <SerpentineGraphView
            milestones={MILESTONES}
            phases={PHASES}
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
            onSelectMilestone={(m) => setSelectedMilestone(m)}
          />
        )}

        {activeView === 'stepper' && (
          <TimelineView
            phases={filteredPhases}
            milestones={filteredMilestones}
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
            onSelectMilestone={(m) => setSelectedMilestone(m)}
          />
        )}

        {activeView === 'swimlane' && (
          <SwimlaneView
            milestones={MILESTONES}
            phases={PHASES}
            completedIds={completedIds}
            onToggleComplete={handleToggleComplete}
            onSelectMilestone={(m) => setSelectedMilestone(m)}
          />
        )}

        {activeView === 'checklist' && (
          <ChecklistView
            milestones={MILESTONES}
            phases={PHASES}
            completedIds={completedIds}
            onToggleComplete={(id) => handleToggleComplete(id)}
            onSelectMilestone={(m) => setSelectedMilestone(m)}
          />
        )}

        {/* Regulatory Legend & Notes Footer removed */}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Panduan Standar Legalitas Telekomunikasi KBLI 61104. Sesuai PP No. 5/2021 & Permen ATR/BPN.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsKbliInfoOpen(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Info Regulasi KBLI 61104
            </button>
            <span>•</span>
            <button
              onClick={handlePrint}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Cetak Dokumen SOP
            </button>
          </div>
        </div>
      </footer>

      {/* Detailed Milestone Modal (Click-to-Expand) */}
      <MilestoneModal
        milestone={selectedMilestone}
        phase={selectedPhase}
        isCompleted={selectedMilestone ? completedIds.includes(selectedMilestone.id) : false}
        totalMilestones={MILESTONES.length}
        onClose={() => setSelectedMilestone(null)}
        onToggleComplete={(id) => handleToggleComplete(id)}
        onNavigate={handleNavigateModal}
      />

      {/* KBLI 61104 Information Guide Modal */}
      <KbliInfoModal
        isOpen={isKbliInfoOpen}
        onClose={() => setIsKbliInfoOpen(false)}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        completedCount={completedIds.length}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleExecuteReset}
      />

    </div>
  );
}
