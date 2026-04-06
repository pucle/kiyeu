import { getDb } from '@/lib/db';
import { verifyOwnerToken } from '@/lib/auth';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ownerToken = request.headers.get('x-owner-token');
    
    if (!ownerToken || !verifyOwnerToken(ownerToken)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const sql = getDb();
    await sql`DELETE FROM rsvp_entries WHERE id = ${parseInt(id, 10)}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/rsvp/[id] error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
