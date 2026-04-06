import { neon } from '@neondatabase/serverless';

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return sql;
}

export async function initDb() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS rsvp_entries (
      id SERIAL PRIMARY KEY,
      nickname TEXT NOT NULL,
      display_name BOOLEAN DEFAULT true,
      flower_type TEXT NOT NULL,
      flower_color TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      message TEXT
    )
  `;
  // migration for existing tables
  try {
    await sql`ALTER TABLE rsvp_entries ADD COLUMN IF NOT EXISTS message TEXT`;
  } catch (err) {
    console.log('Column message existence check/addition', err);
  }
}
