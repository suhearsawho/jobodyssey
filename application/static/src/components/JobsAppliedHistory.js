import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppliedJobs from './AppliedJobs';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
  }
});

class JobsAppliedHistory extends Component {
  
  render() {
    const { classes, handleToken } = this.props;

    return (
        <div className={ classes.body }>
          <AppliedJobs handleToken={ handleToken }/>
        </div>
    )
  }
}

export default withStyles(styles)(JobsAppliedHistory);
