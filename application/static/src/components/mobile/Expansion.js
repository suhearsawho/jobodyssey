import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaPlusSquare } from 'react-icons/fa';
import Applied from './Applied';
import Interviewing from './Interviewing';
import OfferStage from './OfferStage';
import Archive from './Archive';
import AddJob from './AddJob';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1rem',
  },
  font: {
    fontWeight: 500,
    fontSize: '1rem',
  },
  summary: {
    backgroundColor: theme.palette.primary.secondary,
    color: 'white',
  },
  icon: {
    color: 'white',
  }
}));

const panels = [
  { key: 'Applied', component: <Applied />},
  { key: 'Interviewing' , component: <Interviewing /> },
  { key: 'Offer Stage', component: <OfferStage /> },
  { key: 'Archive', component: <Archive /> },
]

export default function Expansion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<FaPlusSquare className={classes.icon}/>}
          aria-controls="Add-content"
          id="Add"
          className={classes.summary}
        >
          <Typography variant="h6" className={classes.font}>
            Applied to a Job? Track it Here!
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AddJob />
        </ExpansionPanelDetails>
      </ExpansionPanel>
        
      { panels.map(panel => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.icon}/>}
            aria-controls={panel.key + '-content'}
            id={panel.key}
            className={classes.summary}
          >
            <Typography variant="h6" className={classes.font}>
              {panel.key}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {panel.component}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}


