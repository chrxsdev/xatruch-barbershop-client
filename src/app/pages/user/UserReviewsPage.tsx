import { AccountLayout } from '../../layout/AccountLayout';
import { AppLayout } from '../../layout/AppLayout';
import { UserReviewsView } from '../../views/user';

export const UserReviewsPage = () => {
  return (
    <AppLayout isLanding={false}>
      <AccountLayout>
        <UserReviewsView />
      </AccountLayout>
    </AppLayout>
  );
};
