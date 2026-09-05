import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Building2,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Copy,
  Check
} from 'lucide-react';

const Home = () => {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex-1 bg-slate-50">
      {/* Official Government Top Banner */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Landmark className="w-4 h-4" /> National Skill Mission Monitoring Directorate
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-950 tracking-tight leading-tight">
            Skilling Outcomes & Impact-Tracking Platform
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            A unified government tracking framework monitoring verified employment outcomes, employer validations, longitudinal follow-ups, and regional skill-gap diagnostics.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login?role=trainee"
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors inline-flex items-center gap-2"
            >
              Access Portal Login <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register-institute"
              className="px-6 py-3 text-sm font-semibold text-blue-900 bg-white hover:bg-slate-50 border border-slate-300 rounded shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" /> Register New Institute
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Credentials Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white border-2 border-blue-900/20 rounded-lg p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-900" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Evaluation & Demonstration Credentials
              </h2>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              Pre-seeded accounts ready for prototype testing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Trainee Credentials */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-700" /> 1. Skill Trainee
                  </span>
                  <Link
                    to="/login?role=trainee"
                    className="text-[11px] font-semibold text-emerald-800 hover:underline inline-flex items-center gap-0.5"
                  >
                    Login <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="mt-2.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-emerald-100">
                    <span className="text-slate-500 font-mono text-[11px]">ID:</span>
                    <span className="font-mono font-bold text-slate-900">APEX-2026-6840</span>
                    <button
                      onClick={() => copyToClipboard('APEX-2026-6840', 'trainee_id')}
                      className="text-slate-400 hover:text-slate-700"
                      title="Copy Trainee ID"
                    >
                      {copiedKey === 'trainee_id' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-emerald-100">
                    <span className="text-slate-500 font-mono text-[11px]">PIN:</span>
                    <span className="font-mono font-bold text-slate-900">6161</span>
                    <button
                      onClick={() => copyToClipboard('6161', 'trainee_pin')}
                      className="text-slate-400 hover:text-slate-700"
                      title="Copy PIN"
                    >
                      {copiedKey === 'trainee_pin' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-emerald-800 mt-2">Candidate: Karan Mehra • Electrician Course</p>
            </div>

            {/* Institute Credentials */}
            <div className="bg-blue-50/50 border border-blue-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-700" /> 2. Training Institute
                  </span>
                  <Link
                    to="/login?role=teacher"
                    className="text-[11px] font-semibold text-blue-800 hover:underline inline-flex items-center gap-0.5"
                  >
                    Login <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="mt-2.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-blue-100">
                    <span className="text-slate-500 font-mono text-[11px]">Email:</span>
                    <span className="font-mono font-medium text-slate-900 text-[11px] truncate max-w-[150px]">apex@skills.org</span>
                    <button
                      onClick={() => copyToClipboard('apex@skills.org', 'teacher_email')}
                      className="text-slate-400 hover:text-slate-700 shrink-0"
                      title="Copy Email"
                    >
                      {copiedKey === 'teacher_email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-blue-100">
                    <span className="text-slate-500 font-mono text-[11px]">Pass:</span>
                    <span className="font-mono font-bold text-slate-900">password123</span>
                    <button
                      onClick={() => copyToClipboard('password123', 'teacher_pass')}
                      className="text-slate-400 hover:text-slate-700"
                      title="Copy Password"
                    >
                      {copiedKey === 'teacher_pass' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-blue-800 mt-2">Institute: Apex Skill Development Institute (Delhi)</p>
            </div>

            {/* Admin Credentials */}
            <div className="bg-rose-50/50 border border-rose-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-700" /> 3. Government Admin
                  </span>
                  <Link
                    to="/login?role=admin"
                    className="text-[11px] font-semibold text-rose-800 hover:underline inline-flex items-center gap-0.5"
                  >
                    Login <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="mt-2.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-rose-100">
                    <span className="text-slate-500 font-mono text-[11px]">Email:</span>
                    <span className="font-mono font-bold text-slate-900">admin@gov.in</span>
                    <button
                      onClick={() => copyToClipboard('admin@gov.in', 'admin_email')}
                      className="text-slate-400 hover:text-slate-700"
                      title="Copy Email"
                    >
                      {copiedKey === 'admin_email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-rose-100">
                    <span className="text-slate-500 font-mono text-[11px]">Pass:</span>
                    <span className="font-mono font-bold text-slate-900">Admin@2026</span>
                    <button
                      onClick={() => copyToClipboard('Admin@2026', 'admin_pass')}
                      className="text-slate-400 hover:text-slate-700"
                      title="Copy Password"
                    >
                      {copiedKey === 'admin_pass' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-rose-800 mt-2">National Directorate • Full Analytics & Approval Queue</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Roles Breakdown Grid (Sequence: Trainee -> Institute -> Admin) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Platform Roles & Operational Modules
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Structured governance across trainee progression, institute registration, employer feedback, and policy analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Role 1: Trainee */}
          <div className="bg-white rounded border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                1. Skill Trainee
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Logs in via Unique ID + PIN, declares training completion status, submits granular outcome data (salaried, self-employed, apprenticeship, or searching), and responds to follow-ups.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Conditional Outcome Forms
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 3mo/6mo/12mo Longitudinal Follow-ups
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Goal-Matching Course Recommendations
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/login?role=trainee"
                className="text-xs font-semibold text-blue-900 hover:text-blue-950 inline-flex items-center gap-1"
              >
                Trainee Login <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Role 2: Training Institute / Teacher */}
          <div className="bg-white rounded border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                2. Training Institute / Teacher
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Enrols trainees with consent verification, issues auto-generated Unique Trainee IDs + PINs, monitors batch progression, and acts on employer follow-up alerts.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Auto-Generated ID: INST-YEAR-XXXX
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Consent Form Check & Secure PIN
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> "Call Trainee" Action for Unverified Cases
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/login?role=teacher"
                className="text-xs font-semibold text-blue-900 hover:text-blue-950 inline-flex items-center gap-1"
              >
                Institute Login <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Role 3: Government Directorate Admin */}
          <div className="bg-white rounded border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                3. Government Directorate Admin
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Empanelment approval queue for training institutes, macro-level placement dashboards, district comparison metrics, and automated follow-up simulation controls.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Institute Approval & Empanelment
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> District & Course Placement Analytics
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Regional Skill-Gap Demand Intelligence
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/login?role=admin"
                className="text-xs font-semibold text-blue-900 hover:text-blue-950 inline-flex items-center gap-1"
              >
                Go to Admin Portal <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-10 bg-white border border-slate-200 rounded p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
            Core Prototype Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border-l-2 border-blue-900 pl-3">
              <p className="text-xs font-bold text-slate-900">Institute Empanelment</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Government admin approval gate before login access.</p>
            </div>
            <div className="border-l-2 border-emerald-600 pl-3">
              <p className="text-xs font-bold text-slate-900">Employer Validation</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Public SMS confirm/deny link for employer verification.</p>
            </div>
            <div className="border-l-2 border-amber-600 pl-3">
              <p className="text-xs font-bold text-slate-900">Longitudinal Follow-up</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Cron-based scheduled checks for 3/6/12 month updates.</p>
            </div>
            <div className="border-l-2 border-indigo-600 pl-3">
              <p className="text-xs font-bold text-slate-900">Skill-Gap Engine</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Keyword rule-matcher matching trainee goal vs course taken.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
