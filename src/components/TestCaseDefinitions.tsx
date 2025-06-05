
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronRight, Search, Filter, Plus, Upload } from "lucide-react";

export const TestCaseDefinitions = () => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['visualizer']);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableSearch, setTableSearch] = useState("");

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const modules = [
    { 
      id: 'visualizer', 
      name: 'Visualizer', 
      count: 128,
      children: [
        { id: 'viz-topology', name: 'Topology', count: 87 },
        { id: 'viz-config', name: 'Config', count: 41 }
      ]
    },
    { id: 'device-config', name: 'Device Config', count: 156 },
    { id: 'topology', name: 'Topology', count: 87 },
    { id: 'fabric', name: 'Fabric', count: 92 },
    { id: 'login-page', name: 'Login Page', count: 12 },
    { id: 'network', name: 'Network', count: 415 },
    { id: 'device-conf', name: 'Device Conf', count: 203 },
    { id: 'resources', name: 'Resources', count: 78 },
    { id: 'config-management', name: 'ConfigurationManagement', count: 134 }
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Pane - Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Case Modules</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto h-full">
          <div className="space-y-1">
            {modules.map((module) => (
              <div key={module.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-2 h-auto hover:bg-gray-100"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      <span>{module.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">({module.count})</span>
                  </div>
                </Button>
                
                {expandedModules.includes(module.id) && module.children && (
                  <div className="ml-6 mt-1 space-y-1">
                    {module.children.map((child) => (
                      <Button
                        key={child.id}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto text-sm hover:bg-gray-100"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2" />
                            <span>{child.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">({child.count})</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Pane - Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search in table"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Definition
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Import Definition
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Import Execution
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">
                    <div className="flex items-center">
                      Test Case ID
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">Test Case Title</th>
                  <th className="text-left p-4 font-medium text-gray-900">Assigned To</th>
                  <th className="text-left p-4 font-medium text-gray-900">Priority</th>
                  <th className="text-left p-4 font-medium text-gray-900">Template Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Creation Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    No test cases found. Select a module from the sidebar to view test cases.
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="border-t p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-sm text-gray-600">0 of 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
