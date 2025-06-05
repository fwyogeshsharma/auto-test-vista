
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Users, Calendar } from "lucide-react";

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("team");

  const teamMembers = [
    { username: "alok.faber", name: "Alok Faber", role: "Software QA" },
    { username: "deepa.faber", name: "Deepa Faber", role: "Developer" },
    { username: "admin.user", name: "Admin User", role: "Project Admin" },
    { username: "lead.dev", name: "Lead Developer", role: "Project Lead" }
  ];

  const sidebarItems = [
    { id: "team", label: "Team", icon: Users },
    { id: "release", label: "Release", icon: Calendar },
    { id: "environments", label: "Environments" },
    { id: "modules", label: "Modules" },
    { id: "column-mapping", label: "Column Mapping" },
    { id: "integrations", label: "Integrations" }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(item.id)}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {activeTab === "team" ? "Team Management" : "Project Configuration"}
                </CardTitle>
                {activeTab === "team" && (
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add team member
                  </Button>
                )}
              </div>
              <p className="text-gray-600">DeviceDriver - Dellemcsonic</p>
            </CardHeader>
            <CardContent>
              {activeTab === "team" ? (
                <div className="space-y-4">
                  <div className="border rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-4 text-left text-sm font-medium text-gray-700">Username</th>
                          <th className="p-4 text-left text-sm font-medium text-gray-700">Name</th>
                          <th className="p-4 text-left text-sm font-medium text-gray-700">Role</th>
                          <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member, index) => (
                          <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="p-4 text-sm">{member.username}</td>
                            <td className="p-4 text-sm font-medium">{member.name}</td>
                            <td className="p-4">
                              <Badge 
                                variant={member.role === "Project Admin" ? "default" : "secondary"}
                                className={member.role === "Project Admin" ? "bg-blue-600" : ""}
                              >
                                {member.role}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" title="Edit Member">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" title="Remove Member" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Configuration options for {activeTab} will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
