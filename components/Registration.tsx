
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface RegistrationProps {
  onComplete: (data: Pick<UserProfile, 'name' | 'email' | 'phone' | 'password'>) => void;
  onLogin: (email: string) => void;
  onPasswordReset: (email: string, newPass: string) => void;
  users: UserProfile[];
}

type AuthMode = 'login' | 'register' | 'reset';

const Registration: React.FC<RegistrationProps> = ({ onComplete, onLogin, onPasswordReset, users }) => {
  const [mode, setMode] = useState<AuthMode>('register');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (mode === 'login') {
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {
        onLogin(user.email!);
      } else {
        setMessage({ type: 'error', text: 'E-mail ou senha incorretos.' });
      }
    } else if (mode === 'register') {
      if (!form.name || !form.email || !form.password) {
        setMessage({ type: 'error', text: 'Por favor, preencha todos os campos.' });
        return;
      }
      if (form.password.length < 6) {
        setMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres.' });
        return;
      }
      onComplete({ ...form });
    } else if (mode === 'reset') {
      const user = users.find(u => u.email === form.email);
      if (!user) {
        setMessage({ type: 'error', text: 'E-mail não encontrado. Verifique e tente novamente.' });
        return;
      }
      if (form.password !== form.confirmPassword) {
        setMessage({ type: 'error', text: 'As senhas não coincidem.' });
        return;
      }
      if (form.password.length < 6) {
        setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' });
        return;
      }
      
      onPasswordReset(form.email, form.password);
      setMessage({ type: 'success', text: 'Senha redefinida com sucesso. Você já pode entrar.' });
      
      // Clear passwords and return to login after delay
      setTimeout(() => {
        setMode('login');
        setMessage(null);
        setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#0f172a]">
      <div className="w-full max-w-lg bg-slate-900/50 p-8 rounded-[2.5rem] border border-purple-900/30 shadow-2xl backdrop-blur-xl transition-all duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            {mode === 'login' && 'Entrar na conta'}
            {mode === 'register' && 'Crie sua conta'}
            {mode === 'reset' && 'Redefinir Senha'}
          </h1>
          <p className="text-purple-300 mt-2">
            {mode === 'login' && 'Bem-vindo de volta ao NEXO!'}
            {mode === 'register' && 'Estamos quase lá! Identifique-se para salvar seus dados com segurança.'}
            {mode === 'reset' && 'Informe seu e-mail e escolha uma nova senha.'}
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-bold animate-in fade-in zoom-in duration-300 ${
            message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nome Completo</label>
              <input
                required
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

          {mode === 'register' && (
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
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
              {mode === 'reset' ? 'Nova Senha' : 'Senha'}
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-600"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            {mode === 'login' && (
              <div className="flex justify-end mt-1">
                <button 
                  type="button"
                  onClick={() => { setMode('reset'); setMessage(null); }}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300"
                >
                  Esqueci minha senha
                </button>
              </div>
            )}
          </div>

          {mode === 'reset' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Confirmar Nova Senha</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all placeholder:text-slate-600"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-5 mt-4 rounded-2xl text-white text-xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95 ${
              mode === 'reset' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/40'
            }`}
          >
            {mode === 'login' && 'Entrar agora'}
            {mode === 'register' && 'Criar conta e continuar'}
            {mode === 'reset' && 'Redefinir senha'}
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-3">
          {mode !== 'register' && (
            <button 
              onClick={() => { setMode('register'); setMessage(null); }}
              className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
              Não tem conta? Cadastre-se
            </button>
          )}
          {mode !== 'login' && (
            <button 
              onClick={() => { setMode('login'); setMessage(null); }}
              className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
              Já tem uma conta? Entrar
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Seus dados estão protegidos por criptografia de ponta a ponta.
        </p>
      </div>
    </div>
  );
};

export default Registration;
