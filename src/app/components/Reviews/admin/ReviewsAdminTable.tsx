import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../Table';
import { ActionAdmin } from './ActionAdmin';

interface ReviewAdminTableRow {
  id: string;
  title: string;
  review: string;
  user: {
    fullName: string;
  };
  isApproved: boolean;
}

const columns: ColumnDef<ReviewAdminTableRow, any>[] = [
  {
    header: 'Título',
    accessorKey: 'title',
  },
  {
    header: 'Review',
    accessorKey: 'review',
  },
  {
    header: 'Usuario',
    accessorKey: 'user',
    cell: (props) => props.getValue().fullName,
  },
  {
    header: 'Estatus',
    accessorKey: 'isApproved',
    cell: (props) =>
      props.getValue() ? (
        <span className="badge badge-success">Publicada</span>
      ) : (
        <span className="badge badge-danger">No aprobada</span>
      ),
  },
  {
    header: '',
    accessorKey: 'id',
    cell: (props) => <ActionAdmin values={props.getValue()} />,
  },
];

interface ReviewsAdminTableProps {
  data: ReviewAdminTableRow[];
}

export const ReviewsAdminTable = ({ data }: ReviewsAdminTableProps) => {
  return <Table data={data} columns={columns} filterBy={'Título, review...'} />;
};
