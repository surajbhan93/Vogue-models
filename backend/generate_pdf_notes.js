import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target PDF output paths
const artifactPdfPath = 'C:\\Users\\surya\\.gemini\\antigravity\\brain\\e7f82a53-b6e1-4c9d-84d7-e957ab77dd5d\\Vogue_Agency_Project_Delivery_Notes.pdf';
const localPdfPath = path.join(__dirname, 'Vogue_Agency_Project_Delivery_Notes.pdf');

function createPdf(outputPath) {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // 🎨 COLORS
  const goldColor = '#D4AF37';
  const darkColor = '#0F172A';
  const accentColor = '#D97706';
  const grayColor = '#475569';

  // 🔹 HEADER
  doc.rect(0, 0, 595.28, 90).fill('#07090E');
  doc.fillColor(goldColor).fontSize(20).font('Helvetica-Bold').text('VOGUE AGENCY & BOOM BOOM NIGHT IN AMERICA 2027', 40, 25);
  doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica').text('PROJECT DELIVERY MANIFEST & TECHNICAL HANDOVER NOTES', 40, 50);
  doc.fillColor('#94A3B8').fontSize(9).font('Helvetica').text('Developed by: Codelura (build.codelura.com) | Date: August 11, 2026', 40, 68);

  doc.y = 110;

  // 🔹 SECTION 1: EXECUTIVE SUMMARY
  addSectionHeader(doc, '1. EXECUTIVE SUMMARY & DELIVERED MODULES');
  addBullet(doc, 'Frontend Web Platform (Next.js 15 App Router + Tailwind CSS + Framer Motion)');
  addBullet(doc, 'Talent Scouting & Registration Portal (3-Step Application, Photo background category cards)');
  addBullet(doc, 'Model & Talent Dashboard (/dashboard/model for profile, portfolio & availability management)');
  addBullet(doc, 'Admin Control Center (/dashboard/admin for roster verification, contest review, blog CMS & inquiries)');
  addBullet(doc, 'Backend REST API (Node.js + Express, JWT Auth, Cloudinary Uploads, Razorpay Payments)');
  addBullet(doc, 'Database Layer (MongoDB Atlas Cloud + Mongoose ODM with clean indexing)');
  addBullet(doc, 'Legal & Trust Policies (Terms & Conditions, Refund Policy, About Us, 30% TDS, USA Certification)');

  doc.moveDown(0.8);

  // 🔹 SECTION 2: FRONTEND PAGES & UI COMPONENTS
  addSectionHeader(doc, '2. FRONTEND WEBSITE & USER INTERFACES');
  addBullet(doc, 'Homepage (/): 3D Spotlight Talent Hero Carousel, Live Category Filters, Agency Divisions Matrix, Why Choose Us (AURA Distinction), Client Testimonials, Partner Ticker & Global Footer.');
  addBullet(doc, 'Become Model / Scouting (/become-model): 3-stage form with discipline photo backgrounds, headshot upload & live API registration.');
  addBullet(doc, 'Talent Directories (/models, /actors, /singers, /painters, /dancers, /musicians): Advanced category filters, location, height & verified badges.');
  addBullet(doc, 'Mega Auditions & Contests (/contests): Boom Boom Night In America 2027 round details, ₹3,00,000 cash prizes, and USA trip information.');
  addBullet(doc, 'Blog Magazine (/blogs): SEO/AEO optimized articles, search, tags, reading time, author cards, FAQ schema.');
  addBullet(doc, 'Image Gallery (/gallery): High-res showcase, 3D spotlight, lightbox zoom modal.');
  addBullet(doc, 'Contact Page (/ContactPage): Luxury glassmorphic contact form, Thrissur Kerala address, info@voguevibemodels.com email, and helpline.');

  doc.moveDown(0.8);

  // 🔹 SECTION 3: LEGAL & TRUST POLICIES
  addSectionHeader(doc, '3. LEGAL TERMS & FINANCIAL POLICIES');
  addBullet(doc, 'Terms & Conditions (/terms-and-conditions): Multi-talent rules for 5 categories (Modeling, Singing, Painting, Acting, Fashion Designing), 14-35 age limits, parent consent for minors.');
  addBullet(doc, 'Refund Policy (/refund-policy): Step 2 (999) & Step 3 (1,499) evaluation fees are strictly non-refundable & non-transferable.');
  addBullet(doc, 'Taxation & TDS (Section 194B): Mandatory 30% TDS deduction on cash prizes exceeding 10,000 INR as per Indian Tax Laws.');
  addBullet(doc, 'USA Certification: Verifiable Digital Certificates of Merit issued by I Catch Management (USA) via Email/WhatsApp.');
  addBullet(doc, 'Rewards & USA Trip: 1st Prize Mega Winner 3,00,000 INR Cash OR 5-Day Sponsored USA Trip with Hiba Entertainment USA & Kash Patel Production.');

  doc.moveDown(0.8);

  // 🔹 SECTION 4: BACKEND & DATABASE SETUP
  addSectionHeader(doc, '4. BACKEND API & DATABASE ARCHITECTURE');
  addBullet(doc, 'Authentication: JWT Access & Refresh tokens, bcrypt password hashing, Helmet security headers, CORS protection.');
  addBullet(doc, 'Media Pipeline (/api/upload): Cloudinary multipart form-data upload for high-res headshots, portfolios & audition videos.');
  addBullet(doc, 'Payment Gateway (/api/payments): Razorpay order creation and signature verification for registration & workshop fees.');
  addBullet(doc, 'MongoDB Atlas Database: Schemas for Model, Admin, Contest, ContestParticipation, Blog, Contact, Payment, Editorial.');
  addBullet(doc, 'Indexing Cleanup: Removed duplicate Mongoose schema indexes on category, slug, email, and phone.');

  doc.moveDown(0.8);

  // 🔹 SECTION 5: FOOTER & CREDITS
  addSectionHeader(doc, '5. FOOTER & DEVELOPER ATTRIBUTION');
  addBullet(doc, 'Address: 58/78 Near Kairali Homes Building, Near Kurinjakkal Lane, Ayyanthole, Thrissur, Kerala – 680 003');
  addBullet(doc, 'Email & Phone: info@voguevibemodels.com | +91 933628XXXX');
  addBullet(doc, 'Developer Credit: Built by Codelura (build.codelura.com) embedded in global footer.');

  // FOOTER STRIP
  doc.moveDown(1.5);
  doc.rect(40, doc.y, 515.28, 40).fill('#07090E');
  doc.fillColor('#D4AF37').fontSize(9).font('Helvetica-Bold').text('© 2027 VOGUE AGENCY • BOOM BOOM NIGHT IN AMERICA', 50, doc.y - 30, { align: 'center' });
  doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('Official Project Delivery Notes • Developed with Excellence by Codelura (https://build.codelura.com/)', 50, doc.y - 16, { align: 'center' });

  doc.end();
}

function addSectionHeader(doc, text) {
  doc.fillColor('#B45309').fontSize(12).font('Helvetica-Bold').text(text);
  doc.strokeColor('#F59E0B').lineWidth(1).moveTo(40, doc.y + 2).lineTo(555, doc.y + 2).stroke();
  doc.y += 8;
}

function addBullet(doc, text) {
  doc.fillColor('#1E293B').fontSize(9).font('Helvetica').text(`•  ${text}`, { indent: 10, lineGap: 3 });
}

createPdf(localPdfPath);
createPdf(artifactPdfPath);
console.log('PDF Delivery Notes generated successfully!');
