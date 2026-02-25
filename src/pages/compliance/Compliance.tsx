const complianceChecks = [
  { area: "PF Filing", owner: "Finance Ops", dueDate: "Feb 28, 2026", status: "On Track" },
  { area: "ESI Return", owner: "People Ops", dueDate: "Mar 02, 2026", status: "Pending" },
  { area: "POSH Training", owner: "L&D Team", dueDate: "Mar 05, 2026", status: "Overdue" },
  { area: "Contract Audit", owner: "Legal", dueDate: "Mar 08, 2026", status: "On Track" },
];

const statusClass: Record<string, string> = {
  "On Track": "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-rose-100 text-rose-700",
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-red-50/40 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 p-10 shadow-2xl text-white">
          <h1 className="text-5xl font-black tracking-tight">Compliance</h1>
          <p className="mt-2 text-rose-100 text-lg font-medium">Track statutory deadlines, audits, and mandatory programs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Critical Alerts</p>
            <p className="text-4xl font-black text-gray-900 mt-2">3</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Open Checks</p>
            <p className="text-4xl font-black text-gray-900 mt-2">{complianceChecks.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Completion Rate</p>
            <p className="text-4xl font-black text-gray-900 mt-2">87%</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-900">Upcoming Compliance Calendar</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <th className="px-6 py-3 font-bold">Area</th>
                  <th className="px-6 py-3 font-bold">Owner</th>
                  <th className="px-6 py-3 font-bold">Due Date</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {complianceChecks.map((item) => (
                  <tr key={item.area} className="border-t border-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.area}</td>
                    <td className="px-6 py-4 text-gray-700">{item.owner}</td>
                    <td className="px-6 py-4 text-gray-700">{item.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusClass[item.status] ?? "bg-gray-100 text-gray-700"}`}>
                        {item.status}
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
