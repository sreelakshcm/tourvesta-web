import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail01Icon } from 'hugeicons-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useGetMeQuery, useUpdateMeMutation } from '@features/users/userApi';
import { useAppDispatch } from '@app/hooks';
import { setSuccess } from '@features/UI/themeToggleSlice';
import UpdatePasswordForm from '@features/auth/components/UpdatePasswordForm';

type ProfileFormValues = {
  name: string;
  email: string;
  image?: File | null;
};

const Settings: FC = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetMeQuery();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const profileSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid Email Address')
      .required('Email is required'),
    image: Yup.mixed<File>().notRequired(),
  });

  // Profile form setup
  const {
    control: profileControl,
    handleSubmit: profileHandleSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      resetProfile({ name: user.name, email: user.email });
      setPreviewUrl(user.photo);
    }
  }, [resetProfile, user]);

  // Handle profile form submission
  const onProfileSubmit = async (data: ProfileFormValues): Promise<void> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.image) formData.append('photo', data.image);

    const updatedUser = await updateMe(formData).unwrap();
    setPreviewUrl(updatedUser.photo);
    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Profile updated successfully!',
      }),
    );
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (_file?: File) => void,
  ): void => {
    const file = event.target.files?.[0];
    onChange(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
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
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="mb-3 h-20 w-20 rounded-full object-cover"
              />
            )}
            <Controller
              name="image"
              control={profileControl}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <input
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, onChange)}
                  className="block w-full rounded-lg border-gray-300 text-sm shadow-sm
                    dark:border-gray-600 dark:bg-backgroundDark"
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
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </ButtonComponent>
          </div>
        </form>
      </div>
      <hr className="my-10 w-full border-gray-200 dark:border-gray-700" />
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Update Password
      </h2>
      <div className="flex items-center justify-center">
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default Settings;
