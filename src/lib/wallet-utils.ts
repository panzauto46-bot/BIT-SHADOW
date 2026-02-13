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

// Starknet Connection Logic (Simplified & Permissive)
export const connectStarknet = async (): Promise<string | null> => {
    try {
        // Broad search for any Starknet provider
        const starknet = window.starknet || window.starknet_argentX || window.starknet_braavos;

        if (!starknet) {
            return null;
        }

        // Try standard enable (compatible with both old and new wallets)
        // We assume this triggers the popup
        await starknet.enable();

        // Check all possible locations for the address
        if (starknet.selectedAddress) {
            return starknet.selectedAddress;
        }

        if (starknet.account && starknet.account.address) {
            return starknet.account.address;
        }

        // If enable() returned the address directly (some older versions)
        // We can't easily access result here with 'await' inside try, 
        // but selectedAddress usually gets populated.

        // Last resort force check
        if (starknet.isConnected) {
            return starknet.selectedAddress;
        }

    } catch (error) {
        console.error("Starknet connect warning:", error);
    }
    return null;
};

// Bitcoin (Xverse) Connection Logic
export const connectBitcoin = async (): Promise<string | null> => {
    return new Promise((resolve) => {
        try {
            const getAddressOptions = {
                payload: {
                    purposes: [AddressPurpose.Payment],
                    message: 'Connect to BIT-SHADOW Protocol',
                    network: {
                        type: BitcoinNetworkType.Mainnet
                    },
                },
                onFinish: (response: any) => {
                    const paymentAddress = response.addresses.find((addr: any) => addr.purpose === AddressPurpose.Payment);
                    resolve(paymentAddress?.address || null);
                },
                onCancel: () => {
                    resolve(null);
                },
            };

            getAddress(getAddressOptions);
        } catch (error) {
            // Silently fail if Xverse not installed (don't break flow)
            resolve(null);
        }
    });
};
