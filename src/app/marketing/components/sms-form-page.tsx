import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

type FormData = {
  userType: 'number' | 'customer';
  subject: string;
  phoneNumber: string;
  message: string;
};

export default function SmsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const messageValue = useWatch({
    control,
    name: 'message',
    defaultValue: ''
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('SMS Data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-white p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-sky-100 text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Send SMS</h1>
                <p className="text-gray-500">Reach your customers instantly</p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Type */}
              <div className="space-y-2">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <div className="relative">
                  <select
                    id="userType"
                    {...register('userType', { required: 'User type is required' })}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.userType ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none`}
                  >
                    <option value="">Select Type</option>
                    <option value="number">Number</option>
                    <option value="customer">Customer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                {errors.userType && (
                  <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
                )}
              </div>
              
              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  SMS Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                  placeholder="Enter subject"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
              
              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+</span>
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register('phoneNumber', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    className={`w-full pl-8 pr-4 py-3 rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                    placeholder="123 456 7890"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>
              
              {/* Message Body - spans both columns */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message', { 
                    required: 'Message is required',
                    maxLength: {
                      value: 160,
                      message: 'Message must be less than 160 characters'
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                  placeholder="Type your message here..."
                />
                <div className="flex justify-between items-center">
                  {errors.message ? (
                    <p className="text-red-500 text-sm">{errors.message.message}</p>
                  ) : (
                    <div className="text-sm text-gray-500">Max 160 characters</div>
                  )}
                  <div className="text-sm text-gray-500">{messageValue.length}/160</div>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${isSubmitting ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'} focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 flex items-center justify-center space-x-2`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Success Message */}
            {isSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm text-green-600">Your SMS has been delivered to the recipient.</p>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Messages are typically delivered within seconds
          </p>
        </div>
      </div>
    </div>
  );
}