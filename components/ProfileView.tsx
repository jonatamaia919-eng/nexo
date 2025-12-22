
import React from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile | null;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onLogout }) => {
  if (!profile) return null;

  const subEndDate = profile.subscriptionEndDate ? new Date(profile.subscriptionEndDate) : null;
  const subscriptionDateStr = subEndDate ? subEndDate.toLocaleDateString('pt-BR') : 'N/A';
  
  // Check if renewal is soon (within 5 days)
  const isRenewalSoon = subEndDate && (subEndDate.getTime() - new Date().getTime()) < (5 * 24 * 60 * 60 * 1000);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header>
        <h2 className="text-4xl font-extrabold text-white">Minha Conta</h2>
        <p className="text-slate-400 font-medium">Gerencie seus dados e veja sua assinatura.</p>
      </header>

      {isRenewalSoon && (
        <div className="bg-amber-500/10 border border-amber-500/50 p-6 rounded-[2rem] flex items-center gap-4 animate-bounce-subtle">
          <div className="bg-amber-500 p-3 rounded-2xl text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h4 className="text-amber-400 font-bold">Assinatura vence em breve!</h4>
            <p className="text-amber-200/70 text-sm">Sua renovação será em {subscriptionDateStr}. Certifique-se de que seu cartão cadastrado tem limite.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informações Pessoais */}
        <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50 shadow-xl space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
              <p className="text-slate-500 text-sm">Usuário NEXO</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">E-mail</label>
              <p className="text-white font-medium text-lg">{profile.email}</p>
            </div>
            {profile.phone && (
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Telefone</label>
                <p className="text-white font-medium text-lg">{profile.phone}</p>
              </div>
            )}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Senha</label>
              <p className="text-white font-medium text-lg">••••••••••••</p>
            </div>
          </div>

          <button 
            className="w-full py-4 rounded-xl border border-slate-700 text-slate-400 font-bold hover:bg-white/5 transition-all"
            disabled
          >
            Editar Perfil (Em breve)
          </button>
        </div>

        {/* Assinatura */}
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-8 rounded-[2.5rem] border border-purple-500/30 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-white">Sua Assinatura</h3>
              <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Premium
              </span>
            </div>

            <div className="bg-black/20 p-6 rounded-3xl">
              <p className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-1">Próximo Vencimento</p>
              <h4 className="text-3xl font-black text-white">{subscriptionDateStr}</h4>
              <p className="text-purple-200/60 text-sm mt-2">Sua assinatura é renovada automaticamente.</p>
            </div>

            <ul className="space-y-3">
              {[
                'Acesso total aos gráficos',
                'Gestão ilimitada de contas',
                'Segurança criptografada',
                'Suporte priorirário'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button 
            className="mt-8 w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all"
          >
            Gerenciar Pagamento
          </button>
        </div>
      </div>

      {/* Logout e Perigo */}
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={onLogout}
          className="flex-1 py-4 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Sair do Aplicativo
        </button>
        <button 
          className="flex-1 py-4 rounded-2xl border border-red-900/30 text-red-500/50 font-bold hover:bg-red-900/10 transition-all"
        >
          Excluir minha conta
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
