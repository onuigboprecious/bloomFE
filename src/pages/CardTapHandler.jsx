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
      // Check local storage profile first
      let localProfile = null;
      try {
        const saved = localStorage.getItem('bloom_profile');
        if (saved) {
          localProfile = JSON.parse(saved);
        }
      } catch (e) {}

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

      // If viewing current user's profile handle or cardUid locally
      if (
        localProfile &&
        (localProfile.username?.toLowerCase() === cleanUid.toLowerCase() ||
         localProfile.cardUid === cleanUid)
      ) {
        setProfileData(localProfile);
        setStatus('profile');
        setLoading(false);
        recordTapApi(cleanUid, 'NFC Tap').catch(() => {});
        return;
      }

      try {
        let response;
        if (isHandle) {
          try {
            response = await getPublicProfileApi(cleanUid, sig);
          } catch (err) {
            response = await getCardTapProfileApi(cleanUid, sig);
          }
        } else {
          response = await getCardTapProfileApi(cleanUid, sig);
        }
        setProfileData(response);
        setStatus('profile');
        recordTapApi(cleanUid, 'NFC Tap').catch(() => {});
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
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4 p-4">
        <div className="w-12 h-12 border-4 border-[#00BCFF] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Verifying Hardware NFC Signature...</p>
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
