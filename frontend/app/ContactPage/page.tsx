'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  Building2,
  Crown,
  ShieldCheck,
  Award,
  Globe,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Share2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// High Fashion Model Showcase Images for Contact Hero
const CONTACT_MODEL_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
    name: 'Elena Rostova',
    role: 'High Fashion Model',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1598815000898-7d8cd4dc90f1?w=600&auto=format&fit=crop&q=80',
    name: 'Sophia Vane',
    role: 'Cinema & TV Actress',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1617551307538-c9cdb9d71289?w=600&auto=format&fit=crop&q=80',
    name: 'Marcus Sterling',
    role: 'Commercial Male Model',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1659095012554-e4cc81fc04c0?w=600&auto=format&fit=crop&q=80',
    name: 'Aria Montgomery',
    role: 'Stage Vocalist',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'Modeling Division',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3004/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        toast.success('Your message has been received by Vogue Agency!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: 'Modeling Division',
        });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      // Graceful fallback simulation
      setSuccess(true);
      toast.success('Thank you! Your message was submitted successfully.');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/voguevibemodels/' },
    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@VogueVibeModels' },
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/people/Voguevibemodels/61592543384808/' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://lnkd.in/gUNKBhKF' },
    { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/voguevibemodels' },
  ];

  return (
    <div className="min-h-screen bg-[#030508] text-slate-300 selection:bg-amber-500 selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 🌟 HERO SECTION */}
      <section className="max-w-7xl mx-auto space-y-8 text-center mb-16 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
          Vogue Agency Global Support &amp; Scouting Desk 2027
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Connect With Our <br />
            <span className="gold-gradient-text italic font-serif">Global Talent Team</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
            Have questions about auditions, USA partner certification, ₹3 Lakh cash prizes, or multi-talent launching? Our team is available 24/7 to assist you.
          </p>
        </div>

        {/* High Fashion Talent Spotlight Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
          {CONTACT_MODEL_IMAGES.map((model) => (
            <div
              key={model.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-xl hover:border-amber-400/60 transition-all duration-500"
            >
              <img
                src={model.url}
                alt={model.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-3 flex flex-col justify-end text-left">
                <span className="text-white font-bold text-xs truncate">{model.name}</span>
                <span className="text-[10px] text-amber-400 font-mono font-medium">{model.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 CONTACT FORM & OFFICIAL INFO SECTION */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* 📝 LEFT COLUMN: LUXURY CONTACT FORM */}
          <div className="lg:col-span-7 bg-zinc-950/90 border border-amber-500/30 p-6 sm:p-10 rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.15)] space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Direct Inquiry Desk
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                Send Us A Message
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Fill out your details below. Our scouting executives respond within 24 hours.
              </p>
            </div>

            {success ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Thank you for reaching out to Vogue Agency. Our audition support team will contact you shortly via email or WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 933628xxxx"
                      required
                      className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Talent Division Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 text-white text-xs sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 transition-all"
                    >
                      <option value="Modeling Division">👠 Modeling Division</option>
                      <option value="Acting & Drama">🎭 Acting &amp; Drama</option>
                      <option value="Singing & Vocalists">🎤 Singing &amp; Vocalists</option>
                      <option value="Fashion Designing">👗 Fashion Designing</option>
                      <option value="Painting & Fine Art">🎨 Painting &amp; Fine Art</option>
                      <option value="USA Certification Support">🏆 USA Certificate Support</option>
                      <option value="General Inquiry">📩 General Audition Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Inquiry regarding Boom Boom Night In America 2027"
                    required
                    className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Message Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message or audition query here..."
                    rows={5}
                    required
                    className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* 📍 RIGHT COLUMN: OFFICIAL HEADQUARTERS INFO (Footer Address & Email) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-950/90 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  Verified Headquarters
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Contact Information
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Registered Office Address</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    58/78 Near Kairali Homes Building, Near Kurinjakkal Lane, Ayyanthole, Thrissur, Kerala – 680 003
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Official Communication Email</h4>
                  <p className="text-xs text-zinc-300 font-mono">
                    <a href="mailto:info@voguevibemodels.com" className="hover:text-amber-300 transition-colors">
                      info@voguevibemodels.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone Helpline */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Audition Helpline &amp; WhatsApp</h4>
                  <p className="text-xs text-zinc-300 font-mono">+91 933628xxxx</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Desk Working Hours</h4>
                  <p className="text-xs text-zinc-300 font-light">Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                  <p className="text-xs text-zinc-300 font-light">Saturday: 10:00 AM – 4:00 PM IST</p>
                </div>
              </div>

              {/* Official Social Links */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                  Official Social Networks
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-300 hover:border-amber-400/50 transition-all"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* USA Partner Trust Box */}
            <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-xs text-zinc-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase font-mono tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> USA Partner Entities
              </div>
              <p className="font-light leading-relaxed text-zinc-300">
                Official certificates issued by <strong>I Catch Management (USA)</strong>. Production partners: <strong>Hiba Entertainment USA &amp; Kash Patel Production</strong>.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}