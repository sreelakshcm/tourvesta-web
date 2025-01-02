import { useAppSelector } from '@app/hooks';
import { selectTheme } from '@actions/themeToggleAction';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const NetworkError: FC = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden text-center
 text-fontLight dark:bg-backgroundDark">
      <div className="z-10 space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={`/src/assets/svg/network-error-${theme}.svg`}
            alt="Network Error"
            className="h-96 w-96"
          />
        </div>

        {/* Main Message */}
        <p className="text-4xl font-bold text-gray-700 dark:text-gray-300">
          Oh no! You're Offline.
        </p>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          It seems there’s an issue with your internet connection. Please reconnect and try again.
        </p>

        {/* Navigation Options */}
        <div className="justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
          <Link
            to={'/'}
            className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg 
        transition-all duration-300 hover:scale-105 hover:bg-teal-700 focus:ring-2 
        focus:ring-teal-500"
          >
            Retry Connection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
