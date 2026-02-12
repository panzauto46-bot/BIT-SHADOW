import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, Clock, Users, ChevronDown, ChevronUp, ExternalLink, Copy, CheckCircle2, AlertTriangle, XCircle, Bitcoin } from 'lucide-react';
import type { EscrowTransaction } from '../types';
import { cn } from '../utils/cn';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const statusConfig = {
  locked: { color: 'text-btc-500', bg: 'bg-btc-500/10', border: 'border-btc-500/30', icon: <Lock size={14} />, label: 'Locked' },
  pending: { color: 'text-shadow-400', bg: 'bg-shadow-500/10', border: 'border-shadow-500/30', icon: <Clock size={14} />, label: 'Pending' },
  settled: { color: 'text-vault-green', bg: 'bg-vault-green/10', border: 'border-vault-green/30', icon: <CheckCircle2 size={14} />, label: 'Settled' },
  disputed: { color: 'text-vault-red', bg: 'bg-vault-red/10', border: 'border-vault-red/30', icon: <AlertTriangle size={14} />, label: 'Disputed' },
  expired: { color: 'text-shadow-500', bg: 'bg-shadow-700/10', border: 'border-shadow-700/30', icon: <XCircle size={14} />, label: 'Expired' },
};

function EscrowCard({ escrow }: { escrow: EscrowTransaction }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const status = statusConfig[escrow.status];

  const copyId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div variants={item} className={cn('rounded-2xl border bg-shadow-900/30 transition-all hover:shadow-lg hover:shadow-shadow-900/30', status.border)}>
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', status.bg)}>
            <span className={status.color}>{status.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">{escrow.title}</h3>
              {escrow.zkProofVerified && (
                <div className="flex items-center gap-1 rounded-full bg-vault-green/10 px-2 py-0.5">
                  <ShieldCheck size={10} className="text-vault-green" />
                  <span className="text-[9px] font-semibold text-vault-green">ZK</span>
                </div>
              )}
              {escrow.encryptedMetadata && (
                <div className="flex items-center gap-1 rounded-full bg-shadow-500/10 px-2 py-0.5">
                  <Lock size={10} className="text-shadow-400" />
                  <span className="text-[9px] font-semibold text-shadow-400">ENC</span>
                </div>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <button onClick={copyId} className="flex items-center gap-1 font-mono text-[11px] text-shadow-500 transition-colors hover:text-shadow-300">
                {escrow.id}
                {copied ? <CheckCircle2 size={10} className="text-vault-green" /> : <Copy size={10} />}
              </button>
              <span className="text-shadow-700">•</span>
              <span className="text-[11px] text-shadow-500">{escrow.sender.starknetId || escrow.sender.address.slice(0, 12) + '...'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-lg font-bold text-btc-400">{escrow.amount} BTC</p>
            <p className="text-[10px] text-shadow-500">≈ ${(escrow.amount * 67000).toLocaleString()} USD</p>
          </div>

          <div className="w-28">
            <div className="mb-1 flex items-center justify-between">
              <span className={cn('text-[10px] font-semibold uppercase tracking-wider', status.color)}>{status.label}</span>
              <span className="text-[10px] text-shadow-500">{escrow.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-shadow-800">
              <motion.div
                className={cn('h-full rounded-full',
                  escrow.status === 'settled' ? 'bg-vault-green'
                    : escrow.status === 'disputed' ? 'bg-vault-red'
                      : 'bg-gradient-to-r from-shadow-500 to-btc-500'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${escrow.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg bg-shadow-800/50 p-2 text-shadow-400 transition-colors hover:bg-shadow-700/50 hover:text-white"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-shadow-800/30 px-5 py-4">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-xl bg-shadow-950/50 p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Sender</p>
                  <p className="text-xs font-medium text-white">{escrow.sender.starknetId || 'Anonymous'}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-shadow-500">{escrow.sender.address.slice(0, 15)}...</p>
                </div>
                <div className="rounded-xl bg-shadow-950/50 p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Receiver</p>
                  <p className="flex items-center gap-1 text-xs font-medium text-white">
                    <Bitcoin size={10} className="text-btc-500" />
                    BTC Address
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-shadow-500">{escrow.receiver.address.slice(0, 15)}...</p>
                </div>
                <div className="rounded-xl bg-shadow-950/50 p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Multi-Sig</p>
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-shadow-400" />
                    <span className="text-xs font-medium text-white">{escrow.approvers}/{escrow.requiredApprovals} Approved</span>
                  </div>
                  <div className="mt-1 flex gap-1">
                    {Array.from({ length: escrow.requiredApprovals }).map((_, i) => (
                      <div key={i} className={cn('h-1.5 flex-1 rounded-full', i < escrow.approvers ? 'bg-vault-green' : 'bg-shadow-700')} />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-shadow-950/50 p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Time Lock</p>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className={escrow.timeLockActive ? 'text-btc-500' : 'text-shadow-600'} />
                    <span className="text-xs font-medium text-white">{escrow.timeLockActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-shadow-500">
                    Expires: {escrow.expiresAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-lg bg-shadow-800/50 px-3 py-2 text-xs font-medium text-shadow-300 transition-colors hover:bg-shadow-700/50">
                  <ExternalLink size={12} />
                  View on Explorer
                </button>
                {escrow.status === 'locked' && (
                  <button className="flex items-center gap-1 rounded-lg bg-shadow-600/20 px-3 py-2 text-xs font-medium text-shadow-300 transition-colors hover:bg-shadow-600/30">
                    <ShieldCheck size={12} />
                    Approve
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface EscrowListProps {
  escrows: EscrowTransaction[];
}

export function EscrowList({ escrows }: EscrowListProps) {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? escrows : escrows.filter((e) => e.status === filter);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-white">My Escrows</h2>
        <p className="text-sm text-shadow-400">Track and manage your confidential escrow transactions</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap items-center gap-2">
        {['all', 'locked', 'pending', 'settled', 'disputed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-semibold capitalize transition-all',
              filter === f
                ? 'bg-gradient-to-r from-shadow-600 to-shadow-700 text-white shadow-lg shadow-shadow-900/50'
                : 'bg-shadow-900/50 text-shadow-400 hover:bg-shadow-800/50 hover:text-white'
            )}
          >
            {f === 'all' ? `All (${escrows.length})` : `${f} (${escrows.filter((e) => e.status === f).length})`}
          </button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {filtered.map((escrow) => (
          <EscrowCard key={escrow.id} escrow={escrow} />
        ))}
      </div>
    </motion.div>
  );
}
