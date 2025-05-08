import PDFDocument = require('pdfkit');
import * as fs from 'fs';

export function generateCertificat(participantName: string, formationTitle: string, outputPath: string) {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

  doc
    .fontSize(30)
    .fillColor('orange')
    .text('🎓 Certificat de Formation', { align: 'center' });

  doc.moveDown();

  doc
    .fontSize(20)
    .fillColor('black')
    .text(`Décerné à : ${participantName}`, { align: 'center' });

  doc.moveDown();

  doc
    .fontSize(16)
    .text(`Pour avoir complété la formation : ${formationTitle}`, { align: 'center' });

  doc.moveDown();

  doc
    .fontSize(12)
    .text(`Date : ${new Date().toLocaleDateString()}`, { align: 'center' });

  doc.end();
}
