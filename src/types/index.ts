export interface EscrowTransaction {
  id: string;
  title: string;
  description: string;
  amount: number; // in BTC
  status: 'locked' | 'pending' | 'settled' | 'disputed' | 'expired';
  createdAt: Date;
  expiresAt: Date;
  sender: WalletIdentity;
  receiver: WalletIdentity;
  approvers: number;
  requiredApprovals: number;
  zkProofVerified: boolean;
  encryptedMetadata: boolean;
  timeLockActive: boolean;
  progress: number; // 0-100
}

export interface WalletIdentity {
  address: string;
  starknetId?: string;
  type: 'bitcoin' | 'starknet';
}

export interface DashboardStats {
  totalEscrows: number;
  activeEscrows: number;
  totalValueLocked: number;
  settledTransactions: number;
  privacyScore: number;
}

export interface ZKProofStatus {
  generating: boolean;
  verified: boolean;
  proofHash?: string;
  timestamp?: Date;
}

export type TabType = 'dashboard' | 'create' | 'escrows' | 'bridge' | 'privacy';
