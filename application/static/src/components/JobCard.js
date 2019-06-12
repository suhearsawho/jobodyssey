import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
  },
 	expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
			expanded: false,
    };
		this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  
	handleExpandClick() {
		this.setState((prevState) => ({
      expanded: !prevState.expanded
    }));
	}

  render() {
    const { classes, job, id } = this.props;
    const { expanded } = this.state;

    return (
      <Grid item xs={ 12 }>
        <Card className={ classes.card } id={ id }>
          <CardHeader
            action={
              <IconButton aria-label="Settings">
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{  }}
            title={ job.job_title + ' ' + job.role + ' at ' + job.company }
            subheader={ 'Applied On: ' + job.date_applied }
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              { 'Interviews Received: '}
              { Object.keys(job.interview).length === 0 ? 'None': job.interview.join(', ') }
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              { 'Offer Status: '}
              { Object.keys(job.status).length === 0 ? 'None': job.status }
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton
              className={ classes.expand, {
                [classes.expandOpen]: expanded,
              }}
              onClick={ () => this.handleExpandClick() }
              aria-expanded={ expanded }
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions> 
          <Collapse in={ expanded } timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                { 'Notes: ' + job.notes }
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(JobCard);
