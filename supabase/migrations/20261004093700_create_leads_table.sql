/*
# Create leads table for contact and demo form submissions

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `source` (text, not null) — 'contact' or 'demo'
  - `name` (text, not null)
  - `email` (text, not null)
  - `company` (text, nullable) — company name for demo requests
  - `message` (text, nullable) — message for contact form
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- Allow anon + authenticated INSERT (public forms submit without login).
- No SELECT/UPDATE/DELETE for anon — only authenticated (admin) can read leads.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL CHECK (source IN ('contact', 'demo')),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_leads" ON leads;
CREATE POLICY "auth_select_leads"
ON leads FOR SELECT
TO authenticated
USING (true);
