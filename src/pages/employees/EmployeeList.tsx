import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import employeesData from "./employeesData.json";
import DynamicTable from "../../components/table/DynamicTable";
import type {
  DynamicTableAction,
  DynamicTableColumn,
} from "../../components/table/DynamicTable";

type Employee = (typeof employeesData.employees)[number];
type DeletedEmployee = (typeof employeesData.deletedEmployees)[number];

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(employeesData.employees);
  const [deletedEmployees, setDeletedEmployees] = useState(employeesData.deletedEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showRecycleBin, setShowRecycleBin] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Get unique departments
  const departments = useMemo(() => {
    const depts = [...new Set(employees.map(emp => emp.department))];
    return depts.sort();
  }, [employees]);

  // Filter and search logic
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [employees, searchTerm, filterStatus, filterDepartment]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterDepartment, itemsPerPage]);

  // Actions
  const handleToggleStatus = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id 
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const empToDelete = employees.find(emp => emp.id === id);
      if (empToDelete) {
        setDeletedEmployees([...deletedEmployees, { ...empToDelete, status: 'deleted', deletedDate: new Date().toISOString().split('T')[0] }]);
        setEmployees(employees.filter(emp => emp.id !== id));
      }
    }
  };

  const handleRestore = (id: string) => {
    const empToRestore = deletedEmployees.find(emp => emp.id === id);
    if (empToRestore) {
      const restoredEmployee = {
        id: empToRestore.id!,
        name: empToRestore.name!,
        email: empToRestore.email!,
        phone: empToRestore.phone!,
        department: empToRestore.department!,
        position: empToRestore.position!,
        joinDate: empToRestore.joinDate!,
        status: 'active' as const,
        avatar: empToRestore.avatar!,
        salary: empToRestore.salary!,
        manager: empToRestore.manager!,
        location: empToRestore.location!,
      };
      setEmployees([...employees, restoredEmployee]);
      setDeletedEmployees(deletedEmployees.filter(emp => emp.id !== id));
    }
  };

  const handlePermanentDelete = (id: string) => {
    if (window.confirm('Permanently delete this employee? This cannot be undone.')) {
      setDeletedEmployees(deletedEmployees.filter(emp => emp.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedEmployees.length === 0) return;
    if (window.confirm(`Delete ${selectedEmployees.length} selected employees?`)) {
      const empsToDelete = employees.filter(emp => selectedEmployees.includes(emp.id));
      setDeletedEmployees([...deletedEmployees, ...empsToDelete.map(emp => ({ ...emp, status: 'deleted', deletedDate: new Date().toISOString().split('T')[0] }))]);
      setEmployees(employees.filter(emp => !selectedEmployees.includes(emp.id)));
      setSelectedEmployees([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === currentEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(currentEmployees.map(emp => emp.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const employeeColumns: DynamicTableColumn<Employee>[] = [
    {
      id: "employee",
      header: "Employee",
      render: (employee) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            {employee.avatar}
          </div>
          <div>
            <div className="font-bold text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.email}</div>
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
          {employee.department}
        </span>
      ),
    },
    {
      id: "position",
      header: "Position",
      render: (employee) => (
        <div className="font-semibold text-gray-800">{employee.position}</div>
      ),
    },
    {
      id: "joinDate",
      header: "Join Date",
      render: (employee) => (
        <div className="text-sm text-gray-600 font-medium">{employee.joinDate}</div>
      ),
    },
    {
      id: "status",
      header: "Status",
      render: (employee) => (
        <>
          <button
            onClick={() => handleToggleStatus(employee.id)}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
              employee.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                employee.status === 'active' ? 'translate-x-9' : 'translate-x-1'
              }`}
            />
          </button>
          <div className="text-xs font-bold mt-1">
            {employee.status === 'active' ? (
              <span className="text-emerald-600">ACTIVE</span>
            ) : (
              <span className="text-gray-500">INACTIVE</span>
            )}
          </div>
        </>
      ),
    },
  ];

  const employeeActions: DynamicTableAction<Employee>[] = [
    {
      id: "view",
      title: "View Details",
      onClick: (employee) =>
        navigate(`/employees/view/${employee.id}`, {
          state: { employee },
        }),
      className: "p-2 hover:bg-blue-50 rounded-lg transition-colors group",
      icon: (
        <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: "edit",
      title: "Edit Employee",
      onClick: () => {},
      className: "p-2 hover:bg-amber-50 rounded-lg transition-colors group",
      icon: (
        <svg className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      id: "delete",
      title: "Delete Employee",
      onClick: (employee) => handleDelete(employee.id),
      className: "p-2 hover:bg-rose-50 rounded-lg transition-colors group",
      icon: (
        <svg className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      id: "more",
      title: "More Options",
      onClick: () => {},
      className: "p-2 hover:bg-purple-50 rounded-lg transition-colors group",
      icon: (
        <svg className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      ),
    },
  ];

  const recycleColumns: DynamicTableColumn<DeletedEmployee>[] = [
    {
      id: "employee",
      header: "Employee",
      render: (employee) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold shadow-md opacity-50">
            {employee.avatar}
          </div>
          <div>
            <div className="font-bold text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.email}</div>
            <div className="text-xs text-gray-400 font-semibold">{employee.id}</div>
          </div>
        </div>
      ),
    },
    {
      id: "department",
      header: "Department",
      render: (employee) => (
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold">
          {employee.department}
        </span>
      ),
    },
    {
      id: "position",
      header: "Position",
      render: (employee) => (
        <div className="font-semibold text-gray-600">{employee.position}</div>
      ),
    },
    {
      id: "deletedDate",
      header: "Deleted Date",
      render: (employee) => (
        <div className="text-sm text-gray-600 font-medium">{employee.deletedDate}</div>
      ),
    },
  ];

  const recycleActions: DynamicTableAction<DeletedEmployee>[] = [
    {
      id: "restore",
      onClick: (employee) => handleRestore(employee.id),
      className: "px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-bold hover:shadow-lg transition-all text-sm",
      label: "↺ Restore",
    },
    {
      id: "deleteForever",
      onClick: (employee) => handlePermanentDelete(employee.id),
      className: "px-4 py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-lg font-bold hover:shadow-lg transition-all text-sm",
      label: "✕ Delete Forever",
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                {showRecycleBin ? '🗑️ Recycle Bin' : '👥 Employee Management'}
              </h1>
              <p className="text-gray-600 text-lg">
                {showRecycleBin 
                  ? `${deletedEmployees.length} deleted employees`
                  : `Manage your team of ${employees.length} employees`
                }
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRecycleBin(!showRecycleBin)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                  showRecycleBin
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {showRecycleBin ? '← Back to Employees' : '🗑️ Recycle Bin'}
              </button>
              {!showRecycleBin && (
                <button
                  onClick={() => navigate("/employees/addemployee")}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  + Add New Employee
                </button>
              )}
            </div>
          </div>

          {!showRecycleBin && (
            <>
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by name, email, ID, department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" bg-white w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="text-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-semibold bg-white"
                    >
                      <option value="all">📊 All Status</option>
                      <option value="active">✅ Active</option>
                      <option value="inactive">❌ Inactive</option>
                    </select>
                  </div>

                  {/* Department Filter */}
                  <div>
                    <select
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="text-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-semibold bg-white"
                    >
                      <option value="all">🏢 All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
                  <div className="text-sm font-bold text-blue-700 mb-2">Total Employees</div>
                  <div className="text-4xl font-black text-blue-900">{employees.length}</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-200">
                  <div className="text-sm font-bold text-emerald-700 mb-2">Active</div>
                  <div className="text-4xl font-black text-emerald-900">
                    {employees.filter(e => e.status === 'active').length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200">
                  <div className="text-sm font-bold text-amber-700 mb-2">Inactive</div>
                  <div className="text-4xl font-black text-amber-900">
                    {employees.filter(e => e.status === 'inactive').length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-5 border-2 border-rose-200">
                  <div className="text-sm font-bold text-rose-700 mb-2">Deleted</div>
                  <div className="text-4xl font-black text-rose-900">{deletedEmployees.length}</div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedEmployees.length > 0 && (
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-lg">
                  <div className="text-white font-bold">
                    {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''} selected
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBulkDelete}
                      className="px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-bold transition-all"
                    >
                      🗑️ Delete Selected
                    </button>
                    <button
                      onClick={() => setSelectedEmployees([])}
                      className="px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-bold transition-all"
                    >
                      ✕ Clear
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Employee Table / Recycle Bin */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {!showRecycleBin ? (
            // Main Employee Table
            <>
              <DynamicTable
                columns={employeeColumns}
                data={currentEmployees}
                rowKey={(employee) => employee.id}
                actions={employeeActions}
                selectable
                selectedRowIds={selectedEmployees}
                onToggleSelectAll={toggleSelectAll}
                onToggleRow={toggleSelect}
                emptyState={
                  filteredEmployees.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🔍</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">No employees found</div>
                      <div className="text-gray-600">Try adjusting your search or filters</div>
                    </div>
                  ) : null
                }
              />
            </>
          ) : (
            // Recycle Bin Table
            <>
              {deletedEmployees.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">✨</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">Recycle bin is empty</div>
                  <div className="text-gray-600">Deleted employees will appear here</div>
                </div>
              ) : (
                <DynamicTable
                  columns={recycleColumns}
                  data={deletedEmployees}
                  rowKey={(employee) => employee.id}
                  actions={recycleActions}
                />
              )}
            </>
          )}

          {/* Pagination */}
          {!showRecycleBin && filteredEmployees.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 font-medium">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} employees
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
                  >
                    ««
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
                  >
                    ‹ Prev
                  </button>
                  
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                : 'border-2 border-gray-300 hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2 py-2 text-gray-400 font-bold">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
                  >
                    Next ›
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
                  >
                    »»
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
