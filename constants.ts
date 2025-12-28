
import { Category, UserProfile } from './types';

export const AUTHORIZED_USERS: UserProfile[] = [
  {
    email: "acesso@nexo.com.br",
    password: "nexo2025",
    name: "Usuário Autorizado"
  },
  {
    email: "usuario1@nexo.com.br",
    password: "nexo123",
    name: "Usuário NEXO"
  },
  {
    email: "admin@nexo.com.br",
    password: "adminnexo",
    name: "Administrador"
  }
];

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
  'Alimentação': '#C084FC',
  'Transporte': '#818CF8',
  'Moradia': '#A78BFA',
  'Lazer': '#F472B6',
  'Saúde': '#F87171',
  'Educação': '#34D399',
  'Outros': '#94A3B8',
  'Renda': '#10B981'
};

export const getDynamicMonthlyData = () => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const data = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      month: months[d.getMonth()],
      amount: Math.floor(Math.random() * 2000) + 1500,
      fullMonth: d.getMonth(),
      year: d.getFullYear()
    });
  }
  return data;
};
