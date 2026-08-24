import ButtonComponent from '@components/UI/Button';
import { useAppDispatch } from '@app/hooks';
import { setSuccess } from '@features/UI/themeToggleSlice';
import {
  useCreateRoleInvitationMutation,
  useGetGuideApplicationsQuery,
  useUpdateUserRoleMutation,
} from '@features/users/userApi';
import {
  useGetRejectionRequestsQuery,
  useReviewRejectionRequestMutation,
} from '@features/bookings/bookingApi';
import { FormEvent, useState } from 'react';
import { User } from 'types/tourTypes';

type InvitableRole = Extract<User['role'], 'guide' | 'lead-guide'>;

const RoleManagement = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data: applications = [], isLoading, error } = useGetGuideApplicationsQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [createInvitation, { isLoading: isInviting }] = useCreateRoleInvitationMutation();
  const { data: rejectionRequests = [], isLoading: isLoadingRequests } = useGetRejectionRequestsQuery();
  const [reviewRequest, { isLoading: isReviewingRequest }] = useReviewRejectionRequestMutation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<InvitableRole>('guide');
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState<string>();
  const [message, setMessage] = useState<string>();

  const approve = async (user: User, selectedRole: InvitableRole): Promise<void> => {
    try {
      setMessage(undefined);
      await updateRole({ id: user._id, role: selectedRole, applicationStatus: 'approved' }).unwrap();
      dispatch(setSuccess({ isSuccess: true, successMessage: `${user.name} is now a ${selectedRole}.` }));
    } catch (requestError) {
      const apiError = requestError as { data?: { message?: string } };
      setMessage(apiError.data?.message || 'Unable to update this application.');
    }
  };

  const reject = async (user: User): Promise<void> => {
    try {
      setMessage(undefined);
      await updateRole({ id: user._id, role: 'user', applicationStatus: 'rejected' }).unwrap();
      dispatch(setSuccess({ isSuccess: true, successMessage: `${user.name}'s application was declined.` }));
    } catch (requestError) {
      const apiError = requestError as { data?: { message?: string } };
      setMessage(apiError.data?.message || 'Unable to update this application.');
    }
  };

  const invite = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setMessage(undefined);
      const result = await createInvitation({ email, role }).unwrap();
      setInvitationUrl(result.signupUrl);
      setEmail('');
      dispatch(setSuccess({ isSuccess: true, successMessage: 'Invitation created successfully.' }));
    } catch (requestError) {
      const apiError = requestError as { data?: { message?: string } };
      setMessage(apiError.data?.message || 'Unable to create the invitation.');
    }
  };

  const decideSessionRequest = async (id: string, decision: 'approved' | 'declined'): Promise<void> => {
    try {
      setMessage(undefined);
      await reviewRequest({ id, decision }).unwrap();
      dispatch(setSuccess({ isSuccess: true, successMessage: decision === 'approved' ? 'The guide was released and the guest was reassigned where possible.' : 'The guide request was declined.' }));
    } catch (requestError) {
      const apiError = requestError as { data?: { message?: string } };
      setMessage(apiError.data?.message || 'Unable to review this session request.');
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-layout">
        <h1 className="text-2xl font-bold text-primary">Role management</h1>
        <p className="mt-2 text-sm">Invite guides directly or review applications from existing users.</p>
        <form onSubmit={invite} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="guide@example.com"
            className="h-11 min-w-0 flex-1 rounded-lg border border-gray-300 px-3 dark:border-gray-600 dark:bg-backgroundDark"
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleMenuOpen((isOpen) => !isOpen)}
              aria-haspopup="menu"
              aria-expanded={isRoleMenuOpen}
              className="flex h-11 w-full min-w-36 items-center justify-between rounded-lg border border-gray-300 px-4 text-left text-sm text-gray-700 dark:border-gray-600 dark:bg-backgroundDark dark:text-gray-200"
            >
              {role === 'guide' ? 'Guide' : 'Lead guide'}
              <span
                className="mb-1 ml-6 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-current"
                aria-hidden="true"
              />
            </button>
            {isRoleMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-10 mt-2 w-48 transform rounded-lg bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-neutral-dark"
              >
                {(['guide', 'lead-guide'] as InvitableRole[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setRole(option);
                      setIsRoleMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                  >
                    {option === 'guide' ? 'Guide' : 'Lead guide'}
                  </button>
                ))}
              </div>
            )}
          </div>
          <ButtonComponent
            type="submit"
            disabled={isInviting}
            className="h-11 bg-primary text-white"
          >
            {isInviting ? 'Creating…' : 'Create invitation'}
          </ButtonComponent>
        </form>
        {invitationUrl && (
          <div className="mt-4 rounded-md bg-primary/10 p-3 text-sm">
            <p className="font-semibold">Share this one-time signup link securely:</p>
            <a className="break-all text-primary underline" href={invitationUrl}>{invitationUrl}</a>
          </div>
        )}
      </section>

      <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-layout">
        <h2 className="text-xl font-bold text-primary">Guide session rejection requests</h2>
        <p className="mt-2 text-sm">Approving a request releases the guide, assigns another eligible guide where available, and only cancels when no replacement exists.</p>
        {isLoadingRequests ? <p className="mt-4">Loading session requests…</p> : null}
        {!isLoadingRequests && rejectionRequests.length === 0 ? <p className="mt-4 text-sm">There are no pending session requests.</p> : null}
        <div className="mt-4 space-y-4">
          {rejectionRequests.map((booking) => (
            <article key={booking._id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-semibold">{booking.tour.name}</p>
              <p className="mt-1 text-sm text-gray-500">Guide: {booking.assignedGuide.name} · Guest: {booking.user?.name || 'Guest'}</p>
              <p className="mt-3 rounded-md bg-gray-100 p-3 text-sm dark:bg-neutral-dark">{booking.guideRejectionRequest?.reason}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonComponent type="button" disabled={isReviewingRequest} onClick={() => decideSessionRequest(booking._id, 'approved')} className="bg-primary text-white">Approve & reassign</ButtonComponent>
                <ButtonComponent type="button" disabled={isReviewingRequest} onClick={() => decideSessionRequest(booking._id, 'declined')} variant="outline">Keep assignment</ButtonComponent>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-layout">
        <h2 className="text-xl font-bold text-primary">Pending guide applications</h2>
        {message && <p className="mt-3 text-sm text-red-500">{message}</p>}
        {isLoading ? <p className="mt-4">Loading applications…</p> : null}
        {error ? <p className="mt-4 text-red-500">Unable to load applications.</p> : null}
        {!isLoading && !error && applications.length === 0 ? (
          <p className="mt-4 text-sm">There are no pending applications.</p>
        ) : null}
        <div className="mt-4 space-y-4">
          {applications.map((application) => (
            <article key={application._id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-semibold">{application.name}</p>
              <p className="text-sm text-gray-500">{application.email}</p>
              {application.guideApplicationMessage && (
                <p className="mt-3 text-sm">{application.guideApplicationMessage}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonComponent type="button" disabled={isUpdating} onClick={() => approve(application, 'guide')} className="bg-primary text-white">
                  Approve as guide
                </ButtonComponent>
                <ButtonComponent type="button" disabled={isUpdating} onClick={() => approve(application, 'lead-guide')} className="bg-primary text-white">
                  Approve as lead guide
                </ButtonComponent>
                <ButtonComponent type="button" disabled={isUpdating} onClick={() => reject(application)} variant="outline" className="border-red-500 text-red-600">
                  Decline
                </ButtonComponent>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RoleManagement;
