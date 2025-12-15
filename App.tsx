import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { User } from './types';
import { DashboardProvider } from './context/DashboardContext';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Mock user data from "backend"
    setUser({
      id: '1',
      username: 'Alex Trader',
      role: 'USER',
      email: 'alex@findash.com',
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated || !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardProvider>
      <Layout user={user} onLogout={handleLogout}>
        <Dashboard />
      </Layout>
    </DashboardProvider>
  );
};

export default App;