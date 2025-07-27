import dbConnect from '../../../lib/mongoDB.js';
import Certificate from '../../../models/certificateModel.js';

export async function GET() {
  await dbConnect();
  const certificates = await Certificate.find({});
  const certMap = {};
  certificates.forEach(cert => {
    certMap[cert.certId] = {
      name: cert.name,
      role: cert.role,
      email: cert.email,
      company: cert.company,
      pdfUrl: cert.pdfUrl,
      issueDate: cert.issueDate.toISOString().split('T')[0],
      valid: cert.valid
    };
  });
  return Response.json(certMap);
}

export async function POST(request) {
  await dbConnect();
  const { name, role, email, pdfUrl } = await request.json();
  
  const certId = Math.floor(Math.random() * 9000) + 1000;
  const certificate = new Certificate({
    certId: certId.toString(),
    name,
    role,
    email,
    pdfUrl: pdfUrl || ''
  });
  
  await certificate.save();
  return Response.json({ 
    success: true, 
    certId, 
    certificate: {
      name: certificate.name,
      role: certificate.role,
      email: certificate.email,
      company: certificate.company,
      pdfUrl: certificate.pdfUrl,
      issueDate: certificate.issueDate.toISOString().split('T')[0],
      valid: certificate.valid
    }
  });
}

export async function PUT(request) {
  await dbConnect();
  const { certId, pdfUrl } = await request.json();
  
  const result = await Certificate.updateOne({ certId }, { pdfUrl });
  return Response.json({ success: result.modifiedCount > 0 });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const certId = searchParams.get('id');
  
  const result = await Certificate.deleteOne({ certId });
  return Response.json({ success: result.deletedCount > 0 });
}