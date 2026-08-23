import UpdatePasswordForm from '@features/auth/components/UpdatePasswordForm';
import { FC } from 'react';

const UpdatePasswordPage: FC = () => (
  <div
    className="min-h-[calc(100vh-6.5rem)] bg-backgroundLight p-4 text-fontLight
      dark:bg-backgroundDark dark:text-fontDark md:p-6"
  >
    <div
      className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg
        dark:bg-neutral-layout dark:text-gray-200"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Update Password
      </h2>
      <div className="flex items-center justify-center">
        <UpdatePasswordForm />
      </div>
    </div>
  </div>
);

export default UpdatePasswordPage;
