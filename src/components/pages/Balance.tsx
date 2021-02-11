import React, { useState, useContext } from 'react';
// Layout 
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
// Import the send trans dialog box
import SendDialog from './SendDialog';
import { AppContext } from '../../context/background/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  sendDiv: {
    backgroundColor: '#eaf3fc'
  },
  ethBalance: {
    fontSize: '2rem',
    fontWeight: 'bolder',
    fontFamily: 'inherit'
  },
}));

export default function Balance() {
  // Set up the classes
  const classes = useStyles();
  // To open and close the send dialog box
  const [open, setOpen] = useState(false);
  // To open the dialog box
  const openDialog = () => {
    setOpen(true);
  }
  // To close the dialog
  const closeDiaglog = () => {
    setOpen(false);
  }
  // Get the clean account balance
  const state = useContext(AppContext);
  return (
    <Paper className={classes.paper + ' ' + classes.sendDiv}>
      <SendDialog open={open} handleClose={closeDiaglog} />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography className={classes.ethBalance}>{state.state.balance} ETH</Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom>$ {state.state.balance * 20} USD</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Send />}
            onClick={openDialog}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
