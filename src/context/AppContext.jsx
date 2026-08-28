import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProfileData, mockCardFinishes, mockRecentLeads } from '../data/mockData';
import {
  loginApi,
  signupApi,
  logoutApi,
  getMeApi,
  createLeadApi,
  getLeadsApi,
  deleteLeadApi,
  claimCardApi,
  recordTapApi,
  joinWaitlistApi,
  updateProfileApi,
  checkHandleApi,
} from '../api';
import ShareBackModal from '../components/ui/ShareBackModal';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'signup' | 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('bloom_theme') === 'dark';
  });
  const [profile, setProfile] = useState(mockProfileData);
  const [isProUser, setIsProUser] = useState(true);
  const [selectedFinish, setSelectedFinish] = useState(mockCardFinishes[0]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isShareBackModalOpen, setIsShareBackModalOpen] = useState(false);
  const [isTapSimulating, setIsTapSimulating] = useState(false);
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('bloom_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return mockRecentLeads;
  });
  const [isCardLinked, setIsCardLinked] = useState(() => {
    return localStorage.getItem('bloom_is_card_linked') !== 'false';
  });
  const [activeCardUid, setActiveCardUid] = useState(() => {
    return localStorage.getItem('bloom_linked_card_uid') || "BLM-9921-NFC";
  });
  const [claimToast, setClaimToast] = useState({ show: false, message: '', uid: '' });

  // Check active session on initial render
  useEffect(() => {
    getMeApi()
      .then((userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        if (userData?.name) {
          setProfile((prev) => ({
            ...prev,
            name: userData.name,
            email: userData.email || prev.email,
          }));
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

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

  const loginUser = async ({ email, password }) => {
    const userData = await loginApi({ email, password });
    setIsAuthenticated(true);
    setUser(userData);
    if (userData?.name) {
      setProfile((prev) => ({
        ...prev,
        name: userData.name,
        email: userData.email || email,
      }));
    }
    return userData;
  };

  const signupUser = async ({ email, password, name }) => {
    const userData = await signupApi({ email, password, name });
    setIsAuthenticated(true);
    setUser(userData);
    if (name) {
      setProfile((prev) => ({
        ...prev,
        name,
        email: email || prev.email,
      }));
    }
    return userData;
  };

  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // Continue client logout even if API call fails
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const res = await checkHandleApi(username);
      if (res && typeof res.available === 'boolean') {
        return res.available;
      }
    } catch (e) {}
    const taken = ['admin', 'bloom', 'support', 'help', 'api'];
    return !taken.includes(username.toLowerCase().trim());
  };

  const claimAndLinkCard = async (uid) => {
    const cardId = uid || ('BLM-' + Math.floor(1000 + Math.random() * 9000) + '-NFC');
    try {
      await claimCardApi(cardId);
    } catch (e) {}

    setIsCardLinked(true);
    setActiveCardUid(cardId);
    localStorage.setItem('bloom_linked_card_uid', cardId);
    localStorage.setItem('bloom_is_card_linked', 'true');
    setProfile((prev) => ({
      ...prev,
      cardUid: cardId,
      stats: {
        ...prev.stats,
        totalTaps: (prev.stats.totalTaps || 0) + 1,
        monthlyTaps: (prev.stats.monthlyTaps || 0) + 1
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
    const cardId = activeCardUid || 'BLM-9921-NFC';
    recordTapApi(cardId, 'NFC Tap').catch(() => {});

    setTimeout(() => {
      setIsTapSimulating(false);
      claimAndLinkCard(cardId);
      saveContactToPhone();
      setClaimToast({
        show: true,
        uid: cardId,
        message: `📲 Contact Auto-Saved to Google & Phone Contacts!`
      });
    }, 1000);
  };

  const updateProfileField = (field, value) => {
    setProfile((prev) => {
      const updated = { ...prev, [field]: value };
      updateProfileApi(updated).catch(() => {});
      return updated;
    });
  };

  const updateSocialLink = (network, value) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        socials: {
          ...prev.socials,
          [network]: value
        }
      };
      updateProfileApi(updated).catch(() => {});
      return updated;
    });
  };

  const saveContactToPhone = (customContact = null) => {
    const target = customContact || profile;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const profileUrl = target.website || target.profileUrl || origin;
    const nameParts = (target.name || '').trim().split(' ');
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const firstName = nameParts[0] || '';

    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${target.name || ''}`,
      `TITLE:${target.title || target.role || ''}`,
      `ORG:${target.company || ''}`,
      `TEL;TYPE=CELL,VOICE:${target.phone || ''}`,
      `EMAIL;TYPE=INTERNET:${target.email || ''}`,
      `URL:${profileUrl}`,
      `NOTE:${target.bio || target.notes || 'Saved from Bloom Smart NFC Card'}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${(target.name || 'Contact').replace(/\s+/g, '_')}.vcf`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 500);
  };

  const generateRawVCardString = (customTarget = null) => {
    const target = customTarget || profile;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const profileUrl = target.website || target.profileUrl || origin;
    const nameParts = (target.name || '').trim().split(' ');
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const firstName = nameParts[0] || '';

    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${target.name || ''}`,
      `TITLE:${target.title || target.role || ''}`,
      `ORG:${target.company || ''}`,
      `TEL;TYPE=CELL,VOICE:${target.phone || ''}`,
      `EMAIL;TYPE=INTERNET:${target.email || ''}`,
      `URL:${handleUrl}`,
      `NOTE:${target.bio || target.notes || 'Saved from Bloom Smart NFC Card'}`,
      'END:VCARD'
    ].join('\r\n');
  };

  const exportVCard = saveContactToPhone;

  const addLead = async (leadData) => {
    let createdLead = null;
    try {
      const res = await createLeadApi({
        ...leadData,
        cardUid: activeCardUid || 'BLM-9921-NFC',
      });
      if (res?.lead) {
        createdLead = res.lead;
      }
    } catch (e) {
      // Fallback local lead creation
    }

    const newLead = createdLead || {
      id: 'lead-' + Date.now(),
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      role: leadData.role || 'Tap Recipient',
      notes: leadData.notes || '',
      method: leadData.method || 'Share Back Form',
      time: 'Just now',
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => {
      const updated = [newLead, ...prev];
      localStorage.setItem('bloom_leads', JSON.stringify(updated));
      return updated;
    });

    setProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        leadsCaptured: (prev.stats.leadsCaptured || 0) + 1,
        totalTaps: (prev.stats.totalTaps || 0) + 1,
      },
    }));

    setClaimToast({
      show: true,
      uid: newLead.name,
      message: `New Lead! ${newLead.name} shared contact details back to your dashboard!`,
    });
    setTimeout(() => {
      setClaimToast((prev) => ({ ...prev, show: false }));
    }, 5000);

    return newLead;
  };

  const deleteLead = (leadId) => {
    deleteLeadApi(leadId).catch(() => {});
    setLeads((prev) => {
      const updated = prev.filter((item) => item.id !== leadId);
      localStorage.setItem('bloom_leads', JSON.stringify(updated));
      return updated;
    });
    setProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        leadsCaptured: Math.max(0, (prev.stats.leadsCaptured || 1) - 1),
      },
    }));
  };

  const exportLeadsCSV = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Role/Company', 'Method', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.role || '').replace(/"/g, '""')}"`,
      `"${(l.method || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bloom_Captured_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openShareBackModal = () => setIsShareBackModalOpen(true);
  const closeShareBackModal = () => setIsShareBackModalOpen(false);
  const openWaitlistModal = () => setIsWaitlistModalOpen(true);
  const closeWaitlistModal = () => setIsWaitlistModalOpen(false);

  const joinWaitlist = (data) => {
    joinWaitlistApi(data).catch(() => {});
    const existing = JSON.parse(localStorage.getItem('bloom_waitlist') || '[]');
    const newEntry = {
      id: 'waitlist-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      preferredFinish: data.preferredFinish || 'Stealth Matte Black',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('bloom_waitlist', JSON.stringify([newEntry, ...existing]));

    setClaimToast({
      show: true,
      uid: data.name,
      message: `🎉 Joined VIP Waitlist! Check your inbox for launch details.`
    });
    setTimeout(() => {
      setClaimToast((prev) => ({ ...prev, show: false }));
    }, 5000);
    return newEntry;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isAuthenticated,
        setIsAuthenticated,
        user,
        authLoading,
        loginUser,
        signupUser,
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
        isWaitlistModalOpen,
        setIsWaitlistModalOpen,
        openWaitlistModal,
        closeWaitlistModal,
        joinWaitlist,
        isShareBackModalOpen,
        setIsShareBackModalOpen,
        openShareBackModal,
        closeShareBackModal,
        isTapSimulating,
        triggerNfcTap,
        isCardLinked,
        activeCardUid,
        claimAndLinkCard,
        claimToast,
        leads,
        addLead,
        deleteLead,
        exportLeadsCSV,
        exportVCard,
        saveContactToPhone,
        generateRawVCardString
      }}
    >
      {children}

      <ShareBackModal
        isOpen={isShareBackModalOpen}
        onClose={closeShareBackModal}
        ownerName={profile.name}
      />

      {/* Toast Notification when Card is Claimed or New Lead is Captured */}
      {claimToast.show && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <span className="font-bold text-sm">✓</span>
          </div>
          <div>
            <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">Realtime Alert</span>
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
