import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, User, Mail, Phone, Globe, MapPin, Share2, MessageCircle,
  ExternalLink, CheckCircle2, ShieldCheck, Link as LinkIcon, Check, Copy, CreditCard, Sparkles
} from 'lucide-react';
import SocialIcon from '../ui/SocialIcon';
import ShareBackModal from '../ui/ShareBackModal';
import { saveContactToPhone } from '../../utils/vcard';
import { useApp } from '../../context/AppContext';

// Enlazer Primary Brand Theme: Enlazer Cyan Dark (#00BCFF & Deep Slate)
export const THEMES = {
  'dark-luxe': {
    name: 'Enlazer Cyan Dark',
    bg: 'bg-slate-950 text-white',
    glow: 'bg-[#00BCFF]/15',
    card: 'bg-slate-900/90 border-slate-800/80 text-white shadow-2xl',
    primaryBtn: 'bg-[#00BCFF] text-slate-950 hover:bg-cyan-400 font-bold shadow-[0_4px_25px_rgba(0,188,255,0.35)]',
    secondaryBtn: 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-white font-bold',
    itemBg: 'bg-slate-800/40',
    itemBorder: 'border-slate-700/50',
    itemHover: 'hover:bg-slate-800/80',
    textPrimary: 'text-white',
    textSecondary: 'text-[#00BCFF]',
    textMuted: 'text-slate-400',
    accentText: 'text-[#00BCFF]',
    socialBg: 'bg-slate-800/60',
    socialBorder: 'border-slate-700/60',
    socialHover: 'hover:bg-slate-700 hover:border-[#00BCFF]/60',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    footerText: 'text-slate-400',
    previewColor: '#00BCFF'
  }
};

export const TEMPLATES = [
  {
    id: 'corporate-pro',
    name: 'Corporate & Professionals',
    badge: 'Corporate',
    desc: 'For executives, consultants & team leads. Features verified company card, direct vCard download & corporate contact options.'
  }
];

const resolveSocialUrl = (network, rawValue) => {
  if (!rawValue) return '#';
  if (rawValue.startsWith('http://') || rawValue.startsWith('https://')) return rawValue;

  const cleanHandle = rawValue.replace(/^@/, '').trim();
  switch (network.toLowerCase()) {
    case 'whatsapp':
      return `https://wa.me/${cleanHandle.replace(/[^0-9]/g, '')}`;
    case 'twitter':
    case 'x':
      return `https://x.com/${cleanHandle}`;
    case 'instagram':
      return `https://instagram.com/${cleanHandle}`;
    case 'tiktok':
      return `https://tiktok.com/@${cleanHandle}`;
    case 'linkedin':
      return `https://linkedin.com/in/${cleanHandle}`;
    case 'calendly':
      return `https://calendly.com/${cleanHandle}`;
    case 'youtube':
      return `https://youtube.com/${cleanHandle.startsWith('@') ? cleanHandle : '@' + cleanHandle}`;
    case 'spotify':
      return `https://open.spotify.com/artist/${cleanHandle}`;
    case 'apple':
    case 'applemusic':
      return `https://music.apple.com/artist/${cleanHandle}`;
    default:
      return `https://${network}.com/${cleanHandle}`;
  }
};

