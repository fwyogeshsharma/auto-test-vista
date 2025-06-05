
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TA</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TestAutomator
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#blogs" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Blogs
              </a>
              <a href="#resources" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Resources
              </a>
              <a href="#support" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Support
              </a>
            </nav>
          </div>

          {/* Right side - Login and Demo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onLoginClick}
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
