import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import PasswordInput from '@components/UI/inputComponent/Password';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail01Icon } from 'hugeicons-react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const Settings: FC = () => {
  const profileSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid Email Address')
      .required('Email is required'),
    image: Yup.string().notRequired(),
  });

  // Password update form schema
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

  // Profile form setup
  const {
    control: profileControl,
    handleSubmit: profileHandleSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  // Password form setup
  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  // Handle profile form submission
  const onProfileSubmit = (data): void => {
    console.log('Profile data:', data);
  };

  // Handle password form submission
  const onPasswordSubmit = (data): void => {
    console.log('Password data:', data);
  };

  return (
    <div
      className="h-full rounded-lg bg-white p-6 shadow-lg
  dark:bg-neutral-layout dark:text-gray-200"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Your Account Settings
      </h2>
      <div className="flex items-center justify-center">
        <form
          onSubmit={profileHandleSubmit(onProfileSubmit)}
          className="grid gap-6 md:w-2/3"
        >
          <div>
            <Controller
              name="name"
              control={profileControl}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Name"
                  className={`${DEFAULT_INPUT_CLASSNAMES} 
placeholder:text-sm sm:placeholder:text-base`}
                />
              )}
            />
            {profileErrors.name && (
              <p className="mt-1 text-sm text-red-500">
                {profileErrors.name?.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="email"
              control={profileControl}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  placeholder="Email"
                  className={`${DEFAULT_INPUT_CLASSNAMES} 
placeholder:text-sm sm:placeholder:text-base`}
                  suffix={<Mail01Icon size={20} color={SECONDARY_COLOR} />}
                />
              )}
            />
            {profileErrors.email && (
              <p className="mt-1 text-sm text-red-500">
                {profileErrors.email?.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="image"
              control={profileControl}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  id="image"
                  className="block w-full rounded-lg border-gray-300 text-sm shadow-sm dark:border-gray-600 dark:bg-backgroundDark"
                />
              )}
            />
          </div>
          <div className="flex w-full items-center justify-end">
            <ButtonComponent
              type="submit"
              className="mt-4 w-52 rounded-lg bg-primary py-2 text-base font-semibold
              text-white shadow-md hover:bg-primary-hover focus:outline-none"
              variant="filled"
            >
              Save Changes
            </ButtonComponent>
          </div>
        </form>
      </div>
      <hr className="my-10 w-full border-gray-200 dark:border-gray-700" />
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Update Password
      </h2>
      <div className="flex items-center justify-center">
        <form
          onSubmit={passwordHandleSubmit(onPasswordSubmit)}
          className="grid w-full gap-6 md:w-2/3"
        >
          <div>
            <Controller
              name="currentPassword"
              control={passwordControl}
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
            {passwordErrors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {passwordErrors.currentPassword?.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="newPassword"
              control={passwordControl}
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
            {passwordErrors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {passwordErrors.newPassword?.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="newPasswordConfirm"
              control={passwordControl}
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
            {passwordErrors.newPasswordConfirm && (
              <p className="mt-1 text-sm text-red-500">
                {passwordErrors.newPasswordConfirm?.message}
              </p>
            )}
          </div>
          <div className="flex w-full items-center justify-end">
            <ButtonComponent
              type="submit"
              className="mt-4 w-52 rounded-lg bg-primary py-2 text-base font-semibold
              text-white shadow-md hover:bg-primary-hover focus:outline-none"
              variant="filled"
            >
              Update Password
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
