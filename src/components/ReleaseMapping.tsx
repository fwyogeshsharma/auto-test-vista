
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, Check, Hand, Circle } from "lucide-react";

export const ReleaseMapping = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const testCases = [
    {
      id: "TC001",
      module: "nginx > Visualizer > Topology",
      summary: "Test network topology visualization",
      version: "V1",
      creationDate: "15/05/25 10:30",
      status: "mapped"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mapped":
        return <Check className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Hand className="h-4 w-4 text-yellow-600" />;
      default:
        return <Circle className="h-4 w-4 text-pink-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Release Mapping</CardTitle>
          
          {/* Top filter row */}
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                Filter by Module
              </Button>
              <span className="text-sm text-gray-600">No Module Selected</span>
            </div>
            
            <Input 
              placeholder="Filter testcase" 
              className="w-64" 
            />
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="minor">Minor</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="10.0.4">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10.0.4">10.0.4</SelectItem>
                <SelectItem value="10.0.3">10.0.3</SelectItem>
                <SelectItem value="10.0.2">10.0.2</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-blue-600 hover:bg-blue-700 ml-auto">
              Map Release
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Collapsible section */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">(1)</span>
          </div>

          {/* Main Data Table */}
          {isExpanded && (
            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">
                      <Checkbox />
                    </th>
                    <th className="p-3 text-left text-sm font-medium">Test Case No.</th>
                    <th className="p-3 text-left text-sm font-medium">Module Name</th>
                    <th className="p-3 text-left text-sm font-medium">Test Summary</th>
                    <th className="p-3 text-left text-sm font-medium">Versions</th>
                    <th className="p-3 text-left text-sm font-medium">Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((testCase) => (
                    <tr key={testCase.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox />
                          {getStatusIcon(testCase.status)}
                        </div>
                      </td>
                      <td className="p-3 text-sm">{testCase.id}</td>
                      <td className="p-3 text-sm">
                        <div className="space-y-1">
                          {testCase.module.split(' > ').map((part, index, array) => (
                            <div key={index} className={`${index > 0 ? 'ml-4' : ''}`}>
                              {index > 0 && '⇊ '}{part}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-sm">{testCase.summary}</td>
                      <td className="p-3">
                        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                          {testCase.version}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{testCase.creationDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span>Items per page:</span>
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
            <span>1 – 10 of 719</span>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>First</Button>
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
              <Button variant="outline" size="sm">Last</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
