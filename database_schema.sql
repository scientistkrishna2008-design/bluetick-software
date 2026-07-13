-- Table: projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  ticket_number text not null unique,
  growth_partner_id uuid references auth.users,
  engineer_id uuid references auth.users,
  engineer_status text default 'Pending Acceptance', -- Pending Acceptance, Accepted, Denied
  admin_id uuid references auth.users,
  
  -- Stage Tracking
  current_stage integer default 1,
  live_link text, -- Added for persistent Vercel URL
  final_domain text, -- Official custom domain added in Stage 6
  
  -- Stage 1 Details (Initial Discussion)
  client_name text not null,
  business_name text not null,
  contact_details text,
  requirements text,
  pages_requested integer,
  reference_images text[], -- Added for image uploads
  design_references text,
  plan_type text default 'Plan 1',
  budget text,
  deadline date,
  notes text,
  stage_1_status text default 'Pending Discussion', -- Pending Discussion, Discussion Completed, Admin Approved
  
  -- Payroll Tracking
  growth_partner_paid boolean default false,
  engineer_paid boolean default false,
  payment_company_name text,

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

-- Table: notifications
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  message text not null,
  type text not null, -- 'verification', 'assignment', 'ticket_resolved', 'stage_update'
  read boolean default false,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table: push_subscriptions
create table public.push_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  token text not null unique,
  platform text default 'web',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Turn off RLS temporarily for easy testing
alter table public.projects disable row level security;
alter table public.project_samples disable row level security;
alter table public.project_corrections disable row level security;
alter table public.notifications disable row level security;
alter table public.push_subscriptions disable row level security;

-- Auto-confirm emails trigger to bypass Supabase Email Confirmation
create or replace function public.auto_confirm_users()
returns trigger as $$
begin
  new.email_confirmed_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists auto_confirm_users_trigger on auth.users;
create trigger auto_confirm_users_trigger
before insert on auth.users
for each row
execute function public.auto_confirm_users();

-- Storage Bucket for Project Images
insert into storage.buckets (id, name, public) values ('project_images', 'project_images', true) on conflict do nothing;
create policy "Public Access" on storage.objects for select using ( bucket_id = 'project_images' );
create policy "Public Insert" on storage.objects for insert with check ( bucket_id = 'project_images' );

-- Table: portfolio_projects (Homepage Portfolio)
create table public.portfolio_projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  url text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.portfolio_projects disable row level security;
