import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import JobsTab from './JobsTab';
import AppliedForm from './AppliedForm';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    textAlign: 'center',
  },
});

class JobsAppliedForm extends Component {
  
  render() {
    const { classes, handleToken } = this.props;

    return (
        <div className={ classes.body }>
          <Typography gutterBottom variant="h5" component="h2" className={ classes.title }>
            Applied to a Job? Enter The Information Here!
          </Typography>
          <AppliedForm handleToken={ handleToken }/>
        </div>
    )
  }
}

export default withStyles(styles)(JobsAppliedForm);
