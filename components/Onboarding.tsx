
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (data: NonNullable<UserProfile['onboardingData']>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    anotaGastos: '',
    maiorPeso: '',
    objetivo: ''
  });

  const nextStep = () => setStep(step + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Você costuma anotar seus gastos atualmente?
            </h2>
            <div className="grid gap-4">
              {['Sim', 'Não'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setAnswers({ ...answers, anotaGastos: opt }); nextStep(); }}
                  className="w-full text-left p-6 rounded-2xl border-2 border-purple-800 bg-purple-900/20 hover:bg-purple-600 hover:border-purple-400 transition-all text-xl font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              O que mais pesa no seu bolso hoje?
            </h2>
            <div className="grid gap-4">
              {[
                { label: 'Cartão de crédito', value: 'cartao' },
                { label: 'Gastos do dia a dia', value: 'dia_a_dia' },
                { label: 'Falta de controle', value: 'controle' },
                { label: 'Tudo isso 😅', value: 'tudo' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setAnswers({ ...answers, maiorPeso: opt.label }); nextStep(); }}
                  className="w-full text-left p-6 rounded-2xl border-2 border-purple-800 bg-purple-900/20 hover:bg-purple-600 hover:border-purple-400 transition-all text-xl font-medium"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Seu objetivo com o NEXO é:
            </h2>
            <div className="grid gap-4">
              {[
                'Organizar melhor meu dinheiro',
                'Economizar',
                'Entender onde estou gastando demais'
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setAnswers({ ...answers, objetivo: opt }); nextStep(); }}
                  className="w-full text-left p-6 rounded-2xl border-2 border-purple-800 bg-purple-900/20 hover:bg-purple-600 hover:border-purple-400 transition-all text-xl font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-500 mb-4 shadow-lg shadow-purple-500/50">
               <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Análise Concluída!
            </h2>
            <p className="text-purple-200 text-xl md:text-2xl max-w-lg mx-auto leading-relaxed">
              Com base no seu perfil, o <span className="font-bold text-white">NEXO</span> pode te ajudar a ter mais controle e clareza sobre seu dinheiro.
            </p>
            <button
              onClick={() => onComplete(answers)}
              className="w-full max-w-sm py-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-2xl font-bold shadow-xl shadow-purple-900/40 transition-all hover:scale-105"
            >
              Criar minha conta
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#0f172a]">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
            <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                NEXO
            </h1>
            <div className="mt-2 flex justify-center gap-1">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 w-8 rounded-full ${step >= i ? 'bg-purple-500' : 'bg-slate-700'}`} />
                ))}
            </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
