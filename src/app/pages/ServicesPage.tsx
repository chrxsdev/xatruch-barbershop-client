import { AppLayout } from '../layout/AppLayout';
import { ServicesView } from '../views/ServicesView';

export const ServicesPage = () => {
  return (
    <AppLayout isLanding={false}>
      <ServicesView />
    </AppLayout>
  );
};
