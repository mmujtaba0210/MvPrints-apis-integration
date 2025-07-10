import React from 'react';
import Image from 'next/image';

interface OrderItem {
  title: string;
  price: number;
  size: string;
  image: string;
}

const items: OrderItem[] = [
  {
    title: 'Minetta Rattan Swivel Luxury Green Lounge Chair',
    price: 300,
    size: '56L x 83D x 102H CM',
    image: '/images/chair1.jpg',
  },
  {
    title: 'Jordan Jumpman MVP Men\'s Shoes Size',
    price: 400,
    size: '8',
    image: '/images/chair1.jpg',
  },
  {
    title: 'Men White Slim Fit T-shirt',
    price: 70.9,
    size: 'M',
    image: '/images/chair1.jpg',
  },
  {
    title: 'HYPERX Cloud Gaming Headphone',
    price: 230.9,
    size: 'M',
    image: '/images/chair1.jpg',
  },
];

const OrderItems = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{item.title}</p>
              <p className="text-xs text-gray-500">Price: ${item.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Size: {item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;