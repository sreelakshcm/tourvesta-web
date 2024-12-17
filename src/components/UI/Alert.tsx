import { useAppDispatch } from '@app/hooks';
import {
  clearAlertErrorState,
  clearSuccessState,
} from '@features/UI/themeToggleSlice';
import {
  AlertCircleIcon,
  Cancel02Icon,
  Tick04Icon,
  InformationCircleIcon,
} from 'hugeicons-react';
import React, { useEffect, useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const iconMapping = {
  success: <Tick04Icon size={24} className="text-green-600" />,
  error: <Cancel02Icon size={24} className="text-red-600" />,
  warning: <AlertCircleIcon size={24} className="text-yellow-600" />,
  info: <InformationCircleIcon size={24} className="text-blue-600" />,
};

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  duration = 1500,
}) => {
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();

  const onModalClose = (): void => {
    if (onClose) onClose();
    setVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (type === 'success') dispatch(clearSuccessState());
      if (type === 'error') dispatch(clearAlertErrorState());
    }, duration);

    return () => clearTimeout(timer);
  }, [dispatch, duration, type]);

  if (!visible) return null;

  return (
    <div
      className={`fixed left-1/2 top-10 z-[55] flex w-full max-w-lg -translate-x-1/2 transform 
items-center gap-4 rounded-lg border-l-4 p-4 shadow-lg transition-all ${
    type === 'success'
      ? 'border-green-500 bg-green-50'
      : type === 'error'
        ? 'border-red-500 bg-red-50'
        : type === 'warning'
          ? 'border-yellow-500 bg-yellow-50'
          : 'border-blue-500 bg-blue-50'
    }`}
    >
      {iconMapping[type]}

      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onModalClose}
          className="text-gray-500 transition hover:text-gray-700 focus:outline-none"
          aria-label="Close alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
