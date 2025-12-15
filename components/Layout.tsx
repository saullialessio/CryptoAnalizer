import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  Bell, 
  LogOut, 
  Menu,
  PieChart
} from 'lucide-react';
import { User } from '../types';
import Searchbar from './Searchbar';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
      active 
        ? 'text-blue-400 bg-blue-500/10 border-r-2 border-blue-500' 
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-30 transform transition-transform duration-200 ease-in-out lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <TrendingUp className="text-blue-500 mr-2" size={24} />
          <span className="text-xl font-bold tracking-tight text-white">FinDash</span>
        </div>

        <nav className="mt-6 space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={PieChart} 
            label="Markets" 
            active={activeTab === 'markets'} 
            onClick={() => setActiveTab('markets')} 
          />
          <SidebarItem 
            icon={Wallet} 
            label="Portfolio" 
            active={activeTab === 'portfolio'} 
            onClick={() => setActiveTab('portfolio')} 
          />
          <SidebarItem 
            icon={Bell} 
            label="Alerts" 
            active={activeTab === 'alerts'} 
            onClick={() => setActiveTab('alerts')} 
          />
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors w-full px-2 py-2"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center w-full max-w-2xl">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-4 text-slate-400 hover:text-white lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar with Autocomplete */}
            <div className="hidden md:block w-full max-w-md mr-4">
              <Searchbar />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-white">{user.username}</div>
                <div className="text-xs text-slate-400">{user.role}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                {user.username.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;