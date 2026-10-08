import React, { useState } from 'react';
import {
  Receipt,
  Search,
  PlusCircle,
  DollarSign,
  Printer,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const BillingList = () => {
  const { invoices, payInvoice, setActiveModal } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.department && inv.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalBilled = invoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
  const totalCollected = invoices.reduce((sum, inv) => sum + (Number(inv.paidAmount) || 0), 0);
  const totalPending = invoices.reduce((sum, inv) => sum + (Number(inv.balance) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Billing, Invoicing & Insurance Claims
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Itemized hospital bills, pharmacy & lab charges, insurance TPA adjudication, and print receipts.
          </p>
        </div>

        <button
          onClick={() => setActiveModal({ type: 'create_invoice' })}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Patient Invoiced
          </span>
          <span className="text-2xl font-extrabold text-slate-900 mt-0.5 block">
            {formatCurrency(totalBilled)}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">{invoices.length} Total Invoices Generated</p>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
            Collected / Settled Revenue
          </span>
          <span className="text-2xl font-extrabold text-emerald-900 mt-0.5 block">
            {formatCurrency(totalCollected)}
          </span>
          <p className="text-[11px] text-emerald-600 mt-1">Paid via Card, Cash & Insurance</p>
        </div>

        <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 shadow-sm">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
            Outstanding / Pending Balance
          </span>
          <span className="text-2xl font-extrabold text-rose-900 mt-0.5 block">
            {formatCurrency(totalPending)}
          </span>
          <p className="text-[11px] text-rose-600 mt-1">Pending claims or patient dues</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoice #, patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto overflow-x-auto">
          {['All', 'Paid', 'Pending', 'Partial'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1 rounded-lg font-bold transition ${
                statusFilter === st
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Invoice ID & Date</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Department & Method</th>
                <th className="py-3.5 px-4">Subtotal / Insurance</th>
                <th className="py-3.5 px-4">Net Total / Due</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No matching invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Invoice ID & Date */}
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-bold text-slate-900">{inv.id}</p>
                      <p className="text-[11px] text-slate-400">{formatDate(inv.date)}</p>
                    </td>

                    {/* Patient Name */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{inv.patientName}</p>
                      <p className="text-[10px] font-mono text-slate-400">{inv.patientId}</p>
                    </td>

                    {/* Department & Method */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{inv.department}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[150px]">{inv.paymentMethod}</p>
                    </td>

                    {/* Subtotal & Insurance */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-700">{formatCurrency(inv.subtotal)}</p>
                      {inv.insuranceCovered > 0 && (
                        <p className="text-[11px] text-emerald-600 font-medium">
                          Ins: -{formatCurrency(inv.insuranceCovered)}
                        </p>
                      )}
                    </td>

                    {/* Net Total & Balance */}
                    <td className="py-3.5 px-4">
                      <p className="font-black text-slate-900">{formatCurrency(inv.total)}</p>
                      {inv.balance > 0 ? (
                        <p className="text-[11px] text-rose-600 font-bold">
                          Due: {formatCurrency(inv.balance)}
                        </p>
                      ) : (
                        <p className="text-[10px] text-emerald-600 font-bold">✓ Settled</p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <Badge status={inv.status} size="sm" />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.status !== 'Paid' && (
                          <button
                            title="Mark as Paid"
                            onClick={() => payInvoice(inv.id, 'Credit Card')}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-2xs transition"
                          >
                            <CheckCircle size={13} />
                            <span>Pay</span>
                          </button>
                        )}

                        <button
                          title="View & Print Official Medical Bill"
                          onClick={() => setActiveModal({ type: 'print_invoice', payload: inv })}
                          className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white transition"
                        >
                          <Printer size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
