import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, User, Mail, Phone, Globe, MapPin, Share2, MessageCircle,
  ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Building2, Briefcase,
  Calendar, Link as LinkIcon, Check, Copy, Send, Play, Pause, Music,
  ShoppingBag, Clock, Tag, Image as ImageIcon, ArrowRight, Eye, ChevronRight
} from 'lucide-react';
import SocialIcon from '../ui/SocialIcon';
import ShareBackModal from '../ui/ShareBackModal';
import { saveContactToPhone } from '../../utils/vcard';
import lagosDuskImg from '../../assets/images/lagos_dusk_artwork.png';
import goldenEssenceImg from '../../assets/images/golden_essence_artwork.png';

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
    name: '1. Corporate & Professionals',
    badge: 'Corporate',
    desc: 'For executives, consultants & team leads. Features verified company badge, direct vCard download & corporate contact options.'
  },
  {
    id: 'creator-artist',
    name: '2. Creators & Music Artists',
    badge: 'Creators',
    desc: 'For musicians, producers & content creators. Includes music/video showcase player, streaming links & booking inquiries.'
  },
  {
    id: 'art-gallery',
    name: '3. Art Artists & Visual Gallery',
    badge: 'Fine Art',
    desc: 'For visual artists, painters & sculptors. Features a visual art gallery grid with pricing, availability & buy inquiries.'
  },
  {
    id: 'business-vendor',
    name: '4. Business Vendors & Merchants',
    badge: 'Vendors',
    desc: 'For storefronts, merchants & service vendors. Displays featured products/services menu, prices & WhatsApp 1-tap ordering.'
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedContact, setSavedContact] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const profile = data || {
    name: "John Doe",
    username: "johndoe",
    title: "Product Lead & Executive",
    company: "Enlazer Global",
    bio: "Building next-generation digital networking tools & smart NFC business cards.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    email: "hello@enlazer.com.ng",
    phone: "+234 812 345 6789",
    website: "https://enlazer.com.ng",
    location: "Lagos, Nigeria",
    theme: "dark-luxe",
    template: "corporate-pro",
    showEmail: true,
    socials: {
      linkedin: "johndoe",
      twitter: "johndoe",
      instagram: "johndoe.design",
      website: "https://enlazer.com.ng"
    }
  };

  const themeKey = profile.theme || 'dark-luxe';
  const theme = THEMES[themeKey] || THEMES['dark-luxe'];

  // Normalize template key mapping
  let templateKey = profile.template || profile.layout || 'corporate-pro';
  if (templateKey === 'classic-stack') templateKey = 'corporate-pro';
  if (templateKey === 'modern-card') templateKey = 'creator-artist';
  if (templateKey === 'minimalist-glass') templateKey = 'art-gallery';
  if (templateKey === 'bento-grid') templateKey = 'business-vendor';

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

  // Mock sample fallback data for template preview
  const featuredTrack = profile.featuredTrack || {
    title: "Aura of Midnight (Single)",
    artist: profile.name || "Enlazer Sounds",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
    streamUrl: "https://open.spotify.com"
  };

  const artworks = profile.artworks || [
    {
      id: 'art-1',
      title: 'Lagos Horizon at Dusk',
      medium: 'Oil & Acrylic on Canvas',
      size: '36 x 48 inches',
      price: '₦450,000 ($350)',
      image: lagosDuskImg,
      available: true
    },
    {
      id: 'art-2',
      title: 'Golden African Essence No. 4',
      medium: 'Mixed Media & 24K Gold Leaf',
      size: '30 x 40 inches',
      price: '₦620,000 ($480)',
      image: goldenEssenceImg,
      available: true
    }
  ];

  const vendorProducts = profile.products || [
    {
      id: 'prod-1',
      name: 'Stealth Black Smart NFC Card',
      price: '₦25,000',
      desc: 'Stainless steel matte finish with instant contact tap.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'prod-2',
      name: 'IP68 Waterproof NFC Wristband',
      price: '₦15,000',
      desc: 'Eco-silicone wearable for events & VIP check-in.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400'
    }
  ];

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
          <ShieldCheck className="w-3.5 h-3.5 text-[#00BCFF]" />
          <span>verified card</span>
        </div>
      </div>

      {/* Main Profile Container */}
      <div className="max-w-md mx-auto w-full z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`${theme.card} backdrop-blur-xl rounded-3xl p-6 sm:p-7 border relative overflow-hidden text-left`}
        >
          {/* ========================================================================= */}
          {/* TEMPLATE 1: CORPORATE & PROFESSIONALS (Executive Card)                   */}
          {/* ========================================================================= */}
          {templateKey === 'corporate-pro' && (
            <div className="space-y-5">
              {/* Header Info */}
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#00BCFF]/50 shadow-lg shrink-0">
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

              {profile.bio && (
                <p className={`text-xs ${theme.textMuted} leading-relaxed font-normal`}>
                  {profile.bio}
                </p>
              )}

              {/* Primary Actions */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleSaveContact}
                  className={`w-full py-3 px-4 rounded-2xl ${theme.primaryBtn} flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  {savedContact ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{savedContact ? 'Contact Saved to Address Book!' : 'Save Contact to Phone (vCard)'}</span>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className={`w-full py-3 px-4 rounded-2xl ${theme.secondaryBtn} border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  <Send className="w-3.5 h-3.5 text-[#00BCFF]" />
                  <span>Share your contact details back</span>
                </button>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 pt-1">
                {profile.phone && (
                  <div className={`p-3.5 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} flex items-center justify-between gap-3`}>
                    <div className="w-9 h-9 rounded-xl bg-[#00BCFF]/10 border border-[#00BCFF]/20 text-[#00BCFF] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">DIRECT PHONE</span>
                      <a href={`tel:${profile.phone}`} className="text-xs font-bold text-white hover:text-[#00BCFF] transition-colors truncate block">
                        {profile.phone}
                      </a>
                    </div>
                    <button onClick={() => handleCopyField('phone', profile.phone)} className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0">
                      {copiedField === 'phone' ? <Check className="w-4 h-4 text-[#00BCFF]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}

                {(profile.showEmail !== false && profile.email) && (
                  <div className={`p-3.5 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} flex items-center justify-between gap-3`}>
                    <div className="w-9 h-9 rounded-xl bg-[#00BCFF]/10 border border-[#00BCFF]/20 text-[#00BCFF] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">CORPORATE EMAIL</span>
                      <a href={`mailto:${profile.email}`} className="text-xs font-bold text-white hover:text-[#00BCFF] transition-colors truncate block">
                        {profile.email}
                      </a>
                    </div>
                    <button onClick={() => handleCopyField('email', profile.email)} className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0">
                      {copiedField === 'email' ? <Check className="w-4 h-4 text-[#00BCFF]" /> : <Copy className="w-4 h-4" />}
                    </button>
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

              {/* Social Channels */}
              {profile.socials && Object.keys(profile.socials).length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block">OFFICIAL NETWORKS</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {Object.entries(profile.socials).map(([network, value]) => {
                      if (!value) return null;
                      const linkUrl = resolveSocialUrl(network, value);
                      const netLabel = network.toLowerCase() === 'x' || network.toLowerCase() === 'twitter' ? 'X' : network.charAt(0).toUpperCase() + network.slice(1);
                      return (
                        <a
                          key={network}
                          href={linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`${theme.socialBg} ${theme.socialHover} border ${theme.socialBorder} rounded-full px-3.5 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer`}
                        >
                          <SocialIcon platform={network} className="w-3.5 h-3.5 shrink-0 text-[#00BCFF]" />
                          <span>{netLabel}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TEMPLATE 2: CREATORS & MUSIC ARTISTS (Album / Track Showcase & Media)      */}
          {/* ========================================================================= */}
          {templateKey === 'creator-artist' && (
            <div className="space-y-5">
              {/* Creator Banner */}
              <div className="h-28 rounded-t-3xl bg-gradient-to-r from-[#00BCFF] via-blue-600 to-indigo-700 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 relative flex items-end justify-center pb-2">
                <div className="absolute -bottom-8 w-20 h-20 rounded-2xl p-1 bg-slate-950 shadow-2xl">
                  <img
                    src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Creator Info */}
              <div className="pt-8 text-center space-y-1">
                <h1 className={`text-2xl font-black ${theme.textPrimary}`}>{profile.name}</h1>
                <p className={`text-xs font-bold text-[#00BCFF] flex items-center justify-center gap-1`}>
                  <Sparkles className="w-3.5 h-3.5 text-[#00BCFF]" />
                  <span>{profile.title || 'Creator / Music Artist'}</span>
                </p>
                {profile.location && <p className="text-xs text-slate-400">{profile.location}</p>}
              </div>

              {profile.bio && (
                <p className={`text-xs text-center ${theme.textMuted} leading-relaxed px-2`}>
                  {profile.bio}
                </p>
              )}

              {/* Music / Album Showcase Widget */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-[#00BCFF]/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00BCFF] flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5" /> Featured Music / Release
                  </span>
                  <span className="text-[9px] font-mono bg-[#00BCFF]/20 text-[#00BCFF] px-2 py-0.5 rounded-full font-bold">NEW RELEASE</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img src={featuredTrack.cover} alt={featuredTrack.title} className="w-14 h-14 rounded-xl object-cover shadow-md shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-white truncate">{featuredTrack.title}</h4>
                    <p className="text-[11px] font-medium text-[#00BCFF] truncate">{featuredTrack.artist}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Stream Everywhere</span>
                  </div>

                  <button
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className="w-10 h-10 rounded-full bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#00BCFF]/30 transition-transform active:scale-90 cursor-pointer"
                  >
                    {isPlayingMusic ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleSaveContact}
                  className={`w-full py-3.5 px-4 rounded-2xl ${theme.primaryBtn} flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  <Download className="w-4 h-4" />
                  <span>Save Contact & Booking Details</span>
                </button>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className={`w-full py-3 px-4 rounded-2xl ${theme.secondaryBtn} border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  <Send className="w-3.5 h-3.5 text-[#00BCFF]" />
                  <span>Book / Collaborate</span>
                </button>
              </div>

              {/* Streaming Channels & Socials */}
              {profile.socials && Object.keys(profile.socials).length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block text-center">LISTEN & FOLLOW</span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {Object.entries(profile.socials).map(([net, val]) => {
                      if (!val) return null;
                      return (
                        <a
                          key={net}
                          href={resolveSocialUrl(net, val)}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-full px-3.5 py-1.5 text-xs text-white font-medium flex items-center gap-1.5 transition-all"
                        >
                          <SocialIcon platform={net} className="w-3.5 h-3.5 text-[#00BCFF]" />
                          <span className="capitalize">{net}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Bio Links */}
              {profile.customLinks && profile.customLinks.length > 0 && (
                <div className="space-y-2 pt-1">
                  {profile.customLinks.map((linkItem, idx) => (
                    <a
                      key={linkItem.id || idx}
                      href={linkItem.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-between p-3 rounded-2xl ${theme.itemBg} border ${theme.itemBorder} text-xs font-bold ${theme.textPrimary}`}
                    >
                      <span>{linkItem.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#00BCFF]" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TEMPLATE 3: ART ARTISTS & FINE ART (Visual Art Portfolio & Store)         */}
          {/* ========================================================================= */}
          {templateKey === 'art-gallery' && (
            <div className="space-y-5">
              {/* Art Header */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#00BCFF]/50 shadow-xl shrink-0">
                  <img src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00BCFF] block">VISUAL ARTIST / GALLERY</span>
                  <h1 className={`text-xl font-extrabold ${theme.textPrimary} truncate`}>{profile.name}</h1>
                  <p className="text-xs text-[#00BCFF] truncate">{profile.title || 'Painter & Fine Artist'}</p>
                </div>
              </div>

              {profile.bio && (
                <p className={`text-xs ${theme.textMuted} leading-relaxed italic font-serif`}>
                  "{profile.bio}"
                </p>
              )}

              {/* Featured Artworks Grid */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00BCFF] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" /> Featured Artworks & Collection
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">{artworks.length} Original Pieces</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artworks.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArtwork(art)}
                      className="group p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-[#00BCFF]/60 transition-all cursor-pointer space-y-2"
                    >
                      <div className="relative h-32 rounded-xl overflow-hidden">
                        <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute top-2 right-2 bg-slate-950/80 text-[#00BCFF] text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {art.price}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-[#00BCFF] transition-colors">{art.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{art.medium}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleSaveContact}
                  className={`w-full py-3.5 px-4 rounded-2xl ${theme.primaryBtn} flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  <Download className="w-4 h-4" />
                  <span>Save Artist vCard & Contact</span>
                </button>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className={`w-full py-3 px-4 rounded-2xl ${theme.secondaryBtn} border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  <Send className="w-3.5 h-3.5 text-[#00BCFF]" />
                  <span>Commission / Inquire Art Piece</span>
                </button>
              </div>

              {/* Social Channels */}
              {profile.socials && Object.keys(profile.socials).length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {Object.entries(profile.socials).map(([net, val]) => {
                    if (!val) return null;
                    return (
                      <a
                        key={net}
                        href={resolveSocialUrl(net, val)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-full px-3.5 py-1.5 text-xs text-white font-medium flex items-center gap-1.5 transition-all"
                      >
                        <SocialIcon platform={net} className="w-3.5 h-3.5 text-[#00BCFF]" />
                        <span className="capitalize">{net}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TEMPLATE 4: BUSINESS VENDORS & MERCHANTS (Product Catalog & Store)        */}
          {/* ========================================================================= */}
          {templateKey === 'business-vendor' && (
            <div className="space-y-5">
              {/* Store Header */}
              <div className="flex items-center gap-4">
                <img src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00BCFF] shrink-0" />
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#00BCFF]/15 text-[#00BCFF] text-[9px] font-extrabold uppercase">MERCHANT STORE</span>
                    <span className="text-[10px] text-[#00BCFF] flex items-center gap-1 font-bold">
                      <Clock className="w-3 h-3 text-[#00BCFF]" /> Open Now
                    </span>
                  </div>
                  <h1 className={`text-lg font-black ${theme.textPrimary} truncate`}>{profile.name}</h1>
                  <p className="text-xs font-bold text-[#00BCFF] truncate">{profile.company || profile.title || 'Storefront & Products'}</p>
                </div>
              </div>

              {profile.bio && (
                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>
                  {profile.bio}
                </p>
              )}

              {/* Vendor Products Showcase */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00BCFF] flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" /> Featured Products & Menu
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">1-Tap WhatsApp Order</span>
                </div>

                <div className="space-y-2.5">
                  {vendorProducts.map((prod) => (
                    <div key={prod.id} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center gap-3.5">
                      <img src={prod.image} alt={prod.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                          <span className="text-xs font-extrabold text-[#00BCFF]">{prod.price}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{prod.desc}</p>
                      </div>
                      <a
                        href={`https://wa.me/${(profile.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${profile.name}, I would like to order: ${prod.name} (${prod.price})`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-[11px] shrink-0 transition-transform active:scale-95"
                      >
                        Order
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleSaveContact}
                  className={`w-full py-3.5 px-4 rounded-2xl ${theme.primaryBtn} flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs font-bold`}
                >
                  <Download className="w-4 h-4" />
                  <span>Save Merchant Contact & vCard</span>
                </button>
              </div>

              {/* Store Details */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center gap-2 text-white">
                    <Phone className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span className="truncate">{profile.phone}</span>
                  </a>
                )}
                {profile.location && (
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4 text-[#00BCFF] shrink-0" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shared Link Copy Footer */}
          <div className="pt-3 text-center border-t border-slate-800/50 mt-4">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00BCFF]" />
                  <span className="text-[#00BCFF] font-bold">Profile Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#00BCFF]" />
                  <span>Share this digital card</span>
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

      {/* Artwork Modal Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArtwork(null)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-slate-900 border border-[#00BCFF]/30 p-6 rounded-3xl max-w-sm w-full z-10 text-white space-y-4 shadow-2xl">
              <div className="h-48 rounded-2xl overflow-hidden">
                <img src={selectedArtwork.image} alt={selectedArtwork.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#00BCFF] uppercase tracking-widest block">{selectedArtwork.medium}</span>
                <h3 className="text-lg font-black text-white">{selectedArtwork.title}</h3>
                <p className="text-xs text-[#00BCFF] font-bold mt-1">{selectedArtwork.price}</p>
                <p className="text-[11px] text-slate-400 mt-1">{selectedArtwork.size}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedArtwork(null);
                  setIsShareModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#00BCFF] hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer"
              >
                Inquire & Purchase Artwork
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
