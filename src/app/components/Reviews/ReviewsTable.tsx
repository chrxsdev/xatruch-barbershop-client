import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../';
import { Actions } from './ReviewActions';

interface ReviewTableRow {
  id: string;
  title: string;
  review: string;
  isApproved: boolean;
}

const columns: ColumnDef<ReviewTableRow, any>[] = [
  {
    header: 'Título',
    accessorKey: 'title',
  },
  {
    header: 'Review',
    accessorKey: 'review',
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
    cell: (props) => {
      const { isApproved } = props.row.original;
      const actionsRows = {
        id: props.getValue(),
        isApproved,
      };
      return <Actions values={actionsRows} />;
    },
  },
];

interface ReviewsTableProps {
  data: ReviewTableRow[];
}

export const ReviewsTable = ({ data }: ReviewsTableProps) => {
  return <Table data={data} columns={columns} filterBy={'Título, review...'} />;
};
