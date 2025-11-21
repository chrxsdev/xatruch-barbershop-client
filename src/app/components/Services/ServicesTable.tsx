import { ColumnDef } from '@tanstack/react-table';
import type { Service } from '../../../types';
import { Table } from '..';
import { Actions } from './ServicesActions';

const columns: ColumnDef<Service, any>[] = [
  {
    header: 'Servicio',
    accessorKey: 'serviceName',
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    cell: (props) => props.getValue().toFixed(2),
  },
  {
    header: '',
    accessorKey: 'id',
    cell: (props) => <Actions values={props.getValue()} />,
  },
];

interface ServicesTableProps {
  data: Service[];
}

export const ServicesTable = ({ data }: ServicesTableProps) => {
  return <Table data={data} columns={columns} filterBy={'Nombre del Servicio, precio...'} />;
};
