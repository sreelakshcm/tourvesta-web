import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail01Icon } from 'hugeicons-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {
  useApplyForGuideMutation,
  useDeleteMyPhotoMutation,
  useGetMeQuery,
  useUpdateMeMutation,
} from '@features/users/userApi';
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
  const [deleteMyPhoto, { isLoading: isDeletingPhoto }] = useDeleteMyPhotoMutation();
  const [applyForGuide, { isLoading: isApplying }] = useApplyForGuideMutation();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [guideMessage, setGuideMessage] = useState('');
  const [guideError, setGuideError] = useState<string>();
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
    formState: { errors: profileErrors, isDirty },
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
    resetProfile({
      name: updatedUser.name,
      email: updatedUser.email,
      image: null,
    });
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

  const removeProfilePhoto = async (): Promise<void> => {
    await deleteMyPhoto().unwrap();
    setPreviewUrl(undefined);
    resetProfile({ name: user?.name || '', email: user?.email || '', image: null });
    dispatch(
      setSuccess({ isSuccess: true, successMessage: 'Profile picture removed successfully!' }),
    );
  };

  const submitGuideApplication = async (): Promise<void> => {
    try {
      setGuideError(undefined);
      await applyForGuide({ message: guideMessage }).unwrap();
      setGuideMessage('');
      dispatch(
        setSuccess({
          isSuccess: true,
          successMessage: 'Your guide application was submitted for review.',
        }),
      );
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      setGuideError(apiError.data?.message || 'Unable to submit your application.');
    }
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
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-neutral-dark">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md dark:border-neutral-layout"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-2xl font-bold text-primary">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold">Profile picture</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  PNG or JPG, up to 5 MB.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Controller
                  name="image"
                  control={profileControl}
                  render={({ field: { ref, name, onBlur, onChange } }) => (
                    <>
                      <input
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, onChange)}
                        className="sr-only"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
                      >
                        {previewUrl ? 'Edit picture' : 'Add profile picture'}
                      </label>
                    </>
                  )}
                />
                {previewUrl && (
                  <ButtonComponent
                    type="button"
                    onClick={removeProfilePhoto}
                    disabled={isDeletingPhoto}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:border-red-500 hover:text-red-700"
                  >
                    {isDeletingPhoto ? 'Removing...' : 'Delete'}
                  </ButtonComponent>
                )}
              </div>
            </div>
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
          {(isDirty || isUpdating) && (
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
          )}
        </form>
      </div>
      {user?.role === 'user' && (
        <>
          <hr className="my-10 w-full border-gray-200 dark:border-gray-700" />
          <section className="mx-auto max-w-2xl rounded-lg border border-primary/20 p-5">
            <h2 className="text-xl font-bold text-primary">Become a guide</h2>
            {user.guideApplicationStatus === 'pending' ? (
              <p className="mt-2 text-sm">Your application is awaiting an administrator’s review.</p>
            ) : (
              <>
                <p className="mt-2 text-sm">
                  Tell us briefly why you would be a great Tourvesta guide.
                </p>
                <textarea
                  value={guideMessage}
                  onChange={(event) => setGuideMessage(event.target.value)}
                  maxLength={500}
                  rows={4}
                  className="mt-4 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-backgroundDark"
                  placeholder="Your experience, destinations, or qualifications (optional)"
                />
                {guideError && <p className="mt-2 text-sm text-red-500">{guideError}</p>}
                <ButtonComponent
                  type="button"
                  onClick={submitGuideApplication}
                  disabled={isApplying}
                  className="mt-4 bg-primary text-white"
                >
                  {isApplying ? 'Submitting…' : 'Apply to become a guide'}
                </ButtonComponent>
              </>
            )}
          </section>
        </>
      )}
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
