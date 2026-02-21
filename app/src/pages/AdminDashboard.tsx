import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import AdminWebDevelopment from '../components/admin/AdminWebDevelopment';
import AdminBrandDesign from '../components/admin/AdminBrandDesign';
import AdminAIAutomation from '../components/admin/AdminAIAutomation';
import AdminEmailMarketing from '../components/admin/AdminEmailMarketing';

type Tab = 'web' | 'brand' | 'ai' | 'email';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('web');

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">You are not authorized to access this page</p>
          <button
            onClick={() => navigate('/admin')}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/2.5 sticky top-0 z-40">
        <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-white/60">{currentUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10">
        <div className="px-6 md:px-12 lg:px-20 flex gap-8">
          {[
            { id: 'web', label: 'Web Development', icon: '🌐' },
            { id: 'brand', label: 'Brand Design', icon: '🎨' },
            { id: 'ai', label: 'AI Automation', icon: '⚡' },
            { id: 'email', label: 'Email Marketing', icon: '📧' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-4 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 md:px-12 lg:px-20 py-8">
        {activeTab === 'web' && <AdminWebDevelopment />}
        {activeTab === 'brand' && <AdminBrandDesign />}
        {activeTab === 'ai' && <AdminAIAutomation />}
        {activeTab === 'email' && <AdminEmailMarketing />}
      </div>
    </div>
  );
};

export default AdminDashboard;
