import { getAddress, AddressPurpose, BitcoinNetworkType } from 'sats-connect';

declare global {
    interface Window {
        starknet?: any;
        starknet_argentX?: any;
        starknet_braavos?: any;
    }
}

export interface WalletState {
    starknetAddress: string | null;
    bitcoinAddress: string | null;
    isConnected: boolean;
}

// Starknet Connection Logic
export const connectStarknet = async (): Promise<string | null> => {
    try {
        console.log("Starting Starknet connection...");

        // Prioritize Argent X or Braavos specifically if generic is missing/overridden
        let starknet = window.starknet;

        if (!starknet) {
            if (window.starknet_argentX) {
                console.log("Found Argent X explicitly");
                starknet = window.starknet_argentX;
            } else if (window.starknet_braavos) {
                console.log("Found Braavos explicitly");
                starknet = window.starknet_braavos;
            }
        }

        if (!starknet) {
            console.warn("Starknet wallet object (window.starknet) not found");
            return null;
        }

        console.log("Attempting to enable Starknet wallet...");

        // standard enable (some wallets return array of addresses directly)
        const result = await starknet.enable();
        console.log("Starknet enable result:", result);

        // Scenario 1: enable() returned array of addresses (Standard)
        if (result && Array.isArray(result) && result.length > 0) {
            return result[0];
        }

        // Scenario 2: Legacy selectedAddress property
        if (starknet.selectedAddress) {
            return starknet.selectedAddress;
        }

        // Scenario 3: Account object property
        if (starknet.account && starknet.account.address) {
            return starknet.account.address;
        }

        // Scenario 4: enable() returned empty array? Try requesting accounts explicitly?
        // EIP-1193 style
        if (starknet.request) {
            const accounts = await starknet.request({ type: 'starknet_requestAccounts' });
            if (accounts && accounts.length > 0) return accounts[0];
        }

    } catch (error) {
        console.error("Starknet connection failed:", error);
    }
    return null;
};

// Bitcoin (Xverse) Connection Logic
export const connectBitcoin = async (): Promise<string | null> => {
    return new Promise((resolve) => {
        try {
            console.log("Starting Bitcoin (Xverse) connection...");
            const getAddressOptions = {
                payload: {
                    purposes: [AddressPurpose.Payment],
                    message: 'Connect to BIT-SHADOW Protocol',
                    network: {
                        type: BitcoinNetworkType.Mainnet
                    },
                },
                onFinish: (response: any) => {
                    console.log("Bitcoin connected:", response);
                    const paymentAddress = response.addresses.find((addr: any) => addr.purpose === AddressPurpose.Payment);
                    resolve(paymentAddress?.address || null);
                },
                onCancel: () => {
                    console.warn("Bitcoin connection canceled by user");
                    resolve(null);
                },
            };

            getAddress(getAddressOptions);
        } catch (error) {
            console.error("Bitcoin connection error (Xverse not installed?):", error);
            resolve(null);
        }
    });
};
