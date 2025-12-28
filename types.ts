
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

/**
 * UserProfile interface updated to include optional fields used across the application.
 */
export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  onboardingData?: {
    anotaGastos: string;
    maiorPeso: string;
    objetivo: string;
  };
  hasPaid?: boolean;
  subscriptionEndDate?: string;
}

/**
 * CreditCard interface for managing card details and limits.
 */
export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  dueDay: number;
  closingDay: number;
  lastFour: string;
  color: string;
}

/**
 * Expense interface specifically for credit card transactions.
 */
export interface Expense {
  id: string;
  cardId: string;
  amount: number;
  description: string;
  date: string;
}

export type AppView = 'login' | 'dashboard' | 'charts' | 'accounts' | 'balance' | 'profile';
