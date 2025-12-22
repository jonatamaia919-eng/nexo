
import React, { useState } from 'react';
import { BankAccount } from '../types';

interface AccountsViewProps {
  accounts: BankAccount[];
  onAddAccount: (acc: Omit<BankAccount, 'id'>) => void;
  onUpdateBalance: (id: string, newBalance: number) => void;
}

const AccountsView: React.FC<AccountsViewProps> = ({ accounts, onAddAccount, onUpdateBalance }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [adjustingAccount, setAdjustingAccount] = useState<BankAccount | null>(null);
  const [newAcc, setNewAcc] = useState({ name: '', balance: '' });
  const [adjustValue, setAdjustValue] = useState('');

  const handleAdd = () => {
    if (!newAcc.name || !newAcc.balance) return;
    onAddAccount({
      name: newAcc.name,
      balance: parseFloat(newAcc.balance),
      color: 'bg-purple-600'
    });
    setNewAcc({ name: '', balance: '' });
    setShowAdd(false);
  };

  const handleAdjustSubmit = () => {
    if (adjustingAccount && adjustValue !== '') {
      onUpdateBalance(adjustingAccount.id, parseFloat(adjustValue));
      setAdjustingAccount(null);
      setAdjustValue('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-white">Meus Bancos</h2>
          <p className="text-slate-400 font-medium">Controle manual e seguro de onde está seu dinheiro.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20"
        >
          Novo Banco
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(acc => (
          <div key={acc.id} className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 overflow-hidden shadow-xl flex flex-col hover:border-purple-600 transition-colors group">
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                  <div className="bg-purple-600/20 p-3 rounded-2xl text-purple-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">Ativo</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{acc.name}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Saldo Atual</p>
                <h4 className="text-4xl font-black text-white mt-2">R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
              </div>
            </div>
            <div className="mt-auto border-t border-slate-700/50 p-6 flex gap-4">
                <button 
                  onClick={() => { setAdjustingAccount(acc); setAdjustValue(acc.balance.toString()); }}
                  className="flex-1 py-3 text-sm font-bold bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Ajustar Saldo
                </button>
                <button className="flex-1 py-3 text-sm font-bold bg-white/5 rounded-xl hover:bg-white/10 transition-colors">Extrato</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50 flex items-center gap-6">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-600/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <div>
              <h3 className="text-xl font-bold text-white">Segurança em primeiro lugar</h3>
              <p className="text-slate-400">O NEXO nunca pede suas senhas bancárias. Você tem o controle total através do preenchimento manual, sem riscos de fraude ou vazamentos.</p>
          </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-8">Adicionar Novo Banco</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nome do Banco</label>
                <input
                  type="text"
                  placeholder="Ex: Nubank, Itaú, Bradesco..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none"
                  value={newAcc.name}
                  onChange={e => setNewAcc({...newAcc, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Saldo Inicial</label>
                <input
                  type="number"
                  placeholder="0,00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none"
                  value={newAcc.balance}
                  onChange={e => setNewAcc({...newAcc, balance: e.target.value})}
                />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-4 text-slate-400 font-bold">Cancelar</button>
                <button
                    onClick={handleAdd}
                    className="flex-[2] py-4 rounded-xl bg-purple-600 text-white font-bold text-lg"
                >
                    Salvar Banco
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {adjustingAccount && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-2">Ajustar Saldo</h3>
            <p className="text-slate-400 text-sm mb-8">Defina o saldo atual da conta <span className="text-purple-400 font-bold">{adjustingAccount.name}</span></p>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Novo Saldo Atual</label>
                <input
                  autoFocus
                  type="number"
                  placeholder="0,00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none text-2xl font-black"
                  value={adjustValue}
                  onChange={e => setAdjustValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAdjustSubmit()}
                />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setAdjustingAccount(null)} className="flex-1 py-4 text-slate-400 font-bold">Cancelar</button>
                <button
                    onClick={handleAdjustSubmit}
                    className="flex-[2] py-4 rounded-xl bg-purple-600 text-white font-bold text-lg"
                >
                    Confirmar Ajuste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsView;
