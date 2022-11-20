import { createContext, useContext, useState } from 'react';
import { TRoutes } from '../pages';

interface INavigationContext {
  activeRoute: TRoutes;
  setActiveRoute: (route: TRoutes) => void;
}

const NavigationContext = createContext({} as INavigationContext);

export const useNavigation = () => useContext(NavigationContext);

const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [activeRoute, setActiveRoute] = useState<TRoutes>('main');

  return (
    <NavigationContext.Provider value={{ activeRoute, setActiveRoute }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
