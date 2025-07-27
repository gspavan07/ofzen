"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiTicktick } from 'react-icons/si';
import { FaTimes } from 'react-icons/fa';
import QRCode from 'qrcode';

export default function VerifyPage() {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const searchParams = useSearchParams();
  const certId = searchParams.get('id');

  useEffect(() => {
    if (certId) {
      fetch(`/api/verify?id=${certId}`)
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            setCertificate(data.certificate);
            generateQRCode(certId);
          } else {
            setError(data.message);
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to verify certificate');
          setLoading(false);
        });
    } else {
      setError('No certificate ID provided');
      setLoading(false);
    }
  }, [certId]);

  const generateQRCode = async (id) => {
    const verifyUrl = `${window.location.origin}/verify?id=${id}`;
    try {
      const url = await QRCode.toDataURL(verifyUrl, {
        width: 150,
        margin: 2,
        color: { dark: '#000000', light: '#FFFFFF' }
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: certificate.name,
          role: certificate.role,
          certId: certId,
          issueDate: certificate.issueDate,
          qrCodeUrl: qrCodeUrl
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const link = document.createElement('a');
        link.href = data.pdfUrl;
        link.download = data.filename;
        link.click();
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
    setDownloading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Verifying certificate...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {certificate ? (
        <>
          <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-8 text-center">
              <SiTicktick className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4 text-green-500">Certificate Verified ✓</h1>
              <div className="space-y-3 text-left">
                <p><span className="text-gray-400">Name:</span> {certificate.name}</p>
                <p><span className="text-gray-400">Role:</span> {certificate.role}</p>
                <p><span className="text-gray-400">Issue Date:</span> {certificate.issueDate}</p>
              </div>
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition"
                >
                  View Certificate
                </button>
                <a 
                  href="/" 
                  className="block bg-[#9494941c] border-2 border-gray-700 px-6 py-3 rounded-lg hover:bg-[#70ff4533] transition"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>

          {showCertificate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-black text-white rounded-lg w-full max-w-6xl max-h-full overflow-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold">Certificate Preview</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={downloadPDF}
                      disabled={downloading}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
                    >
                      {downloading ? "Generating..." : "Download PDF"}
                    </button>
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="text-2xl text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <iframe
                    srcDoc={`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .bg {
      position: absolute;
      width: 1700px;
      overflow: hidden;
    }
    .certificate {
      background: transparent;
      padding: 60px;
      height: 88vh;
      width: 100%;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .logo {
      width: 200px;
      height: auto;
      position: absolute;
      top: 60px;
      right: 80px;
    }
    .title {
      text-transform: uppercase;
      color: #34495e;
      font-size: 50px;
      margin: 0;
      font-weight: bold;
    }
    .subtitle {
      text-transform: uppercase;
      color: #000;
      font-weight: bolder;
      font-size: 40px;
      margin: 10px 0 20px 0;
    }
    .name {
      font-size: 42px;
      font-weight: bold;
      margin: 10px 0;
    }
    .desc {
      font-size: 18px;
      color: #34495e;
      width: 65%;
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      position: absolute;
      bottom: 20px;
      color: #7f8c8d;
      font-size: 16px;
    }
    .cert-id {
      position: absolute;
      bottom: 20px;
      right: 30px;
      color: #bdc3c7;
      font-size: 14px;
    }
    .qr-code {
      position: absolute;
      bottom: 20px;
      left: 30px;
      width: 200px;
      height: 200px;
    }
  </style>
</head>
<body>
  <img class="bg" src="/Ofzen-CERT.png" alt="">
  <div class="certificate">
    <img class="logo" src="/logo.png" alt="">
    <div class="title">Internship Completion</div>
    <p class="subtitle">Certificate</p>
    <p style="font-size: 20px; color: #34495e; margin: 30px 0;">This is to certify that</p>
    <div class="name">${certificate.name}</div>
    <p class="desc">Has successfully completed an internship as ${certificate.role}, exhibiting strong technical proficiency and a keen understanding of modern web technologies. Their contributions reflected professionalism, problem-solving ability, and attention to detail.</p>
    <div class="footer">
      <p><strong>Issue Date:</strong> ${certificate.issueDate}</p>
      <p style="margin-top: 10px; font-style: italic;">"Excellence in Digital Innovation"</p>
    </div>
    ${qrCodeUrl ? `<img src="${qrCodeUrl}" class="qr-code" alt="QR Code" />` : ""}
    <div class="cert-id">Certificate ID: ${certId}</div>
  </div>
</body>
</html>`}
                    className="w-full h-96 border-0"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-8 text-center">
            <FaTimes className="text-red-500 text-6xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-red-500">Certificate Invalid ✗</h1>
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
            <div className="mt-8">
              <a 
                href="/" 
                className="inline-block bg-[#9494941c] border-2 border-gray-700 px-6 py-3 rounded-lg hover:bg-[#70ff4533] transition"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}