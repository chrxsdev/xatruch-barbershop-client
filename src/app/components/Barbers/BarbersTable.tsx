import { ColumnDef } from '@tanstack/react-table';
import type { Barber } from '../../../types';
import { Table } from '..';
import { Actions } from './BarberActions';

const columns: ColumnDef<Barber, any>[] = [
  {
    header: 'Nombre Completo',
    accessorKey: 'fullName',
  },
  {
    header: '',
    accessorKey: 'id',
    cell: (props) => <Actions values={props.getValue()} />,
  },
];

interface BarbersTableProps {
  data: Barber[];
}

export const BarbersTable = ({ data }: BarbersTableProps) => {
  return <Table data={data} columns={columns} filterBy={'Nombre Completo...'} />;
};
