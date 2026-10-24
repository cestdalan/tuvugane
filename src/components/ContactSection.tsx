import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, X, Send } from 'lucide-react';
import { InquiryFormData } from '../types';
import BlurImage from './BlurImage';

interface ContactSectionProps {
  preselectedService?: string;
}

export default function ContactSection({ preselectedService }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [formData, setFormData] = useState<InquiryFormData>({
    disciplines: preselectedService ? [preselectedService] : ['Film Production'],
    timeline: '1–3 Months',
    name: '',
    email: '',
    organization: '',
    narrative: '',
    budgetRange: '$25k–$50k',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@tuvugane.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-40 bg-[#060606] text-white border-t border-white/10 overflow-hidden font-liber"
    >
      {/* Background Subtle Photo Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <BlurImage
          src="/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.webp"
          alt="Atmospheric landscape"
          className="filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/90 to-[#060606]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex flex-col items-center text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-3xl"
        >
          <span className="text-[11px] font-liber uppercase tracking-[0.25em] text-white/40 block">
            Initiate Dialogue
          </span>

          <h2 className="font-liber font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-tight">
            Start a <br />
            <span className="font-liber font-light text-white/70">conversation.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/50 font-light max-w-md mx-auto pt-2">
            Available for narrative cinema commissions, documentary expeditions, and global commercial campaigns.
          </p>
        </motion.div>

        {/* Large Interactive Email Touchpoint */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="mailto:hello@tuvugane.com"
            data-cursor="EMAIL"
            className="font-liber font-bold text-2xl sm:text-4xl text-white/90 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-all"
          >
            hello@tuvugane.com
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="Copy email to clipboard"
            aria-label="Copy email"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Minimal Buttons: Brief Us Drawer or Direct Call */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-liber">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            data-cursor="BRIEF"
            className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white/90 transition-all shadow-lg"
          >
            Submit Commission Brief
          </button>

          <span className="text-xs text-white/40 font-medium">
            Studio Desk · +250 788 123 456
          </span>
        </div>

        {/* Location & Studio Details */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-liber text-white/40 border-t border-white/10 w-full max-w-2xl">
          <span>KG 563 St, Kacyiru</span>
          <span>·</span>
          <span>Kigali, Rwanda</span>
          <span>·</span>
          <span>UTC+2 (CAT)</span>
        </div>
      </div>

      {/* Slide-in Minimalist Commission Brief Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl font-liber">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/15 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-liber font-bold text-xl text-white">Project Inquiry</h3>
                  <span className="text-xs text-white/40">Tuvugane Executive Production Desk</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-liber font-bold text-lg text-white">Inquiry Received</h4>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Our directors will review your brief and contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsDrawerOpen(false);
                    }}
                    className="mt-4 px-4 py-2 bg-white text-black text-xs font-liber font-bold rounded"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-liber font-medium uppercase tracking-wider text-white/50">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aimé Rukundo"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-white font-liber"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-liber font-medium uppercase tracking-wider text-white/50">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@organisation.com"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-white font-liber"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-liber font-medium uppercase tracking-wider text-white/50">
                      Vision / Brief
                    </label>
                    <textarea
                      rows={3}
                      value={formData.narrative}
                      onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                      placeholder="Brief description of the film, campaign, or still commission..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-white resize-none font-liber"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-bold text-xs font-liber uppercase tracking-wider rounded hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
