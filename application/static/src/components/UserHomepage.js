import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  body: {
    display: 'flex',
    position: 'relative',
    top: '12%',
    width: '100%',
    justifyContent: 'center',
  },
  left: {
    width: '40%',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  card: {
    maxWidth: '90%',
  },
  profilePicture: {
    padding: '5%',
    borderRadius: '30px',
  }
});

class UserHomepage extends Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.body }>
        <div className={ classes.left }>
          <Card className={ classes.card }>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Profile Picture"
                height="260"
                image="https://avatars2.githubusercontent.com/u/2894642?s=400&v=4"
                title="Profile Picture"
                className={ classes.profilePicture }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Username here
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Seeking a job in python
                </Typography> 
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className={ classes.right }>
          <Card className={ classes.card }>
            <CardActionArea>
            <CardContent>
              <Typography variant="body2">
                Jobs
              </Typography>
            </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UserHomepage);
