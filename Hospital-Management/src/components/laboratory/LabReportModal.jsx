import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, Printer, FileText, Plus, Trash2 } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export const LabReportModal = ({ labOrder, onClose }) => {
  const { updateLabResults } = useHospital();

  const [results, setResults] = useState(labOrder.results || [
    { parameter: 'Test Result 1', value: '120', unit: 'mg/dL', refRange: '70 - 140', status: 'Normal' }
  ]);
  const [notes, setNotes] = useState(labOrder.notes || '');

  const handleAddParam = () => {
    setResults((prev) => [
      ...prev,
      { parameter: 'New Parameter', value: '', unit: '', refRange: '', status: 'Normal' }
    ]);
  };

  const handleParamChange = (index, field, value) => {
    setResults((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const handleRemoveParam = (index) => {
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateLabResults(labOrder.id, results, notes);
    onClose();
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-violet-900 to-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">
            Diagnostic Test Report
          </span>
          <h3 className="text-lg font-extrabold text-white mt-0.5">{labOrder.testName}</h3>
          <p className="text-xs text-slate-300">
            Patient: <strong className="text-white">{labOrder.patientName}</strong> ({labOrder.patientId}) • Doctor: {labOrder.doctorName}
          </p>
        </div>

        <div className="text-right">
          <Badge status={labOrder.status} size="sm" />
          <p className="text-[11px] text-slate-400 font-mono mt-1">Ordered: {formatDate(labOrder.orderDate)}</p>
        </div>
      </div>

      {/* Results Parameter Table */}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <FlaskConical size={14} className="text-violet-600" />
            Measured Parameters & Reference Ranges
          </h4>

          <button
            type="button"
            onClick={handleAddParam}
            className="flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-800"
          >
            <Plus size={13} />
            <span>Add Row</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-3">Analyte / Test Parameter</th>
                <th className="py-2.5 px-3">Observed Value</th>
                <th className="py-2.5 px-3">Units</th>
                <th className="py-2.5 px-3">Normal Reference Range</th>
                <th className="py-2.5 px-3">Flag</th>
                <th className="py-2.5 px-2 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {results.map((res, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={res.parameter}
                      onChange={(e) => handleParamChange(idx, 'parameter', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-bold text-slate-900"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={res.value}
                      placeholder="e.g. 14.2"
                      onChange={(e) => handleParamChange(idx, 'value', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-bold font-mono text-slate-900"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={res.unit}
                      placeholder="mg/dL"
                      onChange={(e) => handleParamChange(idx, 'unit', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-slate-600"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={res.refRange}
                      placeholder="12.0 - 16.5"
                      onChange={(e) => handleParamChange(idx, 'refRange', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-slate-600 font-mono text-[11px]"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <select
                      value={res.status}
                      onChange={(e) => handleParamChange(idx, 'status', e.target.value)}
                      className={`rounded p-1 font-bold text-xs ${
                        res.status === 'High' || res.status === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : res.status === 'Low'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveParam(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clinical Interpretation & Notes */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Pathologist / Radiologist Diagnostic Impression
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Clinical evaluation, abnormal finding details, recommendations..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          ></textarea>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-md transition"
            >
              Finalize & Publish Results
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
