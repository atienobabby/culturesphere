import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import FloatingAssistant from './FloatingAssistant';
import FloatingAssistantTwo from './FloatingAssistantTwo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                CultureSphere AI
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {!isHome && (
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
              )}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            Powered by{' '}
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              Qloo's Taste AI
            </span>{' '}
            and{' '}
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              Google Gemini
            </span>
          </div>
        </div>
      </footer>

      {/* Global Floating AI Assistant */}
      <FloatingAssistant />
      
      {/* Second Floating AI Assistant */}
      <FloatingAssistantTwo />
    </div>
  );
};

export default Layout;