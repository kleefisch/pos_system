import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainPOS } from './components/MainPOS';
import type { Waiter } from './types';

function App() {
  const [currentWaiter, setCurrentWaiter] = useState<Waiter | null>(null);
  const [userRole, setUserRole] = useState<'waiter' | 'kitchen' | 'manager' | null>(null);

  const handleLogin = (waiter: Waiter, role: 'waiter' | 'kitchen' | 'manager') => {
    setCurrentWaiter(waiter);
    setUserRole(role);
  };

  const handleLogout = () => {
    setCurrentWaiter(null);
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!currentWaiter ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <MainPOS waiter={currentWaiter} role={userRole!} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;