
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'tester' | 'viewer';
  activeSection: string;
  onSectionChange: (section: string) => void;
  selectedProject: string;
  onProjectChange: (project: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ userRole, activeSection, onSectionChange, selectedProject, onProjectChange, onLogout }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['reports', 'manage']);

  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Mobile Testing Suite'];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      access: ['admin', 'tester', 'viewer']
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📊',
      access: ['admin', 'tester', 'viewer'],
      children: [
        { id: 'test-coverage', label: 'Test Coverage', access: ['admin', 'tester', 'viewer'] },
        { id: 'execution', label: 'Execution', access: ['admin', 'tester', 'viewer'] },
        { id: 'test-case-addition', label: 'Test Case Addition', access: ['admin', 'tester'] },
        { id: 'test-step-addition', label: 'Test Step Addition', access: ['admin', 'tester'] }
      ]
    },
    {
      id: 'manage',
      label: 'Manage',
      icon: '⚙️',
      access: ['admin'],
      children: [
        { id: 'projects', label: 'Projects', access: ['admin'] }
      ]
    },
    {
      id: 'about',
      label: 'About Me',
      icon: '👤',
      access: ['admin', 'tester', 'viewer'],
      children: [
        { id: 'profile', label: 'My Profile', access: ['admin', 'tester', 'viewer'] },
        { id: 'organisation', label: 'Organisation', access: ['admin', 'tester', 'viewer'] },
        { id: 'pricing', label: 'Pricing', access: ['admin', 'tester', 'viewer'] }
      ]
    }
  ];

  const hasAccess = (access: string[]) => access.includes(userRole);

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 shadow-lg z-40 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TA</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TestAutomator
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="mt-4">
            <p className="text-sm text-slate-600">Organisation</p>
            <p className="font-semibold text-slate-900">TechCorp Solutions</p>
            <div className="mt-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Role</p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                userRole === 'admin' ? 'bg-red-100 text-red-800' :
                userRole === 'tester' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-200">
          <p className="text-sm font-medium text-slate-900 mb-2">Projects</p>
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project}
                onClick={() => onProjectChange(project)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  selectedProject === project
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {project}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            if (!hasAccess(item.access)) return null;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.children) {
                      toggleSection(item.id);
                    } else {
                      onSectionChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.children && (
                    <span className={`transform transition-transform ${expandedSections.includes(item.id) ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  )}
                </button>

                {!isCollapsed && item.children && expandedSections.includes(item.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => {
                      if (!hasAccess(child.access)) return null;
                      
                      return (
                        <button
                          key={child.id}
                          onClick={() => onSectionChange(child.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeSection === child.id
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {!isCollapsed && 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
