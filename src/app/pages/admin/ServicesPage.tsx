import { AdminLayout } from '../../layout/AdminLayout';
import { AppLayout } from '../../layout/AppLayout';
import { ServicesManagementView } from '../../views/admin';

export const ServicesPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AdminLayout>
        <ServicesManagementView />
      </AdminLayout>
    </AppLayout>
  );
};
