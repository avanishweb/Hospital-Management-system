import React from 'react';
import { Printer, Heart, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const InvoicePrintView = ({ invoice, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-xs text-slate-800">
      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print flex items-center justify-between pb-4 border-b border-slate-200">
        <span className="text-slate-500 font-medium">
          Official Medical Tax Invoice Preview
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition"
          >
            <Printer size={15} />
            <span>Print Invoice / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div id="printable-invoice" className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
        {/* Hospital Letterhead Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Heart className="h-6 w-6 fill-white/20" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                PulseCare Medical Center & Hospital
              </h2>
              <p className="text-[11px] text-slate-500">
                1000 Healthway Ave, Medical District, NY 10001 • Phone: +1 (800) 999-CARE
              </p>
              <p className="text-[10px] text-sky-700 font-bold">
                JCI & NABH Accredited Multi-Super Specialty Center
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              TAX INVOICE
            </span>
            <p className="text-lg font-mono font-extrabold text-slate-900 mt-0.5">
              {invoice.id}
            </p>
            <p className="text-[11px] text-slate-500">Date: {formatDate(invoice.date)}</p>
          </div>
        </div>

        {/* Patient & Billing Metadata */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Billed To (Patient Info)
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">{invoice.patientName}</h4>
            <p className="text-slate-600 font-mono mt-0.5">MRN: {invoice.patientId}</p>
            <p className="text-slate-600">Department: {invoice.department}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Payment Adjudication
            </span>
            <p className="font-semibold text-slate-900 mt-0.5">Status: <strong className="text-emerald-700">{invoice.status}</strong></p>
            <p className="text-slate-600">Channel: {invoice.paymentMethod}</p>
            <p className="text-slate-600">Due Date: {formatDate(invoice.dueDate)}</p>
          </div>
        </div>

        {/* Itemized Services Breakdown Table */}
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Service / Procedure / Item</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3 text-center">Qty</th>
              <th className="py-2 px-3 text-right">Unit Rate</th>
              <th className="py-2 px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-2.5 px-3 text-slate-400 font-mono">{idx + 1}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">{item.description}</td>
                <td className="py-2.5 px-3 text-slate-500">{item.category}</td>
                <td className="py-2.5 px-3 text-center font-bold">{item.quantity}</td>
                <td className="py-2.5 px-3 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculations / Summary */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Gross Total:</span>
              <span className="font-mono font-bold">{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Discount / Waiver:</span>
                <span className="font-mono text-rose-600">-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            {invoice.insuranceCovered > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Insurance TPA Covered:</span>
                <span className="font-mono font-bold">-{formatCurrency(invoice.insuranceCovered)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t-2 border-slate-900">
              <span>Net Payable Total:</span>
              <span className="font-mono text-sky-700">{formatCurrency(invoice.total)}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1">
              <span>Amount Settled:</span>
              <span className="font-mono font-bold text-emerald-700">{formatCurrency(invoice.paidAmount)}</span>
            </div>
            {invoice.balance > 0 && (
              <div className="flex justify-between text-rose-700 font-bold pt-1 border-t border-rose-200">
                <span>Balance Outstanding:</span>
                <span className="font-mono">{formatCurrency(invoice.balance)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification Footer & QR Mock */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="space-y-1 max-w-sm">
            <p className="font-bold text-slate-800">Verification & Authorized Signature</p>
            <p className="text-[10px]">
              This is a computer-generated medical bill verified by PulseCare Hospital Billing Authority.
            </p>
          </div>

          <div className="text-right">
            <div className="inline-block p-1.5 bg-slate-100 border border-slate-300 rounded-lg text-center">
              <span className="font-mono text-[9px] block text-slate-600">DIGITAL QR SEAL</span>
              <span className="font-mono text-[10px] font-extrabold text-slate-900">VERIFIED ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Close button (hidden on print) */}
      <div className="no-print flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 text-xs font-bold transition"
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};
