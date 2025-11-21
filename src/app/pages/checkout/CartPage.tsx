import { AppLayout } from '../../layout/AppLayout';
import { CartView } from '../../views/checkout/CartView';

export const CartPage = () => {
  return (
    <AppLayout isLanding={false}>
      <CartView />
    </AppLayout>
  );
};
