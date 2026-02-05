import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainPOS } from './components/MainPOS';
import type { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'waiter' | 'kitchen' | 'manager' | null>(null);

  const handleLogin = (user: User, role: 'waiter' | 'kitchen' | 'manager') => {
    setCurrentUser(user);
    setUserRole(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!currentUser ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <MainPOS user={currentUser} role={userRole!} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;