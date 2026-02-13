import { useState, useCallback } from 'react';
import type { EscrowTransaction, DashboardStats, TabType } from '../types';
import { connectStarknet, connectBitcoin } from '../lib/wallet-utils';

const mockEscrows: EscrowTransaction[] = [
  {
    id: 'ESC-7X9K2M',
    title: 'Web3 Development Payment',
    description: 'Payment for DeFi dashboard development',
    amount: 0.45,
    status: 'locked',
    createdAt: new Date('2025-01-10'),
    expiresAt: new Date('2025-02-10'),
    sender: { address: '0x049d36...a8f2', starknetId: 'shadow.stark', type: 'starknet' },
    receiver: { address: 'bc1qxy2k...w508d', type: 'bitcoin' },
    approvers: 1,
    requiredApprovals: 2,
    zkProofVerified: true,
    encryptedMetadata: true,
    timeLockActive: true,
    progress: 45,
  },
  {
    id: 'ESC-3P8N5R',
    title: 'NFT Artwork Commission',
    description: 'Confidential art commission payment',
    amount: 0.12,
    status: 'pending',
    createdAt: new Date('2025-01-08'),
    expiresAt: new Date('2025-01-25'),
    sender: { address: '0x0172ff...c4e1', starknetId: 'vault.stark', type: 'starknet' },
    receiver: { address: 'bc1qrp33...sq7fn', type: 'bitcoin' },
    approvers: 2,
    requiredApprovals: 2,
    zkProofVerified: true,
    encryptedMetadata: true,
    timeLockActive: false,
    progress: 80,
  },
  {
    id: 'ESC-1L4W7T',
    title: 'Smart Contract Audit',
    description: 'Security audit service payment',
    amount: 1.25,
    status: 'settled',
    createdAt: new Date('2024-12-20'),
    expiresAt: new Date('2025-01-20'),
    sender: { address: '0x08a3bc...e7d9', starknetId: 'crypto.stark', type: 'starknet' },
    receiver: { address: 'bc1qw50...8utg', type: 'bitcoin' },
    approvers: 3,
    requiredApprovals: 3,
    zkProofVerified: true,
    encryptedMetadata: true,
    timeLockActive: false,
    progress: 100,
  },
  {
    id: 'ESC-9F2H6V',
    title: 'Cross-chain Bridge Fee',
    description: 'Bridge liquidity provision escrow',
    amount: 0.08,
    status: 'locked',
    createdAt: new Date('2025-01-12'),
    expiresAt: new Date('2025-03-12'),
    sender: { address: '0x0f91ae...b3c8', type: 'starknet' },
    receiver: { address: 'bc1qm34...7hj2', type: 'bitcoin' },
    approvers: 0,
    requiredApprovals: 2,
    zkProofVerified: false,
    encryptedMetadata: true,
    timeLockActive: true,
    progress: 15,
  },
  {
    id: 'ESC-5D8J3Q',
    title: 'DAO Treasury Transfer',
    description: 'Multi-sig DAO fund allocation',
    amount: 2.5,
    status: 'disputed',
    createdAt: new Date('2025-01-05'),
    expiresAt: new Date('2025-02-05'),
    sender: { address: '0x0c47dd...f1a6', starknetId: 'dao.stark', type: 'starknet' },
    receiver: { address: 'bc1qdh9...3mn5', type: 'bitcoin' },
    approvers: 1,
    requiredApprovals: 3,
    zkProofVerified: true,
    encryptedMetadata: false,
    timeLockActive: true,
    progress: 33,
  },
];

const mockStats: DashboardStats = {
  totalEscrows: 47,
  activeEscrows: 12,
  totalValueLocked: 18.73,
  settledTransactions: 35,
  privacyScore: 94,
};

export function useAppStore() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [escrows, setEscrows] = useState<EscrowTransaction[]>(mockEscrows);
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [bitAddress, setBitAddress] = useState('');
  const [starknetId, setStarknetId] = useState('');

  const connectWallet = useCallback(async () => {
    // Step 1: Try real wallet connections
    let sAddr: string | null = null;
    let bAddr: string | null = null;

    try {
      sAddr = await connectStarknet();
    } catch (e) {
      console.warn("Starknet connection attempt failed:", e);
    }

    try {
      bAddr = await connectBitcoin();
    } catch (e) {
      console.warn("Bitcoin connection attempt failed:", e);
    }

    // Step 2: If real wallet found, use it
    if (sAddr || bAddr) {
      setWalletConnected(true);

      if (sAddr) {
        setWalletAddress(sAddr);
        const shortAddr = sAddr.length > 10 ? sAddr.substring(0, 6) + '...' + sAddr.substring(sAddr.length - 4) : sAddr;
        setStarknetId(shortAddr);
      } else if (bAddr) {
        const shortBtc = bAddr.length > 10 ? bAddr.substring(0, 6) + '...' + bAddr.substring(bAddr.length - 4) : bAddr;
        setStarknetId(shortBtc);
      }

      if (bAddr) {
        setBitAddress(bAddr);
      }
      return;
    }

    // Step 3: No real wallets found → Enter Demo Mode automatically
    // Uses the deployed contract admin address for realistic demo
    const demoAddress = '0x04a3B6...c9F2';
    setWalletConnected(true);
    setWalletAddress('0x04a3B6e8d1f7C2a9E5b0D4c8F1A7e3B6d9C2f5a8E1b4D7c0A3f6E9b2C5d8F1');
    setStarknetId(demoAddress);
    setBitAddress('bc1qxy2k...w508d');
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
    setWalletAddress('');
    setBitAddress('');
    setStarknetId('');
  }, []);

  const addEscrow = useCallback((newEscrow: EscrowTransaction) => {
    // In a real app with an indexer, we might not need this as we'd re-fetch
    // But for immediate UI feedback:
    setEscrows(prev => [newEscrow, ...prev]);
    // Also update stats
    setStats(prev => ({
      ...prev,
      totalEscrows: prev.totalEscrows + 1,
      activeEscrows: prev.activeEscrows + 1,
      totalValueLocked: prev.totalValueLocked + newEscrow.amount
    }));
  }, []);

  return {
    activeTab,
    setActiveTab,
    escrows,
    stats,
    walletConnected,
    walletAddress,
    bitAddress,
    starknetId,
    connectWallet,
    disconnectWallet,
    addEscrow
  };
}
