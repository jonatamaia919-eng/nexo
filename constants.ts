
import { Category } from './types';

export const CATEGORIES: Category[] = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Outros'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  'Alimentação': '#C084FC', // Lilac
  'Transporte': '#818CF8', // Indigo-ish
  'Moradia': '#A78BFA', // Violet
  'Lazer': '#F472B6',   // Pink
  'Saúde': '#F87171',   // Red
  'Educação': '#34D399', // Emerald
  'Outros': '#94A3B8',   // Slate
  'Renda': '#10B981'    // Emerald Green
};

// Gera dinamicamente os últimos 6 meses para os gráficos
export const getDynamicMonthlyData = () => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const data = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      month: months[d.getMonth()],
      amount: Math.floor(Math.random() * 2000) + 1500, // Dados simulados para o gráfico histórico
      fullMonth: d.getMonth(),
      year: d.getFullYear()
    });
  }
  return data;
};

export const MOCK_MONTHLY_DATA = getDynamicMonthlyData();
