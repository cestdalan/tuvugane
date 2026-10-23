import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { METHODOLOGY_STEPS, FAQS } from '../data/portfolioData';
import { InquiryFormData } from '../types';
import {
  Mail,
  MessageSquare,
  ArrowDown,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Phone,
  MapPin,
  ChevronDown,
  Clock,
  RotateCcw
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export default function ContactSection({ preselectedService }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@tuvugane.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const allDisciplines = [
    'Film Production',
    'Documentary',
    'Motion Design',
    'Commercial Campaign',
    'Creative Direction',
    'Post-Production'
  ];

  const timelineOptions = ['Immediate (< 1 Mo)', '1–3 Months', '3–6 Months', 'Flexible'];
  const budgetOptions = ['<$25k', '$25k–$50k', '$50k–$100k', '$100k+'];

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
  const [submissionId, setSubmissionId] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (preselectedService && !formData.disciplines.includes(preselectedService)) {
      setFormData((prev) => ({
        ...prev,
        disciplines: [...prev.disciplines, preselectedService],
      }));
    }
  }, [preselectedService]);

  const toggleDiscipline = (disc: string) => {
    setFormData((prev) => {
      const exists = prev.disciplines.includes(disc);
      if (exists) {
        if (prev.disciplines.length === 1) return prev;
        return { ...prev, disciplines: prev.disciplines.filter((d) => d !== disc) };
      }
      return { ...prev, disciplines: [...prev.disciplines, disc] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.narrative.trim()) {
      setFormError('Please provide your name, email, and a brief overview of your narrative vision.');
      return;
    }
    setFormError('');
    const randomId = `TVG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionId(randomId);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      disciplines: ['Film Production'],
      timeline: '1–3 Months',
      name: '',
      email: '',
      organization: '',
      narrative: '',
      budgetRange: '$25k–$50k',
    });
    setIsSubmitted(false);
    setSubmissionId('');
    setFormError('');
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[#070707] text-white border-t border-white/10 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 py-20 md:py-36 space-y-24 md:space-y-32">
        {/* 1. Direct Contact Area (#contact): Full Width */}
        <div id="contact" className="scroll-mt-28 space-y-10 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4"
          >
            <div className="max-w-4xl space-y-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.08] text-white break-words">
                Let's make something true.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/60 font-light leading-relaxed max-w-2xl pt-2">
                We collaborate with global brands, documentary foundations, festival programmers, and visionary creators. Reach our executive production desk directly.
              </p>
            </div>
          </motion.div>

          {/* Contact Methods Cards: Flow in on scroll */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Direct Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col justify-between space-y-8 group hover:border-white/30 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                  Studio Inquiries
                </span>
                <a
                  href="mailto:hello@tuvugane.com"
                  data-cursor="EMAIL"
                  className="font-display font-bold text-2xl sm:text-3xl text-white hover:text-white/80 block break-all transition-colors"
                >
                  hello@tuvugane.com
                </a>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Address'}</span>
                </button>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
              </div>
            </motion.div>

            {/* Quick WhatsApp Chat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col justify-between space-y-8 group hover:border-white/30 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                  Direct Line
                </span>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  WhatsApp Studio Line
                </p>
                <p className="text-xs text-white/60 font-light">
                  Instant line for festival or active production coordination.
                </p>
              </div>
              <a
                href="https://wa.me/250788000000?text=Hello%20Tuvugane%20team,%20I%20would%20like%20to%20discuss%20a%20film/motion%20project."
                target="_blank"
                rel="noreferrer"
                data-cursor="CHAT"
                className="inline-flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-white hover:text-white/80 transition-colors"
              >
                <span>Launch WhatsApp Chat</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Jump to Project Inquiry */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col justify-between space-y-8 group hover:border-white/30 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                  Structured Commission
                </span>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Commission Form
                </p>
                <p className="text-xs text-white/60 font-light">
                  Specify creative scope, timeline expectations, and deliverables.
                </p>
              </div>
              <a
                href="#inquire"
                className="inline-flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-white/70 hover:text-white transition-colors"
              >
                <span>Inquire for a Project ↓</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* 2. Project Commission Form (#inquire): Full-Width Container with scroll flow */}
        <motion.div
          id="inquire"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-28 p-8 md:p-16 rounded-3xl bg-[#0a0a0a] border border-white/15 shadow-2xl space-y-10"
        >
          <div className="max-w-3xl space-y-3">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-6xl text-white">
              Tell us about your story.
            </h3>
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              Every masterwork starts with a clear dialogue. Fill in your project parameters and our directors will respond with a tailored treatment consultation within 24 hours.
            </p>
          </div>

          {/* Submission Success View in Pure White/Zinc */}
          {isSubmitted ? (
            <div className="p-8 md:p-14 rounded-2xl bg-white/[0.03] border border-white/40 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 text-white border border-white/30 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <span className="font-mono text-xs tracking-widest uppercase text-white/80">
                  Inquiry Received · {submissionId}
                </span>
                <h4 className="font-display font-bold text-2xl text-white">
                  Murakoze, {formData.name}.
                </h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Your project commission brief has been routed to our directing team in Kigali. We are reviewing your narrative scope and will follow up with initial treatment notes to <strong className="text-white">{formData.email}</strong>.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono hover:bg-white/90 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {formError && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/30 text-xs text-white">
                  {formError}
                </div>
              )}

              {/* Disciplines Multi-Select */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                  1. Creative Disciplines Required <span className="text-white/40">(Select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {allDisciplines.map((disc) => {
                    const isSelected = formData.disciplines.includes(disc);
                    return (
                      <button
                        key={disc}
                        type="button"
                        onClick={() => toggleDiscipline(disc)}
                        className={`px-4 py-2 text-xs rounded-full font-medium transition-all duration-200 border ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {disc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                  2. Target Production Timeline
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {timelineOptions.map((timeline) => {
                    const isSelected = formData.timeline === timeline;
                    return (
                      <button
                        key={timeline}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline })}
                        className={`px-4 py-2 text-xs rounded-full font-medium transition-all duration-200 border ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {timeline}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                  3. Anticipated Budget Scope (USD)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {budgetOptions.map((b) => {
                    const isSelected = formData.budgetRange === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetRange: b })}
                        className={`px-4 py-2 text-xs rounded-full font-medium transition-all duration-200 border ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Aimé Mugisha"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                    Work Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="org" className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                    Brand / Organization
                  </label>
                  <input
                    id="org"
                    type="text"
                    placeholder="e.g. Foundation / Production House"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Narrative Textarea */}
              <div className="space-y-2">
                <label htmlFor="narrative" className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                  Project Narrative &amp; Vision *
                </label>
                <textarea
                  id="narrative"
                  rows={4}
                  required
                  placeholder="Describe your story, creative references, intended audience, or core deliverables..."
                  value={formData.narrative}
                  onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">
                  Confidential · We sign NDAs upon request
                </span>
                <button
                  type="submit"
                  data-cursor="SUBMIT"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm rounded-full hover:bg-white/90 transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.25)] active:scale-98"
                >
                  <span>Submit Commission Brief</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* 3. Methodology Breakdown: Full Width */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
              Production Methodology
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-4 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-white">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono text-white/40 uppercase">
                    {step.phase}
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Studio Details & FAQ Matrix: Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Tuvugane Studio Kacyiru
              </h3>
              <div className="space-y-3 text-sm text-white/70 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white mt-1 shrink-0" />
                  <span>KG 563 St, Kacyiru District, Kigali, Rwanda</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <span>+250 788 123 456 / +250 788 000 000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white shrink-0" />
                  <span>Office: Mon–Fri 09:00 – 18:00 CAT (Field units 24/7)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                Official Channels
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-white/70">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Vimeo ↗
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube ↗
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Studio FAQ Matrix
              </h3>
            </div>

            <div className="divide-y divide-white/10">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
                    >
                      <span className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-white/80 transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-sm text-white/60 font-light leading-relaxed pr-8 animate-in fade-in duration-200">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
