
import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { TestCaseDefinitions } from "@/components/TestCaseDefinitions";
import { AutomationMapping } from "@/components/AutomationMapping";
import { ReleaseMapping } from "@/components/ReleaseMapping";
import { TestCoverage } from "@/components/TestCoverage";
import { ExecutionReport } from "@/components/ExecutionReport";
import { TestCaseAddition } from "@/components/TestCaseAddition";
import { TestStepAddition } from "@/components/TestStepAddition";
import { Projects } from "@/components/Projects";
import { MyProfile } from "@/components/MyProfile";
import { Organisation } from "@/components/Organisation";
import { Pricing } from "@/components/Pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock, Users } from "lucide-react";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("overview");

  const renderContent = () => {
    switch (currentView) {
      case "test-definitions":
        return <TestCaseDefinitions />;
      case "automation-mapping":
        return <AutomationMapping />;
      case "release-mapping":
        return <ReleaseMapping />;
      case "test-coverage":
        return <TestCoverage />;
      case "execution":
        return <ExecutionReport />;
      case "test-case-addition":
        return <TestCaseAddition />;
      case "test-step-addition":
        return <TestStepAddition />;
      case "projects":
        return <Projects />;
      case "my-profile":
        return <MyProfile />;
      case "organisation":
        return <Organisation />;
      case "pricing":
        return <Pricing />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Test Cases</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">719</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Automated</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">6.54% coverage</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">22</div>
                  <p className="text-xs text-muted-foreground">3.06% remaining</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Active contributors</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Welcome to TestAuto Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get started by exploring your test cases and automation coverage. Use the sidebar to navigate between different modules.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Actions:</h3>
                  <ul className="text-blue-800 space-y-1">
                    <li>• View and manage test case definitions</li>
                    <li>• Map test cases to automation scripts</li>
                    <li>• Generate coverage and execution reports</li>
                    <li>• Manage team members and projects</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
