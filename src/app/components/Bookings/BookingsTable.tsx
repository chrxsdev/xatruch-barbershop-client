import { ColumnDef } from '@tanstack/react-table';
import { formatTime } from '../../../helpers';
import { Table } from '../Table';
import { Actions } from './BookingActions';

interface BookingTableRow {
  id: string;
  bookingDate: string;
  bookingTime: string;
  barber: string;
  user: string;
}

const columns: ColumnDef<BookingTableRow, any>[] = [
  {
    header: '# Sesión',
    accessorKey: 'id',
  },
  {
    header: 'Fecha de Sesión',
    accessorKey: 'bookingDate',
  },
  {
    header: 'Hora de Sesión',
    accessorKey: 'bookingTime',
    cell: (props) => formatTime(props.getValue()),
  },
  {
    header: 'Barbero',
    accessorKey: 'barber',
  },
  {
    header: '',
    accessorKey: 'user',
    cell: (props) => {
      const { id } = props.row.original;
      return <Actions values={id} />;
    },
  },
];

interface BookingsTableProps {
  data: BookingTableRow[];
}

export const BookingsTable = ({ data }: BookingsTableProps) => {
  return <Table data={data} columns={columns} filterBy={'Barbero, Sesión...'} />;
};
