import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppliedForm from './AppliedForm';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
  },
}));

export default function JobsTab() {
  const classes = useStyles();
  const theme = useTheme();
  const headers = ['Enter a New Job', 'Applied Jobs History']
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={ classes.body }>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          { headers.map((header) => { return <Tab label={ header } /> }) }
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <AppliedForm />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          
        </TabContainer>
      </SwipeableViews>
    </div>
  );
}
