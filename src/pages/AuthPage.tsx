import { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RenderAbstractBg from '@components/common/RenderAbstractBg';
import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import { Mail01Icon } from 'hugeicons-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import RenderLogo from '@components/common/RenderLogo';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';
import PasswordInput from '@components/UI/inputComponent/Password';
import { AuthFormType } from 'types/form';
import { SignUpPayload } from 'types/api';
import Loader from '@components/UI/Loader';
import { useAppDispatch } from '@app/hooks';
import { getUserDetails, setToken } from '@slices/authSlice';
import {
  setSuccess,
} from '@slices/themeToggleSlice';
import Alert from '@components/UI/Alert';
import { useLoginMutation, useSignUpMutation } from '@app/services/authApi';

const AuthPage: FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signUp, { isLoading: isSignupLoading, isError, error }] =
    useSignUpMutation();
  const [login, { isLoading: isLoginLoding }] = useLoginMutation();

  const toggleForm = (): void => setIsSignup((prev) => !prev);

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
  } = useForm({
    resolver: yupResolver(authValidationSchema),
  });

  const onSubmit: SubmitHandler<AuthFormType> = async (data) => {
    if (isSignup) {
      const signupPayload: SignUpPayload = {
        name: data.name as string,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm as string,
      };
      const { token } = await signUp(signupPayload).unwrap();

      setIsSignup(false);
      dispatch(setToken(token));
      dispatch(
        setSuccess({
          isSuccess: true,
          successMessage: 'User registered successfully!',
        }),
      );
    } else {
      const credentials = {
        email: data.email,
        password: data.password,
      };
      await login(credentials).unwrap();
    }
    reset();
    dispatch(getUserDetails());
    navigate('/');
  };

  if (isLoginLoding || isSignupLoading) return <Loader />;

  if (isError) return <Alert message={JSON.stringify(error)} type="error" />;

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
          {isSignup ? 'Sign Up' : 'Log In'}
        </h2>

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

        {/* Forgot Password Link (only for Login) */}
        {!isSignup && (
          <div className="mt-4 text-center text-sm dark:text-mutedDark">
            <Link
              to="/forgot-password"
              className="text-secondary hover:text-secondary-focus"
            >
              Forgot Password?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
