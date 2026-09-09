import React, { useState } from 'react';
import { Plus, Trash2, Receipt, DollarSign, Shield } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { formatCurrency } from '../../utils/formatters';

export const CreateInvoiceModal = ({ initialPayload, onClose }) => {
  const { patients, departments, createInvoice } = useHospital();

  const [patientId, setPatientId] = useState(initialPayload?.patientId || patients[0]?.id || '');
  const [department, setDepartment] = useState('Cardiology');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [status, setStatus] = useState('Pending');

  // Line items state
  const [items, setItems] = useState([
    { id: '1', description: 'Specialist Physician Consultation', category: 'Consultation', quantity: 1, unitPrice: 150, total: 150 }
  ]);

  const [discount, setDiscount] = useState('0');
  const [insuranceCovered, setInsuranceCovered] = useState('0');

  const selectedPatientObj = patients.find((p) => p.id === patientId) || patients[0];

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        description: 'Medication / Diagnostic Test',
        category: 'Pharmacy',
        quantity: 1,
        unitPrice: 50,
        total: 50
      }
    ]);
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = (Number(updated.quantity) || 0) * (Number(updated.unitPrice) || 0);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  const netTotal = Math.max(0, subtotal - (Number(discount) || 0) - (Number(insuranceCovered) || 0));

  const handleSubmit = (e) => {
    e.preventDefault();

    createInvoice({
      patientId: selectedPatientObj.id,
      patientName: selectedPatientObj.name,
      department,
      paymentMethod,
      status,
      items,
      subtotal,
      discount: Number(discount) || 0,
      insuranceCovered: Number(insuranceCovered) || 0,
      total: netTotal,
      paidAmount: status === 'Paid' ? netTotal : 0
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {/* Patient & Department */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Select Patient *
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id}) — {p.admissionStatus}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Itemized Line Items Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
            Billable Items & Services
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-800"
          >
            <Plus size={13} />
            <span>Add Item</span>
          </button>
        </div>

        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200"
            >
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Service description"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 font-semibold"
                />
              </div>

              <div className="col-span-3">
                <select
                  value={item.category}
                  onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-[11px] text-slate-700"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Room & Board">Room / Bed</option>
                  <option value="Surgery / Procedure">Surgery / Procedure</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Diagnostics">Diagnostics / Imaging</option>
                </select>
              </div>

              <div className="col-span-1">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold text-center"
                />
              </div>

              <div className="col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold text-right"
                />
              </div>

              <div className="col-span-1 text-center">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjustments: Discount & Insurance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Insurance TPA Coverage Deduction ($)
          </label>
          <input
            type="number"
            placeholder="0"
            value={insuranceCovered}
            onChange={(e) => setInsuranceCovered(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Discount / Concession ($)
          </label>
          <input
            type="number"
            placeholder="0"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Payment Method & Initial Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Payment Channel
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Credit Card">Credit / Debit Card</option>
            <option value="Cash">Cash at Billing Counter</option>
            <option value="Insurance TPA">Direct Insurance TPA Claim</option>
            <option value="Bank Transfer">Wire / Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Initial Payment Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Pending">Pending Payment</option>
            <option value="Paid">Mark as Paid / Settled</option>
          </select>
        </div>
      </div>

      {/* Calculation Summary Strip */}
      <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
        <div className="flex justify-between text-slate-600">
          <span>Gross Subtotal:</span>
          <span className="font-bold">{formatCurrency(subtotal)}</span>
        </div>
        {Number(insuranceCovered) > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Insurance Deduction:</span>
            <span className="font-bold">-{formatCurrency(Number(insuranceCovered))}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1 border-t border-slate-200">
          <span>Net Patient Total:</span>
          <span className="text-emerald-700">{formatCurrency(netTotal)}</span>
        </div>
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
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          Generate Invoice
        </button>
      </div>
    </form>
  );
};
