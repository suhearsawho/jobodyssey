import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment'; 
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  nonList: {
    position: 'relative',
    top: '16%',
  },
  list: {
    position: 'relative',
    top: '20%',
    maxWidth: 700,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  listSection: {
    backgroundColor: 'inherit',
    padding: '5'
  }
});

class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      job_listings: []
      }
  }

  // TODO: Either add a button which will change this api call
  // or make it a separate page to retrieve the list. If former
  // need to make it so theres a way to update the list?
  componentDidMount() {
    //fetch("https://jobs.github.com/positions.json?description=python&full_time=true&location=sf")
    // TODO: THIS LOGIC SHOULD BE CHANGED WHEN API UPDATED?
    let ipAddress = window.location.hostname;
    let url;
    if (ipAddress === '127.0.0.1')
    	url = 'http://' + ipAddress + ':8000/api/job_search';
    else
	    url = 'http://' + ipAddress + '/api/job_search';
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
	        this.setState({
	          isLoaded: true,
            items: result.items
	        });
	      },
	      (error) => {
          console.log(res)
          this.setState({
	          isLoaded: true,
	          error
	        });
	      }
      )
  }


  render() {
    const { classes } = this.props
    const { error, isLoaded, items } = this.state;
    if (error) {
      console.log('IN 1')
      return (
        <div className={ classes.nonList }>Error: {error.message}</div>
      )
    } else if (!isLoaded) {
      return (
        <div className={ classes.nonList }>Loading... Hang Tight</div>
      )
    } else {
      console.log('IN 3')
      console.log(items)

    return (
      <React.Fragment>
        <List className={ classes.list }>
          {items.map(item => {
            return (
              <ListItem key={item} className={classes.listSection} role={undefined} dense>
                <ListItemIcon>
                  <IconButton edge="end" aria-label="Favorite">
                    <FavoriteIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemText 
                  id={item.id} 
                  primary={` ${ item.company } - ${ item.title } `}
                  secondary={item.location} 
                />
                <ListItemSecondaryAction>
                  <a href={ item.url } target="_blank">
                  <IconButton edge="end" aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
                  </a>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        </React.Fragment>
      )
    }
  }
  // TODO: Include a POST api request to update the database
  // with the indicated jobs when saved to jobs interested
}

export default withStyles(styles)(JobSearch);
