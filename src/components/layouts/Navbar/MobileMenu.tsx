import { FC } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import NavigationLinks from './NavigationLinks';

interface MobileMenuProps {
  closeMenu: () => void;
  token: string | null;
  userName?: string;
  logOut: () => void;
  navigateToSettings: () => void,
}

const MobileMenu: FC<MobileMenuProps> = ({
  closeMenu,
  token,
  userName,
  logOut,
  navigateToSettings,
}) => {

  return (
    <div
      className="absolute left-0 top-full w-full bg-backgroundLight 
py-6 shadow-lg dark:bg-neutral-dark"
      role="dialog"
      aria-labelledby="mobile-menu"
      aria-modal="true"
    >
      <div className="flex flex-col items-center space-y-6">
        {/* User Avatar */}
        {userName && (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full
 bg-gray-200 text-2xl font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            aria-label="User Avatar"
          >
            {userName?.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Greeting */}
        <div
          onClick={navigateToSettings}
          className="text-center text-sm text-gray-800 dark:text-gray-200"
        >
          <p className="font-semibold">
            {userName ? `Hello, ${userName}` : 'Welcome!'}
          </p>
          {userName ? (
            <button className="text-xs text-gray-500 dark:text-gray-400">
              Manage your account
            </button>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please log in to continue
            </p>
          )}
        </div>

        {/* Divider */}
        <hr className="w-4/5 border-gray-300 dark:border-gray-700" />

        {/* Navigation Links */}
        <NavigationLinks closeMobileMenu={closeMenu} />

        {/* Theme Toggle */}
        <ThemeToggle />
        <hr className="w-4/5 border-gray-300 dark:border-gray-700" />

        {/* Authentication Actions */}
        {token ? (
          <div className="w-full space-y-2">
            <button
              className="w-full rounded-md px-4 py-2 text-sm transition hover:text-primary-hover"
              onClick={navigateToSettings}
            >
              Update Password
            </button>
            <button
              className="w-full rounded-md px-4 py-2 text-sm hover:text-primary-hover"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold
 text-white transition hover:bg-primary-hover"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
