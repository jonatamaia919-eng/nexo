
import React from 'react';

interface PaymentProps {
  onComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Escolha o plano ideal para você</h2>
          <ul className="space-y-4">
            {[
              'Controle completo de gastos',
              'Gráficos mensais interativos',
              'Gestão de múltiplos cartões',
              'Relatórios financeiros automáticos',
              'Acesso ilimitado e vitalício'
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-purple-200 text-lg">
                <div className="bg-purple-600 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6">
          {/* Monthly */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-purple-600 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-white">Mensal</h3>
                    <p className="text-slate-400">Pague mês a mês</p>
                </div>
            </div>
            <div className="text-4xl font-black text-white mb-6">
                R$ 29,90 <span className="text-lg font-normal text-slate-500">/mês</span>
            </div>
            <button
              onClick={onComplete}
              className="w-full py-4 rounded-xl border-2 border-purple-600 text-purple-400 font-bold group-hover:bg-purple-600 group-hover:text-white transition-all"
            >
              Assinar agora
            </button>
          </div>

          {/* Annual */}
          <div className="bg-purple-900/40 p-8 rounded-3xl border-2 border-purple-500 relative shadow-2xl shadow-purple-900/20 cursor-pointer scale-105">
            <div className="absolute -top-3 right-8 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Mais vantajoso
            </div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Anual</h3>
                <p className="text-purple-200">Economize 30% ao ano</p>
            </div>
            <div className="text-4xl font-black text-white mb-6">
                R$ 19,90 <span className="text-lg font-normal text-purple-300">/mês</span>
            </div>
            <button
              onClick={onComplete}
              className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30"
            >
              Assinar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
