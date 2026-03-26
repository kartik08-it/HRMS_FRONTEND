import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toPng } from "html-to-image";
import { employeeService, type EmployeeRecord } from "../../../services/employee.service";
import Dialog from "../../../components/ui/Dialog";

function getBloodGroup(employeeId: string | number | null | undefined) {
  const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const safeId = employeeId ? String(employeeId) : "0";
  const seed = safeId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return groups[seed % groups.length];
}
const getMissingFields = (employee: EmployeeRecord | null) => {
  if (!employee) return [];
  const fields: Array<{ key: keyof EmployeeRecord; label: string }> = [
    { key: "employeeCode", label: "employeeCode" },
    { key: "name", label: "name" },
    { key: "email", label: "email" },
    { key: "phone", label: "phone" },
    { key: "department", label: "department" },
    { key: "position", label: "position" },
    { key: "joinDate", label: "joinDate" },
    { key: "status", label: "status" },
    { key: "avatar", label: "avatar" },
    { key: "profileImage", label: "profile_image" },
    { key: "salary", label: "salary" },
    { key: "manager", label: "manager" },
    { key: "location", label: "location" },
  ];

  return fields
    .filter(({ key }) => {
      const value = employee[key];
      if (value === null || value === undefined) return true;
      if (typeof value === "string") return value.trim().length === 0;
      return false;
    })
    .map(({ label }) => label);
};

export default function ViewEmployeePage() {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const location = useLocation();
  const [showIdCard, setShowIdCard] = useState(false);
  const idCardRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const employeeFromState = (location.state as { employee?: EmployeeRecord } | null)?.employee;
  const [employee, setEmployee] = useState<EmployeeRecord | null>(employeeFromState ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!employeeId) return;

    const hasLocalEmployee = Boolean(employeeFromState ?? employee);
    const shouldShowLoader = !hasLocalEmployee;

    const fetchEmployee = async () => {
      if (shouldShowLoader) {
        setIsLoading(true);
      }
      setError(null);
      setRefreshError(null);
      try {
        const response = await employeeService.getEmployeeById(Number(employeeId));
        if (!isMounted) return;
        setEmployee(response);
      } catch (err) {
        if (!isMounted) return;
        const message =
          err instanceof Error ? err.message : "Failed to load employee";
        if (hasLocalEmployee) {
          setRefreshError(message);
        } else {
          setError(message);
        }
      } finally {
        if (isMounted && shouldShowLoader) setIsLoading(false);
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
      avatar: employee.profileImage ?? employee.avatar ?? "--",
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

  const missingFields = useMemo(() => getMissingFields(employee), [employee]);

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

  const handleDownloadIdCard = async () => {
    if (!profile || !idCardRef.current) return;
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const dataUrl = await toPng(idCardRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Emp-${profile.employeeCode?.toUpperCase()}-IC.png`;
      link.click();
    } catch (err) {
      setDownloadError(
        err instanceof Error ? err.message : "Failed to download ID card",
      );
    } finally {
      setIsDownloading(false);
    }
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

  if (!profile) {
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
              <div className="w-20 h-20 rounded-2xl bg-white/20 text-white text-3xl font-black flex items-center justify-center overflow-hidden">
                {profile.profileImage && profile.profileImage.trim().length > 0 ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile.avatar
                )}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white">{profile.name?.toUpperCase()}</h1>
                <p className="text-blue-100 text-lg font-semibold">{profile.position} • {profile.department}</p>
                <p className="text-blue-100 text-sm font-medium mt-1">{profile.employeeCode?.toUpperCase()} • {profile.status.toUpperCase()}</p>
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
                onClick={() => setShowIdCard(true)}
                className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all"
              >
                🪪 Generate ID Card
              </button>
            </div>
          </div>
        </div>

        {refreshError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800 font-semibold">
            {refreshError}
          </div>
        )}

        {missingFields.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl px-6 py-4 shadow-sm">
            <div className="font-bold text-sm uppercase tracking-wider mb-2">
              Missing Fields From API (Showing Static Fallbacks)
            </div>
            <div className="flex flex-wrap gap-2">
              {missingFields.map((field) => (
                <span
                  key={field}
                  className="px-3 py-1 rounded-full bg-white text-amber-700 text-sm font-semibold border border-amber-200"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Employee ID", value: profile.employeeCode?.toUpperCase(), icon: "🆔" },
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

        <Dialog
          open={showIdCard}
          onClose={() => setShowIdCard(false)}
          title="Employee ID Card"
          maxWidthClassName="max-w-xl"
          footer={
            <div className="flex flex-wrap items-center justify-end gap-3">
              {downloadError && (
                <span className="text-sm font-semibold text-red-600">
                  {downloadError}
                </span>
              )}
              <button
                onClick={() => setShowIdCard(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={handleDownloadIdCard}
                disabled={isDownloading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDownloading ? "Preparing..." : "Download ID Card"}
              </button>
            </div>
          }
        >
          <div
            ref={idCardRef}
            className="max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 text-white">
              <div className="text-lg font-black tracking-wide">HRMS CORPORATION</div>
              <div className="text-xs text-indigo-100 font-semibold">
                Employee Identity Card
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-40 h-30 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-2xl overflow-hidden">
                  {profile.profileImage && profile.profileImage.trim().length > 0 ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile.avatar
                  )}
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900">{profile.name.toLocaleUpperCase()}</div>
                  <div className="text-sm text-gray-600 font-semibold">
                    {profile.employeeCode?.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-500 font-semibold">{profile.position}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Department</span>
                  <span className="text-gray-900 font-bold">{profile.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Profile</span>
                  <span className="text-gray-900 font-bold">{profile.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Blood Group</span>
                  <span className="text-gray-900 font-bold">{profile.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Phone</span>
                  <span className="text-gray-900 font-bold">+91-{profile.phone}</span>
                </div>

              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
