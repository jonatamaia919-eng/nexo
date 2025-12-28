
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, Transaction, BankAccount } from './types.ts';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';
import ChartsView from './components/ChartsView.tsx';
import AccountsView from './components/AccountsView.tsx';
import BalanceView from './components/BalanceView.tsx';
import ProfileView from './components/ProfileView.tsx';
import Sidebar from './components/Sidebar.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('nexo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }

    const savedTransactions = localStorage.getItem('nexo_transactions');
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

    const savedAccounts = localStorage.getItem('nexo_accounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      setAccounts([{ id: '1', name: 'Carteira Principal', balance: 0, color: 'bg-purple-600' }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexo_transactions', JSON.stringify(transactions));
    localStorage.setItem('nexo_accounts', JSON.stringify(accounts));
  }, [transactions, accounts]);

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('nexo_user', JSON.stringify(userData));
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('nexo_user');
    setUser(null);
    setView('login');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions([newTransaction, ...transactions]);
    
    setAccounts(prev => prev.map(acc => {
      if (acc.id === transaction.accountId) {
        return {
          ...acc,
          balance: transaction.type === 'income' 
            ? acc.balance + transaction.amount 
            : acc.balance - transaction.amount
        };
      }
      return acc;
    }));
  };

  const addAccount = (acc: Omit<BankAccount, 'id'>) => {
    setAccounts([...accounts, { ...acc, id: Date.now().toString() }]);
  };

  const updateAccountBalance = (id: string, newBalance: number) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, balance: newBalance } : acc));
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard transactions={transactions} accounts={accounts} onAddTransaction={addTransaction} />;
      case 'charts': return <ChartsView transactions={transactions} />;
      case 'accounts': return <AccountsView accounts={accounts} onAddAccount={addAccount} onUpdateBalance={updateAccountBalance} />;
      case 'balance': return <BalanceView transactions={transactions} accounts={accounts} />;
      case 'profile': return <ProfileView profile={user} onLogout={handleLogout} />;
      default: return <Dashboard transactions={transactions} accounts={accounts} onAddTransaction={addTransaction} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col md:flex-row">
      <Sidebar activeView={view} setView={setView} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
