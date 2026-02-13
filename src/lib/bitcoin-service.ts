// Interface for Mempool.space API
const MEMPOOL_API_BASE = 'https://mempool.space/api'; // Or use signet/testnet: https://mempool.space/testnet/api/

export interface BitcoinTransaction {
    txid: string;
    version: number;
    locktime: number;
    vin: any[];
    vout: any[];
    size: number;
    weight: number;
    fee: number;
    status: {
        confirmed: boolean;
        block_height: number;
        block_hash: string;
        block_time: number;
    };
}

export interface AddressStats {
    address: string;
    chain_stats: {
        funded_txo_count: number;
        funded_txo_sum: number;
        spent_txo_count: number;
        spent_txo_sum: number;
        tx_count: number;
    };
    mempool_stats: {
        funded_txo_count: number;
        funded_txo_sum: number;
        spent_txo_count: number;
        spent_txo_sum: number;
        tx_count: number;
    };
}

export class BitcoinService {
    private apiBase: string;

    constructor(network: 'mainnet' | 'testnet' | 'signet' = 'mainnet') {
        this.apiBase = network === 'mainnet'
            ? 'https://mempool.space/api'
            : `https://mempool.space/${network}/api`;
    }

    // Get address balance and stats
    async getAddressStats(address: string): Promise<AddressStats | null> {
        try {
            const response = await fetch(`${this.apiBase}/address/${address}`);
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.error('Error fetching address stats:', error);
            return null;
        }
    }

    // Get transactions for an address
    async getAddressTransactions(address: string): Promise<BitcoinTransaction[]> {
        try {
            const response = await fetch(`${this.apiBase}/address/${address}/txs`);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error('Error fetching address txs:', error);
            return [];
        }
    }

    // Get current recommended fees
    async getRecommendedFees(): Promise<any> {
        try {
            const response = await fetch(`${this.apiBase}/v1/fees/recommended`);
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.error('Error fetching fees:', error);
            return null;
        }
    }

    // Calculate balance in BTC from stats
    calculateBalance(stats: AddressStats): number {
        const funded = stats.chain_stats.funded_txo_sum + stats.mempool_stats.funded_txo_sum;
        const spent = stats.chain_stats.spent_txo_sum + stats.mempool_stats.spent_txo_sum;
        return (funded - spent) / 100_000_000; // Convert satoshis to BTC
    }
}

export const bitcoinService = new BitcoinService('mainnet'); // Default to mainnet for demo
