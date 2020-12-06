import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  editIcon: {},
  tableHeader: {
    backgroundColor: "#D9EDF6",
    fontSize: "0.9rem",
    fontWeight: 900,
    color: "#3F51B5",
  },
  tableHeaderTitle: {},
});

const columns = [
  { id: "store", label: "Харидор", minWidth: 120 },
  { id: "items", label: "Буюртмалар Сони", minWidth: 70 },
  { id: "status", label: "Статус", minWidth: 80 },
  {
    id: "phoneNumber",
    label: "Телефон #",
    minWidth: 120,
  },

  { id: "createdAt", label: "Буюртма Қабул Қилинган Вақт", minWidth: 30 },
  { id: "address", label: "Манзил", minWidth: 200, align: "left" },
  { id: "icon", label: "+", minWidth: 70, align: "left" },
];

function createData(
  store,
  items,
  status,
  phoneNumber,
  createdAt,
  address,
  icon
) {
  return { store, items, status, phoneNumber, createdAt, address, icon };
}

// const rows = [
//   createData(
//     "Аҳмаджон",
//     "Жами: 2",
//     "Қабул Қилинди",
//     "918878181",
//     "13:45 Dekabr 2, 2020",
//     "Оқ-Томир Қишлоғи",
//     <Link to="/order-item{1}">
//       <VisibilityIcon color="primary" />
//     </Link>
//   ),
//   createData(
//     "Аҳмаджон",
//     "Жами: 2",
//     "Proccessing",
//     "918878181",
//     "13:45 Dekabr 2, 2020",
//     "Оқ-Томир Қишлоғи",
//     <Link to="/order-item{1}">
//       <VisibilityIcon color="primary" />
//     </Link>
//   ),
//   createData(
//     "Аҳмаджон",
//     "Жами: 2",
//     "On Hold",
//     "918878181",
//     "13:45 Dekabr 2, 2020",
//     "Оқ-Томир Қишлоғи",
//     <Link to="/order-item{1}">
//       <VisibilityIcon color="primary" />
//     </Link>
//   ),
// ];

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/orders`).then((res) => {
      const orders = res.data;
      // setRows({ persons });
      console.log(orders);
    });
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.tableHeader}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
