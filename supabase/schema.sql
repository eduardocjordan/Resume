-- Chatbot schema. Run this once in Supabase's web SQL Editor (Dashboard -> SQL Editor -> New query -> paste -> Run).
-- No terminal or CLI required.

create table if not exists chat_sessions (
  id uuid primary key,
  created_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  message_count integer not null default 0,
  finalized boolean not null default false,
  finalized_at timestamptz
);

create table if not exists chat_messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_id_idx on chat_messages (session_id, created_at);

create table if not exists chat_session_summaries (
  session_id uuid primary key references chat_sessions(id) on delete cascade,
  narrative_summary text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  stated_intent text,
  job_description_text text,
  salary_figure_mentioned text,
  emailed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists chat_daily_usage (
  usage_date date primary key,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  cache_creation_input_tokens bigint not null default 0,
  cache_read_input_tokens bigint not null default 0
);

create index if not exists chat_sessions_unfinalized_idx on chat_sessions (last_activity_at) where finalized = false;

-- Row Level Security: enabled with no policies on every table. The app only ever talks to
-- Supabase from server-side code using the service_role key (see src/lib/db.ts), which bypasses
-- RLS entirely, so this has no effect on the chatbot itself. It does mean nobody can read or
-- write these tables through Supabase's public/anon API key, which the app never uses anyway.
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
alter table chat_session_summaries enable row level security;
alter table chat_daily_usage enable row level security;
