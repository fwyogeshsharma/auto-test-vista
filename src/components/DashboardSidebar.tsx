
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Settings, 
  BarChart, 
  Plus,
  Users,
  User,
  Building2,
  CreditCard,
  LogOut
} from "lucide-react";

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const DashboardSidebar = ({ currentView, onViewChange }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['test-cases']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'test-cases',
      label: 'Test Cases',
      icon: <FileText className="w-4 h-4" />,
      children: [
        { id: 'test-definitions', label: 'Definition', onClick: () => onViewChange('test-definitions') },
        { id: 'automation-mapping', label: 'Automation Mapping', onClick: () => onViewChange('automation-mapping') },
        { id: 'release-mapping', label: 'Release Mapping', onClick: () => onViewChange('release-mapping') }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart className="w-4 h-4" />,
      children: [
        { id: 'test-coverage', label: 'Test Coverage', onClick: () => onViewChange('test-coverage') },
        { id: 'execution', label: 'Execution', onClick: () => onViewChange('execution') },
        { id: 'test-case-addition', label: 'Test Case Addition', onClick: () => onViewChange('test-case-addition') },
        { id: 'test-step-addition', label: 'Test Step Addition', onClick: () => onViewChange('test-step-addition') }
      ]
    },
    {
      id: 'manage',
      label: 'Manage',
      icon: <Settings className="w-4 h-4" />,
      children: [
        { id: 'projects', label: 'Projects', onClick: () => onViewChange('projects') }
      ]
    },
    {
      id: 'about-me',
      label: 'About Me',
      icon: <User className="w-4 h-4" />,
      children: [
        { id: 'my-profile', label: 'My Profile', onClick: () => onViewChange('my-profile') },
        { id: 'organisation', label: 'Organisation', onClick: () => onViewChange('organisation') },
        { id: 'pricing', label: 'Pricing', onClick: () => onViewChange('pricing') }
      ]
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo and Organization */}
      <div className="p-4 border-b">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FW</span>
          </div>
          <span className="ml-2 text-lg font-bold text-gray-900">PinTailer</span>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-medium">Organization: TechCorp</div>
          <div className="text-xs text-gray-500 mt-1">DeviceDriver - Dellemcsonic</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 h-auto"
                onClick={() => toggleMenu(item.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                  {expandedMenus.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </Button>
              
              {expandedMenus.includes(item.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.id}
                      variant="ghost"
                      className={`w-full justify-start text-left p-2 h-auto text-sm ${
                        currentView === child.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                      }`}
                      onClick={child.onClick}
                    >
                      {child.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-left p-2 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => navigate('/')}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
