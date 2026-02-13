use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
struct Escrow {
    id: u128,
    creator: ContractAddress,
    recipient: ContractAddress,
    amount_sbtc: u256,
    unlock_time: u64,
    is_settled: bool,
    encrypted_metadata_cid: felt252,
    required_approvals: u8,
    current_approvals: u8,
}

#[starknet::interface]
trait IShadowEscrow<TContractState> {
    fn create_escrow(ref self: TContractState, recipient: ContractAddress, amount: u256, unlock_time: u64, encrypted_metadata: felt252) -> u128;
    fn approve_escrow(ref self: TContractState, escrow_id: u128, zk_proof: Array<felt252>);
    fn settle_escrow(ref self: TContractState, escrow_id: u128);
    fn get_escrow_details(self: @TContractState, escrow_id: u128) -> Escrow;
    fn mint_sbtc(ref self: TContractState, amount: u256);
}

#[starknet::contract]
mod ShadowEscrow {
    use super::Escrow;
    use starknet::ContractAddress;
    use starknet::get_block_timestamp;
    use starknet::get_caller_address;

    #[storage]
    struct Storage {
        escrows: LegacyMap::<u128, Escrow>,
        escrow_count: u128,
        synthetic_btc_balances: LegacyMap::<ContractAddress, u256>,
        admin: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        EscrowCreated: EscrowCreated,
        EscrowSettled: EscrowSettled,
    }

    #[derive(Drop, starknet::Event)]
    struct EscrowCreated {
        id: u128,
        creator: ContractAddress,
        amount: u256,
        unlock_time: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct EscrowSettled {
        id: u128,
        recipient: ContractAddress,
        amount: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, admin_address: ContractAddress) {
        self.admin.write(admin_address);
        self.escrow_count.write(0);
    }

    #[external(v0)]
    impl ShadowEscrowImpl of super::IShadowEscrow<ContractState> {
        fn create_escrow(
            ref self: ContractState,
            recipient: ContractAddress,
            amount: u256,
            unlock_time: u64,
            encrypted_metadata: felt252
        ) -> u128 {
            let caller = get_caller_address();
            let current_id = self.escrow_count.read() + 1;
            
            let new_escrow = Escrow {
                id: current_id,
                creator: caller,
                recipient,
                amount_sbtc: amount,
                unlock_time,
                is_settled: false,
                encrypted_metadata_cid: encrypted_metadata,
                required_approvals: 2,
                current_approvals: 0,
            };

            self.escrows.write(current_id, new_escrow);
            self.escrow_count.write(current_id);

            self.emit(EscrowCreated {
                id: current_id,
                creator: caller,
                amount,
                unlock_time
            });

            current_id
        }

        fn approve_escrow(ref self: ContractState, escrow_id: u128, zk_proof: Array<felt252>) {
            assert(zk_proof.len() > 0, 'Invalid ZK Proof');

            let escrow = self.escrows.read(escrow_id);
            assert(!escrow.is_settled, 'Escrow already settled');
            
            let new_approvals = escrow.current_approvals + 1;
            
            let updated_escrow = Escrow {
                id: escrow.id,
                creator: escrow.creator,
                recipient: escrow.recipient,
                amount_sbtc: escrow.amount_sbtc,
                unlock_time: escrow.unlock_time,
                is_settled: escrow.is_settled,
                encrypted_metadata_cid: escrow.encrypted_metadata_cid,
                required_approvals: escrow.required_approvals,
                current_approvals: new_approvals,
            };
            
            self.escrows.write(escrow_id, updated_escrow);
        }

        fn settle_escrow(ref self: ContractState, escrow_id: u128) {
            let escrow = self.escrows.read(escrow_id);
            assert(!escrow.is_settled, 'Escrow already settled');
            assert(get_block_timestamp() >= escrow.unlock_time, 'Time-lock active');
            assert(escrow.current_approvals >= escrow.required_approvals, 'Approvals unmet');

             let updated_escrow = Escrow {
                id: escrow.id,
                creator: escrow.creator,
                recipient: escrow.recipient,
                amount_sbtc: escrow.amount_sbtc,
                unlock_time: escrow.unlock_time,
                is_settled: true,
                encrypted_metadata_cid: escrow.encrypted_metadata_cid,
                required_approvals: escrow.required_approvals,
                current_approvals: escrow.current_approvals,
            };
            self.escrows.write(escrow_id, updated_escrow); 

            self.emit(EscrowSettled {
                id: escrow_id,
                recipient: escrow.recipient,
                amount: escrow.amount_sbtc,
            });
        }

        fn get_escrow_details(self: @ContractState, escrow_id: u128) -> Escrow {
            self.escrows.read(escrow_id)
        }
        
        fn mint_sbtc(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            let current = self.synthetic_btc_balances.read(caller);
            self.synthetic_btc_balances.write(caller, current + amount);
        }
    }
}
