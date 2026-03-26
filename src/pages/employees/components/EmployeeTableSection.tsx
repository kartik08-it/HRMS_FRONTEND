import DynamicTable from "../../../components/table/DynamicTable";
import type {
  DynamicTableAction,
  DynamicTableColumn,
} from "../../../components/table/DynamicTable";
import type { EmployeeRecord } from "../../../services/employee.service";
import type { PageMeta } from "../hooks/useEmployeeList";
import TablePagination from "../../../components/table/TablePagination";

const EmployeeTable = ({
  data,
  columns,
  actions,
  isLoading,
  error,
}: {
  data: EmployeeRecord[];
  columns: DynamicTableColumn<EmployeeRecord>[];
  actions: DynamicTableAction<EmployeeRecord>[];
  isLoading: boolean;
  error: string | null;
}) => (
  <>
    {error && (
      <div className="px-6 py-4 bg-rose-50 text-rose-700 font-semibold border-b border-rose-100">
        {error}
      </div>
    )}
    {isLoading ? (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⏳</div>
        <div className="text-2xl font-bold text-gray-900 mb-2">Loading employees...</div>
        <div className="text-gray-600">Please wait a moment</div>
      </div>
    ) : (
      <DynamicTable
        columns={columns}
        data={data}
        rowKey={(employee) => employee.id}
        actions={actions}
        emptyState={
          data.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">No employees found</div>
              <div className="text-gray-600">Try adjusting your search</div>
            </div>
          ) : null
        }
      />
    )}
  </>
);

export const EmployeeTableSection = ({
  data,
  columns,
  actions,
  isLoading,
  error,
  pageMeta,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: {
  data: EmployeeRecord[];
  columns: DynamicTableColumn<EmployeeRecord>[];
  actions: DynamicTableAction<EmployeeRecord>[];
  isLoading: boolean;
  error: string | null;
  pageMeta: PageMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) => (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
    <EmployeeTable
      data={data}
      columns={columns}
      actions={actions}
      isLoading={isLoading}
      error={error}
    />
    <TablePagination
      totalPages={pageMeta.totalPages}
      totalElements={pageMeta.totalElements}
      pageSize={pageMeta.pageSize}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  </div>
);
