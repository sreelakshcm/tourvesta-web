import { FC } from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS } from '@constants/services';

interface NavigationLinksProps {
  closeMobileMenu?: () => void;
}

const NavigationLinks: FC<NavigationLinksProps> = ({ closeMobileMenu }) => (
  <>
    <Link
      to="/"
      onClick={closeMobileMenu}
      className="text-sm font-semibold hover:text-primary"
    >
      All Tours
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
  </>
);

export default NavigationLinks;
