export const tags = ['User', 'Tours', 'Reviews', 'Auth', 'Bookings'];

const localServiceUrl = 'http://localhost:5001/api/v1';
const deployedServiceUrl = 'https://tourvesta-services.vercel.app/api/v1';

// Vite exposes DEV only while running `npm run dev`; a production build keeps
// using the deployed API without a manual source change. Set VITE_API_BASE_URL
// in an environment file only when a different API target is needed.
export const SERVICE_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? localServiceUrl : deployedServiceUrl);

export const TOURS = '/tours';

export const USERS = '/users';

export const REVIEWS = '/reviews';

export const LOGIN = '/login';

export const AUTH = '/auth';

export const BOOKINGS = '/bookings';
