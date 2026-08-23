import { useAppSelector } from '@app/hooks';
import { TOURS } from '@constants/services';
import { selectTheme } from '@features/UI/themeToggleSlice';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const RenderLogo: FC<{ classname?: string; logoClassname: string }> = ({
  classname = '',
  logoClassname,
}) => {
  const theme = useAppSelector(selectTheme);

  return (
    <Link to={TOURS} className={classname}>
      <img
        src={
          theme === 'light'
            ? '/src/assets/svg/app-logo-dark.svg'
            : '/src/assets/svg/app-logo-light.svg'
        }
        alt="Logo"
        className={`${logoClassname}`}
      />
    </Link>
  );
};

export default RenderLogo;
