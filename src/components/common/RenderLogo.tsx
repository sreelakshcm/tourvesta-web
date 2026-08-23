import { useAppSelector } from '@app/hooks';
import { TOURS } from '@constants/services';
import { selectTheme } from '@features/UI/themeToggleSlice';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import darkLogo from '@assets/svg/app-logo-dark.svg';
import lightLogo from '@assets/svg/app-logo-light.svg';

const RenderLogo: FC<{ classname?: string; logoClassname: string }> = ({
  classname = '',
  logoClassname,
}) => {
  const theme = useAppSelector(selectTheme);

  return (
    <Link to={TOURS} className={classname}>
      <img
        src={
          theme === 'light' ? darkLogo : lightLogo
        }
        alt="Logo"
        className={`${logoClassname}`}
      />
    </Link>
  );
};

export default RenderLogo;
