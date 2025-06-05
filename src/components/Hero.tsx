
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            Streamline Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Test Automation
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade test automation platform with role-based access, 
            intelligent test generation, and comprehensive reporting. 
            Transform your testing workflow today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg"
            >
              View Demo
            </Button>
          </div>
          
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 text-slate-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
