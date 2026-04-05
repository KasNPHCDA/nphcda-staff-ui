import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Award, 
  CreditCard, 
  Shield, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileText, 
  UserPlus, 
  TrendingUp, 
  LayoutDashboard, 
  Search, 
  Filter, 
  Download, 
  AlertCircle, 
  Briefcase, 
  BookOpen, 
  History, 
  Laptop 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Toaster, toast } from 'sonner';

// --- Types & Constants ---

type Role = 'super_admin' | 'dept_admin' | 'staff';

interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string;
  department: string;
  staffId: string;
}

const ROLES: Record<Role, { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-red-500' },
  dept_admin: { label: 'Dept Admin', color: 'bg-blue-500' },
  staff: { label: 'Field Staff', color: 'bg-emerald-500' },
};

const MOCK_USERS: Record<Role, User> = {
  super_admin: {
    id: '1',
    name: 'Dr. Faisal Shuaib',
    role: 'super_admin',
    email: 'executive.director@nphcda.gov.ng',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/36d7ece0-5c36-41bd-a679-88f65dbd21a0/staff-avatar-2-c7cff05c-1775423105504.webp',
    department: 'Executive Office',
    staffId: 'NPHCDA/DIR/001'
  },
  dept_admin: {
    id: '2',
    name: 'Mrs. Amina Yusuf',
    role: 'dept_admin',
    email: 'amina.yusuf@nphcda.gov.ng',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/36d7ece0-5c36-41bd-a679-88f65dbd21a0/staff-avatar-1-1b160816-1775423105653.webp',
    department: 'HR & Administration',
    staffId: 'NPHCDA/HR/042'
  },
  staff: {
    id: '3',
    name: 'John Okafor',
    role: 'staff',
    email: 'john.okafor@nphcda.gov.ng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    department: 'Disease Control',
    staffId: 'NPHCDA/FIELD/892'
  }
};

