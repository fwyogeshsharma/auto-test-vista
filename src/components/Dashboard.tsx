
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TestManagement from '@/components/TestManagement';
import Reports from '@/components/Reports';
import ProjectManagement from '@/components/ProjectManagement';
import Profile from '@/components/Profile';

interface DashboardProps {
  userRole: 'admin' | 'tester' | 'viewer';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState('Project Alpha');

  const renderContent = () => {
    switch (activeSection) {
      case 'test-coverage':
      case 'execution':
      case 'test-case-addition':
      case 'test-step-addition':
        return <Reports activeReport={activeSection} userRole={userRole} />;
      case 'projects':
        return <ProjectManagement userRole={userRole} />;
      case 'profile':
      case 'organisation':
      case 'pricing':
        return <Profile activeTab={activeSection} userRole={userRole} />;
      default:
        return <TestManagement userRole={userRole} selectedProject={selectedProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        userRole={userRole}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        onLogout={onLogout}
      />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
