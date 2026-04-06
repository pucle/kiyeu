// In-memory mock for RSVP entries
// Note: This data will be reset every time the Vercel Serverless Function restarts.
// For a simple demo/invitation, this is the quickest way to get it running without a database.

interface RsvpEntry {
  id: number;
  nickname: string;
  display_name: boolean;
  flower_type: string;
  flower_color: string;
  time_slot: string;
  created_at: Date;
}

// Global variable to persist between requests (on the same instance)
let rsvpEntries: RsvpEntry[] = [];
let nextId = 1;

export function getDb() {
  // Return a mock SQL-like interface for compatibility
  return async (strings: TemplateStringsArray, ...values: any[]) => {
    const query = strings.join('').toLowerCase();
    
    if (query.includes('select * from rsvp_entries')) {
      return rsvpEntries;
    }
    
    if (query.includes('insert into rsvp_entries')) {
      const [nickname, display_name, flower_type, flower_color, time_slot] = values;
      const newEntry: RsvpEntry = {
        id: nextId++,
        nickname,
        display_name,
        flower_type,
        flower_color,
        time_slot,
        created_at: new Date(),
      };
      rsvpEntries.push(newEntry);
      return [newEntry];
    }
    
    return [];
  };
}

export async function initDb() {
  // No-op for mock DB
  console.log('Mock DB initialized (in-memory)');
}
