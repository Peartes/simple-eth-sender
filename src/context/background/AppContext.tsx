import { createContext } from 'react';
import { Transaction } from '../../services/TransactionsService';

type ContextType = {
  state: IAppState,
  addTransaction: (transaction: Transaction | undefined, txHash: string | undefined) => void
  setState: (state: IAppState) => void
}

export interface IAppState {
  transactions: Array<Transaction>;
  balance: number,
  address: string,
  pubk: string,
}

export const initAppState: IAppState = {
  transactions: [],
  balance: 0,
  address: "",
  pubk: "",
};

export const AppContext: React.Context<ContextType> = createContext<ContextType>({
  state: initAppState,
  addTransaction: () => { },
  setState: () => { }
});
