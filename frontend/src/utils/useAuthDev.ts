import { useMemo } from 'react';

export const useAuthDev = () => {
  const user = useMemo(
    () => ({
      email: window.localStorage.getItem('traders_test_email'),
      email_verified: true,
    }),
    []
  );

  const isAuthenticated = useMemo(() => true, []);

  return {
    user,
    isAuthenticated,
  };
};
