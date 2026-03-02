import { useState } from "react";
import { useNavigate } from "react-router-dom";

type EmployeeForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  position: string;
  manager: string;
  employmentType: string;
  workMode: string;
  joinDate: string;
  location: string;
  salary: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
};

const initialForm: EmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  employeeId: "",
  department: "",
  position: "",
  manager: "",
  employmentType: "Full Time",
  workMode: "Onsite",
  joinDate: "",
  location: "",
  salary: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  notes: ""
};

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EmployeeForm>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Employee profile submitted successfully.");
    navigate("/employees");
  };

  const inputClass =
    "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-800 font-medium focus:border-blue-500 focus:outline-none";
  const labelClass = "text-sm font-bold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black text-white tracking-tight">Add New Employee</h1>
              <p className="text-emerald-100 text-lg mt-2 font-medium">
                Create a complete employee profile and onboarding record
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-6 py-3 rounded-xl bg-white/20 border border-white/30 text-white font-bold hover:bg-white/30 transition-all"
            >
              ← Back to Employees
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Employee ID</label>
                <input name="employeeId" value={formData.employeeId} onChange={handleChange} required className={inputClass} placeholder="EMP1325" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Join Date</label>
                <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Work Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Department</label>
                <select name="department" value={formData.department} onChange={handleChange} required className={inputClass}>
                  <option value="">Select Department</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                  <option>Operations</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Position</label>
                <input name="position" value={formData.position} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Manager</label>
                <input name="manager" value={formData.manager} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Employment Type</label>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange} className={inputClass}>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Work Mode</label>
                <select name="workMode" value={formData.workMode} onChange={handleChange} className={inputClass}>
                  <option>Onsite</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input name="location" value={formData.location} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Annual Salary</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} className={inputClass} placeholder="65000" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Contact Name</label>
                <input name="emergencyName" value={formData.emergencyName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contact Phone</label>
                <input name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Relationship</label>
                <input name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Address & Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input name="city" value={formData.city} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input name="state" value={formData.state} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Postal Code</label>
                <input name="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className={inputClass}
                  placeholder="Any additional onboarding notes..."
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setFormData(initialForm)}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:shadow-xl transition-all"
            >
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
