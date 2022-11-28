import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
const AUDIENCE = import.meta.env.VITE_AUTH_AUDIENCE;

interface IAuth0CustomProviderProps {
  children: React.ReactNode;
}

const Auth0CustomProvider = ({
  children,
}: IAuth0CustomProviderProps): JSX.Element => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: AppState | undefined) => {
    console.log(appState);
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  console.log(window.location.pathname);

  return (
    <div
    // clientId={CLIENT_ID}
    // domain={DOMAIN}
    // redirectUri={window.location.origin}
    // onRedirectCallback={onRedirectCallback}
    // audience={AUDIENCE}
    // scope='write:database'
    >
      {children}
    </div>
  );
};

export default Auth0CustomProvider;
