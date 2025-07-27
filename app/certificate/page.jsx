"use client";
import QRGenerator from '../components/QRGenerator';

export default function CertificatePage() {
  const certificates = [
    { id: '6681', name: 'Intern Name 1', role: 'Web Development Intern' },
    { id: '6781', name: 'Intern Name 2', role: 'UI/UX Design Intern' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Certificate Demo</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">OFZEN</h2>
                <h3 className="text-xl mb-4">Certificate of Completion</h3>
                <p className="text-lg">This certifies that</p>
                <p className="text-2xl font-bold text-blue-400 my-4">{cert.name}</p>
                <p className="text-lg">has successfully completed the internship as</p>
                <p className="text-xl font-semibold text-green-400 my-2">{cert.role}</p>
                <p className="text-sm text-gray-400 mt-4">Certificate ID: {cert.id}</p>
              </div>
              
              <div className="flex justify-center">
                <QRGenerator certId={cert.id} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="inline-block bg-[#9494941c] border-2 border-gray-700 px-6 py-3 rounded-lg hover:bg-[#70ff4533] transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}