import React, { useState } from "react";
import QRScanner from "./components/QRScanner";
import AttendanceHistory from "./components/AttendanceHistory";

function App() {
  const [history, setHistory] = useState([]);

  const handleScan = (mssv) => {
    const isDuplicate = history.some((item) => item.mssv === mssv);
    if (isDuplicate) {
      alert(`MSSV ${mssv} đã quét trước đó!`);
      return; // không thêm vào lịch sử
    }

    const newEntry = { mssv, time: new Date() };
    setHistory([newEntry, ...history]);
  };

  const handleReset = () => setHistory([]);

  const handleExport = () => {
    if (history.length === 0) {
      alert("Danh sách trống, không thể xuất CSV.");
      return;
    }
    const csvContent =
      "data:text/csv;charset=utf-8," +
      history.map((e) => `${e.mssv},${e.time.toISOString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">QR Attendance</h1>
      <QRScanner onScan={handleScan} />
      <AttendanceHistory
        history={history}
        onReset={handleReset}
        onExport={handleExport}
      />
    </div>
  );
}

export default App;
