
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TestManagementProps {
  userRole: 'admin' | 'tester' | 'viewer';
  selectedProject: string;
}

const TestManagement = ({ userRole, selectedProject }: TestManagementProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const canImport = userRole === 'admin' || userRole === 'tester';

  const testStats = {
    totalTests: 1247,
    passed: 1089,
    failed: 42,
    skipped: 116,
    coverage: 87.3
  };

  const recentTests = [
    { id: 1, name: 'UserAuthenticationTest', status: 'passed', module: 'Authentication', lastRun: '2 hours ago' },
    { id: 2, name: 'PaymentGatewayTest', status: 'failed', module: 'Payment', lastRun: '4 hours ago' },
    { id: 3, name: 'DataValidationTest', status: 'passed', module: 'Validation', lastRun: '6 hours ago' },
    { id: 4, name: 'UIRegressionTest', status: 'passed', module: 'UI', lastRun: '8 hours ago' },
    { id: 5, name: 'APIIntegrationTest', status: 'skipped', module: 'API', lastRun: '12 hours ago' }
  ];

  const modules = [
    { name: 'Authentication', tests: 156, coverage: 92, status: 'healthy' },
    { name: 'Payment Processing', tests: 234, coverage: 85, status: 'warning' },
    { name: 'User Management', tests: 189, coverage: 95, status: 'healthy' },
    { name: 'API Endpoints', tests: 312, coverage: 78, status: 'critical' },
    { name: 'UI Components', tests: 356, coverage: 88, status: 'healthy' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'skipped': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Test Management</h1>
          <p className="text-slate-600 mt-1">Project: {selectedProject}</p>
        </div>
        
        {canImport && (
          <div className="flex space-x-3">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Import Java Files
            </Button>
            <Button variant="outline">
              Import Manual Tests
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="text-2xl font-bold text-slate-900">{testStats.totalTests}</div>
          <div className="text-sm text-slate-600">Total Tests</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-green-600">{testStats.passed}</div>
          <div className="text-sm text-slate-600">Passed</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-red-600">{testStats.failed}</div>
          <div className="text-sm text-slate-600">Failed</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-yellow-600">{testStats.skipped}</div>
          <div className="text-sm text-slate-600">Skipped</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-blue-600">{testStats.coverage}%</div>
          <div className="text-sm text-slate-600">Coverage</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {['overview', 'modules', 'recent'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Test Execution Trend</h3>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-600">Chart visualization would go here</p>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Coverage Analysis</h3>
            <div className="h-64 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-600">Coverage chart would go here</p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'modules' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Test Modules</h3>
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{module.name}</h4>
                  <p className="text-sm text-slate-600">{module.tests} tests • {module.coverage}% coverage</p>
                </div>
                <Badge className={getModuleStatusColor(module.status)}>
                  {module.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'recent' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Test Runs</h3>
          <div className="space-y-4">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{test.name}</h4>
                  <p className="text-sm text-slate-600">{test.module} • {test.lastRun}</p>
                </div>
                <Badge className={getStatusColor(test.status)}>
                  {test.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TestManagement;
