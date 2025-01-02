import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@app/store';
import { clearNavigateTo } from '@slices/navigationSlice';

const NavigationHandler: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateTo = useSelector(
    (state: RootState) => state.navigation.navigateTo,
  );

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo);
      dispatch(clearNavigateTo());
    }
  }, [navigateTo, dispatch, navigate]);

  return null;
};

export default NavigationHandler;
