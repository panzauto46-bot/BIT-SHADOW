import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CreateEscrow } from './components/CreateEscrow';
import { EscrowList } from './components/EscrowList';
import { Bridge } from './components/Bridge';
import { PrivacyShield } from './components/PrivacyShield';
import { useAppStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

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
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        walletConnected={walletConnected}
        starknetId={starknetId}
        disconnectWallet={disconnectWallet}
      />

      {/* Main Content */}
      <div className="relative z-10 ml-64">
        <Header
          walletConnected={walletConnected}
          connectWallet={connectWallet}
          starknetId={starknetId}
        />

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-shadow-800/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-[11px] text-shadow-600">
                © 2025 BIT-SHADOW Protocol • Built on Starknet
              </p>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-vault-green animate-pulse" />
                <span className="text-[10px] text-vault-green">All Systems Operational</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-shadow-600">Privacy Track • Hackathon 2025</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
