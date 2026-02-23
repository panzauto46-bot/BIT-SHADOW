import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CreateEscrow } from './components/CreateEscrow';
import { EscrowList } from './components/EscrowList';
import { Bridge } from './components/Bridge';
import { PrivacyShield } from './components/PrivacyShield';
import { useAppStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function App() {
  const {
    activeTab,
    setActiveTab,
    escrows,
    stats,
    walletConnected,
    starknetId,
    connectWallet,
    disconnectWallet,
  } = useAppStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} escrows={escrows} />;
      case 'create':
        return <CreateEscrow />;
      case 'escrows':
        return <EscrowList escrows={escrows} />;
      case 'bridge':
        return <Bridge />;
      case 'privacy':
        return <PrivacyShield />;
      default:
        return <Dashboard stats={stats} escrows={escrows} />;
    }
  };

  return (
    <div className="min-h-screen bg-shadow-950 text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-shadow-700/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-btc-500/5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 rounded-full bg-shadow-600/5 blur-[100px]" />
        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Additional ambient glow */}
        <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-btc-500/3 blur-[150px] animate-float" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 z-50 h-full transform transition-transform duration-300 ease-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          walletConnected={walletConnected}
          starknetId={starknetId}
          disconnectWallet={disconnectWallet}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 lg:ml-64">
        {/* Mobile Header Bar */}
        <div className="flex items-center gap-3 border-b border-shadow-800/50 bg-shadow-950/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl border border-shadow-800/50 bg-shadow-900/30 p-2 text-shadow-400 transition-all hover:bg-shadow-800/50 hover:text-white active:scale-95"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-bold tracking-wider text-white">
            BIT<span className="text-btc-500">-</span><span className="text-shadow-400">SHADOW</span>
          </h1>
        </div>

        <Header
          walletConnected={walletConnected}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          starknetId={starknetId}
        />

        <main className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-shadow-800/30 px-4 py-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <p className="text-[11px] text-shadow-600">
                © 2026 BIT-SHADOW Protocol • Built on Starknet
              </p>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-vault-green animate-pulse" />
                <span className="text-[10px] text-vault-green">All Systems Operational</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-shadow-600">Privacy × Bitcoin • Re{'{'}define{'}'} Hackathon 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
