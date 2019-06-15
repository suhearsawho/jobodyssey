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
      job: props.job,
      id: props.id,
    };
		this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }
  
	handleExpandClick() {
		this.setState((prevState) => ({
      expanded: !prevState.expanded
    }));
	}
  
  handleEdit() {
    this.setState({
      edit: true,
    });
  }

  handleSubmitEdit(values) {
    this.setState({
      edit: false,
      job: values,
    });
  }

  handleCancel(values) {
    this.setState({
      edit: false,
    });
  }

  handleDelete() {
    let ipAddress = window.location.hostname;
    let url;
    if (ipAddress.trim() === '127.0.0.1'.trim())
      url = 'https://' + ipAddress + ':8000/api/jobs/applied';
    else
      url = 'https://'+ ipAddress + '/api/jobs/applied';
    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        id: this.state.id
      }),
      success: (data => {
        window.location.reload();
      })
    });
  }

  fixUrl(url) {
    if (!url.startsWith('http', 0)) {
      url = 'https://' + url;
    }
    console.log('checking');
    return url

  }
  render() {
    const { classes, handleToken } = this.props;
    const { expanded, edit, job, id } = this.state;
    const url = this.fixUrl(job.url);

    return (
      <Grid item xs={ 12 } sm={ 6 }>
        <Card className={ classes.card } id={ id }>
          <CardHeader
            action={
              <EditMenu handleEdit={ this.handleEdit } handleDelete={ this.handleDelete }/>
            }
            titleTypographyProps={{  }}
            title={ job.job_title + ' at ' + job.company }
            subheader={ 'Applied On ' + job.date_applied }
          />
          { !edit && (
            <React.Fragment>
            <CardContent>
              <Grid container
                spacing={ 1 }
                justify="center"
              >
                <Grid item xs={ 4 } sm={ 4 }>
                  <Typography variant="body1" color="textSecondary" component="p">
                    { 'Languages: '}
                  </Typography>
                </Grid>
                <Grid item xs={ 8 } sm={ 8 }>
                  <Typography variant="body1" color="textSecondary" component="p">
                    { Object.keys(job.languages).length === 0 ? 'None': job.languages.join(', ') }
                  </Typography>
                </Grid>
                <Grid item xs={ 4 } >
                  <Typography variant="body1" color="textSecondary" component="p">
                    { 'Interviews Received: '}
                  </Typography>
                </Grid>
                <Grid item xs={ 8 }>
                  <Typography variant="body1" color="textSecondary" component="p">
                    { Object.keys(job.interview).length === 0 ? 'None': job.interview.join(', ') }
                  </Typography>
                </Grid>
                <Grid item xs={ 4 } sm={ 4 }> 
                  <Typography variant="body1" color="textSecondary" component="p">
                    { 'Offer Status: '}
                  </Typography>
                </Grid>
                <Grid item xs={ 8 } sm={ 8 }> 
                  <Typography variant="body1" color="textSecondary" component="p">
                    { job.status === '' ? 'None': job.status }
                  </Typography>
                </Grid>
              </Grid>
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
                <Grid container
                  spacing={ 1 }
                  justify="center"
                >
                  <Grid item xs={ 4 } >
                    <Typography variant="body2" color="textSecondary" component="p">
                      { 'URL: ' }
                    </Typography>
                  </Grid>
                  <Grid item xs={ 8 } >
                    <Typography variant="body2" color="textSecondary" component="p">
                      <a href={ url } target="_blank">{ job.url }</a>
                    </Typography>
                  </Grid>
                  <Grid item xs={ 4 } >
                    <Typography variant="body2" color="textSecondary" component="p">
                      { 'Address: ' }
                    </Typography>
                  </Grid>
                  <Grid item xs={ 8 } >
                    <Typography variant="body2" color="textSecondary" component="p">
                      { job.address }
                    </Typography>
                  </Grid>
                  <Grid item xs={ 4 } >
                    <Typography variant="body2" color="textSecondary" component="p">
                      { 'Notes: ' }
                    </Typography>
                  </Grid>
                  <Grid item xs={ 8 } >
                    <Typography variant="body2" color="textSecondary" component="p">
                      { job.notes }
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
            </React.Fragment>
          )}
          { edit && (
            <CardContent>
              <EditForm job={ job } id={ id } handleClose={ this.handleSubmitEdit } handleCancel={ this.handleCancel } handleToken={ handleToken }/>
            </CardContent>
          )}
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(JobCard);
