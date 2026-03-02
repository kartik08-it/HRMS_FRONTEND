const quickReports = [
  { name: "Attendance Summary", frequency: "Daily", owner: "HR Ops" },
  { name: "Payroll Reconciliation", frequency: "Monthly", owner: "Finance" },
  { name: "Leave Utilization", frequency: "Weekly", owner: "People Team" },
  { name: "Recruitment Funnel", frequency: "Weekly", owner: "Talent" }
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-10 shadow-2xl">
          <h1 className="text-5xl font-black text-white tracking-tight">Reports</h1>
          <p className="text-blue-100 text-lg mt-2 font-medium">Generate and monitor HR reporting workflows</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Available Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quickReports.map((report) => (
              <div key={report.name} className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50 p-5">
                <div className="text-xl font-bold text-gray-900">{report.name}</div>
                <div className="text-sm text-gray-600 mt-2">Frequency: {report.frequency}</div>
                <div className="text-sm text-gray-600">Owner: {report.owner}</div>
                <button className="mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white hover:shadow-lg transition-all">
                  Generate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
