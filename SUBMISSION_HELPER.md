# Hackathon Submission Cheat Sheet — Re{define} Hackathon 2026

## 🚀 Project Name
**BIT-SHADOW**

## 💡 Tagline
Confidential Bitcoin Escrow on Starknet — Privacy Meets Bitcoin DeFi

## 📝 Project Description (Short — 1 liner)
BIT-SHADOW is a privacy-preserving escrow protocol that bridges Bitcoin liquidity to Starknet, enabling trustless, encrypted, and time-locked escrow agreements powered by zero-knowledge proofs.

## 📖 Project Description (500 words max — for Submission)

Bitcoin is the world's most trusted asset — but its radical transparency makes it unsuitable for confidential commercial transactions. Traditional escrow services rely on centralized intermediaries, expose all transaction details publicly, and charge excessive fees. This creates a fundamental tension: you can have trust, or you can have privacy, but not both.

**BIT-SHADOW** resolves this tension by combining Bitcoin's security with Starknet's zero-knowledge infrastructure.

### How It Works

**1. The Bridge** — Users lock BTC to mint Synthetic BTC (sBTC) on Starknet L2 via the Shadow Bridge. The bridge uses Xverse wallet for native Bitcoin transactions and provides 3-confirmation security before minting.

**2. The Smart Contract** — Our `ShadowEscrow` contract, written in Cairo and deployed on Starknet Sepolia, handles the entire escrow lifecycle: creation with encrypted metadata, multi-signature approvals, time-lock enforcement, and settlement. Every escrow records an encrypted metadata pointer (AES-256-GCM) on-chain for confidentiality.

**3. ZK-Privacy** — Starknet's STARK-based ZK-Rollup provides inherent privacy benefits. Our protocol generates zero-knowledge proofs to verify escrow conditions (time-lock expiry, approval thresholds, fund availability) are met — without revealing the underlying data to anyone except the parties involved.

**4. Client-Side Encryption** — All transaction metadata (titles, descriptions, contract terms) is encrypted with AES-256-GCM directly in the user's browser before touching the blockchain. Only parties holding the decryption key can read the details — no server ever sees plaintext data.

### Technical Highlights

- **Cairo Smart Contract** deployed on Starknet Sepolia with `create_escrow`, `approve_escrow`, `settle_escrow`, and `mint_sbtc` functions
- **Dual Wallet Integration**: Argent X / Braavos (Starknet) + Xverse (Bitcoin) with real transaction signing
- **Real Bitcoin Integration**: Uses sats-connect SDK for actual BTC transfers through Xverse wallet
- **On-chain Events**: `EscrowCreated` and `EscrowSettled` events for full transparency of operations (not data)
- **Interactive Privacy Visualization**: Real-time ZK-proof animation, encryption toggle demo, and proof verification tool
- **Dynamic Theming**: Shadow Dark and Solar Light modes with CSS variable-driven design system

### Why This Matters

Privacy is the institutional priority for 2026. As Bitcoin DeFi grows, there's an urgent need for confidential financial instruments that don't compromise on security or decentralization. BIT-SHADOW proves that privacy and Bitcoin can coexist on Starknet — opening the door for B2B settlements, private OTC trades, confidential freelance payments, and DAO treasury management.

## 🛠 Tech Stack
- **Frontend**: React 19, Vite 7, TypeScript, Tailwind CSS 4, Framer Motion
- **Smart Contracts**: Cairo (Starknet Sepolia)
- **Wallets**: Argent X, Braavos (Starknet) + Xverse (Bitcoin via sats-connect)
- **Cryptography**: AES-256-GCM (Client-Side Metadata Encryption), ZK-STARKs (Privacy Proofs)
- **Hosting**: Vercel (Frontend), Starknet Sepolia (Smart Contract)

## 🚧 Challenges We Ran Into
Integrating two distinct wallet standards — Starknet.js for Argent X/Braavos and sats-connect for Xverse — into a single, unified UI was a major hurdle. Managing the asynchronous state between Bitcoin mainnet confirmations and Starknet L2 updates required careful event-driven architecture. Additionally, implementing real client-side AES-256-GCM encryption that works seamlessly in the browser while maintaining a smooth UX was technically challenging.

## 🔮 What's Next
- Mainnet deployment of the ShadowEscrow contract  
- Decentralized "Judge" network for disputed escrows  
- Full Starknet ID integration for human-readable identities  
- IPFS/Arweave storage for encrypted metadata blobs  
- OP_CAT-based Bitcoin script integration for trust-minimized bridging

## 🏆 Prize Tracks
- **🔒 Privacy Track**: ZK-powered confidential escrow with client-side AES-256-GCM encryption and STARK proof verification
- **₿ Bitcoin Track**: BTC ↔ sBTC bridge with Xverse wallet support and cross-chain settlement via real Bitcoin transactions
- **🚀 Wildcard Track**: Innovative escrow-as-a-service platform on Starknet

## 🔗 Links
- **Live Demo**: https://bit-shadow.vercel.app
- **GitHub**: https://github.com/panzauto46-bot/BIT-SHADOW
- **Smart Contract**: https://sepolia.starkscan.co/contract/0x47ac31dfc225affc748b7da53e09521b3910818ee7590a4ab20436c5650ef67
- **Starknet Wallet**: 0x5157f4f7a2425d013c329bc68ef9ec948925f756445050eff6e18211f19c75b
