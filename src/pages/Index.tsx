
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, Settings, BarChart, Shield, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Test Case Management",
      description: "Organize and manage your test cases with intuitive hierarchical structure and advanced filtering capabilities."
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      title: "Automation Mapping",
      description: "Seamlessly map your manual test cases to automated test scripts with our intelligent mapping system."
    },
    {
      icon: <BarChart className="w-8 h-8 text-blue-600" />,
      title: "Advanced Reports",
      description: "Generate comprehensive reports on test coverage, execution status, and automation progress."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Team Collaboration",
      description: "Enable seamless collaboration across teams with role-based access control and project management."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Release Management",
      description: "Track test cases across different releases and manage version-specific testing requirements."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Real-time Execution",
      description: "Monitor test execution in real-time with detailed status tracking and instant notifications."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Multi-Environment Support",
      description: "Test across multiple environments with centralized configuration and environment management."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TA</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">TestAuto</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blogs</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Support</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/demo')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Next-Generation
              <span className="text-blue-600 block">Test Automation Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your testing process with our comprehensive role-based automation platform. 
              Manage test cases, track coverage, and accelerate your release cycles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/demo')}
                className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Testing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage, automate, and scale your testing operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 6).map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Feature Card */}
          <div className="mt-8 flex justify-center">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md max-w-md">
              <CardContent className="p-6">
                <div className="mb-4">{features[6].icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{features[6].title}</h3>
                <p className="text-gray-600">{features[6].description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TA</span>
                </div>
                <span className="ml-2 text-xl font-bold">TestAuto</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering teams to deliver quality software through intelligent test automation and comprehensive reporting.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TestAuto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
