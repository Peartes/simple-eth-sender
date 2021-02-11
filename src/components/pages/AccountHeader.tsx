import React, { useContext } from 'react';
// Layout 
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// For the  and account hook
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
    boxShadow: '0 0 0 0'
  },
  account: {
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'inherit'
  },
}));

export default function AccountHeader() {
  // Set up the classes
  const classes = useStyles();
  const state = useContext(AppContext);
  return (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>A</Avatar>
        </Grid>
        <Grid item>
          <Typography className={classes.account}>
            Account
                </Typography>
          <Grid item xs zeroMinWidth>
            <Typography color="textSecondary" gutterBottom>{state.state.pubk}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
