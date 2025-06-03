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
      const backCamera =
        cameras.find((cam) => /back|rear/i.test(cam.label)) || cameras[0];

      html5QrCode
        .start(
          backCamera.id,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            // ✅ Vibration feedback
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }

            html5QrCode.stop();
            window.location.href = decodedText;
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
