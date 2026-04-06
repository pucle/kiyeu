import { createOwnerToken } from '@/lib/auth';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;
    
    if (id === process.env.OWNER_ID && password === process.env.OWNER_PASS) {
      const token = createOwnerToken();
      return Response.json({ token });
    }
    
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('POST /api/auth/owner error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
