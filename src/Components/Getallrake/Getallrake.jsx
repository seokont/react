import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import {CircularProgress} from "@material-ui/core";
import style from "../Getplayers/Getplayers.module.css";
function createData(Player, Data, Rake, id) {
    return {Player, Data, Rake, id};
}
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const headCells = [
    {id: "id", numeric: false, disablePadding: true, label: "id"},
    {id: "user", numeric: true, disablePadding: false, label: "Player"},
    {id: "rake", numeric: true, disablePadding: false, label: "Rake"},
    {id: "data", numeric: true, disablePadding: false, label: "Data"},
];
function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{"aria-label": "select all desserts"}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{fontWeight: "bold"}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: "1 1 100%",
    },
}));
const EnhancedTableToolbar = (props) => {
    const [countDel, setCountDel] = useState(0);
    useEffect(() => {
        props.addAllRakeThunk();
    }, [countDel]);
    let deletePlayers = () => {
        for (let i = 0; i < props.allrakeobj.length; i++) {
            props.deletePlayerThunk(props.allrakeobj[i]);
        }
        return setCountDel(countDel + 1);
    };
    let resetrake = () => {
        for (let i = 0; i < props.allrakeobj.length; i++) {
            props.resetRakeUserThunk(props.allrakeobj[i]);
        }
        return setCountDel(countDel + 1);
    };
    const editor = (name) => {
        props.editPlayerThunkByObject(name);
    };
    const classes = useToolbarStyles();
    const {numSelected} = props;
    const t = () => {
        let arr = [];
        let total = 0;
        props.getplayers.map((r) => arr.push(r.ERake));
        for (let t = 0; t < arr.length; t++) {
            total += arr[t]
        }
        return parseInt(total * 100) / 100
    };
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    All Rake{" "}
                    <div style={{fontSize: "20px"}}>
                        Total Rake:{" "}
                        <span style={{fontWeight: "bold", color: "green"}}>{t()}</span>
                    </div>
                </Typography>
            )}
            {/* <FreeSolo
        getplayers={props.allrake}
        searchPlayersThunk={props.searchPlayersThunk}
      /> */}
            {/* {numSelected > 0 ? (
        <div>
          <table>
            <tr>
              <td>
                <Tooltip title="Increment">
                  <IconButton aria-label="Increment">
                    <span style={{ marginTop: "5px" }}>
                      <a
                        href={`#${props.allrakeobj[0]}`}
                        title="Increment"
                        style={{ color: "#706468" }}
                      >
                        <table>
                          <tr>
                            <td>
                              <MonetizationOnIcon />
                            </td>
                            <td>
                              <AddIcon />
                            </td>
                          </tr>
                        </table>
                      </a>
                      <div
                        id={props.allrakeobj[0]}
                        className={style.modalDialog}
                      >
                        <div>
                          <a
                            href="#close"
                            title="Close"
                            onClick={() => {
                              setCountDel(countDel + 1);
                            }}
                            className={style.close}
                          >
                            X
                          </a>
                          <h5>Increment For {props.allrakeobj[0]}</h5>
                          <BalanceIncContainer
                            getplayersobj={props.allrakeobj}
                          />
                        </div>
                      </div>
                    </span>
                  </IconButton>
                </Tooltip>
              </td>

              <td>
                <Tooltip title="Decrement">
                  <IconButton aria-label="Decrement">
                    <span style={{ marginTop: "5px" }}>
                      <a
                        href={`#${props.allrakeobj[0]}2`}
                        title="Decrement"
                        style={{ color: "#706468" }}
                      >
                        <table>
                          <tr>
                            <td>
                              <MonetizationOnIcon />
                            </td>
                            <td>
                              <RemoveIcon />
                            </td>
                          </tr>
                        </table>
                      </a>
                      <div
                        id={`${props.allrakeobj[0]}2`}
                        className={style.modalDialog}
                      >
                        <div>
                          <a
                            href="#close"
                            title="Close"
                            onClick={() => {
                              setCountDel(countDel + 1);
                            }}
                            className={style.close}
                          >
                            X
                          </a>
                          <h5>Increment For {props.allrakeobj[0]}</h5>
                          <BalanceDecContainer
                            getplayersobj={props.allrakeobj}
                          />
                        </div>
                      </div>
                    </span>
                  </IconButton>
                </Tooltip>
              </td>

              <td>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() => {
                        deletePlayers();
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </td>
              <td>
                <Tooltip title="Reset Rake">
                  <IconButton aria-label="Reset Rake">
                    <FlipCameraAndroidIcon
                      onClick={() => {
                        resetrake();
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </td>

              <td>
                <NavLink to="/editplayers" style={{}} title="Edit">
                  <Tooltip title="Edit User">
                    <IconButton aria-label="Edit User">
                      <Edit
                        onClick={() => {
                          editor(props.allrakeobj[0]);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </NavLink>
              </td>
            </tr>
          </table>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
        </Toolbar>
    );
};
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTableCell-body': {
            color: '#fff'
        },
        '& .MuiCheckbox-root': {
            color: '#fff'
        },
        '& .MuiTableCell-stickyHeader': {
            color: '#fff',
            backgroundColor: '#000',
        },
        '& .MuiTableSortLabel-root': {
            color: '#fff',
            backgroundColor: '#000',
        },
        '& .MuiTableSortLabel-root:hover': {
            color: '#fff',
            backgroundColor: '#000',
        },
        '& .MuiTableSortLabel-root:focus': {
            color: '#fff',
            backgroundColor: '#000',
        },
        '& .MuiTableSortLabel-root.MuiTableSortLabel-active': {
            color: '#fff',
            backgroundColor: '#000',
        },
        '& .MuiToolbar-regular': {
            color: '#fff',
            backgroundColor: '#112839',
        },
        '& .MuiIconButton-root': {
            color: '#fff',
        },
        '& .MuiFormControlLabel-root': {
            color: '#fff',
            padding: '7px 0 0 15px'
        },
        '& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon': {
            color: '#fff',
            backgroundColor: '#000',
        },
        '& .MuiTableCell-root': {
            borderBottom: ' 1px solid #333',
            margin: '0 auto',
        },
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        backgroundColor: '#000',
        borderRadius: '0',
    },
    table: {
        minWidth: 100,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));
export default function Getallrake(props) {

    useEffect(() => {
        props.addAllRakeThunk();
    }, []);
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event,props) => {
        if (event.target.checked) {
            const newSelecteds = props.allrake.map((n) => n.id);
            props.getObj(newSelecteds);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, Player) => {
        const selectedIndex = selected.indexOf(Player);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, Player);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected)
        props.getObj(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const isSelected = (Player) => selected.indexOf(Player) !== -1;
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, props.allrake.length - page * rowsPerPage);
    let sessionId = (session) => {
        props.authSessionThunk(session);
    };
    function getIpForTable(a, b) {
        for (let i = 0; i < b.Player.length; i++)
            if (b.Player[i] === a) {
                props.addImageCountryThunk(b.IP[i]);
                return b.IP[i];
            }
    }
    const j = (props) => props.getip.Player;
    return (
        <div className={classes.root}>
            {props.resultgetplayers === "" ? (
                <div style={{textAlign: "center"}}>
                    <CircularProgress/>
                </div>
            ) : (
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar {...props} numSelected={selected.length}/>
                    <TableContainer className={style.tableFixHeader}>
                        <Table
                            stickyHeader
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={"small"}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={props.allrake.length}
                            />
                            <TableBody>
                                {stableSort(props.allrake, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <>
                                                <TableRow
                                                    hover
                                                    onClick={(event) => {
                                                        handleClick(event, row.id);
                                                    }}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.Player}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            inputProps={{"aria-labelledby": labelId}}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell style={{
                                                        color: 'rgb(243, 226, 94)',
                                                        fontWeight: 'bold'
                                                    }} align="right">{row.user}</TableCell>
                                                    <TableCell style={{
                                                        color: '#62D826',
                                                        fontWeight: 'bold'
                                                    }} align="right">{row.rake}</TableCell>
                                                    <TableCell align="right">{row.data}</TableCell>
                                                </TableRow>
                                            </>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <TablePagination
                        rowsPerPageOptions={[50, 100, 500]}
                        component="div"
                        count={props.allrake.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </div>
    );
}
// function FreeSolo(props) {
//   return (
//     <div style={{ width: 300 }}>
//       <Autocomplete
//         freeSolo
//         id="free-solo-2-demo"
//         disableClearable
//         options={props.allrake.map((option) => option.Player)}
//         renderInput={(params) => (
//           <TextField
//             onChange={props.searchPlayersThunk(params.inputProps.value)}
//             {...params}
//             label="Search Player"
//             margin="normal"
//             variant="outlined"
//             InputProps={{ ...params.InputProps, type: "search" }}
//           />
//         )}
//       />
//     </div>
//   );
// }
