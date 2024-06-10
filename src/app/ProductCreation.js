"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import Resizer from 'react-image-file-resizer';

const ProductCreation = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { title, price, description, category, image: imageUrl };

    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      console.log('Product created:', response.data);
      queryClient.invalidateQueries(['products']);  // Invalidate the query to refetch the products list
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        150,  // Reduced width
        150,  // Reduced height
        'JPEG',
        70,  // Reduced quality
        0,
        (uri) => {
          // Check the size of the resized image
          const byteString = atob(uri.split(',')[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const resizedFile = new Blob([ab], { type: 'image/jpeg' });
          if (resizedFile.size <= 500 * 1024) {  // Ensure size is less than 500 KB
            setImageUrl(uri);
          } else {
            console.error('Image size exceeds 500 KB after resizing.');
          }
        },
        'base64'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black p-8 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white-700">Title:</label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-white-700">Price:</label>
          <input 
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-white-700">Description:</label>
          <textarea 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-white-700">Category:</label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-white-700">Image:</label>
          <input 
            type="file"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            onChange={handleImageChange} 
          />
        </div>
        {imageUrl && <img src={imageUrl} alt="Preview" className="mb-4" width="100" />}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 text-black"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreation;
