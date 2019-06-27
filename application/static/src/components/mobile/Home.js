import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SummaryTable from './SummaryTable';
import AddJob from './AddJob';
import Expansion from './Expansion';

const styles = theme => ({
  root: {
    marginTop: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  button: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '1rem',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SummaryTable />
        <Expansion />
        <Fab color="secondary" aria-label="Add" className={classes.button}>
          <AddIcon />
        </Fab>
      </div>
    );
  }

}

export default withStyles(styles)(Home);
