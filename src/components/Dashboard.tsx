import { Lock, Activity, Bitcoin, CheckCircle2, ShieldCheck, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DashboardStats, EscrowTransaction } from '../types';
import { cn } from '../utils/cn';

interface DashboardProps {
  stats: DashboardStats;
  escrows: EscrowTransaction[];
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ icon, label, value, sub, color, trend }: {
  icon: React.ReactNode; label: string; value: string; sub: string; color: string; trend?: 'up' | 'down';
}) {
  return (
    <motion.div variants={item} className="group rounded-2xl border border-shadow-800/50 bg-gradient-to-br from-shadow-900/80 to-shadow-950/80 p-5 transition-all hover:border-shadow-700/50 hover:shadow-lg hover:shadow-shadow-900/30">
      <div className="mb-3 flex items-center justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', color)}>
          {icon}
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold',
            trend === 'up' ? 'bg-vault-green/10 text-vault-green' : 'bg-vault-red/10 text-vault-red'
          )}>
            {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend === 'up' ? '+12.5%' : '-3.2%'}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-shadow-400">{label}</p>
      <p className="mt-1 text-[10px] text-shadow-600">{sub}</p>
    </motion.div>
  );
}

function MiniEscrowRow({ escrow }: { escrow: EscrowTransaction }) {
  const statusColors = {
    locked: 'bg-btc-500/10 text-btc-500',
    pending: 'bg-shadow-500/10 text-shadow-400',
    settled: 'bg-vault-green/10 text-vault-green',
    disputed: 'bg-vault-red/10 text-vault-red',
    expired: 'bg-shadow-700/10 text-shadow-500',
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-shadow-800/30 bg-shadow-900/30 px-4 py-3 transition-all hover:border-shadow-700/50 hover:bg-shadow-900/50">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-shadow-800/50">
          {escrow.zkProofVerified ? (
            <ShieldCheck size={16} className="text-vault-green" />
          ) : (
            <Lock size={16} className="text-btc-500" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{escrow.title}</p>
          <p className="text-[11px] text-shadow-500">{escrow.id} • {escrow.sender.starknetId || escrow.sender.address.slice(0, 10) + '...'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-btc-400">{escrow.amount} BTC</p>
          <div className="mt-0.5 h-1.5 w-20 overflow-hidden rounded-full bg-shadow-800">
            <div
              className={cn('h-full rounded-full transition-all',
                escrow.status === 'settled' ? 'bg-vault-green' : escrow.status === 'disputed' ? 'bg-vault-red' : 'bg-gradient-to-r from-shadow-500 to-btc-500'
              )}
              style={{ width: `${escrow.progress}%` }}
            />
          </div>
        </div>
        <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider', statusColors[escrow.status])}>
          {escrow.status}
        </span>
      </div>
    </div>
  );
}

export function Dashboard({ stats, escrows }: DashboardProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome Banner */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl border border-shadow-700/30 bg-gradient-to-r from-shadow-800/80 via-shadow-900/60 to-shadow-950/80 p-6">
        <div className="relative z-10">
          <div className="mb-1 flex items-center gap-2">
            <Zap size={16} className="text-btc-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-btc-500">Shadow Protocol Active</span>
          </div>
          <h2 className="mb-1 text-2xl font-bold text-white">Welcome to BIT-SHADOW</h2>
          <p className="max-w-lg text-sm text-shadow-400">
            Your confidential Bitcoin escrow powered by Starknet's zero-knowledge proofs. 
            All transactions are encrypted and privacy-preserved.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-shadow-600/20 to-btc-500/10 blur-3xl" />
        <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-btc-500/10 to-shadow-500/5 blur-2xl" />
        <div className="absolute right-8 top-6 opacity-10">
          <Bitcoin size={100} className="text-btc-500" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={<Lock size={18} className="text-white" />}
          label="Total Escrows"
          value={stats.totalEscrows.toString()}
          sub="All time created"
          color="bg-gradient-to-br from-shadow-600 to-shadow-700"
          trend="up"
        />
        <StatCard
          icon={<Activity size={18} className="text-white" />}
          label="Active Escrows"
          value={stats.activeEscrows.toString()}
          sub="Currently running"
          color="bg-gradient-to-br from-btc-600 to-btc-500"
          trend="up"
        />
        <StatCard
          icon={<Bitcoin size={18} className="text-white" />}
          label="Total Value Locked"
          value={`${stats.totalValueLocked} BTC`}
          sub="≈ $1,247,830 USD"
          color="bg-gradient-to-br from-btc-500 to-btc-400"
        />
        <StatCard
          icon={<CheckCircle2 size={18} className="text-white" />}
          label="Settled"
          value={stats.settledTransactions.toString()}
          sub="Successfully completed"
          color="bg-gradient-to-br from-vault-green/80 to-vault-green"
          trend="up"
        />
        <StatCard
          icon={<ShieldCheck size={18} className="text-white" />}
          label="Privacy Score"
          value={`${stats.privacyScore}%`}
          sub="ZK-proof coverage"
          color="bg-gradient-to-br from-shadow-500 to-shadow-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Escrows */}
        <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Escrows</h3>
              <p className="text-xs text-shadow-500">Latest confidential transactions</p>
            </div>
            <button className="flex items-center gap-1 rounded-lg bg-shadow-800/50 px-3 py-1.5 text-xs font-medium text-shadow-300 transition-colors hover:bg-shadow-700/50">
              <Eye size={12} />
              View All
            </button>
          </div>
          <div className="space-y-2">
            {escrows.map((escrow) => (
              <MiniEscrowRow key={escrow.id} escrow={escrow} />
            ))}
          </div>
        </motion.div>

        {/* Protocol Activity */}
        <motion.div variants={item} className="space-y-4">
          {/* ZK Proof Status */}
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">ZK-Proof Engine</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">Proof Generation</span>
                <span className="text-xs font-semibold text-vault-green">Active</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-shadow-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-shadow-500 to-vault-green"
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] text-shadow-600">87% of transactions ZK-verified</p>
              
              <div className="mt-3 space-y-2">
                {['STARK proof verified', 'Merkle root updated', 'Privacy shield active'].map((log, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-shadow-800/30 px-3 py-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-vault-green animate-pulse" />
                    <span className="text-[11px] text-shadow-400">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bitcoin Network */}
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Bitcoin Network</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">Block Height</span>
                <span className="text-xs font-mono font-semibold text-btc-400">879,421</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">Gas (sat/vB)</span>
                <span className="text-xs font-mono font-semibold text-btc-400">14.2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">Mempool</span>
                <span className="text-xs font-mono font-semibold text-shadow-400">32,847 txs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">Hashrate</span>
                <span className="text-xs font-mono font-semibold text-shadow-400">785 EH/s</span>
              </div>
            </div>
          </div>

          {/* Starknet Status */}
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Starknet Protocol</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">L2 Block</span>
                <span className="text-xs font-mono font-semibold text-shadow-300">1,247,893</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">TPS</span>
                <span className="text-xs font-mono font-semibold text-shadow-300">847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-shadow-400">Proof Status</span>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-vault-green animate-pulse" />
                  <span className="text-xs font-semibold text-vault-green">Verified</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <TrendingUp size={12} className="text-vault-green" />
              <span className="text-[10px] text-vault-green">Network healthy • 99.9% uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
