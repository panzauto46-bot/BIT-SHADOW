import { LayoutDashboard, PlusCircle, List, ArrowLeftRight, Shield, LogOut, Bitcoin } from 'lucide-react';
import type { TabType } from '../types';
import { cn } from '../utils/cn';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  walletConnected: boolean;
  starknetId: string;
  disconnectWallet: () => void;
}

const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'create', label: 'Create Escrow', icon: <PlusCircle size={20} /> },
  { id: 'escrows', label: 'My Escrows', icon: <List size={20} /> },
  { id: 'bridge', label: 'BTC Bridge', icon: <ArrowLeftRight size={20} /> },
  { id: 'privacy', label: 'Privacy Shield', icon: <Shield size={20} /> },
];

export function Sidebar({ activeTab, setActiveTab, walletConnected, starknetId, disconnectWallet }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-shadow-800/50 bg-shadow-950/95 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-shadow-800/50 px-6 py-5">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-shadow-600 to-btc-500">
          <Bitcoin size={22} className="text-white" />
          <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-shadow-950 bg-vault-green" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white">
            BIT<span className="text-btc-500">-</span><span className="text-shadow-400">SHADOW</span>
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-widest text-shadow-500">Confidential Escrow</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              'group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
              activeTab === item.id
                ? 'bg-gradient-to-r from-shadow-700/80 to-shadow-800/40 text-white shadow-lg shadow-shadow-900/50'
                : 'text-shadow-400 hover:bg-shadow-900/50 hover:text-white'
            )}
          >
            <span className={cn(
              'transition-colors',
              activeTab === item.id ? 'text-btc-500' : 'text-shadow-500 group-hover:text-shadow-400'
            )}>
              {item.icon}
            </span>
            {item.label}
            {activeTab === item.id && (
              <div className="ml-auto h-2 w-2 rounded-full bg-btc-500 shadow-lg shadow-btc-500/50" />
            )}
          </button>
        ))}
      </nav>

      {/* Wallet Status */}
      {walletConnected && (
        <div className="mx-3 mb-3 rounded-xl border border-shadow-800/50 bg-shadow-900/50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-vault-green shadow-lg shadow-vault-green/50" />
            <span className="text-xs font-medium text-vault-green">Connected</span>
          </div>
          <p className="mb-1 text-sm font-semibold text-white">{starknetId}</p>
          <p className="text-[10px] text-shadow-500">Starknet Sepolia</p>
          <button
            onClick={disconnectWallet}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-vault-red/30 py-2 text-xs text-vault-red transition-colors hover:bg-vault-red/10"
          >
            <LogOut size={12} />
            Disconnect
          </button>
        </div>
      )}

      {/* Version */}
      <div className="border-t border-shadow-800/50 px-6 py-3">
        <p className="text-[10px] text-shadow-600">v1.0.0 • Starknet Protocol</p>
      </div>
    </aside>
  );
}
