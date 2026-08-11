import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BarChart3, CreditCard, Users, Shield, ArrowLeft, LogOut, Plus, Rss } from 'lucide-react';
import ProfileEditorTab from './ProfileEditorTab';
import AnalyticsTab from './AnalyticsTab';
import CardManagementTab from './CardManagementTab';
import TeamManagementTab from './TeamManagementTab';
import BillingTab from './BillingTab';
import ActivateCardModal from '../onboarding/ActivateCardModal';
import { useApp } from '../../context/AppContext';

export const DashboardPage = () => {
  const { setCurrentPage, profile } = useApp();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'analytics' | 'cards' | 'team' | 'billing'
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors pb-20">
      
      {/* Dashboard Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center gap-0.5 group">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                bloom
              </span>
              <span className="text-2xl font-black text-[#00BCFF]">.</span>
              <span className="ml-2 text-xs font-bold uppercase tracking-wider text-slate-400">Dashboard</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActivationModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Activate New Card</span>
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 rounded-full text-slate-500 hover:text-rose-600 cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* User Identity Header Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{profile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold text-[10px]">
                  Business Member
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{profile.title} • {profile.company}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'cards'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Card Management</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'team'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'billing'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Billing & Subscriptions</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {activeTab === 'profile' && <ProfileEditorTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'cards' && <CardManagementTab />}
          {activeTab === 'team' && <TeamManagementTab />}
          {activeTab === 'billing' && <BillingTab />}
        </div>
      </main>

      {/* Onboarding Card Activation Modal */}
      <ActivateCardModal
        isOpen={isActivationModalOpen}
        onClose={() => setIsActivationModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
