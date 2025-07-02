export const STATUS_CONFIG = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: 'Edit2' },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800', icon: 'Clock' },
  'under-review': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800', icon: 'AlertCircle' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: 'XCircle' }
};

export const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'bg-green-50 text-green-700' },
  medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
  high: { label: 'High', color: 'bg-red-50 text-red-700' }
};

export const CATEGORIES = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'data-analytics', label: 'Data Analytics' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'consulting', label: 'Consulting' }
];

export const INITIAL_FORM_DATA = {
  title: '',
  description: '',
  client: '',
  budget: '',
  timeline: '',
  priority: 'medium',
  status: 'draft',
  category: 'web-development',
  submittedDate: new Date().toISOString().split('T')[0],
  deadline: ''
};