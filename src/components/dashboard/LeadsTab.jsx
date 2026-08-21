import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Download,
  Trash2,
  Mail,
  Phone,
  MessageCircle,
  Sparkles,
  UserCheck,
  Calendar,
  Filter,
  Share2,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeadsTab = () => {
  const { leads, deleteLead, exportLeadsCSV, openShareBackModal, profile } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all'); // 'all' | 'Share Back Form' | 'NFC Tap' | 'QR Scan'
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMethod =
      methodFilter === 'all' || lead.method === methodFilter;

    return matchesSearch && matchesMethod;
  });

  const shareBackCount = leads.filter((l) => l.method === 'Share Back Form').length;

  const exportSingleLeadVCard = (lead) => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${lead.name}
TITLE:${lead.role || ''}
EMAIL:${lead.email}
TEL:${lead.phone}
NOTE:Captured via Bloom Card (${lead.method || 'Share Back'}). Notes: ${lead.notes || ''}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${lead.name.replace(/\s+/g, '_')}_Lead.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Tab Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Captured Leads & Share Back Contacts
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold text-xs">
              {leads.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            People who tapped your card or submitted details via the recipient Share Back form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openShareBackModal}
            className="px-4 py-2.5 rounded-xl bg-[#00BCFF] hover:bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Test Recipient "Share Back"</span>
          </button>

          <button
            onClick={exportLeadsCSV}
            disabled={!leads.length}
            className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-40 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Contacts Captured</span>
            <Users className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.stats.leadsCaptured || leads.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Verified Entries</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>"Share Back" Submissions</span>
            <Share2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {shareBackCount}
          </div>
          <span className="text-[11px] text-cyan-600 font-bold">2-Way Recipient Forms</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Conversion Rate</span>
            <UserCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.stats.conversionRate || 84}%
          </div>
          <span className="text-[11px] text-slate-400">Card taps to contact exchange</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#00BCFF] outline-none transition-all"
          />
        </div>

        {/* Method Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['all', 'Share Back Form', 'NFC Tap', 'QR Scan'].map((method) => (
            <button
              key={method}
              onClick={() => setMethodFilter(method)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                methodFilter === method
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {method === 'all' ? 'All Methods' : method}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => {
            const cleanPhone = (lead.phone || '').replace(/[^\d+]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}`;

            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left Contact Details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black text-lg shrink-0 uppercase">
                    {lead.name ? lead.name.charAt(0) : 'U'}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {lead.name}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.method === 'Share Back Form'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                        }`}
                      >
                        {lead.method || 'Share Back Form'}
                      </span>
                    </div>

                    {lead.role && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {lead.role}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{lead.email}</span>
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{lead.phone}</span>
                      </a>
                    </div>

                    {lead.notes && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs italic text-slate-600 dark:text-slate-300">
                        "{lead.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 justify-end">
                  {cleanPhone && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={`mailto:${lead.email}`}
                    className="p-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 transition-all cursor-pointer"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => exportSingleLeadVCard(lead)}
                    className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer"
                    title="Save Contact to Phone"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition-all cursor-pointer"
                    title="Remove Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/60 p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">No Captured Leads Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm || methodFilter !== 'all'
                ? 'Try clearing your search terms or filters.'
                : 'When people receive a tap from your Bloom Card and submit the Share Back form, their details will appear here automatically.'}
            </p>
            <button
              onClick={openShareBackModal}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00BCFF] text-slate-950 font-extrabold text-xs cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Simulate Lead Submission</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsTab;
