import { useAppSelector } from '@app/hooks';
import { AUTH } from '@constants/services';
import { getErrors } from '@features/UI/themeToggleSlice';
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const globalError = useAppSelector(getErrors);

  return (
    <div className="w-full overflow-hidden text-center text-fontLight dark:bg-backgroundDark">
      <div className="z-10 space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/src/assets/svg/invalid.svg" // Replace with your SVG or illustration
            alt="Session Expired"
            className="h-60 w-60"
          />
        </div>

        {/* Main Message */}
        <p className="text-4xl font-bold text-gray-700 dark:text-gray-300">
          {globalError.errorMessage}
        </p>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Your session has expired or you are unauthorized to access this page.
        </p>

        {/* Navigation Options */}
        <div className="justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
          <Link
            to={AUTH}
            className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg 
        transition-all duration-300 hover:scale-105 hover:bg-teal-700 focus:ring-2 
        focus:ring-teal-500"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
