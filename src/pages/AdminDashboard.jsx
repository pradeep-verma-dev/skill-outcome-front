import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import StatCard from '../components/StatCard';
import {
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCw,
  Search,
  MapPin,
  FileSpreadsheet,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PIE_COLORS = ['#1D4ED8', '#D97706', '#DC2626', '#059669', '#7C3AED', '#0891B2'];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [pendingInstitutes, setPendingInstitutes] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [notification, setNotification] = useState(null);
  const [triggeringCron, setTriggeringCron] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'approvals' | 'skill_gaps' | 'institutes'

  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, pendingRes, skillGapsRes] = await Promise.all([
        api.get('/admin/analytics/overview'),
        api.get('/admin/institutes/pending'),
        api.get('/admin/analytics/skill-gaps')
      ]);

      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data);
      }
      if (pendingRes.data.success) {
        setPendingInstitutes(pendingRes.data.institutes);
      }
      if (skillGapsRes.data.success) {
        setSkillGaps(skillGapsRes.data.reports);
      }
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApproveInstitute = async (id, name) => {
    try {
      const res = await api.patch(`/admin/institutes/${id}/approve`);
      if (res.data.success) {
        setNotification({
          type: 'success',
          message: `Institute '${name}' has been successfully Approved. Login is now enabled.`
        });
        loadData();
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Approval failed'
      });
    }
  };

  const handleRejectInstitute = async (id, name) => {
    if (!window.confirm(`Are you sure you want to reject institute: ${name}?`)) return;
    try {
      const res = await api.patch(`/admin/institutes/${id}/reject`);
      if (res.data.success) {
        setNotification({
          type: 'info',
          message: `Institute '${name}' has been Rejected.`
        });
        loadData();
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Rejection failed'
      });
    }
  };

  const handleTriggerFollowups = async () => {
    setTriggeringCron(true);
    try {
      const res = await api.post('/admin/trigger-followups');
      if (res.data.success) {
        setNotification({
          type: 'success',
          message: `Automated Follow-up Scan complete! Scanned: ${res.data.result.scannedTrainees} trainees, Created ${res.data.result.newFollowupsCreated} new follow-up tasks.`
        });
        loadData();
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to execute follow-up scan'
      });
    } finally {
      setTriggeringCron(false);
    }
  };

  if (loading && !analytics) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Loading National Analytics...
        </p>
      </div>
    );
  }

  const { stats, courseBreakdown = [], districtStats = [], nonPlacementReasons = [], instituteComparison = [] } = analytics || {};

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Title & Action Controls */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200 uppercase">
                Directorate Level Control
              </span>
              <span className="text-xs text-slate-500 font-mono">Status: Live Feed</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-slate-950 mt-1">
              National Skilling Outcomes & Governance Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Empanelment monitoring, multi-district analytics, skill-gap diagnostics, and longitudinal follow-up simulations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerFollowups}
              disabled={triggeringCron}
              className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 bg-amber-400 hover:bg-amber-300 rounded shadow-xs transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
              title="Manually trigger the 3mo/6mo/12mo follow-up check without waiting for midnight cron"
            >
              <Play className="w-3.5 h-3.5" />
              {triggeringCron ? 'Scanning Database...' : 'Run Follow-up Check'}
            </button>
            <button
              onClick={loadData}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification Toast Alert */}
        {notification && (
          <div
            className={`p-4 rounded border text-xs flex items-center justify-between shadow-xs ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : notification.type === 'error'
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : 'bg-blue-50 text-blue-900 border-blue-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-500 hover:text-slate-800 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Primary KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Trainees"
            value={stats?.totalTrainees || 0}
            subtitle={`${stats?.ongoingCount || 0} Ongoing / ${stats?.completedCount || 0} Completed`}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Overall Placement Rate"
            value={`${stats?.overallPlacementRate || 0}%`}
            subtitle={`${stats?.totalPlaced || 0} Placed out of ${stats?.completedCount || 0}`}
            icon={TrendingUp}
            color="emerald"
          />
          <StatCard
            title="Salaried Trainees"
            value={stats?.salariedCount || 0}
            subtitle={`${stats?.selfEmployedCount || 0} Self-Employed`}
            icon={Briefcase}
            color="indigo"
          />
          <StatCard
            title="Approved Institutes"
            value={stats?.approvedInstitutes || 0}
            subtitle={`Total registered: ${stats?.totalInstitutes || 0}`}
            icon={Building2}
            color="slate"
          />
          <StatCard
            title="Pending Approvals"
            value={pendingInstitutes.length}
            subtitle="Requires immediate review"
            icon={AlertTriangle}
            color={pendingInstitutes.length > 0 ? 'amber' : 'slate'}
          />
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto bg-white px-4 rounded-t border-t border-x shadow-2xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-900 text-blue-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Analytics & Charts
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'approvals'
                ? 'border-blue-900 text-blue-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Institute Approvals Queue
            {pendingInstitutes.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono font-bold">
                {pendingInstitutes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('institutes')}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'institutes'
                ? 'border-blue-900 text-blue-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Institute Comparison
          </button>
          <button
            onClick={() => setActiveTab('skill_gaps')}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'skill_gaps'
                ? 'border-blue-900 text-blue-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Skill-Gap Reports ({skillGaps.length})
          </button>
        </div>

        {/* TAB 1: ANALYTICS & CHARTS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Course-wise Placement Rate */}
              <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-serif">
                      Course-Wise Placement Rate (%)
                    </h3>
                    <p className="text-xs text-slate-500">Employment success percentage across distinct training domains</p>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courseBreakdown} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis
                        dataKey="course"
                        tick={{ fontSize: 10, fill: '#475569' }}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                      />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#475569' }} unit="%" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '4px', fontSize: '12px' }}
                        formatter={(val) => [`${val}%`, 'Placement Rate']}
                      />
                      <Bar dataKey="placementRate" fill="#1E3A8A" radius={[2, 2, 0, 0]} name="Placement %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Non-Placement Reasons Breakdown */}
              <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-serif">
                      Non-Placement Reason Breakdown
                    </h3>
                    <p className="text-xs text-slate-500">Declared causes from candidates currently searching</p>
                  </div>
                </div>

                <div className="h-72 w-full flex items-center justify-center">
                  {nonPlacementReasons.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nonPlacementReasons}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={false}
                        >
                          {nonPlacementReasons.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '4px', fontSize: '12px' }}
                          formatter={(value, name) => [`${value} Trainees`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-xs text-slate-400">No searching candidate data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* District-wise Performance Table */}
            <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 font-serif mb-1">
                District-Wise Skilling & Placement Overview
              </h3>
              <p className="text-xs text-slate-500 mb-4">Geographic distribution of operational institutes and outcomes</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                      <th className="p-3">District</th>
                      <th className="p-3 text-center">Active Institutes</th>
                      <th className="p-3 text-center">Enrolled Trainees</th>
                      <th className="p-3 text-center">Placed Trainees</th>
                      <th className="p-3 text-right">Placement Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {districtStats.map((d) => (
                      <tr key={d.district} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {d.district}
                        </td>
                        <td className="p-3 text-center text-slate-700">{d.institutes}</td>
                        <td className="p-3 text-center text-slate-700 font-mono">{d.trainees}</td>
                        <td className="p-3 text-center text-slate-700 font-mono">{d.placed}</td>
                        <td className="p-3 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-bold ${
                              d.placementRate >= 70
                                ? 'bg-emerald-50 text-emerald-800'
                                : d.placementRate >= 40
                                ? 'bg-blue-50 text-blue-800'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {d.placementRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PENDING APPROVALS QUEUE */}
        {activeTab === 'approvals' && (
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Training Institute Empanelment Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Institutes pending verification of government credentials before portal authorization
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded">
                {pendingInstitutes.length} Pending
              </span>
            </div>

            {pendingInstitutes.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                No pending institute registrations. All institutes are processed!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                      <th className="p-3">Institute Name</th>
                      <th className="p-3">Govt Reg Number</th>
                      <th className="p-3">Official Email</th>
                      <th className="p-3">District</th>
                      <th className="p-3">Applied On</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {pendingInstitutes.map((inst) => (
                      <tr key={inst._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">{inst.name}</td>
                        <td className="p-3 font-mono text-slate-700">{inst.govt_registration_number}</td>
                        <td className="p-3 text-slate-600">{inst.email}</td>
                        <td className="p-3 text-slate-700">{inst.district}</td>
                        <td className="p-3 text-slate-500">
                          {new Date(inst.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApproveInstitute(inst._id, inst.name)}
                              className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectInstitute(inst._id, inst.name)}
                              className="px-3 py-1.5 text-xs font-bold text-rose-800 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INSTITUTE COMPARISON TABLE */}
        {activeTab === 'institutes' && (
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif mb-1">
              Institutional Performance Comparison
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Cross-institute evaluation of completion volume, placement ratios, and employer verification rates
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                    <th className="p-3">Institute Name</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Govt Reg No</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Total Trainees</th>
                    <th className="p-3 text-center">Completed</th>
                    <th className="p-3 text-center">Placement Rate</th>
                    <th className="p-3 text-right">Employer Verified %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {instituteComparison.map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">{inst.name}</td>
                      <td className="p-3 text-slate-700">{inst.district}</td>
                      <td className="p-3 font-mono text-slate-600">{inst.govt_registration_number}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            inst.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : inst.status === 'pending'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {inst.status}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono text-slate-800">{inst.totalTrainees}</td>
                      <td className="p-3 text-center font-mono text-slate-800">{inst.completedTrainees}</td>
                      <td className="p-3 text-center font-bold text-blue-900">{inst.placementRate}%</td>
                      <td className="p-3 text-right font-bold text-emerald-800">{inst.verifiedEmployerRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SKILL GAP REPORTS */}
        {activeTab === 'skill_gaps' && (
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Regional Skill-Gap Demand Intelligence
                </h3>
                <p className="text-xs text-slate-500">
                  Logged when a candidate's stated goal is mismatched with their training course and unavailable locally
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded">
                {skillGaps.length} Reports Logged
              </span>
            </div>

            {skillGaps.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No skill gap anomalies recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                      <th className="p-3">Trainee Name</th>
                      <th className="p-3">Trainee ID</th>
                      <th className="p-3">Aspirant Goal Keyword</th>
                      <th className="p-3">Course Taken</th>
                      <th className="p-3">District</th>
                      <th className="p-3">Reported On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {skillGaps.map((gap) => (
                      <tr key={gap._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">{gap.trainee_id?.name || 'Trainee'}</td>
                        <td className="p-3 font-mono text-slate-600">{gap.trainee_id?.uniqueId || 'N/A'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                            "{gap.goal_keyword}"
                          </span>
                        </td>
                        <td className="p-3 text-slate-700">{gap.course_taken}</td>
                        <td className="p-3 font-semibold text-slate-800">{gap.district}</td>
                        <td className="p-3 text-slate-500">
                          {new Date(gap.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
