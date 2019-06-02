import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    background: 'linear-gradient(to right bottom, #C6FFDD, #FBD786, #f7797d)',
    height: "100%",
    position: "relative",
    display: "flex"
  }
});

class Main extends Component {
  
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={ classes.main }>
          <p>Testing</p>
        </div>
      </React.Fragment> 
    )
  }
}

export default withStyles(styles)(Main);
