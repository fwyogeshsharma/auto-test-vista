
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TA</span>
              </div>
              <span className="text-xl font-bold">TestAutomator</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              The most advanced test automation platform for modern development teams. 
              Streamline your testing workflow with intelligent automation.
            </p>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#careers" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#news" className="text-slate-400 hover:text-white transition-colors">News</a></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#terms" className="text-slate-400 hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#security" className="text-slate-400 hover:text-white transition-colors">Security</a></li>
              <li><a href="#compliance" className="text-slate-400 hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 TestAutomator. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              🐦
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              💼
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              🐙
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
