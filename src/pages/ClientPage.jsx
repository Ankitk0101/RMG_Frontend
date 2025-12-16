import React from 'react';
import ClientHeader from '../components/Client/ClientHeader';
import ClientInfo from '../components/Client/ClientInfo';
import KYCDetails from '../components/Client/KYCDetails';
import CommentSection from '../components/Profile/CommentSection';

const ClientPage = () => {
  const clientData = {
    id: '39303',
    name: 'Shriram B',
    company: 'Huber Group',
    campaign: 'LinkedIn connect Rashi 2025',
    leadId: '#123456',
    salesPerson: 'Rashi Sharma',
    salesRole: 'Sales(s/w local)',
    date: '29 Oct 25, 01:58 PM',
    laptopProvidedBy: 'Neosoft',
    bgvRequired: 'Yes',
    clientBGV: 'Yes',
    bgvNotes: 'The client might do the BGV',
    interviewRounds: '2',
    writtenTest: 'No',
    trialPeriod: 'Not there',
    outsideCandidate: 'Yes'
  };

  return (
    <div className="space-y-6">
      <ClientHeader client={clientData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ClientInfo client={clientData} />
          <CommentSection clientId={clientData.id} />
        </div>
        <div>
          <KYCDetails client={clientData} />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;