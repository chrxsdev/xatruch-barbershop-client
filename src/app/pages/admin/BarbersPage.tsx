import { AdminLayout } from '../../layout/AdminLayout';
import { AppLayout } from '../../layout/AppLayout';
import { BarbersView } from '../../views/admin/BarbersView';

export const BarbersPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AdminLayout>
        <BarbersView />
      </AdminLayout>
    </AppLayout>
  );
};
