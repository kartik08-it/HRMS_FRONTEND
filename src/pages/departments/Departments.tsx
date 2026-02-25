const departments = [
  { name: "Engineering", head: "Priya Shah", members: 58, openRoles: 6, utilization: "84%" },
  { name: "Sales", head: "Daniel Moore", members: 41, openRoles: 4, utilization: "79%" },
  { name: "Finance", head: "Sonia Mehta", members: 19, openRoles: 1, utilization: "73%" },
  { name: "People Ops", head: "Ava Thomas", members: 14, openRoles: 2, utilization: "88%" },
  { name: "Customer Success", head: "Kevin Brown", members: 27, openRoles: 3, utilization: "81%" },
];

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-10 shadow-2xl text-white">
          <h1 className="text-5xl font-black tracking-tight">Departments</h1>
          <p className="mt-2 text-emerald-100 text-lg font-medium">Organization structure, staffing, and capacity overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Total Departments</p>
            <p className="text-4xl font-black text-gray-900 mt-2">{departments.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Total Headcount</p>
            <p className="text-4xl font-black text-gray-900 mt-2">{departments.reduce((sum, d) => sum + d.members, 0)}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wide">Open Roles</p>
            <p className="text-4xl font-black text-gray-900 mt-2">{departments.reduce((sum, d) => sum + d.openRoles, 0)}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-900">Department Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <th className="px-6 py-3 font-bold">Department</th>
                  <th className="px-6 py-3 font-bold">Department Head</th>
                  <th className="px-6 py-3 font-bold">Members</th>
                  <th className="px-6 py-3 font-bold">Open Roles</th>
                  <th className="px-6 py-3 font-bold">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((item) => (
                  <tr key={item.name} className="border-t border-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-gray-700">{item.head}</td>
                    <td className="px-6 py-4 text-gray-700">{item.members}</td>
                    <td className="px-6 py-4 text-gray-700">{item.openRoles}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        {item.utilization}
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
