import React from 'react';
import Logo from './Logo';

const LandingPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center">
            <Logo />
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-6">
              Explore GitHub Profiles Effortlessly
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl">
              Discover, compare, and analyze GitHub users with ease. Dive into detailed profiles, repositories, and much more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/user"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-500 transition">
                Get Started
              </a>
              <a
                href="/compare"
                className="bg-gray-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition">
                Compare Users
              </a>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-400">User Profiles</h3>
                <p className="mt-2 text-gray-300">
                  View detailed GitHub profiles, repositories, followers, and starred projects.
                </p>
              </div>
              <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-400">Comparison Tool</h3>
                <p className="mt-2 text-gray-300">
                  Compare users side-by-side to evaluate their contributions and activity.
                </p>
              </div>
              <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-400">Responsive Design</h3>
                <p className="mt-2 text-gray-300">
                  Optimized for both desktop and mobile, ensuring seamless accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LandingPage;