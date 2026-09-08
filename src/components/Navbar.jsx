import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Building2, UserCheck, LogOut, Landmark, User, FileText, CheckCircle2 } from 'lucide-react';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Official Top Accent Ribbon */}
      <div className="gov-top-ribbon"></div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Emblem Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-blue-950 text-white flex items-center justify-center border border-blue-900 shadow-xs group-hover:bg-blue-900 transition-colors shrink-0">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-serif truncate">
                  SKILL IMPACT
                </span>
                <span className="hidden xs:inline text-[9px] sm:text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium border border-slate-200 shrink-0">
                  NATIONAL
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 font-medium truncate">
                Directorate of Skill Outcomes & Impact
              </p>
            </div>
          </Link>

          {/* Right Navigation & User Role Section */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Role Badge */}
                <div className="hidden md:flex flex-col items-end text-right">
                  <div className="flex items-center gap-1.5">
                    {role === 'admin' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                        <ShieldCheck className="w-3 h-3 text-rose-600" /> Govt Admin
                      </span>
                    )}
                    {role === 'teacher' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                        <Building2 className="w-3 h-3 text-blue-600" /> Institute
                      </span>
                    )}
                    {role === 'trainee' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <UserCheck className="w-3 h-3 text-emerald-600" /> Trainee ({user.uniqueId})
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-700 font-medium truncate max-w-[160px]">
                    {user.name}
                  </span>
                </div>

                {/* Dashboard Shortcut */}
                {role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                {role === 'teacher' && (
                  <Link
                    to="/teacher"
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                {role === 'trainee' && (
                  <Link
                    to="/trainee"
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
                  >
                    My Portal
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors cursor-pointer"
                  title="Logout from portal"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/register-institute"
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-blue-900 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors whitespace-nowrap"
                >
                  <span className="sm:inline hidden">Institute </span>Registration
                </Link>
                <Link
                  to="/login"
                  className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded shadow-xs transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
