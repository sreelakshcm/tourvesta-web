import {
  FC, ReactElement, useEffect, useRef, useState, 
} from 'react';
import SearchBar from '@components/UI/inputComponent/Search';
import { MenuCircleIcon, Search02Icon } from 'hugeicons-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import RenderLogo from '@components/common/RenderLogo';
import { DEFAULT_INPUT_CLASSNAMES } from '@constants/styles';
import { useAppSelector } from '@app/hooks';
import { selectTheme } from '@features/UI/themeToggleSlice';
import { REVIEWS } from '@constants/services';
import { getAllTourData } from '@features/tours/tourActions';
import { isSearch } from '@features/UI/navbarSlice';
import { getToken } from '@features/auth/authSlice';

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const token = useAppSelector(getToken);
  const isRenderSearch = useAppSelector(isSearch);
  const theme = useAppSelector(selectTheme);
  const tours = useAppSelector(getAllTourData);

  const toggleMobileMenu = (): void => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearchBar = (): void => setIsSearchOpen((prev) => !prev);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const iconColor = theme === 'dark' ? '#fff' : '#000';

  const isMobileAfterNavigateOnClick: (() => void) | undefined =
    isMobileMenuOpen ? () => setIsMobileMenuOpen(false) : undefined;

  const NavigationLinks = (): ReactElement => (
    <>
      <Link
        to="/"
        onClick={isMobileAfterNavigateOnClick}
        className="text-sm font-semibold hover:text-primary"
      >
        All Tours
      </Link>
      <Link
        to={REVIEWS}
        onClick={isMobileAfterNavigateOnClick}
        className="text-sm font-semibold hover:text-primary"
      >
        Reviews
      </Link>
      <Link
        to="/about"
        onClick={isMobileAfterNavigateOnClick}
        className="text-sm font-semibold hover:text-primary"
      >
        About Us
      </Link>
    </>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false); // Close mobile menu if clicked outside
      }
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false); // Close search bar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full bg-backgroundLight 
py-2 shadow-md dark:bg-neutral-layout"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="w-full md:w-40 lg:w-52">
          <RenderLogo logoClassname="" />
        </div>

        {/* Search Bar for Desktop */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <div className="w-2/3 lg:w-1/2">
            {isRenderSearch && (
              <SearchBar
                placeholder="Search..."
                className={`${DEFAULT_INPUT_CLASSNAMES} transition-all duration-300`}
                data={isRenderSearch === 'tours' ? tours : undefined}
              />
            )}
          </div>
        </div>

        {/* Navigation Links and Log In Button for Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <NavigationLinks />
          {!token && (
            <Link
              to="/auth"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold
 text-white hover:bg-primary-hover"
            >
              Log In
            </Link>
          )}
        </div>

        <div className="ml-4 hidden items-center space-x-4 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex items-center pl-2 md:hidden">
          {isRenderSearch && (
            <button onClick={toggleSearchBar} className="p-2">
              <Search02Icon size={24} color={iconColor} />
            </button>
          )}
          <button onClick={toggleMobileMenu} className="p-2">
            <MenuCircleIcon size={24} color={iconColor} />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div
          ref={searchBarRef}
          className="absolute left-0 top-full w-full bg-backgroundLight 
p-4 shadow-md dark:bg-neutral-dark"
        >
          <SearchBar
            placeholder="Search..."
            className={`${DEFAULT_INPUT_CLASSNAMES} w-full`}
            data={isRenderSearch === 'tours' ? tours : undefined}
          />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute left-0 top-full w-full bg-backgroundLight py-6 
shadow-lg dark:bg-neutral-dark"
        >
          <div className="flex flex-col items-center space-y-4">
            <NavigationLinks />
            {!token && (
              <Link
                to="/auth"
                className="rounded-md bg-primary px-4 py-2 text-sm 
font-semibold text-white hover:bg-primary-hover"
              >
                Log In
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
