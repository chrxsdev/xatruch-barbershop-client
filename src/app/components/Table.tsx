import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  filterBy: string;
}

export const Table = <T,>({ data, columns, filterBy }: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const onNextPage = () => {
    if (!table.getCanNextPage()) return;
    table.nextPage();
  };

  return (
    <>
      <div className="row justify-content-end mb-4">
        <div className="col-4">
          <label htmlFor="search" className="form-label">
            <FontAwesomeIcon icon={faSearch} />
            &nbsp;Filtrar:
          </label>
          <input
            id="search"
            className="form-control me-2"
            type="search"
            autoComplete="new-password"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder={filterBy}
          />
        </div>
      </div>
      <table className="table table-striped w-100">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  scope="col"
                  key={header.id}
                >
                  <b>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </b>
                  {header.column.getIsSorted() === 'asc' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {header.column.getIsSorted() === 'desc' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul className="pagination justify-content-center">
          <li className="page-item text-primary">
            <button
              onClick={() => table.setPageIndex(0)}
              className="page-link text-primary"
            >
              &laquo;
            </button>
          </li>
          <li className="page-item text-primary">
            <button onClick={() => table.previousPage()} className="page-link">
              Anterior
            </button>
          </li>
          <li className="page-item text-primary">
            <button onClick={onNextPage} className="page-link">
              Siguiente
            </button>
          </li>
          <li className="page-item text-primary">
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              className="page-link text-primary"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
