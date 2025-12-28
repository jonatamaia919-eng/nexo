
import React from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile | null;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onLogout }) => {
  if (!profile) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header>
        <h2 className="text-4xl font-extrabold text-white">Minha Conta</h2>
        <p className="text-slate-400 font-medium">Informações do usuário autorizado.</p>
      </header>

      <div className="max-w-xl bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700/50 shadow-xl space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-lg">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{profile.name}</h3>
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-600/30">
              Membro Autorizado
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">E-mail de Acesso</label>
            <p className="text-white font-medium text-xl">{profile.email}</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Tipo de Conta</label>
            <p className="text-white font-medium text-xl">Gestão Privada NEXO</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/50 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full py-5 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-3 border border-slate-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sair com Segurança
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
