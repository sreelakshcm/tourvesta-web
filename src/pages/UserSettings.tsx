import React, { useState } from 'react';
import Settings from '@features/users/settings/Settings';
import { Cancel02Icon, Menu02Icon } from 'hugeicons-react';
import Reviews from '@features/users/settings/Reviews';

const UserSettingsPage: React.FC = () => {
  const sections = ['settings', 'bookings', 'reviews', 'billing'];
  const [currentSection, setCurrentSection] = useState<
    'settings' | 'bookings' | 'reviews' | 'billing'
  >('settings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const renderBookingsSection = (): JSX.Element => (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-backgroundDark dark:text-fontDark">
      <h2 className="mb-4 text-xl font-semibold">My Bookings</h2>
      {/* Display user's bookings here */}
    </div>
  );

  const renderBillingSection = (): JSX.Element => (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-backgroundDark dark:text-fontDark">
      <h2 className="mb-4 text-xl font-semibold">Billing Information</h2>
      {/* Display billing info here */}
    </div>
  );

  return (
    <div
      className="bg-backgroundLight text-fontLight dark:bg-backgroundDark
     dark:text-fontDark"
    >
      {/* Sidebar Toggle Button */}
      <button
        className="mb-2 ml-1 mt-4 block rounded-lg bg-primary p-2 text-white md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <Menu02Icon size={24} />
      </button>

      <div className="flex min-h-[calc(100vh-6.5rem)] gap-x-4 md:flex">
        {/* Sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-16 z-40 w-64 max-w-48 transform rounded-lg
 bg-white p-4 shadow-md transition-transform dark:bg-neutral-dark md:relative md:top-0 
 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <ul className="space-y-2">
            {isSidebarOpen && (
              <li className="flex justify-end">
                <Cancel02Icon
                  onClick={() => setIsSidebarOpen(false)}
                  className="cursor-pointer"
                />
              </li>
            )}
            {sections.map((section) => (
              <li
                key={section}
                className={`cursor-pointer rounded-lg p-2 ${
                  currentSection === section
                    ? 'bg-primary-active text-white'
                    : 'hover:bg-primary-extraLight'
                }`}
                onClick={() => {
                  setCurrentSection(
                    section as 'settings' | 'bookings' | 'reviews' | 'billing',
                  );
                  setIsSidebarOpen(false);
                }}
              >
                {section !== 'settings' && section !== 'billing'
                  ? `My ${section.charAt(0).toUpperCase() + section.slice(1)}`
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="min-h-[calc(100vh-6.5rem)] flex-1 md:ml-0">
          {currentSection === 'settings' && <Settings />}
          {currentSection === 'bookings' && renderBookingsSection()}
          {currentSection === 'reviews' && <Reviews />}
          {currentSection === 'billing' && renderBillingSection()}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