// --- Main App Component ---

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Login simulation
  const handleLogin = (role: Role) => {
    setCurrentUser(MOCK_USERS[role]);
    toast.success(`Logged in as ${MOCK_USERS[role].name} (${ROLES[role].label})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast.info('Logged out successfully');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">NPHCDA</h1>
            <p className="text-slate-600 mt-2">Staff Management System Portal</p>
          </div>
          
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Select a portal role to preview the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => handleLogin('super_admin')} 
                className="w-full justify-start gap-4 h-14 bg-slate-900 hover:bg-slate-800 transition-all"
              >
                <div className="bg-red-500/20 p-2 rounded-lg"><Shield className="w-5 h-5 text-red-500" /></div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Super Admin Portal</div>
                  <div className="text-xs text-slate-400">Global System Control & Analytics</div>
                </div>
              </Button>
              <Button 
                onClick={() => handleLogin('dept_admin')} 
                variant="outline"
                className="w-full justify-start gap-4 h-14 hover:bg-slate-50 transition-all"
              >
                <div className="bg-blue-500/20 p-2 rounded-lg"><Briefcase className="w-5 h-5 text-blue-500" /></div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Departmental Admin</div>
                  <div className="text-xs text-slate-400">HR, Approvals & Team Management</div>
                </div>
              </Button>
              <Button 
                onClick={() => handleLogin('staff')} 
                variant="outline"
                className="w-full justify-start gap-4 h-14 hover:bg-slate-50 transition-all"
              >
                <div className="bg-emerald-500/20 p-2 rounded-lg"><Users className="w-5 h-5 text-emerald-500" /></div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Staff Self-Service</div>
                  <div className="text-xs text-slate-400">Profile, Leave, Check-in & Payroll</div>
                </div>
              </Button>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-xs text-slate-400">
            &copy; 2024 National Primary Health Care Development Agency. Secure System.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-slate-900 text-white flex flex-col fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out"
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div 
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="bg-emerald-500 p-1.5 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">NPHCDA</span>
              </motion.div>
            ) : (
              <motion.div 
                key="logo-small"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-500 p-1.5 rounded-lg mx-auto"
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} collapsed={!isSidebarOpen} />
            
            {currentUser.role !== 'staff' && (
              <SidebarItem icon={<Users size={20} />} label="Staff Directory" active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} collapsed={!isSidebarOpen} />
            )}
            
            <SidebarItem icon={<Calendar size={20} />} label="Attendance" active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} collapsed={!isSidebarOpen} />
            <SidebarItem icon={<FileText size={20} />} label="Leave Management" active={activeTab === 'leave'} onClick={() => setActiveTab('leave')} collapsed={!isSidebarOpen} />
            <SidebarItem icon={<TrendingUp size={20} />} label="Performance" active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} collapsed={!isSidebarOpen} />
            <SidebarItem icon={<BookOpen size={20} />} label="Training" active={activeTab === 'training'} onClick={() => setActiveTab('training')} collapsed={!isSidebarOpen} />
            <SidebarItem icon={<CreditCard size={20} />} label="Allowances" active={activeTab === 'allowances'} onClick={() => setActiveTab('allowances')} collapsed={!isSidebarOpen} />
            
            {currentUser.role === 'super_admin' && (
              <>
                <div className="pt-4 pb-2">
                  <div className={`text-[10px] uppercase font-bold text-slate-500 tracking-wider ${!isSidebarOpen ? 'text-center' : 'px-4'}`}>System</div>
                </div>
                <SidebarItem icon={<BarChart3 size={20} />} label="Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} collapsed={!isSidebarOpen} />
                <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} collapsed={!isSidebarOpen} />
              </>
            )}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex"
            >
              <Menu className="w-5 h-5 text-slate-500" />
            </Button>
            <div className="lg:hidden">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab}</h2>
              <p className="text-xs text-slate-500">{ROLES[currentUser.role].label} Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <Input className="bg-slate-50 border-none w-64 pl-10 h-10 rounded-full text-sm" placeholder="Search staff, projects..." />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-900">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500">{currentUser.staffId}</div>
              </div>
              <Avatar className="h-10 w-10 border-2 border-slate-100 ring-2 ring-emerald-500/10">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dynamic Dashboard Views */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + currentUser.role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <OverviewView user={currentUser} />}
              {activeTab === 'attendance' && <AttendanceView user={currentUser} />}
              {activeTab === 'leave' && <LeaveView user={currentUser} />}
              {activeTab === 'directory' && <DirectoryView user={currentUser} />}
              {activeTab === 'performance' && <PerformanceView user={currentUser} />}
              {activeTab === 'training' && <TrainingView user={currentUser} />}
              {activeTab === 'allowances' && <AllowancesView user={currentUser} />}
              {activeTab === 'reports' && <ReportsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Components & Views ---

function SidebarItem({ icon, label, active, onClick, collapsed }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, collapsed: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
        ${active 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }
        ${collapsed ? 'justify-center' : ''}
      `}
    >
      <span className={active ? 'text-white' : 'text-slate-400'}>{icon}</span>
      {!collapsed && <span className="font-medium text-sm">{label}</span>}
    </button>
  );
}

