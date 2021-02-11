import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
// Import the Account Header
import AccountHeader from './AccountHeader';
// Import the balance comp
import Balance from './Balance';
// Import the list of our transactions
import Transactions from './Transactions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
    height: '100vh'
  },
}));

export default function MainPage() {
  // Set up the classes
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AccountHeader />
      <Balance />
      <Transactions />
    </div>
  );
}
