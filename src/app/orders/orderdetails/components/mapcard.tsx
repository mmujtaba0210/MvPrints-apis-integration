import React from 'react';

const MapCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      <h2 className="font-semibold mb-4 text-gray-800">University of Oxford</h2>
      <iframe
        src="https://www.google.com/maps?q=University+of+Oxford&output=embed"
        className="w-full h-48 rounded-md"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapCard;
