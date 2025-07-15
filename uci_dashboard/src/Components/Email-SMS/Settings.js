import React, { useState } from "react";

const Popup = ({ handleClose }) => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailKeyValues, setEmailKeyValues] = useState([{ key: "", value: "" }]);
  const [smsKeyValues, setSmsKeyValues] = useState([{ key: "", value: "" }]);

  const addEmailKeyValue = () => {
    setEmailKeyValues([...emailKeyValues, { key: "", value: "" }]);
  };

  const addSmsKeyValue = () => {
    setSmsKeyValues([...smsKeyValues, { key: "", value: "" }]);
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Email & SMS Settings</h2>
        
        {/* Email Settings */}
        <div className="border p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Email Settings</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="hidden" checked={emailEnabled} onChange={() => setEmailEnabled(!emailEnabled)} />
              <span className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${emailEnabled ? 'bg-green-500' : ''}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${emailEnabled ? 'translate-x-5' : ''}`}></span>
              </span>
            </label>
          </div>
          {emailEnabled && (
            <div className="space-y-3">
              <input type="text" placeholder="Subject" className="w-full p-2 border rounded-md" />
              <input type="text" placeholder="Template ID" className="w-full p-2 border rounded-md" />
              <div>
                <h4 className="font-medium mb-2">Message Key-Value Pairs</h4>
                {emailKeyValues.map((pair, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="text" placeholder="Key" className="w-1/2 p-2 border rounded-md" />
                    <input type="text" placeholder="Value" className="w-1/2 p-2 border rounded-md" />
                  </div>
                ))}
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={addEmailKeyValue}>+</button>
              </div>
              <textarea placeholder="Message" className="w-full p-2 border rounded-md"></textarea>
            </div>
          )}
        </div>

        {/* SMS Settings */}
        <div className="border p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">SMS Settings</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="hidden" checked={smsEnabled} onChange={() => setSmsEnabled(!smsEnabled)} />
              <span className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${smsEnabled ? 'bg-green-500' : ''}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${smsEnabled ? 'translate-x-5' : ''}`}></span>
              </span>
            </label>
          </div>
          {smsEnabled && (
            <div className="space-y-3">
              <input type="text" placeholder="Sender ID" className="w-full p-2 border rounded-md" />
              <input type="text" placeholder="Root ID" className="w-full p-2 border rounded-md" />
              <input type="text" placeholder="Template ID" className="w-full p-2 border rounded-md" />
              <div>
                <h4 className="font-medium mb-2">Message Key-Value Pairs</h4>
                {smsKeyValues.map((pair, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="text" placeholder="Key" className="w-1/2 p-2 border rounded-md" />
                    <input type="text" placeholder="Value" className="w-1/2 p-2 border rounded-md" />
                  </div>
                ))}
                <button className="p-2 w-20 bg-blue-500 text-white rounded-md" onClick={addSmsKeyValue}>+</button>
              </div>
              <textarea placeholder="Text" className="w-full p-2 border rounded-md"></textarea>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={handleClose}>Close</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
