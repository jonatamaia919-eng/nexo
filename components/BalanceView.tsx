
import React from 'react';
import { Transaction, BankAccount } from '../types';

interface BalanceViewProps {
  transactions: Transaction[];
  accounts: BankAccount[];
}

const BalanceView: React.FC<BalanceViewProps> = ({ transactions, accounts }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalIncomeMonth = transactions
    .filter(t => {
      const d = new Date(t.date);
      return t.type === 'income' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSpentMonth = transactions
    .filter(t => {
      const d = new Date(t.date);
      return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const netMonthly = totalIncomeMonth - totalSpentMonth;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header>
        <h2 className="text-4xl font-extrabold text-white">Balanço do Mês</h2>
        <p className="text-slate-400 font-medium">Veja como seu patrimônio está se comportando em {now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-900/20 p-8 rounded-[2.5rem] border border-emerald-800/50 shadow-xl group hover:border-emerald-500/50 transition-all">
          <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Entradas do Mês</p>
          <h3 className="text-4xl font-black text-white">R$ {totalIncomeMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <div className="mt-4 flex items-center gap-2 text-emerald-500/80 text-xs font-bold">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
             Ganhos Brutos
          </div>
        </div>

        <div className="bg-red-900/20 p-8 rounded-[2.5rem] border border-red-800/50 shadow-xl group hover:border-red-500/50 transition-all">
          <p className="text-red-400 font-bold uppercase tracking-widest text-xs mb-2">Saídas do Mês</p>
          <h3 className="text-4xl font-black text-white">R$ {totalSpentMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <div className="mt-4 flex items-center gap-2 text-red-500/80 text-xs font-bold">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
             Despesas Fixas e Variáveis
          </div>
        </div>

        <div className="bg-purple-900/30 p-8 rounded-[2.5rem] border border-purple-800/50 shadow-xl group hover:border-purple-500/50 transition-all">
          <p className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-2">Dinheiro em Caixa</p>
          <h3 className="text-4xl font-black text-white">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <div className="mt-4 flex items-center gap-2 text-purple-400/80 text-xs font-bold">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             Total Patrimonial
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 p-8 shadow-xl">
        <h3 className="text-2xl font-extrabold text-white mb-8">Performance Financeira</h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-6 border-b border-slate-700">
            <div>
              <p className="font-bold text-white text-lg">Economia Líquida</p>
              <p className="text-sm text-slate-500">O lucro/prejuízo real do mês atual.</p>
            </div>
            <p className={`text-3xl font-black ${netMonthly >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {netMonthly >= 0 ? '+' : ''} R$ {netMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="flex justify-between items-center pb-6">
            <div>
              <p className="font-bold text-white text-lg">Distribuição por Conta</p>
              <p className="text-sm text-slate-500">Porcentagem do seu capital em cada banco.</p>
            </div>
            <div className="text-right space-y-1">
              {accounts.map(a => (
                <div key={a.id} className="flex items-center justify-end gap-3">
                   <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{a.name}</span>
                   <span className="text-white font-black">{((a.balance / totalBalance) * 100 || 0).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-700/30 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.84-.44-3.41-1.62-4.04-3.12l1.79-.75c.4 1 1.34 1.83 2.25 2.14 1.25.42 2.76-.08 3.39-1.23.63-1.15.25-2.61-.91-3.23-1.42-.76-3.87-1.1-4.82-2.84-.96-1.74-.35-4.01 1.49-5.11V2h2.82v1.91c1.47.35 2.84 1.25 3.51 2.5l-1.65.86c-.36-.71-1.09-1.3-1.86-1.48-1.21-.29-2.58.26-3.13 1.25-.54.99-.21 2.24.78 2.78 1.24.68 3.33 1.05 4.41 3 1.08 1.95.42 4.49-1.54 5.42z"/></svg>
        </div>
        <p className="text-indigo-200 italic font-medium text-lg leading-relaxed relative z-10">
          "A melhor forma de prever o futuro financeiro é criá-lo hoje através do controle rigoroso."
        </p>
      </div>
    </div>
  );
};

export default BalanceView;
