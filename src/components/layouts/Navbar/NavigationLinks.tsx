import { FC } from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS } from '@constants/services';
import { useAppSelector } from '@app/hooks';
import { getUserData } from '@features/auth/authSlice';

interface NavigationLinksProps {
  closeMobileMenu?: () => void;
}

const NavigationLinks: FC<NavigationLinksProps> = ({ closeMobileMenu }) => {
  const user = useAppSelector(getUserData);

  return (
    <>
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="text-sm font-semibold hover:text-primary"
      >
        Explore Tours
      </Link>
      <Link
        to={REVIEWS}
        onClick={closeMobileMenu}
        className="text-sm font-semibold hover:text-primary"
      >
        Reviews
      </Link>
      <Link
        to="/about"
        onClick={closeMobileMenu}
        className="text-sm font-semibold hover:text-primary"
      >
        About Us
      </Link>
      {user?.role === 'admin' && (
        <Link
          to="/admin/roles"
          onClick={closeMobileMenu}
          className="text-sm font-semibold hover:text-primary"
        >
          Role Management
        </Link>
      )}
    </>
  );
};

export default NavigationLinks;
