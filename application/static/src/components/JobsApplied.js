import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import JobsTab from './JobsTab';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
  },
});

class JobsApplied extends Component {
  
  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.body }>
        <JobsTab />
      </div>
    )
  }
}

export default withStyles(styles)(JobsApplied);
