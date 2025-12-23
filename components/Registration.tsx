
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface RegistrationProps {
  onComplete: (data: Pick<UserProfile, 'name' | 'email' | 'phone' | 'password'>) => void;
  onLogin: (email: string) => void;
  users: UserProfile[];
}

const Registration: React.FC<RegistrationProps> = ({ onComplete, onLogin, users }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [socialModal, setSocialModal] = useState<'Google' | 'Apple' | null>(null);
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

  const startSocialLogin = (platform: 'Google' | 'Apple') => {
    setIsAuthenticating(true);
    setTimeout(() => {
        setIsAuthenticating(false);
        setSocialModal(platform);
    }, 800);
  };

  const selectSocialAccount = (accountName: string, accountEmail: string) => {
    setIsAuthenticating(true);
    setSocialModal(null);
    setTimeout(() => {
        setIsAuthenticating(false);
        onComplete({
            name: accountName,
            email: accountEmail,
            phone: '',
            password: `social_${accountEmail}`
        });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#0f172a]">
      <div className="w-full max-w-lg bg-slate-900/50 p-8 rounded-[2.5rem] border border-purple-900/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Loader de Autenticação */}
        {isAuthenticating && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-purple-300 font-bold animate-pulse">Conectando ao serviço seguro...</p>
            </div>
        )}

        {/* Modal Simulado de Escolha de Conta */}
        {socialModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-[90] flex items-center justify-center p-6 animate-in zoom-in duration-300">
                <div className="bg-white w-full rounded-3xl overflow-hidden shadow-2xl text-slate-900">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {socialModal === 'Google' ? (
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.21 1.72-3.72 1.72-1.47 0-2.32-.82-3.61-.82s-2.31.81-3.6.81c-1.51 0-2.81-.8-3.77-1.76-1.96-1.96-1.96-5.12 0-7.08.97-.96 2.27-1.48 3.73-1.48 1.43 0 2.22.49 3.5.49s2.06-.52 3.5-.52c1.45 0 2.76.54 3.73 1.51 1.83 1.83 1.83 4.79.24 6.13zm-5.05-13.62c0-1.89 1.53-3.41 3.41-3.41.05 0 .1 0 .15.01-.19 2.05-1.93 3.65-4 3.4-.04-.01-.08-.01-.12-.01l-.22.01-.22-.01z"/></svg>
                            )}
                            <span className="font-bold text-slate-700">Fazer login com {socialModal}</span>
                        </div>
                        <button onClick={() => setSocialModal(null)} className="text-slate-400 hover:text-slate-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="p-4 space-y-2">
                        <p className="text-sm text-slate-500 px-2 mb-4">Escolha uma conta para continuar no <span className="font-bold text-purple-600">NEXO</span></p>
                        
                        <button 
                            onClick={() => selectSocialAccount('Seu Nome', 'voce@email.com')}
                            className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors text-left border border-transparent hover:border-slate-200"
                        >
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">V</div>
                            <div>
                                <p className="font-bold text-slate-900">Seu Nome Principal</p>
                                <p className="text-xs text-slate-500">voce@email.com</p>
                            </div>
                        </button>

                        <button 
                            onClick={() => selectSocialAccount('Perfil Trabalho', 'trabalho@empresa.com')}
                            className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors text-left border border-transparent hover:border-slate-200"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">T</div>
                            <div>
                                <p className="font-bold text-slate-900">Perfil Profissional</p>
                                <p className="text-xs text-slate-500">trabalho@empresa.com</p>
                            </div>
                        </button>

                        <button 
                            className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors text-left border border-transparent hover:border-slate-200"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <p className="font-medium text-slate-600 text-sm">Usar outra conta</p>
                        </button>
                    </div>
                    <div className="p-6 bg-slate-50 text-[10px] text-slate-400 leading-relaxed">
                        Para continuar, o Google compartilhará seu nome, endereço de e-mail, preferência de idioma e foto do perfil com o NEXO. Antes de usar este app, você pode revisar a política de privacidade e os termos de serviço do NEXO.
                    </div>
                </div>
            </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            {isLoginMode ? 'Entrar na conta' : 'Crie sua conta'}
          </h1>
          <p className="text-purple-300 mt-2">
            {isLoginMode ? 'Bem-vindo de volta ao NEXO!' : 'Estamos quase lá! Identifique-se para salvar seus dados com segurança.'}
          </p>
        </div>

        <div className="space-y-4 mb-8">
            <button 
                onClick={() => startSocialLogin('Google')}
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-lg active:scale-95"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
            </button>
            
            <button 
                onClick={() => startSocialLogin('Apple')}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-950 transition-all shadow-lg active:scale-95"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.96.95-2.21 1.72-3.72 1.72-1.47 0-2.32-.82-3.61-.82s-2.31.81-3.6.81c-1.51 0-2.81-.8-3.77-1.76-1.96-1.96-1.96-5.12 0-7.08.97-.96 2.27-1.48 3.73-1.48 1.43 0 2.22.49 3.5.49s2.06-.52 3.5-.52c1.45 0 2.76.54 3.73 1.51 1.83 1.83 1.83 4.79.24 6.13zm-5.05-13.62c0-1.89 1.53-3.41 3.41-3.41.05 0 .1 0 .15.01-.19 2.05-1.93 3.65-4 3.4-.04-.01-.08-.01-.12-.01l-.22.01-.22-.01z"/>
                </svg>
                Continuar com Apple
            </button>
        </div>

        <div className="flex items-center gap-4 mb-8 text-slate-600">
            <div className="flex-1 h-px bg-slate-800"></div>
            <span className="text-xs font-bold uppercase tracking-widest">ou entre com</span>
            <div className="flex-1 h-px bg-slate-800"></div>
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
