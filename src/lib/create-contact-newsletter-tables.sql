-- Create contact requests table for hidden contact form submissions
create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table contact_requests enable row level security;
create policy if not exists "Allow public insert contact requests" on contact_requests
  for insert with check (true);

alter table newsletter_subscribers enable row level security;
create policy if not exists "Allow public insert newsletter subscribers" on newsletter_subscribers
  for insert with check (true);
