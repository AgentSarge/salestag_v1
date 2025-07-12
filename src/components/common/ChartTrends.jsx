import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

function formatNumber(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n;
}

function SharedTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow p-2 text-xs dark:text-gray-300">
      <div className="font-semibold mb-1">{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span style={{ color: entry.color }}>●</span>
          <span>{entry.name}: </span>
          <span>
            {entry.dataKey === 'close_rate'
              ? (entry.value * 100).toFixed(2) + '%'
              : entry.dataKey === 'revenue'
              ? '$' + formatNumber(entry.value)
              : formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

const TIMEFRAME_OPTIONS = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' },
];

export default function ChartTrends({ trends: initialTrends }) {
  const [timeframe, setTimeframe] = useState('all');
  const [trends, setTrends] = useState(initialTrends);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchTrends() {
      setLoading(true);
      setError(null);
      try {
        let url = `/api/call_trends?timeframe=${timeframe}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch trends');
        const data = await res.json();
        if (!ignore) setTrends(data?.trends || []);
      } catch (e) {
        if (!ignore) setError(e.message || 'Error loading trends');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (timeframe !== 'all') {
      fetchTrends();
    } else {
      setTrends(initialTrends);
    }
    return () => { ignore = true; };
  }, [timeframe, initialTrends]);

  return (
    <section className="mt-8">
      <div className="flex gap-2 mb-4">
        {TIMEFRAME_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${timeframe === opt.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'}`}
            onClick={() => setTimeframe(opt.value)}
            disabled={loading}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center h-48">
          <svg className="animate-spin h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-gray-500">Loading trends...</span>
        </div>
      )}
      {error && <div className="text-center text-red-600 py-12">{error}</div>}
      {!loading && !error && (!trends || !trends.length) && (
        <div className="text-center text-gray-500 py-12">No trend data available.</div>
      )}
      {!loading && !error && trends && trends.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tag Volume Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-8">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Tag Volume Over Time</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Total tags detected per day</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={formatNumber} tick={{ fontSize: 12 }} />
                <Tooltip content={<SharedTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="tag_volume" stroke="#2563eb" strokeWidth={2} dot={false} name="Tag Volume" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Close Rate Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-8">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Close Rate Over Time</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Percentage of calls closed</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => (v * 100).toFixed(0) + '%'} tick={{ fontSize: 12 }} />
                <Tooltip content={<SharedTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="close_rate" stroke="#16a34a" strokeWidth={2} dot={false} name="Close Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-8">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Revenue Over Time</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Attributed revenue per day</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => '$' + formatNumber(v)} tick={{ fontSize: 12 }} />
                <Tooltip content={<SharedTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#f59e42" strokeWidth={2} dot={false} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
} 