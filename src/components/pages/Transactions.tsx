import React, { useContext } from 'react';
// The transaction context objecy
import { AppContext } from '../../context/background/AppContext';
// Layout 
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MoneyIcon from '@material-ui/icons/Money';

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
    border: '0px solid black',
    overflow: 'auto',
    height: 'inherit',
    paddingTop: 0
  },
  header: {
    fontSize: '1rem',
    fontWeight: 'bolder',
    fontFamily: 'inherit'
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    width: 'inherit'
  },
}));


export default function Transactions() {
  // Set up the classes
  const classes = useStyles();
  // Get our transaction context
  const transactions = useContext(AppContext);
  return (
    <Paper className={classes.paper}>
      <ListSubheader>
        <Typography className={classes.header} >
          Your Transactions
          </Typography>
      </ListSubheader>
      <Grid container spacing={2}>
        <Grid item style={{ width: 'inherit' }}>
          <div className={classes.list}>
            <List>
              {transactions.state.transactions.length > 0 ? transactions.state.transactions.map((transaction, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <MoneyIcon color={transaction.processed ? "primary" : "secondary"} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={transaction.date.toLocaleDateString() + ' ' + transaction.date.getHours() + ':' + transaction.date.getMinutes()}
                  >
                    <span style={{ fontWeight: 'bolder' }}>Sent Ethers</span>
                  </ListItemText>
                  <ListItemText
                    secondary={'$ ' + transaction.value * 20}
                  >
                    <span style={{ fontWeight: 'bolder' }}>{transaction.value + ' ETH'}</span>
                  </ListItemText>
                </ListItem>,
              )
                :
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <MoneyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'No transaction'}
                    secondary={'No transactio yet'}
                  />
                </ListItem>
              }
            </List>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
