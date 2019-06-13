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
import EditMenu from './EditMenu';
import EditForm from './EditForm';

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
      edit: false,
      editValues: null,
    };
		this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }
  
	handleExpandClick() {
		this.setState((prevState) => ({
      expanded: !prevState.expanded
    }));
	}
  
  handleEdit() {
    console.log("in handle edit");
    this.setState({
      edit: true,
    });
  }

  handleSubmitEdit(values) {
    console.log('values from function', values)
    this.setState({
      edit: false,
      editValues: values,
    });
  }

  handleDelete() {
    console.log("in handle delete");
    // Send a delete request
  }

  render() {
    const { classes, job, id } = this.props;
    const { expanded, edit, editValues } = this.state;
    
    if (editValues) {
      console.log("passed condition in jobcard");
      job  = Object.assign({}, editValues);
    }

    return (
      <Grid item xs={ 12 } sm={ 6 }>
        <Card className={ classes.card } id={ id }>
          <CardHeader
            action={
              <EditMenu handleEdit={ this.handleEdit } handleDelete={ this.handleDelete }/>
            }
            titleTypographyProps={{  }}
            title={ job.job_title + ' at ' + job.company }
            subheader={ 'Applied On: ' + job.date_applied }
          />
          { !edit && (
            <React.Fragment>
            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                { 'Interviews Received: '}
                { Object.keys(job.interview).length === 0 ? 'None': job.interview.join(', ') }
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                { 'Languages: '}
                { Object.keys(job.languages).length === 0 ? 'None': job.languages.join(', ') }
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
            </React.Fragment>
          )}
          { edit && (
            <CardContent>
              <EditForm job={ job } id={ id } handleClose={ this.handleSubmitEdit }/>
            </CardContent>
          )}
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(JobCard);
