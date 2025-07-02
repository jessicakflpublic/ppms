import { useState, useEffect } from 'react';
import { INITIAL_FORM_DATA } from '../utils/constants';
import { generateProposalId } from '../utils/helpers';

const SAMPLE_PROPOSALS = [
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

export const useProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProposals(SAMPLE_PROPOSALS);
      setLoading(false);
    }, 500);
  }, []);

  const addProposal = (proposalData) => {
    const newProposal = {
      ...proposalData,
      id: generateProposalId(proposals)
    };
    setProposals(prev => [...prev, newProposal]);
    return newProposal;
  };

  const updateProposal = (id, proposalData) => {
    setProposals(prev => 
      prev.map(proposal => 
        proposal.id === id ? { ...proposalData, id } : proposal
      )
    );
  };

  const deleteProposal = (id) => {
    setProposals(prev => prev.filter(proposal => proposal.id !== id));
  };

  const updateProposalStatus = (id, newStatus) => {
    setProposals(prev => 
      prev.map(proposal => 
        proposal.id === id ? { ...proposal, status: newStatus } : proposal
      )
    );
  };

  const getProposalById = (id) => {
    return proposals.find(proposal => proposal.id === id);
  };

  return {
    proposals,
    loading,
    addProposal,
    updateProposal,
    deleteProposal,
    updateProposalStatus,
    getProposalById
  };
};