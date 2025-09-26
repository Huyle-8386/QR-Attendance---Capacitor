import React, { useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType } from "@capacitor/camera";
import jsQR from "jsqr";

const QRScanner = ({ onScan, scannedList }) => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // --- Mobile: dùng Camera Capacitor ---
      const scanWithCamera = async () => {
        try {
          const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: "CAMERA",
          });

          const image = new Image();
          image.src = photo.webPath;
          image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            if (code && code.data.startsWith("ATTEND:")) {
              const mssv = code.data.split(":")[1];
              if (scannedList.includes(mssv)) {
                alert(`MSSV ${mssv} đã được điểm danh!`);
              } else {
                onScan(mssv);
              }
            }
          };
        } catch (err) {
          console.error(err);
        }
      };

      scanWithCamera();
    } else {
      // --- Web/Desktop: dùng video stream ---
      const codeReader = new BrowserMultiFormatReader();
      let selectedDeviceId;

      codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
          selectedDeviceId = videoInputDevices[0]?.deviceId;
          return codeReader.decodeOnceFromVideoDevice(selectedDeviceId, "video");
        })
        .then((result) => {
          if (result.text.startsWith("ATTEND:")) {
            const mssv = result.text.split(":")[1];
            if (scannedList.includes(mssv)) {
              alert(`MSSV ${mssv} đã được điểm danh!`);
            } else {
              onScan(mssv);
            }
          }
        })
        .catch((err) => console.error(err));

      return () => codeReader.reset();
    }
  }, [onScan, scannedList]);

  return (
    <div className="flex justify-center my-4">
      {!Capacitor.isNativePlatform() && (
        <video
          id="video"
          className="border-4 border-blue-500 rounded-lg shadow-lg"
          width="300"
          height="200"
        ></video>
      )}
    </div>
  );
};

export default QRScanner;
