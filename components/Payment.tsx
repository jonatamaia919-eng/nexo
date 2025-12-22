
import React, { useState } from 'react';

interface PaymentProps {
  onComplete: () => void;
}

type PaymentStep = 'plans' | 'checkout' | 'processing' | 'success';

const Payment: React.FC<PaymentProps> = ({ onComplete }) => {
  const [step, setStep] = useState<PaymentStep>('plans');
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const handlePlanSelect = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setStep('checkout');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulação de chamada de API para o Gateway (Stripe/Mercado Pago)
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0f172a] text-center">
        <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-black text-white mb-2">Processando Pagamento</h2>
        <p className="text-slate-400">Estamos validando os dados com sua operadora...</p>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0f172a] text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-4xl font-black text-white mb-2">Sucesso!</h2>
        <p className="text-emerald-400 text-xl font-bold">Sua assinatura NEXO Premium está ativa.</p>
        <p className="text-slate-400 mt-4">Redirecionando para o seu dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="w-full max-w-5xl">
        {step === 'plans' ? (
          <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in duration-500">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Desbloqueie o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">NEXO</span>
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed">
                Junte-se a milhares de pessoas que organizaram sua vida financeira com simplicidade e elegância.
              </p>
              <ul className="space-y-4">
                {['Gráficos interativos ilimitados', 'Gestão de múltiplos bancos', 'Relatórios de balanço mensal', 'Acesso Vitalício sem anúncios'].map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <div className="bg-emerald-500/20 p-1 rounded-full text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6">
              <div 
                onClick={() => handlePlanSelect('Mensal', '29,90')}
                className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700 hover:border-purple-500 transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Plano Mensal</h3>
                  <span className="text-slate-500 text-sm">Pague por mês</span>
                </div>
                <div className="text-4xl font-black text-white mb-6">R$ 29,90 <span className="text-sm font-normal text-slate-500">/mês</span></div>
                <button className="w-full py-4 rounded-2xl bg-white/5 text-white font-bold group-hover:bg-purple-600 transition-all">Selecionar</button>
              </div>

              <div 
                onClick={() => handlePlanSelect('Anual', '19,90')}
                className="bg-purple-900/20 p-8 rounded-[2.5rem] border-2 border-purple-500 relative shadow-2xl shadow-purple-900/20 cursor-pointer group hover:-translate-y-1 scale-105"
              >
                <div className="absolute -top-3 right-8 bg-purple-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Mais Popular</div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Plano Anual</h3>
                  <span className="text-purple-300 text-sm">Economize 33%</span>
                </div>
                <div className="text-4xl font-black text-white mb-6">R$ 19,90 <span className="text-sm font-normal text-purple-300">/mês</span></div>
                <button className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold group-hover:bg-purple-500 transition-all">Assinar Agora</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-slate-800/40 p-10 rounded-[3rem] border border-slate-700 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            <button onClick={() => setStep('plans')} className="text-slate-500 hover:text-white mb-6 flex items-center gap-2 font-bold text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Voltar aos planos
            </button>
            <h2 className="text-3xl font-black text-white mb-2">Pagamento</h2>
            <p className="text-slate-400 mb-8">Você escolheu o plano <span className="text-purple-400 font-bold">{selectedPlan?.name}</span>.</p>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Número do Cartão</label>
                <input 
                  required
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                  value={cardData.number}
                  onChange={e => setCardData({...cardData, number: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nome no Cartão</label>
                <input 
                  required
                  type="text" 
                  placeholder="COMO ESTÁ NO CARTÃO"
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none uppercase"
                  value={cardData.name}
                  onChange={e => setCardData({...cardData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Validade</label>
                  <input 
                    required
                    type="text" 
                    placeholder="MM/AA"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                    value={cardData.expiry}
                    onChange={e => setCardData({...cardData, expiry: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">CVV</label>
                  <input 
                    required
                    type="text" 
                    placeholder="123"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none"
                    value={cardData.cvv}
                    onChange={e => setCardData({...cardData, cvv: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xl shadow-xl shadow-purple-600/20 transition-all"
                >
                  Confirmar R$ {selectedPlan?.price}
                </button>
                <div className="flex items-center justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
