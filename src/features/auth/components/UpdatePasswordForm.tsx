import ButtonComponent from '@components/UI/Button';
import PasswordInput from '@components/UI/inputComponent/Password';
import { useAppDispatch } from '@app/hooks';
import { DEFAULT_INPUT_CLASSNAMES } from '@constants/styles';
import { useUpdatePasswordMutation } from '@features/auth/authApi';
import { setSuccess } from '@features/UI/themeToggleSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const passwordSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, 'Current Password must be at least 8 characters')
    .required('Current Password is required'),
  newPassword: Yup.string()
    .min(8, 'New Password must be at least 8 characters')
    .required('New Password is required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm New Password is required'),
});

const UpdatePasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues): Promise<void> => {
    await updatePassword(data).unwrap();
    reset();
    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Password updated successfully!',
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-6 md:w-2/3">
      <div>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              id="currentPassword"
              placeholder="Current Password"
              className={`${DEFAULT_INPUT_CLASSNAMES} 
placeholder:text-sm sm:placeholder:text-base`}
            />
          )}
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              id="newPassword"
              placeholder="New Password"
              className={`${DEFAULT_INPUT_CLASSNAMES} 
placeholder:text-sm sm:placeholder:text-base`}
            />
          )}
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div>
        <Controller
          name="newPasswordConfirm"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              id="newPasswordConfirm"
              placeholder="Confirm New Password"
              className={`${DEFAULT_INPUT_CLASSNAMES} 
placeholder:text-sm sm:placeholder:text-base`}
            />
          )}
        />
        {errors.newPasswordConfirm && (
          <p className="mt-1 text-sm text-red-500">
            {errors.newPasswordConfirm.message}
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-end">
        <ButtonComponent
          type="submit"
          className="mt-4 w-52 rounded-lg bg-primary py-2 text-base font-semibold
              text-white shadow-md hover:bg-primary-hover focus:outline-none"
          variant="filled"
          disabled={isUpdatingPassword}
        >
          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
        </ButtonComponent>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
