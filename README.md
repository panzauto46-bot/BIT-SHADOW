# BIT-SHADOW Protocol 🌑

> **Confidential Bitcoin Escrow on Starknet**  
> *Privacy Track & Bitcoin Hybrid Solution*

![Status](https://img.shields.io/badge/Status-Hackathon_Ready-success)
![Starknet](https://img.shields.io/badge/Built_on-Starknet-blue)
![Bitcoin](https://img.shields.io/badge/Secured_by-Bitcoin-orange)

## 📌 Overview
BIT-SHADOW is a next-generation privacy protocol that bridges Bitcoin liquidity to Starknet for **confidential, trustless escrow services**. By leveraging Starknet's ZK-Rollup capabilities and Bitcoin's security, we enable users to create encrypted, time-locked, and multi-sig escrow agreements without revealing sensitive transaction details to the public ledger.

## 🚀 Key Modules
This project is architected into 4 core modules:

### 1. The Shadow Engine (Smart Contracts) `contracts/Escrow.cairo`
- **Encrypted Vault**: Securely locks Synthetic BTC (sBTC) on Starknet.
- **Time-Lock Logic**: Enforces temporal conditions on fund release.
- **ZK-Proof Verification**: Validates transaction conditions off-chain, verifying on-chain without data leakage.

### 2. The Bridge (Bitcoin Integration)
- **Xverse & Argent X Support**: Seamless dual-wallet connection.
- **Automatic Settlement**: Watches for Bitcoin finality and triggers Starknet state updates.
- **Synthetic Minting**: 1:1 Pegged sBTC representation on L2.

### 3. The Shadow UI (Frontend)
- **Futuristic Dark Mode**: "Shadow Purple" & "Bitcoin Orange" aesthetic using **Shadcn/UI** & **Tailwind**.
- **Confidential Transaction Builder**: Encrypts metadata (AES-256-GCM) client-side before submission.
- **Real-time Tracker**: Monitors ZK-proof generation and bridge confirmations.

### 4. Security & Identity
- **Starknet ID**: Integration for human-readable identities (.stark).
- **Client-Side Encryption**: Metadata is encrypted in the browser, ensuring only involved parties can read the terms.

## 🛠 Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion
- **Blockchain**: Starknet (Cairo), Bitcoin (Script), sBTC
- **Wallets**: Argent X (Starknet), Xverse (Bitcoin/Ordinals)
- **Cryptography**: AES-GCM, ZK-SNARKs (Mocked for demo availability)

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/panzauto46-bot/BIT-SHADOW.git
   cd BIT-SHADOW
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Access the dApp at `http://localhost:5173`.

## 🧪 Testing the Flow
1. **Connect Wallets**: Click "Connect Wallet" to link both Argent X and Xverse.
2. **Bridge Assets**: Go to the "Bridge" tab and swap BTC for sBTC (Simulated).
3. **Create Escrow**: Navigate to "Create Escrow", fill in the details.
   - Toggle **"Encrypted Metadata"** to see client-side encryption in action.
   - Toggle **"ZK-Proof"** to simulate proof generation.
4. **Deploy**: Click "Deploy Shadow Escrow" to sign the transaction.

## 📜 License
MIT
