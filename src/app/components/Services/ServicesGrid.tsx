import type { Service } from '../../../types';
import { CardDetailService } from './CardServiceDetail';

interface ServicesGridProps {
  services: Service[];
}

export const ServicesGrid = ({ services }: ServicesGridProps) => {
  return (
    <div className="container">
      {services.map((serv) => (
        <CardDetailService
          key={serv.id}
          id={serv.id}
          serviceName={serv.serviceName}
          price={serv.price}
        />
      ))}
    </div>
  );
};
