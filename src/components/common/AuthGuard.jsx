import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthGuard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        window.location.href = '/login';
      }
    });
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Checking authentication...</div>;
  }
  if (!user) {
    return null; // Redirecting
  }

  // TODO: Replace dummy data with Supabase useQuery() hooks for real metrics
  return (
    <main className="px-4 py-16 mx-auto max-w-5xl">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
          <div className="text-lg text-gray-700 dark:text-gray-300">Total Calls</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm flex flex-col items-center">
          <div className="text-3xl font-bold text-green-600 mb-2">987</div>
          <div className="text-lg text-gray-700 dark:text-gray-300">Labeled Calls</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm flex flex-col items-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">456</div>
          <div className="text-lg text-gray-700 dark:text-gray-300">Reviewed Calls</div>
        </div>
      </div>

      {/* Vault Trends Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Vault Trends</h2>
        <div className="h-64 bg-gray-100 border rounded-lg flex items-center justify-center text-gray-400">
          {/* Placeholder for future chart */}
          Chart coming soon
        </div>
      </section>
    </main>
  );
} 