
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectManagementProps {
  userRole: 'admin' | 'tester' | 'viewer';
}

const ProjectManagement = ({ userRole }: ProjectManagementProps) => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Project Alpha',
      description: 'Main web application testing suite',
      status: 'active',
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      tests: 456,
      coverage: 92.3,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Project Beta',
      description: 'Mobile application testing framework',
      status: 'development',
      team: ['Sarah Wilson', 'Tom Brown'],
      tests: 234,
      coverage: 78.5,
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Project Gamma',
      description: 'API integration testing platform',
      status: 'active',
      team: ['Alex Turner', 'Lisa Chen', 'David Kim', 'Emma Davis'],
      tests: 789,
      coverage: 95.1,
      lastUpdated: '3 hours ago'
    },
    {
      id: 4,
      name: 'Mobile Testing Suite',
      description: 'Cross-platform mobile testing automation',
      status: 'planning',
      team: ['Chris Lee'],
      tests: 0,
      coverage: 0,
      lastUpdated: '1 week ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Access Restricted</h2>
          <p className="text-slate-600">Only administrators can manage projects.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Management</h1>
          <p className="text-slate-600 mt-1">Manage all testing projects and team assignments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Create New Project
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
          <div className="text-sm text-slate-600">Total Projects</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-green-600">
            {projects.filter(p => p.status === 'active').length}
          </div>
          <div className="text-sm text-slate-600">Active Projects</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-blue-600">
            {projects.reduce((sum, p) => sum + p.tests, 0)}
          </div>
          <div className="text-sm text-slate-600">Total Tests</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(projects.reduce((sum, p) => sum + p.coverage, 0) / projects.length)}%
          </div>
          <div className="text-sm text-slate-600">Avg Coverage</div>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-slate-600 mb-4">{project.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-500">Team Members</p>
                    <p className="font-medium">{project.team.length} members</p>
                    <div className="text-xs text-slate-600 mt-1">
                      {project.team.slice(0, 2).join(', ')}
                      {project.team.length > 2 && ` +${project.team.length - 2} more`}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Test Cases</p>
                    <p className="font-medium">{project.tests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Coverage</p>
                    <p className="font-medium">{project.coverage}%</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500">Last updated: {project.lastUpdated}</p>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
