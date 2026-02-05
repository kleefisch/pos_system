import { useState } from 'react';
import { LogIn, User, ChefHat, Shield, Eye, EyeOff } from 'lucide-react';
import { OrderFlowLogo } from './OrderFlowLogo';
import type { Waiter } from '../types';
import * as api from '../services/api';

interface LoginScreenProps {
  onLogin: (waiter: Waiter, role: 'waiter' | 'kitchen' | 'manager') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState<'waiter' | 'kitchen' | 'manager'>('waiter');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await api.login(username, password, loginType);
    
    setIsLoading(false);
    
    if (result.success && result.user && result.role) {
      onLogin(result.user, result.role);
      setError('');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <OrderFlowLogo size="lg" />
          </div>
          <p className="text-gray-600 text-sm">Log in to continue</p>
        </div>

        {/* Login Type Selector */}
        <div className="flex space-x-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setLoginType('waiter');
              setError('');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              loginType === 'waiter'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Waiter</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType('kitchen');
              setError('');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              loginType === 'kitchen'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Kitchen</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType('manager');
              setError('');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              loginType === 'manager'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Manager</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Log In</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center mb-2">Test credentials:</p>
          <div className="space-y-1 text-xs text-gray-700">
            {loginType === 'waiter' ? (
              <>
                <div className="text-center">
                  <span className="font-semibold">john</span> / waiter123
                </div>
                <div className="text-center">
                  <span className="font-semibold">mary</span> / waiter123
                </div>
              </>
            ) : loginType === 'kitchen' ? (
              <div className="text-center">
                <span className="font-semibold">kitchen</span> / kitchen123
              </div>
            ) : (
              <div className="text-center">
                <span className="font-semibold">admin</span> / admin123
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}