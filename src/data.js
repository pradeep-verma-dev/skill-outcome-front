/**
 * DEMO CREDENTIALS & TEST DIRECTORY
 * National Skill Outcomes & Impact-Tracking Platform
 * 
 * This file centralizes all pre-seeded evaluation accounts for Judges & Evaluators.
 */

export const DEMO_ADMIN = {
  role: 'admin',
  title: 'Government Directorate Administrator',
  email: 'admin@gov.in',
  password: 'AdminSecurePassword2026!',
  department: 'National Skill Development & Monitoring Directorate',
  accessLevel: 'Super Administrator / Macro Governance',
  capabilities: [
    'Institute Empanelment Approval & Rejection',
    'National & Multi-District Placement Analytics',
    'Course-Wise Outcome & Salary Diagnostic Dashboards',
    'Regional Skill-Gap Intelligence & Mismatch Reports',
    'Automated 3mo/6mo/12mo Follow-Up Simulation Controls'
  ]
};

export const DEMO_INSTITUTES = [
  {
    name: 'Apex Skill Development Institute',
    email: 'apex.delhi@skills.gov.in',
    password: 'TeacherSecurePass2026!',
    district: 'Pune / Delhi NCR',
    regNo: 'APEX-2024-001',
    status: 'approved',
    coursesOffered: ['Electrician & Electrical Maintenance', 'Web & Full Stack Software Development', 'Solar Panel Installation', 'Automotive Repair'],
    description: 'Premier technical skilling provider with active batches in electrical engineering, software, and solar installation.'
  },
  {
    name: 'National Vocational Training Center',
    email: 'nvtc@skills.gov.in',
    password: 'TeacherSecurePass2026!',
    district: 'Bangalore Urban',
    regNo: 'NVTC-2023-042',
    status: 'approved',
    coursesOffered: ['Web & Full Stack Software Development', 'General Duty Healthcare Assistant', 'Data Entry & Office Operations'],
    description: 'Government-affiliated state skilling center focusing on IT, healthcare nursing, and office operations.'
  },
  {
    name: 'Pragati Technical Academy',
    email: 'pragati@skills.org',
    password: 'TeacherSecurePass2026!',
    district: 'Hyderabad',
    regNo: 'PRAG-2024-118',
    status: 'approved',
    coursesOffered: ['Solar Panel Installation & Maintenance', 'Electrician & Electrical Maintenance'],
    description: 'Green-energy and renewable technologies skilling provider with focus on solar technicians.'
  },
  {
    name: 'Vidyadeep Skill Institute',
    email: 'vidyadeep@skills.gov.in',
    password: 'TeacherSecurePass2026!',
    district: 'Chennai',
    regNo: 'VIDY-2024-305',
    status: 'approved',
    coursesOffered: ['General Duty Healthcare Assistant', 'Data Entry & Office Operations'],
    description: 'Healthcare and vocational nursing partner supporting regional medical centers.'
  },
  {
    name: 'Kushal Bharat Skill Academy',
    email: 'kushal@skills.org',
    password: 'TeacherSecurePass2026!',
    district: 'Ahmedabad',
    regNo: 'KUSH-2024-412',
    status: 'approved',
    coursesOffered: ['Automotive Repair & Two-Wheeler Servicing', 'Solar Panel Installation'],
    description: 'Automotive and EV mechanic training center specializing in 2-wheeler diagnostics.'
  },
  {
    name: 'Surya Skill Foundation',
    email: 'surya@skills.org',
    password: 'TeacherSecurePass2026!',
    district: 'Jaipur',
    regNo: 'SURY-2024-089',
    status: 'pending',
    coursesOffered: ['Solar Panel Installation & Maintenance', 'Electrician'],
    description: 'Applied for empanelment. Pending review in Government Admin approval queue.'
  },
  {
    name: 'Utkarsh Skill Hub',
    email: 'utkarsh@skills.org',
    password: 'TeacherSecurePass2026!',
    district: 'Lucknow',
    regNo: 'UTKR-2024-210',
    status: 'pending',
    coursesOffered: ['Data Entry & Office Operations', 'Healthcare Assistant'],
    description: 'Applied for empanelment. Pending review in Government Admin approval queue.'
  },
  {
    name: 'Dronacharya Technical Institute',
    email: 'dronacharya@skills.org',
    password: 'TeacherSecurePass2026!',
    district: 'Bhopal',
    regNo: 'DRON-2024-519',
    status: 'pending',
    coursesOffered: ['Automotive Repair & Two-Wheeler Servicing'],
    description: 'Applied for empanelment. Pending review in Government Admin approval queue.'
  }
];

