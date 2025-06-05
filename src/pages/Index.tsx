
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'tester' | 'viewer'>('tester');

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would connect to backend
    setIsLoggedIn(true);
    setShowLoginModal(false);
    // Set role based on email for demo purposes
    if (email.includes('admin')) {
      setUserRole('admin');
    } else if (email.includes('viewer')) {
      setUserRole('viewer');
    } else {
      setUserRole('tester');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('tester');
  };

  if (isLoggedIn) {
    return <Dashboard userRole={userRole} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onLoginClick={() => setShowLoginModal(true)} />
      <Hero onGetStarted={() => setShowLoginModal(true)} />
      <Features />
      <Footer />
      
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default Index;
