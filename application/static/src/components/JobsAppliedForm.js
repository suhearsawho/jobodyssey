import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import JobsTab from './JobsTab';
import AppliedForm from './AppliedForm';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
  },
});

class JobsAppliedForm extends Component {
  
  render() {
    const { classes } = this.props;

    return (
        <div className={ classes.body }>
          <AppliedForm />
        </div>
    )
  }
}

export default withStyles(styles)(JobsAppliedForm);
