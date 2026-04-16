'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const APP_PASSWORD = 'fatherguido2026';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (password === APP_PASSWORD) {
      localStorage.setItem('ff_session', 'authenticated');
      router.push('/');
    } else {
      setError('Wrong password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-gray-200">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏈</div>
          <h1 className="text-2xl font-bold text-gray-900">Father Guido</h1>
          <p className="text-gray-500 mt-1 text-sm">Fantasy Football Command Center</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Logging in...' : 'Enter'}
          </button>
        </form>
        <p className="text-gray-400 text-xs text-center mt-6">Las Vegas Fantasy Football League</p>
      </div>
    </div>
  );
}
