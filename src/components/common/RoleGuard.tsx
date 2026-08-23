import { useAppSelector } from '@app/hooks';
import { getToken, getUserData } from '@features/auth/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { CurrentUser } from 'types/tourTypes';
import { ReactNode } from 'react';

type RoleGuardProps = {
  roles: CurrentUser['role'][];
  children?: ReactNode;
};

const RoleGuard = ({ roles, children }: RoleGuardProps): JSX.Element => {
  const token = useAppSelector(getToken);
  const user = useAppSelector(getUserData);
  const location = useLocation();

  if (!token) return <Navigate to="/auth" replace state={{ from: location }} />;
  if (!user || !roles.includes(user.role)) return <Navigate to="/tours" replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default RoleGuard;
