import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../components/table/DynamicTable";
import type {
  DynamicTableAction,
  DynamicTableColumn,
} from "../../components/table/DynamicTable";
import { employeeService, type EmployeeRecord } from "../../services/employee.service";

type PageMeta = {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
};

const getAvatarLabel = (employee: EmployeeRecord) => {
  if (employee.avatar && employee.avatar.trim()) return employee.avatar;
  if (!employee.name) return "--";

  const parts = employee.name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const EmployeePageHeader = ({
  totalEmployees,
  onAddEmployee,
}: {
  totalEmployees: number;
  onAddEmployee: () => void;
}) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">👥 Employee Management</h1>
        <p className="text-gray-600 text-lg">
          Manage your team of {totalEmployees} employees
        </p>
      </div>
      <button
        onClick={onAddEmployee}
        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
      >
        + Add New Employee
      </button>
    </div>
  </div>
);

const EmployeeSearchBar = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, ID, department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className=" bg-white w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        </div>
      </div>
    </div>
  </div>
);

const EmployeeStats = ({ employees }: { employees: EmployeeRecord[] }) => {
  const activeCount = employees.filter((employee) => employee.status === "active").length;
  const inactiveCount = employees.filter((employee) => employee.status === "inactive").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
        <div className="text-sm font-bold text-blue-700 mb-2">Employees (Current Page)</div>
        <div className="text-4xl font-black text-blue-900">{employees.length}</div>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-200">
        <div className="text-sm font-bold text-emerald-700 mb-2">Active</div>
        <div className="text-4xl font-black text-emerald-900">{activeCount}</div>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200">
        <div className="text-sm font-bold text-amber-700 mb-2">Inactive</div>
        <div className="text-4xl font-black text-amber-900">{inactiveCount}</div>
      </div>
    </div>
  );
};

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
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
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
  </div>
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

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await employeeService.getEmployees({
          page: Math.max(currentPage - 1, 0),
          size: itemsPerPage,
          search: searchTerm,
        });
        if (!isMounted) return;
        setEmployees(response.content ?? []);
        setPageMeta({
          totalPages: response.totalPages ?? 0,
          totalElements: response.totalElements ?? 0,
          pageNumber: response.number ?? 0,
          pageSize: response.size ?? itemsPerPage,
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load employees");
        setEmployees([]);
        setPageMeta({
          totalPages: 0,
          totalElements: 0,
          pageNumber: 0,
          pageSize: itemsPerPage,
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, [currentPage, itemsPerPage, searchTerm]);

  const employeeColumns: DynamicTableColumn<EmployeeRecord>[] = useMemo(
    () => [
      {
        id: "employee",
        header: "Employee",
        render: (employee) => (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              {getAvatarLabel(employee)}
            </div>
            <div>
              <div className="font-bold text-gray-900">{employee.name ?? "--"}</div>
              <div className="text-sm text-gray-500">{employee.email ?? "--"}</div>
              <div className="text-xs text-gray-400 font-semibold">{employee.id}</div>
            </div>
          </div>
        ),
      },
      {
        id: "department",
        header: "Department",
        render: (employee) => (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
            {employee.department ?? "--"}
          </span>
        ),
      },
      {
        id: "position",
        header: "Position",
        render: (employee) => (
          <div className="font-semibold text-gray-800">{employee.position ?? "--"}</div>
        ),
      },
      {
        id: "joinDate",
        header: "Join Date",
        render: (employee) => (
          <div className="text-sm text-gray-600 font-medium">{employee.joinDate ?? "--"}</div>
        ),
      },
      {
        id: "status",
        header: "Status",
        render: (employee) => (
          <div className="text-xs font-bold">
            {employee.status === "active" ? (
              <span className="text-emerald-600">ACTIVE</span>
            ) : employee.status === "inactive" ? (
              <span className="text-gray-500">INACTIVE</span>
            ) : (
              <span className="text-gray-500">{String(employee.status ?? "--").toUpperCase()}</span>
            )}
          </div>
        ),
      },
    ],
    [],
  );

  const employeeActions: DynamicTableAction<EmployeeRecord>[] = [
    {
      id: "view",
      title: "View Details",
      onClick: (employee) =>
        navigate(`/employees/view/${employee.id}`, {
          state: { employee },
        }),
      className: "p-2 hover:bg-blue-50 rounded-lg transition-colors group",
      icon: (
        <svg
          className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      id: "edit",
      title: "Edit Employee",
      onClick: () => {},
      className: "p-2 hover:bg-amber-50 rounded-lg transition-colors group",
      icon: (
        <svg
          className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        <EmployeePageHeader
          totalEmployees={pageMeta.totalElements}
          onAddEmployee={() => navigate("/employees/addemployee")}
        />

        <EmployeeSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <EmployeeStats employees={employees} />

        <EmployeeTable
          data={employees}
          columns={employeeColumns}
          actions={employeeActions}
          isLoading={isLoading}
          error={error}
        />

        <EmployeePagination
          pageMeta={pageMeta}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
