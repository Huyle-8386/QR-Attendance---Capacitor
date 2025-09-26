import React from "react";

const AttendanceHistory = ({ history, onReset, onExport }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Attendance History</h2>
        <div className="space-x-2">
          <button
            onClick={onExport}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export CSV
          </button>
          <button
            onClick={onReset}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {history.map((item, index) => (
          <li
            key={index}
            className={`p-2 ${
              item.duplicate ? "bg-yellow-100" : "bg-gray-50"
            } rounded my-1`}
          >
            <span className="font-mono">{item.mssv}</span> -{" "}
            {item.time.toLocaleString()}
            {item.duplicate && (
              <span className="text-red-500 font-bold ml-2">Duplicate!</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceHistory;
