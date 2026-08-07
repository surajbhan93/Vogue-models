// backend/controllers/web/profilePdf.controller.js
// Requires: npm install pdfkit
import PDFDocument from 'pdfkit';
import Model from '../../models/Model.js';

// 🔹 DOWNLOAD PROFILE AS PDF
export const downloadProfilePdf = async (req, res) => {
  try {
    const model = await Model.findById(req.user._id);
    if (!model) {
      return res.status(404).json({ success: false, message: 'Model not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${model.name.replace(/\s+/g, '_')}_portfolio.pdf"`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(22).text(model.name, { align: 'left' });
    doc.fontSize(10).fillColor('#8A8178').text(`${model.gender} | Experience: ${model.experience}`);
    doc.moveDown();

    doc.fillColor('#1C1A19').fontSize(12).text('Measurements', { underline: true });
    doc.fontSize(10).text(`Height: ${model.height || '-'} cm   Weight: ${model.weight || '-'} kg`);
    if (model.measurements) {
      doc.text(`Bust: ${model.measurements.bust || '-'}  Waist: ${model.measurements.waist || '-'}  Hips: ${model.measurements.hips || '-'}`);
    }
    doc.moveDown();

    doc.fontSize(12).text('Appearance', { underline: true });
    doc.fontSize(10).text(`Hair: ${model.hairColor || '-'}   Eyes: ${model.eyeColor || '-'}`);
    doc.moveDown();

    if (model.bio) {
      doc.fontSize(12).text('Bio', { underline: true });
      doc.fontSize(10).text(model.bio);
      doc.moveDown();
    }

    if (model.specialties?.length) {
      doc.fontSize(12).text('Specialties', { underline: true });
      doc.fontSize(10).text(model.specialties.join(', '));
      doc.moveDown();
    }

    if (model.preferredLocation) {
      doc.fontSize(12).text('Location', { underline: true });
      const loc = model.preferredLocation;
      doc.fontSize(10).text([loc.city, loc.state, loc.country].filter(Boolean).join(', ') || '-');
    }

    doc.end();
  } catch (error) {
    console.error('Download profile PDF error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate PDF', error: error.message });
  }
};
