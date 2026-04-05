# NPHCDA Staff Management System - Implementation Plan

## 1. System Architecture
- **Frontend**: React 19 (Vite, TypeScript, Tailwind CSS, Framer Motion, Shadcn/UI).
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions).
- **Security**: RBAC, Row Level Security (RLS), Data encryption.
- **Offline Capability**: Progressive Web App (PWA) considerations with local state syncing.

## 2. Core Modules
1. **Auth & Identity**: Role-based access (Super Admin, Dept Admin, Staff).
2. **Staff Database**: Centralized registry for personal, career, and asset data.
3. **Attendance & Leave**: Geolocation-based check-in and leave approval workflows.
4. **Performance & Training**: KPI setting, reviews, and training certifications.
5. **Payroll (Allowances)**: Project-based allowance tracking (DSA, field).
6. **Reporting**: Multi-level dashboards with export capabilities.

## 3. Database Schema (Supabase/Postgres)
- `profiles`: Core user data and roles.
- `staff_details`: Extended biodata, qualifications, and employment history.
- `attendance`: Daily logs with lat/long and timestamps.
- `leave_requests`: Type, dates, status, and approval tracking.
- `kpis`: Individual and departmental performance metrics.
- `performance_reviews`: Quarterly/annual evaluations.
- `training_programs`: Catalog and enrollment records.
- `allowances`: DSA and project-based financial records.
- `assets`: Digital and physical assets assigned to staff.

## 4. User Journeys
1. **Field Officer (Leave Request)**: Dashboard -> Leave Module -> Fill Form -> Submit (Automatic notification to Supervisor).
2. **HR Officer (Promotion)**: Search Staff -> Career History -> Edit Grade Level -> Upload Letter -> Audit Trail update.
3. **Director (Report)**: Dashboard -> Reports -> Filter by Zone/Cadre -> Export to PDF/Excel.

## 5. Implementation Roadmap
- **Phase 1 (Core)**: Database setup, Auth, Staff Registry, Leave Management.
- **Phase 2 (Performance)**: KPI module, Training catalog, Attendance system.
- **Phase 3 (Integration)**: Advanced Analytics, Payroll integration mock, Offline sync.

## 6. Components to Build
- `layout/DashboardLayout.tsx`: Sidebar, Header, Breadcrumbs.
- `pages/Login.tsx`: Role-based authentication simulation.
- `pages/SuperAdmin/`: Dashboard, User Management, Global Reports.
- `pages/DeptAdmin/`: Team Overview, Leave Approvals, Performance Reviews.
- `pages/Staff/`: Profile, Check-in, Leave Requests, Pay Slips.
- `components/ui/Charts/`: Visualizations for reports.
