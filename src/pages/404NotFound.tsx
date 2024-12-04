import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div
      className="relative flex h-screen w-full items-center justify-center
      overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-center 
      text-fontLight dark:from-gray-800 dark:via-gray-500 dark:to-gray-800"
    >
      <div className="z-10 space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/src/assets/svg/404-not-found.svg" // Replace with your SVG or illustration
            alt="Page Not Found"
            className="h-96 w-96"
          />
        </div>

        {/* Main Message */}
        <p className="text-4xl font-bold text-gray-700 dark:text-gray-300">
          Oops! Page Not Found
        </p>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        {/* Navigation Options */}
        <div className="justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
          <Link
            to="/"
            className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg 
          transition-all duration-300 hover:scale-105 hover:bg-teal-700 focus:ring-2
          focus:ring-teal-500"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
