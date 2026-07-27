import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProfileData, mockCardFinishes, mockRecentLeads } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'signup' | 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default authenticated for demonstration
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('bloom_theme') === 'dark';
  });
  const [profile, setProfile] = useState(mockProfileData);
  const [isProUser, setIsProUser] = useState(true);
  const [selectedFinish, setSelectedFinish] = useState(mockCardFinishes[0]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTapSimulating, setIsTapSimulating] = useState(false);
  const [leads, setLeads] = useState(mockRecentLeads);
  const [isCardLinked, setIsCardLinked] = useState(true);
  const [activeCardUid, setActiveCardUid] = useState("BLM-9921-NFC");
  const [claimToast, setClaimToast] = useState({ show: false, message: '', uid: '' });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bloom_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bloom_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const loginUser = () => {
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  const checkUsernameAvailability = (username) => {
    const taken = ['admin', 'bloom', 'support', 'help', 'api'];
    return !taken.includes(username.toLowerCase().trim());
  };

  const claimAndLinkCard = (uid) => {
    const cardId = uid || ('BLM-' + Math.floor(1000 + Math.random() * 9000) + '-NFC');
    setIsCardLinked(true);
    setActiveCardUid(cardId);
    setProfile((prev) => ({
      ...prev,
      cardUid: cardId,
      stats: {
        ...prev.stats,
        totalTaps: prev.stats.totalTaps + 1,
        monthlyTaps: prev.stats.monthlyTaps + 1
      }
    }));
    setClaimToast({
      show: true,
      uid: cardId,
      message: `Card #${cardId} Claimed & Linked Immediately to @${profile.username || 'precious'}!`
    });
    setTimeout(() => {
      setClaimToast((prev) => ({ ...prev, show: false }));
    }, 4000);
    return cardId;
  };

  const triggerNfcTap = () => {
    setIsTapSimulating(true);
    setTimeout(() => {
      setIsTapSimulating(false);
      claimAndLinkCard(activeCardUid || 'BLM-9921-NFC');
    }, 1200);
  };

  const updateProfileField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSocialLink = (network, value) => {
    setProfile((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [network]: value
      }
    }));
  };

  const exportVCard = () => {
    const handleUrl = `https://bloom.app/@${profile.username || 'precious'}`;
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
ORG:${profile.company}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${handleUrl}
NOTE:${profile.bio}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(profile.username || profile.name).replace(/\s+/g, '_')}_BloomCard.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isAuthenticated,
        setIsAuthenticated,
        loginUser,
        logoutUser,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        profile,
        setProfile,
        isProUser,
        setIsProUser,
        checkUsernameAvailability,
        updateProfileField,
        updateSocialLink,
        cardFinishes: mockCardFinishes,
        selectedFinish,
        setSelectedFinish,
        isOrderModalOpen,
        setIsOrderModalOpen,
        isTapSimulating,
        triggerNfcTap,
        isCardLinked,
        activeCardUid,
        claimAndLinkCard,
        claimToast,
        leads,
        exportVCard
      }}
    >
      {children}
      
      {/* Toast Notification when Card is Claimed & Linked Immediately */}
      {claimToast.show && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <span className="font-bold text-sm">✓</span>
          </div>
          <div>
            <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">Tap Successful</span>
            <span className="text-xs font-bold text-white block">{claimToast.message}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
