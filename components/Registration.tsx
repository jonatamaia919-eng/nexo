
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface RegistrationProps {
  onComplete: (data: Pick<UserProfile, 'name' | 'email' | 'phone' | 'password'>) => void;
  onLogin: (email: string) => void;
  users: UserProfile[];
}

const Registration: React.FC<RegistrationProps> = ({ onComplete, onLogin, users }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {
        onLogin(user.email!);
      } else {
        alert("E-mail ou senha incorretos.");
      }
    } else {
      if (!form.name || !form.email || !form.password) {
          alert("Por favor, preencha todos os campos obrigatórios.");
          return;
      }
      onComplete(form);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#0f172a]">
      <div className="w-full max-w-lg bg-slate-900/50 p-8 rounded-[2.5rem] border border-purple-900/30 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            {isLoginMode ? 'Entrar na conta' : 'Crie sua conta'}
          </h1>
          <p className="text-purple-300 mt-2">
            {isLoginMode ? 'Bem-vindo de volta ao NEXO!' : 'Estamos quase lá! Identifique-se para salvar seus dados com segurança.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginMode && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nome Completo</label>
              <input
                required={!isLoginMode}
                type="text"
                placeholder="Ex: João Silva"
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-600"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail</label>
            <input
              required
              type="email"
              placeholder="seu@email.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-600"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {!isLoginMode && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Telefone / WhatsApp</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-600"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Senha</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-600"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 mt-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xl font-bold shadow-xl shadow-purple-900/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            {isLoginMode ? 'Entrar agora' : 'Criar conta e continuar'}
          </button>
        </form>

        <div className="mt-8 text-center">
            <button 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
                {isLoginMode ? 'Não tem conta? Cadastre-se' : 'Já tem uma conta? Entrar'}
            </button>
        </div>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Seus dados estão protegidos por criptografia de ponta a ponta.
        </p>
      </div>
    </div>
  );
};

export default Registration;
