import React from 'react';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata/pageMetadata';
import { PageHero } from '@/components/common/PageHero';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionTitle } from '@/components/common/SectionTitle';

export const metadata = generatePageMetadata({
  title: 'Official 2027 Event Guide & Audition Rules | Vogue Agency',
  description:
    'Complete guide for Boom Boom Night In America 2027. Learn online auditions, prizes, categories, rules, and USA certificates.',
  path: '/official-guide',
  keywords: [
    'Vogue Agency Official Guide 2027',
    'Boom Boom Night In America Rules',
    'Online Audition Steps',
    'Modeling Acting Singing Audition',
    'I Catch Management USA Certificate',
  ],
});

export default function OfficialGuidePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero
        badge="Official 2027 Guide"
        title="Event Guide & Audition Rules"
        subtitle="Boom Boom Night In America 2027 - Complete handbook for all participants"
        breadcrumbs={[{ label: 'Official Guide 2027' }]}
      />

      <PageContainer className="py-12 space-y-12">

        {/* Welcome Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-400">Welcome to Vogue Agency</h2>
          <p className="text-gray-300 leading-relaxed">
            Boom Boom Night In America 2027 is India's premier multi-talent launchpad designed to take local talent to a global stage. 
            We are on a mission to discover, groom, and elevate the next generation of creative minds. Our platform is a grand celebration 
            of art, style, and performance, bringing together the four pillars of the creative industry: Modeling, Singing, Painting, 
            Acting, and Fashion Designing. We bridge the gap between raw talent and international opportunities.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Every participant receives an official, verifiable Certificate of Merit from our USA-based partner company, I CATCH MANAGEMENT.
          </p>
        </section>

        {/* Our Vision */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            We believe that every passionate artist deserves the right spotlight. We do not just host a competition; we build careers. 
            Through professional grooming, expert mentorship, and high-profile industry exposure, we prepare young talents to confidently 
            step onto the global map and transform their passion into a successful profession.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Global Validation:</strong> Every single participant receives an official, verifiable Certificate of Merit from our registered USA-based partner company.</li>
            <li><strong>Life-Changing Rewards:</strong> Top winners secure grand cash prizes of up to ₹3,00,000 or a trip to America.</li>
            <li><strong>The Ultimate Mega Runway:</strong> We provide a collaborative stage where fresh models walk the ramp wearing collections by upcoming fashion designers, while top singers, painters, and actors perform live simultaneously.</li>
          </ul>
        </section>

        {/* About Us */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">About Us</h2>
          <p className="text-gray-300 leading-relaxed">
            We have been in this field for the last 12 years. We have organized numerous fashion shows in America, England, India, Dubai, and France. 
            Thousands of successful candidates have achieved their dreams through our platform over the last 12 years.
          </p>
          <p className="text-gray-300 leading-relaxed">
            All participants will receive a digital certificate from our American-based company on their email ID.
          </p>
        </section>

        {/* Age Groups & Eligibility */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Age Groups & Eligibility</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Recommended Age Groups</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Junior Category:</strong> Age 10 to 15 Years - Focus on Painting, Singing, and Acting</li>
                <li><strong>Senior Category:</strong> Age 16 to 35 Years - Focus on Modeling, Fashion Designing, Acting, and Singing</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Category-Wise Age Limits</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Modeling & Acting:</strong> 16 to 35 Years</li>
                <li><strong>Fashion Designing:</strong> 18 to 35 Years</li>
                <li><strong>Singing & Painting:</strong> 12 to 35 Years</li>
              </ul>
              <p className="text-gray-400 text-sm mt-2">Recommended overall age limit: 14 to 35 years</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
              <h3 className="text-lg font-semibold text-white">Important Rules for Minors</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Participants under 18 must provide parent/guardian consent with Email ID and phone number</li>
                <li>If a minor wins the cash prize or trip, the prize will be handed over to their parents/legal guardians</li>
                <li>Valid government-issued identity proof required (Aadhaar Card, Passport, etc.)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5 Talent Categories */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">The 5 Talent Categories</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">1. Modeling</h3>
              <p className="text-gray-300">Submit a 30-second video of a home runway walk (corridor/garden) + a 30-second spoken introduction video.</p>
              <p className="text-gray-400 text-sm mt-1">Models must participate in all grooming sessions and rehearsals as per schedule.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">2. Singing</h3>
              <p className="text-gray-300">Submit a 1-minute raw, unedited singing video. Auto-tune and voice filters are strictly banned.</p>
              <p className="text-gray-400 text-sm mt-1">Tracks (Karaoke) or instruments must be approved by the technical team prior to performance.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">3. Painting</h3>
              <p className="text-gray-300">Submit a 1-minute time-lapse video of yourself creating a painting + a high-resolution final photo of the artwork.</p>
              <p className="text-gray-400 text-sm mt-1">All live painting materials must be brought by the participant. Art pieces must be original; plagiarism leads to disqualification.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">4. Fashion Designing</h3>
              <p className="text-gray-300">Submit a digital lookbook (3 to 5 photos or a video) of your stitched garments on a mannequin or friend.</p>
              <p className="text-gray-400 text-sm mt-1">Designers are responsible for the fit and completion of their garments.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
              <h3 className="text-lg font-semibold text-white">5. Acting</h3>
              <p className="text-gray-300">Submit a 2-minute high-resolution acting video.</p>
              <p className="text-gray-400 text-sm mt-1">Judged on 5 criteria:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 mt-1">
                <li><strong>Voice Modulation:</strong> Clarity, projection, tone, and pacing of dialogue delivery</li>
                <li><strong>Facial Expressions:</strong> Emotional authenticity and micro-expressions suitable for the character</li>
                <li><strong>Body Language:</strong> Posture, movement, and physical control across the stage</li>
                <li><strong>Characterization:</strong> Understanding and embodying the assigned or chosen role</li>
                <li><strong>Stage Presence:</strong> Ability to command audience attention and maintain confidence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4-Step Online Audition Process */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">4-Step Online Audition Process</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Step 1: Free Registration</h3>
              <p className="text-gray-300">Visit the portal, select your talent category, fill out personal details, and submit the basic form. 100% Free!</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Step 2: Evaluation Fee (₹999)</h3>
              <p className="text-gray-300">Upload your audition video and pay ₹999 evaluation fee. Strictly non-refundable and non-transferable under any circumstances, including disqualification or voluntary withdrawal.</p>
              <p className="text-gray-400 text-sm mt-1">Participants must ensure all details in the registration form are accurate. False information leads to disqualification without refund.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Step 3: USA Masterclass (₹1,499)</h3>
              <p className="text-gray-300">Attend specialized live online training from USA experts + Live Zoom audition round with international judges.</p>
              <p className="text-gray-400 text-sm mt-1">You will receive free workshop training from America in your specialized field.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
              <h3 className="text-lg font-semibold text-white">Step 4: Grand Finale & Results</h3>
              <p className="text-gray-300">Top talent compiled into high-production Mega Finale broadcasted live on YouTube/Facebook.</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 mt-1">
                <li>USA Certificates emailed to all participants within 30 days</li>
                <li>Cash prizes transferred digitally via NEFT/IMPS/UPI</li>
                <li>Winners announced live at the end of the stream</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prizes & Rewards */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Prizes & Rewards</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
              <h3 className="text-lg font-semibold text-white">1st Prize - Mega Winner</h3>
              <p className="text-gray-300">₹3,00,000 OR 5-Day Sponsored USA Trip</p>
              <p className="text-gray-400 text-sm mt-1">Perform live alongside Bollywood Celebrities with HIBA ENTERTAINMENT USA &amp; KASH PATEL PRODUCTION.</p>
              <p className="text-gray-400 text-sm">The mega winner will share the stage with Bollywood Actor/Actress or take ₹3 Lakh from the company.</p>
              <p className="text-gray-400 text-sm">If visa is rejected or passport unavailable, winner receives full cash prize (net of 30% TDS).</p>
              <p className="text-gray-400 text-sm mt-1">Passport and visa formalities shall be handled by the candidates. The trip will be sponsored.</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">2nd Prize</h3>
              <p className="text-gray-300">₹1,75,000</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">3rd Prize</h3>
              <p className="text-gray-300">₹1,00,000</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Consolation Prizes</h3>
              <p className="text-gray-300">5 Consolation Prizes of ₹20,000 each in every category</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-semibold text-red-400">Important: 30% TDS Mandatory</h3>
            <p className="text-gray-300">As per Indian Tax Laws (Section 194B of the Income Tax Act), a 30% TDS (Tax Deducted at Source) will be applicable on all cash prizes exceeding ₹10,000. Winners will receive the prize money net of tax.</p>
            <p className="text-gray-400 text-sm mt-1">Cash rewards will be transferred electronically via NEFT, IMPS, or UPI after valid PAN Card submission.</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
            <h3 className="text-lg font-semibold text-white">USA Trip Coverage</h3>
            <p className="text-gray-300">The international trip prize covers:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4">
              <li>Economy flight tickets</li>
              <li>Standard hotel accommodation</li>
            </ul>
            <p className="text-gray-400 text-sm mt-1">Any expenses related to Passport issuance, Visa fees, personal shopping, or food/travel outside the itinerary must be borne entirely by the winner.</p>
          </div>
        </section>

        {/* USA Trip & Global Exposure */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">USA Trip & Global Exposure</h2>
          
          <div className="space-y-2 text-gray-300">
            <p><strong>The winning candidates will get the opportunity to:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Share the stage with Bollywood celebrities in America with HIBA ENTERTAINMENT and KASH PATEL PRODUCTION</li>
              <li>Walk in New York Fashion Show</li>
              <li>Perform at Cannes Film Festival</li>
              <li>Participate in Paris Milan Fashion Show</li>
              <li>Get featured in USA magazines</li>
              <li>Work in music videos</li>
            </ul>
            <p className="mt-2 text-gray-400 text-sm">The winner will receive the certificate of I CATCH MANAGEMENT.</p>
          </div>
        </section>

        {/* USA College Courses */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">USA College Courses & Certificates</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Short-Term Online Certificates (Weeks to Months)</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <p><strong>Parsons School of Design - Parsons x Yellowbrick Certificates</strong></p>
                  <ul className="list-disc list-inside ml-4 text-sm">
                    <li>Duration: 5 to 8 weeks (Self-paced, online)</li>
                    <li>Focus: Fashion Industry Essentials or Fashion Business Essentials</li>
                    <li>Learn: Visual merchandising, trend forecasting, marketing, and media</li>
                    <li>Perk: Official certificate from Parsons with video lessons from Teen Vogue and WWD editors</li>
                  </ul>
                </div>

                <div>
                  <p><strong>Vogue College of Fashion</strong></p>
                  <ul className="list-disc list-inside ml-4 text-sm">
                    <li>Certificate tracks in Retail Design &amp; Visual Merchandising</li>
                    <li>Creative Direction and Fashion Media</li>
                  </ul>
                </div>

                <div>
                  <p><strong>California College of the Arts (CCA)</strong></p>
                  <ul className="list-disc list-inside ml-4 text-sm">
                    <li>Specialized pre-college and introductory online fashion design tracks</li>
                    <li>Foundational learning programs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Formal University Degrees (2 to 4 Years)</h3>
              <div>
                <p><strong>Academy of Art University (San Francisco)</strong></p>
                <ul className="list-disc list-inside ml-4 text-gray-300 text-sm space-y-1">
                  <li>2 to 4 year remote BFA &amp; Master's tracks</li>
                  <li>Disciplines: Jewelry &amp; Metal Arts, Fashion Design, Fashion Merchandising</li>
                  <li>Comprehensive design training, sketching, textiles, and portfolio creation</li>
                  <li>Entirely through digital submissions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Registration Form */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Digital Registration Form Fields</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Section 1: General & Contact Information</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Full Name</li>
                <li>Date of Birth (DD/MM/YYYY)</li>
                <li>Gender (Male / Female / Other)</li>
                <li>WhatsApp Number</li>
                <li>Email Address</li>
                <li>City &amp; State</li>
                <li>Instagram Profile Link (Optional)</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Section 2: Choose Your Talent Category</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm">
                <li>Modeling</li>
                <li>Singing</li>
                <li>Painting</li>
                <li>Fashion Designing</li>
                <li>Acting</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Section 3: Category-Specific Details</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p><strong>Modeling:</strong> Height, Current Profession, Previous experience</p>
                <p><strong>Singing:</strong> Preferred Genre, Instrument playing</p>
                <p><strong>Painting:</strong> Preferred Medium (Acrylic/Oil/Watercolor/Digital/Sketching)</p>
                <p><strong>Fashion Designing:</strong> Brand Name, Type of Clothing</p>
                <p><strong>Acting:</strong> Voice Modulation, Facial Expressions, Body Language, Characterization, Stage Presence</p>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Section 4: Mandatory Document Upload</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Government ID Proof (Aadhaar/Passport/Driving License) - Max 5MB</li>
                <li>Passport Size Photo - Max 2MB</li>
                <li>Fee Payment Receipt/Screenshot - Max 2MB</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
              <h3 className="text-lg font-semibold text-white">Section 5: Consent & Declaration</h3>
              <p className="text-gray-300 text-sm">Declaration Checkbox confirming all information is true and agreement to Terms &amp; Conditions.</p>
            </div>
          </div>
        </section>

        {/* Terms & Conditions Summary */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Terms & Conditions</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Certification (USA Partner Company - I CATCH MANAGEMENT)</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Participation and Merit Certificates issued by our registered USA-based partner entity</li>
                <li>Certificates distributed only to participants who complete all mandatory rounds</li>
                <li>Digital certificates delivered via email or WhatsApp</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Media Rights & Intellectual Property</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Organizers reserve rights to photograph, film, and record all participants</li>
                <li>All media collected remains exclusive property of Organizers</li>
                <li>May be used for marketing, broadcasting, and social media promotion globally without compensation</li>
                <li>Painting Category: Organizers reserve rights to display, auction, or sell paintings created</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Code of Conduct & Disqualification</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Misbehavior, abusive language, or misconduct leads to instant disqualification</li>
                <li>Decisions of judging panel and management team are final and binding</li>
                <li>No arguments, appeals, or correspondences entertained regarding results</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Online-Only Terms & Conditions</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong>Technical Requirements:</strong> Participants responsible for stable internet, webcam, and microphone</li>
                <li><strong>Digital Fraud:</strong> All video submissions must be unedited; plagiarism leads to disqualification</li>
                <li><strong>Time-lapse proof:</strong> Mandatory for Painting category to verify original authorship</li>
                <li><strong>Digital Media Rights:</strong> Participants grant permanent, royalty-free rights to use videos for marketing</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Force Majeure & Liability</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Organizers not liable for injury, loss, theft, or damage to personal belongings</li>
                <li>Organizers reserve rights to change event dates, venues, or formats due to unforeseen circumstances</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-amber-500/30">
              <h3 className="text-lg font-semibold text-white">Jurisdiction</h3>
              <p className="text-gray-300 text-sm">Any legal disputes shall be subject exclusively to the jurisdiction of courts in Thrissur, Kerala, India.</p>
            </div>
          </div>
        </section>

        {/* Contact & Address */}
        <section className="space-y-4 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-amber-400">Contact & Address</h2>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-300">
              <strong>Registered Address:</strong><br />
              58/78 Near Kairali Homes Building,<br />
              Near Kurinjakkal Lane, Ayyanthole,<br />
              Thrissur, Kerala – 680 003
            </p>
            <p className="text-gray-300 mt-2">
              <strong>Email:</strong> info@voguevibemodels.com<br />
              <strong>Helpline:</strong> +91 9336289192
            </p>
          </div>
        </section>

        {/* Apply Button */}
        <div className="text-center pt-4 border-t border-gray-800">
          <Link
            href="/become-model#register"
            className="inline-block bg-amber-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all"
          >
            Apply for Audition Now
          </Link>
          <p className="text-gray-400 text-sm mt-2">Registration is FREE! First step is 100% free.</p>
        </div>

      </PageContainer>
    </main>
  );
}