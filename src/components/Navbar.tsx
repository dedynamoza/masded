import React from 'react';
import { 
  RotateCcw, 
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  onReset: () => void;
  onOpenKbliInfo: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalCount,
  onReset,
  onOpenKbliInfo,
}) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="w-full max-w-[98%] 2xl:max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
              Flow Urus NIB
            </h1>
          </div>

          {/* Right Action: Progress & Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Progress Pill */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Progress Legalitas</div>
                <div className="text-xs font-bold text-slate-800">
                  {completedCount} / {totalCount} Tahap Selesai
                </div>
              </div>
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-9 h-9 transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    className="stroke-slate-200"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    className="stroke-blue-600 transition-all duration-500"
                    strokeWidth="3"
                    strokeDasharray={88}
                    strokeDashoffset={88 - (88 * percentage) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-slate-700">{percentage}%</span>
              </div>
            </div>

            {/* KBLI Info Guide Button */}
            <button
              onClick={onOpenKbliInfo}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              title="Informasi Regulasi KBLI 61104"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Info KBLI 61104</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              disabled={completedCount === 0}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors border shadow-2xs ${
                completedCount > 0
                  ? 'text-rose-600 bg-rose-50/70 hover:bg-rose-100/80 border-rose-200 cursor-pointer'
                  : 'text-slate-400 bg-slate-100/60 border-slate-200 cursor-not-allowed opacity-60'
              }`}
              title={completedCount > 0 ? `Reset ${completedCount} progres tahapan checklist` : 'Belum ada tahapan yang selesai'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
