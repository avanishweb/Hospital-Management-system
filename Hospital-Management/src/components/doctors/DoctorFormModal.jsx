import React, { useState } from 'react';
import { UserCheck, Stethoscope, Mail, Phone, DollarSign } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const DoctorFormModal = ({ onClose }) => {
  const { addDoctor, departments } = useHospital();

  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [qualifications, setQualifications] = useState('');
  const [experience, setExperience] = useState('10 Years');
  const [consultationFee, setConsultationFee] = useState('150');
  const [timing, setTiming] = useState('09:00 AM - 02:00 PM');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarBg, setAvatarBg] = useState('#0284c7');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !specialization) {
      alert('Please fill out doctor name and specialization.');
      return;
    }

    addDoctor({
      name: name.startsWith('Dr. ') ? name : `Dr. ${name}`,
      specialization,
      department,
      qualifications: qualifications || 'MD, Board Certified',
      experience,
      consultationFee: Number(consultationFee) || 100,
      timing,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      email: email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@pulsecare.org`,
      phone: phone || '+1 (555) 000-0000',
      avatarBg
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Doctor Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Dr. Catherine Price"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Sub-Specialization *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Interventional Cardiologist"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Experience
          </label>
          <input
            type="text"
            placeholder="e.g. 15 Years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Fee ($)
          </label>
          <input
            type="number"
            placeholder="150"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Medical Qualifications & Degrees
          </label>
          <input
            type="text"
            placeholder="e.g. MD, PhD, FACC (Harvard Med)"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            OPD Shift Timing
          </label>
          <input
            type="text"
            placeholder="09:00 AM - 02:00 PM"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Official Email
          </label>
          <input
            type="email"
            placeholder="doctor@pulsecare.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Direct Phone / Bleep
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Color Accent Picker */}
      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Avatar Badge Theme
        </label>
        <div className="flex items-center gap-2">
          {['#0284c7', '#7c3aed', '#0d9488', '#f59e0b', '#e11d48', '#10b981'].map((c) => (
            <div
              key={c}
              onClick={() => setAvatarBg(c)}
              className={`h-7 w-7 rounded-full cursor-pointer transition transform ${
                avatarBg === c ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
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
          Add Doctor to Roster
        </button>
      </div>
    </form>
  );
};
