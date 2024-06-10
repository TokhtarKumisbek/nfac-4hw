"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from './productsService';

const ProductsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 0, // Ensure it refetches the data on invalidation
    cacheTime: 0, // Ensure the cache is not used
  });

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error.message}</div>;

  console.log('Fetched products:', data);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">AuraNev</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map(product => (
          <div key={product.id} className="bg-black shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover" src={product.image} alt={product.title} />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-xl font-semibold text-white-700 mb-4">${product.price}</p>
              <p className="text-white-600">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