function StatsCard({ title, value, trend, icon, color }: { title: string, value: string, trend?: string, icon: React.ReactNode, color: string }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            {trend && (
              <p className={`text-xs mt-2 flex items-center gap-1 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend} from last month
              </p>
            )}
          </div>
          <div className={`${color} p-3 rounded-xl text-white shadow-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Specific Dashboard Views ---

function OverviewView({ user }: { user: User }) {
  if (user.role === 'super_admin') {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Staff" value="12,482" trend="+124" icon={<Users size={20} />} color="bg-blue-600" />
          <StatsCard title="Active Projects" value="48" trend="+3" icon={<Briefcase size={20} />} color="bg-emerald-600" />
          <StatsCard title="Average Performance" value="84%" trend="+1.2%" icon={<TrendingUp size={20} />} color="bg-purple-600" />
          <StatsCard title="Pending Approvals" value="156" trend="-12" icon={<Clock size={20} />} color="bg-amber-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Staff Strength by Zone</CardTitle>
                <CardDescription>Regional distribution of NPHCDA workforce</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download size={16} className="w-4 h-4" /> Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2 pt-10 px-4">
                {[
                  { label: 'NC', val: 80, color: 'bg-emerald-500' },
                  { label: 'NE', val: 65, color: 'bg-emerald-400' },
                  { label: 'NW', val: 95, color: 'bg-emerald-600' },
                  { label: 'SE', val: 55, color: 'bg-emerald-300' },
                  { label: 'SS', val: 70, color: 'bg-emerald-500' },
                  { label: 'SW', val: 85, color: 'bg-emerald-600' },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-col items-center gap-3 flex-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.val}%` }}
                      className={`w-full rounded-t-lg ${bar.color} opacity-80 hover:opacity-100 transition-all`}
                    ></motion.div>
                    <span className="text-xs font-bold text-slate-500">{bar.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'License Renewal', desc: '14 nurses in Kaduna have expiring licenses', type: 'warning' },
                { title: 'Training Milestone', desc: 'Gavi immunization program 90% complete', type: 'success' },
                { title: 'Policy Update', desc: 'New civil service rules for maternity leave', type: 'info' },
                { title: 'Budget Alert', desc: 'Project DSA overages in Zone NW', type: 'error' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <AlertCircle className={`w-5 h-5 shrink-0 ${
                    alert.type === 'warning' ? 'text-amber-500' :
                    alert.type === 'success' ? 'text-emerald-500' :
                    alert.type === 'error' ? 'text-red-500' : 'text-blue-500'
                  }`} />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{alert.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{alert.desc}</div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-emerald-600 text-xs mt-2">View All System Alerts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (user.role === 'dept_admin') {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[1]}</h1>
            <p className="text-emerald-100 mt-2 max-w-md">Your department has 12 pending leave requests and 5 staff members awaiting performance reviews this week.</p>
            <div className="mt-8 flex gap-4">
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50 border-none px-6">Manage Team</Button>
              <Button variant="outline" className="border-emerald-400 text-white hover:bg-emerald-500/20 px-6">View Reports</Button>
            </div>
          </div>
          <Shield size={256} className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Action Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="bg-amber-100 p-2 rounded-xl text-amber-600"><Calendar size={20} /></div>
                  <div className="font-semibold text-sm">Leave Approvals</div>
                </div>
                <Badge className="bg-amber-500">12</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><TrendingUp size={20} /></div>
                  <div className="font-semibold text-sm">Performance Reviews</div>
                </div>
                <Badge className="bg-blue-500">5</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="bg-purple-100 p-2 rounded-xl text-purple-600"><Award size={20} /></div>
                  <div className="font-semibold text-sm">Training Nominees</div>
                </div>
                <Badge className="bg-purple-500">8</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: 'Bala Mohammed', action: 'Applied for Annual Leave', time: '2 hours ago', status: 'Pending' },
                  { user: 'Chioma Obi', action: 'Completed Vaccinology Training', time: '5 hours ago', status: 'Verified' },
                  { user: 'Ibrahim L.', action: 'Checked in at Katsina Zonal Office', time: '08:42 AM', status: 'On-site' },
                  { user: 'Sarah J.', action: 'Submitted Q3 Performance Review', time: 'Yesterday', status: 'Review Needed' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">{act.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{act.user}</div>
                        <div className="text-xs text-slate-500">{act.action}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">{act.time}</div>
                      <Badge variant="outline" className="text-[10px] h-5 px-2 mt-1">{act.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default Staff Overview
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden">
            <div className="h-24 bg-emerald-600"></div>
            <CardContent className="pt-0 relative px-6 pb-6">
              <div className="flex justify-center -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-slate-900">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{user.staffId}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="border-slate-700 text-slate-300">Grade Level 12</Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-300">{user.department}</Badge>
                </div>
              </div>
              <div className="mt-8 space-y-3 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Employment Status</span>
                  <span className="text-emerald-400 font-medium">Permanent</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Current Posting</span>
                  <span className="text-white font-medium text-right">Kaduna Zonal Office</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">License Expiry</span>
                  <span className="text-amber-400 font-medium">Dec 12, 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">Assigned Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg shadow-sm"><Laptop size={16} className="text-slate-600" /></div>
                <div>
                  <div className="text-xs font-bold">HP EliteBook 840</div>
                  <div className="text-[10px] text-slate-400">SN: CN43210-9X</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg shadow-sm"><Laptop size={16} className="text-slate-600" /></div>
                <div>
                  <div className="text-xs font-bold">Infinix Note 12 (Field)</div>
                  <div className="text-[10px] text-slate-400">IMEI: 86142...</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-emerald-50 border-l-4 border-l-emerald-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-emerald-800">Leave Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-emerald-900">18</span>
                    <span className="text-emerald-700 text-sm ml-2">days remaining</span>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs">Apply Now</Button>
                </div>
                <Progress value={60} className="mt-4 h-2 bg-emerald-200" />
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm bg-blue-50 border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-800">Next Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-blue-900 text-sm">Advanced PHC Logistics</div>
                <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <Calendar size={12} className="w-3 h-3" /> Oct 24 - 26, 2024
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge className="bg-blue-600">Enrolled</Badge>
                  <span className="text-[10px] text-blue-400 italic">Certificate Pending</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work History</CardTitle>
              <History size={20} className="text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {[
                  { title: 'Promotion to Senior Health Officer', date: 'January 2023', icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
                  { title: 'Transferred to Kaduna Zonal Office', date: 'June 2022', icon: <MapPin size={16} className="text-blue-500" /> },
                  { title: 'Completed Gavi Immunization Training', date: 'March 2022', icon: <Award size={16} className="text-purple-500" /> },
                  { title: 'Appointment Confirmed', date: 'August 2021', icon: <FileText size={16} className="text-amber-500" /> },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1.5 p-1 bg-white ring-4 ring-slate-50 rounded-full z-10">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Placeholder views for other tabs

function AttendanceView({ user }: { user: User }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  
  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
    toast.success(isCheckedIn ? 'Checked out successfully' : 'Checked in at HQ (9.05° N, 7.49° E)');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-12 text-center text-white relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10">
            <Clock size={64} className="text-emerald-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-black mb-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
            <p className="text-slate-400 mb-8">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <Button 
              size="lg" 
              onClick={handleCheckIn}
              className={`h-16 w-64 rounded-full text-lg font-bold shadow-2xl transition-all active:scale-95 ${
                isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {isCheckedIn ? 'End Shift (Check Out)' : 'Start Shift (Check In)'}
            </Button>
            <p className="text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
              <MapPin size={12} className="w-3 h-3" /> Abuja Headquarters • Auto-geofenced
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Today', 'Yesterday', 'Oct 18', 'Oct 17', 'Oct 16'].map((day, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-medium text-sm text-slate-900">{day}</div>
                  <div className="flex gap-4 items-center">
                    <div className="text-xs text-slate-500">08:30 - 17:00</div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none">Present</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Location Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
              <div className="text-center">
                <MapPin size={32} className="text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Map view restricted to Admin and supervisors</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Last Known Location</span>
                <span className="font-bold">National Primary Health Care Agency, Garki</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Accuracy</span>
                <span className="text-emerald-600 font-bold">± 5 meters</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LeaveView({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Leave Management</h2>
          <p className="text-slate-500 text-sm">Track your leave balances and history</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">Request New Leave</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Annual Leave', total: 30, used: 12, color: 'emerald' },
          { label: 'Sick Leave', total: 14, used: 2, color: 'red' },
          { label: 'Study Leave', total: 180, used: 0, color: 'blue' },
          { label: 'Casual Leave', total: 7, used: 3, color: 'amber' },
        ].map((leave, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{leave.label}</div>
              <div className="mt-4 flex items-end justify-between">
                <div className="text-2xl font-black text-slate-900">{leave.total - leave.used}</div>
                <div className="text-xs text-slate-400">of {leave.total} days</div>
              </div>
              <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${leave.color}-500`} 
                  style={{ width: `${((leave.total - leave.used) / leave.total) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">Recent Leave Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-y border-slate-100">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500">TYPE</th>
                <th className="p-4 text-xs font-bold text-slate-500">DURATION</th>
                <th className="p-4 text-xs font-bold text-slate-500">STATUS</th>
                <th className="p-4 text-xs font-bold text-slate-500">APPROVED BY</th>
                <th className="p-4 text-xs font-bold text-slate-500">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { type: 'Annual Leave', duration: 'Oct 1 - Oct 14, 2024 (14 days)', status: 'Approved', approver: 'Amina Yusuf' },
                { type: 'Sick Leave', duration: 'Aug 12, 2024 (1 day)', status: 'Approved', approver: 'System' },
                { type: 'Casual Leave', duration: 'Jan 5 - Jan 8, 2024 (3 days)', status: 'Rejected', approver: 'Amina Yusuf' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-sm">{row.type}</td>
                  <td className="p-4 text-sm text-slate-600">{row.duration}</td>
                  <td className="p-4">
                    <Badge className={row.status === 'Approved' ? 'bg-emerald-500' : 'bg-red-500'}>{row.status}</Badge>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{row.approver}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="text-emerald-600">Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function DirectoryView({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Staff Directory</h2>
          <p className="text-slate-500 text-sm">Managing {user.role === 'dept_admin' ? 'your department' : 'all agency'} personnel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Filter size={16} /> Filter</Button>
          <Button className="bg-slate-900 gap-2"><UserPlus size={16} /> Add New Staff</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <Card key={i} className="border-none shadow-sm group hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">S{i}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-slate-900">Staff Member {i}</div>
                  <div className="text-xs text-slate-500">Senior Nurse Practitioner</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-[11px]">
                <div>
                  <div className="text-slate-400 uppercase font-bold tracking-tighter">ID</div>
                  <div className="font-semibold text-slate-900 mt-1">NPHCDA/24/00{i}</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase font-bold tracking-tighter">Status</div>
                  <div className="flex items-center gap-1 mt-1 text-emerald-600 font-bold">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Active
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1 text-xs">View Profile</Button>
                <Button variant="ghost" size="sm" className="flex-1 text-xs">Quick Action</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PerformanceView({ user }: { user: User }) {
  return (
    <div className="space-y-8">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
              <CardDescription>Fiscal Year 2024 Progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {[
                { label: 'Immunization Campaign Coverage', val: 82, target: 95, color: 'bg-emerald-500' },
                { label: 'PHC Staff Training Participation', val: 92, target: 100, color: 'bg-blue-500' },
                { label: 'Report Submission Accuracy', val: 68, target: 100, color: 'bg-amber-500' },
                { label: 'Donor Fund Utilization', val: 45, target: 90, color: 'bg-purple-500' },
              ].map((kpi, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-bold text-slate-800">{kpi.label}</div>
                    <div className="text-xs font-medium text-slate-500">{kpi.val}% / {kpi.target}%</div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${kpi.val}%` }}
                      className={`h-full ${kpi.color}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Review History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { period: 'Annual Review 2023', score: '4.8/5.0', grade: 'A+', reviewer: 'Amina Yusuf' },
                  { period: 'Q3 Review 2023', score: '4.5/5.0', grade: 'A', reviewer: 'Amina Yusuf' },
                  { period: 'Q2 Review 2023', score: '4.2/5.0', grade: 'B+', reviewer: 'System Auto' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div>
                      <div className="text-sm font-bold">{row.period}</div>
                      <div className="text-xs text-slate-500 mt-1">Reviewed by {row.reviewer}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-600">{row.score}</div>
                      <Badge className="bg-emerald-50 text-emerald-600 border-none h-5">{row.grade}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white text-lg">Next Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-4xl font-black text-emerald-500">12</div>
                <div className="text-xs text-slate-400 mt-2 uppercase tracking-widest">Days Until Q4 Review</div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Submit Self-Appraisal</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Competency Matrix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Leadership', 'Technical Skill', 'Punctuality', 'Collaboration'].map((skill, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">{skill}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <div key={star} className={`w-2 h-2 rounded-full ${star <= (4-i%2) ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TrainingView({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Training & Capacity Building</h2>
          <p className="text-slate-500 text-sm">Elevating skills for better healthcare delivery</p>
        </div>
        <Button className="bg-emerald-600">Browse Catalog</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Cold Chain Management', hours: '24 hrs', status: 'In Progress', progress: 65, color: 'bg-blue-600' },
          { title: 'Public Health Leadership', hours: '40 hrs', status: 'Nominated', progress: 0, color: 'bg-purple-600' },
          { title: 'Data Management for PHC', hours: '12 hrs', status: 'Completed', progress: 100, color: 'bg-emerald-600' },
        ].map((course, i) => (
          <Card key={i} className="border-none shadow-sm hover:translate-y-[-4px] transition-transform">
            <div className={`h-3 ${course.color}`}></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-slate-900 leading-tight pr-4">{course.title}</h3>
                <Badge variant="outline" className="shrink-0">{course.hours}</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-slate-400">{course.status}</span>
                  <Button size="sm" variant={course.status === 'Completed' ? 'outline' : 'default'} className="h-8 text-[10px]">
                    {course.status === 'Completed' ? 'View Certificate' : 'Continue'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AllowancesView({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Pending Allowances" value="₦450,000" icon={<Clock size={20} />} color="bg-amber-600" />
        <StatsCard title="Total Paid (YTD)" value="₦2,840,000" icon={<CheckCircle2 size={20} />} color="bg-emerald-600" />
        <StatsCard title="Projected DSA" value="₦120,000" icon={<TrendingUp size={20} />} color="bg-blue-600" />
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Allowance Claims</CardTitle>
          <Button className="bg-emerald-600 h-9">New Claim Request</Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <table className="w-full text-left">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500">PROJECT</th>
                  <th className="p-4 text-xs font-bold text-slate-500">TYPE</th>
                  <th className="p-4 text-xs font-bold text-slate-500">AMOUNT</th>
                  <th className="p-4 text-xs font-bold text-slate-500">STATUS</th>
                  <th className="p-4 text-xs font-bold text-slate-500">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { project: 'Polio Eradication Initiative', type: 'DSA (3 Nights)', amount: '₦135,000', status: 'Paid', date: 'Oct 12, 2024' },
                  { project: 'Maternal Health Survey', type: 'Field Allowance', amount: '₦75,000', status: 'Processing', date: 'Oct 20, 2024' },
                  { project: 'Immunization Scale-up', type: 'Transport', amount: '₦40,000', status: 'Approved', date: 'Oct 22, 2024' },
                  { project: 'Routine Outreach', type: 'DSA (2 Nights)', amount: '₦90,000', status: 'Pending', date: 'Oct 25, 2024' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-bold">{row.project}</td>
                    <td className="p-4 text-xs text-slate-600">{row.type}</td>
                    <td className="p-4 text-sm font-black text-slate-900">{row.amount}</td>
                    <td className="p-4">
                      <Badge className={
                        row.status === 'Paid' ? 'bg-emerald-500' : 
                        row.status === 'Processing' ? 'bg-blue-500' :
                        row.status === 'Approved' ? 'bg-amber-500' : 'bg-slate-400'
                      }>{row.status}</Badge>
                    </td>
                    <td className="p-4 text-[10px] text-slate-400 uppercase">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-slate-500 text-sm">System-wide data visualization and intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download size={16} /> Download All</Button>
          <Button className="bg-emerald-600">Generate Custom Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Staff Distribution by Cadre</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full border-[20px] border-emerald-500 flex items-center justify-center">
               <div className="absolute inset-[-20px] w-48 h-48 rounded-full border-[20px] border-blue-500 border-t-transparent border-r-transparent rotate-45"></div>
               <div className="absolute inset-[-20px] w-48 h-48 rounded-full border-[20px] border-amber-500 border-b-transparent border-l-transparent -rotate-12"></div>
               <div className="text-center">
                 <div className="text-3xl font-black text-slate-900">12k+</div>
                 <div className="text-[10px] text-slate-500 uppercase font-bold">Total Personnel</div>
               </div>
            </div>
            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 bg-emerald-500 rounded"></div> Nursing (45%)</div>
              <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 bg-blue-500 rounded"></div> Admin (30%)</div>
              <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 bg-amber-500 rounded"></div> Medical (25%)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Personnel Cost Trend (Projects)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-end justify-between gap-1 pt-4">
              {[40, 60, 45, 90, 75, 55, 80, 65, 95, 85, 100, 90].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                   <div className="text-[8px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">₦{v}M</div>
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    className="w-full bg-slate-900 rounded-sm hover:bg-emerald-500 transition-colors"
                   ></motion.div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] text-slate-400 font-bold">
              <span>JAN</span>
              <span>JUN</span>
              <span>DEC</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-sm">
           <CardHeader className="pb-2"><CardTitle className="text-sm">Turnover Rate</CardTitle></CardHeader>
           <CardContent><div className="text-2xl font-black text-red-500">2.4%</div><p className="text-[10px] text-slate-500 mt-1">Below industry average (4.5%)</p></CardContent>
        </Card>
        <Card className="border-none shadow-sm">
           <CardHeader className="pb-2"><CardTitle className="text-sm">Vacancy Rate</CardTitle></CardHeader>
           <CardContent><div className="text-2xl font-black text-amber-500">14.8%</div><p className="text-[10px] text-slate-500 mt-1">452 positions open for recruitment</p></CardContent>
        </Card>
        <Card className="border-none shadow-sm">
           <CardHeader className="pb-2"><CardTitle className="text-sm">Training Impact</CardTitle></CardHeader>
           <CardContent><div className="text-2xl font-black text-emerald-500">+22%</div><p className="text-[10px] text-slate-500 mt-1">Efficiency increase post-Gavi training</p></CardContent>
        </Card>
      </div>
    </div>
  );
}