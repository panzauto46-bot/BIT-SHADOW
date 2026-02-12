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
  const [escrows] = useState<EscrowTransaction[]>(mockEscrows);
  const [stats] = useState<DashboardStats>(mockStats);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [starknetId, setStarknetId] = useState('');

  const connectWallet = useCallback(async () => {
    // Try connecting to Starknet first
    const sAddr = await connectStarknet();
    const bAddr = await connectBitcoin();

    if (sAddr || bAddr) {
      setWalletConnected(true);
      if (sAddr) {
        setWalletAddress(sAddr);
        // In a real app we'd resolve the starknet ID using a naming service
        setStarknetId(sAddr.substring(0, 6) + '...' + sAddr.substring(sAddr.length - 4));
      }
      if (bAddr) {
        // Store bitcoin address if needed in a separate state, or just log for now
        console.log("Bitcoin connected:", bAddr);
      }
    } else {
      // Fallback for demo if no wallets found (optional, but requested "functional", so maybe alert)
      alert("No wallets detected. Please install Argent X or Xverse.");
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
    setWalletAddress('');
    setStarknetId('');
  }, []);

  return {
    activeTab,
    setActiveTab,
    escrows,
    stats,
    walletConnected,
    walletAddress,
    starknetId,
    connectWallet,
    disconnectWallet,
  };
}
