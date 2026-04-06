import { getDb, initDb } from '@/lib/db';
import { verifyOwnerToken } from '@/lib/auth';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const ownerToken = request.headers.get('x-owner-token');
    
    if (!ownerToken || !verifyOwnerToken(ownerToken)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const sql = getDb();
    await initDb();
    
    const entries = await sql`SELECT * FROM rsvp_entries ORDER BY created_at ASC`;
    
    return Response.json(entries);
  } catch (error) {
    console.error('GET /api/rsvp/admin error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
