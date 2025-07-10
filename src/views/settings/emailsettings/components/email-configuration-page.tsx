"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/common/customInputField";

interface EmailConfigFormData {
  mailEngine: string;
  mailHost: string;
  mailPort: number;
  mailEncryption: string;
  mailUsername: string;
  mailPassword: string;
  fromMail: string;
  fromName: string;
  useSmtp: boolean;
}

const EmailConfigurationPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<EmailConfigFormData>({
    defaultValues: {
      mailEngine: "smtp",
      mailEncryption: "tls",
      useSmtp: true
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const useSmtp = watch("useSmtp");

  const onSubmit = (data: EmailConfigFormData) => {
    setIsSubmitting(true);
    console.log("Email configuration submitted:", data);
    // API call would go here
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Email configuration saved successfully!");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-fit">
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Email Configuration</h1>
          <p className="text-gray-600 mt-1">
            Configure your email server settings for system notifications and transactional emails
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 flex-1 overflow-auto">
            {/* SMTP Toggle */}
            <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h2 className="text-lg font-medium text-gray-800">SMTP Settings</h2>
                <p className="text-sm text-gray-500">
                  {useSmtp ? "Using custom SMTP server" : "Using system default mailer"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("useSmtp")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {useSmtp && (
              <>
                {/* Mail Engine */}
                <div className="space-y-1">
                  <label htmlFor="mailEngine" className="block text-sm font-medium text-gray-700">
                    Mail Engine <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="mailEngine"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    {...register("mailEngine", { required: useSmtp })}
                  >
                    <option value="smtp">SMTP</option>
                    <option value="sendmail">Sendmail</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="ses">Amazon SES</option>
                  </select>
                  {errors.mailEngine && (
                    <p className="text-red-500 text-xs mt-1">This field is required</p>
                  )}
                </div>

                {/* Mail Host */}
                <CustomInput
                  label="Mail Host"
                  name="mailHost"
                  register={register}
                  required={useSmtp}
                  placeholder="smtp.example.com"
                  errors={errors}
                />

                {/* Mail Port */}
                <CustomInput
                  label="Mail Port"
                  name="mailPort"
                  register={register}
                  required={useSmtp}
                  placeholder="587"
                  type="number"
                  errors={errors}
                />

                {/* Mail Encryption */}
                <div className="space-y-1">
                  <label htmlFor="mailEncryption" className="block text-sm font-medium text-gray-700">
                    Encryption <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="mailEncryption"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    {...register("mailEncryption", { required: useSmtp })}
                  >
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">None</option>
                  </select>
                  {errors.mailEncryption && (
                    <p className="text-red-500 text-xs mt-1">This field is required</p>
                  )}
                </div>

                {/* Mail Username */}
                <CustomInput
                  label="Mail Username"
                  name="mailUsername"
                  register={register}
                  required={useSmtp}
                  placeholder="your@email.com"
                  errors={errors}
                />

                {/* Mail Password */}
                <CustomInput
                  label="Mail Password"
                  name="mailPassword"
                  register={register}
                  required={useSmtp}
                  placeholder="••••••••"
                  type="password"
                  errors={errors}
                />
              </>
            )}

            {/* From Email */}
            <CustomInput
              label="From Email Address"
              name="fromMail"
              register={register}
              required={true}
              placeholder="noreply@yourdomain.com"
              errors={errors}
            />

            {/* From Name */}
            <CustomInput
              label="From Name"
              name="fromName"
              register={register}
              required={true}
              placeholder="Your Company Name"
              errors={errors}
            />
          </div>

          <div className="pt-4 border-t border-gray-200 mt-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Configuration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailConfigurationPage;