import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Landmark,
  Building2,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Copy,
  Check,
  Users,
  X,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Briefcase,
  AlertTriangle
} from 'lucide-react';

const DEMO_TRAINEES = [
  {
    id: 'APEX-2026-6840',
    pin: '6161',
    name: 'Karan Mehra',
    institute: 'Apex Skill Development Institute (Delhi)',
    course: 'Electrician & Electrical Maintenance',
    status: 'Ongoing Training',
    outcome: 'Enrolled & Training in Progress',
    badgeColor: 'blue',
    goal: 'Become a certified industrial electrician in Delhi NCR'
  },
  {
    id: 'APEX-2026-1001',
    pin: '1234',
    name: 'Rahul Sharma',
    institute: 'Apex Skill Development Institute (Pune)',
    course: 'Electrician & Electrical Maintenance',
    status: 'Completed (Salaried)',
    outcome: 'Employed at Tata Power (₹18,000/mo)',
    badgeColor: 'emerald',
    goal: 'Work in power distribution & substations'
  },
  {
    id: 'APEX-2026-1002',
    pin: '1234',
    name: 'Pooja Verma',
    institute: 'Apex Skill Development Institute (Pune)',
    course: 'Web & Full Stack Software Development',
    status: 'Completed (Salaried)',
    outcome: 'Employed at Infosys BPM (₹24,000/mo)',
    badgeColor: 'emerald',
    goal: 'Get an IT job in software development'
  },
  {
    id: 'APEX-2026-1003',
    pin: '1234',
    name: 'Amit Deshmukh',
    institute: 'Apex Skill Development Institute (Pune)',
    course: 'Solar Panel Installation & Maintenance',
    status: 'Completed (Self-Employed)',
    outcome: 'Own Solar Setup Business (₹25,000/mo)',
    badgeColor: 'indigo',
    goal: 'Start my own solar panel maintenance business'
  },
  {
    id: 'APEX-2026-1004',
    pin: '1234',
    name: 'Sneha Patil',
    institute: 'Apex Skill Development Institute (Pune)',
    course: 'Electrician & Electrical Maintenance',
    status: 'Skill-Gap Flagged',
    outcome: 'Searching for Job (Goal mismatch detected)',
    badgeColor: 'amber',
    goal: 'Looking for an IT job in computers & web'
  },
  {
    id: 'APEX-2026-1005',
    pin: '1234',
    name: 'Vikas Kulkarni',
    institute: 'Apex Skill Development Institute (Pune)',
    course: 'Automotive Repair & Two-Wheeler Servicing',
    status: 'Ongoing Training',
    outcome: 'Enrolled (Expected Nov 2026)',
    badgeColor: 'blue',
    goal: 'Work in EV manufacturing unit'
  },
  {
    id: 'NVTC-2026-2001',
    pin: '1234',
    name: 'Arjun Gowda',
    institute: 'National Vocational Training Center (Bangalore)',
    course: 'Web & Full Stack Software Development',
    status: 'Completed (Salaried)',
    outcome: 'Frontend Dev at CloudScale (₹28,000/mo)',
    badgeColor: 'emerald',
    goal: 'Work as a frontend React developer'
  },
  {
    id: 'NVTC-2026-2002',
    pin: '1234',
    name: 'Kavita Rao',
    institute: 'National Vocational Training Center (Bangalore)',
    course: 'General Duty Healthcare Assistant',
    status: 'Completed (Salaried)',
    outcome: 'Healthcare Staff at Apollo Clinic (₹15,000/mo)',
    badgeColor: 'emerald',
    goal: 'Work in a reputed hospital patient care team'
  }
];

