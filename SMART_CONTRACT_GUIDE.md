# BIT-SHADOW Protocol: Smart Contract Deployment Guide

## 📌 Prerequisites

Before deploying the smart contracts, ensure you have the following tools installed:

1.  **Scarb**: The Cairo package manager.
    *   Installation: `curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh`
    *   Verify: `scarb --version`
2.  **Starkli**: CLI tool for Starknet.
    *   Installation: `curl https://get.starkli.sh | sh`
    *   Verify: `starkli --version`
3.  **Account**: A Starknet account (Braavos/Argent) with some Sepolia ETH for gas.

---

## 🏗️ 1. Compiling the Contract

Navigate to the `contracts/` directory and build the project.

```bash
cd contracts
scarb build
```

This will generate the Sierra file (compiled contract) in `contracts/target/dev/bit_shadow_contracts_ShadowEscrow.contract_class.json`.

---

## 🚀 2. Declaring the Contract

You need to declare the contract class on the Starknet network.

```bash
# Export your private key and account address (or use a keystore)
export STARKNET_ACCOUNT=~/.starkli-wallets/deployer_account.json
export STARKNET_KEYSTORE=~/.starkli-wallets/deployer_keystore.json

# Declare
starkli declare target/dev/bit_shadow_contracts_ShadowEscrow.contract_class.json --network sepolia
```

**Copy the `Class Hash` returned by this command.** You will need it for deployment.

---

## 🟢 3. Deploying the Contract

Deploy an instance of the contract using the Class Hash.

```bash
# Replace <CLASS_HASH> with the hash from step 2
# Replace <ADMIN_ADDRESS> with your wallet address (as the constructor argument)

starkli deploy <CLASS_HASH> <ADMIN_ADDRESS> --network sepolia
```

**Success!** The terminal will output the **Contract Address**.

---

## 🔗 4. Verification

1.  Go to [Starkscan Sepolia Explorer](https://sepolia.starkscan.co/).
2.  Paste your new **Contract Address**.
3.  Verify the customized `ShadowEscrow` logic is active.

---

## 💻 5. Update Frontend

Once deployed, update the frontend configuration to point to your new contract.

1.  Open `src/utils/constants.ts` (or create if missing).
2.  Add:
    ```typescript
    export const SHADOW_ESCROW_CONTRACT_ADDRESS = "YOUR_NEW_CONTRACT_ADDRESS";
    ```
3.  Update `Bridge.tsx` and `CreateEscrow.tsx` to use this address for function calls.
