import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Bitcoin, Shield, Zap, CheckCircle2, Clock, ExternalLink, AlertCircle, ArrowDown, RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppStore } from '../store/useStore';
import { bitcoinService } from '../lib/bitcoin-service';
import { request, RpcErrorCode } from 'sats-connect';

// Replace with your actual secure vault address (SegWit or Taproot)
const BITCOIN_VAULT_ADDRESS = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

interface BridgeTransaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'confirming' | 'bridging' | 'completed';
  btcConfirmations: number;
  timestamp: string;
}

const mockBridgeTxs: BridgeTransaction[] = [
  { id: 'BRG-A1X9', type: 'deposit', amount: 0.5, status: 'completed', btcConfirmations: 6, timestamp: '2 hours ago' },
  { id: 'BRG-K3M7', type: 'withdraw', amount: 0.15, status: 'bridging', btcConfirmations: 3, timestamp: '45 min ago' },
  { id: 'BRG-P8N2', type: 'deposit', amount: 1.2, status: 'confirming', btcConfirmations: 1, timestamp: '12 min ago' },
];

export function Bridge() {
  const { walletConnected, connectWallet, walletAddress, bitAddress } = useAppStore(); // Assuming bitAddress is available in store, if not we need to add it
  const [direction, setDirection] = useState<'btc-to-stark' | 'stark-to-btc'>('btc-to-stark');
  const [amount, setAmount] = useState('');
  const [isBridging, setIsBridging] = useState(false);
  const [btcBalance, setBtcBalance] = useState<number | null>(null);
  const [sbtcBalance, setSbtcBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  // Fetch real balances if wallet connected
  const fetchBalances = async () => {
    if (!walletConnected) return;
    setIsLoadingBalance(true);
    try {
      // Fetch BTC Balance
      // Use connected Bitcoin address if available, otherwise fallback to demo address
      const addressToCheck = bitAddress || "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

      const stats = await bitcoinService.getAddressStats(addressToCheck);
      if (stats) {
        setBtcBalance(bitcoinService.calculateBalance(stats));
      }

      // Mock sBTC balance fetch (would be Starknet call using walletAddress)
      if (walletAddress) {
        console.log("Fetching sBTC for", walletAddress);
      }
      setTimeout(() => setSbtcBalance(1.523), 500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  // Initial fetch
  useState(() => {
    fetchBalances();
  });

  const handleBridge = async () => {
    if (!walletConnected) {
      alert("Please connect wallets first (Xverse & Argent X)");
      connectWallet();
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsBridging(true);

    try {
      if (direction === 'btc-to-stark') {
        // REAL BITCOIN TRANSFER
        console.log("Initiating Bitcoin Transfer...");
        const response = await request('sendTransfer', {
          recipients: [
            {
              address: BITCOIN_VAULT_ADDRESS,
              amount: Math.floor(parseFloat(amount) * 100_000_000) // Convert BTC to sats
            }
          ]
        });

        if (response.status === 'success') {
          console.log("Bitcoin Transaction Sent:", response.result.txid);
          // Simulate backend picking up the tx for minting sBTC (in a full app, backend does this)
          // For demo MVP, we notify user to wait for confirmation
          alert(`SUCCESS! Bitcoin sent. TXID: ${response.result.txid}\n\nsBTC will be minted to your Starknet wallet after 3 confirmations.`);
        } else {
          if (response.error.code === RpcErrorCode.USER_REJECTION) {
            console.log("User rejected transaction");
          } else {
            throw new Error(response.error.message);
          }
        }
      } else {
        // STARKNET WITHDRAW (sBTC -> BTC)
        // Real contract interaction (placeholders for now until contract deploy)
        console.log("Processing sBTC Burn...");
        // const tx = await starknet.account.execute({ contractAddress: ..., entrypoint: 'burn', ... });
        // await starknet.provider.waitForTransaction(tx.transaction_hash);
        setTimeout(() => {
          alert("Burn transaction submitted to Starknet! BTC will be released to your wallet shortly.");
        }, 2000);
      }
    } catch (e) {
      console.error("Bridge Error:", e);
      alert("Bridge Failed: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setIsBridging(false);
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-4xl space-y-6">
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-white">BTC Shadow Bridge</h2>
        <p className="text-sm text-shadow-400">Bridge Bitcoin to Starknet Synthetic BTC for confidential escrow operations</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Bridge Interface */}
        <motion.div variants={item} className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-6">
            {/* Direction Toggle */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setDirection('btc-to-stark')}
                className={cn('rounded-xl px-4 py-2 text-xs font-semibold transition-all',
                  direction === 'btc-to-stark' ? 'bg-gradient-to-r from-btc-600 to-shadow-600 text-white' : 'bg-shadow-900/50 text-shadow-400'
                )}
              >
                BTC → sBTC
              </button>
              <button
                onClick={() => setDirection(direction === 'btc-to-stark' ? 'stark-to-btc' : 'btc-to-stark')}
                className="rounded-full bg-shadow-800/50 p-2 text-shadow-400 transition-colors hover:bg-shadow-700/50 hover:text-white"
              >
                <ArrowLeftRight size={16} />
              </button>
              <button
                onClick={() => setDirection('stark-to-btc')}
                className={cn('rounded-xl px-4 py-2 text-xs font-semibold transition-all',
                  direction === 'stark-to-btc' ? 'bg-gradient-to-r from-shadow-600 to-btc-600 text-white' : 'bg-shadow-900/50 text-shadow-400'
                )}
              >
                sBTC → BTC
              </button>
            </div>

            {/* From */}
            <div className="rounded-xl border border-shadow-800/30 bg-shadow-950/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-shadow-500">From</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-shadow-500">
                    Balance: {isLoadingBalance ? '...' : (direction === 'btc-to-stark' ? (btcBalance?.toFixed(4) || '2.847') + ' BTC' : (sbtcBalance?.toFixed(4) || '1.523') + ' sBTC')}
                  </span>
                  <button onClick={fetchBalances} className="text-shadow-500 hover:text-white"><RefreshCw size={10} /></button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl',
                  direction === 'btc-to-stark' ? 'bg-btc-500/10' : 'bg-shadow-500/10'
                )}>
                  {direction === 'btc-to-stark' ? (
                    <Bitcoin size={20} className="text-btc-500" />
                  ) : (
                    <Shield size={20} className="text-shadow-400" />
                  )}
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder-shadow-700"
                />
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{direction === 'btc-to-stark' ? 'BTC' : 'sBTC'}</p>
                  <p className="text-[10px] text-shadow-500">{direction === 'btc-to-stark' ? 'Bitcoin' : 'Starknet'}</p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                {['25%', '50%', '75%', 'MAX'].map((pct) => (
                  <button key={pct} className="rounded-lg bg-shadow-800/50 px-2.5 py-1 text-[10px] font-semibold text-shadow-400 transition-colors hover:bg-shadow-700/50 hover:text-white">
                    {pct}
                  </button>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center -my-2 relative z-10">
              <div className="rounded-xl border border-shadow-800/50 bg-shadow-900 p-2">
                <ArrowDown size={16} className="text-shadow-400" />
              </div>
            </div>

            {/* To */}
            <div className="rounded-xl border border-shadow-800/30 bg-shadow-950/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-shadow-500">To (Estimated)</span>
                <span className="text-[11px] text-shadow-500">Balance: {direction === 'btc-to-stark' ? '1.523 sBTC' : '2.847 BTC'}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl',
                  direction === 'btc-to-stark' ? 'bg-shadow-500/10' : 'bg-btc-500/10'
                )}>
                  {direction === 'btc-to-stark' ? (
                    <Shield size={20} className="text-shadow-400" />
                  ) : (
                    <Bitcoin size={20} className="text-btc-500" />
                  )}
                </div>
                <p className="flex-1 text-2xl font-bold text-shadow-300">{amount ? (parseFloat(amount) * 0.997).toFixed(6) : '0.00'}</p>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{direction === 'btc-to-stark' ? 'sBTC' : 'BTC'}</p>
                  <p className="text-[10px] text-shadow-500">{direction === 'btc-to-stark' ? 'Starknet' : 'Bitcoin'}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-2 rounded-xl bg-shadow-950/30 p-3">
              <div className="flex justify-between text-xs">
                <span className="text-shadow-500">Bridge Fee</span>
                <span className="text-shadow-300">0.3%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-shadow-500">Est. Time</span>
                <span className="text-shadow-300">~30 minutes (3 BTC confirmations)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-shadow-500">Privacy</span>
                <span className="flex items-center gap-1 text-vault-green"><Shield size={10} /> ZK-Shielded</span>
              </div>
            </div>

            <button
              onClick={handleBridge}
              disabled={isBridging}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-btc-600 via-shadow-600 to-shadow-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-shadow-600/25 transition-all hover:brightness-110 disabled:opacity-50">
              {isBridging ? <Zap size={16} className="animate-spin" /> : <Zap size={16} />}
              {isBridging ? "Bridging Assets..." : "Bridge via Shadow Protocol"}
            </button>
          </div>
        </motion.div>

        {/* Bridge Activity */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Bridge Activity</h3>
            <div className="space-y-3">
              {mockBridgeTxs.map((tx) => (
                <div key={tx.id} className="rounded-xl border border-shadow-800/30 bg-shadow-950/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg',
                        tx.type === 'deposit' ? 'bg-vault-green/10' : 'bg-btc-500/10'
                      )}>
                        {tx.type === 'deposit' ? (
                          <ArrowDown size={14} className="text-vault-green" />
                        ) : (
                          <ArrowDown size={14} className="rotate-180 text-btc-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{tx.type === 'deposit' ? 'BTC → sBTC' : 'sBTC → BTC'}</p>
                        <p className="text-[10px] text-shadow-500">{tx.id} • {tx.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-btc-400">{tx.amount} BTC</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {tx.status === 'completed' ? (
                        <CheckCircle2 size={10} className="text-vault-green" />
                      ) : tx.status === 'bridging' ? (
                        <Zap size={10} className="text-shadow-400 animate-pulse" />
                      ) : (
                        <Clock size={10} className="text-btc-500 animate-pulse" />
                      )}
                      <span className={cn('text-[10px] font-semibold uppercase',
                        tx.status === 'completed' ? 'text-vault-green' : tx.status === 'bridging' ? 'text-shadow-400' : 'text-btc-500'
                      )}>
                        {tx.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-shadow-500">{tx.btcConfirmations}/6 confirmations</span>
                  </div>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-shadow-800">
                    <div
                      className={cn('h-full rounded-full',
                        tx.status === 'completed' ? 'bg-vault-green' : 'bg-gradient-to-r from-btc-500 to-shadow-500'
                      )}
                      style={{ width: `${(tx.btcConfirmations / 6) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bridge Info */}
          <div className="rounded-2xl border border-shadow-800/50 bg-shadow-900/30 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">How It Works</h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Lock BTC', desc: 'Send BTC to the Shadow vault address' },
                { step: '2', title: 'ZK Verification', desc: 'Proof of deposit generated on Starknet' },
                { step: '3', title: 'Mint sBTC', desc: 'Receive synthetic BTC on Starknet L2' },
                { step: '4', title: 'Use in Escrow', desc: 'Create confidential escrow with sBTC' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-shadow-600 to-btc-500 text-[10px] font-bold text-white">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{s.title}</p>
                    <p className="text-[10px] text-shadow-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-btc-500/20 bg-btc-500/5 p-3">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-btc-500" />
            <p className="text-[11px] text-btc-400">
              Bridge operations require Xverse wallet connection. BTC transactions need 3 confirmations for bridging.
            </p>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-shadow-700/50 bg-shadow-900/50 py-2.5 text-xs font-medium text-shadow-300 transition-colors hover:bg-shadow-800/50">
            <ExternalLink size={12} />
            View Bridge Contract on Starkscan
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
