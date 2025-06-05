
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, FileText, Camera, Mail, Download } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { name: "Total Datasets", value: 45, color: "#22c55e" },
  { name: "Pass", value: 25, color: "#eab308" },
  { name: "Fail", value: 8, color: "#ef4444" },
  { name: "Skip", value: 7, color: "#f97316" },
  { name: "Block", value: 5, color: "#374151" },
];

const chartConfig = {
  value: {
    label: "Count",
  },
  "Total Datasets": {
    label: "Total Datasets",
    color: "#22c55e",
  },
  Pass: {
    label: "Pass",
    color: "#eab308",
  },
  Fail: {
    label: "Fail",
    color: "#ef4444",
  },
  Skip: {
    label: "Skip",
    color: "#f97316",
  },
  Block: {
    label: "Block",
    color: "#374151",
  },
};

export const ExecutionReport = () => {
  const [environment, setEnvironment] = useState("None");
  const [release, setRelease] = useState("None");
  const [executionStatus, setExecutionStatus] = useState("");
  const [testCaseType, setTestCaseType] = useState("All");
  const [fileName, setFileName] = useState("Test_Cases");
  const [searchText, setSearchText] = useState("");

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Execution Report</CardTitle>
          
          {/* Top Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
                <SelectItem value="Prod">Prod</SelectItem>
              </SelectContent>
            </Select>

            <Select value={release} onValueChange={setRelease}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Release" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="10.0.4">10.0.4</SelectItem>
                <SelectItem value="10.0.5">10.0.5</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">No Module Selected</span>
              <Button variant="outline">Filter by Module</Button>
            </div>

            <div className="flex gap-2 ml-auto">
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
        </CardHeader>

        <CardContent>
          {/* Donut Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Execution Status</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          return (
                            <div className="bg-white p-3 border rounded shadow-lg">
                              <p className="font-semibold">{data.name}</p>
                              <p className="text-sm">Count: {data.value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value, entry) => `${value}: ${entry.payload.value}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Test Case Summary</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Auto Done</TableHead>
                    <TableHead>Auto Pending</TableHead>
                    <TableHead>Non-Auto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Test Cases In Project</TableCell>
                    <TableCell>719</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Test Cases In Release</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Result Received (6.26%)</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Datasets</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>120 secs</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-green-600">Pass</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>80 secs</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-red-600">Fail</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>25 secs</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-orange-600">Skip</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-gray-600">Block</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Remaining</TableCell>
                    <TableCell>674</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Select value={executionStatus} onValueChange={setExecutionStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Execution Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pass">Pass</SelectItem>
                <SelectItem value="Fail">Fail</SelectItem>
                <SelectItem value="Skip">Skip</SelectItem>
                <SelectItem value="Block">Block</SelectItem>
              </SelectContent>
            </Select>

            <Select value={testCaseType} onValueChange={setTestCaseType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Test Case Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Automated">Automated</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-40"
            />

            <Input
              placeholder="Filter text field"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-60"
            />
          </div>

          {/* Results Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module Name</TableHead>
                <TableHead>Test Summary</TableHead>
                <TableHead>Expected Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                  No results displayed yet
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Non Automated Cases
              </Button>
            </div>
            <div className="flex items-center gap-2">
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
              <span className="text-sm text-gray-600">0 of 0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
