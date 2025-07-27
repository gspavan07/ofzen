"use client";
import { useState, useEffect } from "react";
import QRGenerator from "../../components/QRGenerator";

export default function AdminDashboard() {
  const [certificates, setCertificates] = useState({});
  const [newIntern, setNewIntern] = useState({
    name: "",
    role: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailDialog, setEmailDialog] = useState({ show: false, type: '', cert: null, certId: '' });
  const [emailContent, setEmailContent] = useState({ subject: '', message: '' });

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      window.location.href = "/admin";
      return;
    }
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const response = await fetch("/api/admin/certificates");
    const data = await response.json();
    setCertificates(data);
  };

  const addIntern = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newIntern.name,
        role: newIntern.role,
        email: newIntern.email,
      }),
    });

    if (response.ok) {
      setNewIntern({ name: "", role: "", email: "" });
      fetchCertificates();
    }
    setLoading(false);
  };

  const deleteIntern = async (certId) => {
    await fetch(`/api/admin/certificates?id=${certId}`, { method: "DELETE" });
    fetchCertificates();
  };

  const viewCertificate = async (certId, cert) => {
    setSelectedCert({ ...cert, certId });
    setShowCertificate(true);
    setPdfUrl("");

    try {
      const response = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cert.name,
          role: cert.role,
          certId,
          issueDate: cert.issueDate,
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

  const downloadCertificate = async (certId, cert) => {
    setDownloadingPdf(true);
    try {
      const response = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cert.name,
          role: cert.role,
          certId,
          issueDate: cert.issueDate,
          format: "pdf",
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ofzen-cert-${certId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error("Error downloading certificate:", err);
    }
    setDownloadingPdf(false);
  };

  const openEmailDialog = (certId, cert, type) => {
    const defaultSubject = type === 'offer' 
      ? `Internship Offer - ${cert.role} at OFZEN`
      : `Internship Completion Certificate - ${cert.name}`;
    
    const defaultMessage = type === 'offer'
      ? `Dear ${cert.name},\n\nWe are pleased to offer you an internship position as ${cert.role} at OFZEN.\n\nYour internship will commence soon. We look forward to having you on our team.\n\nBest regards,\nOFZEN Team`
      : `Dear ${cert.name},\n\nCongratulations! You have successfully completed your internship as ${cert.role} at OFZEN.\n\nPlease find your completion certificate attached.\n\nWe wish you all the best in your future endeavors.\n\nBest regards,\nOFZEN Team`;
    
    setEmailContent({ subject: defaultSubject, message: defaultMessage });
    setEmailDialog({ show: true, type, cert, certId });
  };

  const sendEmail = async () => {
    setSendingEmail(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: emailDialog.cert.name,
          email: emailDialog.cert.email,
          role: emailDialog.cert.role,
          certId: emailDialog.certId,
          issueDate: emailDialog.cert.issueDate,
          type: emailDialog.type,
          subject: emailContent.subject,
          message: emailContent.message,
        }),
      });

      if (response.ok) {
        alert(`${emailDialog.type === 'offer' ? 'Offer letter' : 'Completion letter'} sent successfully!`);
        setEmailDialog({ show: false, type: '', cert: null, certId: '' });
      } else {
        alert('Failed to send email');
      }
    } catch (err) {
      console.error("Error sending email:", err);
      alert('Failed to send email');
    }
    setSendingEmail(false);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Add New Intern</h2>
            <form onSubmit={addIntern} className="space-y-4">
              <input
                type="text"
                placeholder="Intern Name"
                value={newIntern.name}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, name: e.target.value })
                }
                className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g., Web Development Intern)"
                value={newIntern.role}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, role: e.target.value })
                }
                className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg text-white"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newIntern.email}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, email: e.target.value })
                }
                className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg text-white"
                required
              />


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
              >
                {loading ? "Adding..." : "Add Intern"}
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Certificate Statistics</h2>
            <p className="text-2xl text-green-400">
              {Object.keys(certificates).length} Total Certificates
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Manage Certificates</h2>
          <div className="grid gap-4">
            {Object.entries(certificates).map(([certId, cert]) => (
              <div
                key={certId}
                className="bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center md:items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{cert.name}</h3>
                    <p className="text-gray-400">{cert.role}</p>
                    <p className="text-sm text-gray-500">
                      ID: {certId} | Email: {cert.email} | Issued: {cert.issueDate}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => viewCertificate(certId, cert)}
                        className="text-blue-400 text-sm hover:underline cursor-pointer"
                      >
                        📄 View Certificate
                      </button>
                      <button
                        onClick={() => downloadCertificate(certId, cert)}
                        disabled={downloadingPdf}
                        className="text-green-400 text-sm hover:underline cursor-pointer disabled:opacity-50"
                      >
                        {downloadingPdf ? "⏳ Downloading..." : "📥 Download PDF"}
                      </button>
                      <button
                        onClick={() => openEmailDialog(certId, cert, 'offer')}
                        className="text-yellow-400 text-sm hover:underline cursor-pointer"
                      >
                        📧 Send Offer
                      </button>
                      <button
                        onClick={() => openEmailDialog(certId, cert, 'completion')}
                        className="text-purple-400 text-sm hover:underline cursor-pointer"
                      >
                        🎓 Send Certificate
                      </button>
                    </div>
                  </div>
                  <div className="flex w-32 items-center gap-4">
                    <QRGenerator certId={certId} />
                  </div>
                  <button
                    onClick={() => deleteIntern(certId)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCertificate && selectedCert && (
        <div className="fixed inset-0 w-full bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-black text-white rounded-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold mr-12">
                Certificate Preview
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    downloadCertificate(selectedCert.certId, selectedCert)
                  }
                  disabled={downloadingPdf}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {downloadingPdf ? "Downloading..." : "Download PDF"}
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="text-2xl text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-2">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="h-96 w-full border border-gray-700 rounded"
                  title="Certificate PDF"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center border border-gray-700 rounded">
                  <p className="text-gray-400">Getting certificate...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {emailDialog.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-black text-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">
                {emailDialog.type === 'offer' ? 'Send Offer Letter' : 'Send Completion Certificate'}
              </h3>
              <button
                onClick={() => setEmailDialog({ show: false, type: '', cert: null, certId: '' })}
                className="text-2xl text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To:</label>
                <input
                  type="email"
                  value={emailDialog.cert?.email || ''}
                  readOnly
                  className="w-full bg-gray-800 border border-gray-600 p-2 rounded text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject:</label>
                <input
                  type="text"
                  value={emailContent.subject}
                  onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 p-2 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message:</label>
                <textarea
                  value={emailContent.message}
                  onChange={(e) => setEmailContent({ ...emailContent, message: e.target.value })}
                  rows={8}
                  className="w-full bg-gray-800 border border-gray-600 p-2 rounded text-white"
                />
              </div>
              {emailDialog.type === 'completion' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Attachments:</label>
                  <div className="bg-gray-800 border border-gray-600 p-3 rounded">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-blue-400">📎</span>
                      <span>ofzen-cert-{emailDialog.certId}.pdf</span>
                      <span className="text-xs text-gray-500">(Certificate)</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEmailDialog({ show: false, type: '', cert: null, certId: '' })}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={sendEmail}
                  disabled={sendingEmail}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                >
                  {sendingEmail ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
