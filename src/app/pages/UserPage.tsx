import { AppLayout } from '../layout/AppLayout';
import { AccountLayout } from '../layout/AccountLayout';
import { ProfileView } from '../views/ProfileView';

export const UserPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AccountLayout>
        <ProfileView />
      </AccountLayout>
    </AppLayout>
  );
};
