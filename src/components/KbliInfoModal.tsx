import React from 'react';
import { 
  X, 
  BookOpen, 
  ShieldCheck, 
  Server, 
  Scale, 
  Building2, 
  Radio, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface KbliInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KbliInfoModal: React.FC<KbliInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Panduan Regulasi KBLI 61104
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  ISP / Jasa Akses Internet
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Aktivitas Telekomunikasi dengan Kabel — Penyelenggaraan Jasa Akses Internet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Executive Summary */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-blue-950 space-y-2">
            <h3 className="text-sm font-bold flex items-center gap-2 text-blue-900">
              <Scale className="w-4 h-4 text-blue-600" />
              Tingkat Risiko & Karakteristik Perizinan Berusaha
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-blue-900">
              Berdasarkan <strong>PP No. 5 Tahun 2021</strong>, KBLI 61104 dikategorikan memiliki tingkat risiko <strong>Menengah Tinggi / Tinggi</strong>. Dokumen legalitas utama yang diterbitkan oleh OSS mencakup <strong>NIB (Nomor Induk Berusaha)</strong> dan <strong>Sertifikat Standar / Izin Operasional Penyelenggaraan Telekomunikasi</strong> yang diverifikasi langsung oleh Kementerian Kominfo.
            </p>
          </div>

          {/* 3 Pilar Utama Legalitas */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3 Persyaratan Dasar Wajib OSS-RBA
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 font-bold text-xs">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">KKPR / PKKPR (Tahap 8)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kesesuaian Tata Ruang dari ATR/BPN. <strong>Syarat mutlak</strong> sebelum NIB KBLI 61104 dapat terbit.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 font-bold text-xs">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Persetujuan Lingkungan</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Surat Pernyataan Kesanggupan Pengelolaan dan Pemantauan Lingkungan Hidup (SPPL) secara otomatis di OSS.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5 font-bold text-xs">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Persetujuan Bangunan (PBG)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PBG & Sertifikat Laik Fungsi (SLF) untuk bangunan fisik NOC, POP, atau Tower BTS telekomunikasi.
                </p>
              </div>
            </div>
          </div>

          {/* Persyaratan Teknis Telekomunikasi (Kominfo) */}
          <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 bg-white">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              Persyaratan Khusus Sektor Telekomunikasi (Ditjen PPI Kominfo)
            </h3>
            
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Modal Disetor & Badan Usaha PT:</strong> Wajib berbentuk Badan Hukum Perseroan Terbatas (PT) dengan modal disetor sesuai klasifikasi skala usaha di OSS.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Rencana Usaha 5 Tahun (Rollout Plan):</strong> Dokumen komitmen pembangunan jaringan, kapasitas bandwidth, estimasi pelanggan, dan alokasi investasi CAPEX/OPEX.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Konfigurasi Teknis Jaringan (Network Topology):</strong> Diagram topologi jaringan, spesifikasi perangkat router/switch ber-Sertifikat SDPPI, dan NOC.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Uji Laik Operasi (ULO):</strong> Verifikasi fisik dan uji fungsi teknis oleh Direktorat Telekomunikasi Ditjen PPI Kementerian Kominfo sebelum komersialisasi.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Kewajiban Pasca-Terbit:</strong> Pembayaran BHP Telekomunikasi (0,5% dari Pendapatan Kotor) dan Kontribusi USO (Universal Service Obligation 1,25%).
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
          >
            Tutup Informasi
          </button>
        </div>

      </div>

    </div>
  );
};
