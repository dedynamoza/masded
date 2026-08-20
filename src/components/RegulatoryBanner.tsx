import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface RegulatoryBannerProps {
  onHighlightPkkpr: () => void;
}

export const RegulatoryBanner: React.FC<RegulatoryBannerProps> = ({ onHighlightPkkpr }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-slate-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                Regulasi KBLI 61104
              </span>
              <span className="text-xs font-semibold text-slate-500">
                PP No. 5/2021 & Permen ATR/BPN No. 13/2021
              </span>
            </div>
            <p className="text-sm text-slate-800 mt-1 font-medium leading-relaxed">
              Penerbitan <span className="font-bold text-slate-950">NIB KBLI 61104 (Jasa Akses Internet)</span> secara sistematis di OSS-RBA <span className="underline decoration-blue-500 font-bold">hanya dapat terbit</span> setelah dokumen <span className="font-bold text-blue-700">KKPR / PKKPR (Tahap 8)</span> telah terverifikasi dan disetujui secara spasial oleh ATR/BPN & Tata Ruang.
            </p>
          </div>
        </div>

        <button
          onClick={onHighlightPkkpr}
          className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer group"
        >
          <span>Lihat Syarat PKKPR (Tahap 8)</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>
    </div>
  );
};
