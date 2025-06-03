"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function QRScanner() {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);

  const startScanning = async () => {
    if (!scannerRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerRef.current.id);
    setScanner(html5QrCode);

    const cameras = await Html5Qrcode.getCameras();
    if (cameras && cameras.length) {
      // Try to find a back/rear camera
      const backCamera =
        cameras.find((cam) => /back|rear/i.test(cam.label)) || cameras[0]; // fallback to first camera if not found

      html5QrCode
        .start(
          backCamera.id,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            html5QrCode.stop();
            window.location.href = decodedText; // Redirect
          },
          (errorMessage) => {
            console.warn(errorMessage);
          }
        )
        .then(() => setScanning(true))
        .catch((err) => console.error("Start error:", err));
    }
  };
  

  useEffect(() => {
    return () => {
      // Stop and clean up on unmount
      scanner?.stop().catch(() => {});
    };
  }, [scanner]);

  return (
    <div>
      <button onClick={startScanning} disabled={scanning}>
        {scanning ? "Scanning..." : "Scan QR"}
      </button>
      <div
        id="qr-reader"
        ref={scannerRef}
        style={{ width: "300px", marginTop: "16px" }}
      />
    </div>
  );
}
