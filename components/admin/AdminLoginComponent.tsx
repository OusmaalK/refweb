"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminLoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Déterminer la redirection après login
  const getRedirectPath = () => {
    if (pathname.startsWith('/admin')) {
      return '/admin/dashboard';
    }
    return '/fr/admin/dashboard';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(getRedirectPath());
        router.refresh();
      } else {
        setError(data.error || 'Identifiants incorrects');
      }
    } catch (error) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a1628] px-6">
      <form 
        onSubmit={handleLogin} 
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl relative"
      >
        <Link 
          href="/fr"
          className="absolute top-4 left-4 text-gray-400 hover:text-[#0a1628] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0a1628]">Espace Admin</h1>
          <p className="text-gray-500 mt-2">Veuillez vous identifier</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#eab308] outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#eab308] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-8 bg-[#eab308] hover:bg-[#ca8a04] text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}