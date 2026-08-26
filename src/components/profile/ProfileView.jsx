import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, User, Mail, Phone, Globe, MapPin, Share2, MessageCircle,
  ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Building2, Briefcase
} from 'lucide-react';
import SocialIcon from '../ui/SocialIcon';
import ShareBackModal from '../ui/ShareBackModal';
import { saveContactToPhone } from '../../utils/vcard';

const THEMES = {
  'dark-luxe': {
    bg: 'bg-slate-950 text-white',
    card: 'bg-slate-900/90 border-slate-800 text-white',
    primaryBtn: 'bg-[#00BCFF] text-slate-950 hover:bg-cyan-400 font-bold',
    accentText: 'text-[#00BCFF]',
  },
  'neon-cyber': {
    bg: 'bg-black text-cyan-400',
    card: 'bg-slate-950 border-cyan-500/40 text-white shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    primaryBtn: 'bg-cyan-400 text-black hover:bg-cyan-300 font-black',
    accentText: 'text-cyan-300',
  },
  'sunset-amber': {
    bg: 'bg-amber-950 text-amber-100',
    card: 'bg-amber-950/60 border-amber-500/30 text-amber-100',
    primaryBtn: 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold',
    accentText: 'text-amber-400',
  },
  'emerald-green': {
    bg: 'bg-emerald-950 text-emerald-100',
    card: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-100',
    primaryBtn: 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-bold',
    accentText: 'text-emerald-400',
  },
  'minimal-white': {
    bg: 'bg-slate-50 text-slate-900',
    card: 'bg-white border-slate-200 shadow-xl text-slate-900',
    primaryBtn: 'bg-slate-900 text-white hover:bg-slate-800 font-bold',
    accentText: 'text-cyan-600',
  }
};

export const ProfileView = ({ data }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const profile = data || {
    name: "Precious Onuigbo",
    username: "precious",
    title: "Product Designer & Creator",
    company: "Bloom Labs",
    bio: "Designing digital experiences & building next-gen physical NFC networking tools across Africa.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    email: "precious@bloomlabs.africa",
    phone: "+234 803 123 4567",
    website: "https://precious.design",
    location: "Lagos & Abuja, Nigeria",
    theme: "dark-luxe",
    layout: "stack",
    socials: {
      instagram: "precious.design",
      tiktok: "@precious_creator",
      twitter: "preciousonuigbo",
      whatsapp: "+2348031234567",
      linkedin: "preciousonuigbo"
    }
  };

  const themeKey = profile.theme || 'dark-luxe';
  const theme = THEMES[themeKey] || THEMES['dark-luxe'];

  const handleSaveContact = () => {
    saveContactToPhone(profile);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors flex flex-col justify-between relative overflow-hidden py-10 px-4`}>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Logo */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between mb-6 z-10">
        <div className="flex items-center gap-0.5">
          <span className="text-xl font-black tracking-tight font-['Plus_Jakarta_Sans']">bloom</span>
          <span className="text-xl font-black text-[#00BCFF]">.</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-[10px] font-bold text-slate-300">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          <span>Verified NFC Card</span>
        </div>
      </div>

      {/* Main Profile Card Container */}
      <div className="max-w-md mx-auto w-full z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`${theme.card} backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border relative overflow-hidden`}
        >
          {/* Avatar & Basic Info */}
          <div className="text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <img
                src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover border-4 border-[#00BCFF]/40 shadow-xl"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00BCFF] text-slate-950 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">{profile.name}</h1>
              <p className={`text-sm font-bold ${theme.accentText} mt-0.5`}>
                {profile.title} {profile.company ? `• ${profile.company}` : ''}
              </p>
              {profile.location && (
                <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{profile.location}</span>
                </p>
              )}
            </div>

            {profile.bio && (
              <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed max-w-sm mx-auto px-2">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleSaveContact}
              className={`w-full py-3.5 rounded-2xl ${theme.primaryBtn} shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-sm`}
            >
              <Download className="w-4 h-4" />
              <span>Save Contact to Phone</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-white font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>Share Your Info Back</span>
            </button>
          </div>

          {/* Contact Details & Links */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3">
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 text-xs font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{profile.phone}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto" />
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 text-xs font-semibold transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto" />
              </a>
            )}

            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 text-xs font-semibold transition-colors"
              >
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{profile.website}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto" />
              </a>
            )}
          </div>

          {/* Social Icons Grid */}
          {profile.socials && Object.keys(profile.socials).length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
                Social Profiles & Connect
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {Object.entries(profile.socials).map(([network, value]) => {
                  if (!value) return null;
                  return (
                    <a
                      key={network}
                      href={value.startsWith('http') ? value : `https://${network}.com/${value.replace(/^@/, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-2xl bg-slate-800/60 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center transition-all hover:scale-110"
                    >
                      <SocialIcon network={network} className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Share Profile Link Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{copied ? 'Link Copied to Clipboard!' : 'Share This Profile'}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Powered By */}
      <div className="text-center pt-8 text-xs text-slate-500 z-10">
        Powered by <span className="font-bold text-white">bloom.app</span> • Smart NFC Card Technology
      </div>

      <ShareBackModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        ownerName={profile.name}
      />
    </div>
  );
};

export default ProfileView;
