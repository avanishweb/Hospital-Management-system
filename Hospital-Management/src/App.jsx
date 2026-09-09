import React from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Modal } from './components/common/Modal';
import { ToastContainer } from './components/common/ToastContainer';

// Public Website Views
import { WebHero } from './components/website/WebHero';
import { WebDepartments } from './components/website/WebDepartments';
import { WebDoctors } from './components/website/WebDoctors';
import { WebBookingWizard } from './components/website/WebBookingWizard';
import { WebServices } from './components/website/WebServices';
import { WebFooter } from './components/website/WebFooter';

// Enterprise HMS Application Views
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { PatientList } from './components/patients/PatientList';
import { PatientDetailModal } from './components/patients/PatientDetailModal';
import { PatientFormModal } from './components/patients/PatientFormModal';
import { PatientAdmitModal } from './components/patients/PatientAdmitModal';
import { DoctorList } from './components/doctors/DoctorList';
import { DoctorFormModal } from './components/doctors/DoctorFormModal';
import { AppointmentList } from './components/appointments/AppointmentList';
import { AppointmentBookingModal } from './components/appointments/AppointmentBookingModal';
import { BedStatusGrid } from './components/beds/BedStatusGrid';
import { InventoryList } from './components/pharmacy/InventoryList';
import { AddMedicineModal } from './components/pharmacy/AddMedicineModal';
import { BillingList } from './components/billing/BillingList';
import { CreateInvoiceModal } from './components/billing/CreateInvoiceModal';
import { InvoicePrintView } from './components/billing/InvoicePrintView';
import { LabOrdersList } from './components/laboratory/LabOrdersList';
import { LabReportModal } from './components/laboratory/LabReportModal';
import { OrderLabModal } from './components/laboratory/OrderLabModal';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout = () => {
  const { activePortal, currentTab, activeModal, setActiveModal } = useHospital();

  const renderActiveAppTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientList />;
      case 'doctors':
        return <DoctorList />;
      case 'appointments':
        return <AppointmentList />;
      case 'beds':
        return <BedStatusGrid />;
      case 'pharmacy':
        return <InventoryList />;
      case 'billing':
        return <BillingList />;
      case 'lab':
        return <LabOrdersList />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      {activePortal === 'website' ? (
        // Public Hospital Website Portal
        <main className="flex-1 animate-fade-in">
          <WebHero />
          <WebDepartments />
          <WebDoctors />
          <WebBookingWizard />
          <WebServices />
          <WebFooter />
        </main>
      ) : (
        // Enterprise HMS Application Portal
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto animate-fade-in">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {renderActiveAppTab()}
          </main>
        </div>
      )}

      {/* Dynamic Global Modals */}
      {activeModal && (
        <>
          {activeModal.type === 'view_patient' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Electronic Medical Record (EMR)"
              subtitle={`Patient ID: ${activeModal.payload?.id}`}
              maxWidth="max-w-3xl"
            >
              <PatientDetailModal patient={activeModal.payload} onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'add_patient' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Register New Patient (Intake Form)"
              subtitle="Add demographic, medical alerts, baseline vitals, and insurance details"
              maxWidth="max-w-2xl"
            >
              <PatientFormModal onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'admit_patient' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="In-Patient Hospital Bed Admission"
              subtitle={`Assign care ward and attending doctor for ${activeModal.payload?.name}`}
              maxWidth="max-w-xl"
            >
              <PatientAdmitModal patient={activeModal.payload} onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'add_doctor' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Add Specialist Doctor / Consultant"
              subtitle="Enter physician credentials, department, and duty timing"
              maxWidth="max-w-2xl"
            >
              <DoctorFormModal onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'book_appointment' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Book Clinical Consultation Slot"
              subtitle="Schedule in-person OPD or telehealth appointment"
              maxWidth="max-w-xl"
            >
              <AppointmentBookingModal onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'add_medicine' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Add Pharmacy Medicine / Item"
              subtitle="Enter pharmaceutical SKU, batch number, and stock threshold"
              maxWidth="max-w-2xl"
            >
              <AddMedicineModal onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'create_invoice' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Generate Patient Invoice & Medical Bill"
              subtitle="Add billable consultation, surgery, bed charges, and pharmacy items"
              maxWidth="max-w-3xl"
            >
              <CreateInvoiceModal initialPayload={activeModal.payload} onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'print_invoice' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Official Hospital Tax Invoice"
              subtitle={`Invoice #${activeModal.payload?.id}`}
              maxWidth="max-w-3xl"
            >
              <InvoicePrintView invoice={activeModal.payload} onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'view_lab_report' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Diagnostic Test Results & Findings"
              subtitle={`Order #${activeModal.payload?.id} — ${activeModal.payload?.testName}`}
              maxWidth="max-w-3xl"
            >
              <LabReportModal labOrder={activeModal.payload} onClose={closeModal} />
            </Modal>
          )}

          {activeModal.type === 'order_lab' && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              title="Order Diagnostic Investigation"
              subtitle="Request blood tests, pathology panels, or radiology scans"
              maxWidth="max-w-xl"
            >
              <OrderLabModal onClose={closeModal} />
            </Modal>
          )}
        </>
      )}

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <MainLayout />
    </HospitalProvider>
  );
}
