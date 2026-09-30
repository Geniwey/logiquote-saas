/*
# Create empresas table (single-tenant, no auth)

1. New Tables
- `empresas`
  - `id` (uuid, primary key) — identifies the simulated logged-in company
  - `tarifario` (text, nullable) — the base tariff text the company saves
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now()) — last tarifario update

2. Security
- Enable RLS on `empresas`.
- Allow anon + authenticated CRUD because there is no real auth yet; the
  simulated company ID is stored in localStorage. This is intentionally
  public/shared for the demo shell.

3. Notes
- No user_id / auth.users FK because login is not implemented yet.
- When real auth is added, the policies should be tightened to authenticated-only
  with ownership checks.
*/

CREATE TABLE IF NOT EXISTS empresas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tarifario text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_empresas" ON empresas;
CREATE POLICY "anon_select_empresas"
ON empresas FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_empresas" ON empresas;
CREATE POLICY "anon_insert_empresas"
ON empresas FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_empresas" ON empresas;
CREATE POLICY "anon_update_empresas"
ON empresas FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_empresas" ON empresas;
CREATE POLICY "anon_delete_empresas"
ON empresas FOR DELETE
TO anon, authenticated USING (true);
