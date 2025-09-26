import React, { useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScanner = ({ onScan }) => {
  useEffect(() => {
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
          onScan(mssv);
        }
      })
      .catch((err) => console.error(err));

    return () => codeReader.reset();
  }, [onScan]);

  return (
    <div className="flex justify-center my-4">
      <video
        id="video"
        className="border-4 border-blue-500 rounded-lg shadow-lg"
        width="300"
        height="200"
      ></video>
    </div>
  );
};

export default QRScanner;
