const departmentStats = [
  { label: "Total Departments", value: "12", icon: "🏢", color: "from-indigo-500 to-blue-600" },
  { label: "Team Leads", value: "48", icon: "👤", color: "from-emerald-500 to-teal-600" },
  { label: "Open Positions", value: "21", icon: "📝", color: "from-amber-500 to-orange-600" },
  { label: "Avg. Headcount", value: "104", icon: "📊", color: "from-violet-500 to-purple-600" }
];

const departmentRows = [
  { name: "Engineering", headcount: 318, manager: "Anita Sharma", status: "Growing" },
  { name: "Sales", headcount: 154, manager: "Rahul Mehta", status: "Stable" },
  { name: "Marketing", headcount: 86, manager: "Sarah Wilson", status: "Hiring" },
  { name: "Operations", headcount: 200, manager: "David Lee", status: "Stable" },
  { name: "Finance", headcount: 72, manager: "Neha Verma", status: "Growing" }
];

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-10 shadow-2xl">
          <div className="relative">
            <h1 className="text-5xl font-black text-white tracking-tight">Departments</h1>
            <p className="text-blue-100 text-lg mt-2 font-medium">Org structure and ownership overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {departmentStats.map((item) => (
            <div key={item.label} className="relative bg-white rounded-2xl p-5 shadow-lg border border-gray-100 overflow-hidden">
              <div className={`absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b ${item.color}`}></div>
              <div className="pl-3">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-3xl font-black text-gray-900">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Department Directory</h2>
          <div className="space-y-4">
            {departmentRows.map((row) => (
              <div key={row.name} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div>
                  <div className="text-xl font-bold text-gray-900">{row.name}</div>
                  <div className="text-sm text-gray-600">Manager: {row.manager}</div>
                </div>
                <div className="text-sm font-semibold text-gray-700">Headcount: {row.headcount}</div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
