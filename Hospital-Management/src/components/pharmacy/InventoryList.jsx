import React, { useState } from 'react';
import {
  Pill,
  Search,
  PlusCircle,
  AlertTriangle,
  Package,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

export const InventoryList = () => {
  const { medicines, updateMedicineStock, setActiveModal } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(medicines.map((m) => m.category))];

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.batch.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = categoryFilter === 'All' || med.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  const lowStockCount = medicines.filter((m) => m.stock <= m.minThreshold).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pharmacy & Medical Inventory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pharmaceutical stock tracking, batch numbers, automated low-stock warnings, and bedside dispensing.
          </p>
        </div>

        <button
          onClick={() => setActiveModal({ type: 'add_medicine' })}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Add Medicine / Stock</span>
        </button>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="text-amber-600 shrink-0" size={18} />
            <div>
              <strong className="font-bold">{lowStockCount} items currently below minimum threshold!</strong>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Immediate re-order recommended to prevent supply interruptions.
              </p>
            </div>
          </div>
          <span className="bg-amber-200/80 text-amber-900 font-bold px-2.5 py-1 rounded-lg text-[11px]">
            Reorder Alert
          </span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search medicine, generic name, batch #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-auto cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Medicine & Generic</th>
                <th className="py-3.5 px-4">Form & Strength</th>
                <th className="py-3.5 px-4">Batch & Expiry</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">In Stock / Threshold</th>
                <th className="py-3.5 px-4 text-right">Stock Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No matching medicines found in catalog.
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((med) => {
                  const isLow = med.stock <= med.minThreshold;
                  return (
                    <tr key={med.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Medicine & Generic */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-xs shadow-2xs">
                            <Pill size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{med.name}</p>
                            <p className="text-[11px] text-slate-500">{med.genericName}</p>
                            <span className="text-[10px] font-mono text-slate-400">{med.id} • {med.category}</span>
                          </div>
                        </div>
                      </td>

                      {/* Form & Strength */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{med.strength}</p>
                        <p className="text-[11px] text-slate-500">{med.form}</p>
                      </td>

                      {/* Batch & Expiry */}
                      <td className="py-3.5 px-4">
                        <p className="font-mono font-bold text-slate-800">{med.batch}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          Exp: {med.expiry}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-bold text-emerald-700">
                        {formatCurrency(med.price)}
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-sm font-extrabold px-2.5 py-0.5 rounded-lg border ${
                              isLow
                                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            {med.stock} units
                          </span>
                          {isLow && (
                            <span className="text-[10px] text-amber-700 font-bold">
                              (Min: {med.minThreshold})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="Dispense 1 unit (-1)"
                            onClick={() => updateMedicineStock(med.id, -1)}
                            disabled={med.stock <= 0}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <button
                            title="Restock 10 units (+10)"
                            onClick={() => updateMedicineStock(med.id, 10)}
                            className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white transition font-bold text-xs"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