export const DEMO_TRAINEES = [
  {
    id: 'APEX-2026-6840',
    pin: '6161',
    name: 'Karan Mehra',
    institute: 'Apex Skill Development Institute',
    district: 'Delhi NCR',
    course: 'Electrician & Electrical Maintenance',
    status: 'Ongoing Training',
    outcome: 'Active Batch (Expected Sep 2026)',
    badgeColor: 'blue',
    goal: 'Become a certified industrial electrician in Delhi NCR'
  },
  {
    id: 'APEX-2026-1001',
    pin: '1234',
    name: 'Rahul Sharma',
    institute: 'Apex Skill Development Institute',
    district: 'Pune',
    course: 'Electrician & Electrical Maintenance',
    status: 'Completed (Salaried)',
    outcome: 'Employed at Mahindra EPC Power Systems (₹20-30k/mo - Verified)',
    badgeColor: 'emerald',
    goal: 'Become a certified industrial electrician'
  },
  {
    id: 'APEX-2026-1002',
    pin: '1234',
    name: 'Pooja Verma',
    institute: 'Apex Skill Development Institute',
    district: 'Pune',
    course: 'Web & Full Stack Software Development',
    status: 'Completed (Salaried)',
    outcome: 'Employed at Infosys BPM Tech Services (₹30k+/mo - Pending Verification)',
    badgeColor: 'emerald',
    goal: 'Get an IT job in software development'
  },
  {
    id: 'APEX-2026-1003',
    pin: '1234',
    name: 'Amit Deshmukh',
    institute: 'Apex Skill Development Institute',
    district: 'Pune',
    course: 'Solar Panel Installation & Maintenance',
    status: 'Completed (Self-Employed)',
    outcome: 'Own Business: Solar Rooftop Consultancy & Installation (Growing)',
    badgeColor: 'indigo',
    goal: 'Start my own solar panel maintenance business'
  },
  {
    id: 'APEX-2026-1004',
    pin: '1234',
    name: 'Sneha Patil',
    institute: 'Apex Skill Development Institute',
    district: 'Pune',
    course: 'Electrician & Electrical Maintenance',
    status: 'Skill-Gap Flagged',
    outcome: 'Searching for Job (Mismatch: Course = Electrician, Goal = Computers & Web)',
    badgeColor: 'amber',
    goal: 'Looking for an IT job in computers & web'
  },
  {
    id: 'APEX-2026-1005',
    pin: '1234',
    name: 'Vikas Kulkarni',
    institute: 'Apex Skill Development Institute',
    district: 'Pune',
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
    institute: 'National Vocational Training Center',
    district: 'Bangalore Urban',
    course: 'Web & Full Stack Software Development',
    status: 'Action Required',
    outcome: 'Salaried at CloudScale Technologies (Teacher Follow-up Flagged)',
    badgeColor: 'amber',
    goal: 'Work as a frontend React developer'
  },
  {
    id: 'NVTC-2026-2002',
    pin: '1234',
    name: 'Kavita Rao',
    institute: 'National Vocational Training Center',
    district: 'Bangalore Urban',
    course: 'General Duty Healthcare Assistant',
    status: 'Completed (Apprenticeship)',
    outcome: 'Apprenticeship at Apollo Health City Hospital (1 Year)',
    badgeColor: 'purple',
    goal: 'Work in a reputed hospital patient care team'
  },
  {
    id: 'NVTC-2026-2003',
    pin: '1234',
    name: 'Manoj Kumar',
    institute: 'National Vocational Training Center',
    district: 'Bangalore Urban',
    course: 'Data Entry & Office Operations',
    status: 'Searching',
    outcome: 'Actively searching (Reported low salary offers)',
    badgeColor: 'slate',
    goal: 'Office administration or clerk job'
  },
  {
    id: 'PRAG-2026-3001',
    pin: '1234',
    name: 'Suresh Reddy',
    institute: 'Pragati Technical Academy',
    district: 'Hyderabad',
    course: 'Solar Panel Installation & Maintenance',
    status: 'Completed (Salaried)',
    outcome: 'Employed at Tata Power Solar (₹10-20k/mo - Verified)',
    badgeColor: 'emerald',
    goal: 'Solar technician in renewable energy sector'
  },
  {
    id: 'PRAG-2026-3002',
    pin: '1234',
    name: 'Deepika Nair',
    institute: 'Pragati Technical Academy',
    district: 'Hyderabad',
    course: 'Electrician & Electrical Maintenance',
    status: 'Skill-Gap Flagged',
    outcome: 'Searching (Goal: Drone technology operations)',
    badgeColor: 'amber',
    goal: 'Drone technology operations'
  },
  {
    id: 'VIDY-2026-4001',
    pin: '1234',
    name: 'Ananya Sundaram',
    institute: 'Vidyadeep Skill Institute',
    district: 'Chennai',
    course: 'General Duty Healthcare Assistant',
    status: 'Completed (Salaried)',
    outcome: 'Employed at Fortis Healthcare Chennai (₹20-30k/mo - Verified)',
    badgeColor: 'emerald',
    goal: 'Senior patient care and ICU assistant'
  },
  {
    id: 'KUSH-2026-5001',
    pin: '1234',
    name: 'Hardik Patel',
    institute: 'Kushal Bharat Skill Academy',
    district: 'Ahmedabad',
    course: 'Automotive Repair & Two-Wheeler Servicing',
    status: 'Completed (Self-Employed)',
    outcome: 'Business: Two-Wheeler Multi-brand EV Service Center',
    badgeColor: 'indigo',
    goal: 'Automotive maintenance workshop owner'
  }
];

export default {
  DEMO_ADMIN,
  DEMO_INSTITUTES,
  DEMO_TRAINEES
};
