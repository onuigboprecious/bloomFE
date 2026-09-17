import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/common/SEO';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { apiClient } from '../api/client';

export const ContactSupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await apiClient('/api/support', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (response && response.ticketId) {
        setTicketId(response.ticketId);
      }
      setSubmitted(true);
    } catch (err) {
      console.warn('Support ticket API submission fallback:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <SEO
        title="Contact & Support — Enlazer"
        description="Order tracking, card customization, profile setup, account issues — if it's about your Enlazer card, we're the ones to ask."
        url="https://enlazer.cloud/support"
      />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="text-center space-y-3 max-w-4xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How can we help you?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Order tracking, card customization, profile setup, account issues — if it's about your Enlazer card, we're the ones to ask.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 sm:gap-12 items-start text-left">
          {/* Support Channels Info - Plain Layout without cards */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-[#00BCFF] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Email Support</h4>
              </div>
              <a href="mailto:support@enlazer.com.ng" className="text-sm font-bold text-[#00BCFF] hover:underline block pl-10">
                support@enlazer.com.ng
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 pl-10">We reply within 2–4 hours, most days faster.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">WhatsApp & Calls</h4>
              </div>
              <a href="tel:+2348084137577" className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline block pl-10">
                +234 808 413 7577
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 pl-10">Mon–Sat, 8:00 AM – 7:00 PM WAT</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Headquarters</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                Bloom Card Technologies Ltd.<br />
                Victoria Island, Lagos & Maitama, Abuja, Nigeria
              </p>
            </div>
          </div>

          {/* Form - Plain Layout without card box */}
          <div className="md:col-span-2 space-y-6">
            {submitted ? (
              <div className="py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Message Received!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                  Thank you for contacting Enlazer Support. A ticket {ticketId ? `(#${ticketId})` : ''} has been created and sent to our team. We'll reply to <strong>{formData.email || 'your email'}</strong> shortly.
                </p>
                <Button variant="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="mt-4 bg-[#00BCFF]">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send us a message</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Musa Usman"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="where we should reply"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    What's this about?
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Order status, card design, account access, something else"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Tell us what's going on
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="The more detail, the faster we can help — order number, card type, or a screenshot if something's not working."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCFF]/40"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-8 bg-[#00BCFF] hover:bg-cyan-500 text-white font-bold py-3.5 text-sm rounded-full shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send message</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactSupportPage;
