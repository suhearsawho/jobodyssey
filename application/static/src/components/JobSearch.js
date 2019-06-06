import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  test: {
    position: 'relative',
    top: '16%',
  }
});

class JobSearch extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={ classes.test }>Hi</div> 
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(JobSearch);
