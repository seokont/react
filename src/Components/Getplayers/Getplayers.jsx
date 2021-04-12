import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import { CircularProgress } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { ChatBubbleOutline, Edit } from "@material-ui/icons";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { AddIcon } from "@material-ui/data-grid";
import RemoveIcon from "@material-ui/icons/Remove";
import style from "../Getplayers/Getplayers.module.css";
import SendMessageTableContainer from "../SendMesageTable/SendMessageTableContainer";
import BalanceIncContainer from "../Balance/BalanceIncContainer";
import BalanceDecContainer from "../Balance/BalanceDecContainer";
import Icon from "react-svg-icon";
import diamond from "./../../img/diamond.svg";
import Diamond from "../../IconionSvg/Diamond";
import { authPlayersIpThunk } from "../../Reducer/getplayersforip-reducer";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function createData(Player, Balance, ERake, AdminProfile, Title) {
  return { Player, Balance, ERake, AdminProfile, Title };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

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
  { id: "Player", numeric: false, disablePadding: true, label: "Player" },
  { id: "Balance", numeric: true, disablePadding: false, label: "Balance" },
  // {id: 'ERake', numeric: true, disablePadding: false, label: 'ERake'},

  // {id: 'AdminProfile', numeric: true, disablePadding: false, label: 'AdminProfile'},
  // {id: 'Title', numeric: true, disablePadding: false, label: 'Title'},
  // {id: 'Level', numeric: true, disablePadding: false, label: 'Level'},

  { id: "PRake", numeric: true, disablePadding: false, label: "PRake" },

  // {id: 'Location', numeric: true, disablePadding: false, label: 'Location'},
  { id: "Agent", numeric: true, disablePadding: false, label: "Agent" },
  { id: "RealName", numeric: true, disablePadding: false, label: "RealName" },
  { id: "Email", numeric: true, disablePadding: false, label: "Email" },
  // {id: 'Balance2', numeric: true, disablePadding: false, label: 'Balance2'},
  // {id: 'ERake2', numeric: true, disablePadding: false, label: 'ERake2'},
  // {id: 'Permissions', numeric: true, disablePadding: false, label: 'Permissions'},
  // {id: 'Tickets', numeric: true, disablePadding: false, label: 'Tickets'},
  { id: "Chip T/A", numeric: true, disablePadding: false, label: "Chip T/A" },
  { id: "Chat", numeric: true, disablePadding: false, label: "Chat" },
  // {id: 'Color', numeric: true, disablePadding: false, label: 'Color'},
  {
    id: "First Login",
    numeric: true,
    disablePadding: false,
    label: "First Login",
  },
  {
    id: "Last Login",
    numeric: true,
    disablePadding: false,
    label: "Last Login",
  },
  {
    id: "Last Reset",
    numeric: true,
    disablePadding: false,
    label: "Last Reset",
  },
  // {id: 'Last Reset2', numeric: true, disablePadding: false, label: 'Last Reset2'},
  { id: "Logins", numeric: true, disablePadding: false, label: "Logins" },
  // {id: 'Val', numeric: true, disablePadding: false, label: 'Val'},
  { id: "Avatar", numeric: true, disablePadding: false, label: "Avatar" },
  // {id: 'Custom', numeric: true, disablePadding: false, label: 'Custom'},
  { id: "Note", numeric: true, disablePadding: false, label: "Note" },
  { id: "Gender", numeric: true, disablePadding: false, label: "Gender" },
  // {id: 'PRake2', numeric: true, disablePadding: false, label: 'PRake2'},
  // {id: 'TFees', numeric: true, disablePadding: false, label: 'TFees'},
  // {id: 'TFees2', numeric: true, disablePadding: false, label: 'TFees2'},
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
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: "bold" }}
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
    props.authPlayersThunk();
  }, [countDel]);

  let deletePlayers = () => {
    for (let i = 0; i < props.getplayersobj.length; i++) {
      props.deletePlayerThunk(props.getplayersobj[i]);
    }
    return setCountDel(countDel + 1);
  };

  let resetrake = () => {
    for (let i = 0; i < props.getplayersobj.length; i++) {
      props.resetRakeUserThunk(props.getplayersobj[i]);
    }
    return setCountDel(countDel + 1);
  };

  const editor = (name) => {
    props.editPlayerThunkByObject(name);
  };

  const classes = useToolbarStyles();
  const { numSelected } = props;

  const t = () => {
    let arr = [];
    props.getplayers.map((n) => arr.push(n.ERake));
    const sum = arr.reduce((partial_sum, a) => partial_sum + a, 0);
    let sum2 = Math.round(sum * 100) / 100;
    return sum2;
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
          Players{" "}
          <div style={{ fontSize: "20px" }}>
            Total Rake:{" "}
            <span style={{ fontWeight: "bold", color: "green" }}>{t()}</span>
          </div>
        </Typography>
      )}

      <FreeSolo
        getplayers={props.getplayers}
        searchPlayersThunk={props.searchPlayersThunk}
      />

      {numSelected > 0 ? (
        <div>
          <table>
            <tr>
              <td>
                <Tooltip title="Increment">
                  <IconButton aria-label="Increment">
                    <span style={{ marginTop: "5px" }}>
                      <a
                        href={`#${props.getplayersobj[0]}`}
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
                        id={props.getplayersobj[0]}
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
                          <h5>Increment For {props.getplayersobj[0]}</h5>
                          <BalanceIncContainer
                            getplayersobj={props.getplayersobj}
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
                        href={`#${props.getplayersobj[0]}2`}
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
                        id={`${props.getplayersobj[0]}2`}
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
                          <h5>Increment For {props.getplayersobj[0]}</h5>
                          <BalanceDecContainer
                            getplayersobj={props.getplayersobj}
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
                          editor(props.getplayersobj[0]);
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
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Getplayers(props) {
  useEffect(() => {
    props.authPlayersThunk();
  }, []);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.getplayers.map((n) => n.Player);
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
    props.getObj(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (Player) => selected.indexOf(Player) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.getplayers.length - page * rowsPerPage);

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
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <Paper className={classes.paper}>
          <EnhancedTableToolbar {...props} numSelected={selected.length} />
          <TableContainer>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={props.getplayers.length}
              />

              <TableBody>
                {stableSort(props.getplayers, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.Player);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      

<>


{props.getplayersOne==''&&<TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, row.Player);
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
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.Player}
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          <Diamond /> {row.Balance}
                        </TableCell>
                        {/* <TableCell align="right">{row.ERake}</TableCell> */}

                        {/*<TableCell align="right">{row.AdminProfile}</TableCell>*/}
                        {/*<TableCell align="right">{row.Title}</TableCell>*/}
                        {/*<TableCell align="right">{row.Level}</TableCell>*/}

                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          {row.PRake}
                        </TableCell>

                        <TableCell align="right">{row.Location}</TableCell>
                        <TableCell align="right">{row.RealName}</TableCell>
                        <TableCell align="right">{row.Email}</TableCell>
                        {/* <TableCell align="right">{row.Balance2}</TableCell> */}
                        {/* <TableCell align="right">{row.ERake2}</TableCell> */}
                        {/*<TableCell align="right">{row.Permissions}</TableCell>*/}
                        {/*<TableCell align="right">{row.Tickets}</TableCell>*/}
                        <TableCell align="right">
                          {row.ChipsTransfer}/{row.ChipsAccept}{" "}
                        </TableCell>
                        <TableCell align="right">{row.Chat}</TableCell>
                        {/*<TableCell align="right">{row.Color}</TableCell>*/}
                        <TableCell align="right">{row.FirstLogin}</TableCell>
                        <TableCell align="right">{row.LastLogin}</TableCell>
                        <TableCell align="right">{row.LastReset}</TableCell>
                        {/* <TableCell align="right">{row.LastReset2}</TableCell> */}
                        <TableCell align="right">{row.Logins}</TableCell>
                        {/*<TableCell align="right">{row.ValCode}</TableCell>*/}
                        <TableCell align="right">{row.Avatar}</TableCell>
                        {/*<TableCell align="right">{row.Custom}</TableCell>*/}
                        <TableCell align="right">{row.Note}</TableCell>

                        <TableCell align="right">{row.Gender}</TableCell>
                        {/* <TableCell align="right">{row.PRake2}</TableCell>
                                                <TableCell align="right">{row.TFees}</TableCell>
                                                <TableCell align="right">{row.TFees2}</TableCell> */}
                      </TableRow>}
                      
                      
                     
                      {props.getplayersOne==row.Player&&

                        <TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, row.Player);
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
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.Player}
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          <Diamond /> {row.Balance}
                        </TableCell>
                        {/* <TableCell align="right">{row.ERake}</TableCell> */}

                        {/*<TableCell align="right">{row.AdminProfile}</TableCell>*/}
                        {/*<TableCell align="right">{row.Title}</TableCell>*/}
                        {/*<TableCell align="right">{row.Level}</TableCell>*/}

                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          {row.PRake}
                        </TableCell>

                        <TableCell align="right">{row.Location}</TableCell>
                        <TableCell align="right">{row.RealName}</TableCell>
                        <TableCell align="right">{row.Email}</TableCell>
                        {/* <TableCell align="right">{row.Balance2}</TableCell> */}
                        {/* <TableCell align="right">{row.ERake2}</TableCell> */}
                        {/*<TableCell align="right">{row.Permissions}</TableCell>*/}
                        {/*<TableCell align="right">{row.Tickets}</TableCell>*/}
                        <TableCell align="right">
                          {row.ChipsTransfer}/{row.ChipsAccept}{" "}
                        </TableCell>
                        <TableCell align="right">{row.Chat}</TableCell>
                        {/*<TableCell align="right">{row.Color}</TableCell>*/}
                        <TableCell align="right">{row.FirstLogin}</TableCell>
                        <TableCell align="right">{row.LastLogin}</TableCell>
                        <TableCell align="right">{row.LastReset}</TableCell>
                        {/* <TableCell align="right">{row.LastReset2}</TableCell> */}
                        <TableCell align="right">{row.Logins}</TableCell>
                        {/*<TableCell align="right">{row.ValCode}</TableCell>*/}
                        <TableCell align="right">{row.Avatar}</TableCell>
                        {/*<TableCell align="right">{row.Custom}</TableCell>*/}
                        <TableCell align="right">{row.Note}</TableCell>

                        <TableCell align="right">{row.Gender}</TableCell>
                        {/* <TableCell align="right">{row.PRake2}</TableCell>
                                                <TableCell align="right">{row.TFees}</TableCell>
                                                <TableCell align="right">{row.TFees2}</TableCell> */}
                      </TableRow>

                      





                      
                      
                      }




</>





                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={33} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15, 20, 25]}
            component="div"
            count={props.getplayers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

function FreeSolo(props) {
    
 

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={props.getplayers.map((option) => option.Player)}
        renderInput={(params) => (
          <TextField
            onChange={props.searchPlayersThunk(params.inputProps.value)}
            {...params}
            label="Search Player"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}



            
          />
        )}
      />
    </div>
  );
}
