// Format currency
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

// Format full datetime
export const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
};

// Generate unique identifiers with prefix
export const generateId = (prefix = 'ID') => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const dateSuffix = new Date().getFullYear().toString().slice(-2);
  return `${prefix}-${dateSuffix}${randomNum}`;
};

// Calculate age from birth date string or return numeric age
export const calculateAge = (dobString) => {
  if (!dobString) return '';
  const dob = new Date(dobString);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Status Badge colors and styling
export const getStatusStyle = (status) => {
  const norm = (status || '').toLowerCase();
  switch (norm) {
    case 'admitted':
    case 'in-consultation':
    case 'processing':
    case 'low stock':
      return { bg: '#fffbeb', text: '#b45309', border: '#fde68a' }; // Amber
    case 'completed':
    case 'paid':
    case 'available':
    case 'in stock':
    case 'discharged':
    case 'normal':
      return { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' }; // Emerald
    case 'scheduled':
    case 'pending':
    case 'occupied':
    case 'ordered':
      return { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd' }; // Primary Sky
    case 'cancelled':
    case 'expired':
    case 'out of stock':
    case 'critical':
    case 'high':
    case 'unpaid':
      return { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' }; // Rose
    case 'maintenance':
    case 'cleaning':
      return { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' }; // Violet
    default:
      return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' }; // Slate
  }
};
