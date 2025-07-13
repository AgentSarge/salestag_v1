// /src/pages/api/track-view.ts
import { createClient } from '@supabase/supabase-js';
import type { APIRoute } from 'astro';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY!
);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const ip = request.headers.get('x-forwarded-for') || null;
  const slug = body.slug;

  // Rate limit: skip if same IP+slug exists in past 12h
  const since = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
  const { data: recent, error } = await supabase
    .from('blog_views')
    .select('id')
    .eq('slug', slug)
    .eq('ip', ip)
    .gte('created_at', since)
    .limit(1);

  if (recent && recent.length > 0) {
    // Already viewed in last 12h, skip insert
    return new Response(JSON.stringify({ success: true, rateLimited: true }), { status: 200 });
  }

  await supabase.from('blog_views').insert({
    slug: slug,
    referrer: body.referrer,
    user_agent: body.userAgent,
    ip: ip
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}; 