
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setView }) => {
  const items = [
    { id: 'dashboard', label: 'Início', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'charts', label: 'Gráficos', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'accounts', label: 'Bancos', icon: 'M8 14v20c0 4.418 7.163 8 16 8 8.837 0 16-3.582 16-8V14M8 14c0 4.418 7.163 8 16 8 8.837 0 16-3.582 16-8M8 14c0-4.418 7.163-8 16-8 8.837 0 16 3.582 16 8' },
    { id: 'balance', label: 'Balanço', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'profile', label: 'Perfil', icon: 'M24 22c5.523 0 10-4.477 10-10S29.523 2 24 2 14 6.477 14 12s4.477 10 10 10zm0 4c-8.837 0-16 7.163-16 16v2h32v-2c0-8.837-7.163-16-16-16z' },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1e1b4b] border-t border-purple-900/50 flex justify-around p-4 z-50">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppView)}
            className={`flex flex-col items-center gap-1 ${activeView === item.id ? 'text-purple-400' : 'text-slate-500'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d={item.icon} />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <nav className="hidden md:flex flex-col w-64 bg-[#1e1b4b]/50 border-r border-purple-900/30 p-8 h-screen sticky top-0">
        <h1 className="text-3xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 tracking-tighter cursor-pointer" onClick={() => setView('dashboard')}>NEXO</h1>
        <div className="space-y-4">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all ${activeView === item.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-auto pt-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Status</p>
                <p className="font-bold text-lg">Acesso Seguro</p>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
