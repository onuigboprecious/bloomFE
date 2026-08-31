import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, User, Mail, Phone, Globe, MapPin, Share2, MessageCircle,
  ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Building2, Briefcase, Calendar, Link as LinkIcon, Check, Copy, Send
} from 'lucide-react';
import SocialIcon from '../ui/SocialIcon';
import ShareBackModal from '../ui/ShareBackModal';
import { saveContactToPhone } from '../../utils/vcard';

const THEMES = {
  'dark-luxe': {
    bg: 'bg-slate-950 text-white',
    glow: 'bg-cyan-500/10',
    card: 'bg-slate-900/90 border-slate-800/80 text-white shadow-2xl',
    primaryBtn: 'bg-[#00BCFF] text-slate-950 hover:bg-cyan-400 font-bold shadow-[0_4px_20px_rgba(0,188,255,0.3)]',
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
    socialHover: 'hover:bg-slate-700 hover:border-cyan-500/50',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    footerText: 'text-slate-400'
  },
  'neon-cyber': {
    bg: 'bg-black text-cyan-400',
    glow: 'bg-cyan-500/20',
    card: 'bg-slate-950 border-cyan-500/40 text-white shadow-[0_0_35px_rgba(6,182,212,0.2)]',
    primaryBtn: 'bg-cyan-400 text-black hover:bg-cyan-300 font-black shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    secondaryBtn: 'bg-slate-900 hover:bg-slate-800 border-cyan-500/30 text-cyan-300 font-bold',
    itemBg: 'bg-slate-900/80',
    itemBorder: 'border-cyan-500/30',
    itemHover: 'hover:bg-slate-900 hover:border-cyan-400',
    textPrimary: 'text-white',
    textSecondary: 'text-cyan-300',
    textMuted: 'text-slate-400',
    accentText: 'text-cyan-400',
    socialBg: 'bg-slate-900',
    socialBorder: 'border-cyan-500/30',
    socialHover: 'hover:bg-slate-800 hover:border-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/40',
    footerText: 'text-cyan-500/70'
  },
  'sunset-amber': {
    bg: 'bg-amber-950 text-amber-100',
    glow: 'bg-amber-500/15',
    card: 'bg-amber-950/70 border-amber-500/30 text-amber-100 shadow-[0_10px_40px_rgba(245,158,11,0.15)]',
    primaryBtn: 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold shadow-[0_4px_20px_rgba(245,158,11,0.3)]',
    secondaryBtn: 'bg-amber-900/50 hover:bg-amber-900/80 border-amber-500/30 text-amber-100 font-bold',
    itemBg: 'bg-amber-900/30',
    itemBorder: 'border-amber-500/20',
    itemHover: 'hover:bg-amber-900/60',
    textPrimary: 'text-amber-50',
    textSecondary: 'text-amber-400',
    textMuted: 'text-amber-200/70',
    accentText: 'text-amber-400',
    socialBg: 'bg-amber-900/40',
    socialBorder: 'border-amber-500/30',
    socialHover: 'hover:bg-amber-900/80 hover:border-amber-400',
    badgeBg: 'bg-amber-950/80',
    badgeText: 'text-amber-200',
    badgeBorder: 'border-amber-500/30',
    footerText: 'text-amber-300/70'
  },
  'emerald-green': {
    bg: 'bg-emerald-950 text-emerald-100',
    glow: 'bg-emerald-500/15',
    card: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-100 shadow-[0_10px_40px_rgba(16,185,129,0.15)]',
    primaryBtn: 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-bold shadow-[0_4px_20px_rgba(16,185,129,0.3)]',
    secondaryBtn: 'bg-emerald-900/50 hover:bg-emerald-900/80 border-emerald-500/30 text-emerald-100 font-bold',
    itemBg: 'bg-emerald-900/30',
    itemBorder: 'border-emerald-500/20',
    itemHover: 'hover:bg-emerald-900/60',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-400',
    textMuted: 'text-emerald-200/70',
    accentText: 'text-emerald-400',
    socialBg: 'bg-emerald-900/40',
    socialBorder: 'border-emerald-500/30',
    socialHover: 'hover:bg-emerald-900/80 hover:border-emerald-400',
    badgeBg: 'bg-emerald-950/80',
    badgeText: 'text-emerald-200',
    badgeBorder: 'border-emerald-500/30',
    footerText: 'text-emerald-300/70'
  },
  'minimal-white': {
    bg: 'bg-slate-50 text-slate-900',
    glow: 'bg-cyan-500/5',
    card: 'bg-white border-slate-200 shadow-xl text-slate-900',
    primaryBtn: 'bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-md',
    secondaryBtn: 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900 font-bold',
    itemBg: 'bg-slate-50',
    itemBorder: 'border-slate-200',
    itemHover: 'hover:bg-slate-100',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-cyan-600',
    textMuted: 'text-slate-500',
    accentText: 'text-cyan-600',
    socialBg: 'bg-slate-100',
    socialBorder: 'border-slate-200',
    socialHover: 'hover:bg-slate-200 hover:border-slate-400',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-200',
    footerText: 'text-slate-600'
  }
};

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
    default:
      return `https://${network}.com/${cleanHandle}`;
  }
};

