import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useHospital();

  if (!toasts.length) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500 shrink-0" size={18} />;
      case 'error':
        return <AlertCircle className="text-rose-500 shrink-0" size={18} />;
      default:
        return <Info className="text-sky-500 shrink-0" size={18} />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 flex items-start justify-between gap-3 animate-fade-in backdrop-blur-md"
        >
          <div className="flex items-start gap-2.5">
            {getToastIcon(toast.type)}
            <p className="text-xs font-medium text-slate-100 leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition p-0.5 rounded"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
