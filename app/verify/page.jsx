"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiTicktick } from 'react-icons/si';
import { FaTimes } from 'react-icons/fa';
import QRCode from 'qrcode';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

function VerifyContent() {
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

  const [pdfUrl, setPdfUrl] = useState("");

  const viewCertificate = async () => {
    setShowCertificate(true);
    setPdfUrl("");

    try {
      const response = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: certificate.name,
          role: certificate.role,
          certId,
          issueDate: certificate.issueDate,
          format: "pdf",
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (err) {
      console.error("Error generating certificate:", err);
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
          certId,
          issueDate: certificate.issueDate,
          format: 'pdf'
        }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ofzen-cert-${certId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
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
                  onClick={viewCertificate}
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
                  {pdfUrl ? (
                    <iframe
                      src={pdfUrl}
                      className="w-full h-[80vh] border border-gray-700 rounded"
                      title="Certificate PDF"
                    />
                  ) : (
                    <div className="w-full h-96 flex items-center justify-center border border-gray-700 rounded">
                      <p className="text-gray-400">Generating certificate...</p>
                    </div>
                  )}
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
      
      <footer className="relative overflow-hidden rounded-t-[70px] border-t-2 w-full text-white py-10 px-8 md:px-16 lg:px-24">
        <div className="flex w-20 opacity-25 h-20 top-10 -left-10 justify-center items-center blur-2xl absolute rounded-full bg-purple-800" />
        <div className="flex w-20 opacity-25 h-20 right-20 -bottom-10 justify-center items-center blur-2xl absolute rounded-full bg-blue-800" />

        <div className="max-w-7xl mx-auto flex justify-between gap-8">
          <div>
            <div className="flex flex-col items-start">
              <img src="./icon.svg" alt="" className="w-16" />
              <h2 className="text-xl font-semibold">OFZEN</h2>
            </div>
            <p className="text-gray-400 mt-2">
              We grow your business <br /> digitally.
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-right flex-col flex">
              <h3 className="text-gray-300 font-semibold">COMPANY</h3>
              <Link href="/" className="text-base sm:text-lg text-gray-400 bg-clip-text hover:text-transparent bg-gradient-to-t to-white via-white from-[#4d4d4d8a] font-[marcellus]">
                Home
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full items-center mt-6 justify-center">
          <Link href="mailto:ofzenenterprise@gmail.com" className="flex items-center bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg  hover:text-gray-400">
            ✉️ ofzenenterprise@gmail.com
          </Link>
          <Link href="https://www.linkedin.com/company/ofzen" className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:text-blue-500">
            <FaLinkedinIn />
          </Link>
          <Link href="https://www.instagram.com/ofzen.dev" className="bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg hover:text-pink-700">
            <FaInstagram />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}