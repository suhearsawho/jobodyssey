import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import getUrl from './tools/getUrl';

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
  entries: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '1rem',
  },
  list: {
    position: 'relative',
    maxWidth: 800,
    overflow: 'auto',
    //backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
});

class JobsAppliedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsInterested: ''
    }
  }
  
  componentDidMount() {
    let url = getUrl('/api/jobs/interested');
    
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        console.log('in data', data);
        let results = JSON.parse(data);
        this.setState({
          jobsInterested: results
        })
      }
    });
  }

  render() {
    const { classes, handleToken } = this.props;
    const { jobsInterested } = this.state;

    return (
        <React.Fragment>
        <div className={ classes.body }>
          <Typography gutterBottom variant="h5" component="h2" className={ classes.title }>
            Saved Jobs To Apply To 
          </Typography>
        </div>
        <div className={ classes.entries }>
          <List className={classes.list}>
            { Object.keys(jobsInterested).map(item => {(
                <React.Fragment>
                <ListItem>
                <ListItemIcon>
                  <IconButton edge="end" aria-label="Favorite">
                    <FavoriteIcon
                      className={item}
                      style={ true === Object.keys(jobsInterested).includes(item) ?
                        { color: 'red' } : null}
                    />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  id={item}
                  primary={` ${jobsInterested[item].company} - ${jobsInterested[item].company} `}
                  secondary={jobsInterested[item].location}
                />
                <ListItemSecondaryAction>
                  <a href={item.url} target="_blank">
                    <IconButton edge="end" aria-label="Comments">
                      <CommentIcon />
                    </IconButton>
                  </a>
                </ListItemSecondaryAction>
                </ListItem>
                </React.Fragment>
                )})
            }
          </List>
        </div>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(JobsAppliedForm);
