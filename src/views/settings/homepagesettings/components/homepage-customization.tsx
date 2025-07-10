import { useState } from 'react';

interface SectionToggle {
  id: string;
  label: string;
  enabled: boolean;
  required?: boolean;
}

export default function HomePageCustomization() {
  const [sections, setSections] = useState<SectionToggle[]>([
    { id: 'slider', label: 'Slider', enabled: true, required: true },
    { id: 'companiesThatTrustUs', label: 'Companies that Trust Us', enabled: true, required: true },
    { id: 'ourProducts', label: 'Our Products', enabled: true, required: true },
    { id: 'whoWeAre', label: 'Who We Are', enabled: true, required: true },
    { id: 'ourPortfolio', label: 'Our Portfolio', enabled: true, required: true },
    { id: 'howItWorks', label: 'How It Works', enabled: true, required: true },
    { id: 'whyChooseMecarviPrints', label: 'Why Choose Mecarvi Prints?', enabled: true, required: true },
    { id: 'ourServices', label: 'Our Services', enabled: true, required: true },
    { id: 'video', label: 'Video', enabled: true, required: true },
    { id: 'testimonial', label: 'Testimonial', enabled: true, required: true },
    { id: 'scrollingSloganBanner', label: 'Scrolling Slogan Banner', enabled: true, required: true },
    { id: 'mecarviGold', label: 'Mecarvi Gold', enabled: true, required: true },
  ]);

  const handleToggle = (id: string) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const configuration = sections.reduce((acc, section) => {
      acc[section.id] = section.enabled;
      return acc;
    }, {} as Record<string, boolean>);
    
    console.log('Configuration saved:', configuration);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Section Visibility Configuration</h2>
            <p className="text-blue-100 text-sm mt-1">
              Toggle sections on/off for your Mecarvi Prints page
            </p>
          </div>
          
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    section.enabled
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={section.id}
                      className={`text-sm font-medium ${
                        section.enabled ? 'text-blue-800' : 'text-gray-600'
                      }`}
                    >
                      {section.label}
                      {section.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleToggle(section.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        section.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          section.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}