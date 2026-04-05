-- NPHCDA Staff Management System - Supabase Schema (PostgreSQL)

-- 1. Profiles (Auth linked)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('super_admin', 'dept_admin', 'staff')) DEFAULT 'staff',
  avatar_url TEXT,
  department_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Departments
CREATE TABLE departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  head_of_department_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add department FK to profiles
ALTER TABLE profiles ADD CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id);

-- 3. Staff Details (Extended Biodata)
CREATE TABLE staff_details (
  profile_id UUID REFERENCES profiles(id) PRIMARY KEY,
  staff_id_number TEXT UNIQUE NOT NULL, -- e.g., NPHCDA/2023/001
  phone TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth DATE,
  state_of_origin TEXT,
  lga_of_origin TEXT,
  
  -- Next of Kin
  nok_name TEXT,
  nok_phone TEXT,
  nok_relationship TEXT,
  nok_address TEXT,
  
  -- Qualifications & Licenses
  highest_qualification TEXT,
  professional_license_number TEXT,
  license_expiry_date DATE,
  
  -- Employment Details
  grade_level INT,
  step INT,
  cadre TEXT, -- e.g., Nursing, Administrative, Medical
  date_of_appointment DATE,
  date_of_confirmation DATE,
  date_of_last_promotion DATE,
  employment_status TEXT CHECK (employment_status IN ('permanent', 'probation', 'contract', 'secondment')) DEFAULT 'permanent',
  
  current_location TEXT, -- HQ, Zonal, State, PHC
  zone TEXT CHECK (zone IN ('NC', 'NE', 'NW', 'SE', 'SS', 'SW')),
  
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Attendance
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  check_in_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  check_out_time TIMESTAMP WITH TIME ZONE,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  location_name TEXT,
  status TEXT CHECK (status IN ('present', 'late', 'on_leave', 'absent')) DEFAULT 'present'
);

-- 5. Leave Management
CREATE TABLE leave_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  leave_type TEXT CHECK (leave_type IN ('annual', 'sick', 'maternity', 'study', 'casual')) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  approved_by UUID REFERENCES profiles(id),
  approval_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE leave_balances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  year INT NOT NULL,
  annual_days_total INT DEFAULT 30,
  annual_days_used INT DEFAULT 0,
  sick_days_used INT DEFAULT 0,
  UNIQUE(profile_id, year)
);

-- 6. Performance Management
CREATE TABLE kpis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value DECIMAL,
  current_value DECIMAL DEFAULT 0,
  weight INT DEFAULT 1, -- percentage
  deadline DATE,
  year INT NOT NULL,
  status TEXT DEFAULT 'ongoing'
);

CREATE TABLE performance_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  reviewer_id UUID REFERENCES profiles(id),
  period TEXT NOT NULL, -- e.g., 'Q1 2023', 'Annual 2023'
  self_score INT CHECK (self_score BETWEEN 1 AND 5),
  supervisor_score INT CHECK (supervisor_score BETWEEN 1 AND 5),
  final_score DECIMAL(3,2),
  comments TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Training
CREATE TABLE training_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- e.g., 'Immunization', 'Leadership', 'Data Management'
  hours INT,
  start_date DATE,
  end_date DATE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE training_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES training_programs(id),
  profile_id UUID REFERENCES profiles(id),
  status TEXT CHECK (status IN ('nominated', 'enrolled', 'completed', 'cancelled')) DEFAULT 'nominated',
  certificate_url TEXT,
  score INT,
  completion_date DATE
);

-- 8. Assets
CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  asset_name TEXT NOT NULL,
  asset_type TEXT, -- 'laptop', 'phone', 'vehicle'
  serial_number TEXT UNIQUE,
  assigned_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active'
);

-- 9. Allowances (Sensitive)
CREATE TABLE project_allowances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  project_name TEXT NOT NULL,
  allowance_type TEXT CHECK (allowance_type IN ('DSA', 'field', 'overtime', 'transport')) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'paid', 'rejected')) DEFAULT 'pending',
  approval_date TIMESTAMP WITH TIME ZONE,
  payment_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Examples)
-- Staff can view their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
-- Super admins can view all
CREATE POLICY "Admins view all profiles" ON profiles FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'));