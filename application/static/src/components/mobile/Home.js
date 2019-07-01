import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
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
  addJob: {
    position: 'fixed',
    margin: '1rem',
    bottom: 0,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addJobScreen: false,
    };
    this.handleScreen = this.handleScreen.bind(this);
  }

  handleScreen() {
    this.setState((prevState) => ({
      addJobScreen: !prevState.addJobScreen,
    }));
  }

  componentDidMount() {

  }

  /* Todo : Add Zoom Up effect when the user clicks the Fab Button */
  render() {
    const { classes } = this.props;
    const { addJobScreen } = this.state;
  
    return (
      <div className={classes.root}>
        <SummaryTable />
        <Expansion />
        <Fab
          color="secondary"
          aria-label="Add"
          className={classes.button}
          onClick={ this.handleScreen }
        >
          <AddIcon />
        </Fab>
        <Slide direction="up" in={addJobScreen} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.addJob}>
            <AddJob handleScreen={ this.handleScreen }/>
          </Paper>
        </Slide>
      </div>
    );
  }

}

export default withStyles(styles)(Home);
