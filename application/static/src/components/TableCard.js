import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import getUrl from './tools/getUrl';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
}));

export default function TableCard(props) {
  const classes = useStyles();
  const { section, values, modifyValues } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'Company Name', field: 'company' },
      { title: 'Job Title', field: 'job_title' },
      { title: 'Date of Application', field: 'date_applied' },
      { title: 'Status', field: 'status' },
      { title: 'URL', field: 'url' },
      { title: 'Notes', field: 'notes' },
      { title: 'Office Location', field: 'location' },
      { title: 'Interview Progress', field: 'interview_progress'},
    ],
    data: values
  });
  
  function handleExpandClick() {
    setExpanded(!expanded);
    setState({ ...state, data: values });
  }
  
  return (
    <Card>
      <CardHeader
        action={
          <IconButton 
            aria-label="Expand"
            className={classes.expand,
            {[classes.expandOpen]: expanded,}
            }
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={section}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <MaterialTable
          title={section}
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  modifyValues('POST', section, newData);
                  const data = [...state.data];
                  data.push(newData);
                  setState({...state, data});
                }, 600);
              }),
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
                  modifyValues('PUT', section, {...newData, 'id': oldData['id']});
									const data = [...state.data];
									data[data.indexOf(oldData)] = newData;
									setState({ ...state, data });
								}, 600);
							}),
        		onRowDelete: oldData =>
          		new Promise(resolve => {
            		setTimeout(() => {
              		resolve();
                  modifyValues('DELETE', section, {'id': oldData['id']});
              		const data = [...state.data];
              		data.splice(data.indexOf(oldData), 1);
              		setState({ ...state, data });
            		}, 600);
          		}),
          }}
        />
        </CardContent>
      </Collapse>
    </Card>
  );
}
