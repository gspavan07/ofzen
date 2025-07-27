"use client";
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRGenerator({ certId }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (certId) {
      const verifyUrl = `${window.location.origin}/verify?id=${certId}`;
      
      QRCode.toDataURL(verifyUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      .then(url => {
        setQrCodeUrl(url);
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [certId]);

  if (!qrCodeUrl) {
    return <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse rounded"></div>;
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <img src={qrCodeUrl} alt="Certificate Verification QR Code" className="rounded" />
      <p className="text-xs text-gray-600 text-center">
        Scan to verify certificate
      </p>
    </div>
  );
}