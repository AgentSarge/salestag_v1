import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get('email') as string;
    const name = form.get('name') as string;
    const company = form.get('company') as string;
    const vertical = form.get('vertical') as string;
    const teamSize = form.get('teamSize') as string | null;
    const useCase = form.get('useCase') as string | null;

    if (!email || !name || !company || !vertical) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error } = await supabase.from('waitlist').insert([
      { email, name, company, vertical, team_size: teamSize, use_case: useCase }
    ]);

    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}; 