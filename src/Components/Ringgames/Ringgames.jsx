import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import style from './Ringgames.module.css';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {authThunk, getGameObj} from "../../Reducer/getgame-reducer";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import {NavLink} from "react-router-dom";
import {ChatBubbleOutline, DesktopAccessDisabled, DesktopWindows, Edit} from "@material-ui/icons";
import {deleteGameThunk} from "../../Reducer/delgame-reducer";
import {CircularProgress} from "@material-ui/core";
import SendMessageTableContainer from "../SendMesageTable/SendMessageTableContainer";

function createData(Name, Description, Status, Auto, Game) {
    return {Name, Description, Status, Auto, Game};
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
    return order === 'desc'
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
    {id: 'Name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'Game', numeric: true, disablePadding: false, label: 'Game'},
    {id: 'Status', numeric: true, disablePadding: false, label: 'Status'},
    {id: 'Auto', numeric: true, disablePadding: false, label: 'Auto'},
    {id: 'PW', numeric: true, disablePadding: false, label: 'PW'},
    {id: 'PermPlay', numeric: true, disablePadding: false, label: 'PermPlay'},
    {id: 'Description', numeric: true, disablePadding: false, label: 'Description'},
    {id: 'Seats', numeric: true, disablePadding: false, label: 'Seats'},
    {id: 'StartMin', numeric: true, disablePadding: false, label: 'StartMin'},
    {id: 'SmallestChip', numeric: true, disablePadding: false, label: 'SmallestChip'},
    {id: 'BuyInMin', numeric: true, disablePadding: false, label: 'BuyInMin'},
    {id: 'BuyInMax', numeric: true, disablePadding: false, label: 'BuyInMax'},
    {id: 'BuyInDef', numeric: true, disablePadding: false, label: 'BuyInDef'},
    {id: 'RakePercent', numeric: true, disablePadding: false, label: 'RakePercent'},
    {id: 'TimeBank', numeric: true, disablePadding: false, label: 'TimeBank'},
];

function EnhancedTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
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
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    rounded: {
        borderRadius: '0'

    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {

    const [countDel, setCountDel] = useState(0);
    useEffect(() => {
        props.authThunk();
    }, [countDel]);

    const classes = useToolbarStyles();
    const {numSelected} = props;


    let deleteRingGames = () => {
        for (let i = 0; i < props.getgamesobject.length; i++) {
            props.deleteGameThunk(props.getgamesobject[i]);
        }
        return setCountDel(countDel + 1);
    }

    let offlineGames = () => {
        for (let i = 0; i < props.getgamesobject.length; i++) {
            props.offlineGameThunk(props.getgamesobject[i]);
        }
        return setCountDel(countDel + 1);
    }

    let onlineGames = () => {
        for (let i = 0; i < props.getgamesobject.length; i++) {
            props.onlineGameThunk(props.getgamesobject[i]);
        }
        return setCountDel(countDel + 1);
    }


    const editor = (name) => {
        props.getGameOneThunk(name)
    }

    let formessage = () => {
        for (let i = 0; i < props.getgamesobject.length; i++) {
            props.addMessageForTableName(props.getgamesobject[i]);
        }

    }


    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Ring Games
                </Typography>
            )}

            {numSelected > 0 ? (


                <div>
                    <table>
                        <tr>
                            <td><Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                    <DeleteIcon onClick={() => {
                                        deleteRingGames()
                                    }}/>
                                </IconButton>
                            </Tooltip></td>
                            <td><Tooltip title="Disabled">
                                <IconButton aria-label="Disabled">
                                    <DesktopAccessDisabled className={style.red} onClick={() => {
                                        offlineGames()
                                    }}/>
                                </IconButton>
                            </Tooltip>
                            </td>


                            <td><Tooltip title="Enabled">
                                <IconButton aria-label="Enabled">
                                    <DesktopWindows className={style.green} onClick={() => {
                                        onlineGames()
                                    }}/>
                                </IconButton>
                            </Tooltip>
                            </td>

                            <td>


                                <NavLink to='/editringgame'
                                         style={{}}
                                         title='Edit'>
                                    <Tooltip title="Edit Ring Games">
                                        <IconButton aria-label="Edit Ring Games">
                                            <Edit onClick={() => {
                                                editor(props.getgamesobject[0]);
                                            }}/>
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>

                            </td>


                            <td>
                                <Tooltip title="Message">
                                    <IconButton aria-label="Message">

                                    <span>
                                                <a href={`#${props.getgamesobject[0]}`} title='Message' onClick={() => {
                                                    formessage(props.getgamesobject[0])

                                                }}
                                                   style={{color: '#706468'}}><ChatBubbleOutline/></a>
                                                <div id={props.getgamesobject[0]} className={style.modalDialog}>
                                                    <div>
                                                        <a href="#close" title="Close" className={style.close}>X</a>
                                                        <h3>Message From {props.getgamesobject[0]}</h3>
                                                        <SendMessageTableContainer myprops={props.getgamesobject[0]}/>
                                                    </div>
                                                </div>
                                            </span>

                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    </table>
                </div>


            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
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
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
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

export default function Ringgames(props) {

    useEffect(() => {
        props.authThunk();
    }, []);
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.getgames.map((n) => n.Name);
            props.getGameObj(newSelecteds);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, Name) => {
        const selectedIndex = selected.indexOf(Name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, Name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        props.getGameObj(newSelected);

        setSelected(newSelected);
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

    const isSelected = (Name) => selected.indexOf(Name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.getgames.length - page * rowsPerPage);

    return (

        <div className={classes.root}>
            {props.resultgetgames === "" ? <div style={{textAlign: 'center'}}><CircularProgress/></div> : <div>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar {...props} numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={props.getgames.length}
                            />
                            <TableBody>
                                {stableSort(props.getgames, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.Name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.Name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.Name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.Name}
                                                </TableCell>

                                                <TableCell align="right">{row.Game}</TableCell>
                                                <TableCell align="right">{row.Status == 'Offline' ?
                                                    <div style={{color: 'red'}}>{row.Status}</div> :
                                                    <div style={{color: 'green'}}>{row.Status}</div>}</TableCell>


                                                <TableCell align="right">{row.Auto}</TableCell>

                                                <TableCell align="right">{row.PW}</TableCell>
                                                <TableCell align="right">{row.PermPlay}</TableCell>
                                                <TableCell align="right">{row.Description}</TableCell>
                                                <TableCell align="right">{row.Seats}</TableCell>
                                                <TableCell align="right">{row.StartMin}</TableCell>
                                                <TableCell align="right">{row.SmallestChip}</TableCell>
                                                <TableCell align="right">{row.BuyInMin}</TableCell>
                                                <TableCell align="right">{row.BuyInMax}</TableCell>
                                                <TableCell align="right">{row.BuyInDef}</TableCell>
                                                <TableCell align="right">{row.RakePercent}</TableCell>
                                                <TableCell align="right">{row.TimeBank}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                        <TableCell colSpan={16}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[15, 25]}
                        component="div"
                        count={props.getgames.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Dense padding"
                />
            </div>}
        </div>
    );
}
