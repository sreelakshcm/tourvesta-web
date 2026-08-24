import { useAppSelector } from '@app/hooks';
import { getUserData } from '@features/auth/authSlice';
import { Navigate, Outlet } from 'react-router-dom';

const GuideRestrictedRoute = (): JSX.Element => {
  const user = useAppSelector(getUserData);
  const isGuide = user?.role === 'guide' || user?.role === 'lead-guide';

  return isGuide ? <Navigate to="/guide" replace /> : <Outlet />;
};

export default GuideRestrictedRoute;
