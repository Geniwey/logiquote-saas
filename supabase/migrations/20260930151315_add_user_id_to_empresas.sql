/*
# Add user_id to empresas and tighten RLS for real auth

1. Modified Tables
- `empresas`
  - Added `user_id` (uuid, FK to auth.users, ON DELETE CASCADE, DEFAULT auth.uid())
  - Added unique constraint on `user_id` to support upsert by user_id

2. Security Changes
- Dropped all existing anon-accessible policies (select/insert/update/delete)
- Created new authenticated-only policies with ownership checks (auth.uid() = user_id)
- The table is now private: only the authenticated owner can CRUD their own row
- Anon users can no longer read or write any empresa data

3. Notes
- Existing rows will have NULL user_id and will not be accessible to any authenticated user.
  This is expected — those were demo rows created before auth existed.
- The Cotizador demo is now a protected route; only authenticated users can access it.
- The Dashboard and Cotizador both query by user_id = auth.uid() to find the owner's tarifario.
*/

ALTER TABLE empresas ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE empresas ALTER COLUMN user_id SET DEFAULT auth.uid();

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'empresas_user_id_key') THEN
    ALTER TABLE empresas ADD CONSTRAINT empresas_user_id_key UNIQUE (user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "anon_select_empresas" ON empresas;
DROP POLICY IF EXISTS "anon_insert_empresas" ON empresas;
DROP POLICY IF EXISTS "anon_update_empresas" ON empresas;
DROP POLICY IF EXISTS "anon_delete_empresas" ON empresas;

CREATE POLICY "select_own_empresas" ON empresas FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "insert_own_empresas" ON empresas FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_empresas" ON empresas FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_empresas" ON empresas FOR DELETE
  TO authenticated USING (auth.uid() = user_id);