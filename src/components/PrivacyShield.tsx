import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Lock, Eye, EyeOff, Zap, Fingerprint, Key, FileText, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

function ZKProofAnimation() {
  const [phase, setPhase] = useState(0);
  const [proofHash, setProofHash] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
      setProofHash(
        Array.from({ length: 16 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const phases = [
    { label: 'Generating Witness', color: 'text-shadow-400', icon: <Fingerprint size={20} /> },
    { label: 'Computing STARK Proof', color: 'text-btc-500', icon: <Zap size={20} /> },
    { label: 'Verifying on L2', color: 'text-shadow-300', icon: <Shield size={20} /> },
    { label: 'Proof Verified ✓', color: 'text-vault-green', icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className="rounded-2xl border border-shadow-700/30 bg-gradient-to-br from-shadow-900/80 to-shadow-950/80 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
        <Zap size={16} className="text-btc-500" />
        Interactive ZK-Proof Visualization
      </h3>

      {/* Main Animation */}
      <div className="relative mx-auto mb-6 flex h-48 w-48 items-center justify-center">
        {/* Outer rings */}
        <div className="absolute inset-0 rounded-full border border-shadow-700/30 animate-shield-rotate" />
        <div className="absolute inset-3 rounded-full border border-shadow-600/20" style={{ animationDirection: 'reverse', animation: 'shield-rotate 12s linear infinite reverse' }} />
        <div className="absolute inset-6 rounded-full border border-shadow-500/20 animate-shield-rotate" style={{ animationDuration: '6s' }} />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-shadow-500/50 to-transparent animate-scan-line" />
        </div>

        {/* Center */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2"
          key={phase}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={cn('transition-colors', phases[phase].color)}>
            {phases[phase].icon}
          </div>
          <p className={cn('text-xs font-semibold', phases[phase].color)}>
            {phases[phase].label}
          </p>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-shadow-500"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: `0 ${70 + i * 5}px`,
            }}
          />
        ))}
      </div>

      {/* Hash Display */}
      <div className="rounded-xl bg-shadow-950/80 p-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Proof Hash</p>
        <p className="font-mono text-xs text-shadow-300 break-all">0x{proofHash}...{proofHash.slice(0, 8)}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className={cn('h-1.5 w-1.5 rounded-full', phase === 3 ? 'bg-vault-green' : 'bg-btc-500 animate-pulse')} />
          <span className={cn('text-[10px] font-semibold', phase === 3 ? 'text-vault-green' : 'text-btc-500')}>
            {phase === 3 ? 'Verification Complete' : 'Processing...'}
          </span>
        </div>
      </div>
    </div>
  );
}

