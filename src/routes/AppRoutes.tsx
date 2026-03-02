import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeList from "../pages/employees/EmployeeList";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "../components/layout/Layout/layout";
import AttendancePage from "../pages/attendance/attendance";
import LeaveManagementPage from "../pages/leaveManagement/LeaveManagement";
import RecruitmentPage from "../pages/recruitment/Recruitment";
import PayrollPage from "../pages/payroll/Payroll";
import PerformancePage from "../pages/performance/performance";
import DepartmentsPage from "../pages/departments/Departments";
import ReportsPage from "../pages/reports/Reports";
import SettingsPage from "../pages/settings/Settings";
import CompliancePage from "../pages/compliance/Compliance";
import AddEmployeePage from "../pages/employees/addemployee/AddEmployee";
import ViewEmployeePage from "../pages/employees/viewemployee/ViewEmployee";

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("auth");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/addemployee" element={<AddEmployeePage />} />
        <Route path="/employees/view/:employeeId" element={<ViewEmployeePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<LeaveManagementPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
