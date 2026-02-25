const performanceMetrics = [
  { label: "Review Completion", value: "92%", tone: "from-emerald-500 to-teal-600" },
  { label: "Goals On Track", value: "146", tone: "from-blue-500 to-indigo-600" },
  { label: "Needs Attention", value: "18", tone: "from-amber-500 to-orange-600" },
  { label: "Top Performers", value: "34", tone: "from-purple-500 to-fuchsia-600" },
];

const reviewQueue = [
  { employee: "Olivia Martin", manager: "Priya Shah", dueDate: "Feb 28, 2026", status: "Pending" },
  { employee: "Noah Wright", manager: "David Kim", dueDate: "Mar 01, 2026", status: "In Review" },
  { employee: "Mia Lopez", manager: "Sarah Johnson", dueDate: "Mar 02, 2026", status: "Pending" },
  { employee: "Ethan Clark", manager: "Rahul Verma", dueDate: "Mar 03, 2026", status: "Ready" },
];

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-10 shadow-2xl text-white">
          <h1 className="text-5xl font-black tracking-tight">Performance</h1>
          <p className="mt-2 text-indigo-100 text-lg font-medium">Track reviews, goals, and coaching actions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {performanceMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className={`h-1.5 rounded-full bg-gradient-to-r ${metric.tone} mb-4`} />
              <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">{metric.label}</p>
              <p className="text-4xl font-black text-gray-900 mt-2">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">Review Queue</h2>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold">
              Start Cycle
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <th className="px-6 py-3 font-bold">Employee</th>
                  <th className="px-6 py-3 font-bold">Manager</th>
                  <th className="px-6 py-3 font-bold">Due Date</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {reviewQueue.map((row) => (
                  <tr key={row.employee} className="border-t border-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.employee}</td>
                    <td className="px-6 py-4 text-gray-700">{row.manager}</td>
                    <td className="px-6 py-4 text-gray-700">{row.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
