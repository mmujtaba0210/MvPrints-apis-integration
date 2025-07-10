import { useState } from 'react';

interface FormData {
  slider: number;
  ourProducts: number;
  video: number;
  whoWeAre: number;
  ourPortfolio: number;
  scrollingSloganBanner: number;
  customerTestimonials: number;
  companiesThatTrustUs: number;
  howItWorks: number;
  whyChooseMecarviPrints: number;
  ourServices: number;
  bottomBanner: number;
  mecarviGold: number;
}

export default function PrintPageOrder() {
  const [formData, setFormData] = useState<FormData>({
    slider: 0,
    ourProducts: 0,
    video: 0,
    whoWeAre: 0,
    ourPortfolio: 0,
    scrollingSloganBanner: 0,
    customerTestimonials: 0,
    companiesThatTrustUs: 0,
    howItWorks: 0,
    whyChooseMecarviPrints: 0,
    ourServices: 0,
    bottomBanner: 0,
    mecarviGold: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Mecarvi Prints Configuration</h2>
            <p className="text-blue-100 text-sm">Enter the order numbers for each section</p>
          </div>
          
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Slider */}
              <div className="space-y-1">
                <label htmlFor="slider" className="block text-xs font-medium text-blue-800">
                  Slider
                </label>
                <input
                  type="number"
                  id="slider"
                  name="slider"
                  value={formData.slider}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Our Products */}
              <div className="space-y-1">
                <label htmlFor="ourProducts" className="block text-xs font-medium text-blue-800">
                  Our Products
                </label>
                <input
                  type="number"
                  id="ourProducts"
                  name="ourProducts"
                  value={formData.ourProducts}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Video */}
              <div className="space-y-1">
                <label htmlFor="video" className="block text-xs font-medium text-blue-800">
                  Video
                </label>
                <input
                  type="number"
                  id="video"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Who We Are */}
              <div className="space-y-1">
                <label htmlFor="whoWeAre" className="block text-xs font-medium text-blue-800">
                  Who We Are
                </label>
                <input
                  type="number"
                  id="whoWeAre"
                  name="whoWeAre"
                  value={formData.whoWeAre}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Our Portfolio */}
              <div className="space-y-1">
                <label htmlFor="ourPortfolio" className="block text-xs font-medium text-blue-800">
                  Our Portfolio
                </label>
                <input
                  type="number"
                  id="ourPortfolio"
                  name="ourPortfolio"
                  value={formData.ourPortfolio}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Scrolling Slogan Banner */}
              <div className="space-y-1">
                <label htmlFor="scrollingSloganBanner" className="block text-xs font-medium text-blue-800">
                  Scrolling Banner
                </label>
                <input
                  type="number"
                  id="scrollingSloganBanner"
                  name="scrollingSloganBanner"
                  value={formData.scrollingSloganBanner}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Customer Testimonials */}
              <div className="space-y-1">
                <label htmlFor="customerTestimonials" className="block text-xs font-medium text-blue-800">
                  Testimonials
                </label>
                <input
                  type="number"
                  id="customerTestimonials"
                  name="customerTestimonials"
                  value={formData.customerTestimonials}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Companies that Trust Us */}
              <div className="space-y-1">
                <label htmlFor="companiesThatTrustUs" className="block text-xs font-medium text-blue-800">
                  Trusted Companies
                </label>
                <input
                  type="number"
                  id="companiesThatTrustUs"
                  name="companiesThatTrustUs"
                  value={formData.companiesThatTrustUs}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* How It Works */}
              <div className="space-y-1">
                <label htmlFor="howItWorks" className="block text-xs font-medium text-blue-800">
                  How It Works
                </label>
                <input
                  type="number"
                  id="howItWorks"
                  name="howItWorks"
                  value={formData.howItWorks}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Why Choose Mecarvi Prints? */}
              <div className="space-y-1">
                <label htmlFor="whyChooseMecarviPrints" className="block text-xs font-medium text-blue-800">
                  Why Choose Us
                </label>
                <input
                  type="number"
                  id="whyChooseMecarviPrints"
                  name="whyChooseMecarviPrints"
                  value={formData.whyChooseMecarviPrints}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Our Services */}
              <div className="space-y-1">
                <label htmlFor="ourServices" className="block text-xs font-medium text-blue-800">
                  Our Services
                </label>
                <input
                  type="number"
                  id="ourServices"
                  name="ourServices"
                  value={formData.ourServices}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Bottom Banner */}
              <div className="space-y-1">
                <label htmlFor="bottomBanner" className="block text-xs font-medium text-blue-800">
                  Bottom Banner
                </label>
                <input
                  type="number"
                  id="bottomBanner"
                  name="bottomBanner"
                  value={formData.bottomBanner}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Mecarvi Gold */}
              <div className="space-y-1">
                <label htmlFor="mecarviGold" className="block text-xs font-medium text-blue-800">
                  Mecarvi Gold
                </label>
                <input
                  type="number"
                  id="mecarviGold"
                  name="mecarviGold"
                  value={formData.mecarviGold}
                  onChange={handleChange}
                  className="w-full px-3 py-1 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Form Footer */}
            <div className="pt-6 mt-6 border-t border-blue-100 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
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