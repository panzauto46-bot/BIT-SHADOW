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

// Helper: Add timeout to any promise so it never hangs forever
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
    const timeout = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
    return Promise.race([promise, timeout]);
}

// Starknet Connection Logic
export const connectStarknet = async (): Promise<string | null> => {
    try {
        const starknet = window.starknet || window.starknet_argentX || window.starknet_braavos;

        if (!starknet) {
            return null;
        }

        await starknet.enable();

        if (starknet.selectedAddress) {
            return starknet.selectedAddress;
        }

        if (starknet.account && starknet.account.address) {
            return starknet.account.address;
        }
    } catch (error) {
        console.warn("Starknet connect:", error);
    }
    return null;
};

// Bitcoin (Xverse) Connection Logic
const connectBitcoinRaw = (): Promise<string | null> => {
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
            resolve(null);
        }
    });
};

// Wrapped with 3-second timeout so it never hangs
export const connectBitcoin = (): Promise<string | null> => {
    return withTimeout(connectBitcoinRaw(), 3000, null);
};
