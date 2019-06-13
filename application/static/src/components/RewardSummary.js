import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

function getRewards() {
  let ipAddress = window.location.hostname;
  let url;
  let results;

  if (ipAddress.trim() === '127.0.0.1'.trim())
    url = 'http://' + ipAddress + ':8000/api/user/rewards';
  else
    url = 'http://'+ ipAddress + '/api/user/rewards';
  
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    success: (data) => {
      results = data;
    }
  });
  return results;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    overflow: 'hidden',
    backgroundSize: 'contain',
    position: 'relative',
    transform: 'translate(-50%, 0)',
    left: '50%',
  },
}));

function RewardSummary() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const userRewards = getRewards();
  const maxSteps = userRewards.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }
  
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{userRewards[activeStep].name} ({userRewards[activeStep].rarity})</Typography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {userRewards.map((step, index) => (
          <div key={step.name}>
            {Math.abs(activeStep - index) <= 2 ? (
						<img className={classes.img} src={step.image} alt={step.name} />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default RewardSummary;
