import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: 'green',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
}));

export default function TokenMessage(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  const handleClick = Transition => () => {
    setState({
      open: true,
      Transition,
    });
  };

  function handleClose() {
    setState({
      ...state,
      open: false,
    });
  }

  return (
    <div>
      <Snackbar
        className={ classes.design }
        open={ state.open }
        autoHideDuration={ 3000 }
        onClose={ handleClose }
        TransitionComponent={ state.Transition }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={ classes.icon, classes.iconVariant } />
            You Earned Coins!
          </span>
        }
      />
    </div>
  );
}
