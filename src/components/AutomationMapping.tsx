
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Settings } from "lucide-react";

export const AutomationMapping = () => {
  const [selectedTestCases, setSelectedTestCases] = useState(0);
  const [selectedTestSteps, setSelectedTestSteps] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {/* Top Notification Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">Please set at least one environment active.</span>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Settings className="h-4 w-4 mr-2" />
          Set Environment
        </Button>
      </div>

      {/* Main Functional Area */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Automation Mapping</CardTitle>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Filter by Module
                </Button>
                <span className="text-sm text-gray-600">No Module Selected</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Map Test Case</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filter Row */}
          <div className="grid grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pick a Release" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="v1.0">Version 1.0</SelectItem>
                <SelectItem value="v2.0">Version 2.0</SelectItem>
              </SelectContent>
            </Select>
            
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Pick a Feature File" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pick a Scenario Step Version *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">Version 1</SelectItem>
                <SelectItem value="v2">Version 2</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pick a Scenario *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scenario1">Scenario 1</SelectItem>
                <SelectItem value="scenario2">Scenario 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Test Case Mapping Tables */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Table - All Test Cases */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">All Test Cases</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  Selected Test Cases ({selectedTestCases})
                </span>
              </div>
              
              <Input placeholder="Search Table" className="w-full" />
              
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">
                        <Checkbox />
                      </th>
                      <th className="p-3 text-left text-sm font-medium">Test Case No.</th>
                      <th className="p-3 text-left text-sm font-medium">Test Summary</th>
                      <th className="p-3 text-left text-sm font-medium">Existing Mapping</th>
                      <th className="p-3 text-left text-sm font-medium">Versions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No test cases available
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Items per page: 10</span>
                <span>0 of 0</span>
              </div>
            </div>

            {/* Right Table - All Test Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">All Test Steps</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  Selected Test Steps ({selectedTestSteps})
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Input placeholder="Search Table" className="flex-1" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="mapped" />
                  <label htmlFor="mapped" className="text-sm">Mapped</label>
                </div>
              </div>
              
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">
                        <Checkbox />
                      </th>
                      <th className="p-3 text-left text-sm font-medium">Test Steps for</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-gray-500">
                        No test steps available
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Items per page: 10</span>
                <span>0 of 0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
