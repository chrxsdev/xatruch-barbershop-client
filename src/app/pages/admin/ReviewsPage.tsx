import { AdminLayout } from '../../layout/AdminLayout';
import { AppLayout } from '../../layout/AppLayout';
import { ReviewsAdminView } from '../../views/admin/ReviewsAdminView';

export const ReviewsPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AdminLayout>
        <ReviewsAdminView />
      </AdminLayout>
    </AppLayout>
  );
};
