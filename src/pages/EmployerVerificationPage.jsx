import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { Landmark, Building2, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

const EmployerVerificationPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null);
  const [notes, setNotes] = useState('');

  const loadVerification = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/employer/verify/${id}`);
      if (res.data.success) {
        setVerification(res.data.verification);
        if (res.data.verification.status !== 'pending') {
          setSubmittedStatus(res.data.verification.status);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification record not found or link has expired.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVerification();
  }, [id]);

  const handleAction = async (action) => {
    setSubmitting(true);
    try {
      const res = await api.post(`/employer/verify/${id}`, {
        action,
        notes
      });
      if (res.data.success) {
        setSubmittedStatus(res.data.status);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50 min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Connecting to Government Verification Gateway...
        </p>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-screen">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded p-6 text-center shadow-sm">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold font-serif text-slate-900">Verification Link Invalid</h2>
          <p className="text-xs text-slate-600 mt-2">{error}</p>
          <div className="mt-6">
            <Link to="/" className="text-xs font-semibold text-blue-900 hover:underline">
              Return to National Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const trainee = verification.trainee_id;
  const outcome = verification.outcome_id;

  return (
    <div className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen">
      <div className="max-w-xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-blue-950 text-white border border-blue-900 shadow-xs mb-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1">
            Official Employment Validation Service
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
            Directorate Candidate Verification
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Please confirm whether the candidate below is currently employed with your organisation.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
          {submittedStatus ? (
            <div className="text-center py-6 space-y-4">
              {submittedStatus === 'verified' ? (
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              )}

              <h2 className="text-lg font-bold font-serif text-slate-900">
                {submittedStatus === 'verified'
                  ? 'Employment Confirmed Successfully'
                  : 'Verification Response Recorded'}
              </h2>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {submittedStatus === 'verified'
                  ? `Thank you. The verified employment record for ${trainee?.name} has been certified in the National Skilling Outcomes repository.`
                  : `Your feedback has been logged. The respective training provider has been notified for internal follow-up.`}
              </p>

              <div className="pt-4">
                <Link
                  to="/"
                  className="py-2 px-4 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded inline-flex items-center gap-1.5"
                >
                  Return to Portal Home <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Candidate Info Summary Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2 text-xs text-slate-700">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Candidate Name:</span>
                  <span className="font-bold text-slate-900">{trainee?.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Unique Trainee ID:</span>
                  <span className="font-mono font-bold text-blue-950">{trainee?.uniqueId}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Training Course:</span>
                  <span className="font-semibold text-slate-800">{trainee?.course_name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Training Institute:</span>
                  <span className="text-slate-800">
                    {trainee?.institute_id?.name} ({trainee?.institute_id?.district})
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reported Employer:</span>
                  <span className="font-bold text-slate-900">{outcome?.employer_name || verification.employer_name}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Reported Wage Bracket:</span>
                  <span className="font-semibold text-emerald-800">₹ {outcome?.wage_range || 'N/A'}</span>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Employer Remarks / Designation Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Employed as Junior Technician since February 2026..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 outline-hidden bg-white text-slate-900"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleAction('deny')}
                  className="py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Deny / Incorrect
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleAction('confirm')}
                  className="py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Confirm Employment
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500">
          Official Verification Portal • Government Directorate of Skill Outcomes
        </div>
      </div>
    </div>
  );
};

export default EmployerVerificationPage;
