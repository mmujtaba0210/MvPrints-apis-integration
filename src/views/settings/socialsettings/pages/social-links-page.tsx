"use client";

import React, { useState } from "react";
import { CustomInput } from "@/common/customInputField";

const SocialLinksForm = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    whatsapp: "",
    telegram: "",
    tiktok: "",
    pinterest: "",
    snapchat: "",
    reddit: "",
    discord: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Social links saved:", socialLinks);
    // Add your save logic here (API call, etc.)
    alert("Social links saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Links</h1>
          <p className="mt-2 text-lg text-gray-600">
            Add all your social media profiles to connect with your audience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <CustomInput
                label="Facebook"
                name="facebook"
                placeholder="https://facebook.com/yourpage"
                value={socialLinks.facebook}
                onChange={handleChange}
                className="bg-blue-50/50"
              />
              <CustomInput
                label="Twitter/X"
                name="twitter"
                placeholder="https://twitter.com/yourhandle"
                value={socialLinks.twitter}
                onChange={handleChange}
                className="bg-black/5"
              />
              <CustomInput
                label="Instagram"
                name="instagram"
                placeholder="https://instagram.com/yourprofile"
                value={socialLinks.instagram}
                onChange={handleChange}
                className="bg-pink-50/50"
              />

              {/* Row 2 */}
              <CustomInput
                label="LinkedIn"
                name="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={socialLinks.linkedin}
                onChange={handleChange}
                className="bg-blue-100/50"
              />
              <CustomInput
                label="YouTube"
                name="youtube"
                placeholder="https://youtube.com/yourchannel"
                value={socialLinks.youtube}
                onChange={handleChange}
                className="bg-red-50/50"
              />
              <CustomInput
                label="WhatsApp"
                name="whatsapp"
                placeholder="https://wa.me/yournumber"
                value={socialLinks.whatsapp}
                onChange={handleChange}
                className="bg-green-50/50"
              />

              {/* Row 3 */}
              <CustomInput
                label="Telegram"
                name="telegram"
                placeholder="https://t.me/yourchannel"
                value={socialLinks.telegram}
                onChange={handleChange}
                className="bg-blue-50/30"
              />
              <CustomInput
                label="TikTok"
                name="tiktok"
                placeholder="https://tiktok.com/@yourusername"
                value={socialLinks.tiktok}
                onChange={handleChange}
                className="bg-black/5"
              />
              <CustomInput
                label="Pinterest"
                name="pinterest"
                placeholder="https://pinterest.com/yourprofile"
                value={socialLinks.pinterest}
                onChange={handleChange}
                className="bg-red-100/50"
              />

              {/* Row 4 */}
              <CustomInput
                label="Snapchat"
                name="snapchat"
                placeholder="https://snapchat.com/add/yourusername"
                value={socialLinks.snapchat}
                onChange={handleChange}
                className="bg-yellow-100/50"
              />
              <CustomInput
                label="Reddit"
                name="reddit"
                placeholder="https://reddit.com/user/yourusername"
                value={socialLinks.reddit}
                onChange={handleChange}
                className="bg-orange-50/50"
              />
              <CustomInput
                label="Discord"
                name="discord"
                placeholder="https://discord.gg/yourinvite"
                value={socialLinks.discord}
                onChange={handleChange}
                className="bg-indigo-50/50"
              />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end bg-gray-50">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md"
            >
              Save Social Links
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Links will be displayed on your public profile</p>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksForm;