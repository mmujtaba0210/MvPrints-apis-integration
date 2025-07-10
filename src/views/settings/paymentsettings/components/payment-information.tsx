'use client';

import React, { useState } from 'react';
import { FiCreditCard, FiDollarSign, FiLock, FiSettings, FiUser, FiTruck } from 'react-icons/fi';
import { CustomInput } from '@/common/customInputField';

type PaymentMethod = {
  id: string;
  name: string;
  enabled: boolean;
  sandbox?: boolean;
  fields: {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    value: string;
  }[];
};

export default function PaymentInformation() {
  // Payment methods configuration
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      enabled: false,
      fields: [
        { id: 'key', label: 'Publishable Key', type: 'text', placeholder: 'pk_test_...', required: true, value: '' },
        { id: 'secret', label: 'Secret Key', type: 'password', placeholder: 'sk_test_...', required: true, value: '' },
        { id: 'text', label: 'Display Text', type: 'text', placeholder: 'Pay with card', value: '' }
      ]
    },
    {
      id: 'paypal',
      name: 'PayPal',
      enabled: true,
      sandbox: true,
      fields: [
        { id: 'client_id', label: 'Client ID', type: 'text', placeholder: 'AY...', required: true, value: '' },
        { id: 'secret', label: 'Client Secret', type: 'password', placeholder: 'EC...', required: true, value: '' },
        { id: 'text', label: 'Display Text', type: 'text', placeholder: 'Pay with PayPal', value: '' }
      ]
    },
    {
      id: 'authorize',
      name: 'Authorize.Net',
      enabled: false,
      sandbox: false,
      fields: [
        { id: 'login_id', label: 'API Login ID', type: 'text', placeholder: '5...', required: true, value: '' },
        { id: 'transaction_key', label: 'Transaction Key', type: 'password', placeholder: '3...', required: true, value: '' },
        { id: 'text', label: 'Display Text', type: 'text', placeholder: 'Secure payment', value: '' }
      ]
    }
  ]);

  // Other settings
  const [settings, setSettings] = useState({
    guestCheckout: false,
    codEnabled: false,
    codText: '',
    currencyFormat: '$0.00',
    withdrawFee: '0',
    withdrawCharge: '0',
    tax: '0'
  });

  // Toggle payment method
  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  // Toggle sandbox mode
  const toggleSandbox = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, sandbox: !method.sandbox } : method
      )
    );
  };

  // Update payment method field
  const updatePaymentField = (methodId: string, fieldId: string, value: string) => {
    setPaymentMethods(methods =>
      methods.map(method => {
        if (method.id === methodId) {
          return {
            ...method,
            fields: method.fields.map(field =>
              field.id === fieldId ? { ...field, value } : field
            )
          };
        }
        return method;
      })
    );
  };

  // Update setting
  const updateSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      paymentMethods,
      settings
    };
    console.log('Submitting:', data);
    // Here you would typically call your backend API
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 h-full flex flex-col">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FiCreditCard className="mr-2" />
            Payment Settings
          </h2>
          <p className="text-blue-100">Configure your payment gateways and checkout options</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Payment Methods */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiDollarSign className="mr-2" />
              Payment Gateways
            </h3>

            {paymentMethods.map(method => (
              <div key={method.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={method.enabled}
                      onChange={() => togglePaymentMethod(method.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label className="font-medium text-gray-700">{method.name}</label>
                  </div>
                  {method.sandbox !== undefined && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Sandbox Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={method.sandbox}
                          onChange={() => toggleSandbox(method.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  )}
                </div>

                {method.enabled && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {method.fields.map(field => (
                      <CustomInput
                        key={`${method.id}-${field.id}`}
                        label={field.label}
                        name={`${method.id}.${field.id}`}
                        register={{ 
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                            updatePaymentField(method.id, field.id, e.target.value) 
                        }}
                        required={field.required}
                        placeholder={field.placeholder}
                        type={field.type}
                        errors={{}}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Checkout Options */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiUser className="mr-2" />
              Checkout Options
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    checked={settings.guestCheckout}
                    onChange={() => updateSetting('guestCheckout', !settings.guestCheckout)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="font-medium text-gray-700">Allow Guest Checkout</label>
                </div>
                <p className="text-sm text-gray-500">
                  Enable this to allow customers to checkout without creating an account
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    checked={settings.codEnabled}
                    onChange={() => updateSetting('codEnabled', !settings.codEnabled)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="font-medium text-gray-700">Cash on Delivery</label>
                </div>
                {settings.codEnabled && (
                  <CustomInput
                    label="Display Text"
                    name="codText"
                    register={{ 
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                        updateSetting('codText', e.target.value) 
                    }}
                    placeholder="Pay with cash on delivery"
                    errors={{}}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Currency & Fees */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiSettings className="mr-2" />
              Currency & Fees
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <CustomInput
                label="Currency Format"
                name="currencyFormat"
                register={{ 
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                    updateSetting('currencyFormat', e.target.value) 
                }}
                placeholder="$0.00"
                value={settings.currencyFormat}
                errors={{}}
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Withdrawal Fee</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <CustomInput
                    name="withdrawFee"
                    label=""
                    register={{ 
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                        updateSetting('withdrawFee', e.target.value) 
                    }}
                    placeholder="0.00"
                    value={settings.withdrawFee}
                    errors={{}}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Withdrawal Charge (%)</label>
                <div className="relative">
                  <CustomInput
                    name="withdrawCharge"
                    label=""
                    register={{ 
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                        updateSetting('withdrawCharge', e.target.value) 
                    }}
                    placeholder="0"
                    value={settings.withdrawCharge}
                    errors={{}}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">%</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Tax (%)</label>
                <div className="relative">
                  <CustomInput
                    name="tax"
                    label=""
                    register={{ 
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                        updateSetting('tax', e.target.value) 
                    }}
                    placeholder="0"
                    value={settings.tax}
                    errors={{}}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm flex items-center"
            >
              <FiLock className="mr-2" />
              Save Payment Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}