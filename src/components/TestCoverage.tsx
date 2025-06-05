
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, FileText, Camera, Download } from "lucide-react";

export const TestCoverage = () => {
  const coverageData = {
    total: 719,
    automatable: 47,
    automationDone: 25,
    automationPending: 22,
    nonAutomatable: 672
  };

  const getPercentage = (value: number) => ((value / coverageData.total) * 100).toFixed(2);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Automation Coverage Report</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Module Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ALL</SelectItem>
                    <SelectItem value="visualizer">Visualizer</SelectItem>
                    <SelectItem value="topology">Topology</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Filter by Module
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Donut Chart and Legend */}
          <div className="grid grid-cols-2 gap-8">
            {/* Chart placeholder */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Automatable */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="20"
                    strokeDasharray={`${getPercentage(coverageData.automatable)} ${100 - parseFloat(getPercentage(coverageData.automatable))}`}
                    strokeDashoffset="25"
                  />
                  {/* Automation Done */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="20"
                    strokeDasharray={`${getPercentage(coverageData.automationDone)} ${100 - parseFloat(getPercentage(coverageData.automationDone))}`}
                    strokeDashoffset={`${25 - parseFloat(getPercentage(coverageData.automatable))}`}
                  />
                  {/* Automation Pending */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="20"
                    strokeDasharray={`${getPercentage(coverageData.automationPending)} ${100 - parseFloat(getPercentage(coverageData.automationPending))}`}
                    strokeDashoffset={`${25 - parseFloat(getPercentage(coverageData.automatable)) - parseFloat(getPercentage(coverageData.automationDone))}`}
                  />
                  {/* Non-Automatable */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="20"
                    strokeDasharray={`${getPercentage(coverageData.nonAutomatable)} ${100 - parseFloat(getPercentage(coverageData.nonAutomatable))}`}
                    strokeDashoffset={`${25 - parseFloat(getPercentage(coverageData.automatable)) - parseFloat(getPercentage(coverageData.automationDone)) - parseFloat(getPercentage(coverageData.automationPending))}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{coverageData.total}</span>
                </div>
              </div>
            </div>

            {/* Legend and Data Table */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Case Type Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <span>Total</span>
                  </div>
                  <span className="font-medium">{coverageData.total} (100%)</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Automatable</span>
                  </div>
                  <span className="font-medium">{coverageData.automatable} ({getPercentage(coverageData.automatable)}%)</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Automation Done</span>
                  </div>
                  <span className="font-medium">{coverageData.automationDone} ({getPercentage(coverageData.automationDone)}%)</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Automation Pending</span>
                  </div>
                  <span className="font-medium">{coverageData.automationPending} ({getPercentage(coverageData.automationPending)}%)</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Non-Automatable</span>
                  </div>
                  <span className="font-medium">{coverageData.nonAutomatable} ({getPercentage(coverageData.nonAutomatable)}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download Test Cases
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
