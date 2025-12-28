
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { AUTHORIZED_USERS } from '../constants';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = AUTHORIZED_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Credenciais inválidas ou acesso não autorizado.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#0f172a]">
      <div className="w-full max-w-md bg-slate-900/50 p-10 rounded-[2.5rem] border border-purple-900/30 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">NEXO</h1>
          <p className="text-purple-300 font-medium">Controle financeiro privado</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold animate-in fade-in zoom-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail</label>
            <input
              required
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Senha</label>
            <input
              required
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xl font-bold shadow-xl shadow-purple-900/40 transition-all active:scale-95"
          >
            Acessar Painel
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-xs">
          Apenas usuários autorizados podem acessar este sistema.<br/>
          Seus dados estão protegidos por criptografia local.
        </p>
      </div>
    </div>
  );
};

export default Login;
