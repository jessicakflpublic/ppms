import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Eye, Edit2, Trash2, Calendar, User, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
const ProposalManagementSystem = () => {
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProposal, setEditingProposal] = useState(null);

  const [formData, setFormData] = useState({
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
  });

  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: Edit2 },
    submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800', icon: Clock },
    'under-review': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const priorityConfig = {
    low: { label: 'Low', color: 'bg-green-50 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
    high: { label: 'High', color: 'bg-red-50 text-red-700' }
  };

  // Sample data initialization
  useEffect(() => {
    const sampleProposals = [
      {
        id: 1,
        title: 'E-commerce Website Redesign',
        description: 'Complete redesign of the existing e-commerce platform with modern UI/UX and improved performance.',
        client: 'TechCorp Inc.',
        budget: '$75,000',
        timeline: '6 months',
        priority: 'high',
        status: 'submitted',
        category: 'web-development',
        submittedDate: '2024-06-15',
        deadline: '2024-12-15'
      },
      {
        id: 2,
        title: 'Mobile App Development',
        description: 'Native iOS and Android app for customer service management.',
        client: 'ServicePro LLC',
        budget: '$120,000',
        timeline: '8 months',
        priority: 'medium',
        status: 'under-review',
        category: 'mobile-development',
        submittedDate: '2024-06-10',
        deadline: '2025-02-10'
      },
      {
        id: 3,
        title: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence and reporting.',
        client: 'DataFlow Systems',
        budget: '$45,000',
        timeline: '4 months',
        priority: 'medium',
        status: 'approved',
        category: 'data-analytics',
        submittedDate: '2024-05-20',
        deadline: '2024-10-20'
      }
    ];
    setProposals(sampleProposals);
    setFilteredProposals(sampleProposals);
  }, []);

  // Filter proposals based on search and status
  useEffect(() => {
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

    setFilteredProposals(filtered);
  }, [proposals, searchTerm, statusFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProposal) {
      setProposals(proposals.map(p => 
        p.id === editingProposal.id ? { ...formData, id: editingProposal.id } : p
      ));
      setEditingProposal(null);
    } else {
      const newProposal = {
        ...formData,
        id: proposals.length + 1
      };
      setProposals([...proposals, newProposal]);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
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
    });
  };

  const handleEdit = (proposal) => {
    setFormData(proposal);
    setEditingProposal(proposal);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      setProposals(proposals.filter(p => p.id !== id));
    }
  };

  const handleStatusChange = (proposalId, newStatus) => {
    setProposals(proposals.map(p => 
      p.id === proposalId ? { ...p, status: newStatus } : p
    ));
  };

  const StatusBadge = ({ status }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const config = priorityConfig[priority];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProposal ? 'Edit Proposal' : 'Create New Proposal'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingProposal(null); resetForm(); }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="e.g., $50,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    placeholder="e.g., 6 months"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the project proposal..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingProposal(null); resetForm(); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingProposal ? 'Update Proposal' : 'Create Proposal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'detail' && selectedProposal) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <button
                    onClick={() => setCurrentView('list')}
                    className="text-blue-600 hover:text-blue-800 mb-4"
                  >
                    ← Back to List
                  </button>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProposal.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <StatusBadge status={selectedProposal.status} />
                    <PriorityBadge priority={selectedProposal.priority} />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(selectedProposal)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedProposal.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="font-medium">{selectedProposal.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium">{selectedProposal.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Timeline</p>
                        <p className="font-medium">{selectedProposal.timeline}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Deadline</p>
                        <p className="font-medium">{selectedProposal.deadline || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Management</h3>
                  <div className="space-y-3">
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedProposal.id, status)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedProposal.status === status
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <StatusBadge status={status} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProposal.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Proposals</h1>
            <p className="text-gray-600 mt-2">Manage and track your project proposals</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Proposal
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search proposals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {filteredProposals.length} proposal{filteredProposals.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredProposals.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
                <p className="text-gray-500">Get started by creating your first project proposal.</p>
              </div>
            ) : (
              filteredProposals.map((proposal) => (
                <div key={proposal.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                        <StatusBadge status={proposal.status} />
                        <PriorityBadge priority={proposal.priority} />
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{proposal.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {proposal.client}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {proposal.budget}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {proposal.timeline}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {proposal.submittedDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setSelectedProposal(proposal);
                          setCurrentView('detail');
                        }}
                        className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(proposal)}
                        className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proposal.id)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProposalManagementSystem;