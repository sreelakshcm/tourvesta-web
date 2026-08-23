import RenderAbstractBg from '@components/common/RenderAbstractBg';
import ButtonComponent from '@components/UI/Button';
import Input from '@components/UI/inputComponent';
import RenderLogo from '@components/common/RenderLogo';
import ThemeToggle from '@components/UI/ThemeToggleButton';
import { Mail01Icon } from 'hugeicons-react';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_INPUT_CLASSNAMES, SECONDARY_COLOR } from '@constants/styles';

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    // Password reset logic (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      alert('Password reset link sent to your email');
      navigate('/auth'); // Redirect to login page after submitting
    }, 2000);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center
       bg-backgroundLight text-fontLight dark:bg-backgroundDark dark:text-fontDark"
    >
      <RenderAbstractBg />
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>
      <div
        className="z-10 w-full max-w-md space-y-8 rounded-lg
         bg-white p-8 shadow-md dark:bg-backgroundDark dark:shadow-dark sm:w-11/12 sm:p-6 md:w-96"
      >
        <RenderLogo
          classname="mb-4 flex cursor-pointer items-center justify-center"
          logoClassname="h-10 w-3/4 sm:h-8 sm:w-3/4 md:w-2/3"
        />
        <h2 className="mb-4 text-center text-xl font-semibold">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={DEFAULT_INPUT_CLASSNAMES}
            suffix={<Mail01Icon size={20} color={SECONDARY_COLOR} />}
          />
          <ButtonComponent
            type="submit"
            className="mt-4 w-full rounded-lg bg-primary py-3 text-lg font-semibold
             text-white shadow-md hover:bg-primary-hover focus:outline-none"
            variant="filled"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </ButtonComponent>
        </form>

        <div className="mt-4 text-center text-sm dark:text-mutedDark">
          <button
            onClick={() => navigate('/auth')}
            className="text-secondary hover:text-secondary-focus"
          >
            Back to Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
