import dbConnect from '../../lib/mongoDB.js';
import Certificate from '../../models/certificateModel.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const certId = searchParams.get('id');

  if (!certId) {
    return Response.json({ error: 'Certificate ID is required' }, { status: 400 });
  }

  await dbConnect();
  const certificate = await Certificate.findOne({ certId, valid: true });

  if (certificate) {
    return Response.json({
      valid: true,
      certificate: {
        name: certificate.name,
        role: certificate.role,
        company: certificate.company,
        pdfUrl: certificate.pdfUrl,
        issueDate: certificate.issueDate.toISOString().split('T')[0]
      }
    });
  } else {
    return Response.json({
      valid: false,
      message: 'Certificate not found or invalid'
    }, { status: 404 });
  }
}