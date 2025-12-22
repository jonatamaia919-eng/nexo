
import React from 'react';
import { Transaction } from '../types';
import { CATEGORY_COLORS, CATEGORIES } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface ChartsViewProps {
  transactions: Transaction[];
}

const ChartsView: React.FC<ChartsViewProps> = ({ transactions }) => {
  const categoryData = CATEGORIES.filter(c => c !== 'Renda').map(cat => {
    const total = transactions
      .filter(t => t.type === 'expense' && t.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { name: cat, value: total };
  }).filter(d => d.value > 0);

  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString('pt-BR', { weekday: 'short' });
    const dayValue = transactions
      .filter(t => t.type === 'expense' && new Date(t.date).toDateString() === d.toDateString())
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { day: label, amount: dayValue };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-0">
      <header>
        <h2 className="text-4xl font-extrabold text-white">Análise Visual</h2>
        <p className="text-slate-400 font-medium">Entenda para onde seu dinheiro está indo.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Gastos por Categoria</h3>
          <div className="h-[300px]">
            {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} stroke="none" />
                    ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e1b4b', borderRadius: '12px', border: 'none', color: '#fff' }}
                    />
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-slate-500">Adicione gastos para ver o gráfico.</div>
            )}
          </div>
        </div>

        <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Gastos nos últimos 7 dias</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1e1b4b', borderRadius: '12px', border: 'none' }}
                />
                <Bar dataKey="amount" fill="#818cf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsView;
