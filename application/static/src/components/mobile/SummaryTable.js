import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: '16px',
    width: '33%',
  },
  head: {
    backgroundColor: theme.palette.primary.secondary,
    color: 'white',
    fontSize: '1rem',
    fontWeight: 500,
  },
  body: {
    fontSize: 14,
    padding: '16px',
  },
  alignRight: {
    textAlign: 'center',
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%'
  },
}));

function createData(name, applied, interviews) {
	return { name, applied, interviews };
}

const rows = [
	createData('This Week', 10, 4),
	createData('Weekly Average', 10, 2),
]

export default function SummaryTable() {
  const classes = useStyles();

  return (
    <Paper> 
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Applied</StyledTableCell>
            <StyledTableCell align="right">Upcoming Interviews</StyledTableCell>
					</TableRow>
				</TableHead>
			<TableBody>
				{rows.map(row => (
					<TableRow key={row.name}>
						<StyledTableCell component="th" scope="row">
							{row.name}
						</StyledTableCell>
						<StyledTableCell align="right">{row.applied}</StyledTableCell>
						<StyledTableCell align="right">{row.interviews}</StyledTableCell>
					</TableRow>
				))}
			</TableBody>
			</Table>
		</Paper>
  );
}
