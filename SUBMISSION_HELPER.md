# Hackathon Submission Cheat Sheet

## 🚀 Project Name
BIT-SHADOW Protocol

## 💡 Tagline
Confidential Bitcoin Escrow on Starknet: Bringing Privacy to BTC.

## 📝 Project Description (Short)
BIT-SHADOW is a privacy-preserving escrow protocol that bridges Bitcoin liquidity to Starknet. By leveraging ZK-Rollups, we enable users to create trustless, encrypted, and time-locked escrow agreements for Bitcoin transactions without revealing sensitive details (amount, sender, receiver) to the public ledger.

## 📖 Project Description (Long / The "Story")
Bitcoin is the most secure asset, but its transparency makes it unsuitable for confidential commercial transactions. Existing solutions either sacrifice security for privacy or rely on centralized intermediaries.

**BIT-SHADOW** solves this by using Starknet as a privacy layer for Bitcoin. 
1. **The Bridge**: Users lock BTC to mint Synthetic BTC (sBTC) on Starknet L2.
2. **The Smart Contract**: Our Cairo contracts handle complex escrow logic—time-locks, multi-sig approvals, and dispute resolution—while keeping the data encrypted.
3. **ZK-Privacy**: We simulate Zero-Knowledge proofs to verify transaction conditions are met without revealing the underlying data.
4. **Client-Side Encryption**: All transaction metadata (contract terms, descriptions) is encrypted in the user's browser using AES-256-GCM before it ever touches the blockchain, ensuring total confidentiality.

We built this because we believe privacy is a fundamental right for financial autonomy, especially for business-to-business (B2B) Bitcoin settlements.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Shadcn/ui
- **Smart Contracts**: Cairo (Starknet), Bitcoin Script
- **Wallets Integrated**: Argent X (Starknet), Xverse (Bitcoin Ordinals/Payment)
- **Cryptography**: AES-GCM (Metadata Encryption), ZK-SNARKs (Proof Logic)

## 🚧 Challenges We Ran Into
Integrating two distinct wallet standards (Starknet.js for Argent X and sats-connect for Xverse) into a single unified UI was a major hurdle. Managing the asynchronous state between Bitcoin mainnet confirmations and Starknet L2 updates required a robust event-listening architecture.

## 🔮 What's Next
- Mainnet deployment of the Starknet Bridge contract.
- Implementation of a decentralized "Judge" network for disputed escrows.
- Integration with Starknet ID for full identity abstraction.

## 🔗 Links
- **Demo URL**: [Insert your Vercel Link Here]
- **GitHub**: https://github.com/panzauto46-bot/BIT-SHADOW
