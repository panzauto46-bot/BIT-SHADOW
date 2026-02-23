<div align="center">

# 🌑 BIT-SHADOW

### Confidential Bitcoin Escrow on Starknet

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-bit--shadow.vercel.app-000000?style=for-the-badge&logo=vercel)](https://bit-shadow.vercel.app)
[![Contract](https://img.shields.io/badge/📜_Contract-Starknet_Sepolia-4A154B?style=for-the-badge)](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67)
[![Video Demo](https://img.shields.io/badge/🎬_Video_Demo-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/xoxjxAyio5c)

![Status](https://img.shields.io/badge/Status-Live_on_Testnet-22c55e?style=flat-square)
![Starknet](https://img.shields.io/badge/Built_on-Starknet-4A154B?style=flat-square&logo=ethereum)
![Bitcoin](https://img.shields.io/badge/Secured_by-Bitcoin-F7931A?style=flat-square&logo=bitcoin)
![Cairo](https://img.shields.io/badge/Smart_Contract-Cairo-FF6B6B?style=flat-square)
![ZK-STARKs](https://img.shields.io/badge/Privacy-ZK--STARKs-7c3aed?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

<br />

**BIT-SHADOW** is a privacy-preserving escrow protocol that bridges Bitcoin liquidity to Starknet for **confidential, trustless escrow services**. Powered by zero-knowledge proofs (STARKs) and client-side AES-256-GCM encryption.

<br />

*Built for the [Re{define} Hackathon](https://dorahacks.io/hackathon/redefine/) — Privacy × Bitcoin on Starknet*

<br />

[Live Demo](https://bit-shadow.vercel.app) · [Video Demo](https://youtu.be/xoxjxAyio5c) · [View Contract](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67) · [Report Bug](https://github.com/panzauto46-bot/BIT-SHADOW/issues)

---

</div>

## 📋 Table of Contents

- [Problem & Solution](#-problem--solution)
- [Live Deployment](#-live-deployment)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Smart Contract](#-smart-contract)
- [Hackathon Tracks](#-redefine-hackathon-tracks)
- [Author](#-author)
- [License](#-license)

---

## 🎯 Problem & Solution

<table>
<tr>
<td width="50%">

### ❌ The Problem

Traditional escrow services suffer from critical flaws:

- **Trusted intermediaries** — centralized points of failure
- **No privacy** — all transaction details are publicly visible
- **High fees** — middlemen extract excessive premiums
- **Limited programmability** — Bitcoin lacks native complex escrow logic

</td>
<td width="50%">

### ✅ Our Solution

BIT-SHADOW eliminates these issues by combining:

- **Starknet ZK-Rollup** — privacy & low-cost execution via STARKs
- **Bitcoin Security** — settlement finality & trust
- **Client-Side Encryption** — AES-256-GCM metadata confidentiality
- **Smart Contract Escrow** — fully trustless fund management in Cairo

</td>
</tr>
</table>

---

## 🚀 Live Deployment

### Smart Contract — Starknet Sepolia

| Property | Value |
|---|---|
| **Contract Address** | [`0x47ac31dfc...650ef67`](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67) |
| **Class Hash** | `0x7fccf0cf64ff8b69515782fcf875191c87495c5e00525c8b8d5857d0217368a` |
| **Network** | Starknet Sepolia Testnet |
| **Contract Name** | `ShadowEscrow` |
| **Deployed** | February 13, 2026 |

### Frontend — Vercel

| Property | Value |
|---|---|
| **Live URL** | [bit-shadow.vercel.app](https://bit-shadow.vercel.app) |
| **Framework** | React 19 + Vite 7 + TypeScript |
| **Hosting** | Vercel Edge Network |

### Starknet Wallet (Prize Distribution)

```
0x5157f4f7a2425d013c329bc68ef9ec948925f756445050eff6e18211f19c75b
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Confidential Escrow** | Create encrypted, time-locked escrow agreements with ZK-proof verification |
| **BTC ↔ sBTC Bridge** | Cross-chain bridge between Bitcoin and Starknet L2 via Xverse + sats-connect |
| **Privacy Shield** | Client-side AES-256-GCM encryption — metadata encrypted before touching the blockchain |
| **Multi-Wallet Support** | Argent X, Braavos (Starknet) + Xverse (Bitcoin) with real wallet signing |
| **ZK-Proof Engine** | STARK proof generation and verification for privacy-preserving transactions |
| **Multi-Sig Approvals** | Configurable approval thresholds with ZK-proof-backed signatures |
| **Time-Lock Mechanism** | On-chain time-lock enforcement — escrows settle only after `unlock_time` |
| **Real-time Dashboard** | Portfolio overview with live analytics, network status, and escrow tracking |
| **Dynamic Theming** | Shadow Dark and Solar Light modes with CSS variable-driven design system |
| **Responsive Design** | Mobile-first layout with hamburger navigation and adaptive components |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     BIT-SHADOW PROTOCOL                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│   │  Dashboard   │  │   Bridge    │  │   Create Escrow     │ │
│   │  Analytics   │  │  BTC ↔ sBTC │  │   + ZK Proofs       │ │
│   └──────┬───────┘  └──────┬──────┘  └──────────┬──────────┘ │
│          │                 │                     │            │
│   ┌──────▼─────────────────▼─────────────────────▼──────────┐│
│   │            React 19 + Vite 7 + Tailwind CSS 4            ││
│   │       Framer Motion · Lucide React · Google Fonts        ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │              Wallet Integration Layer                     ││
│   │    Argent X / Braavos (Starknet) · Xverse (Bitcoin)       ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │        AES-256-GCM Encryption (Web Crypto API)            ││
│   │     Client-side metadata encryption before on-chain       ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │         ShadowEscrow Smart Contract (Cairo)               ││
│   │  create_escrow · approve_escrow · settle_escrow           ││
│   │  get_escrow_details · mint_sbtc                           ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │           Starknet Sepolia L2 (ZK-Rollup)                 ││
│   │        Quantum-safe STARKs · Secured by Ethereum L1       ││
│   └──────────────────────────────────────────────────────────┘│
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, TypeScript 5.9, Vite 7 | UI framework & build tool |
| **Styling** | Tailwind CSS 4, CSS Variables, Google Fonts (Inter) | Dynamic theming (Dark/Light) |
| **Animations** | Framer Motion 12 | Micro-interactions & page transitions |
| **Icons** | Lucide React | Consistent icon system |
| **Smart Contract** | Cairo (Starknet) | On-chain escrow logic |
| **Build Tool** | Scarb | Cairo compilation & deployment |
| **Starknet SDK** | starknet.js v9.2.1 | Contract interaction & wallet integration |
| **Bitcoin SDK** | sats-connect v4.2.1, bitcoinjs-lib v7 | Xverse wallet + Bitcoin transactions |
| **Cryptography** | AES-256-GCM (Web Crypto API) | Client-side metadata encryption |
| **Privacy** | ZK-STARKs (Starknet native) | Zero-knowledge proof verification |
| **Hosting** | Vercel (Frontend), Starknet Sepolia (Contract) | Production deployment |

---

## ⚡ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Argent X or Braavos — Starknet wallet (optional)
- Xverse — Bitcoin wallet (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/panzauto46-bot/BIT-SHADOW.git
cd BIT-SHADOW

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Production Build

```bash
npm run build
```

---

## 📁 Project Structure

```
BIT-SHADOW/
├── contracts/                    # Cairo smart contracts
│   ├── src/
│   │   └── lib.cairo             # ShadowEscrow contract (165 lines)
│   ├── Scarb.toml                # Scarb build configuration
│   └── Scarb.lock
│
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── Dashboard.tsx         # Stats + ZK-Proof Engine + network panels
│   │   ├── CreateEscrow.tsx      # Escrow creation wizard with encryption
│   │   ├── Bridge.tsx            # BTC ↔ sBTC bridge via Xverse
│   │   ├── EscrowList.tsx        # Escrow management & filtering
│   │   ├── PrivacyShield.tsx     # ZK-proof visualization + encryption demo
│   │   ├── Header.tsx            # Search + theme toggle + wallet connect
│   │   └── Sidebar.tsx           # Navigation + wallet status
│   │
│   ├── lib/
│   │   ├── wallet-utils.ts       # Argent X / Braavos / Xverse connection
│   │   └── bitcoin-service.ts    # Mempool.space API integration
│   │
│   ├── store/
│   │   └── useStore.ts           # Global state management (React hooks)
│   │
│   ├── utils/
│   │   ├── encryption.ts         # AES-256-GCM encrypt/decrypt (Web Crypto API)
│   │   ├── constants.ts          # Contract address
│   │   └── cn.ts                 # Tailwind class merge utility
│   │
│   ├── types/index.ts            # TypeScript interfaces
│   ├── App.tsx                   # Main layout + mobile responsive
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Design system + animations
│
├── deployment.json               # Deployed contract metadata
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md
```

---

## 📜 Smart Contract

### ShadowEscrow — Deployed on Starknet Sepolia

```cairo
#[derive(Drop, Serde, starknet::Store)]
struct Escrow {
    id: u128,
    creator: ContractAddress,
    recipient: ContractAddress,
    amount_sbtc: u256,
    unlock_time: u64,
    is_settled: bool,
    encrypted_metadata_cid: felt252,
    required_approvals: u8,
    current_approvals: u8,
}

#[starknet::interface]
trait IShadowEscrow<TContractState> {
    fn create_escrow(
        ref self: TContractState,
        recipient: ContractAddress,
        amount: u256,
        unlock_time: u64,
        encrypted_metadata: felt252
    ) -> u128;

    fn approve_escrow(
        ref self: TContractState,
        escrow_id: u128,
        zk_proof: Array<felt252>
    );

    fn settle_escrow(ref self: TContractState, escrow_id: u128);

    fn get_escrow_details(self: @TContractState, escrow_id: u128) -> Escrow;

    fn mint_sbtc(ref self: TContractState, amount: u256);
}
```

### Contract Features

| Feature | Implementation |
|---------|---------------|
| **Encrypted Metadata** | `encrypted_metadata_cid` stores AES-256-GCM encrypted pointer on-chain |
| **Multi-Sig Approvals** | `required_approvals` threshold with `approve_escrow()` + ZK-proof param |
| **Time-Lock** | `settle_escrow()` enforces `get_block_timestamp() >= unlock_time` |
| **sBTC Minting** | `mint_sbtc()` tracks synthetic BTC balances per-address on L2 |

### Events

| Event | Fields |
|-------|--------|
| `EscrowCreated` | `id`, `creator`, `amount`, `unlock_time` |
| `EscrowSettled` | `id`, `recipient`, `amount` |

🔍 [View on Starkscan](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67)

---

## 🧪 Testing Flow

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Click **Connect Wallet** | Argent X/Braavos/Xverse connects |
| 2 | Navigate to **Bridge** | BTC ↔ sBTC bridge interface loads |
| 3 | Navigate to **Create Escrow** | Multi-step form with encryption & ZK options |
| 4 | Toggle **Encrypted Metadata** | AES-256-GCM encryption activates |
| 5 | Toggle **ZK-Proof** | ZK proof generation starts |
| 6 | Click **Deploy Shadow Escrow** | Transaction signed via wallet |
| 7 | Check **Dashboard** | New escrow appears with live stats |
| 8 | Click **Logout** | Wallet disconnects cleanly |
| 9 | Toggle 🌙/☀️ | Theme switches Dark ↔ Light |

---

## 🏆 Re{define} Hackathon Tracks

<table>
<tr>
<td align="center" width="33%">
<br />
<h3>🔒 Privacy Track</h3>
<sub>Privacy-preserving escrow using STARKs and confidential transactions. All metadata is encrypted client-side with AES-256-GCM before touching the blockchain. ZK-proofs verify escrow conditions without revealing underlying data.</sub>
<br /><br />
</td>
<td align="center" width="33%">
<br />
<h3>₿ Bitcoin Track</h3>
<sub>BTC-native DeFi leveraging Starknet's security. Shadow Bridge enables BTC ↔ sBTC bridging via Xverse wallet and sats-connect SDK. Real Bitcoin transactions with cross-chain settlement on Starknet L2.</sub>
<br /><br />
</td>
<td align="center" width="33%">
<br />
<h3>🚀 Wildcard Track</h3>
<sub>Innovative escrow-as-a-service on Starknet. Trustless fund management with multi-sig approvals, time-locks, and encrypted metadata — eliminating intermediaries through Cairo smart contracts.</sub>
<br /><br />
</td>
</tr>
</table>

---

## 👨‍💻 Author

<table>
<tr>
<td align="center">
<br />
<b>Pandu Dargah</b>
<br />
<sub>Solo Developer</sub>
<br /><br />
<a href="https://github.com/panzauto46-bot">
<img src="https://img.shields.io/badge/GitHub-panzauto46--bot-181717?style=flat-square&logo=github" />
</a>
<br /><br />
</td>
</tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
<br />

**Built for the [Re{define} Hackathon](https://dorahacks.io/hackathon/redefine/) — Privacy × Bitcoin on Starknet**

*Backed by Starknet Foundation · StarkWare · OpenZeppelin · Xverse*

<br />

![Starknet](https://img.shields.io/badge/Starknet-4A154B?style=for-the-badge&logo=ethereum&logoColor=white)
![Bitcoin](https://img.shields.io/badge/Bitcoin-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white)
![Cairo](https://img.shields.io/badge/Cairo-FF6B6B?style=for-the-badge)
![ZK-STARKs](https://img.shields.io/badge/ZK--STARKs-7c3aed?style=for-the-badge)

</div>
