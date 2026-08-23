import { FC, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RenderAbstractBg from '@components/common/RenderAbstractBg';
import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import { Mail01Icon } from 'hugeicons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import RenderLogo from '@components/common/RenderLogo';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';
import PasswordInput from '@components/UI/inputComponent/Password';
import { AuthFormType } from 'types/form';
import { useLoginMutation, useSignUpMutation } from '@features/auth/authApi';
import Loader from '@components/UI/Loader';

const AuthPage: FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get('invite') || undefined;

  const [signUp, { isLoading: isSignupLoading }] = useSignUpMutation();
  const [login, { isLoading: isLoginLoding }] = useLoginMutation();

  const toggleForm = (): void => {
    setAuthErrorMessage(null);
    setIsSignup((prev) => !prev);
  };

  useEffect(() => {
    if (invitationToken) setIsSignup(true);
  }, [invitationToken]);

  // Yup validation schema
  const authValidationSchema = Yup.object({
    name: isSignup
      ? Yup.string().required('Name is required')
      : Yup.string().notRequired(),
    email: Yup.string()
      .email('Invalid Email Address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordConfirm: isSignup
      ? Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
      : Yup.string().notRequired(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: yupResolver(authValidationSchema),
  });

  const onSubmit: SubmitHandler<AuthFormType> = async (data) => {
    try {
      if (isSignup) {
        const signupPayload = new FormData();
        signupPayload.append('name', data.name as string);
        signupPayload.append('email', data.email);
        signupPayload.append('password', data.password);
        signupPayload.append('passwordConfirm', data.passwordConfirm as string);
        if (invitationToken) signupPayload.append('invitationToken', invitationToken);
        if (data.image) signupPayload.append('photo', data.image);
        await signUp(signupPayload).unwrap();
        setIsSignup(false);
      } else {
        await login({ email: data.email, password: data.password }).unwrap();
      }
      reset();
      navigate('/tours', { replace: true });
    } catch (error) {
      const apiError = error as {
        status?: number | string;
        data?: { message?: string };
      };
      const isServerError =
        apiError.status === 'FETCH_ERROR' ||
        (typeof apiError.status === 'number' && apiError.status >= 500);
      setAuthErrorMessage(
        isServerError
          ? 'Unable to log in right now. Please try again shortly.'
          : apiError.data?.message || 'Unable to log in. Please try again.',
      );
    }
  };

  if (isLoginLoding || isSignupLoading) return <Loader />;

  return (
    <div
      className="relative flex min-h-screen items-center justify-center
        bg-backgroundLight text-fontLight dark:bg-backgroundDark dark:text-fontDark"
    >
     
      {/* Background & Theme Toggle */}
      <RenderAbstractBg />
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      {/* Auth Form Container */}
      <div
        className="z-10 w-full max-w-md space-y-8 rounded-lg
          bg-white p-8 shadow-md dark:bg-backgroundDark dark:shadow-dark
          sm:w-11/12 sm:p-6 md:w-96"
      >
        {/* Logo */}
        <RenderLogo
          classname="mb-4 flex cursor-pointer items-center justify-center"
          logoClassname="h-10 w-3/4 sm:h-8 sm:w-3/4 md:w-2/3"
        />

        {/* Form Heading */}
        <h2 className="mb-4 text-center text-xl font-semibold">
          {invitationToken ? 'Complete your invitation' : isSignup ? 'Sign Up' : 'Log In'}
        </h2>
        {authErrorMessage && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            {authErrorMessage}
          </p>
        )}
        {invitationToken && (
          <p className="rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary dark:text-primary-extraLight">
            You are registering with a role invitation. Use the email address that received the invite.
          </p>
        )}

        {/* Form Fields */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          {isSignup && (
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Name"
                  className={DEFAULT_INPUT_CLASSNAMES}
                />
              )}
            />
          )}
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name?.message}</p>
          )}

          {isSignup && (
            <Controller
              name="image"
              control={control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <div>
                  <label htmlFor="signup-photo" className="mb-2 block text-sm font-medium">
                    Profile picture <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(event) => onChange(event.target.files?.[0] || null)}
                    id="signup-photo"
                    type="file"
                    accept="image/*"
                    className="block w-full rounded-lg border border-gray-300 p-2 text-sm dark:border-gray-600 dark:bg-backgroundDark"
                  />
                </div>
              )}
            />
          )}

          {/* Email Input */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                placeholder="Email"
                className={DEFAULT_INPUT_CLASSNAMES}
                suffix={<Mail01Icon size={20} color={SECONDARY_COLOR} />}
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          )}

          {/* Password Input */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                id="password"
                placeholder="Password"
                className={DEFAULT_INPUT_CLASSNAMES}
              />
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          )}

          {/* Confirm Password (only for Sign Up) */}
          {isSignup && (
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  className={DEFAULT_INPUT_CLASSNAMES}
                />
              )}
            />
          )}
          {isSignup && errors.passwordConfirm && (
            <p className="text-sm text-red-500">
              {errors.passwordConfirm?.message}
            </p>
          )}

          {/* Submit Button */}
          <ButtonComponent
            type="submit"
            className="mt-6 w-full rounded-lg bg-primary py-3 text-lg font-semibold
              text-white shadow-md hover:bg-primary-hover focus:outline-none"
            variant="filled"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </ButtonComponent>
        </form>

        {/* Toggle Between Login and Signup */}
        {!invitationToken && (
          <div className="text-center dark:text-mutedDark">
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <ButtonComponent
                  variant="link"
                  onClick={toggleForm}
                  className="text-primary hover:text-primary-focus"
                >
                  Log in
                </ButtonComponent>
              </span>
            ) : (
              <span>
                Need an account?{' '}
                <ButtonComponent
                  variant="link"
                  onClick={toggleForm}
                  className="text-primary hover:text-primary-focus"
                >
                  Sign up
                </ButtonComponent>
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthPage;
