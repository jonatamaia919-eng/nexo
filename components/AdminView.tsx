
import React from 'react';
import { UserProfile } from '../types';

interface AdminViewProps {
  users: UserProfile[];
  onBack: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ users, onBack }) => {
  const totalUsers = users.length;
  const premiumUsers = users.filter(u => u.hasPaid).length;
  const freeUsers = totalUsers - premiumUsers;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white">Painel Administrador</h2>
          <p className="text-slate-400 font-medium">Gestão e monitoramento da base de usuários NEXO.</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 border border-slate-700 shadow-xl shadow-black/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Voltar ao App
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-800/40 p-6 rounded-[2rem] border border-slate-700/50 shadow-lg">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">Total de Usuários</p>
          <h4 className="text-3xl font-black text-white">{totalUsers}</h4>
        </div>
        <div className="bg-purple-900/20 p-6 rounded-[2rem] border border-purple-700/30 shadow-lg">
          <p className="text-purple-400 font-bold uppercase tracking-widest text-[10px] mb-1">Assinantes Premium</p>
          <h4 className="text-3xl font-black text-white">{premiumUsers}</h4>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-slate-800/50 shadow-lg">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">Contas Free</p>
          <h4 className="text-3xl font-black text-white">{freeUsers}</h4>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-700/50">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Usuário</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Contato</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Plano</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Status Assinatura</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Expira em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                     <div className="flex flex-col items-center gap-4 text-slate-600">
                        <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        <p className="font-medium italic">A base de dados está vazia.</p>
                     </div>
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold">{user.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">ID: {idx + 1001}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                       <p className="text-slate-300 text-sm font-medium">{user.email}</p>
                       <p className="text-slate-500 text-xs mt-1">{user.phone || 'Nenhum telefone'}</p>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block ${user.hasPaid ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' : 'bg-slate-700/50 text-slate-400'}`}>
                        {user.hasPaid ? 'Premium' : 'Free Trial'}
                      </span>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.hasPaid ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                          <span className={`text-xs font-bold ${user.hasPaid ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {user.hasPaid ? 'Ativo' : 'Inativo'}
                          </span>
                       </div>
                    </td>
                    <td className="p-6 text-right">
                       <p className="text-slate-300 text-sm font-bold">
                         {user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString('pt-BR') : '-'}
                       </p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Data Fixa</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 bg-purple-900/10 border border-purple-700/20 rounded-[2.5rem] flex items-center gap-8 group">
        <div className="w-16 h-16 rounded-[1.5rem] bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:rotate-12 transition-transform">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-1">Acesso à Base Local</h4>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Estes dados são persistidos no <b>localStorage</b> deste dispositivo. Para uma solução corporativa, 
            os perfis seriam sincronizados com um banco de dados central (PostgreSQL/MongoDB) e autenticados via JWT para segurança absoluta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
