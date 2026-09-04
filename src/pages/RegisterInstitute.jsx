import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { Building2, Mail, KeyRound, FileBadge2, MapPin, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const DISTRICTS = [
  'Bangalore Urban',
  'Pune',
  'Hyderabad',
  'Jaipur',
  'Lucknow',
  'Patna',
  'Chennai',
  'Ahmedabad',
  'Bhopal',
  'Kolkata',
  'Chandigarh',
  'Coimbatore'
];

const RegisterInstitute = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    govt_registration_number: '',
    district: 'Pune'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/institute/register', formData);
      if (res.data.success) {
        setRegisteredSuccess(res.data.institute);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-lg w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-blue-950 text-white border border-blue-900 shadow-xs mb-3">
            <Building2 className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
            Institute Empanelment Registration
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Apply for training provider accreditation under the National Skill Outcomes Program
          </p>
        </div>

        {registeredSuccess ? (
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Application Submitted Successfully!
            </h3>
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded text-left space-y-2 text-xs text-slate-700">
              <p><strong>Institute Name:</strong> {registeredSuccess.name}</p>
              <p><strong>Official Email:</strong> {registeredSuccess.email}</p>
              <p><strong>District:</strong> {registeredSuccess.district}</p>
              <p className="flex items-center gap-2">
                <strong>Empanelment Status:</strong>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                  Pending Govt Approval
                </span>
              </p>
            </div>
            <p className="mt-4 text-xs text-slate-600 leading-relaxed">
              Your institute details have been queued for Government Directorate review. You will be able to log in to the Teacher Dashboard as soon as an Admin approves your registration.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="flex-1 py-2 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 text-center"
              >
                Back to Login
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="flex-1 py-2 px-4 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded text-center inline-flex items-center justify-center gap-1"
              >
                Test Approval in Admin Portal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Training Institute Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maharshi Skill Academy"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Official Institute Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. contact@maharshi-skills.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Govt Empanelment / Registration Number
                </label>
                <div className="relative">
                  <FileBadge2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    name="govt_registration_number"
                    required
                    value={formData.govt_registration_number}
                    onChange={handleChange}
                    placeholder="e.g. MH-NSDC-2026-8941"
                    className="w-full pl-9 pr-3 py-2 text-sm font-mono uppercase border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Official NSDC / State Skill Mission registration number</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Operational District
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  >
                    {DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Create Account Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Submitting Registration...' : 'Submit Empanelment Application'}
                </button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-blue-900 hover:underline">
                Sign in here
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterInstitute;
