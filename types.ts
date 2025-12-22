
export type Category = 'Alimentação' | 'Transporte' | 'Moradia' | 'Lazer' | 'Saúde' | 'Educação' | 'Outros' | 'Renda';

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: Category;
  date: string;
  accountId: string;
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  color: string;
}

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  lastFour: string;
  dueDay: number;
  closingDay: number;
  color: string;
}

export interface Expense {
  id: string;
  amount: number;
  cardId: string;
  description: string;
  category: Category;
  date: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  hasPaid: boolean;
  subscriptionEndDate?: string;
  onboardingData: {
    anotaGastos: string;
    maiorPeso: string;
    objetivo: string;
  } | null;
}

export type AppView = 'onboarding' | 'registration' | 'payment' | 'dashboard' | 'charts' | 'accounts' | 'balance' | 'profile' | 'admin';
