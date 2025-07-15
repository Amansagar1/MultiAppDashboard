/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import jsonData from "../../../../Data/TreeNavigation.json";

const UserForm = () => {
    // State for form values
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        location: "",
        role: "",
        username: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
        isUser: false,
    });

    const [errors, setErrors] = useState({});
    const [expandedNodes, setExpandedNodes] = useState({});
    const [selectedNodes, setSelectedNodes] = useState({});

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) newErrors.email = "Invalid email address.";
        if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";
        if (!formData.location.trim()) newErrors.location = "Location is required.";
        if (!formData.role) newErrors.role = "Role is required.";
        if (!formData.username.match(/^[a-zA-Z0-9_]+$/)) newErrors.username = "Username can only contain letters, numbers, and underscores.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully:", formData);
        }
    };

    // Handle toggle of tree view nodes
    const toggleNode = (node) => {
        setExpandedNodes((prevExpanded) => ({
            ...prevExpanded,
            [node]: !prevExpanded[node],
        }));
    };

    const handleCheckboxChange = (node, parent = "") => {
        const updatedSelected = { ...selectedNodes };
        const updateChildren = (key, value) => {
            updatedSelected[key] = value;
            if (jsonData[key]) {
                Object.keys(jsonData[key]).forEach((child) =>
                    updateChildren(`${key}.${child}`, value)
                );
            }
        };

        // If selecting or unselecting, apply changes to children
        updateChildren(node, !updatedSelected[node]);

        // If selecting, ensure all parents are selected
        if (!parent) {
            const keys = node.split(".");
            for (let i = keys.length - 1; i >= 1; i--) {
                const parentKey = keys.slice(0, i).join(".");
                updatedSelected[parentKey] = true;
            }
        }

        setSelectedNodes(updatedSelected);
    };

    useEffect(() => {
        const expandAllNodes = (data, parent = "") => {
            Object.keys(data).forEach((key) => {
                const fullKey = parent ? `${parent}.${key}` : key;
                setExpandedNodes((prev) => ({ ...prev, [fullKey]: true }));

                if (typeof data[key] === "object" && Object.keys(data[key]).length > 0) {
                    expandAllNodes(data[key], fullKey); // Recursively expand child nodes
                }
            });
        };

        // Start expanding from the root
        expandAllNodes(jsonData);
    }, [jsonData]);

    // const renderTree = (data, parent = "") => {
    //     return Object.keys(data).map((key) => {
    //         const fullKey = parent ? `${parent}.${key}` : key;
    //         const isExpanded = expandedNodes[fullKey];
    //         const isSelected = selectedNodes[fullKey] || false;

    //         if (typeof data[key] === "object" && Object.keys(data[key]).length > 0) {
    //             return (
    //                 <div key={fullKey} className="ml-4">
    //                     <div className="flex items-center space-x-2">
    //                         {/* Toggle for expanding/collapsing */}
    //                         <div
    //                             className="cursor-pointer text-gray-700"
    //                             onClick={() => toggleNode(fullKey)}
    //                         >
    //                             {isExpanded ? "▾" : "▸"}
    //                         </div>
    //                         {/* Checkbox for node selection */}
    //                         <input
    //                             type="checkbox"
    //                             checked={isSelected}
    //                             onChange={() => handleCheckboxChange(fullKey)}
    //                             className="mr-2"
    //                         />
    //                         <div className="text-gray-700">{key}</div>
    //                     </div>
    //                     {/* Render children if the node is expanded */}
    //                     {isExpanded && renderTree(data[key], fullKey)}
    //                 </div>
    //             );
    //         }

    //         // If it's a leaf node (non-object)
    //         return (
    //             <div key={fullKey} className="ml-4 text-gray-700">
    //                 <div className="flex items-center space-x-2">
    //                     {/* Checkbox for leaf node */}
    //                     <input
    //                         type="checkbox"
    //                         checked={isSelected}
    //                         onChange={() => handleCheckboxChange(fullKey)}
    //                         className="mr-2"
    //                     />
    //                     <div>{key}</div>
    //                 </div>
    //             </div>
    //         );
    //     });
    // };

    return (
        <div className=" bg-gray-100 p-4  h-[88vh] overflow-scroll ">
            <form onSubmit={handleSubmit} className="mx-auto bg-white p-6 rounded-lg  shadow-lg flex space-x-10 text-[16px] items-center justify-center h-full pb-10">
                {/* Form Section */}
                <div className="w-full space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Add User</h2>

                    <div className="space-y-4">
                        {/* First Name and Last Name */}
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 p-1 w-full border rounded-md ${errors.firstName && "border-red-500"}`}
                                    placeholder="John"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 p-1 w-full border rounded-md ${errors.lastName && "border-red-500"}`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 p-1 w-full border rounded-md ${errors.email && "border-red-500"}`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label htmlFor="contactNumber" className="block text-gray-700">Contact Number</label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className={`mt-1 p-1 w-full border rounded-md ${errors.contactNumber && "border-red-500"}`}
                                placeholder="123-456-7890"
                            />
                            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-gray-700">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`mt-1 p-1 w-full border rounded-md ${errors.location && "border-red-500"}`}
                                placeholder="City, Country"
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-gray-700">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`mt-1 p-1 w-full border rounded-md ${errors.role && "border-red-500"}`}
                            >
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Operator">Operator</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`mt-1 p-1 w-full border rounded-md ${errors.username && "border-red-500"}`}
                                placeholder="john_doe"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        {/* Password and Confirm Password */}
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 p-1 w-full border rounded-md ${errors.password && "border-red-500"}`}
                                    placeholder="********"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`mt-1 p-1 w-full border rounded-md ${errors.confirmPassword && "border-red-500"}`}
                                    placeholder="********"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#00DD6E] text-white p-3 rounded-md mt-6 hover:bg-[#00DD6E]"
                        >
                            Add User
                        </button>
                    </div>
                </div>

                {/* Tree View Section */}
                {/* <div className="w-2/5 rounded-lg pr-4 pl-4 pb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 p-2">Plant Asset Access</h3>
                    <div className="text-gray-700 overflow-scroll h-[620px] p-2">
                        {renderTree(jsonData)}
                    </div>
                </div> */}
            </form>
            {/* <footer className="mt-6 text-center text-gray-500 text-sm ">
        © 2024 Digital-Sync. All Rights Reserved
      </footer> */}
        </div>
    );
};

export default UserForm;
