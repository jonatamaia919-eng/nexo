
import React, { useState } from 'react';

interface AdminLoginProps {
  onAuthenticated: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onAuthenticated, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials for the admin as requested
    if (email === 'admin@nexo.com.br' && password === 'nexo2024admin') {
      onAuthenticated();
    } else {
      setError('Credenciais administrativas inválidas.');
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-slate-900/80 p-10 rounded-[2.5rem] border border-red-900/20 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
          <h2 className="text-3xl font-black text-white">Acesso Restrito</h2>
          <p className="text-slate-400 mt-2">Identifique-se para acessar o painel ADM.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail ADM</label>
            <input
              required
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-red-600 outline-none transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Senha Mestra</label>
            <input
              required
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-red-600 outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center animate-pulse">{error}</p>}

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xl font-bold shadow-xl shadow-red-900/40 transition-all active:scale-95"
          >
            Autenticar Painel
          </button>
        </form>
        
        <button 
            onClick={onBack}
            className="w-full mt-4 py-3 text-slate-500 font-bold hover:text-slate-400"
        >
            Voltar ao Aplicativo
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
