import React, { useContext, useRef, useState } from 'react';
// For the  and account hook
import useEtherProvider from '../hooks/useEtherProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../../context/background/AppContext';

export default function SendDialog(props: any) {
  // For getting the amount and adddress
  const amount = useRef(null);
  const address = useRef(null);
  // Get the send transaction function
  const { sendTransaction } = useEtherProvider();
  const state = useContext(AppContext);
  // To send ethers
  const sendEthers = () => {
    // First let's check that the user is not sending to himself
    if (!address || !amount) {
      alert('Please fill the form');
      return;
    }
    // @ts-ignore
    else if (!address.current.value || address.current.value.length < 42) {
      alert('Input a valid address');
      return;
    }
    // @ts-ignore
    else if (address.current.value === state.state.address) {
      alert('You cannot send ethers to yourself');
      return;
      // @ts-ignore
    } else if (amount && (!amount.current.value || amount.current.value <= 0)) {
      alert('Please send a positive value of ether');
      return;
    }
    // CLose the dialog
    props.handleClose();
    // @ts-ignore
    sendTransaction(address.current.value, '' + amount.current.value);
  }
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send Ethers</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={address}
            autoFocus
            id="address"
            label="Address"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            inputRef={amount}
            id="amount"
            label="Amount"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose} color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={state.state.balance > 0 ? false : true}
            onClick={sendEthers}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
