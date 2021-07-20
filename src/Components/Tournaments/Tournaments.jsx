import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import {authTournamentsThunk, getTournamentsObj} from "../../Reducer/gettournamentsgame-reducer";
import {ChatBubbleOutline, DesktopAccessDisabled, DesktopWindows, Edit} from "@material-ui/icons";
import style from "../Ringgames/Ringgames.module.css";
import {NavLink} from "react-router-dom";
import SendMessageTableContainer from "../SendMesageTable/SendMessageTableContainer";
import SendMessageTableTurnamentsContainer from "../SendMesageTableTurnaments/SendMessageTableTurnamentsContainer";
import {addMessageForTableTurnamentsName} from "../../Reducer/messagetableturnaments-reducer";
import {CircularProgress} from "@material-ui/core";
function createData(Name, Game, Status, Chips, BuyIn) {
    return {Name, Game, Status, Chips, BuyIn};
}
const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
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
    {id: 'Mixed', numeric: true, disablePadding: false, label: 'Mixed'},
    {id: 'Status', numeric: true, disablePadding: false, label: 'Status'},
    {id: 'Chips', numeric: true, disablePadding: false, label: 'Chips'},
    {id: 'Buy-in', numeric: true, disablePadding: false, label: 'Buy-in'},
    {id: 'Auto', numeric: true, disablePadding: false, label: 'Auto'},
    {id: 'Tables', numeric: true, disablePadding: false, label: 'Tables'},
    {id: 'St/Tb', numeric: true, disablePadding: false, label: 'St/Tb'},
    {id: 'SFull', numeric: true, disablePadding: false, label: 'SFull'},
    {id: 'Start time', numeric: true, disablePadding: false, label: 'Start time'},
    {id: 'Reg', numeric: true, disablePadding: false, label: 'Reg'},
    {id: 'MinPlay', numeric: true, disablePadding: false, label: 'MinPlay'},
    {id: 'Clocks', numeric: true, disablePadding: false, label: 'Clocks'},
    {id: 'Level', numeric: true, disablePadding: false, label: 'Level'},
    {id: 'SChop', numeric: true, disablePadding: false, label: 'SChop'},
    {id: 'Unreg', numeric: true, disablePadding: false, label: 'Unreg'},
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
        props.authTournamentsThunk();
    }, [countDel]);
    const classes = useToolbarStyles();
    const {numSelected} = props;
    let deleteTournaments = () => {
        for (let i = 0; i < props.gettsobject.length; i++) {
            props.deleteTournamentsThunk(props.gettsobject[i]);
        }
        return setCountDel(countDel + 1);
    }
    let offlineTournaments = () => {
        for (let i = 0; i < props.gettsobject.length; i++) {
            props.offlinetournamentsThunk(props.gettsobject[i]);
        }
        return setCountDel(countDel + 1);
    }
    let onlineTournaments = () => {
        for (let i = 0; i < props.gettsobject.length; i++) {
            props.onlineTournamentsThunk(props.gettsobject[i]);
        }
        return setCountDel(countDel + 1);
    }
    const editor = (name) => {
        props.getTournamentsOneThunk(name)
    }
    let formessage = () => {
        for (let i = 0; i < props.gettsobject.length; i++) {
            props.addMessageForTableTurnamentsName(props.gettsobject[i]);
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
                    Tournaments
                </Typography>
            )}
            {numSelected > 0 ? (
                <div>
                    <table >
                        <tr>
                            <td><Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                    <DeleteIcon onClick={() => {
                                        deleteTournaments()
                                    }}/>
                                </IconButton>
                            </Tooltip></td>
                            <td><Tooltip title="Disabled">
                                <IconButton aria-label="Disabled">
                                    <DesktopAccessDisabled className={style.red} onClick={() => {
                                        offlineTournaments()
                                    }}/>
                                </IconButton>
                            </Tooltip>
                            </td>
                            <td><Tooltip title="Enabled">
                                <IconButton aria-label="Enabled">
                                    <DesktopWindows className={style.green} onClick={() => {
                                        onlineTournaments()
                                    }}/>
                                </IconButton>
                            </Tooltip>
                            </td>
                            <td>
                                <NavLink to='/edittournament'
                                         style={{}}
                                         title='Edit'>
                                    <Tooltip title="Edit Tournaments">
                                        <IconButton aria-label="Edit Tournaments">
                                            <Edit onClick={() => {
                                                editor(props.gettsobject[0]);
                                            }}/>
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                            </td>
                            <td>
                                <Tooltip title="Message">
                                    <IconButton aria-label="Message">

                                    <span>
                                                <a href={`#${props.gettsobject[0]}`} title='Message' onClick={() => {
                                                    formessage(props.gettsobject[0])
                                                }}
                                                   style={{color: '#706468'}}><ChatBubbleOutline/></a>
                                                <div id={props.gettsobject[0]} className={style.modalDialog}>
                                                    <div>
                                                        <a href="#close" title="Close" className={style.close}>X</a>
                                                        <h3>Message From {props.gettsobject[0]}</h3>
                                                        <SendMessageTableTurnamentsContainer
                                                            myprops={props.gettsobject[0]}/>
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

        '& .MuiTableCell-body':{
            color:'#fff'
        },
        '& .MuiCheckbox-root':{
            color:'#fff'
        },
        '& .MuiTableCell-stickyHeader':{
            color:'#fff',
            backgroundColor:'#000',
        },
        '& .MuiTableSortLabel-root':{
            color:'#fff',
            backgroundColor:'#000',
        },
        '& .MuiTableSortLabel-root:hover':{
            color:'#fff',
            backgroundColor:'#000',
        },
        '& .MuiTableSortLabel-root:focus':{
            color:'#fff',
            backgroundColor:'#000',
        },
        '& .MuiTableSortLabel-root.MuiTableSortLabel-active':{
            color:'#fff',
            backgroundColor:'#000',
        },
        '& .MuiToolbar-regular':{
            color:'#fff',
            backgroundColor:'#112839',
        },
        '& .MuiIconButton-root':{
            color:'#fff',
        },
        '& .MuiFormControlLabel-root':{
            color:'#fff',
            padding:'7px 0 0 15px'
        },
        '& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon':{
            color:'#fff',
            backgroundColor:'#000',
        },
        '& .MuiTableCell-root':{
            borderBottom:' 1px solid #333',
            margin: '0 auto',
        },
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        backgroundColor:'#000',
        borderRadius:'0',
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
export default function Tournaments(props) {
    useEffect(() => {
        props.authTournamentsThunk();
    }, []);
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.getgamestourn.map((n) => n.Name);
            props.getTournamentsObj(newSelecteds);
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
        props.getTournamentsObj(newSelected);
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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.getgamestourn.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            {props.resultgetgames === "" ? <div style={{textAlign: 'center'}}><CircularProgress/></div> : <div>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar {...props} numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={ 'small' }
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={props.getgamestourn.length}
                            />
                            <TableBody>
                                {stableSort(props.getgamestourn, getComparator(order, orderBy))
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
                                                <TableCell align="right">{row.MixedList}</TableCell>
                                                <TableCell align="right">{row.Status == 'Offline' ?
                                                    <div style={{color: 'red'}}>{row.Status}</div> :
                                                    <div style={{color: 'green'}}>Online</div>}</TableCell>
                                                <TableCell align="right">{row.Chips}</TableCell>
                                                <TableCell align="right">{row.BuyIn}</TableCell>
                                                <TableCell align="right">{row.Auto}</TableCell>
                                                <TableCell align="right">{row.Tables}</TableCell>
                                                <TableCell align="right">{row.Seats}</TableCell>
                                                <TableCell align="right">{row.StartFull}</TableCell>
                                                <TableCell align="right">{row.StartTime}</TableCell>
                                                <TableCell align="right">{row.RegMinutes}</TableCell>
                                                <TableCell align="right">{row.MinPlayers}</TableCell>
                                                <TableCell align="right">{row.TurnClock}/{row.TimeBank}</TableCell>
                                                <TableCell align="right">{row.Level}</TableCell>
                                                <TableCell align="right">{row.StopOnChop}</TableCell>
                                                <TableCell align="right">{row.UnregLogout}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                        <TableCell colSpan={18}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={props.getgamestourn.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>}
        </div>
    );
}
