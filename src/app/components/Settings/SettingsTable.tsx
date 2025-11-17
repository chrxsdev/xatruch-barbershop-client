import { ColumnDef } from '@tanstack/react-table';
import type { Setting } from '../../../types';
import { Actions, Table } from '..';
import { formatTime } from '../../../helpers';

const columns: ColumnDef<Setting, any>[] = [
  {
    header: 'Hora Inicio',
    accessorKey: 'startDailyAvailability',
    cell: (props) => formatTime(props.getValue()),
  },
  {
    header: 'Hora Final',
    accessorKey: 'endDailyAvailability',
    cell: (props) => formatTime(props.getValue()),
  },
  {
    header: 'Estatus',
    accessorKey: 'isActive',
    cell: (props) =>
      props.getValue() ? (
        <span className="badge badge-success">Activo</span>
      ) : (
        <span className="badge badge-danger">Inactivo</span>
      ),
  },
  {
    header: '',
    accessorKey: 'id',
    cell: (props) => <Actions values={props.getValue()} />,
  },
];

interface SettingsTableProps {
  data: Setting[];
}

export const SettingsTable = ({ data }: SettingsTableProps) => {
  return <Table data={data} columns={columns} filterBy={'Hora de Inicio, Salida...'} />;
};
