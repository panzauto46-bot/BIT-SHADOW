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
        // Try standard injection first
        const starknet = window.starknet || window.starknet_argentX || window.starknet_braavos;

        if (!starknet) {
            console.warn("Starknet wallet not found");
            return null;
        }

        // enable() returns array of addresses in standard implementations
        const result = await starknet.enable();

        if (result && Array.isArray(result) && result.length > 0) {
            return result[0];
        }

        // Fallback for older wallets or different implementations
        if (starknet.isConnected && starknet.selectedAddress) {
            return starknet.selectedAddress;
        }

        if (starknet.account && starknet.account.address) {
            return starknet.account.address;
        }

    } catch (error) {
        console.error("Starknet connection failed:", error);
    }
    return null;
};

// Bitcoin (Xverse) Connection Logic
export const connectBitcoin = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
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
                    console.warn("Bitcoin connection canceled");
                    resolve(null);
                },
            };

            getAddress(getAddressOptions);
        } catch (error) {
            console.error("Bitcoin connection error:", error);
            resolve(null);
        }
    });
};
