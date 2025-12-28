
import React, { useState } from 'react';
import { Transaction, BankAccount, Category, TransactionType } from '../types.ts';
import { CATEGORIES, getDynamicMonthlyData } from '../constants.ts';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
  accounts: BankAccount[];
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, accounts, onAddTransaction }) => {
  const [showModal, setShowModal] = useState<'expense' | 'income' | null>(null);
  const [newT, setNewT] = useState({ description: '', amount: '', category: 'Outros' as Category, accountId: accounts[0]?.id || '' });

  const dynamicData = getDynamicMonthlyData();
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  
  const now = new Date();
  const currentMonth = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(now);
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const totalSpentMonth = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === now.getMonth() && new Date(t.date).getFullYear() === now.getFullYear())
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Função para tratar o valor no formato BR
  const parseBRL = (value: string): number => {
    if (!value) return 0;
    // Remove pontos de milhar e substitui vírgula por ponto
    const cleanValue = value.replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanValue) || 0;
  };

  const handleAdd = () => {
    const numericAmount = parseBRL(newT.amount);
    if (!newT.description || numericAmount <= 0 || !newT.accountId || !showModal) return;
    
    onAddTransaction({
      description: newT.description,
      amount: numericAmount,
      category: showModal === 'income' ? 'Renda' : newT.category,
      type: showModal,
      date: new Date().toISOString(),
      accountId: newT.accountId
    });
    setNewT({ description: '', amount: '', category: 'Outros', accountId: accounts[0]?.id || '' });
    setShowModal(null);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white">Olá! 👋</h2>
          <p className="text-slate-400 font-medium">Controle total em {capitalizedMonth}.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowModal('income'); setNewT(p => ({...p, category: 'Renda'})); }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-2xl font-bold text-white transition-all shadow-lg shadow-emerald-600/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            Entrada
          </button>
          <button
            onClick={() => setShowModal('expense')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl font-bold text-white transition-all shadow-lg shadow-purple-600/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"></path></svg>
            Gasto
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-purple-900/30 p-8 rounded-[2.5rem] border border-purple-800/50 shadow-xl">
          <p className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-2">Saldo Total (Dinheiro)</p>
          <h3 className="text-5xl font-black text-white">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="mt-4 text-slate-400 text-sm font-medium">Soma de todas as suas contas bancárias.</p>
        </div>

        <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50 shadow-xl lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Seu dinheiro no tempo</p>
            <div className="text-xs text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full">Gastos em {capitalizedMonth}: R$ {totalSpentMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1e1b4b', borderRadius: '12px', border: 'none' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                />
                <Bar dataKey="amount" radius={[8, 8, 8, 8]}>
                  {dynamicData.map((entry, index) => (
                    <Cell key={index} fill={index === dynamicData.length - 1 ? '#a855f7' : '#475569'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 p-8 shadow-xl">
        <h3 className="text-2xl font-extrabold text-white mb-8">Movimentações Recentes</h3>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-slate-500">Nenhuma movimentação ainda.</p>
            </div>
          ) : (
            transactions.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-transparent hover:border-slate-700 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${t.type === 'income' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-purple-600/20 text-purple-400'}`}>
                    {t.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.description}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                        {accounts.find(a => a.id === t.accountId)?.name} • {t.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                    {t.type === 'income' ? '' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    {new Date(t.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-8">
                {showModal === 'income' ? 'Adicionar Dinheiro' : 'Novo Gasto'}
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Descrição</label>
                <input
                  type="text"
                  placeholder="Ex: Salário, Venda, Almoço..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                  value={newT.description}
                  onChange={e => setNewT({...newT, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Valor (R$)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                    value={newT.amount}
                    onChange={e => setNewT({...newT, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Banco/Conta</label>
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                    value={newT.accountId}
                    onChange={e => setNewT({...newT, accountId: e.target.value})}
                  >
                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              </div>
              {showModal === 'expense' && (
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Categoria</label>
                    <select
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                    value={newT.category}
                    onChange={e => setNewT({...newT, category: e.target.value as Category})}
                    >
                    {CATEGORIES.filter(c => c !== 'Renda').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
              )}
              <div className="flex gap-4">
                <button onClick={() => setShowModal(null)} className="flex-1 py-4 text-slate-400 font-bold">Cancelar</button>
                <button
                    onClick={handleAdd}
                    className={`flex-[2] py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${showModal === 'income' ? 'bg-emerald-600' : 'bg-purple-600'}`}
                >
                    Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
