import { AppLayout } from '../../layout/AppLayout';
import { PickTimeView } from '../../views/checkout/PickTimeView';

export const PickTimePage = () => {
  return (
    <AppLayout isLanding={false}>
      <PickTimeView />
    </AppLayout>
  );
};
