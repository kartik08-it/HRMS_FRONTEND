import React from 'react';

export type DynamicTableColumn<T> = {
  id: string;
  header: React.ReactNode;
  render: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type DynamicTableAction<T> = {
  id: string;
  title?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  className?: string;
};

type DynamicTableProps<T> = {
  columns: DynamicTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  actions?: DynamicTableAction<T>[];
  actionsHeader?: React.ReactNode;
  selectable?: boolean;
  selectedRowIds?: string[];
  onToggleSelectAll?: () => void;
  onToggleRow?: (id: string) => void;
  emptyState?: React.ReactNode;
};

export default function DynamicTable<T>({
  columns,
  data,
  rowKey,
  actions = [],
  actionsHeader = 'Actions',
  selectable = false,
  selectedRowIds = [],
  onToggleSelectAll,
  onToggleRow,
  emptyState,
}: DynamicTableProps<T>) {
  const isAllSelected = data.length > 0 && selectedRowIds.length === data.length;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-gray-50 border-b-2 border-gray-200">
            <tr>
              {selectable && (
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-6 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider ${column.headerClassName ?? ''}`}
                >
                  {column.header}
                </th>
              ))}

              {actions.length > 0 && (
                <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider">
                  {actionsHeader}
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((row) => {
              const id = rowKey(row);

              return (
                <tr key={id} className="hover:bg-gray-50 transition-colors">
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRowIds.includes(id)}
                        onChange={() => onToggleRow?.(id)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td key={column.id} className={`px-6 py-4 ${column.cellClassName ?? ''}`}>
                      {column.render(row)}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {actions.map((action) => (
                          <button
                            key={action.id}
                            type="button"
                            onClick={() => action.onClick(row)}
                            className={action.className ?? 'p-2 rounded-lg transition-colors'}
                            title={action.title}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length === 0 && emptyState}
    </>
  );
}
