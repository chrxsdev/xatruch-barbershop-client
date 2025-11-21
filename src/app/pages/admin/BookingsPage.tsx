import { AdminLayout } from '../../layout/AdminLayout';
import { AppLayout } from '../../layout/AppLayout';
import { UserBookingsView } from '../../views/user/UserBookingsView';

export const BookingsPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AdminLayout>
        <UserBookingsView adminView={true} />
      </AdminLayout>
    </AppLayout>
  );
};
