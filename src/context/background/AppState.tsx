import React, { useReducer } from 'react';
import { AppContext, IAppState, initAppState } from './AppContext';
import AppReducer from './AppReducer';
import Actions from '../contextActions';
import { Transaction, TransactionsService } from '../../services/TransactionsService';

// Instantiate transactionservice class
const transactionsService = new TransactionsService(initAppState)

const AppState = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initAppState);

  // Set app state
  const setState = (newState: Partial<IAppState>) => {
    dispatch({
      type: Actions.SET_STATE,
      payload: newState,
    });
  };

  // TODO: Complete the addTransaction method
  const addTransaction = (transaction: Transaction | undefined, txHash: string | undefined) => {
    // Call the add transaction method of the service class then the state to be the new state of the base store
    // First check if we are to update a transaction status instead
    try {

      if (txHash) {
        // Update a transaction state instead
        transactionsService.updateTranState(txHash).then(() => {
          // Get the current store state and context transactions to that value
          let transactions = Object.assign([], transactionsService.getState().transactions
          );
          // Reverse the array to put the latest transaction to the front
          // @ts-ignore
          transactions.reverse();
          // Set the new state
          dispatch({ type: Actions.SET_TRANSACTIONS, payload: transactions });
        })
      }
      else if (transaction) {
        transactionsService.addTransaction(transaction).then(() => {
          // Get the current store state and context transactions to that value
          let transactions = Object.assign([], transactionsService.getState().transactions
          );
          // Reverse the array to put the latest transaction to the front
          // @ts-ignore
          transactions.reverse();
          // Set the new state
          dispatch({ type: Actions.SET_TRANSACTIONS, payload: transactions });
        })
      }
    } catch (error) {
      alert('Error Updating state');
    }
  }

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        addTransaction,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
