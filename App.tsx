
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, Transaction, BankAccount } from './types.ts';
import Onboarding from './components/Onboarding.tsx';
import Registration from './components/Registration.tsx';
import Payment from './components/Payment.tsx';
import Dashboard from './components/Dashboard.tsx';
import ChartsView from './components/ChartsView.tsx';
import AccountsView from './components/AccountsView.tsx';
import BalanceView from './components/BalanceView.tsx';
import ProfileView from './components/ProfileView.tsx';
import AdminView from './components/AdminView.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import Sidebar from './components/Sidebar.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('onboarding');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('nexo_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        if (parsed.hasPaid) setView('dashboard');
        else if (parsed.email) setView('payment');
        else if (parsed.onboardingData) setView('registration');
      } catch (e) {
        console.error("Error parsing profile", e);
      }
    }

    const savedAllUsers = localStorage.getItem('nexo_all_users');
    if (savedAllUsers) {
      try {
        setAllUsers(JSON.parse(savedAllUsers));
      } catch (e) {
        console.error("Error parsing all users", e);
      }
    }

    const savedTransactions = localStorage.getItem('nexo_transactions');
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

    const savedAccounts = localStorage.getItem('nexo_accounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      const initialAccount: BankAccount = {
        id: '1',
        name: 'Carteira Principal',
        balance: 1000,
        color: 'bg-purple-600'
      };
      setAccounts([initialAccount]);
    }
  }, []);

  useEffect(() => {
    if (profile) localStorage.setItem('nexo_profile', JSON.stringify(profile));
    localStorage.setItem('nexo_all_users', JSON.stringify(allUsers));
    localStorage.setItem('nexo_transactions', JSON.stringify(transactions));
    localStorage.setItem('nexo_accounts', JSON.stringify(accounts));
  }, [profile, allUsers, transactions, accounts]);

  const handleOnboardingComplete = (data: NonNullable<UserProfile['onboardingData']>) => {
    setProfile({
      name: '',
      hasPaid: false,
      onboardingData: data
    });
    setView('registration');
  };

  const handleRegistrationComplete = (userData: Pick<UserProfile, 'name' | 'email' | 'phone' | 'password'>) => {
    if (profile) {
      const newProfile: UserProfile = { ...profile, ...userData };
      setProfile(newProfile);
      
      setAllUsers(prev => {
        const index = prev.findIndex(u => u.email === userData.email);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = newProfile;
          return updated;
        }
        return [...prev, newProfile];
      });
      setView('payment');
    }
  };

  const handleLoginComplete = (email: string) => {
    const user = allUsers.find(u => u.email === email);
    if (user) {
      setProfile(user);
      setView(user.hasPaid ? 'dashboard' : 'payment');
    }
  };

  const handlePaymentComplete = () => {
    if (profile) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      
      const updatedProfile = { 
        ...profile, 
        hasPaid: true,
        subscriptionEndDate: endDate.toISOString()
      };
      
      setProfile(updatedProfile);
      setAllUsers(prev => prev.map(u => u.email === updatedProfile.email ? updatedProfile : u));
      setView('dashboard');
    }
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

  const updateTransaction = (updated: Transaction) => {
    const oldTransaction = transactions.find(t => t.id === updated.id);
    if (!oldTransaction) return;

    // Atualiza a lista de transações
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));

    // Ajusta o saldo das contas
    setAccounts(prev => prev.map(acc => {
      let newBalance = acc.balance;

      // Reverte o impacto da transação antiga se for na mesma conta
      if (acc.id === oldTransaction.accountId) {
        newBalance = oldTransaction.type === 'income' 
          ? newBalance - oldTransaction.amount 
          : newBalance + oldTransaction.amount;
      }

      // Aplica o impacto da nova transação atualizada
      if (acc.id === updated.accountId) {
        newBalance = updated.type === 'income' 
          ? newBalance + updated.amount 
          : newBalance - updated.amount;
      }

      return { ...acc, balance: newBalance };
    }));
  };

  const addAccount = (acc: Omit<BankAccount, 'id'>) => {
    setAccounts([...accounts, { ...acc, id: Date.now().toString() }]);
  };

  const updateAccountBalance = (id: string, newBalance: number) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, balance: newBalance } : acc));
  };

  const handleLogout = () => {
    localStorage.removeItem('nexo_profile');
    setProfile(null);
    setIsAdminAuthenticated(false);
    setView('onboarding');
  };

  const renderView = () => {
    switch (view) {
      case 'onboarding': return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'registration': return <Registration onComplete={handleRegistrationComplete} onLogin={handleLoginComplete} users={allUsers} />;
      case 'payment': return <Payment onComplete={handlePaymentComplete} />;
      case 'dashboard': return <Dashboard transactions={transactions} accounts={accounts} onAddTransaction={addTransaction} onUpdateTransaction={updateTransaction} />;
      case 'charts': return <ChartsView transactions={transactions} />;
      case 'accounts': return <AccountsView accounts={accounts} onAddAccount={addAccount} onUpdateBalance={updateAccountBalance} />;
      case 'balance': return <BalanceView transactions={transactions} accounts={accounts} />;
      case 'profile': return <ProfileView profile={profile} onLogout={handleLogout} />;
      case 'admin': 
        return isAdminAuthenticated 
          ? <AdminView users={allUsers} onBack={() => setView('dashboard')} />
          : <AdminLogin onAuthenticated={() => setIsAdminAuthenticated(true)} onBack={() => setView('dashboard')} />;
      default: return <Dashboard transactions={transactions} accounts={accounts} onAddTransaction={addTransaction} onUpdateTransaction={updateTransaction} />;
    }
  };

  const noNavViews: AppView[] = ['onboarding', 'registration', 'payment'];
  const showNav = !noNavViews.includes(view);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col md:flex-row">
      {showNav && <Sidebar activeView={view} setView={setView} />}
      <main className={`flex-1 overflow-y-auto ${showNav ? 'p-4 md:p-8 lg:p-12' : ''}`}>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
