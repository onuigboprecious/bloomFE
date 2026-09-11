import React, { useState, useEffect } from 'react';
import { getCardTapProfileApi, getPublicProfileApi } from '../api/profile';
import { recordTapApi } from '../api/analytics';
import ProfileView from '../components/profile/ProfileView';
import ClaimCardPage from './ClaimCardPage';
import InvalidCardPage from './InvalidCardPage';
import { mockProfileData } from '../data/mockData';

export const CardTapHandler = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'profile' | 'claim' | 'invalid'
  const [invalidReason, setInvalidReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [cardUid, setCardUid] = useState('');

  useEffect(() => {
    // Parse cardUid, handle, and sig from window.location.pathname (/card/:cardUid, /@username, /profile/:username)
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    const cardMatch = pathname.match(/\/card\/([^\/]+)/);
    const atHandleMatch = pathname.match(/\/@([^\/]+)/);
    const profileHandleMatch = pathname.match(/\/profile\/([^\/]+)/);
    const rootHandleMatch = pathname.match(/^\/([a-zA-Z0-9_\-]+)$/);
    
    const reservedPaths = ['/login', '/signup', '/dashboard', '/onboarding', '/claim', '/invalid-card', '/reset-password', '/forgot-password', '/cards', '/wristbands', '/about', '/press', '/support', '/legal', '/privacy', '/terms', '/security', '/returns'];
    
    let identifier = '';
    let isHandle = false;

    if (cardMatch && cardMatch[1]) {
      identifier = cardMatch[1];
    } else if (atHandleMatch && atHandleMatch[1]) {
      identifier = atHandleMatch[1];
      isHandle = true;
    } else if (profileHandleMatch && profileHandleMatch[1]) {
      identifier = profileHandleMatch[1];
      isHandle = true;
    } else if (rootHandleMatch && rootHandleMatch[1] && !reservedPaths.includes(pathname.toLowerCase())) {
      identifier = rootHandleMatch[1];
      isHandle = true;
    } else if (searchParams.get('cardUid')) {
      identifier = searchParams.get('cardUid');
    } else if (searchParams.get('username')) {
      identifier = searchParams.get('username');
      isHandle = true;
    }
    
    const cleanUid = identifier.replace(/^@/, '').trim();
    const sig = searchParams.get('sig') || '';
    setCardUid(cleanUid || identifier);

    async function fetchTapProfile() {
      // 1. INSTANT ZERO-LATENCY CACHE CHECK (Stale-While-Revalidate)
      const cacheKey = cleanUid ? `enlazer_prof_cache_${cleanUid.toLowerCase()}` : null;
      let cachedProfile = null;

      if (cacheKey) {
        try {
          const stored = sessionStorage.getItem(cacheKey) || localStorage.getItem(cacheKey);
          if (stored) {
            cachedProfile = JSON.parse(stored);
          }
        } catch (e) {}
      }

      // Check logged-in user profile in localStorage
      let localProfile = null;
      try {
        const saved = localStorage.getItem('bloom_profile');
        if (saved) localProfile = JSON.parse(saved);
      } catch (e) {}

      if (
        !cachedProfile &&
        localProfile &&
        cleanUid &&
        (localProfile.username?.toLowerCase() === cleanUid.toLowerCase() ||
         localProfile.cardUid === cleanUid)
      ) {
        cachedProfile = localProfile;
      }

      // Check mock profile data match
      if (
        !cachedProfile &&
        cleanUid &&
        mockProfileData &&
        (mockProfileData.username?.toLowerCase() === cleanUid.toLowerCase() ||
         mockProfileData.cardUid === cleanUid)
      ) {
        cachedProfile = mockProfileData;
      }

      // FAST PATH: If cached profile exists, render INSTANTLY (0ms delay!) and revalidate in background
      if (cachedProfile) {
        setProfileData(cachedProfile);
        setStatus('profile');
        setLoading(false);

        // Preload avatar image
        if (cachedProfile.avatar) {
          const img = new Image();
          img.src = cachedProfile.avatar;
        }

        // Fire-and-forget background analytics record
        recordTapApi(cleanUid, 'NFC Tap').catch(() => {});

        // Background revalidation
        if (cleanUid) {
          const fetchPromise = isHandle ? getPublicProfileApi(cleanUid, sig) : getCardTapProfileApi(cleanUid, sig);
          fetchPromise
            .then((fresh) => {
              if (fresh) {
                setProfileData(fresh);
                if (cacheKey) {
                  try {
                    sessionStorage.setItem(cacheKey, JSON.stringify(fresh));
                    localStorage.setItem(cacheKey, JSON.stringify(fresh));
                  } catch (e) {}
                }
              }
            })
            .catch(() => {});
        }
        return;
      }

      if (!cleanUid) {
        if (localProfile && localProfile.username) {
          setProfileData(localProfile);
          setStatus('profile');
          setLoading(false);
          return;
        }
        setInvalidReason('unregistered_card');
        setErrorMessage('No profile handle or card identifier found in URL');
        setStatus('invalid');
        setLoading(false);
        return;
      }

      // 2. NETWORK FETCH WITH FAST TIMEOUT FALLBACK (For first-time taps)
      try {
        recordTapApi(cleanUid, 'NFC Tap').catch(() => {});

        // Fetch with a 3.5s timeout so user is never stuck waiting for sleeping backend
        const fetchPromise = isHandle ? getPublicProfileApi(cleanUid, sig) : getCardTapProfileApi(cleanUid, sig);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT')), 3500)
        );

        let response;
        try {
          response = await Promise.race([fetchPromise, timeoutPromise]);
        } catch (raceErr) {
          if (raceErr.message === 'TIMEOUT') {
            // If backend is sleeping/timing out, use local or mock fallback immediately
            response = localProfile || mockProfileData;
          } else {
            throw raceErr;
          }
        }

        setProfileData(response);
        setStatus('profile');

        // Cache response for future instant taps
        if (cacheKey && response) {
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(response));
            localStorage.setItem(cacheKey, JSON.stringify(response));
          } catch (e) {}
        }

        if (response?.avatar) {
          const img = new Image();
          img.src = response.avatar;
        }
      } catch (error) {
        // Fallback to mock profile if mock handle matches
        if (mockProfileData && mockProfileData.username?.toLowerCase() === cleanUid.toLowerCase()) {
          setProfileData(mockProfileData);
          setStatus('profile');
          setLoading(false);
          return;
        }

        // Fallback to local profile if available
        if (localProfile) {
          setProfileData(localProfile);
          setStatus('profile');
          setLoading(false);
          return;
        }

        const errPayload = error.data || {};
        const errCode = errPayload.error || '';

        if (error.status === 409 || errCode === 'unclaimed_card') {
          const targetUid = errPayload.cardUid || cleanUid;
          setCardUid(targetUid);
          setStatus('claim');
        } else if (error.status === 401 || errCode === 'invalid_signature') {
          setInvalidReason('tampered_signature');
          setErrorMessage(errPayload.message || 'Hardware card signature verification failed');
          setStatus('invalid');
        } else if (error.status === 404 || errCode === 'unregistered_card') {
          setInvalidReason('unregistered_card');
          setErrorMessage(errPayload.message || 'This profile card has not been registered in our system');
          setStatus('invalid');
        } else {
          setInvalidReason('unregistered_card');
          setErrorMessage(errPayload.message || error.message || 'Unrecognized card response');
          setStatus('invalid');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTapProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
        {/* Top Header Skeleton */}
        <div className="max-w-md w-full flex items-center justify-between py-2 z-10">
          <div className="flex items-center gap-0.5">
            <span className="text-xl font-black tracking-tight font-['Plus_Jakarta_Sans'] text-white">enlazer</span>
            <span className="text-xl font-black text-[#00BCFF]">.</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCFF]/10 border border-[#00BCFF]/30 text-[11px] font-bold text-[#00BCFF] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#00BCFF] animate-ping" />
            <span>Connecting NFC...</span>
          </div>
        </div>

        {/* Profile Card Instant Skeleton Loader */}
        <div className="max-w-md w-full my-auto z-10">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#00BCFF]/40 bg-slate-800 animate-pulse p-1" />
              <div className="space-y-2 w-full flex flex-col items-center">
                <div className="w-44 h-6 bg-slate-800 rounded-lg animate-pulse" />
                <div className="w-32 h-4 bg-slate-800/60 rounded-md animate-pulse" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="w-full h-12 rounded-2xl bg-[#00BCFF]/20 border border-[#00BCFF]/30 animate-pulse flex items-center justify-center">
                <span className="text-xs font-bold text-[#00BCFF] tracking-wider uppercase">Loading Profile Tap...</span>
              </div>
              <div className="w-full h-12 rounded-2xl bg-slate-800/50 border border-slate-800 animate-pulse" />
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="w-full h-11 rounded-2xl bg-slate-800/40 border border-slate-800/60 animate-pulse" />
              <div className="w-full h-11 rounded-2xl bg-slate-800/40 border border-slate-800/60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="text-xs text-slate-500 text-center py-4 z-10">
          Enlazer Smart NFC Platform
        </div>
      </div>
    );
  }

  if (status === 'profile') {
    return <ProfileView data={profileData} />;
  }

  if (status === 'claim') {
    return <ClaimCardPage cardUid={cardUid} />;
  }

  return <InvalidCardPage reason={invalidReason} message={errorMessage} />;
};

export default CardTapHandler;
