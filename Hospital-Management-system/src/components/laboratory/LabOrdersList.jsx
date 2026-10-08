import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  PlusCircle,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export const LabOrdersList = () => {
  const { labOrders, setActiveModal } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = labOrders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const processingCount = labOrders.filter((l) => l.status === 'Processing' || l.status === 'Ordered').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Laboratory & Diagnostic Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pathology tests, biochemistry panels, radiological scans (MRI/CT), and digital result verification.
          </p>
        </div>

        <button
          onClick={() => setActiveModal({ type: 'order_lab' })}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>New Lab Order</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search test name, patient, order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto overflow-x-auto">
          {['All', 'Ordered', 'Processing', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1 rounded-lg font-bold transition whitespace-nowrap ${
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

      {/* Lab Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID & Test Name</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Category & Sample</th>
                <th className="py-3.5 px-4">Ordering Doctor</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No matching diagnostic tests found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Order ID & Test */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-violet-50 text-violet-700 border border-violet-200 flex items-center justify-center font-bold text-xs shadow-2xs">
                          <FlaskConical size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{ord.testName}</p>
                          <p className="text-[10px] font-mono text-slate-400">{ord.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Patient */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{ord.patientName}</p>
                      <p className="text-[10px] font-mono text-slate-400">{ord.patientId}</p>
                    </td>

                    {/* Category & Sample */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{ord.category}</p>
                      <p className="text-[11px] text-slate-500">Sample: {ord.sampleType}</p>
                    </td>

                    {/* Doctor */}
                    <td className="py-3.5 px-4 text-slate-700">
                      {ord.doctorName}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {formatDate(ord.orderDate)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <Badge status={ord.status} size="sm" />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveModal({ type: 'view_lab_report', payload: ord })}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white font-bold text-xs transition"
                      >
                        <Eye size={13} />
                        <span>{ord.status === 'Completed' ? 'View Report' : 'Enter Results'}</span>
                      </button>
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
