# BIT-SHADOW Protocol 🌑

> **Confidential Bitcoin Escrow on Starknet**  
> *Privacy Track & Bitcoin Hybrid Solution*

![Status](https://img.shields.io/badge/Status-Live_on_Testnet-success)
![Starknet](https://img.shields.io/badge/Built_on-Starknet-blue)
![Bitcoin](https://img.shields.io/badge/Secured_by-Bitcoin-orange)
![Deploy](https://img.shields.io/badge/Contract-Sepolia_Deployed-brightgreen)

---

## 📌 Overview

BIT-SHADOW is a next-generation privacy protocol that bridges Bitcoin liquidity to Starknet for **confidential, trustless escrow services**. By leveraging Starknet's ZK-Rollup capabilities and Bitcoin's security, we enable users to create encrypted, time-locked, and multi-sig escrow agreements without revealing sensitive transaction details to the public ledger.

### 🎯 Problem Statement
Traditional escrow services require trusted intermediaries, lack privacy, and are expensive. Bitcoin users have no native way to create complex, conditional, and private escrow agreements on-chain.

### 💡 Solution
BIT-SHADOW combines:
- **Starknet's ZK-Rollup** for privacy and low-cost execution
- **Bitcoin's Security** for settlement finality
- **Client-Side Encryption** for metadata confidentiality
- **Smart Contract Escrow** for trustless fund management

---

## 🚀 Live Deployment

### Smart Contract (Starknet Sepolia)
| Resource | Details |
|----------|---------|
| **Contract Address** | [`0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67`](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67) |
| **Class Hash** | `0x7fccf0cf64ff8b69515782fcf875191c87495c5e00525c8b8d5857d0217368a` |
| **Network** | Starknet Sepolia Testnet |
| **Contract Name** | `ShadowEscrow` |

### Frontend
| Resource | Details |
|----------|---------|
| **Live URL** | [Vercel Deployment](https://bit-shadow.vercel.app) |
| **Framework** | React + Vite + TypeScript |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                  BIT-SHADOW UI                   │
│         React + Vite + Tailwind CSS              │
├──────────┬──────────┬──────────┬────────────────┤
│ Dashboard│  Bridge  │  Escrow  │ Privacy Shield │
│          │ BTC↔sBTC │ Creator  │  ZK Proofs     │
├──────────┴──────────┴──────────┴────────────────┤
│              Wallet Integration                  │
│         Argent X (Starknet) + Xverse (BTC)       │
├─────────────────────────────────────────────────┤
│            ShadowEscrow Contract                 │
│              (Cairo on Starknet)                 │
│   ┌─────────────┬──────────────┬──────────┐     │
│   │ Create      │ Settle       │ Admin    │     │
│   │ Escrow      │ Escrow       │ Controls │     │
│   └─────────────┴──────────────┴──────────┘     │
├─────────────────────────────────────────────────┤
│              Starknet Sepolia L2                 │
│            (ZK-Rollup on Ethereum)               │
└─────────────────────────────────────────────────┘
```

---

## 🔑 Key Modules

### 1. The Shadow Engine — Smart Contracts (`contracts/src/lib.cairo`)
- **ShadowEscrow Contract**: Deployed on Starknet Sepolia
- **Create Escrow**: Lock sBTC with time-lock conditions
- **Settle Escrow**: Release funds to recipient after conditions are met
- **Admin Controls**: Manage contract parameters
- **Event Emission**: `EscrowCreated` and `EscrowSettled` events for tracking

### 2. The Bridge — Bitcoin Integration
- **Xverse & Argent X Support**: Seamless dual-wallet connection
- **Automatic Settlement**: Watches for Bitcoin finality and triggers Starknet state updates
- **Synthetic Minting**: 1:1 Pegged sBTC representation on L2

### 3. The Shadow UI — Frontend
- **Futuristic & Dynamic Theme**: Switch between immersive **Shadow Dark** and clean **Solar Light** modes.
- **Dashboard**: Real-time portfolio overview with analytics
- **Confidential Transaction Builder**: Encrypts metadata (AES-256-GCM) client-side
- **Real-time Tracker**: Monitors ZK-proof generation and bridge confirmations
- **Escrow Manager**: Create, view, and manage escrow agreements

### 4. Privacy Shield — Security & Identity
- **Starknet ID**: Integration for human-readable identities (.stark)
- **Client-Side Encryption**: Metadata encrypted in-browser, only involved parties can read
- **ZK-Proof Generation**: Privacy-preserving transaction verification

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| **Styling** | Custom CSS Variables for Dynamic Theming (Dark/Light) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Smart Contract** | Cairo (Starknet) |
| **Contract Tool** | Scarb |
| **Wallets** | Argent X (Starknet), Xverse (Bitcoin/Ordinals) |
| **Cryptography** | AES-256-GCM (Client-Side), ZK-SNARKs |
| **Deployment** | Vercel (Frontend), Starknet Sepolia (Contract) |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- [Argent X Wallet](https://www.argent.xyz/) (for Starknet)
- [Xverse Wallet](https://www.xverse.app/) (for Bitcoin)

### Quick Start

```bash
# 1. Clone the Repository
git clone https://github.com/panzauto46-bot/BIT-SHADOW.git
cd BIT-SHADOW

# 2. Install Dependencies
npm install

# 3. Run Development Server
npm run dev

# 4. Open in Browser
# Access the dApp at http://localhost:5173
```

### Build for Production
```bash
npm run build
```

---

## 🧪 Testing the Flow

1. **Connect Wallets**: Click "Connect Wallet" to link both Argent X and Xverse
2. **Bridge Assets**: Go to the "Bridge" tab and swap BTC for sBTC
3. **Create Escrow**: Navigate to "Create Escrow", fill in the details:
   - Toggle **"Encrypted Metadata"** to see client-side encryption in action
   - Toggle **"ZK-Proof"** to simulate proof generation
4. **Deploy**: Click "Deploy Shadow Escrow" to sign the transaction
5. **Track**: Monitor your escrow agreements in the Dashboard

---

## 📁 Project Structure

```
BIT-SHADOW/
├── contracts/              # Cairo smart contracts
│   ├── src/
│   │   └── lib.cairo       # ShadowEscrow contract source
│   ├── Scarb.toml          # Scarb configuration
│   └── Scarb.lock
├── src/                    # Frontend source
│   ├── components/
│   │   ├── Dashboard.tsx    # Portfolio overview
│   │   ├── Bridge.tsx       # BTC ↔ sBTC bridge
│   │   ├── CreateEscrow.tsx # Escrow creation flow
│   │   ├── EscrowList.tsx   # Escrow management
│   │   ├── PrivacyShield.tsx# Privacy tools
│   │   ├── Header.tsx       # Navigation header containing Theme Toggle
│   │   └── Sidebar.tsx      # Side navigation
│   ├── lib/                 # Service libraries
│   ├── store/               # State management
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & Theme definitions
├── deployment.json          # Deployed contract info
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🔗 Contract Verification

You can verify the deployed ShadowEscrow contract on Starkscan:

🔍 [View on Starkscan (Sepolia)](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67)

### Contract Interface

```cairo
#[starknet::interface]
trait IShadowEscrow {
    fn create_escrow(ref self: TContractState, amount: u256, unlock_time: u64) -> u128;
    fn settle_escrow(ref self: TContractState, escrow_id: u128, recipient: ContractAddress);
    fn get_escrow_count(self: @TContractState) -> u128;
    fn get_admin(self: @TContractState) -> ContractAddress;
}
```

---

## 🏆 Hackathon Tracks

- **Privacy Track**: ZK-powered confidential escrow with client-side encryption
- **Bitcoin Integration**: BTC ↔ sBTC bridge with Xverse wallet support
- **DeFi Innovation**: Trustless escrow service eliminating intermediaries

---

## 👥 Team

Built with ❤️ by **PANZ AUTO** for the Starknet Hackathon.

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.
