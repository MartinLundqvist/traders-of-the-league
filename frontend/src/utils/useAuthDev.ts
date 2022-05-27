import { useMemo } from 'react';

export const useAuthDev = () => {
  const user = useMemo(
    () => ({
      email: 'person2@mock.now',
    }),
    []
  );

  const isAuthenticated = useMemo(() => true, []);

  return {
    user,
    isAuthenticated,
  };
};
