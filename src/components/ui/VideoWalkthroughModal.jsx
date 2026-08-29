import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Video, ArrowRight } from 'lucide-react';

const VIDEO_STEPS = {
  1: {
    title: 'Step 1: Profile Creation & Direct vCard Sync',
    duration: '0:25',
    headline: 'How recipient address books auto-sync in < 500ms',
    bullets: [
      'Your profile details map directly into standard iOS & Android .vcf contact fields.',
      'No app installation needed for the recipient — works on 100% of modern phones.',
      'Auto-formats phone numbers & email addresses for 1-tap direct dialing.'
    ],
    previewBg: 'from-cyan-900/40 to-slate-950',
    accentColor: '#00BCFF'
  },
  2: {
    title: 'Step 2: 1-Tap Social Channel Conversion',
    duration: '0:20',
    headline: 'Boost saved connections & social follows by +340%',
    bullets: [
      'Recipients tap LinkedIn or Instagram to launch native mobile apps directly.',
      'WhatsApp handle opens a pre-configured chat window in 1 tap.',
      'Customize primary call-to-action buttons for high conversion.'
    ],
    previewBg: 'from-purple-900/40 to-slate-950',
    accentColor: '#A855F7'
  },
  3: {
    title: 'Step 3: Card Template Selection & Aesthetic Customization',
    duration: '0:30',
    headline: 'Match your card design to your personal brand or physical card finish',
    bullets: [
      'Choose from obsidian dark, cyberpunk glow, emerald luxury, or minimal light themes.',
      'Real-time responsiveness across dark mode and light mode devices.',
      'High-impact glassmorphism and animated ambient glow backdrops.'
    ],
    previewBg: 'from-emerald-900/40 to-slate-950',
    accentColor: '#10B981'
  },
  4: {
    title: 'Step 4: Day-1 Shareable Digital Identity',
    duration: '0:22',
    headline: 'Start networking instantly on Day 1 — zero physical card delay',
    bullets: [
      'Generate sharp high-res QR codes for instant smartphone camera scans.',
      'Copy your custom branded URL to place in email signatures or social bios.',
      'Optionally link physical NFC cards or wristbands whenever they arrive.'
    ],
    previewBg: 'from-amber-900/40 to-slate-950',
    accentColor: '#F59E0B'
  }
};

export const VideoWalkthroughModal = ({ isOpen, onClose, step = 1 }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoData = VIDEO_STEPS[step] || VIDEO_STEPS[1];

  useEffect(() => {
    let timer;
    if (isOpen && isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-[#00BCFF] border border-cyan-500/20">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#00BCFF] tracking-wider block">
                  Self-Guided Video Walkthrough
                </span>
                <h4 className="text-sm font-black text-white">{videoData.title}</h4>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Simulated Video Player Viewport */}
          <div className={`relative h-64 sm:h-72 bg-gradient-to-br ${videoData.previewBg} flex flex-col justify-between p-6 overflow-hidden`}>
            {/* Animated Ambient Visual Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,188,255,0.15),transparent_60%)] pointer-events-none" />

            {/* Video Content Scene Overlay */}
            <div className="relative z-10 space-y-3 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 border border-white/10 text-xs font-bold text-cyan-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00BCFF]" />
                <span>Feature Demo ({videoData.duration})</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {videoData.headline}
              </h3>
            </div>

            {/* Live Interactive Step Simulation Graphic */}
            <div className="relative z-10 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="font-mono text-cyan-400 font-bold">LIVE PREVIEW SIMULATOR</span>
                <span>{progress}% Completed</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#00BCFF] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Video Controls Overlay Bar */}
            <div className="relative z-10 flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="p-2.5 rounded-full bg-[#00BCFF] text-slate-950 hover:bg-cyan-400 font-bold transition-all shadow-lg shadow-cyan-500/30 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                </button>
                <button
                  onClick={handleReplay}
                  className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer"
                  title="Replay Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00BCFF]" />}
              </button>
            </div>
          </div>

          {/* Key Walkthrough Takeaways List */}
          <div className="p-6 bg-slate-900 space-y-4">
            <h5 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Key Walkthrough Takeaways
            </h5>
            <ul className="space-y-2.5">
              {videoData.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#00BCFF] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Got It, Continue Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoWalkthroughModal;
