import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
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
}));

export default function ComingSoon(props) {
  const classes = useStyles();

  return (
    <div className={ classes.body }>
      <Typography gutterBottom variant="h5" component="h2" className={ classes.title }>
        Sorry! That feature is not available yet! Coming Soon! 
      </Typography>
    </div>
  )
}
