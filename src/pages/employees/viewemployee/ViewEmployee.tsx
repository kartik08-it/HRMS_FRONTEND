import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { employeeService, type EmployeeRecord } from "../../../services/employee.service";

function getBloodGroup(employeeId: string) {
  const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const seed = employeeId
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return groups[seed % groups.length];
}

export default function ViewEmployeePage() {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const location = useLocation();
  const [showIdCard, setShowIdCard] = useState(false);

  const employeeFromState = (location.state as { employee?: EmployeeRecord } | null)?.employee;
  const [employee, setEmployee] = useState<EmployeeRecord | null>(employeeFromState ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (employeeFromState || !employeeId) return;

    const fetchEmployee = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await employeeService.getEmployees({
          page: 0,
          size: 10,
          search: employeeId,
        });
        if (!isMounted) return;
        const match =
          response.content.find((item) => item.id === employeeId) ?? null;
        setEmployee(match);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load employee");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEmployee();

    return () => {
      isMounted = false;
    };
  }, [employeeFromState, employeeId]);

  const profile = useMemo(() => {
    if (!employee) return null;

    const fullName = employee.name ?? "Unknown Employee";
    const [firstName, ...lastParts] = fullName.split(" ");
    const lastName = lastParts.join(" ");

    return {
      ...employee,
      name: fullName,
      email: employee.email ?? "--",
      phone: employee.phone ?? "--",
      department: employee.department ?? "--",
      position: employee.position ?? "--",
      joinDate: employee.joinDate ?? "--",
      status: (employee.status ?? "inactive") as "active" | "inactive",
      avatar: employee.avatar ?? "--",
      salary: employee.salary ?? "--",
      manager: employee.manager ?? "--",
      location: employee.location ?? "--",
      firstName,
      lastName,
      bloodGroup: getBloodGroup(employee.id),
      emergencyContact: {
        name: "Primary Contact",
        relation: "Family",
        phone: employee.phone ?? "--"
      }
    };
  }, [employee]);

  const handleExport = () => {
    if (!profile) return;
    const exportData = {
      exportedAt: new Date().toISOString(),
      employee: profile
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.id}-employee-profile.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Loading Employee</h1>
          <p className="text-gray-600 mb-6">Fetching details for {employeeId}</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Employee Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error ?? `No employee exists for ID: ${employeeId}`}
          </p>
          <button
            onClick={() => navigate("/employees")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-[1500px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/20 text-white text-3xl font-black flex items-center justify-center">
                {profile.avatar}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white">{profile.name}</h1>
                <p className="text-blue-100 text-lg font-semibold">{profile.position} • {profile.department}</p>
                <p className="text-blue-100 text-sm font-medium mt-1">{profile.id} • {profile.status.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/employees")}
                className="px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white font-bold hover:bg-white/30 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleExport}
                className="px-5 py-3 rounded-xl bg-white text-indigo-700 font-bold hover:shadow-lg transition-all"
              >
                📤 Export Data
              </button>
              <button
                onClick={() => setShowIdCard((prev) => !prev)}
                className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all"
              >
                🪪 {showIdCard ? "Hide ID Card" : "Generate ID Card"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Employee ID", value: profile.id, icon: "🆔" },
            { label: "Department", value: profile.department, icon: "🏢" },
            { label: "Manager", value: profile.manager, icon: "👤" },
            { label: "Blood Group", value: profile.bloodGroup, icon: "🩸" }
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-lg">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">{item.label}</div>
              <div className="text-xl font-black text-gray-900 mt-1">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">First Name</div>
                <div className="text-lg font-bold text-gray-900">{profile.firstName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Last Name</div>
                <div className="text-lg font-bold text-gray-900">{profile.lastName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Email</div>
                <div className="text-lg font-bold text-gray-900">{profile.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Phone</div>
                <div className="text-lg font-bold text-gray-900">{profile.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Location</div>
                <div className="text-lg font-bold text-gray-900">{profile.location}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Joining Date</div>
                <div className="text-lg font-bold text-gray-900">{profile.joinDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Employment Status</div>
                <div className="text-lg font-bold text-gray-900">{profile.status}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Compensation</div>
                <div className="text-lg font-bold text-gray-900">{profile.salary}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">HRMS Contacts</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                <div className="text-xs text-gray-500 uppercase font-bold">Reporting Manager</div>
                <div className="text-xl font-black text-gray-900">{profile.manager}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                <div className="text-xs text-gray-500 uppercase font-bold">Emergency Contact</div>
                <div className="text-lg font-bold text-gray-900">{profile.emergencyContact.name}</div>
                <div className="text-sm text-gray-700">{profile.emergencyContact.relation}</div>
                <div className="text-sm text-gray-700">{profile.emergencyContact.phone}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                <div className="text-xs text-gray-500 uppercase font-bold">Company</div>
                <div className="text-lg font-black text-gray-900">HRMS Corporation</div>
              </div>
            </div>
          </div>
        </div>

        {showIdCard && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-gray-900">Employee ID Card</h2>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:shadow-lg"
              >
                🖨️ Print ID Card
              </button>
            </div>

            <div className="max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 text-white">
                <div className="text-lg font-black tracking-wide">HRMS CORPORATION</div>
                <div className="text-xs text-indigo-100 font-semibold">Employee Identity Card</div>
              </div>
              <div className="bg-white p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-2xl">
                    {profile.avatar}
                  </div>
                  <div>
                    <div className="text-xl font-black text-gray-900">{profile.name}</div>
                    <div className="text-sm text-gray-600 font-semibold">{profile.position}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Employee ID</span>
                    <span className="text-gray-900 font-bold">{profile.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Department</span>
                    <span className="text-gray-900 font-bold">{profile.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Blood Group</span>
                    <span className="text-gray-900 font-bold">{profile.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Company</span>
                    <span className="text-gray-900 font-bold">HRMS Corporation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