export const ProfileView = ({ data }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedContact, setSavedContact] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const profile = data || {
    name: "no data yet",
    username: "no data yet",
    title: "no data yet",
    company: "no data yet",
    bio: "no data yet",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    email: "no data yet",
    phone: "no data yet",
    website: "no data yet",
    location: "no data yet",
    theme: "dark-luxe",
    layout: "stack",
    showEmail: true,
    socials: {
      instagram: "precious.design",
      tiktok: "@precious_creator",
      twitter: "preciousonuigbo",
      website: "https://precious.design"
    }
  };

  const themeKey = profile.theme || 'dark-luxe';
  const theme = THEMES[themeKey] || THEMES['dark-luxe'];

  const handleSaveContact = () => {
    saveContactToPhone(profile);
    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyField = (fieldKey, textValue) => {
    if (!textValue) return;
    navigator.clipboard.writeText(textValue);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors flex flex-col justify-between relative overflow-hidden py-8 px-4`}>
      {/* Background Ambient Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ${theme.glow} rounded-full blur-3xl pointer-events-none`} />

      {/* Top Bar Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between mb-6 z-10">
        <div className="flex items-center gap-0.5">
          <span className={`text-xl font-black tracking-tight font-['Plus_Jakarta_Sans'] ${theme.textPrimary}`}>enlazer</span>
          <span className="text-xl font-black text-[#00BCFF]">.</span>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} text-[10px] font-bold ${theme.badgeText} shadow-xs`}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>verified card</span>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="max-w-md mx-auto w-full z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`${theme.card} backdrop-blur-xl rounded-3xl p-6 sm:p-7 border relative overflow-hidden space-y-5 text-left`}
        >
          {/* Avatar & Info Row (Side-by-side) */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-lg shrink-0">
              <img
                src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.textPrimary} truncate`}>
                {profile.name}
              </h1>
              {(profile.title || profile.company) && (
                <p className={`text-xs font-semibold ${theme.textSecondary} truncate`}>
                  {profile.title} {profile.company ? `· ${profile.company}` : ''}
                </p>
              )}
              {profile.location && (
                <p className={`text-xs ${theme.textMuted} flex items-center gap-1.5 pt-0.5`}>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </p>
              )}
            </div>
          </div>

          {/* Bio Text */}
          {profile.bio && (
            <p className={`text-xs ${theme.textMuted} leading-relaxed font-normal`}>
              {profile.bio}
            </p>
          )}

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handleSaveContact}
              className={`w-full py-3 px-4 rounded-2xl ${theme.primaryBtn} flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
            >
              {savedContact ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-950" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{savedContact ? 'Contact Saved to Phone!' : 'Save contact'}</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className={`w-full py-3 px-4 rounded-2xl ${theme.secondaryBtn} border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share your info back</span>
            </button>
          </div>

          {/* Direct Contact Cards (Phone & Email) */}
          <div className="space-y-3 pt-1">
            {profile.phone && (
              <div className={`p-3 sm:p-3.5 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} flex items-center justify-between gap-3`}>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[#00BCFF] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">PHONE</span>
                  <a href={`tel:${profile.phone}`} className="text-xs font-bold text-white hover:text-cyan-400 transition-colors truncate block">
                    {profile.phone}
                  </a>
                </div>
                <button
                  onClick={() => handleCopyField('phone', profile.phone)}
                  className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Email Card - Only shown if profile.showEmail !== false AND profile.email exists */}
            {(profile.showEmail !== false && profile.email) && (
              <div className={`p-3 sm:p-3.5 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} flex items-center justify-between gap-3`}>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[#00BCFF] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">EMAIL</span>
                  <a href={`mailto:${profile.email}`} className="text-xs font-bold text-white hover:text-cyan-400 transition-colors truncate block">
                    {profile.email}
                  </a>
                </div>
                <button
                  onClick={() => handleCopyField('email', profile.email)}
                  className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy Email Address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Custom Bio Linktree Buttons */}
            {profile.customLinks && profile.customLinks.length > 0 && (
              <div className="space-y-2 pt-1">
                {profile.customLinks.map((linkItem, idx) => (
                  <a
                    key={linkItem.id || idx}
                    href={linkItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-2xl ${theme.itemBg} ${theme.itemHover} border ${theme.itemBorder} text-xs font-bold transition-colors ${theme.textPrimary}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <LinkIcon className="w-4 h-4 text-[#00BCFF] shrink-0" />
                      <span className="truncate">{linkItem.label}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* FIND ME ELSEWHERE Social Pills */}
          {profile.socials && Object.keys(profile.socials).length > 0 && (
            <div className="space-y-2.5 pt-2">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block">FIND ME ELSEWHERE</span>
              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(profile.socials).map(([network, value]) => {
                  if (!value) return null;
                  const linkUrl = resolveSocialUrl(network, value);
                  const netLabel = network.toLowerCase() === 'x' || network.toLowerCase() === 'twitter'
                    ? 'X'
                    : network.charAt(0).toUpperCase() + network.slice(1);
                  return (
                    <a
                      key={network}
                      href={linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 hover:border-cyan-500/40 rounded-full px-3.5 py-1.5 text-xs text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <SocialIcon platform={network} className="w-3.5 h-3.5 shrink-0" />
                      <span>{netLabel}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Share Profile Link Footer */}
          <div className="pt-2 text-center">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Share this profile</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Powered By */}
      <div className={`text-center pt-8 text-xs ${theme.footerText} z-10`}>
        Powered by <span className={`font-bold ${theme.textPrimary}`}>enlazer.com.ng</span> — smart NFC technology
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
