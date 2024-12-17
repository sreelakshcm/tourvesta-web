import { FC, useEffect, useRef, useState } from 'react';
import { Cancel01Icon, MenuCircleIcon, Search02Icon } from 'hugeicons-react';
import RenderLogo from '@components/common/RenderLogo';
import SearchBarWrapper from './SearchBarWrapper';
import MobileMenu from './MobileMenu';
import NavigationLinks from './NavigationLinks';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectTheme, setSuccess } from '@features/UI/themeToggleSlice';
import { getToken, getUserData } from '@features/auth/authSlice';
import { isSearch } from '@features/UI/navbarSlice';
import { getAllTourData } from '@features/tours/tourActions';
import { setupClickOutsideListener } from '@utils/clickOutsideHandler';
import { Link, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '@features/auth/authApi';
import Loader from '@components/UI/Loader';
import { AUTH } from '@constants/services';

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserSettingsMenuOpen, setIsUserSettingsMenuOpen] = useState(false);

  const token = useAppSelector(getToken);
  const userDetails = useAppSelector(getUserData);
  const isRenderSearch = useAppSelector(isSearch);
  const theme = useAppSelector(selectTheme);
  const tours = useAppSelector(getAllTourData);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [logout, { isLoading, isError, error }] = useSendLogoutMutation();

  const mobileNavbarMenuRef = useRef<HTMLDivElement>(null);
  const searchBarNavRef = useRef<HTMLDivElement>(null);
  const userSettingsMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = (): void => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearchBar = (): void => setIsSearchOpen((prev) => !prev);
  const toggleDropdown = (): void => setIsUserSettingsMenuOpen((prev) => !prev);

  const iconColor = theme === 'dark' ? '#fff' : '#000';

  useEffect(() => {
    return setupClickOutsideListener(
      [mobileNavbarMenuRef, searchBarNavRef, userSettingsMenuRef],
      [
        () => setIsMobileMenuOpen(false),
        () => setIsSearchOpen(false),
        () => setIsUserSettingsMenuOpen(false),
      ],
    );
  }, []);

  const logOut = (): void => {
    navigate(`${AUTH}`);
    logout('');
    setIsMobileMenuOpen(false);
    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Logged out successfully!',
      }),
    );
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full bg-backgroundLight
 shadow-md dark:bg-neutral-layout"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="w-full md:w-40 lg:w-52">
          <RenderLogo logoClassname="" />
        </div>

        {/* Search Bar for Desktop */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          {isRenderSearch && (
            <SearchBarWrapper
              data={isRenderSearch === 'tours' ? tours : undefined}
            />
          )}
        </div>

        {/* Navigation Links and Avatar for Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <NavigationLinks />
          <div className="ml-4 hidden items-center space-x-4 md:flex">
            <ThemeToggle />
          </div>
          {token ? (
            <div
              id="userSettings"
              ref={userSettingsMenuRef}
              className="relative"
            >
              <button onClick={toggleDropdown}>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full
bg-gray-200 text-lg font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                >
                  {userDetails?.name?.charAt(0).toUpperCase()}
                </div>
              </button>
              {isUserSettingsMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 transform rounded-lg bg-white 
shadow-lg transition-transform duration-300 ease-in-out dark:bg-neutral-dark"
                >
                  {/* Dropdown Header */}
                  <div
                    onClick={() => {
                      navigate('/settings');
                      setIsUserSettingsMenuOpen(false);
                    }}
                    className="cursor-pointer border-b border-gray-200 px-4 py-3 text-sm
                     text-gray-800 dark:border-gray-700 dark:text-gray-200"
                  >
                    <span className="block font-semibold">
                      Hello, {userDetails?.name ?? 'User'}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      Manage your account
                    </span>
                  </div>
                  {/* Dropdown Items */}
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors
 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                    onClick={() => console.log('Update Password clicked')}
                  >
                    Update Password
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors
 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold
 text-white hover:bg-primary-hover"
            >
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex items-center pl-2 md:hidden">
          {isRenderSearch && !isSearchOpen && (
            <button onClick={toggleSearchBar} className="p-2">
              <Search02Icon size={24} color={iconColor} />
            </button>
          )}
          {isRenderSearch && isSearchOpen && (
            <button onClick={() => setIsSearchOpen(false)} className="p-2">
              <Cancel01Icon size={24} color={iconColor} />
            </button>
          )}
          {isMobileMenuOpen ? (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-10 w-10 p-2"
            >
              <img
                src={`/src/assets/svg/close-menu-${theme}.svg`}
                alt="close menu"
                className="h-full w-full"
              />
            </button>
          ) : (
            <button onClick={toggleMobileMenu} className="p-2">
              <MenuCircleIcon size={24} color={iconColor} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div
          ref={searchBarNavRef}
          className="absolute left-0 top-full w-full bg-backgroundLight
           p-4 shadow-md dark:bg-neutral-dark"
        >
          <SearchBarWrapper
            data={isRenderSearch === 'tours' ? tours : undefined}
            isMobile
          />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileNavbarMenuRef}>
          <MobileMenu
            closeMenu={() => setIsMobileMenuOpen(false)}
            token={token}
            userName={userDetails?.name}
            logOut={logOut}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
