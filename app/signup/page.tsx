'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/dashboard';
    }
  }, [status]);

  async function signup() {
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // ❗ IMPORTANT
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.error || 'Signup failed');
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: light-themed form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-600">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Create your account to manage finances effortlessly.
          </p>

          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded mb-4 w-full focus:ring-2 text-gray-500 focus:ring-blue-200"
            placeholder="Enter Email Address"
            type="email"
          />

          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded mb-4 w-full focus:ring-2 text-gray-500 focus:ring-blue-200"
            type="password"
            placeholder="Enter Your Password"
          />

          <button
            className="bg-blue-700 cursor-pointer text-white py-3 rounded w-full hover:bg-blue-800 transition"
            onClick={signup}
          >
            {loading ? 'Creating...' : 'SIGN UP'}
          </button>

          <div className="my-6 text-center flex items-center">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-xs text-gray-400">OR</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="border cursor-pointer rounded text-gray-500 py-2 w-full mb-3 flex items-center justify-center gap-3">
            <span>Google</span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an Account?{' '}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right: blue aesthetic panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-700 text-white flex items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Your Workspace, Reimagined
          </h2>
          <p className="mb-6 text-blue-100">
            Secure access to powerful tools for goal alignment, progress
            tracking, and team success.
          </p>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-sm text-white/90">Analytics</div>
              <div className="mt-3 h-12 bg-white/20 rounded" />
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-sm text-white/90">Monthly Report</div>
              <div className="mt-3 h-12 bg-white/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
