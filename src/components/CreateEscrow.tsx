import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Clock, Users, Bitcoin, FileText, Eye, EyeOff, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppStore } from '../store/useStore';
import { generateKey, encryptData } from '../utils/encryption';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export function CreateEscrow() {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    amount: '',
    receiverAddress: '',
    receiverType: 'bitcoin' as 'bitcoin' | 'starknet',
    timeLock: true,
    timeLockDays: '30',
    multiSig: true,
    requiredApprovals: '2',
    totalApprovers: '3',
    encryptMetadata: true,
    zkProof: true,
  });

  const updateForm = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const { walletConnected, connectWallet } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleSubmit = async () => {
    if (!walletConnected) {
      alert("Please connect your wallet first!");
      connectWallet(); // Trigger connection flow
      return;
    }

    setIsEncrypting(true);

    // Simulate real encryption if enabled
    if (form.encryptMetadata) {
      try {
        const key = await generateKey();
        const encryptedDesc = await encryptData(form.description, key);
        console.log("Encrypted Metadata:", encryptedDesc);
      } catch (e) {
        console.error("Encryption failed", e);
      }
    }

    // Simulate ZK Proof generation time
    setTimeout(() => {
      setIsEncrypting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-white">Create Confidential Escrow</h2>
        <p className="text-sm text-shadow-400">Build a new encrypted escrow transaction with ZK-proof verification</p>
      </motion.div>

      {/* Steps */}
      <motion.div variants={item} className="flex items-center gap-3">
        {[
          { n: 1, label: 'Details', icon: <FileText size={14} /> },
          { n: 2, label: 'Security', icon: <Shield size={14} /> },
          { n: 3, label: 'Review', icon: <Eye size={14} /> },
        ].map((s) => (
          <button
            key={s.n}
            onClick={() => setStep(s.n)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all',
              step === s.n
                ? 'bg-gradient-to-r from-shadow-600 to-shadow-700 text-white shadow-lg shadow-shadow-900/50'
                : step > s.n
                  ? 'bg-vault-green/10 text-vault-green'
                  : 'bg-shadow-900/50 text-shadow-500 hover:bg-shadow-800/50'
            )}
          >
            {step > s.n ? <CheckCircle2 size={14} /> : s.icon}
            Step {s.n}: {s.label}
          </button>
        ))}
      </motion.div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 rounded-2xl border border-vault-green/30 bg-vault-green/5 p-4"
        >
          <CheckCircle2 className="text-vault-green" size={24} />
          <div>
            <p className="font-semibold text-vault-green">Escrow Created Successfully!</p>
            <p className="text-xs text-shadow-400">Transaction ID: ESC-{Math.random().toString(36).slice(2, 8).toUpperCase()} • ZK-Proof generating...</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-4">
          {step === 1 && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              <motion.div variants={item} className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <FileText size={16} className="text-btc-500" />
                  Transaction Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-shadow-400">Escrow Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => updateForm('title', e.target.value)}
                      placeholder="e.g., Web3 Development Payment"
                      className="w-full rounded-xl border border-shadow-800/50 bg-shadow-950/50 px-4 py-3 text-sm text-white placeholder-shadow-600 outline-none transition-all focus:border-shadow-600 focus:ring-1 focus:ring-shadow-600"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-shadow-400">Description (Encrypted)</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      placeholder="Describe the escrow conditions..."
                      rows={3}
                      className="w-full rounded-xl border border-shadow-800/50 bg-shadow-950/50 px-4 py-3 text-sm text-white placeholder-shadow-600 outline-none transition-all focus:border-shadow-600 focus:ring-1 focus:ring-shadow-600 resize-none"
                    />
                    <div className="mt-1 flex items-center gap-1">
                      <Lock size={10} className="text-shadow-500" />
                      <span className="text-[10px] text-shadow-500">This field will be encrypted with AES-256-GCM</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-shadow-400">Amount (BTC)</label>
                      <div className="relative">
                        <Bitcoin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-btc-500" />
                        <input
                          type="text"
                          value={form.amount}
                          onChange={(e) => updateForm('amount', e.target.value)}
                          placeholder="0.00"
                          className="w-full rounded-xl border border-shadow-800/50 bg-shadow-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-shadow-600 outline-none transition-all focus:border-shadow-600 focus:ring-1 focus:ring-shadow-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-shadow-400">Receiver Type</label>
                      <select
                        value={form.receiverType}
                        onChange={(e) => updateForm('receiverType', e.target.value)}
                        className="w-full rounded-xl border border-shadow-800/50 bg-shadow-950/50 px-4 py-3 text-sm text-white outline-none transition-all focus:border-shadow-600"
                      >
                        <option value="bitcoin">Bitcoin Address</option>
                        <option value="starknet">Starknet / .stark ID</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-shadow-400">
                      {form.receiverType === 'bitcoin' ? 'Bitcoin Receiver Address' : 'Starknet Address / .stark ID'}
                    </label>
                    <input
                      type="text"
                      value={form.receiverAddress}
                      onChange={(e) => updateForm('receiverAddress', e.target.value)}
                      placeholder={form.receiverType === 'bitcoin' ? 'bc1q...' : '0x... or name.stark'}
                      className="w-full rounded-xl border border-shadow-800/50 bg-shadow-950/50 px-4 py-3 text-sm text-white placeholder-shadow-600 outline-none transition-all focus:border-shadow-600 focus:ring-1 focus:ring-shadow-600"
                    />
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="rounded-xl bg-gradient-to-r from-shadow-600 to-shadow-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
                  Next: Security Settings →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              <motion.div variants={item} className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Shield size={16} className="text-shadow-400" />
                  Privacy & Security Settings
                </h3>
                <div className="space-y-5">
                  {/* Time Lock */}
                  <div className="flex items-start justify-between rounded-xl border border-shadow-800/30 bg-shadow-950/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-btc-500/10">
                        <Clock size={16} className="text-btc-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Time-Lock Protection</p>
                        <p className="text-xs text-shadow-500">Lock funds until a specific time period</p>
                        {form.timeLock && (
                          <div className="mt-2">
                            <input
                              type="number"
                              value={form.timeLockDays}
                              onChange={(e) => updateForm('timeLockDays', e.target.value)}
                              className="w-24 rounded-lg border border-shadow-800/50 bg-shadow-900/50 px-3 py-1.5 text-xs text-white outline-none focus:border-shadow-600"
                            />
                            <span className="ml-2 text-xs text-shadow-500">days</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => updateForm('timeLock', !form.timeLock)}
                      className={cn('h-6 w-11 rounded-full transition-all', form.timeLock ? 'bg-btc-500' : 'bg-shadow-700')}
                    >
                      <div className={cn('h-5 w-5 rounded-full bg-white transition-all', form.timeLock ? 'translate-x-5.5' : 'translate-x-0.5')} />
                    </button>
                  </div>

                  {/* Multi-Sig */}
                  <div className="flex items-start justify-between rounded-xl border border-shadow-800/30 bg-shadow-950/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-shadow-500/10">
                        <Users size={16} className="text-shadow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Multi-Sig Privacy</p>
                        <p className="text-xs text-shadow-500">Require multiple approvals without revealing identities</p>
                        {form.multiSig && (
                          <div className="mt-2 flex items-center gap-2">
                            <input
                              type="number"
                              value={form.requiredApprovals}
                              onChange={(e) => updateForm('requiredApprovals', e.target.value)}
                              className="w-16 rounded-lg border border-shadow-800/50 bg-shadow-900/50 px-3 py-1.5 text-xs text-white outline-none focus:border-shadow-600"
                            />
                            <span className="text-xs text-shadow-500">of</span>
                            <input
                              type="number"
                              value={form.totalApprovers}
                              onChange={(e) => updateForm('totalApprovers', e.target.value)}
                              className="w-16 rounded-lg border border-shadow-800/50 bg-shadow-900/50 px-3 py-1.5 text-xs text-white outline-none focus:border-shadow-600"
                            />
                            <span className="text-xs text-shadow-500">approvers</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => updateForm('multiSig', !form.multiSig)}
                      className={cn('h-6 w-11 rounded-full transition-all', form.multiSig ? 'bg-shadow-500' : 'bg-shadow-700')}
                    >
                      <div className={cn('h-5 w-5 rounded-full bg-white transition-all', form.multiSig ? 'translate-x-5.5' : 'translate-x-0.5')} />
                    </button>
                  </div>

                  {/* Encrypt Metadata */}
                  <div className="flex items-start justify-between rounded-xl border border-shadow-800/30 bg-shadow-950/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-vault-green/10">
                        {form.encryptMetadata ? <EyeOff size={16} className="text-vault-green" /> : <Eye size={16} className="text-shadow-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Encrypted Metadata</p>
                        <p className="text-xs text-shadow-500">Store transaction details on IPFS/Arweave encrypted</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateForm('encryptMetadata', !form.encryptMetadata)}
                      className={cn('h-6 w-11 rounded-full transition-all', form.encryptMetadata ? 'bg-vault-green' : 'bg-shadow-700')}
                    >
                      <div className={cn('h-5 w-5 rounded-full bg-white transition-all', form.encryptMetadata ? 'translate-x-5.5' : 'translate-x-0.5')} />
                    </button>
                  </div>

                  {/* ZK Proof */}
                  <div className="flex items-start justify-between rounded-xl border border-shadow-800/30 bg-shadow-950/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-shadow-500/10">
                        <Zap size={16} className="text-shadow-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">ZK-Proof Verification</p>
                        <p className="text-xs text-shadow-500">Verify conditions are met without revealing the conditions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateForm('zkProof', !form.zkProof)}
                      className={cn('h-6 w-11 rounded-full transition-all', form.zkProof ? 'bg-shadow-500' : 'bg-shadow-700')}
                    >
                      <div className={cn('h-5 w-5 rounded-full bg-white transition-all', form.zkProof ? 'translate-x-5.5' : 'translate-x-0.5')} />
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-xl border border-shadow-700 px-6 py-2.5 text-sm font-semibold text-shadow-300 transition-all hover:bg-shadow-800/50">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="rounded-xl bg-gradient-to-r from-shadow-600 to-shadow-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
                  Next: Review →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              <motion.div variants={item} className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <Eye size={16} className="text-vault-green" />
                  Review & Confirm
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">Title</span>
                    <span className="text-xs font-medium text-white">{form.title || '—'}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">Amount</span>
                    <span className="text-xs font-semibold text-btc-400">{form.amount || '0'} BTC</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">Receiver</span>
                    <span className="text-xs font-mono text-shadow-300">{form.receiverAddress || '—'}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">Time Lock</span>
                    <span className="text-xs text-white">{form.timeLock ? `${form.timeLockDays} days` : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">Multi-Sig</span>
                    <span className="text-xs text-white">{form.multiSig ? `${form.requiredApprovals}/${form.totalApprovers}` : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">Encrypted Metadata</span>
                    <span className={cn('text-xs font-semibold', form.encryptMetadata ? 'text-vault-green' : 'text-vault-red')}>
                      {form.encryptMetadata ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-shadow-950/50 px-4 py-3">
                    <span className="text-xs text-shadow-400">ZK-Proof</span>
                    <span className={cn('text-xs font-semibold', form.zkProof ? 'text-vault-green' : 'text-vault-red')}>
                      {form.zkProof ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl border border-btc-500/20 bg-btc-500/5 p-3">
                  <AlertCircle size={14} className="mt-0.5 shrink-0 text-btc-500" />
                  <p className="text-[11px] text-btc-400">
                    This transaction will be processed on Starknet L2 with zero-knowledge proofs.
                    The BTC settlement will be automatically triggered upon escrow completion via the Shadow Bridge.
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="rounded-xl border border-shadow-700 px-6 py-2.5 text-sm font-semibold text-shadow-300 transition-all hover:bg-shadow-800/50">
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isEncrypting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-btc-600 to-btc-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-btc-500/25 transition-all hover:shadow-btc-500/40 hover:brightness-110 disabled:opacity-50"
                >
                  {isEncrypting ? <Zap size={16} className="animate-spin" /> : <Lock size={16} />}
                  {isEncrypting ? "Encrypting & Proving..." : "Deploy Shadow Escrow"}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Preview */}
        <motion.div variants={item} className="space-y-4">
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Privacy Preview</h3>
              <button onClick={() => setShowPreview(!showPreview)} className="text-shadow-500 hover:text-white">
                {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg bg-shadow-950/50 p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-shadow-500">Public View</p>
                <div className="space-y-1 font-mono text-[11px]">
                  <p className="text-shadow-400">escrow_id: <span className="text-shadow-300">ESC-XXXXXX</span></p>
                  <p className="text-shadow-400">amount: <span className="text-shadow-600">[ENCRYPTED]</span></p>
                  <p className="text-shadow-400">sender: <span className="text-shadow-600">[ZK-HIDDEN]</span></p>
                  <p className="text-shadow-400">receiver: <span className="text-shadow-600">[ZK-HIDDEN]</span></p>
                  <p className="text-shadow-400">proof: <span className="text-vault-green">✓ VALID</span></p>
                </div>
              </div>
              {showPreview && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="rounded-lg border border-vault-green/20 bg-vault-green/5 p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-vault-green">Your View (Decrypted)</p>
                  <div className="space-y-1 font-mono text-[11px]">
                    <p className="text-shadow-400">title: <span className="text-white">{form.title || '—'}</span></p>
                    <p className="text-shadow-400">amount: <span className="text-btc-400">{form.amount || '0'} BTC</span></p>
                    <p className="text-shadow-400">to: <span className="text-white">{form.receiverAddress || '—'}</span></p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Security Score</h3>
            <div className="relative mx-auto h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#1a0e3e" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="8"
                  strokeDasharray={`${(([form.timeLock, form.multiSig, form.encryptMetadata, form.zkProof].filter(Boolean).length / 4) * 100 * 3.14)} 314`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-white">
                  {[form.timeLock, form.multiSig, form.encryptMetadata, form.zkProof].filter(Boolean).length * 25}%
                </p>
                <p className="text-[10px] text-shadow-500">Privacy</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
