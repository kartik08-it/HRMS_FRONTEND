const complianceItems = [
  { area: "Policy Acknowledgements", status: "Pending", owner: "People Ops", dueDate: "Mar 08, 2026" },
  { area: "Background Verification", status: "At Risk", owner: "Talent Team", dueDate: "Mar 05, 2026" },
  { area: "Contract Renewals", status: "On Track", owner: "Legal", dueDate: "Mar 20, 2026" },
  { area: "Data Privacy Training", status: "Pending", owner: "IT Security", dueDate: "Mar 12, 2026" }
];

const statusClass: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  "At Risk": "bg-rose-100 text-rose-800",
  "On Track": "bg-emerald-100 text-emerald-800"
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 p-10 shadow-2xl">
          <h1 className="text-5xl font-black text-white tracking-tight">Compliance</h1>
          <p className="text-orange-100 text-lg mt-2 font-medium">Track mandatory HR and security obligations</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Open Compliance Tasks</h2>
          <div className="space-y-4">
            {complianceItems.map((item) => (
              <div key={item.area} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div>
                  <div className="text-lg font-bold text-gray-900">{item.area}</div>
                  <div className="text-sm text-gray-600">Owner: {item.owner}</div>
                </div>
                <div className="text-sm font-semibold text-gray-700">Due: {item.dueDate}</div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
