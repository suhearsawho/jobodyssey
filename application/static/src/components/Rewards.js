import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import JobSummary from './JobSummary';
import RewardSummary from './RewardSummary';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    top: '10%',
    [theme.breakpoints.up('sm')]: {
      top: '8%',
    },
    padding: '2%',
    maxHeight: '80%',
  },
  left: {
    width: '40%',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  card: {
    maxWidth: '90%',
  },
  profilePicture: {
    padding: '5%',
    borderRadius: '30px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rewards: {
    marginBottom: '4%',
  },
  rightTitle: {
    marginBottom: '1%',
  }
});

class UserHomepage extends Component {
  
  render() {
    const { userData, classes } = this.props;

    return (
      <div className={ classes.body }>
      </div>
    )
  }
}

export default withStyles(styles)(UserHomepage);
