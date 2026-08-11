import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';
import {
  DollarSign,
  ShieldCheck,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  AlertTriangle,
  Receipt,
  Award,
} from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Official Refund & Financial Policy 2027 | Vogue Agency',
  description:
    'Official Fee Refund, Non-refundable Evaluation Policy, 30% TDS Cash Prize Deduction, and Digital Payment Guidelines for Vogue Agency / Boom Boom Night In America 2027.',
  path: '/refund-policy',
  keywords: [
    'Vogue Agency Refund Policy',
    'Boom Boom Night In America Fee Policy',
    'Non Refundable Audition Fee',
    '30 Percent TDS Cash Prize Rule',
    'USA Certification Fee Terms',
  ],
});

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030508] text-slate-300 selection:bg-amber-500 selection:text-black">
      {/* Page Hero */}
      <PageHero
        badge="Financial Policy"
        title="Refund & Cancellation Policy"
        subtitle="Official Billing Terms, Non-Refundable Fee Policy, and 30% TDS Cash Prize Transfer Rules for Vogue Agency / Boom Boom Night In America 2027."
        breadcrumbs={[{ label: 'Refund Policy' }]}
      />

      <PageContainer className="py-16 space-y-16">
        
        {/* Core Policy Highlight */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-amber-500/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Receipt className="w-4 h-4" />
            <span>Strict Non-Refundable Fee Structure</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Registration &amp; Audition Fee Terms
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-light">
            All evaluation fees paid during the multi-talent audition process (<strong>Step 2 Evaluation Fee of ₹ 999</strong> and <strong>Step 3 USA Masterclass Workshop Fee of ₹ 1,499</strong>) are <strong>strictly non-refundable and non-transferable</strong> under any circumstances.
          </p>
        </div>

        {/* Detailed Financial Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Non-Refundable Scenarios */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-white font-bold text-lg font-serif flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400" /> Non-Refundable Scenarios
            </h3>
            <ul className="space-y-3 text-xs text-zinc-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span><strong>Voluntary Withdrawal:</strong> If a participant decides to withdraw or drop out at any stage of the audition.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span><strong>Technical Failure:</strong> Audio/video lag, webcam failure, or internet disconnection on participant's end during live rounds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span><strong>Disqualification:</strong> Fraudulent submissions, lip-syncing/auto-tune in singing, fake artwork in painting, or misconduct.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span><strong>Non-selection:</strong> Elimination during jury evaluation rounds.</span>
              </li>
            </ul>
          </div>

          {/* Cash Prize Payouts & 30% TDS */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-white font-bold text-lg font-serif flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" /> Cash Prize Transfers &amp; 30% TDS
            </h3>
            <ul className="space-y-3 text-xs text-zinc-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span><strong>TDS Deduction (Section 194B):</strong> As per Indian Income Tax Laws, 30% TDS is deducted at source on cash prizes exceeding ₹10,000.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span><strong>Bank Transfer Methods:</strong> Cash rewards (1st Prize ₹3 Lakh, 2nd Prize ₹1.75 Lakh, 3rd Prize ₹1 Lakh, Consolation ₹20,000) are transferred via NEFT/IMPS/UPI post PAN verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span><strong>USA Trip Option:</strong> If the 1st prize winner cannot travel due to visa rejection, candidate receives cash prize net of 30% TDS in bank account.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Contact Support */}
        <section className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" /> Financial Desk Support
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            For payment inquiries, digital payment receipt confirmation, or tax certificate assistance:
          </p>
          <div className="text-xs text-zinc-300 font-mono space-y-1 pt-1">
            <p><strong>Email:</strong> info@voguevibemodels.com | <strong>Phone Helpline:</strong> +91 9336289192</p>
            <p><strong>Address:</strong> 58/78 Near Kairali Homes Building, Near Kurinjakkal Lane, Ayyanthole, Thrissur, Kerala – 680 003</p>
          </div>
        </section>

      </PageContainer>
    </main>
  );
}
