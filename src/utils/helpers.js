// src/utils/helpers.js
export const formatCurrency = (amount) => {
  if (!amount) return '';
  const numericAmount = amount.replace(/[^0-9.-]+/g, '');
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(numericAmount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysUntilDeadline = (deadline) => {
  if (!deadline) return null;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getStatusIcon = (status) => {
  const iconMap = {
    draft: 'Edit2',
    submitted: 'Clock',
    'under-review': 'AlertCircle',
    approved: 'CheckCircle',
    rejected: 'XCircle'
  };
  return iconMap[status] || 'Clock';
};

export const generateProposalId = (proposals) => {
  return proposals.length > 0 ? Math.max(...proposals.map(p => p.id)) + 1 : 1;
};

export const filterProposals = (proposals, searchTerm, statusFilter) => {
  let filtered = proposals;

  if (searchTerm) {
    filtered = filtered.filter(proposal =>
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (statusFilter !== 'all') {
    filtered = filtered.filter(proposal => proposal.status === statusFilter);
  }

  return filtered;
};