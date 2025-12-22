
import React, { useState } from 'react';

interface PaymentProps {
  onComplete: () => void;
}

type PaymentStep = 'plans' | 'checkout' | 'processing' | 'success';
type PaymentMethod = 'card' | 'pix';

const Payment: React.FC<PaymentProps> = ({ onComplete }) => {
  const [step, setStep] = useState<PaymentStep>('plans');
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [copied, setCopied] = useState(false);

  const pixKey = "16997609082";

  const handlePlanSelect = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setStep('checkout');
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulação de chamada de API para o Gateway
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
        <p className="text-slate-400">Estamos validando o seu {method === 'pix' ? 'recebimento PIX' : 'cartão'}...</p>
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
            
            <h2 className="text-3xl font-black text-white mb-2">Checkout</h2>
            <p className="text-slate-400 mb-8">Plano <span className="text-purple-400 font-bold">{selectedPlan?.name}</span> • R$ {selectedPlan?.price}</p>
            
            {/* Payment Method Tabs */}
            <div className="flex bg-slate-900 rounded-2xl p-1 mb-8">
                <button 
                    onClick={() => setMethod('card')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${method === 'card' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Cartão
                </button>
                <button 
                    onClick={() => setMethod('pix')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${method === 'pix' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    PIX
                </button>
            </div>

            {method === 'card' ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Número do Cartão</label>
                        <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none" value={cardData.number} onChange={e => setCardData({...cardData, number: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nome no Cartão</label>
                        <input required type="text" placeholder="COMO ESTÁ NO CARTÃO" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none uppercase" value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Validade</label>
                            <input required type="text" placeholder="MM/AA" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">CVV</label>
                            <input required type="text" placeholder="123" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-purple-600 outline-none" value={cardData.cvv} onChange={e => setCardData({...cardData, cvv: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xl shadow-xl shadow-purple-600/20 transition-all mt-4">Confirmar Pagamento</button>
                </form>
            ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-white p-4 rounded-3xl w-48 h-48 mx-auto shadow-2xl relative group">
                        {/* Simulação de QR Code via SVG */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                            <path d="M10 10h30v30H10zM60 10h30v30H60zM10 60h30v30H10z" fill="none" stroke="currentColor" strokeWidth="4"/>
                            <path d="M20 20h10v10H20zM70 20h10v10H70zM20 70h10v10H20z" fill="currentColor"/>
                            <path d="M45 10v35h5v-35zM10 45h35v5h-35zM60 45h35v5h-35zM45 60v35h5v-35z" fill="currentColor" opacity="0.3"/>
                            <rect x="45" y="45" width="10" height="10" rx="2" fill="#7c3aed"/>
                        </svg>
                        <div className="absolute inset-0 bg-purple-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                            <span className="text-purple-600 font-black text-[10px] uppercase tracking-tighter">Escaneie no App</span>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Chave PIX (Telefone)</p>
                            <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between border border-slate-700">
                                <span className="text-white font-black text-lg">{pixKey}</span>
                                <button 
                                    onClick={copyPixKey}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
                                >
                                    {copied ? 'Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/20">
                            <p className="text-xs text-purple-300 leading-relaxed">
                                Abra o app do seu banco, escolha <b>PIX</b> e escaneie o código acima ou cole a chave. O acesso é liberado instantaneamente após a confirmação.
                            </p>
                        </div>

                        <button 
                            onClick={handleCheckoutSubmit}
                            className="w-full py-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xl shadow-xl shadow-purple-600/20 transition-all"
                        >
                            Já realizei o pagamento
                        </button>
                    </div>
                </div>
            )}
            
            <div className="mt-8 flex items-center justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <div className="h-4 w-[1px] bg-slate-700"></div>
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#32b1a4]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10L12 2zm0 17.5L4.5 12 12 4.5 19.5 12 12 19.5z"/></svg>
                    <span className="text-[10px] font-black text-[#32b1a4] uppercase">Pix Seguro</span>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