export const ProfileView = ({ data }) => {
  const { setCurrentPage } = useApp() || {};
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedContact, setSavedContact] = useState(false);

  const profile = data || {
    name: "John Doe",
    username: "johndoe",
    title: "Product Lead & Executive",
    company: "Enlazer Global",
    bio: "Building next-generation digital networking tools & smart NFC business cards.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    email: "hello@enlazer.com.ng",
    phone: "+234 812 345 6789",
    website: "https://enlazer.cloud",
    location: "Lagos, Nigeria",
    theme: "dark-luxe",
    template: "corporate-pro",
    showEmail: true,
    socials: {
      linkedin: "johndoe",
      twitter: "johndoe",
      instagram: "johndoe.design",
      website: "https://enlazer.cloud"
    }
  };

  const themeKey = profile.theme || 'dark-luxe';
  const theme = THEMES[themeKey] || THEMES['dark-luxe'];

  const handleSaveContact = () => {
    saveContactToPhone(profile);
    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 3000);
  };

  const handleGetOwnCard = () => {
    if (setCurrentPage) {
      setCurrentPage('home');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors flex flex-col justify-between relative overflow-hidden py-4 sm:py-8 px-2 sm:px-6`}>
      {/* Background Ambient Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ${theme.glow} rounded-full blur-3xl pointer-events-none`} />

      {/* Top Bar Header */}
      <div className="max-w-md sm:max-w-lg mx-auto w-full flex items-center justify-between mb-4 sm:mb-6 px-1 sm:px-0 z-10">
        <div className="flex items-center gap-0.5">
          <span className={`text-xl font-black tracking-tight font-['Plus_Jakarta_Sans'] ${theme.textPrimary}`}>enlazer</span>
          <span className="text-xl font-black text-[#00BCFF]">.</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCFF]/10 border border-[#00BCFF]/30 text-[11px] font-bold text-[#00BCFF] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00BCFF]" />
          <span>Verified NFC Card</span>
        </div>
      </div>

      {/* Main Profile Container */}
      <div className="max-w-md sm:max-w-lg mx-auto w-full z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`${theme.card} backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 border relative overflow-hidden text-left`}
        >
          {/* CORPORATE & PROFESSIONALS PROFILE CARD */}
          <div className="space-y-5">
            {/* Header Info - Centered Avatar with Cyan Verification Badge */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mx-auto mb-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#00BCFF] shadow-xl p-0.5 bg-slate-950">
                  <img
                    src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* Verification Badge - Solid cyan circle with dark checkmark */}
                <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00BCFF] border-2 border-[#090D16] flex items-center justify-center shadow-lg" title="Verified NFC Card">
                  <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                </div>
              </div>

              {/* Centered Name, Role & Location */}
              <div className="space-y-1 w-full">
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme.textPrimary}`}>
                  {profile.name}
                </h1>
                {(profile.title || profile.company) && (
                  <p className="text-sm font-semibold text-[#00BCFF] flex items-center justify-center gap-1.5 flex-wrap">
                    <span>{profile.title}</span>
                    {profile.title && profile.company && <span>•</span>}
                    <span>{profile.company}</span>
                  </p>
                )}
                {profile.location && (
                  <p className={`text-xs ${theme.textMuted} flex items-center justify-center gap-1 pt-0.5`}>
                    <MapPin className="w-3.5 h-3.5 text-[#00BCFF] shrink-0" />
                    <span>{profile.location}</span>
                  </p>
                )}
              </div>
            </div>

            {profile.bio && (
              <p className={`text-xs sm:text-sm ${theme.textMuted} leading-relaxed text-left font-normal px-1`}>
                {profile.bio}
              </p>
            )}

            {/* Primary Actions */}
            <div className="space-y-3 pt-1">
              <button
                onClick={handleSaveContact}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm shadow-lg shadow-[#00BCFF]/20"
              >
                {savedContact ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                <span>{savedContact ? 'Contact Saved to Phone!' : 'Save Contact to Phone'}</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#00BCFF]" />
                <span>Share Your Info Back</span>
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-1">
              {profile.phone && (
                <div className={`p-3.5 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} flex items-center justify-between gap-3`}>
                  <div className="w-9.5 h-9.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-[#00BCFF] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={`tel:${profile.phone}`} className="text-xs font-bold text-white hover:text-[#00BCFF] transition-colors truncate block">
                      {profile.phone}
                    </a>
                  </div>
                  <a href={`tel:${profile.phone}`} className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {(profile.showEmail !== false && profile.email) && (
                <div className={`p-3.5 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} flex items-center justify-between gap-3`}>
                  <div className="w-9.5 h-9.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={`mailto:${profile.email}`} className="text-xs font-bold text-white hover:text-[#00BCFF] transition-colors truncate block">
                      {profile.email}
                    </a>
                  </div>
                  <a href={`mailto:${profile.email}`} className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {profile.customLinks && profile.customLinks.length > 0 && (
                <div className="space-y-2 pt-1">
                  {profile.customLinks.map((linkItem, idx) => (
                    <a
                      key={linkItem.id || idx}
                      href={linkItem.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-between p-3.5 rounded-2xl ${theme.itemBg} ${theme.itemHover} border ${theme.itemBorder} text-xs font-bold transition-colors ${theme.textPrimary}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <LinkIcon className="w-4 h-4 text-[#00BCFF] shrink-0" />
                        <span className="truncate">{linkItem.label}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Social Channels - FIND ME ELSEWHERE */}
            {profile.socials && Object.keys(profile.socials).length > 0 && (
              <div className="space-y-3 pt-3 text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">FIND ME ELSEWHERE</span>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {Object.entries(profile.socials).map(([network, value]) => {
                    if (!value) return null;
                    const linkUrl = resolveSocialUrl(network, value);
                    return (
                      <a
                        key={network}
                        href={linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                        title={network}
                      >
                        <SocialIcon platform={network} className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA Footer: Suggest users get their own Enlazer card & navigate back to marketing page */}
          <div className="pt-3 text-center mt-3">
            <button
              onClick={handleGetOwnCard}
              className="inline-flex items-center justify-center text-xs font-bold text-[#00BCFF] hover:text-cyan-300 hover:underline transition-all cursor-pointer py-1"
            >
              <span>Get Your Own Enlazer NFC Card & Wristband →</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Powered By */}
      <div className={`text-center pt-8 text-xs ${theme.footerText} z-10`}>
        Powered by <button onClick={handleGetOwnCard} className={`font-bold ${theme.textPrimary} hover:text-[#00BCFF] transition-colors cursor-pointer`}>Infarbloom</button> — IaaS Solutions
      </div>

      <ShareBackModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        ownerName={profile.name}
        cardUid={profile.cardUid}
        username={profile.username}
      />
    </div>
  );
};

export default ProfileView;

