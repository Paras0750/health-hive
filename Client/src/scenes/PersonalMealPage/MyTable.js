import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function MyTable(props) {
  const classes = useStyles();

  return (
    <>
  
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Ready In Minutes</TableCell>
            <TableCell>Servings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.meals.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.readyInMinutes}</TableCell>
              <TableCell>{item.servings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default MyTable;
