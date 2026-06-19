'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsActions() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const runNewsUpdate = async () => {
    setLoading(true);
    setStatus('Fetching latest NFL news...');

    try {
      const res = await fetch('/api/news/run', { method: 'POST' });
      const data = await res.json();

      if (res.ok) {
        setStatus(data.message || `Added ${data.count} news items with ripple analysis`);
        router.refresh();
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch {
      setStatus('Failed to run news update');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {status && (
        <span className="text-sm text-slate-400">{status}</span>
      )}
      <button
        onClick={runNewsUpdate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⟳</span>
            Running...
          </>
        ) : (
          <>
            <span>🔄</span>
            Run News Update
          </>
        )}
      </button>
    </div>
  );
}