function EncryptionDemo() {
  const [encrypted, setEncrypted] = useState(true);
  const originalData = {
    title: 'Web3 Development Payment',
    amount: '0.45 BTC',
    sender: 'shadow.stark',
    receiver: 'bc1qxy2k...w508d',
    description: 'Payment for DeFi dashboard development project',
  };

  const encryptedData = {
    title: 'U2FsdGVkX1+vupppZksvRf5pq5g5...',
    amount: 'x7Hk9mP2qL4nR8vT...',
    sender: '[ZK-PROOF: VALID]',
    receiver: 'aB3cD4eF5gH6iJ7k...',
    description: 'mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7...',
  };

  return (
    <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <FileText size={16} className="text-shadow-400" />
          Metadata Encryption
        </h3>
        <button
          onClick={() => setEncrypted(!encrypted)}
          className={cn('flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            encrypted ? 'bg-vault-green/10 text-vault-green' : 'bg-vault-red/10 text-vault-red'
          )}
        >
          {encrypted ? <><EyeOff size={12} /> Encrypted</> : <><Eye size={12} /> Decrypted</>}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={encrypted ? 'enc' : 'dec'}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {Object.entries(encrypted ? encryptedData : originalData).map(([key, value]) => (
            <div key={key} className="flex items-start justify-between rounded-lg bg-shadow-950/50 px-3 py-2.5">
              <span className="text-[11px] font-medium capitalize text-shadow-500">{key}</span>
              <span className={cn('max-w-[60%] text-right font-mono text-[11px]',
                encrypted ? 'text-shadow-600' : key === 'amount' ? 'text-btc-400 font-semibold' : 'text-white'
              )}>
                {encrypted && key !== 'sender' && <Lock size={8} className="mr-1 inline text-shadow-600" />}
                {value}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-shadow-950/30 px-3 py-2">
        <Key size={12} className="text-shadow-500" />
        <span className="text-[10px] text-shadow-500">
          {encrypted ? 'AES-256-GCM encrypted • Stored on IPFS' : 'Warning: Data visible in decrypted view'}
        </span>
      </div>
    </div>
  );
}

export function PrivacyShield() {
  const [verifyResult, setVerifyResult] = useState<null | 'verifying' | 'valid' | 'invalid'>(null);

  const runVerification = () => {
    setVerifyResult('verifying');
    setTimeout(() => setVerifyResult('valid'), 3000);
  };

  const privacyFeatures = [
    { icon: <Shield size={16} />, title: 'Zero-Knowledge Proofs', desc: 'Transaction validity without revealing data', active: true },
    { icon: <Lock size={16} />, title: 'Encrypted Vault', desc: 'Cairo smart contracts with AES-256 encryption', active: true },
    { icon: <Fingerprint size={16} />, title: 'Private Multi-Sig', desc: 'Anonymous approver identities on-chain', active: true },
    { icon: <Key size={16} />, title: 'Starknet ID Integration', desc: 'Human-readable .stark domain names', active: true },
    { icon: <EyeOff size={16} />, title: 'Stealth Addresses', desc: 'One-time addresses for receivers', active: false },
    { icon: <FileText size={16} />, title: 'IPFS/Arweave Storage', desc: 'Decentralized encrypted metadata', active: true },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-white">Privacy Shield</h2>
        <p className="text-sm text-shadow-400">Explore BIT-SHADOW's zero-knowledge privacy infrastructure</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ZK Proof Animation */}
        <motion.div variants={item}>
          <ZKProofAnimation />
        </motion.div>

        {/* Privacy Features */}
        <motion.div variants={item} className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Privacy Features</h3>
          <div className="space-y-2">
            {privacyFeatures.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-shadow-800/30 bg-shadow-950/30 px-4 py-3 transition-all hover:border-shadow-700/50">
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg',
                    f.active ? 'bg-shadow-500/10 text-shadow-400' : 'bg-shadow-800/30 text-shadow-600'
                  )}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{f.title}</p>
                    <p className="text-[10px] text-shadow-500">{f.desc}</p>
                  </div>
                </div>
                {f.active ? (
                  <CheckCircle2 size={16} className="text-vault-green" />
                ) : (
                  <span className="rounded-full bg-shadow-800/50 px-2 py-0.5 text-[9px] font-semibold text-shadow-500">SOON</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Encryption Demo */}
        <motion.div variants={item}>
          <EncryptionDemo />
        </motion.div>

        {/* Proof Verification */}
        <motion.div variants={item} className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck size={16} className="text-vault-green" />
            Proof Verification
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-shadow-400">Escrow ID or Proof Hash</label>
              <input
                type="text"
                placeholder="ESC-XXXXXX or 0x..."
                className="w-full rounded-xl border border-shadow-800/50 bg-shadow-950/50 px-4 py-3 text-sm text-white placeholder-shadow-600 outline-none transition-all focus:border-shadow-600 focus:ring-1 focus:ring-shadow-600"
              />
            </div>
            <button
              onClick={runVerification}
              disabled={verifyResult === 'verifying'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-shadow-600 to-shadow-500 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
            >
              {verifyResult === 'verifying' ? (
                <><RefreshCw size={14} className="animate-spin" /> Verifying...</>
              ) : (
                <><ShieldCheck size={14} /> Verify ZK-Proof</>
              )}
            </button>

            <AnimatePresence>
              {verifyResult === 'valid' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-vault-green/30 bg-vault-green/5 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-vault-green" />
                    <span className="text-sm font-semibold text-vault-green">Proof Valid</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-shadow-400">Proof Type</span>
                      <span className="text-vault-green">STARK</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-shadow-400">Verification</span>
                      <span className="text-vault-green">On-chain (L2)</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-shadow-400">Conditions Met</span>
                      <span className="text-vault-green">Yes (hidden)</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-shadow-400">Block</span>
                      <span className="font-mono text-shadow-300">#1,247,893</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recent Verifications */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Recent Verifications</p>
              {[
                { id: 'ESC-7X9K2M', result: true, time: '2 min ago' },
                { id: 'ESC-3P8N5R', result: true, time: '15 min ago' },
                { id: 'ESC-FAKE01', result: false, time: '1 hour ago' },
              ].map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-lg bg-shadow-950/30 px-3 py-2">
                  <div className="flex items-center gap-2">
                    {v.result ? (
                      <CheckCircle2 size={12} className="text-vault-green" />
                    ) : (
                      <XCircle size={12} className="text-vault-red" />
                    )}
                    <span className="font-mono text-[11px] text-shadow-300">{v.id}</span>
                  </div>
                  <span className="text-[10px] text-shadow-500">{v.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
