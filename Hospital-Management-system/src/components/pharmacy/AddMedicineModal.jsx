import React, { useState } from 'react';
import { Pill, Package, Calendar, DollarSign, Layers } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AddMedicineModal = ({ onClose }) => {
  const { addMedicine } = useHospital();

  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [category, setCategory] = useState('Antibiotic');
  const [form, setForm] = useState('Tablet');
  const [strength, setStrength] = useState('500mg');
  const [batch, setBatch] = useState('BAT-2026-01');
  const [expiry, setExpiry] = useState('2028-06-30');
  const [stock, setStock] = useState('100');
  const [minThreshold, setMinThreshold] = useState('20');
  const [price, setPrice] = useState('5.00');
  const [manufacturer, setManufacturer] = useState('Pfizer / Global Health');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !genericName) {
      alert('Please fill out medicine name and generic name.');
      return;
    }

    addMedicine({
      name,
      genericName,
      category,
      form,
      strength,
      batch,
      expiry,
      stock: Number(stock) || 0,
      minThreshold: Number(minThreshold) || 10,
      price: Number(price) || 1.0,
      manufacturer
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Brand Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Augmentin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Generic Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Amoxicillin & Clavulanate"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="Antibiotic">Antibiotic</option>
            <option value="Cardiovascular">Cardiovascular</option>
            <option value="Analgesic / Antipyretic">Analgesic / Antipyretic</option>
            <option value="Antidiabetic">Antidiabetic</option>
            <option value="Respiratory">Respiratory</option>
            <option value="Anticoagulant">Anticoagulant</option>
            <option value="Antiemetic">Antiemetic</option>
            <option value="IV Fluid">IV Fluid</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Dosage Form
          </label>
          <select
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Ampoule">Ampoule / Injection</option>
            <option value="Inhaler">Inhaler</option>
            <option value="IV Infusion Bottle">IV Infusion Bottle</option>
            <option value="Pre-filled Syringe">Pre-filled Syringe</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Strength
          </label>
          <input
            type="text"
            placeholder="e.g. 625mg or 100mL"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Batch Number
          </label>
          <input
            type="text"
            placeholder="BAT-2026-08"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Unit Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="3.50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Initial Stock Quantity
          </label>
          <input
            type="number"
            placeholder="100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Minimum Warning Threshold
          </label>
          <input
            type="number"
            placeholder="25"
            value={minThreshold}
            onChange={(e) => setMinThreshold(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
          Manufacturer / Supplier
        </label>
        <input
          type="text"
          placeholder="e.g. GSK Pharmaceuticals"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          Add Medicine to Stock
        </button>
      </div>
    </form>
  );
};
