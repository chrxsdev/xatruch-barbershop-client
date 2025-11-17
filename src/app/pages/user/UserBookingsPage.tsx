import { AccountLayout } from '../../layout/AccountLayout';
import { AppLayout } from '../../layout/AppLayout';
import { UserBookingsView } from '../../views/user';

export const UserBookingsPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AccountLayout>
        <UserBookingsView />
      </AccountLayout>
    </AppLayout>
  );
};