const Home = () => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLoginAsTrainee = (trainee) => {
    navigate(`/login?role=trainee&id=${encodeURIComponent(trainee.id)}&pin=${encodeURIComponent(trainee.pin)}`);
  };

  const filteredTrainees = DEMO_TRAINEES.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.institute.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50">
      {/* Official Government Top Banner */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900 shrink-0" />
            <span className="truncate">National Skill Mission Monitoring Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-950 tracking-tight leading-tight">
            Skilling Outcomes & Impact-Tracking Platform
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            A unified government tracking framework monitoring verified employment outcomes, employer validations, longitudinal follow-ups, and regional skill-gap diagnostics.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/login?role=trainee"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors inline-flex items-center justify-center gap-2"
            >
              Access Portal Login <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register-institute"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-blue-900 bg-white hover:bg-slate-50 border border-slate-300 rounded shadow-xs transition-colors inline-flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" /> Register New Institute
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Credentials Box */}
      <section className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-4 sm:-mt-6">
        <div className="bg-white border-2 border-blue-900/20 rounded-lg p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-900 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-serif">
                Evaluation & Demonstration Credentials
              </h2>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              Pre-seeded accounts ready for prototype testing & judging
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Trainee Credentials */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" /> 1. Skill Trainee
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowMoreModal(true)}
                      className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                      title="View all 8 demo student IDs with different outcome states"
                    >
                      <Users className="w-3 h-3" /> More Users
                    </button>
                    <Link
                      to="/login?role=trainee&id=APEX-2026-6840&pin=6161"
                      className="text-[11px] font-semibold text-emerald-800 hover:underline inline-flex items-center gap-0.5"
                    >
                      Login <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <div className="mt-2.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-emerald-100">
                    <span className="text-slate-500 font-mono text-[11px]">ID:</span>
                    <span className="font-mono font-bold text-slate-900">APEX-2026-6840</span>
                    <button
                      onClick={() => copyToClipboard('APEX-2026-6840', 'trainee_id')}
                      className="text-slate-400 hover:text-slate-700 p-0.5"
                      title="Copy Trainee ID"
                    >
                      {copiedKey === 'trainee_id' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-emerald-100">
                    <span className="text-slate-500 font-mono text-[11px]">PIN:</span>
                    <span className="font-mono font-bold text-slate-900">6161</span>
                    <button
                      onClick={() => copyToClipboard('6161', 'trainee_pin')}
                      className="text-slate-400 hover:text-slate-700 p-0.5"
                      title="Copy PIN"
                    >
                      {copiedKey === 'trainee_pin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-900">
                <span className="truncate">Candidate: Karan Mehra</span>
                <button
                  onClick={() => setShowMoreModal(true)}
                  className="text-emerald-700 font-bold hover:underline shrink-0 ml-1"
                >
                  +7 More Profiles
                </button>
              </div>
            </div>

            {/* Institute Credentials */}
            <div className="bg-blue-50/50 border border-blue-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" /> 2. Training Institute
                  </span>
                  <Link
                    to="/login?role=teacher&email=apex.delhi@skills.gov.in&pass=TeacherSecurePass2026!"
                    className="text-[11px] font-semibold text-blue-800 hover:underline inline-flex items-center gap-0.5"
                  >
                    Login <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="mt-2.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-blue-100">
                    <span className="text-slate-500 font-mono text-[11px]">Email:</span>
                    <span className="font-mono font-medium text-slate-900 text-[11px] truncate max-w-[130px] sm:max-w-[150px]">apex.delhi@skills.gov.in</span>
                    <button
                      onClick={() => copyToClipboard('apex.delhi@skills.gov.in', 'teacher_email')}
                      className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0"
                      title="Copy Email"
                    >
                      {copiedKey === 'teacher_email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-blue-100">
                    <span className="text-slate-500 font-mono text-[11px]">Pass:</span>
                    <span className="font-mono font-bold text-slate-900">TeacherSecurePass2026!</span>
                    <button
                      onClick={() => copyToClipboard('TeacherSecurePass2026!', 'teacher_pass')}
                      className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0"
                      title="Copy Password"
                    >
                      {copiedKey === 'teacher_pass' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-blue-900 mt-2 pt-2 border-t border-blue-200/60 truncate">
                Institute: Apex Skill Development Institute (Delhi)
              </p>
            </div>

            {/* Admin Credentials */}
            <div className="bg-rose-50/50 border border-rose-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-700 shrink-0" /> 3. Government Admin
                  </span>
                  <Link
                    to="/login?role=admin&email=admin@gov.in&pass=AdminSecurePassword2026!"
                    className="text-[11px] font-semibold text-rose-800 hover:underline inline-flex items-center gap-0.5"
                  >
                    Login <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="mt-2.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-rose-100">
                    <span className="text-slate-500 font-mono text-[11px]">Email:</span>
                    <span className="font-mono font-bold text-slate-900">admin@gov.in</span>
                    <button
                      onClick={() => copyToClipboard('admin@gov.in', 'admin_email')}
                      className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0"
                      title="Copy Email"
                    >
                      {copiedKey === 'admin_email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white px-2 py-1 rounded border border-rose-100">
                    <span className="text-slate-500 font-mono text-[11px]">Pass:</span>
                    <span className="font-mono font-bold text-slate-900">AdminSecurePassword2026!</span>
                    <button
                      onClick={() => copyToClipboard('AdminSecurePassword2026!', 'admin_pass')}
                      className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0"
                      title="Copy Password"
                    >
                      {copiedKey === 'admin_pass' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-rose-900 mt-2 pt-2 border-t border-rose-200/60 truncate">
                National Directorate • Live Analytics & Approvals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Roles Breakdown Grid (Sequence: Trainee -> Institute -> Admin) */}
      <section className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Platform Roles & Operational Modules
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Structured governance across trainee progression, institute registration, employer feedback, and policy analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Role 1: Trainee */}
          <div className="bg-white rounded border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Conditional Outcome Forms
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 3mo/6mo/12mo Longitudinal Follow-ups
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Goal-Matching Course Recommendations
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/login?role=trainee"
                className="text-xs font-semibold text-blue-900 hover:text-blue-950 inline-flex items-center gap-1"
              >
                Trainee Login <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setShowMoreModal(true)}
                className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                <Users className="w-3 h-3" /> View All Trainees
              </button>
            </div>
          </div>

          {/* Role 2: Training Institute / Teacher */}
          <div className="bg-white rounded border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Auto-Generated ID: INST-YEAR-XXXX
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Consent Form Check & Secure PIN
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> "Call Trainee" Action for Unverified Cases
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
          <div className="bg-white rounded border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Institute Approval & Empanelment
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> District & Course Placement Analytics
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Regional Skill-Gap Demand Intelligence
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
        <div className="mt-8 sm:mt-10 bg-white border border-slate-200 rounded p-5 sm:p-6">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
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

      {/* "MORE USERS" / JUDGES DEMO TRAINEES MODAL */}
      {showMoreModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-serif tracking-tight">
                    Demo Student Accounts Directory
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Pre-configured candidate profiles with diverse outcome & follow-up test states
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMoreModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by student name, ID, course, status, or institute..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-hidden"
                />
              </div>
            </div>

            {/* Trainees List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {filteredTrainees.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No trainee matching "{searchQuery}"
                </div>
              ) : (
                filteredTrainees.map((trainee) => (
                  <div
                    key={trainee.id}
                    className="bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 hover:border-blue-300 transition-all shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 font-serif">
                            {trainee.name}
                          </h4>
                          <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                            {trainee.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                              trainee.badgeColor === 'emerald'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : trainee.badgeColor === 'indigo'
                                ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                : trainee.badgeColor === 'amber'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-blue-50 text-blue-800 border-blue-200'
                            }`}
                          >
                            {trainee.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          <strong>Course:</strong> {trainee.course}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          <strong>Institute:</strong> {trainee.institute}
                        </p>
                        <p className="text-[11px] text-emerald-800 font-medium mt-1">
                          <strong>Outcome:</strong> {trainee.outcome}
                        </p>
                        <p className="text-[11px] text-slate-500 italic mt-0.5">
                          "{trainee.goal}"
                        </p>
                      </div>

                      {/* Action Credentials Box */}
                      <div className="sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded border sm:border-0 border-slate-200 flex flex-col sm:items-end justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-mono text-[11px]">PIN:</span>
                          <span className="font-mono font-bold text-slate-900 bg-white sm:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {trainee.pin}
                          </span>
                          <button
                            onClick={() => copyToClipboard(trainee.id, `modal_id_${trainee.id}`)}
                            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white sm:bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1"
                            title="Copy Trainee ID"
                          >
                            {copiedKey === `modal_id_${trainee.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            Copy ID
                          </button>
                        </div>

                        <button
                          onClick={() => handleLoginAsTrainee(trainee)}
                          className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Login as {trainee.name.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
              <span className="text-[11px]">Clicking <strong>"Login as..."</strong> will pre-fill credentials & open Trainee Portal.</span>
              <button
                onClick={() => setShowMoreModal(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
