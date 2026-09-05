import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import {
  Building2,
  Users,
  UserPlus,
  Briefcase,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Search,
  KeyRound,
  FileCheck,
  RotateCw,
  ExternalLink,
  Phone,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const COURSES_LIST = [
  'Electrician & Electrical Maintenance',
  'Web & Full Stack Software Development',
  'Solar Panel Installation & Maintenance',
  'General Duty Healthcare Assistant',
  'Automotive Repair & Two-Wheeler Servicing',
  'Data Entry & Office Operations'
];

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');
  const [trainees, setTrainees] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Enrolment Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [enrolLoading, setEnrolLoading] = useState(false);
  const [enrolError, setEnrolError] = useState('');
  const [createdTrainee, setCreatedTrainee] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course_name: COURSES_LIST[0],
    admission_date: new Date().toISOString().split('T')[0],
    expected_completion_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    consent_given: false,
    goal_text: ''
  });

  // Call Trainee Modal
  const [callModalData, setCallModalData] = useState(null);
  const [callNotes, setCallNotes] = useState('');
  const [callLoading, setCallLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setDashboardError('');
    try {
      const [traineesRes, analyticsRes] = await Promise.all([
        api.get('/teacher/trainees'),
        api.get('/teacher/analytics/overview')
      ]);

      if (traineesRes.data.success) {
        setTrainees(traineesRes.data.trainees);
      }
      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data);
      }
    } catch (err) {
      console.error('Failed to load teacher dashboard:', err);
      if (err.response?.status === 404) {
        setDashboardError('API endpoint not found (404). Please verify that VITE_API_URL points to your backend URL.');
      } else if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        setDashboardError('Unable to connect to backend server. Please verify backend is running on port 5000.');
      } else {
        setDashboardError(err.response?.data?.message || err.message || 'Failed to fetch dashboard data from server');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEnrolSubmit = async (e) => {
    e.preventDefault();
    setEnrolError('');

    if (!formData.consent_given) {
      setEnrolError('Consent form must be collected and confirmed before proceeding.');
      return;
    }

    setEnrolLoading(true);
    try {
      const res = await api.post('/teacher/trainees', formData);
      if (res.data.success) {
        setCreatedTrainee(res.data.trainee);
        loadData();
      }
    } catch (err) {
      setEnrolError(err.response?.data?.message || err.message || 'Failed to enrol trainee');
    } finally {
      setEnrolLoading(false);
    }
  };

  const handleCloseEnrolModal = () => {
    setShowAddModal(false);
    setCreatedTrainee(null);
    setEnrolError('');
    setFormData({
      name: '',
      phone: '',
      course_name: COURSES_LIST[0],
      admission_date: new Date().toISOString().split('T')[0],
      expected_completion_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      consent_given: false,
      goal_text: ''
    });
  };

  const handleRecordCall = async (e) => {
    e.preventDefault();
    if (!callModalData) return;
    setCallLoading(true);
    try {
      const res = await api.patch(`/teacher/verifications/${callModalData._id}/contact`, {
        notes: callNotes
      });
      if (res.data.success) {
        setCallModalData(null);
        setCallNotes('');
        loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to record call');
    } finally {
      setCallLoading(false);
    }
  };

  const filteredTrainees = trainees.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm);

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'ongoing') return t.training_status === 'ongoing';
    if (statusFilter === 'completed') return t.training_status === 'completed';
    if (statusFilter === 'salaried') return t.outcome?.employment_status === 'salaried';
    if (statusFilter === 'self_employed') return t.outcome?.employment_status === 'self_employed';
    if (statusFilter === 'searching') return t.outcome?.employment_status === 'searching';
    return true;
  });

  const { stats, courseBreakdown = [], needsFollowUp = [] } = analytics || {};

  if (loading && !analytics) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Loading Institute Dashboard...
        </p>
      </div>
    );
  }

  if (dashboardError && !analytics) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-[60vh]">
        <div className="max-w-lg w-full bg-white border border-rose-200 rounded p-6 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 font-serif">Failed to Load Institute Data</h2>
          <p className="text-xs text-rose-700 mt-2 leading-relaxed bg-rose-50 p-3 rounded border border-rose-100 font-medium">
            {dashboardError}
          </p>
          <div className="mt-5">
            <button
              onClick={loadData}
              className="py-2 px-5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" /> Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Institute Info Header */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                Approved Training Provider
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Reg No: {user?.govt_registration_number || user?.regNo || 'INST-REG'}
              </span>
              <span className="text-xs text-slate-500">
                • District: {user?.district || 'General'}
              </span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-slate-950 mt-1">
              {user?.name || 'Training Institute'} Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Candidate enrolment, unique credential provisioning, longitudinal outcomes, and employer verification actions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" /> Enrol New Trainee
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

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Trainees"
            value={stats?.totalTrainees || 0}
            subtitle={`${stats?.ongoingCount || 0} Ongoing / ${stats?.completedCount || 0} Completed`}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Placement Rate"
            value={`${stats?.placementRate || 0}%`}
            subtitle={`${stats?.placedCount || 0} Placed out of ${stats?.completedCount || 0}`}
            icon={Briefcase}
            color="emerald"
          />
          <StatCard
            title="Outcomes Breakdown"
            value={`${stats?.salariedCount || 0} Salaried`}
            subtitle={`${stats?.selfEmployedCount || 0} Self-Emp / ${stats?.searchingCount || 0} Searching`}
            icon={BarChart2}
            color="indigo"
          />
          <StatCard
            title="Needs Verification Action"
            value={needsFollowUp.length}
            subtitle="Employer unverified / denied"
            icon={AlertTriangle}
            color={needsFollowUp.length > 0 ? 'amber' : 'slate'}
          />
        </div>

        {/* Needs Teacher Follow-up Section (Feature 5) */}
        {needsFollowUp.length > 0 && (
          <div className="bg-amber-50/50 border border-amber-200 rounded p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-amber-950 font-serif uppercase tracking-wider">
                  Action Required: Employer Verification Follow-Ups ({needsFollowUp.length})
                </h3>
              </div>
              <span className="text-[11px] text-amber-800 font-medium">
                Simulated link unconfirmed or denied
              </span>
            </div>

            <p className="text-xs text-amber-900 mb-3">
              The following salaried claims require teacher intervention to cross-check with the trainee or contact the employer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {needsFollowUp.map((v) => (
                <div
                  key={v._id}
                  className="bg-white border border-amber-200 rounded p-3.5 flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        {v.trainee_id?.name} ({v.trainee_id?.uniqueId})
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          v.status === 'denied'
                            ? 'bg-rose-100 text-rose-800'
                            : v.status === 'needs_teacher_followup'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {v.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      <strong>Course:</strong> {v.trainee_id?.course_name}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      <strong>Claimed Employer:</strong> {v.employer_name || 'N/A'} ({v.employer_contact})
                    </p>
                    {v.notes && (
                      <p className="text-[11px] text-rose-700 italic mt-0.5">
                        Note: {v.notes}
                      </p>
                    )}
                    {v.teacher_contacted && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Trainee Contacted by Teacher
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setCallModalData(v);
                      setCallNotes(v.teacher_notes || '');
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded shrink-0 flex items-center gap-1 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    {v.teacher_contacted ? 'Update Call' : 'Call Trainee'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainee Roster Table Section */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Institute Trainee Roster
              </h3>
              <p className="text-xs text-slate-500">
                Complete cohort directory with unique IDs, completion progress, and outcome submissions
              </p>
            </div>

            {/* Search & Status Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name, ID or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900 w-56"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1.5 px-3 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
              >
                <option value="all">All Statuses</option>
                <option value="ongoing">Training Ongoing</option>
                <option value="completed">Completed</option>
                <option value="salaried">Salaried Job</option>
                <option value="self_employed">Self-Employed</option>
                <option value="searching">Searching</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                  <th className="p-3">Unique Trainee ID</th>
                  <th className="p-3">Candidate Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Course Name</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3 text-center">Training Status</th>
                  <th className="p-3 text-center">Outcome Status</th>
                  <th className="p-3 text-right">Employer Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTrainees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No trainees found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredTrainees.map((t) => (
                    <tr key={t._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-blue-950">{t.uniqueId}</td>
                      <td className="p-3 font-semibold text-slate-900">{t.name}</td>
                      <td className="p-3 text-slate-600 font-mono">{t.phone}</td>
                      <td className="p-3 text-slate-700 max-w-[200px] truncate">{t.course_name}</td>
                      <td className="p-3 text-[11px] text-slate-500">
                        {new Date(t.admission_date).toLocaleDateString()} →{' '}
                        {new Date(t.expected_completion_date).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.training_status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {t.training_status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            t.outcome?.employment_status === 'salaried'
                              ? 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                              : t.outcome?.employment_status === 'self_employed'
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : t.outcome?.employment_status === 'searching'
                              ? 'bg-slate-100 text-slate-800 border border-slate-200'
                              : 'text-slate-400'
                          }`}
                        >
                          {t.displayStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {t.verification ? (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              t.verification.status === 'verified'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : t.verification.status === 'pending'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {t.verification.status.replace(/_/g, ' ')}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD TRAINEE MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
              {createdTrainee ? (
                /* SUCCESS SCREEN SHOWING UNIQUE ID & PIN (Feature 2) */
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    Trainee Enrolled Successfully!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Share the generated credentials below with the trainee for their portal access:
                  </p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded text-left space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-slate-200">
                      <span className="text-xs text-slate-500 font-medium">Candidate Name:</span>
                      <span className="text-xs font-bold text-slate-900">{createdTrainee.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200">
                      <span className="text-xs text-slate-500 font-medium">Unique Trainee ID:</span>
                      <span className="text-sm font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {createdTrainee.uniqueId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200">
                      <span className="text-xs text-slate-500 font-medium">Temporary Security PIN:</span>
                      <span className="text-sm font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tracking-widest">
                        {createdTrainee.generatedPin}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-slate-500 font-medium">Course:</span>
                      <span className="text-xs text-slate-700">{createdTrainee.course_name}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Mock SMS Notification: Sent SMS with ID & PIN to {createdTrainee.phone}
                  </p>

                  <button
                    onClick={handleCloseEnrolModal}
                    className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs"
                  >
                    Done & Return to Roster
                  </button>
                </div>
              ) : (
                /* ENROLMENT FORM */
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-blue-900" /> Enrol New Trainee
                    </h3>
                    <button
                      onClick={handleCloseEnrolModal}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {enrolError && (
                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{enrolError}</span>
                    </div>
                  )}

                  <form onSubmit={handleEnrolSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 9876543210"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Training Course *
                      </label>
                      <select
                        value={formData.course_name}
                        onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                      >
                        {COURSES_LIST.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Admission Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.admission_date}
                          onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Expected Completion *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.expected_completion_date}
                          onChange={(e) => setFormData({ ...formData, expected_completion_date: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Candidate Career Goal (Stated Aspiration)
                      </label>
                      <input
                        type="text"
                        value={formData.goal_text}
                        onChange={(e) => setFormData({ ...formData, goal_text: e.target.value })}
                        placeholder="e.g. Become an industrial technician"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">Used for skill-gap matching and alignment diagnostics</p>
                    </div>

                    {/* MANDATORY CONSENT CHECKBOX (Feature 2) */}
                    <div className="p-3 bg-blue-50/60 border border-blue-200 rounded flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent_checkbox"
                        required
                        checked={formData.consent_given}
                        onChange={(e) => setFormData({ ...formData, consent_given: e.target.checked })}
                        className="mt-1 h-4 w-4 text-blue-900 focus:ring-blue-900 border-slate-300 rounded"
                      />
                      <label htmlFor="consent_checkbox" className="text-xs text-slate-800 leading-snug">
                        <strong>Consent form collected:</strong> I verify that signed trainee consent has been collected for longitudinal outcome tracking and employer validation.
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseEnrolModal}
                        className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={enrolLoading || !formData.consent_given}
                        className="flex-1 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs disabled:opacity-50"
                      >
                        {enrolLoading ? 'Enrolling...' : 'Generate Trainee ID & PIN'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALL TRAINEE ACTION MODAL */}
        {callModalData && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded max-w-md w-full p-6 shadow-xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-700" /> Follow-Up: Call Trainee
                </h3>
                <button onClick={() => setCallModalData(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1 mb-4 text-slate-700">
                <p><strong>Candidate:</strong> {callModalData.trainee_id?.name} ({callModalData.trainee_id?.uniqueId})</p>
                <p><strong>Phone:</strong> {callModalData.trainee_id?.phone}</p>
                <p><strong>Claimed Employer:</strong> {callModalData.employer_name} ({callModalData.employer_contact})</p>
                <p><strong>Verification Issue:</strong> {callModalData.notes || 'No response / Denied'}</p>
              </div>

              <form onSubmit={handleRecordCall} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Teacher Call Notes & Findings
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    placeholder="e.g. Spoke with candidate, joining date was postponed to next month..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCallModalData(null)}
                    className="flex-1 py-2 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={callLoading}
                    className="flex-1 py-2 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs"
                  >
                    {callLoading ? 'Saving...' : 'Mark Contacted'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
