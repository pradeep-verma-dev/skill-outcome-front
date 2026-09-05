import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import {
  UserCheck,
  Building2,
  Calendar,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Bell,
  Sparkles,
  ExternalLink,
  RotateCw,
  Send,
  HelpCircle
} from 'lucide-react';

const WAGE_RANGES = ['<10k', '10-20k', '20-30k', '30k+'];
const NON_PLACEMENT_REASONS = [
  'Skill mismatch',
  'Location barrier',
  'Low salary offers',
  'Interview difficulty',
  'Course quality',
  'Personal reason'
];

const TraineeDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [notification, setNotification] = useState(null);

  // Form states
  const [trainingStatus, setTrainingStatus] = useState('ongoing');
  const [goalText, setGoalText] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('salaried');

  // Outcome fields
  const [employerName, setEmployerName] = useState('');
  const [employerContact, setEmployerContact] = useState('');
  const [wageRange, setWageRange] = useState('<10k');
  const [joiningDate, setJoiningDate] = useState('');

  const [businessType, setBusinessType] = useState('');
  const [businessStage, setBusinessStage] = useState('Starting');

  const [apprenticeshipOrg, setApprenticeshipOrg] = useState('');
  const [apprenticeshipDuration, setApprenticeshipDuration] = useState('1 Year');

  const [nonPlacementReason, setNonPlacementReason] = useState('Skill mismatch');

  const [submittingOutcome, setSubmittingOutcome] = useState(false);

  // Follow-up state
  const [followupResponseStatus, setFollowupResponseStatus] = useState('Employed - same');
  const [submittingFollowup, setSubmittingFollowup] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    setProfileError('');
    try {
      const res = await api.get('/trainee/me');
      if (res.data.success) {
        setProfileData(res.data);
        const { trainee, outcome } = res.data;
        if (trainee) {
          setTrainingStatus(trainee.training_status || 'ongoing');
          setGoalText(trainee.goal_text || '');
        }
        if (outcome) {
          setEmploymentStatus(outcome.employment_status || 'salaried');
          setEmployerName(outcome.employer_name || '');
          setEmployerContact(outcome.employer_contact || '');
          setWageRange(outcome.wage_range || '<10k');
          if (outcome.joining_date) {
            setJoiningDate(new Date(outcome.joining_date).toISOString().split('T')[0]);
          }
          setBusinessType(outcome.business_type || '');
          setBusinessStage(outcome.business_stage || 'Starting');
          setApprenticeshipOrg(outcome.apprenticeship_org || '');
          setApprenticeshipDuration(outcome.apprenticeship_duration || '1 Year');
          setNonPlacementReason(outcome.non_placement_reason || 'Skill mismatch');
        }
      }
    } catch (err) {
      console.error('Failed to load trainee profile:', err);
      if (err.response?.status === 404) {
        setProfileError('API endpoint not found (404). Please verify that VITE_API_URL points to your backend URL.');
      } else if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        setProfileError('Unable to connect to backend server. Please verify backend is running on port 5000.');
      } else {
        setProfileError(err.response?.data?.message || err.message || 'Failed to fetch trainee profile from server');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleStatusChange = async (newStatus) => {
    setTrainingStatus(newStatus);
    try {
      await api.patch('/trainee/status', {
        training_status: newStatus,
        goal_text: goalText
      });
      loadProfile();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleOutcomeSubmit = async (e) => {
    e.preventDefault();
    setSubmittingOutcome(true);
    try {
      const payload = {
        employment_status: employmentStatus,
        goal_text: goalText,
        employer_name: employerName,
        employer_contact: employerContact,
        wage_range: wageRange,
        joining_date: joiningDate,
        business_type: businessType,
        business_stage: businessStage,
        apprenticeship_org: apprenticeshipOrg,
        apprenticeship_duration: apprenticeshipDuration,
        non_placement_reason: nonPlacementReason
      };

      const res = await api.post('/trainee/outcome', payload);
      if (res.data.success) {
        setNotification({
          type: 'success',
          message: 'Your employment outcome details have been recorded successfully!'
        });
        loadProfile();
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to submit outcome'
      });
    } finally {
      setSubmittingOutcome(false);
    }
  };

  const handleFollowupSubmit = async (e) => {
    e.preventDefault();
    if (!profileData?.pendingFollowup) return;
    setSubmittingFollowup(true);
    try {
      const res = await api.post('/trainee/followup-response', {
        followup_id: profileData.pendingFollowup._id,
        updated_status: followupResponseStatus
      });
      if (res.data.success) {
        setNotification({
          type: 'success',
          message: 'Thank you! Your follow-up outcome response has been logged.'
        });
        loadProfile();
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to submit follow-up response'
      });
    } finally {
      setSubmittingFollowup(false);
    }
  };

  if (loading && !profileData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Loading Trainee Records...
        </p>
      </div>
    );
  }

  if (profileError && !profileData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-[60vh]">
        <div className="max-w-lg w-full bg-white border border-rose-200 rounded p-6 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900 font-serif">Failed to Load Trainee Records</h2>
          <p className="text-xs text-rose-700 mt-2 leading-relaxed bg-rose-50 p-3 rounded border border-rose-100 font-medium">
            {profileError}
          </p>
          <div className="mt-5">
            <button
              onClick={loadProfile}
              className="py-2 px-5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" /> Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { trainee, outcome, verification, pendingFollowup, recommendation } = profileData || {};

  return (
    <div className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card Header */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                Trainee Portal
              </span>
              <span className="text-xs font-mono font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                ID: {trainee?.uniqueId}
              </span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-slate-950 mt-1">
              Welcome, {trainee?.name}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              <strong>Course:</strong> {trainee?.course_name} • <strong>Institute:</strong>{' '}
              {trainee?.institute?.name} ({trainee?.institute?.district})
            </p>
          </div>

          <button
            onClick={loadProfile}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors self-start md:self-auto"
            title="Refresh Status"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div
            className={`p-4 rounded border text-xs flex items-center justify-between shadow-xs ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-500 font-bold">✕</button>
          </div>
        )}

        {/* PENDING LONGITUDINAL FOLLOW-UP BANNER (Feature 4) */}
        {pendingFollowup && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-amber-200 text-amber-900 shrink-0">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                    Follow-Up Status Update Due ({pendingFollowup.scheduled_for} Milestone)
                  </h3>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
                    Action Required
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-1">
                  The National Directorate tracks long-term career progress. Please select your current employment condition below:
                </p>

                <form onSubmit={handleFollowupSubmit} className="mt-3 flex flex-wrap items-center gap-2">
                  <select
                    value={followupResponseStatus}
                    onChange={(e) => setFollowupResponseStatus(e.target.value)}
                    className="py-1.5 px-3 text-xs border border-amber-300 rounded focus:ring-1 focus:ring-amber-500 outline-hidden bg-white text-slate-900"
                  >
                    <option value="Employed - same">Employed (Same job)</option>
                    <option value="Employed - changed">Employed (Changed employer / upgraded)</option>
                    <option value="Self-employed">Self-employed / Entrepreneur</option>
                    <option value="Still searching">Still Searching / Preparing</option>
                  </select>

                  <button
                    type="submit"
                    disabled={submittingFollowup}
                    className="py-1.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-amber-700 hover:bg-amber-800 rounded shadow-xs transition-colors disabled:opacity-50 inline-flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    {submittingFollowup ? 'Submitting...' : 'Confirm One-Click Update'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* SKILL-GAP ENGINE RECOMMENDATION ALERT (Feature 6) */}
        {recommendation && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4 shadow-xs flex items-start gap-3">
            <div className="p-2 rounded bg-blue-100 text-blue-900 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950">
                Career Alignment & Skill-Gap Analysis
              </h3>
              <p className="text-xs text-blue-900 mt-1 font-medium leading-relaxed">
                {recommendation.message}
              </p>
              {recommendation.recommendedCourse && (
                <p className="text-[11px] text-blue-700 mt-1">
                  💡 We recommend checking with your training institute or nearby government center for enrolments in{' '}
                  <strong>{recommendation.recommendedCourse}</strong>.
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: TRAINING ONGOING VS COMPLETED TOGGLE (Feature 3) */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2 font-serif">
            Step 1: Training Status Declaration
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Is your skill training program currently ongoing or have you completed the course?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`p-4 border rounded cursor-pointer flex items-center gap-3 transition-colors ${
                trainingStatus === 'ongoing'
                  ? 'border-blue-900 bg-blue-50/50 text-blue-950 font-semibold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="trainingStatus"
                value="ongoing"
                checked={trainingStatus === 'ongoing'}
                onChange={() => handleStatusChange('ongoing')}
                className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-slate-300"
              />
              <div>
                <p className="text-xs font-bold">Training is Ongoing</p>
                <p className="text-[11px] text-slate-500 font-normal">
                  Expected Completion:{' '}
                  {trainee?.expected_completion_date
                    ? new Date(trainee.expected_completion_date).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </label>

            <label
              className={`p-4 border rounded cursor-pointer flex items-center gap-3 transition-colors ${
                trainingStatus === 'completed'
                  ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="trainingStatus"
                value="completed"
                checked={trainingStatus === 'completed'}
                onChange={() => handleStatusChange('completed')}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300"
              />
              <div>
                <p className="text-xs font-bold">Training is Completed</p>
                <p className="text-[11px] text-slate-500 font-normal">
                  Unlock employment & outcome reporting form
                </p>
              </div>
            </label>
          </div>

          {trainingStatus === 'ongoing' && (
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>
                Your training is ongoing. The outcome form will be available upon completion after{' '}
                <strong>
                  {trainee?.expected_completion_date
                    ? new Date(trainee.expected_completion_date).toLocaleDateString()
                    : 'your course ends'}
                </strong>.
              </span>
            </div>
          )}
        </div>

        {/* STEP 2: OUTCOME SUBMISSION FORM (Feature 3) */}
        {trainingStatus === 'completed' && (
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-serif">
                  Step 2: Employment Outcome & Placement Details
                </h2>
                <p className="text-xs text-slate-500">
                  Please submit your current employment or vocational status following completion
                </p>
              </div>
              {outcome && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                  Outcome Submitted
                </span>
              )}
            </div>

            <form onSubmit={handleOutcomeSubmit} className="space-y-5">
              {/* Stated Goal Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  What did you hope to achieve from this training? (Career Goal)
                </label>
                <input
                  type="text"
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  placeholder="e.g. Work as an IT full stack developer"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                />
              </div>

              {/* Employment Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Current Employment Status *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'salaried', label: 'Salaried Job' },
                    { id: 'self_employed', label: 'Self-Employed' },
                    { id: 'apprenticeship', label: 'Apprenticeship' },
                    { id: 'searching', label: 'Searching' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setEmploymentStatus(st.id)}
                      className={`py-2 px-3 text-xs font-bold rounded border transition-colors ${
                        employmentStatus === st.id
                          ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONDITIONAL SUB-FORM: SALARIED */}
              {employmentStatus === 'salaried' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-900" /> Salaried Employer Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Employer / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={employerName}
                        onChange={(e) => setEmployerName(e.target.value)}
                        placeholder="e.g. Infosys / Tata Motors"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Employer Contact (Email or Phone) *
                      </label>
                      <input
                        type="text"
                        required
                        value={employerContact}
                        onChange={(e) => setEmployerContact(e.target.value)}
                        placeholder="e.g. hr@company.com or +91 9876543210"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Monthly Wage Range *
                      </label>
                      <select
                        value={wageRange}
                        onChange={(e) => setWageRange(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      >
                        {WAGE_RANGES.map((w) => (
                          <option key={w} value={w}>₹ {w}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  {verification && (
                    <div className="mt-3 p-3 bg-white border border-slate-200 rounded text-xs flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-700">Employer Verification Status: </span>
                        <span
                          className={`font-bold uppercase px-2 py-0.5 rounded text-[10px] ${
                            verification.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : verification.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {verification.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <a
                        href={`/verify-employer/${verification._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-900 hover:text-blue-950 font-bold underline inline-flex items-center gap-1 text-xs"
                      >
                        Open Public Employer Verify Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* CONDITIONAL SUB-FORM: SELF-EMPLOYED */}
              {employmentStatus === 'self_employed' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Self-Employment & Enterprise Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Business / Trade Type *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        placeholder="e.g. Electrical contracting shop / Solar services"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Business Stage *
                      </label>
                      <select
                        value={businessStage}
                        onChange={(e) => setBusinessStage(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      >
                        <option value="Starting">Starting (Under 6 months)</option>
                        <option value="Growing">Growing (6-18 months)</option>
                        <option value="Stable">Stable (Established)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* CONDITIONAL SUB-FORM: APPRENTICESHIP */}
              {employmentStatus === 'apprenticeship' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Apprenticeship Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Host Organisation Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={apprenticeshipOrg}
                        onChange={(e) => setApprenticeshipOrg(e.target.value)}
                        placeholder="e.g. Apollo Hospital / BHEL"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        required
                        value={apprenticeshipDuration}
                        onChange={(e) => setApprenticeshipDuration(e.target.value)}
                        placeholder="e.g. 6 Months / 1 Year"
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CONDITIONAL SUB-FORM: SEARCHING */}
              {employmentStatus === 'searching' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Non-Placement Reason Diagnostics
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Primary Reason for Non-Placement *
                    </label>
                    <select
                      value={nonPlacementReason}
                      onChange={(e) => setNonPlacementReason(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-900"
                    >
                      {NON_PLACEMENT_REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1">
                      This information assists the Directorate in improving regional curriculum and job alignment.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingOutcome}
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors disabled:opacity-50"
                >
                  {submittingOutcome ? 'Recording Outcome...' : 'Save & Submit Outcome'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeDashboard;
