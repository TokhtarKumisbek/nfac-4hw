"use client";

import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import ProductsList from './ProductsList';
import ProductCreation from './ProductCreation';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle themes

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define themes
  const themeClasses = isDarkMode
    ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white'
    : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white';


  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <header className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-black">AuraNev</h1>
            <button 
              onClick={toggleForm}
              className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
            >
              {showForm ? 'Back' : 'Create Product'}
            </button>

            <button 
                onClick={toggleTheme}
                className="bg-blue-500 text-gray-900 py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>

          </div>
        </header>


        <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {showForm && (
            <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
              <ProductCreation />
            </div>
          )}
          <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-6">
            <ProductsList />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
