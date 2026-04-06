import { getDb, initDb } from '@/lib/db';
import { verifyOwnerToken } from '@/lib/auth';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    await initDb();
    
    const ownerToken = request.headers.get('x-owner-token');
    const isOwner = ownerToken ? verifyOwnerToken(ownerToken) : false;
    
    const entries = await sql`SELECT * FROM rsvp_entries ORDER BY created_at ASC`;
    
    const publicEntries = entries.map((entry: Record<string, unknown>) => ({
      id: entry.id,
      nickname: (!entry.display_name && !isOwner) ? 'Ẩn danh 🌸' : entry.nickname,
      display_name: entry.display_name,
      flower_type: entry.flower_type,
      flower_color: entry.flower_color,
      time_slot: entry.time_slot,
      created_at: entry.created_at,
      is_hidden: !entry.display_name,
    }));
    
    return Response.json(publicEntries);
  } catch (error) {
    console.error('GET /api/rsvp error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sql = getDb();
    await initDb();
    
    const body = await request.json();
    const { nickname, display_name, flower_type, flower_color, time_slot } = body;
    
    if (!nickname || !flower_type || !flower_color || !time_slot) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const result = await sql`
      INSERT INTO rsvp_entries (nickname, display_name, flower_type, flower_color, time_slot)
      VALUES (${nickname}, ${display_name ?? true}, ${flower_type}, ${flower_color}, ${time_slot})
      RETURNING *
    `;
    
    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/rsvp error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
