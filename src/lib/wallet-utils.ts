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
        const starknet = window.starknet || window.starknet_argentX || window.starknet_braavos;

        if (!starknet) {
            console.warn("Starknet wallet not found");
            return null;
        }

        await starknet.enable();

        // Check connection status
        if (starknet.isConnected) {
            return starknet.selectedAddress;
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
