"use client";
import React, { useState } from "react";

const UserForm = ({ close }) => {
  const [formData, setFormData] = useState({
    name: "Ravish",
    emailId: "rvslife@outlook.com",
    mobileNo: "",
    timezone: "Asia/Kolkata", // Default timezone for India Standard Time (can be changed)
    location: "",
    role: "",
    utcTime: "", // To hold the UTC time input by the user
    localTime: "", // To display the local time based on the user timezone
  });

  // Function to handle the conversion from UTC to the user's local timezone
  const convertToLocalTime = (utcTime, timezone) => {
    try {
      const utcDate = new Date(utcTime);
      const options = {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const localTime = new Intl.DateTimeFormat("en-US", options).format(utcDate);
      return localTime;
    } catch (error) {
      console.error("Error in converting time:", error);
      return "Invalid Timezone or Time Format";
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the UTC time to the selected local timezone and set the local time
    const localTime = convertToLocalTime(formData.utcTime, formData.timezone);
    setFormData((prevState) => ({
      ...prevState,
      localTime: localTime,
    }));

    console.log("Submitted Data:", formData);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-[800px] overflow-scroll text-sm "
      >
        <h2 className="text-sm font-semibold mb-4">User Details</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <label className="block mt-4 mb-2">Email</label>
        <input
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <label className="block mt-4 mb-2">Mobile No</label>
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <label className="block mt-4 mb-2">Timezone</label>
        <input
          type="text"
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter timezone (e.g., Asia/Kolkata)"
        />

        <label className="block mt-4 mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <label className="block mt-4 mb-2">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        {/* <label className="block mt-4 mb-2">UTC Time</label>
        <input
          type="datetime-local"
          name="utcTime"
          value={formData.utcTime}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        /> */}

        <label className="block mt-4 mb-2">Local Time</label>
        <input
          type="text"
          value={formData.localTime}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-200"
        />
        <div className="flex gap-4 mt-4 items-center justify-end ">
          <button type="button" onClick={close} className="bg-gray-500 text-white p-2 rounded w-28">Cancel</button>
          <button
            type="submit"
            className="w-28  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
