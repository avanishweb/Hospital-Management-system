import React, { useState } from 'react';
import { UserPlus, Heart, Shield, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const PatientFormModal = ({ onClose }) => {
  const { addPatient, doctors, departments } = useHospital();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [department, setDepartment] = useState('General Medicine & ER');
  const [attendingDoctor, setAttendingDoctor] = useState(doctors[0]?.name || 'Dr. Priya Sharma');
  const [allergies, setAllergies] = useState('');
  const [chronicConditions, setChronicConditions] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [admissionStatus, setAdmissionStatus] = useState('Outpatient');

  // Initial vitals
  const [bp, setBp] = useState('120/80 mmHg');
  const [heartRate, setHeartRate] = useState('72 bpm');
  const [spo2, setSpo2] = useState('98%');
  const [temp, setTemp] = useState('98.6 °F');
  const [glucose, setGlucose] = useState('100 mg/dL');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill out the patient name and phone number.');
      return;
    }

    addPatient({
      name,
      age: Number(age) || 30,
      gender,
      bloodGroup,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: address || '123 Main Street',
      emergencyContact: emergencyContact || 'Family Member',
      department,
      attendingDoctor,
      admissionStatus,
      allergies: allergies ? allergies.split(',').map((s) => s.trim()) : ['None recorded'],
      chronicConditions: chronicConditions ? chronicConditions.split(',').map((s) => s.trim()) : ['None'],
      insuranceProvider: insuranceProvider || 'Self-Pay / Cash',
      vitals: {
        bp,
        heartRate,
        spo2,
        temp,
        glucose,
        recordedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Patient Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Jonathan Reynolds"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Age & Gender
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Blood Group
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="O+">O Positive (O+)</option>
            <option value="A+">A Positive (A+)</option>
            <option value="B+">B Positive (B+)</option>
            <option value="AB+">AB Positive (AB+)</option>
            <option value="O-">O Negative (O-)</option>
            <option value="A-">A Negative (A-)</option>
            <option value="B-">B Negative (B-)</option>
            <option value="AB-">AB Negative (AB-)</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="patient@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              const matched = doctors.find((d) => d.department === e.target.value);
              if (matched) setAttendingDoctor(matched.name);
            }}
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
            Attending Physician
          </label>
          <select
            value={attendingDoctor}
            onChange={(e) => setAttendingDoctor(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Known Drug Allergies (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Penicillin, Sulfa, Latex"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Insurance Provider & Policy #
          </label>
          <input
            type="text"
            placeholder="e.g. BlueCross Shield (BCS-8831)"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
          />
        </div>
      </div>

      {/* Initial Baseline Vitals Strip */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
          Baseline Vitals at Intake
        </span>
        <div className="grid grid-cols-5 gap-2">
          <div>
            <label className="text-[10px] text-slate-500 block">BP</label>
            <input
              type="text"
              value={bp}
              onChange={(e) => setBp(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block">Pulse</label>
            <input
              type="text"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block">SpO2</label>
            <input
              type="text"
              value={spo2}
              onChange={(e) => setSpo2(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block">Temp</label>
            <input
              type="text"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block">Sugar</label>
            <input
              type="text"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-bold"
            />
          </div>
        </div>
      </div>

      {/* Form Buttons */}
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
          Register Patient
        </button>
      </div>
    </form>
  );
};
