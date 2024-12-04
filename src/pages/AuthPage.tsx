import RenderAbstractBg from '@components/common/RenderAbstractBg';
import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import PasswordInput from '@components/UI/inputComponent/Password';
import { Mail01Icon } from 'hugeicons-react';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import RenderLogo from '@components/common/RenderLogo';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';

const AuthPage: FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = (): void => setIsSignup((prev) => !prev);

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
        <form className="space-y-6">
          {/* Email Input */}
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className={DEFAULT_INPUT_CLASSNAMES}
            suffix={<Mail01Icon size={20} color={SECONDARY_COLOR} />}
          />

          {/* Password Input */}
          <PasswordInput
            id="password"
            placeholder="Password"
            className={DEFAULT_INPUT_CLASSNAMES}
          />

          {/* Confirm Password (only for Sign Up) */}
          {isSignup && (
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm Password"
              className={DEFAULT_INPUT_CLASSNAMES}
            />
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
