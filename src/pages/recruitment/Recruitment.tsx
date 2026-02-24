import { useState } from 'react';
import recruitmentData from './recruitmentData.json';

export default function RecruitmentPage() {
    const [activeTab, setActiveTab] = useState('positions'); // positions, candidates, interviews, offers
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [showJobModal, setShowJobModal] = useState(false);

    const {
        recruitmentSummary,
        pipelineStages,
        openPositions,
        interviewsToday,
        recentApplications,
        offersManagement,
        departmentHiring,
        sourcingChannels,
        criticalVacancies,
        interviewFeedback
    } = recruitmentData;

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            'active': 'bg-emerald-100 text-emerald-800 border-emerald-300',
            'on_hold': 'bg-amber-100 text-amber-800 border-amber-300',
            'closed': 'bg-gray-100 text-gray-800 border-gray-300',
            'new': 'bg-blue-100 text-blue-800 border-blue-300',
            'screening': 'bg-purple-100 text-purple-800 border-purple-300',
            'phone_interview': 'bg-indigo-100 text-indigo-800 border-indigo-300',
            'scheduled': 'bg-cyan-100 text-cyan-800 border-cyan-300',
            'pending': 'bg-amber-100 text-amber-800 border-amber-300',
            'accepted': 'bg-emerald-100 text-emerald-800 border-emerald-300',
            'declined': 'bg-rose-100 text-rose-800 border-rose-300'
        };
        return badges[status] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const getPriorityBadge = (priority: string) => {
        const badges: Record<string, string> = {
            'critical': 'bg-rose-600 text-white',
            'high': 'bg-orange-500 text-white',
            'medium': 'bg-blue-500 text-white',
            'low': 'bg-gray-400 text-white'
        };
        return badges[priority] || 'bg-gray-400 text-white';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
            <div className="max-w-[1800px] mx-auto space-y-8">

                {/* Page Header */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    <div className="relative">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                                        📝
                                    </div>
                                    <div>
                                        <h1 className="text-5xl font-black text-white tracking-tight">Recruitment</h1>
                                        <p className="text-purple-100 text-lg mt-1 font-medium">Hiring pipeline & talent acquisition</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                                        📌 {recruitmentSummary.openPositions} Open Positions
                                    </div>
                                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                                        👥 {recruitmentSummary.totalCandidates} Candidates
                                    </div>
                                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                                        🎯 {recruitmentSummary.interviewsToday} Interviews Today
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowJobModal(true)}
                                    className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg"
                                >
                                    ➕ Post New Job
                                </button>
                                <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                                    📊 Analytics
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {[
                        { label: 'Open Positions', value: recruitmentSummary.openPositions, icon: '📌', color: 'from-blue-500 to-blue-600', change: '+3 this week' },
                        { label: 'Total Candidates', value: recruitmentSummary.totalCandidates, icon: '👥', color: 'from-purple-500 to-purple-600', change: '+45 this week' },
                        { label: 'Interviews', value: recruitmentSummary.interviewsScheduled, icon: '🎯', color: 'from-indigo-500 to-indigo-600', change: '9 today' },
                        { label: 'Offers Out', value: recruitmentSummary.offersReleased, icon: '💼', color: 'from-emerald-500 to-emerald-600', change: `${recruitmentSummary.acceptanceRate}% acceptance` },
                        { label: 'Avg Time to Hire', value: `${recruitmentSummary.avgTimeToHire}d`, icon: '⏱️', color: 'from-amber-500 to-amber-600', change: '-3 days vs target' },
                        { label: 'Cost per Hire', value: `$${recruitmentSummary.avgCostPerHire}`, icon: '💰', color: 'from-rose-500 to-rose-600', change: 'Under budget' }
                    ].map((metric, idx) => (
                        <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color} rounded-t-2xl`}></div>
                            <div className="text-3xl mb-2">{metric.icon}</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
                            <div className="text-3xl font-black text-gray-900 mb-1">{metric.value}</div>
                            <div className="text-xs text-gray-600 font-semibold">{metric.change}</div>
                        </div>
                    ))}
                </div>

                {/* Hiring Pipeline Funnel */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
                            🔄
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Hiring Pipeline</h2>
                            <p className="text-gray-600 text-sm mt-0.5">Candidate journey through recruitment stages</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {pipelineStages.map((stage, idx) => (
                            <div key={idx} className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-black text-gray-700">{stage.stage}</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-bold">
                                            {stage.count} candidates
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-600">{stage.percentage}%</span>
                                </div>
                                <div className="h-8 bg-gray-100 rounded-xl overflow-hidden relative">
                                    <div
                                        className={`h-full bg-gradient-to-r from-${stage.color}-400 to-${stage.color}-600 rounded-xl flex items-center justify-end pr-4 transition-all duration-500`}
                                        style={{ width: `${stage.percentage}%` }}
                                    >
                                        <span className="text-white font-bold text-sm">{stage.count}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold text-blue-900 mb-1">Pipeline Conversion Rate</div>
                                <div className="text-3xl font-black text-blue-900">{pipelineStages[pipelineStages.length - 1].percentage}%</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-blue-900 mb-1">Drop-off Rate</div>
                                <div className="text-3xl font-black text-rose-600">{(100 - pipelineStages[pipelineStages.length - 1].percentage).toFixed(1)}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                        {[
                            { id: 'positions', label: 'Open Positions', icon: '📌' },
                            { id: 'candidates', label: 'Candidates', icon: '👥' },
                            { id: 'interviews', label: 'Interviews', icon: '🎯' },
                            { id: 'offers', label: 'Offers', icon: '💼' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="all">All Departments</option>
                        <option value="engineering">Engineering</option>
                        <option value="sales">Sales</option>
                        <option value="product">Product</option>
                        <option value="marketing">Marketing</option>
                        <option value="design">Design</option>
                        <option value="data">Data Analytics</option>
                    </select>
                </div>

                {/* Open Positions Tab */}
                {activeTab === 'positions' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
                                    📌
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">Open Positions</h2>
                                    <p className="text-gray-600 text-sm mt-0.5">{openPositions.length} active job openings</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {openPositions.map((job) => (
                                <div key={job.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-xl font-black text-gray-900">{job.title}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityBadge(job.priority)}`}>
                                                    {job.priority.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 font-semibold mb-3">
                                                {job.id} • {job.department} • {job.location}
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-xl font-bold text-sm border ${getStatusBadge(job.status)}`}>
                                            {job.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                            <div className="text-xs font-bold text-blue-700 mb-1">Openings</div>
                                            <div className="text-2xl font-black text-blue-900">{job.openings}</div>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                            <div className="text-xs font-bold text-purple-700 mb-1">Candidates</div>
                                            <div className="text-2xl font-black text-purple-900">{job.candidates}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 font-semibold">Experience:</span>
                                            <span className="font-bold text-gray-900">{job.experience}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 font-semibold">Type:</span>
                                            <span className="font-bold text-gray-900">{job.type}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 font-semibold">Budget:</span>
                                            <span className="font-bold text-emerald-700">{job.budget}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 font-semibold">Hiring Manager:</span>
                                            <span className="font-bold text-gray-900">{job.hiringManager}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                                        <span className="text-gray-600 font-semibold">
                                            Posted: {new Date(job.postedDate).toLocaleDateString()}
                                        </span>
                                        <span className="text-rose-600 font-bold">
                                            Closes: {new Date(job.closingDate).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors text-sm">
                                            View Candidates
                                        </button>
                                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Candidates Tab */}
                {activeTab === 'candidates' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                                    👥
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">Recent Applications</h2>
                                    <p className="text-gray-600 text-sm mt-0.5">{recentApplications.length} new candidates</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {recentApplications.map((candidate) => (
                                <div key={candidate.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                                                {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-black text-gray-900">{candidate.candidateName}</h3>
                                                    <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                                                        Score: {candidate.resumeScore}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600 font-semibold mb-2">
                                                    {candidate.email} • {candidate.phone}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {candidate.skills.map((skill, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Position</div>
                                                <div className="text-sm font-bold text-gray-900">{candidate.position}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Experience</div>
                                                <div className="text-sm font-bold text-gray-900">{candidate.experience}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Current Company</div>
                                                <div className="text-sm font-bold text-gray-900">{candidate.currentCompany}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Expected Salary</div>
                                                <div className="text-sm font-bold text-emerald-700">{candidate.expectedSalary}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <span className={`px-4 py-2 rounded-xl font-bold text-sm border text-center ${getStatusBadge(candidate.status)}`}>
                                                {candidate.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors text-sm">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                                        <span className="text-gray-600 font-semibold">
                                            Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                                        </span>
                                        <span className="text-gray-600 font-semibold">
                                            Notice Period: {candidate.noticePeriod}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interviews Tab */}
                {activeTab === 'interviews' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-2xl">
                                    🎯
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">Today's Interviews</h2>
                                    <p className="text-gray-600 text-sm mt-0.5">{interviewsToday.length} scheduled interviews</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-sm font-bold text-emerald-600">LIVE</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {interviewsToday.map((interview) => (
                                <div key={interview.id} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200 hover:shadow-lg transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                                                <div className="text-white font-black text-lg">{interview.time}</div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-gray-900 mb-1">{interview.candidateName}</h3>
                                                <div className="text-sm text-gray-700 font-semibold mb-2">{interview.position}</div>
                                                <div className="flex flex-wrap gap-3 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-semibold text-gray-600">Round:</span>
                                                        <span className="font-bold text-indigo-700">{interview.round}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-semibold text-gray-600">Interviewer:</span>
                                                        <span className="font-bold text-gray-900">{interview.interviewer}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-semibold text-gray-600">Mode:</span>
                                                        <span className="font-bold text-gray-900">{interview.mode}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className={`px-4 py-2 rounded-xl font-bold text-sm border text-center ${getStatusBadge(interview.status)}`}>
                                                {interview.status.toUpperCase()}
                                            </span>
                                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition-colors text-sm">
                                                Join Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold text-blue-900 mb-1">Total Interviews Scheduled</div>
                                    <div className="text-4xl font-black text-blue-900">{recruitmentSummary.interviewsScheduled}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-blue-900 mb-1">Feedback Pending</div>
                                    <div className="text-4xl font-black text-amber-600">{interviewFeedback.pending}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-blue-900 mb-1">Avg Rating</div>
                                    <div className="text-4xl font-black text-emerald-600">{interviewFeedback.avgRating}/5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Offers Tab */}
                {activeTab === 'offers' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl">
                                    💼
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">Offers Management</h2>
                                    <p className="text-gray-600 text-sm mt-0.5">{offersManagement.length} active offers</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {offersManagement.map((offer) => (
                                <div key={offer.id} className={`rounded-2xl p-6 border-2 hover:shadow-lg transition-all ${offer.status === 'accepted' ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300' :
                                    offer.status === 'declined' ? 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-300' :
                                        'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
                                    }`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-black text-gray-900 mb-1">{offer.candidateName}</h3>
                                            <div className="text-sm text-gray-700 font-semibold">{offer.position}</div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-xl font-bold text-sm border ${getStatusBadge(offer.status)}`}>
                                            {offer.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <div className="text-xs font-bold text-gray-600 uppercase mb-1">Offered Salary</div>
                                            <div className="text-lg font-black text-emerald-700">{offer.offeredSalary}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-600 uppercase mb-1">Joining Date</div>
                                            <div className="text-sm font-bold text-gray-900">{new Date(offer.joiningDate).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-600 uppercase mb-1">Offered On</div>
                                            <div className="text-sm font-bold text-gray-900">{new Date(offer.offeredDate).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-600 uppercase mb-1">
                                                {offer.status === 'pending' ? 'Expires In' : offer.status === 'accepted' ? 'Accepted On' : 'Declined On'}
                                            </div>
                                            <div className={`text-sm font-bold ${offer.status === 'pending' ? 'text-rose-600' : 'text-gray-900'}`}>
                                                {offer.status === 'pending' ? `${offer.daysRemaining} days` :
                                                    offer.status === 'accepted' ? (offer.acceptedDate ? new Date(offer.acceptedDate).toLocaleDateString() : 'N/A') :
                                                        (offer.declinedDate ? new Date(offer.declinedDate).toLocaleDateString() : 'N/A')}
                                            </div>
                                        </div>
                                    </div>

                                    {offer.declineReason && (
                                        <div className="p-3 bg-rose-100 border border-rose-200 rounded-lg">
                                            <div className="text-xs font-bold text-rose-800 mb-1">Decline Reason:</div>
                                            <div className="text-sm font-semibold text-rose-900">{offer.declineReason}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-6">
                            <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                                <div className="text-sm font-bold text-emerald-700 mb-2">Offers Accepted</div>
                                <div className="text-4xl font-black text-emerald-900">{recruitmentSummary.offersAccepted}</div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl border border-rose-200">
                                <div className="text-sm font-bold text-rose-700 mb-2">Offers Declined</div>
                                <div className="text-4xl font-black text-rose-900">{recruitmentSummary.offersDeclined}</div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                                <div className="text-sm font-bold text-blue-700 mb-2">Acceptance Rate</div>
                                <div className="text-4xl font-black text-blue-900">{recruitmentSummary.acceptanceRate}%</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Department Hiring & Budget */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Department Hiring */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl">
                                🏢
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">Department Hiring</h2>
                                <p className="text-gray-600 text-sm mt-0.5">Team-wise recruitment status</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {departmentHiring.map((dept, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-black text-gray-900">{dept.department}</h3>
                                        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                                            {dept.openPositions} open
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Candidates</div>
                                            <div className="text-xl font-black text-gray-900">{dept.candidates}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Interviews</div>
                                            <div className="text-xl font-black text-indigo-700">{dept.interviewsScheduled}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Offers</div>
                                            <div className="text-xl font-black text-emerald-700">{dept.offersOut}</div>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-gray-600 font-semibold">Budget Utilization</span>
                                            <span className="font-bold text-gray-900">{dept.spent} / {dept.budget}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-teal-400 to-cyan-600 rounded-full"
                                                style={{ width: `${(parseInt(dept.spent.replace(/[$,]/g, '')) / parseInt(dept.budget.replace(/[$,]/g, ''))) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sourcing Channels */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-2xl">
                                📢
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">Sourcing Channels</h2>
                                <p className="text-gray-600 text-sm mt-0.5">Recruitment channel performance</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {sourcingChannels.map((channel, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-black text-gray-900">{channel.channel}</h3>
                                        <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                                            {channel.conversionRate}% conversion
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Applications</div>
                                            <div className="text-xl font-black text-gray-900">{channel.applications}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Hires</div>
                                            <div className="text-xl font-black text-emerald-700">{channel.hires}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Cost</div>
                                            <div className="text-xl font-black text-blue-700">{channel.cost}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Critical Vacancies Alert */}
                {criticalVacancies.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-2xl">
                                🚨
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">Critical Vacancies</h2>
                                <p className="text-gray-600 text-sm mt-0.5">Positions requiring immediate attention</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {criticalVacancies.map((vacancy, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-300 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadge(vacancy.urgency)}`}>
                                            {vacancy.urgency.toUpperCase()}
                                        </span>
                                        <span className="text-sm font-bold text-rose-700">{vacancy.daysOpen} days open</span>
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 mb-2">{vacancy.position}</h3>
                                    <p className="text-sm text-rose-800 font-semibold">⚠️ {vacancy.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Post Job Modal */}
            {showJobModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-black text-gray-900">Post New Job</h2>
                            <button
                                onClick={() => setShowJobModal(false)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. Senior Developer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        <option>Engineering</option>
                                        <option>Sales</option>
                                        <option>Product</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. Bangalore" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Experience Required</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. 3-5 years" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Openings</label>
                                    <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. 2" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range</label>
                                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. $80,000 - $120,000" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Detailed job description, responsibilities, and requirements..."
                                ></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowJobModal(false)}
                                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}