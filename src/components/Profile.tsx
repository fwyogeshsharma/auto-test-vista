
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProfileProps {
  activeTab: string;
  userRole: 'admin' | 'tester' | 'viewer';
}

const Profile = ({ activeTab, userRole }: ProfileProps) => {
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@techcorp.com',
    role: userRole,
    joinDate: 'January 2023',
    lastLogin: '2 hours ago',
    testsCreated: 156,
    projectsAccess: 4
  };

  const organisation = {
    name: 'TechCorp Solutions',
    industry: 'Software Development',
    size: '500-1000 employees',
    plan: 'Enterprise',
    members: 45,
    projects: 12,
    subscription: 'Active until Dec 2024'
  };

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      features: ['Up to 5 users', '3 projects', 'Basic reporting', 'Email support'],
      current: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      features: ['Up to 25 users', '10 projects', 'Advanced reporting', 'Priority support', 'API access'],
      current: false
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: 'per month',
      features: ['Unlimited users', 'Unlimited projects', 'Custom reporting', '24/7 support', 'Full API access', 'SSO integration'],
      current: true
    }
  ];

  if (activeTab === 'profile') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-600 mt-1">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <Badge className={`inline-block ${
                    userRole === 'admin' ? 'bg-red-100 text-red-800' :
                    userRole === 'tester' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Join Date</label>
                  <p className="text-slate-900">{userProfile.joinDate}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Last Login</p>
                <p className="font-medium">{userProfile.lastLogin}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Tests Created</p>
                <p className="font-medium">{userProfile.testsCreated}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Projects Access</p>
                <p className="font-medium">{userProfile.projectsAccess}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'organisation') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Organisation</h1>
          <p className="text-slate-600 mt-1">Organisation details and settings</p>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Organisation Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-600">Organisation Name</p>
              <p className="font-medium text-lg">{organisation.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Industry</p>
              <p className="font-medium">{organisation.industry}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Company Size</p>
              <p className="font-medium">{organisation.size}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Current Plan</p>
              <Badge className="bg-purple-100 text-purple-800">{organisation.plan}</Badge>
            </div>
            <div>
              <p className="text-sm text-slate-600">Team Members</p>
              <p className="font-medium">{organisation.members}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Projects</p>
              <p className="font-medium">{organisation.projects}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div>
              <p className="text-sm text-slate-600">Subscription Status</p>
              <p className="font-medium text-green-600">{organisation.subscription}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (activeTab === 'pricing') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pricing Plans</h1>
          <p className="text-slate-600 mt-1">Choose the plan that best fits your team's needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`p-6 ${plan.current ? 'border-blue-500 shadow-lg' : ''}`}>
              {plan.current && (
                <Badge className="bg-blue-100 text-blue-800 mb-4">Current Plan</Badge>
              )}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-600 ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                    <span className="w-4 h-4 text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.current 
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Profile;
