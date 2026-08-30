import React, { useState, useEffect } from 'react';
import { getCardTapProfileApi } from '../api/profile';
import { recordTapApi } from '../api/analytics';
import ProfileView from '../components/profile/ProfileView';
import ClaimCardPage from './ClaimCardPage';
import InvalidCardPage from './InvalidCardPage';

export const CardTapHandler = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'profile' | 'claim' | 'invalid'
  const [invalidReason, setInvalidReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [cardUid, setCardUid] = useState('');

  useEffect(() => {
    // Parse cardUid and sig from window.location.pathname (/card/:cardUid) and search params (?sig=...)
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const cardMatch = pathname.match(/\/card\/([^\/]+)/);
    const handleMatch = pathname.match(/\/@?([^\/]+)/);
    
    let identifier = '';
    if (cardMatch) {
      identifier = cardMatch[1];
    } else if (searchParams.get('cardUid')) {
      identifier = searchParams.get('cardUid');
    } else if (searchParams.get('username')) {
      identifier = searchParams.get('username');
    } else if (handleMatch && handleMatch[1]) {
      identifier = handleMatch[1];
    }
    
    const sig = searchParams.get('sig') || '';
    const uid = identifier;
    setCardUid(uid);

    async function fetchTapProfile() {
      if (!uid) {
        setInvalidReason('unregistered_card');
        setErrorMessage('No card UID or identifier found in URL');
        setStatus('invalid');
        setLoading(false);
        return;
      }

      try {
        const response = await getCardTapProfileApi(uid, sig);
        setProfileData(response);
        setStatus('profile');
        // Record tap event asynchronously
        recordTapApi(uid, 'NFC Tap').catch(() => {});
      } catch (error) {
        const errPayload = error.data || {};
        const errCode = errPayload.error || '';

        if (error.status === 409 || errCode === 'unclaimed_card') {
          // 409 Conflict: Provisioned Unclaimed Card -> Redirect to /claim?cardUid=...
          const targetUid = errPayload.cardUid || uid;
          setCardUid(targetUid);
          setStatus('claim');
        } else if (error.status === 401 || errCode === 'invalid_signature') {
          // 401 Unauthorized: Invalid / Tampered Signature -> Redirect to /invalid-card?reason=tampered_signature
          setInvalidReason('tampered_signature');
          setErrorMessage(errPayload.message || 'Hardware card signature verification failed');
          setStatus('invalid');
        } else if (error.status === 404 || errCode === 'unregistered_card') {
          // 404 Not Found: Unregistered Card -> Redirect to /invalid-card?reason=unregistered_card
          setInvalidReason('unregistered_card');
          setErrorMessage(errPayload.message || 'This card has not been registered or provisioned in our system');
          setStatus('invalid');
        } else {
          // Fallback invalid error
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
