<div align="center">

# 🌑 BIT-SHADOW

### Confidential Bitcoin Escrow on Starknet

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-bit--shadow.vercel.app-000000?style=for-the-badge&logo=vercel)](https://bit-shadow.vercel.app)
[![Contract](https://img.shields.io/badge/📜_Contract-Starknet_Sepolia-4A154B?style=for-the-badge)](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67)

![Status](https://img.shields.io/badge/Status-Live_on_Testnet-22c55e?style=flat-square)
![Starknet](https://img.shields.io/badge/Built_on-Starknet-4A154B?style=flat-square&logo=ethereum)
![Bitcoin](https://img.shields.io/badge/Secured_by-Bitcoin-F7931A?style=flat-square&logo=bitcoin)
![Cairo](https://img.shields.io/badge/Language-Cairo-FF6B6B?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/Code-TypeScript-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

<br />

**BIT-SHADOW** is a next-generation privacy protocol that bridges Bitcoin liquidity to Starknet for **confidential, trustless escrow services**. Powered by zero-knowledge proofs and client-side encryption.

<br />

[Live Demo](https://bit-shadow.vercel.app) · [View Contract](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67) · [Report Bug](https://github.com/panzauto46-bot/BIT-SHADOW/issues)

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
- [Hackathon Tracks](#-hackathon-tracks)
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

- **Starknet ZK-Rollup** — privacy & low-cost execution
- **Bitcoin Security** — settlement finality & trust
- **Client-Side Encryption** — AES-256-GCM metadata confidentiality
- **Smart Contract Escrow** — fully trustless fund management

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

### Frontend — Vercel

| Property | Value |
|---|---|
| **Live URL** | [bit-shadow.vercel.app](https://bit-shadow.vercel.app) |
| **Framework** | React 19 + Vite 7 + TypeScript |
| **Hosting** | Vercel Edge Network |

---

## ✨ Features

<table>
<tr>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/lock.png" width="36" />
<br /><br />
<b>Confidential Escrow</b>
<br />
<sub>Create encrypted, time-locked escrow agreements with ZK-proof verification</sub>
<br /><br />
</td>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/bridge.png" width="36" />
<br /><br />
<b>BTC ↔ sBTC Bridge</b>
<br />
<sub>Seamless cross-chain bridge between Bitcoin and Starknet L2</sub>
<br /><br />
</td>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/visible.png" width="36" />
<br /><br />
<b>Privacy Shield</b>
<br />
<sub>Client-side AES-256-GCM encryption for transaction metadata</sub>
<br /><br />
</td>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/wallet.png" width="36" />
<br /><br />
<b>Multi-Wallet</b>
<br />
<sub>Connect Argent X, Braavos, or Xverse with one-click disconnect</sub>
<br /><br />
</td>
</tr>
<tr>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/paint-palette.png" width="36" />
<br /><br />
<b>Dynamic Theming</b>
<br />
<sub>Toggle between immersive Shadow Dark and clean Solar Light modes</sub>
<br /><br />
</td>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/dashboard.png" width="36" />
<br /><br />
<b>Real-time Dashboard</b>
<br />
<sub>Portfolio overview with live analytics and escrow tracking</sub>
<br /><br />
</td>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/verified-badge.png" width="36" />
<br /><br />
<b>ZK-Proof Engine</b>
<br />
<sub>STARK proof generation for privacy-preserving verification</sub>
<br /><br />
</td>
<td align="center" width="25%">
<br />
<img src="https://img.icons8.com/fluency/48/name-tag.png" width="36" />
<br /><br />
<b>Starknet ID</b>
<br />
<sub>Human-readable .stark identity integration</sub>
<br /><br />
</td>
</tr>
</table>

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
│   │              React 19 + Vite + Tailwind CSS              ││
│   │         Dynamic Theming · Framer Motion · Lucide         ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │              Wallet Integration Layer                     ││
│   │    Argent X (Starknet) · Braavos · Xverse (Bitcoin)       ││
│   │              + Auto Demo Mode Fallback                    ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │              ShadowEscrow Smart Contract                  ││
│   │                    (Cairo / Starknet)                      ││
│   │  ┌────────────┐ ┌──────────────┐ ┌────────────────────┐  ││
│   │  │  create()   │ │  settle()    │ │  get_escrow_count()│  ││
│   │  └────────────┘ └──────────────┘ └────────────────────┘  ││
│   └──────────────────────┬───────────────────────────────────┘│
│                          │                                    │
│   ┌──────────────────────▼───────────────────────────────────┐│
│   │           Starknet Sepolia L2 (ZK-Rollup)                 ││
│   │              Secured by Ethereum L1                        ││
│   └──────────────────────────────────────────────────────────┘│
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, TypeScript, Vite 7 | UI framework & build tool |
| **Styling** | Tailwind CSS 4, CSS Variables | Dynamic theming (Dark/Light) |
| **Animations** | Framer Motion | Micro-interactions & transitions |
| **Icons** | Lucide React | Consistent icon system |
| **Smart Contract** | Cairo (Starknet) | On-chain escrow logic |
| **Build Tool** | Scarb | Cairo compilation & deployment |
| **Wallets** | Argent X, Braavos, Xverse | Starknet & Bitcoin connectivity |
| **Cryptography** | AES-256-GCM, ZK-SNARKs | Client-side encryption & proofs |
| **Hosting** | Vercel (Frontend), Starknet Sepolia | Production deployment |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- [Argent X](https://www.argent.xyz/) or [Braavos](https://braavos.app/) — Starknet wallet *(optional, Demo Mode available)*
- [Xverse](https://www.xverse.app/) — Bitcoin wallet *(optional)*

### Installation

```bash
# Clone the repository
git clone https://github.com/panzauto46-bot/BIT-SHADOW.git

# Navigate to the project
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

Output will be in the `dist/` directory, ready for deployment.

---

## 📁 Project Structure

```
BIT-SHADOW/
│
├── contracts/                    # Cairo smart contracts
│   ├── src/
│   │   └── lib.cairo             # ShadowEscrow contract source
│   ├── Scarb.toml                # Scarb configuration
│   └── Scarb.lock
│
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── Header.tsx            # Navigation + Theme Toggle + Wallet Connect/Logout
│   │   ├── Sidebar.tsx           # Side navigation
│   │   ├── Dashboard.tsx         # Portfolio overview & analytics
│   │   ├── Bridge.tsx            # BTC ↔ sBTC bridge interface
│   │   ├── CreateEscrow.tsx      # Escrow creation wizard
│   │   ├── EscrowList.tsx        # Escrow management list
│   │   └── PrivacyShield.tsx     # Privacy tools & ZK-proof status
│   │
│   ├── lib/
│   │   ├── wallet-utils.ts       # Wallet connection logic (Starknet + Bitcoin + Demo Mode)
│   │   └── bitcoin-service.ts    # Bitcoin service integration
│   │
│   ├── store/
│   │   └── useStore.ts           # Global state management
│   │
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   │
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles & CSS theme variables
│
├── deployment.json               # Deployed contract metadata
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # You are here!
```

---

## 📜 Smart Contract

### ShadowEscrow Interface

```cairo
#[starknet::interface]
trait IShadowEscrow<TContractState> {
    /// Create a new escrow with specified amount and unlock time
    fn create_escrow(
        ref self: TContractState,
        amount: u256,
        unlock_time: u64
    ) -> u128;

    /// Settle an escrow by releasing funds to the recipient
    fn settle_escrow(
        ref self: TContractState,
        escrow_id: u128,
        recipient: ContractAddress
    );

    /// Get total number of escrows created
    fn get_escrow_count(self: @TContractState) -> u128;

    /// Get the admin address
    fn get_admin(self: @TContractState) -> ContractAddress;
}
```

### Events

| Event | Description |
|-------|-------------|
| `EscrowCreated` | Emitted when a new escrow is created with ID, amount, and creator |
| `EscrowSettled` | Emitted when an escrow is settled with ID and recipient |

### Verify on Explorer

🔍 [View on Starkscan (Sepolia)](https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67)

---

## 🧪 Testing Flow

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Click **Connect Wallet** | Wallet address appears in header with Logout button |
| 2 | Navigate to **Bridge** tab | BTC ↔ sBTC bridge interface loads |
| 3 | Navigate to **Create Escrow** | Escrow creation form with encryption & ZK options |
| 4 | Toggle **Encrypted Metadata** | AES-256-GCM encryption activates |
| 5 | Toggle **ZK-Proof** | ZK proof generation simulation starts |
| 6 | Click **Deploy Shadow Escrow** | Transaction signed and submitted |
| 7 | Check **Dashboard** | New escrow appears in the list |
| 8 | Click **Logout** button | Wallet disconnects, returns to Connect state |
| 9 | Toggle 🌙/☀️ theme | Interface switches between Dark and Light modes |

---

## 🏆 Hackathon Tracks

<table>
<tr>
<td align="center" width="33%">
<br />
<h3>🔐 Privacy Track</h3>
<sub>ZK-powered confidential escrow with client-side AES-256-GCM encryption and STARK proof verification</sub>
<br /><br />
</td>
<td align="center" width="33%">
<br />
<h3>₿ Bitcoin Integration</h3>
<sub>BTC ↔ sBTC bridge with Xverse wallet support and cross-chain settlement</sub>
<br /><br />
</td>
<td align="center" width="33%">
<br />
<h3>💡 DeFi Innovation</h3>
<sub>Trustless escrow service eliminating intermediaries through smart contracts</sub>
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

**Built with 🖤 for the Starknet Hackathon**

<br />

![Starknet](https://img.shields.io/badge/Starknet-4A154B?style=for-the-badge&logo=ethereum&logoColor=white)
![Bitcoin](https://img.shields.io/badge/Bitcoin-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>
