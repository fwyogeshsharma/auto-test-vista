
import React from 'react';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: "Smart Test Generation",
      description: "Import .java files and automatically generate comprehensive test modules and cases with AI-powered analysis.",
      icon: "🤖",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Manual Test Import",
      description: "Seamlessly import existing manual test cases from CSV or Excel files with intelligent mapping and validation.",
      icon: "📋",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Role-Based Access",
      description: "Granular permission control for different team roles - admins, testers, and viewers with customized access levels.",
      icon: "🔐",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Test Coverage Analytics",
      description: "Comprehensive coverage reports with visual insights into code coverage, test distribution, and gap analysis.",
      icon: "📊",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Execution Monitoring",
      description: "Real-time test execution tracking with detailed logs, performance metrics, and failure analysis.",
      icon: "⚡",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Project Management",
      description: "Organize tests by projects with hierarchical structure, team assignments, and progress tracking.",
      icon: "🏗️",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      title: "Advanced Reporting",
      description: "Generate detailed reports for stakeholders with customizable dashboards and scheduled delivery options.",
      icon: "📈",
      gradient: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Powerful Features for Modern Testing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to build, manage, and scale your test automation strategy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:scale-105">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
