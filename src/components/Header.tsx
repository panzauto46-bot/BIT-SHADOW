import { useState, useEffect } from 'react';
import { Bell, Wallet, Search, ChevronDown, Sun, Moon, LogOut } from 'lucide-react';

interface HeaderProps {
  walletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  starknetId: string;
}

export function Header({ walletConnected, connectWallet, disconnectWallet, starknetId }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage or system pref
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-shadow-800/50 bg-shadow-950/80 px-6 py-4 backdrop-blur-xl transition-colors duration-300">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-shadow-500" />
        <input
          type="text"
          placeholder="Search escrow ID, address, or .stark name..."
          className="w-full rounded-xl border border-shadow-800/50 bg-shadow-900/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-shadow-600 outline-none transition-all focus:border-shadow-600 focus:ring-1 focus:ring-shadow-600 hover:border-shadow-500/50"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Network Status */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-shadow-800/50 bg-shadow-900/30 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-vault-green shadow-lg shadow-vault-green/50 animate-pulse" />
          <span className="text-xs font-medium text-shadow-300">Starknet</span>
          <ChevronDown size={12} className="text-shadow-500" />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-shadow-800/50 bg-shadow-900/30 p-2.5 text-shadow-400 transition-all hover:bg-shadow-800/50 hover:text-white active:scale-95"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} className="text-shadow-600" />}
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl border border-shadow-800/50 bg-shadow-900/30 p-2.5 text-shadow-400 transition-colors hover:bg-shadow-800/50 hover:text-white">
          <Bell size={18} />
          <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-btc-500 text-[9px] font-bold text-white shadow-sm">
            3
          </div>
        </button>

        {/* Wallet Connect */}
        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-shadow-600 to-shadow-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-shadow-600/25 transition-all hover:shadow-shadow-500/40 hover:brightness-110 active:scale-95"
          >
            <Wallet size={16} />
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-shadow-700/50 bg-shadow-900/50 px-4 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-shadow-600 to-btc-500 text-xs font-bold text-white shadow-inner">
                S
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{starknetId}</p>
                <p className="text-[10px] text-shadow-500">Wallet Connected</p>
              </div>
            </div>

            <button
              onClick={disconnectWallet}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-shadow-800/50 bg-shadow-900/30 text-shadow-400 transition-all hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 active:scale-95"
              title="Disconnect Wallet"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
