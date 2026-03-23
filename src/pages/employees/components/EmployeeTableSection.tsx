import DynamicTable from "../../../components/table/DynamicTable";
import type {
  DynamicTableAction,
  DynamicTableColumn,
} from "../../../components/table/DynamicTable";
import type { EmployeeRecord } from "../../../services/employee.service";
import type { PageMeta } from "../hooks/useEmployeeList";

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

const EmployeePagination = ({
  pageMeta,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: {
  pageMeta: PageMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) => {
  if (pageMeta.totalPages <= 1) return null;

  return (
    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 font-medium">
            Showing page {currentPage} of {pageMeta.totalPages} ({pageMeta.totalElements} total)
          </span>
          <select
            value={pageMeta.pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-blue-500"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            ««
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            ‹ Prev
          </button>

          <div className="flex gap-1">
            {[...Array(pageMeta.totalPages)].map((_, idx) => {
              const page = idx + 1;
              if (
                page === 1 ||
                page === pageMeta.totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "border-2 border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 py-2 text-gray-400 font-bold">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageMeta.totalPages}
            className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            Next ›
          </button>
          <button
            onClick={() => onPageChange(pageMeta.totalPages)}
            disabled={currentPage === pageMeta.totalPages}
            className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            »»
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <EmployeePagination
      pageMeta={pageMeta}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  </div>
);
