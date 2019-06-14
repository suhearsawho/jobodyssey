import React from 'react'; 
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({

}));

function JobSummary() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const headlines = ['Tips', 'Goals This Week', 'Recent History'];

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
  	<div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          { headlines.map(headline => <Tab label={ headline } />) }
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          Get plenty of rest during the week of your interview!
        </TabContainer>
        <TabContainer dir={theme.direction}>
          Coming Soon!
        </TabContainer>
        <TabContainer dir={theme.direction}>
          Coming Soon!
        </TabContainer>
      </SwipeableViews>
  	</div> 
  );
}

export default JobSummary;
