"use client";
import { useState, useEffect } from 'react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      window.location.href = '/admin/dashboard';
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gradient-to-br from-[#ffffff15] to-[#2929292c] border-2 border-gray-700 rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="w-full bg-[#9494941c] border-2 border-gray-700 p-3 rounded-lg text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}