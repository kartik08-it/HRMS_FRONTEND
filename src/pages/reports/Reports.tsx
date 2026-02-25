const reports = [
  { name: "Headcount Trend", owner: "People Analytics", frequency: "Weekly", lastRun: "Feb 24, 2026" },
  { name: "Attrition Summary", owner: "HRBP Team", frequency: "Monthly", lastRun: "Feb 21, 2026" },
  { name: "Payroll Variance", owner: "Finance Ops", frequency: "Monthly", lastRun: "Feb 20, 2026" },
  { name: "Leave Utilization", owner: "Operations", frequency: "Bi-weekly", lastRun: "Feb 23, 2026" },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/40 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-10 shadow-2xl text-white">
          <h1 className="text-5xl font-black tracking-tight">Reports</h1>
          <p className="mt-2 text-amber-100 text-lg font-medium">Generate and monitor HR, payroll, and compliance reporting packs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Scheduled Reports</p>
            <p className="text-4xl font-black text-gray-900 mt-2">{reports.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Runs This Week</p>
            <p className="text-4xl font-black text-gray-900 mt-2">24</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Failures</p>
            <p className="text-4xl font-black text-gray-900 mt-2">1</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">Report Jobs</h2>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold">
              New Report
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-6">
            {reports.map((item) => (
              <div key={item.name} className="rounded-2xl border border-gray-200 p-5 bg-gradient-to-br from-white to-gray-50">
                <p className="text-xl font-black text-gray-900">{item.name}</p>
                <div className="mt-3 space-y-1 text-sm text-gray-700 font-semibold">
                  <p>Owner: {item.owner}</p>
                  <p>Frequency: {item.frequency}</p>
                  <p>Last Run: {item.lastRun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
