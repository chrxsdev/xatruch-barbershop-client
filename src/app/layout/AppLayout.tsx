import { NavBar } from '../../ui/components/NavBar';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  isLanding?: boolean;
}

export const AppLayout = ({ children, isLanding = true }: AppLayoutProps) => {
  return (
    <>
      <NavBar isLanding={isLanding} />
      {children}
    </>
  );
};
