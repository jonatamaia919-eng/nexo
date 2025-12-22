
import React from 'react';
import { CreditCard, Expense } from '../types';

interface CardsViewProps {
  cards: CreditCard[];
  expenses: Expense[];
}

const CardsView: React.FC<CardsViewProps> = ({ cards, expenses }) => {
  const today = new Date();
  const currentDay = today.getDate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-white">Seus Cartões</h2>
          <p className="text-slate-400 font-medium">Controle faturas e limites num só lugar.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl font-bold border border-slate-700 transition-all">
          Adicionar Cartão
        </button>
      </header>

      {/* Notifications Section */}
      <div className="space-y-4">
        {cards.map(card => {
          const daysToDue = card.dueDay - currentDay;
          const isDueSoon = daysToDue >= 0 && daysToDue <= 5;
          if (!isDueSoon) return null;

          return (
            <div key={`notif-${card.id}`} className="bg-rose-500/10 border border-rose-500/50 p-6 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-left-4 duration-500">
              <div className="bg-rose-500 p-3 rounded-2xl text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="text-rose-400 font-bold">Fatura {card.name} vencendo!</h4>
                <p className="text-rose-200/70 text-sm">O vencimento é dia {card.dueDay}. Faltam apenas {daysToDue} dias.</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => {
          const cardExpenses = expenses.filter(e => e.cardId === card.id);
          const billTotal = cardExpenses.reduce((acc, curr) => acc + curr.amount, 0);
          const limitPercentage = (billTotal / card.limit) * 100;

          return (
            <div key={card.id} className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 overflow-hidden shadow-xl flex flex-col group hover:border-purple-600/50 transition-all">
              <div className={`${card.color} p-8 text-white h-48 relative`}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{card.name}</p>
                        <p className="text-lg font-bold">•••• •••• •••• {card.lastFour}</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                    </div>
                </div>
                <div className="absolute bottom-8 left-8">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Vencimento</p>
                    <p className="font-bold">Dia {card.dueDay}</p>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    <span>Limite Usado</span>
                    <span>{limitPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(limitPercentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Fatura Atual</p>
                        <h4 className="text-3xl font-black text-white">R$ {billTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                    </div>
                    <button className="text-purple-400 font-bold text-sm bg-purple-400/10 px-4 py-2 rounded-xl hover:bg-purple-400/20 transition-all">Detalhes</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6">Próximos Fechamentos</h3>
          <div className="space-y-4">
              {cards.map(card => (
                  <div key={card.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700 hover:border-purple-600/30 transition-all">
                      <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${card.color}`}></div>
                          <div>
                              <p className="font-bold text-white">{card.name}</p>
                              <p className="text-xs text-slate-500">Fecha em alguns dias</p>
                          </div>
                      </div>
                      <p className="font-bold text-slate-300">Dia {card.closingDay}</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default CardsView;
