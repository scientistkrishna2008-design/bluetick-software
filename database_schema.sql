-- Table: projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  ticket_number text not null unique,
  growth_partner_id uuid references auth.users,
  engineer_id uuid references auth.users,
  admin_id uuid references auth.users,
  
  -- Stage Tracking
  current_stage integer default 1,
  live_link text, -- Added for persistent Vercel URL
  
  -- Stage 1 Details (Initial Discussion)
  client_name text not null,
  business_name text not null,
  contact_details text,
  requirements text,
  pages_requested integer,
  design_references text,
  budget text,
  deadline date,
  notes text,
  stage_1_status text default 'Pending Discussion', -- Pending Discussion, Discussion Completed, Admin Approved
  
  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: project_samples (Stage 2)
create table public.project_samples (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  preview_link text not null,
  engineer_notes text,
  status text default 'Pending Review', -- Pending Review, Approved, Rejected
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: project_corrections (Stage 3 Ticket System)
create table public.project_corrections (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  correction_number integer not null, -- 1, 2, 3...
  description text not null,
  deadline date,
  engineer_link text,
  engineer_notes text,
  status text default 'Pending', -- Pending, Ready For Review, Approved, Rejected
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Turn off RLS temporarily for easy testing
alter table public.projects disable row level security;
alter table public.project_samples disable row level security;
alter table public.project_corrections disable row level security;
