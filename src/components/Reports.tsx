
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReportsProps {
  activeReport: string;
  userRole: 'admin' | 'tester' | 'viewer';
}

const Reports = ({ activeReport, userRole }: ReportsProps) => {
  const reportData = {
    'test-coverage': {
      title: 'Test Coverage Report',
      description: 'Comprehensive analysis of code coverage across all modules',
      metrics: [
        { label: 'Overall Coverage', value: '87.3%', status: 'good' },
        { label: 'Line Coverage', value: '91.2%', status: 'excellent' },
        { label: 'Branch Coverage', value: '78.4%', status: 'warning' },
        { label: 'Function Coverage', value: '95.1%', status: 'excellent' }
      ]
    },
    'execution': {
      title: 'Test Execution Report',
      description: 'Real-time monitoring and analysis of test execution performance',
      metrics: [
        { label: 'Success Rate', value: '92.4%', status: 'excellent' },
        { label: 'Avg Execution Time', value: '4.2s', status: 'good' },
        { label: 'Failed Tests', value: '42', status: 'warning' },
        { label: 'Total Runs', value: '1,247', status: 'good' }
      ]
    },
    'test-case-addition': {
      title: 'Test Case Addition Report',
      description: 'Tracking new test case creation and validation metrics',
      metrics: [
        { label: 'New Cases This Week', value: '28', status: 'good' },
        { label: 'Validation Rate', value: '94.6%', status: 'excellent' },
        { label: 'Pending Review', value: '7', status: 'warning' },
        { label: 'Auto-Generated', value: '156', status: 'good' }
      ]
    },
    'test-step-addition': {
      title: 'Test Step Addition Report',
      description: 'Detailed analysis of test step creation and optimization',
      metrics: [
        { label: 'New Steps Added', value: '142', status: 'good' },
        { label: 'Optimization Rate', value: '89.3%', status: 'good' },
        { label: 'Duplicate Steps', value: '12', status: 'warning' },
        { label: 'Reusable Steps', value: '67%', status: 'excellent' }
      ]
    }
  };

  const currentReport = reportData[activeReport as keyof typeof reportData];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if user has access to this report type
  const hasAccess = () => {
    if (activeReport === 'test-case-addition' || activeReport === 'test-step-addition') {
      return userRole === 'admin' || userRole === 'tester';
    }
    return true; // All users can view coverage and execution reports
  };

  if (!hasAccess()) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Access Restricted</h2>
          <p className="text-slate-600">You don't have permission to view this report.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{currentReport.title}</h1>
        <p className="text-slate-600 mt-1">{currentReport.description}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentReport.metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <Badge className={getStatusColor(metric.status)}>
                {metric.status}
              </Badge>
            </div>
            <div className="text-sm text-slate-600">{metric.label}</div>
          </Card>
        ))}
      </div>

      {/* Main Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Trends Over Time</h3>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-600">Time series chart would go here</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribution Analysis</h3>
          <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-600">Distribution chart would go here</p>
          </div>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Module</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Trend</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {['Authentication', 'Payment', 'User Management', 'API', 'UI Components'].map((module, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-slate-900">{module}</td>
                  <td className="px-6 py-4">{85 + (index * 3)}%</td>
                  <td className="px-6 py-4">
                    <span className={index % 2 === 0 ? 'text-green-600' : 'text-red-600'}>
                      {index % 2 === 0 ? '↗️ +2.3%' : '↘️ -1.1%'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(index % 3 === 0 ? 'excellent' : index % 3 === 1 ? 'good' : 'warning')}>
                      {index % 3 === 0 ? 'excellent' : index % 3 === 1 ? 'good' : 'warning'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
