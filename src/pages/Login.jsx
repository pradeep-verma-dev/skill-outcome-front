import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, Building2, UserCheck, ShieldCheck, KeyRound, Mail, AlertCircle } from 'lucide-react';

const formatErrorMessage = (err, defaultMsg) => {
  if (err.response?.status === 404) {
    return 'Backend endpoint not found (404). Please verify that VITE_API_URL in your Vercel frontend environment variables points to your deployed backend API URL (e.g. https://your-backend.vercel.app/api).';
  }
  if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
    return 'Unable to connect to the backend server. Please check your internet connection or verify backend is running.';
  }
  return err.response?.data?.message || err.message || defaultMsg;
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role');
  
  // Sequence: Trainee -> Institute (Teacher) -> Admin
  const [tab, setTab] = useState(
    initialRole === 'admin' ? 'admin' : initialRole === 'teacher' || initialRole === 'institute' ? 'teacher' : 'trainee'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [traineeId, setTraineeId] = useState('');
  const [traineePin, setTraineePin] = useState('');

  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const { loginInstitute, loginTrainee, loginAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const role = searchParams.get('role');
    if (role === 'admin') setTab('admin');
    else if (role === 'teacher' || role === 'institute') setTab('teacher');
    else if (role === 'trainee') setTab('trainee');
  }, [searchParams]);

  const handleTraineeLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginTrainee(traineeId, traineePin);
      navigate('/trainee');
    } catch (err) {
      setError(formatErrorMessage(err, 'Trainee login failed. Please verify your Unique ID & PIN.'));
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginInstitute(teacherEmail, teacherPassword);
      navigate('/teacher');
    } catch (err) {
      setError(formatErrorMessage(err, 'Institute login failed. Check email & password, or ensure your institute is approved by Admin.'));
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginAdmin(adminEmail, adminPassword);
      navigate('/admin');
    } catch (err) {
      setError(formatErrorMessage(err, 'Admin login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-blue-950 text-white border border-blue-900 shadow-xs mb-3">
            <Landmark className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
            Official Portal Login
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Select your role to access your authorized dashboard
          </p>
        </div>

        {/* Tab Selection: Sequence Trainee -> Institute -> Admin */}
        <div className="bg-white border border-slate-200 rounded-t p-1 flex border-b-0 shadow-xs">
          <button
            type="button"
            onClick={() => { setTab('trainee'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'trainee'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Trainee
          </button>
          <button
            type="button"
            onClick={() => { setTab('teacher'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'teacher'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Institute
          </button>
          <button
            type="button"
            onClick={() => { setTab('admin'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'admin'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-b p-6 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* TAB 1: TRAINEE */}
          {tab === 'trainee' && (
            <form onSubmit={handleTraineeLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Unique Trainee ID
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={traineeId}
                    onChange={(e) => setTraineeId(e.target.value.toUpperCase())}
                    placeholder="e.g. APEX-2026-6840"
                    className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900 uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Format: INST-YEAR-XXXX (issued by training institute)</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  4-Digit Security PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    maxLength={6}
                    value={traineePin}
                    onChange={(e) => setTraineePin(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-9 pr-3 py-2 text-sm font-mono tracking-widest border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? 'Verifying PIN...' : 'Access Trainee Portal'}
              </button>
            </form>
          )}

          {/* TAB 2: TEACHER / INSTITUTE */}
          {tab === 'teacher' && (
            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="e.g. apex.delhi@skills.gov.in"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-1">
                <Link
                  to="/register-institute"
                  className="text-xs text-blue-900 hover:text-blue-950 font-medium hover:underline"
                >
                  Need registration? Apply here
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In as Institute'}
              </button>
            </form>
          )}

          {/* TAB 3: GOVERNMENT ADMIN */}
          {tab === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Government Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@gov.in"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Administrator Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? 'Authenticating Admin...' : 'Sign In as Government Official'}
              </button>
            </form>
          )}
        </div>

        {/* Footnote */}
        <div className="mt-6 text-center text-[11px] text-slate-500">
          Official Portal for National Skill Development Tracking • Secured with JWT & RBAC
        </div>
      </div>
    </div>
  );
};

export default Login;
