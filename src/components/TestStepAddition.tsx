
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartConfig = {
  testSteps: {
    label: "Test Steps Added",
    color: "#10b981",
  },
};

// Sample data for the chart
const sampleData = [
  { date: "2025-06-01", testSteps: 15 },
  { date: "2025-06-02", testSteps: 23 },
  { date: "2025-06-03", testSteps: 18 },
  { date: "2025-06-04", testSteps: 31 },
  { date: "2025-06-05", testSteps: 27 },
];

export const TestStepAddition = () => {
  const [startDate, setStartDate] = useState("2025-06-05");
  const [endDate, setEndDate] = useState("2025-06-05");
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(sampleData);

  const handleGenerateGraph = () => {
    // In a real application, this would fetch data based on the date range
    console.log(`Generating graph for date range: ${startDate} to ${endDate}`);
    
    // Filter sample data based on date range
    const filteredData = sampleData.filter(item => {
      const itemDate = new Date(item.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });
    
    setChartData(filteredData);
    setShowChart(true);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Test Step Addition Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button 
                onClick={handleGenerateGraph}
                className="px-8 py-2 shadow-lg"
                size="lg"
              >
                Generate Graph
              </Button>
            </div>

            {/* Chart Display */}
            {showChart && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Test Steps Added ({startDate} to {endDate})
                </h3>
                
                {chartData.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                          }}
                        />
                        <YAxis />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return `Date: ${date.toLocaleDateString()}`;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="testSteps" 
                          stroke={chartConfig.testSteps.color} 
                          strokeWidth={3}
                          dot={{ fill: chartConfig.testSteps.color, strokeWidth: 2, r: 6 }}
                          name="Test Steps Added"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>No Data Available</p>
                    <p className="text-sm">No test steps were added in the selected date range.</p>
                  </div>
                )}

                {/* Summary */}
                {chartData.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Days:</span>
                        <div className="font-semibold">{chartData.length}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Test Steps:</span>
                        <div className="font-semibold">
                          {chartData.reduce((sum, item) => sum + item.testSteps, 0)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Average per Day:</span>
                        <div className="font-semibold">
                          {(chartData.reduce((sum, item) => sum + item.testSteps, 0) / chartData.length).toFixed(1)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Peak Day:</span>
                        <div className="font-semibold">
                          {Math.max(...chartData.map(item => item.testSteps))} steps
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
