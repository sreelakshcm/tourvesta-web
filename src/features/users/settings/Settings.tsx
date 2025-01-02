import { useAppDispatch, useAppSelector } from '@app/hooks';
import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import PasswordInput from '@components/UI/inputComponent/Password';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';
import { getUserData } from '@slices/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Camera01Icon,
  CancelCircleIcon,
  MailEdit02Icon,
  MailRemove02Icon,
  UserEdit01Icon,
  UserRemove01Icon,
} from 'hugeicons-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import {
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} from '@services/userApi';
import Loader from '@components/UI/Loader';
import validationSchema from '@schema/index';
import { setAlertError } from '@app/slices/themeToggleSlice';
import { setIsSearch } from '@app/slices/navbarSlice';

const Settings: FC = () => {
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [updatePassword, { isLoading: isPasswordLoading }] =
    useUpdatePasswordMutation();
  const { name = '', email = '' } = useAppSelector(getUserData) || {};
  const [isEdit, setIsEdit] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const profileSchema = validationSchema.profile(name, email);
  const passwordSchema = validationSchema.password;

  const dispatch = useAppDispatch();

  // Profile form setup
  const {
    control: profileControl,
    handleSubmit: profileHandleSubmit,
    formState: { errors: profileErrors, dirtyFields: profileDirtyFields },
    resetField: resetProfileFields,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: { name, email },
  });

  // Password form setup
  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
    reset,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        image?: string | undefined;
        email: string;
        name: string;
      },
      'image'
    >,
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (less than 5MB)
      if (file.size > 2 * 1024 * 1024) {
        dispatch(
          setAlertError({
            isError: true,
            errorMessage: 'File size must be less than 2MB',
          }),
        );
        return;
      }

      // Convert the file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(reader.result?.toString());
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile form submission
  const onProfileSubmit = (data: {
    image?: string | undefined;
    name: string;
    email: string;
  }): void => {
    updateMe({ email: data.email, name: data.name, photo: data.image });
  };

  // Handle newPassword form submission
  const onPasswordSubmit = (data: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  }): void => {
    updatePassword(data);
    reset();
  };

  useEffect(() => {
    dispatch(setIsSearch(null));
  }, [dispatch]);

  useEffect(() => {
    if (isEdit.name && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEdit.name]);

  useEffect(() => {
    if (isEdit.email && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isEdit.email]);

  // Check if any of the fields are dirty
  const isModified =
    !!profileDirtyFields.name ||
    !!profileDirtyFields.email ||
    profileDirtyFields.image;

  if (isLoading || isPasswordLoading) return <Loader />;

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
          <div className="flex flex-col items-center space-y-4">
            <Controller
              name="image"
              control={profileControl}
              render={({ field }) => (
                <div className="group relative">
                  {field.value ? (
                    <div className="relative">
                      <img
                        src={field.value}
                        alt="Profile"
                        className="h-32 w-32 rounded-full object-cover shadow-lg"
                      />
                      <button
                        type="button"
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 
text-white opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => resetProfileFields('image')}
                      >
                        <CancelCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex h-32 w-32 items-center justify-center 
rounded-full bg-gray-200 text-2xl font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <label
                    className="absolute bottom-0 right-0 cursor-pointer rounded-full
 bg-primary p-2 text-white shadow-lg transition-transform hover:scale-110"
                  >
                    <Camera01Icon className="h-5 w-5" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, field)}
                    />
                  </label>
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              name="name"
              control={profileControl}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Name"
                  readOnly={!isEdit.name}
                  ref={(elm) => {
                    nameInputRef.current = elm;
                    field.ref(elm);
                  }}
                  className={`${DEFAULT_INPUT_CLASSNAMES}
  placeholder:text-sm sm:placeholder:text-base`}
                  suffix={
                    <ButtonComponent
                      type="button"
                      variant="link"
                      className="px-0"
                      onClick={() => {
                        setIsEdit((prev) => ({ ...prev, name: !prev.name }));
                      }}
                    >
                      {isEdit.name ? (
                        <UserRemove01Icon size={20} color={SECONDARY_COLOR} />
                      ) : (
                        <UserEdit01Icon size={20} color={SECONDARY_COLOR} />
                      )}
                    </ButtonComponent>
                  }
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
                  readOnly={!isEdit.email}
                  ref={(elm) => {
                    emailInputRef.current = elm;
                    field.ref(elm);
                  }}
                  className={`${DEFAULT_INPUT_CLASSNAMES}
  placeholder:text-sm sm:placeholder:text-base`}
                  suffix={
                    <ButtonComponent
                      type="button"
                      variant="link"
                      className="px-0"
                      onClick={() =>
                        setIsEdit((prev) => ({ ...prev, email: !prev.email }))
                      }
                    >
                      {isEdit.email ? (
                        <MailRemove02Icon size={20} color={SECONDARY_COLOR} />
                      ) : (
                        <MailEdit02Icon size={20} color={SECONDARY_COLOR} />
                      )}
                    </ButtonComponent>
                  }
                />
              )}
            />

            {profileErrors.email && (
              <p className="mt-1 text-sm text-red-500">
                {profileErrors.email?.message}
              </p>
            )}
          </div>

          {isModified && (
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
          )}
        </form>
      </div>
      <hr className="my-10 w-full border-gray-200 dark:border-gray-700" />
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Password Settings
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
