// Import Transactions type definition
import { Transaction } from '../TransactionsService';

export interface IStore<S> {
    /**
     * It returns the store state
     */
    getState(): S

    /**
     * It updates the store state
     * @param partialState The partial state update
     */
    updateState(partialState: Transaction): void

    /**
     * It updates the status of a transaction
     * @param {string} txHash The transaction hash
     */
    updateTransState(txHash: string): void
}

export class BaseStore<S> implements IStore<S> {
    private _state: S;

    constructor(initialState: S) {
        this._state = initialState
    }

    public getState(): S {
        return this._state
    }

    public updateState(partialState: Transaction): void {
        // Update the store. Put the new transaction to the top
        // @ts-ignore
        this._state.transactions.push(partialState);
    }

    public updateTransState(txHash: string): void {
        // Check if the transaction hash already exists
        // @ts-ignore
        this._state.transactions.forEach((transaction) => {
            if (transaction.id === txHash) {
                transaction.processed = true;
            }
        });
    }

}