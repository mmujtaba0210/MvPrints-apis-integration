"use client";

import React, { useState } from "react";
import { CustomInput } from "@/common/customInputField";

interface ContactInfo {
  email: string;
  department: string;
}

interface StoreHours {
  opening: string;
  closing: string;
}

export const ContactUsForm = () => {
  const [contactText, setContactText] = useState("");
  const [emails, setEmails] = useState(["", ""]);
  const [phones, setPhones] = useState(["", ""]);
  const [faxes, setFaxes] = useState(["", ""]);
  const [address, setAddress] = useState("");
  const [storeHours, setStoreHours] = useState<StoreHours[]>([{ opening: "", closing: "" }]);
  const [contactUsEmail, setContactUsEmail] = useState("");
  const [contactFormSuccessText, setContactFormSuccessText] = useState("");
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([{ email: "", department: "" }]);
  const [middleInfoTitle, setMiddleInfoTitle] = useState("");
  const [middleInfoDescription, setMiddleInfoDescription] = useState("");
  const [socialInfoTitle, setSocialInfoTitle] = useState("");
  const [socialInfoDescription, setSocialInfoDescription] = useState("");
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState("");

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const handleFaxChange = (index: number, value: string) => {
    const newFaxes = [...faxes];
    newFaxes[index] = value;
    setFaxes(newFaxes);
  };

  const handleStoreHourChange = (index: number, field: keyof StoreHours, value: string) => {
    const newStoreHours = [...storeHours];
    newStoreHours[index][field] = value;
    setStoreHours(newStoreHours);
  };

  const addStoreHour = () => {
    setStoreHours([...storeHours, { opening: "", closing: "" }]);
  };

  const removeStoreHour = (index: number) => {
    if (storeHours.length > 1) {
      const newStoreHours = storeHours.filter((_, i) => i !== index);
      setStoreHours(newStoreHours);
    }
  };

  const handleContactInfoChange = (index: number, field: keyof ContactInfo, value: string) => {
    const newContactInfos = [...contactInfos];
    newContactInfos[index][field] = value;
    setContactInfos(newContactInfos);
  };

  const addContactInfo = () => {
    setContactInfos([...contactInfos, { email: "", department: "" }]);
  };

  const removeContactInfo = (index: number) => {
    if (contactInfos.length > 1) {
      const newContactInfos = contactInfos.filter((_, i) => i !== index);
      setContactInfos(newContactInfos);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setCurrentBackgroundImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      contactText,
      emails,
      phones,
      faxes,
      address,
      storeHours,
      contactUsEmail,
      contactFormSuccessText,
      contactInfos,
      middleInfoTitle,
      middleInfoDescription,
      socialInfoTitle,
      socialInfoDescription,
      currentBackgroundImage
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us Form Configuration</h1>
        <p className="text-gray-600">Customize your contact page settings below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Text */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Main Contact Information</h2>
          <CustomInput
            label="Contact Text"
            name="contactText"
            value={contactText}
            onChange={(e) => setContactText(e.target.value)}
            placeholder="Enter your contact introduction text"
            required
            containerClass="mb-0"
          />
        </div>

        {/* Email, Phone, Fax Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Contact Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="font-medium text-gray-700 text-lg">Emails</h3>
              </div>
              {emails.map((email, index) => (
                <CustomInput
                  key={`email-${index}`}
                  label={index === 0 ? "Primary Email" : "Secondary Email"}
                  name={`email-${index}`}
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  placeholder={`contact@yourcompany.com`}
                  icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                <h3 className="font-medium text-gray-700 text-lg">Phone Numbers</h3>
              </div>
              {phones.map((phone, index) => (
                <CustomInput
                  key={`phone-${index}`}
                  label={index === 0 ? "Primary Phone" : "Secondary Phone"}
                  name={`phone-${index}`}
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  placeholder={`+1 (___) ___-____`}
                  icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                <h3 className="font-medium text-gray-700 text-lg">Fax Numbers</h3>
              </div>
              {faxes.map((fax, index) => (
                <CustomInput
                  key={`fax-${index}`}
                  label={index === 0 ? "Primary Fax" : "Secondary Fax"}
                  name={`fax-${index}`}
                  value={fax}
                  onChange={(e) => handleFaxChange(index, e.target.value)}
                  placeholder={`+1 (___) ___-____`}
                  icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Location</h2>
          <CustomInput
            label="Business Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full business address"
            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
          />
        </div>

        {/* Store Hours */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Business Hours</h2>
            <button
              type="button"
              onClick={addStoreHour}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add Hours
            </button>
          </div>
          
          <div className="space-y-4">
            {storeHours.map((hour, index) => (
              <div key={`hour-${index}`} className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <CustomInput
                    label={`Day ${index + 1} Opening Time`}
                    name={`opening-${index}`}
                    value={hour.opening}
                    onChange={(e) => handleStoreHourChange(index, 'opening', e.target.value)}
                    placeholder="e.g., 9:00 AM"
                    type="time"
                  />
                  <CustomInput
                    label={`Day ${index + 1} Closing Time`}
                    name={`closing-${index}`}
                    value={hour.closing}
                    onChange={(e) => handleStoreHourChange(index, 'closing', e.target.value)}
                    placeholder="e.g., 6:00 PM"
                    type="time"
                  />
                </div>
                {storeHours.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStoreHour(index)}
                    className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500"
                    title="Remove hours"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Contact Form Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Contact Form Receiving Email"
              name="contactUsEmail"
              type="email"
              value={contactUsEmail}
              onChange={(e) => setContactUsEmail(e.target.value)}
              placeholder="contact@yourcompany.com"
              icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
            />
            <div>
              <CustomInput
                label="Success Message"
                name="contactFormSuccessText"
                value={contactFormSuccessText}
                onChange={(e) => setContactFormSuccessText(e.target.value)}
                placeholder="Thank you for your message!"
              />
              <p className="text-xs text-gray-500 mt-1">This message will show after form submission</p>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Department Contacts</h2>
            <button
              type="button"
              onClick={addContactInfo}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add Department
            </button>
          </div>
          
          <div className="space-y-6">
            {contactInfos.map((info, index) => (
              <div key={`contact-${index}`} className="relative group bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <CustomInput
                    label={`Department Email`}
                    name={`contact-email-${index}`}
                    type="email"
                    value={info.email}
                    onChange={(e) => handleContactInfoChange(index, 'email', e.target.value)}
                    placeholder="department@yourcompany.com"
                  />
                  <CustomInput
                    label={`Department Name`}
                    name={`department-${index}`}
                    value={info.department}
                    onChange={(e) => handleContactInfoChange(index, 'department', e.target.value)}
                    placeholder="e.g., Sales, Support"
                  />
                </div>
                {contactInfos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContactInfo(index)}
                    className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500"
                    title="Remove department"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Middle Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Middle Information Section</h2>
            <CustomInput
              label="Section Title"
              name="middleInfoTitle"
              value={middleInfoTitle}
              onChange={(e) => setMiddleInfoTitle(e.target.value)}
              placeholder="About Our Company"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
              <textarea
                name="middleInfoDescription"
                value={middleInfoDescription}
                onChange={(e) => setMiddleInfoDescription(e.target.value)}
                placeholder="Write a brief description about your company..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Social Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Social Media Section</h2>
            <CustomInput
              label="Section Title"
              name="socialInfoTitle"
              value={socialInfoTitle}
              onChange={(e) => setSocialInfoTitle(e.target.value)}
              placeholder="Connect With Us"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links/Description</label>
              <textarea
                name="socialInfoDescription"
                value={socialInfoDescription}
                onChange={(e) => setSocialInfoDescription(e.target.value)}
                placeholder="Add your social media links or description..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Background Image</h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Background Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="backgroundImage"
              />
              <label
                htmlFor="backgroundImage"
                className="w-full flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
              </label>
            </div>
            
            {currentBackgroundImage && (
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                <div className="relative rounded-lg overflow-hidden border border-gray-200 h-64">
                  <img 
                    src={currentBackgroundImage} 
                    alt="Background preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentBackgroundImage("")}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};