import React, {useEffect, useState} from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {Button, Link, Menu, MenuItem, withStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {compose} from "redux";
import {connect} from "react-redux";
import {addPlayerTokenThunk, logoutThunk} from "../../Reducer/auth-reducer";
import Grid from "@material-ui/core/Grid";
import {authPlayersThunk} from "../../Reducer/getplayers-reducer";
import LoginContainer from "../Login/LoginContainer";
import BalanceTransferContainerContainer from "../BalanceTransfer/BalanceTransfer";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PasswordreplaceContainerContainer from "../Passwordreplace/Passwordreplace";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PropTypes from "prop-types";
import {Field, reduxForm, reset} from "redux-form";
import {addPlayerSessionThunk} from "../../Reducer/session-reducer";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Header = (props) => {
    return (
        <SimpleMenu {...props} />
    );
};
const SimpleMenu2 = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCloses = () => {
        setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        props.logoutThunk(props.session.Name);
    };
    return (
        <div>
            <div>
                {props.token.Token === "" ? (
                    <div onClick={handleClickOpen} className={s.vegas_header_login_button}>
                        <p>Menu</p>
                    </div>
                ) : (
                    <div onClick={handleClick} className={s.vegas_header_login_button}>
                        <p>Menu</p>
                    </div>
                )}
            </div>
            <div>
                <Dialog open={open} onClose={handleCloses} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <div className={s.sign_in_form}>
                            <div className={s.banner_content}>SIGN IN</div>
                            <form className={s.sign_in_form} onSubmit={props.handleSubmit}>
                                <Field component="input" type="text" id="login_game" placeholder="Username"
                                       className={s.login_game}
                                       name={"email"}/>
                                <Field component="input" type="password" id="login_game_password"
                                       className={s.login_game}
                                       name={"password"}
                                       placeholder="Password"/>
                                <button type="submit" style={{
                                    cursor:'pointer'
                                }} onClick={handleCloses}
                                        className={s.small_submit_btn}>LOG IN
                                </button>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {props.token.Token === "" ? '' :
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    style={{marginTop: '50px'}}>
                    <div>
                        <MenuItem onClick={handleClose} style={{color: 'green', padding: '10px'}}>
                            <AccountBalanceWalletIcon
                                style={{verticalAlign: "middle"}}/> Rake: {props.getplayers.map((m) => (
                            props.session.Name == m.Player && m.ERake ))}
                        </MenuItem>
                        <MenuItem onClick={handleClose} style={{padding: '10px'}}>
                            <a href={`#t`} title="Login" onClick={() => {
                            }}>
                                <LocalAtmIcon style={{verticalAlign: "middle"}}/> Transfer
                                Money
                            </a>
                        </MenuItem>
                        <MenuItem onClick={handleClose} style={{padding: '10px'}}>
                            <a href={`#p`} title="Login" onClick={() => {
                            }}>
                                <LockOpenIcon style={{verticalAlign: "middle"}}/>
                                Change Password
                            </a>
                        </MenuItem>
                    </div>
                    <MenuItem onSubmit={handleClose}>
                        {/*<MenuItem onClick={handleClose}>*/}
                        <div className={s.sign_in_form2}>
                            <Button
                                variant="contained"
                                onClick={logout}
                                style={{backgroundColor: "#ad1f2f", color: "#fff"}}
                            >
                                <ExitToAppIcon/> Log Out
                            </Button>
                        </div>
                    </MenuItem>
                </Menu>
            }
        </div>
    );
};
const SimpleMenu = (props) => {
    SimpleMenu.propTypes = {
        anchorEl: PropTypes.string
    };
    // const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [countRender, setCountRender] = useState(0);
    useEffect(() => {
        props.authPlayersThunk();
    }, [countRender]);
    return (
        <>
            {props.session.Role === "admin" && props.token.Token ? (
                <div>
                    <div className={s.menu_desktop}>
                        <Grid
                            spacing={0}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <NavLink to="/ringgames">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#85582f", color: "#fff", borderRadius:'0'}}
                                >
                                    Cash Tables
                                </Button>
                            </NavLink>
                            <NavLink to="/tournaments">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#85582f", color: "#fff", borderRadius:'0'}}
                                >
                                    Tournaments Tables
                                </Button>
                            </NavLink>
                            <NavLink to="/newringgame">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff", borderRadius:'0'}}
                                >
                                    Create Tables
                                </Button>
                            </NavLink>
                            <NavLink to="/newtournamentsgame">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff", borderRadius:'0'}}
                                >
                                    Create Tournaments
                                </Button>
                            </NavLink>
                            <NavLink to="/newplayers">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff", borderRadius:'0'}}
                                >
                                    Add New Player
                                </Button>
                            </NavLink>
                            <NavLink to="/addplayersfast">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff", borderRadius:'0'}}
                                >
                                    Add Fast Player
                                </Button>
                            </NavLink>
                            <NavLink to="/conplayers">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#f7941d", color: "#fff", borderRadius:'0'}}
                                >
                                    Credits
                                </Button>
                            </NavLink>
                            <NavLink to="/balance">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#8892bf", color: "#fff", borderRadius:'0'}}
                                >
                                    Transactions
                                </Button>
                            </NavLink>
                            <NavLink to="/allrake">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#8892bf", color: "#fff", borderRadius:'0'}}
                                >
                                    Players Rake
                                </Button>
                            </NavLink>
                            <NavLink to="/balanceplayers">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#8892bf", color: "#fff", borderRadius:'0'}}
                                >
                                    Players Transactions
                                </Button>
                            </NavLink>
                            <NavLink to="/">
                                <Button
                                    style={{backgroundColor: "red", color: "#fff", borderRadius:'0'}}
                                    variant="contained"
                                >
                                    Poker
                                </Button>
                            </NavLink>
                            {/* {props.token.Token===''?'':<Button variant="contained" onClick={logout} style={{backgroundColor:'#ad1f2f', color:'#fff'}}><ExitToAppIcon/>  Log Out</Button>} */}
                        </Grid>
                    </div>
                    <Grid className={s.menu_mob}>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            variant="outlined"
                            color="secondary"
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/ringgames"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Cash Tables</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/tournaments"><ArrowForwardIcon
                                    style={{verticalAlign: "middle"}}/> Tournaments Tables</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/newringgame"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Create Tables</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/newtournamentsgame"><ArrowForwardIcon
                                    style={{verticalAlign: "middle"}}/> Create Tournaments</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/newplayers"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Add New
                                    Player</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/addplayersfast"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Add
                                    Fast Player</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/conplayers"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Credits</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/balance"><ArrowForwardIcon
                                    style={{verticalAlign: "middle"}}/> Transactions</NavLink>
                            </MenuItem>


                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/allrake"><ArrowForwardIcon
                                    style={{verticalAlign: "middle"}}/> Players Rake</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/balanceplayers"><ArrowForwardIcon
                                    style={{verticalAlign: "middle"}}/> Players Transactions</NavLink>
                            </MenuItem>
                            {/* <MenuItem onClick={handleClose} ><NavLink to="/affiliate">Affiliate</NavLink></MenuItem> */}
                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/poker"><ArrowForwardIcon
                                    style={{verticalAlign: "middle"}}/> Poker</NavLink>
                            </MenuItem>
                            {/* {props.token.Token===''?'':<MenuItem onClick={handleClose} ><Link href="/" ><ExitToAppIcon/>  Log Out</Link></MenuItem>} */}
                        </Menu>
                    </Grid>
                </div>
            ) : (
                ""
            )}
            <div className={s.main_root}>
                <div className={s.root}>
                    <div id="t" className={s.modalDialog}>
                        <div>
                            <a
                                href="#close"
                                onClick={() => setCountRender(countRender + 1)}
                                title="Close"
                                className={s.close}
                            >
                                X
                            </a>
                            <BalanceTransferContainerContainer/>
                        </div>
                    </div>
                    <div id="p" className={s.modalDialog}>
                        <div>
                            <a
                                href="#close"
                                onClick={() => setCountRender(countRender + 1)}
                                title="Close"
                                className={s.close}
                            >
                                X
                            </a>
                            <PasswordreplaceContainerContainer/>
                        </div>
                    </div>
                    <div id={"fer"} className={s.modalDialog}>
                        <div>
                            <a href="#close" title="Close" className={s.close}>
                                X
                            </a>
                            <LoginContainer/>
                            {props.session.Name && (
                                <div style={{color: "#000"}}>
                                    Your Login as: <div>{props.session.Name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={s.live_dealers}>
                        <a href="https://tunbet400.com/index.php?width=1">
                            <p style={{paddingTop: '10px', height: '12px'}}>Home</p>
                        </a>
                    </div>
                    <div className={s.block_two}>
                        {props.session.Name && props.token.Token ? (
                            <span>
                  <div style={{
                      textAlign: "center",
                      color: '#F3E25E',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial'
                  }}>

                      {props.session.Name}
                  </div>
                  <div style={{textAlign: "center", color: '#62D826', fontWeight: 'bold'}}>

                      <div style={{
                          fontSize: '11px',
                          display: 'block',
                          lineHeight: '12px'
                      }}>Balance:</div>
                      {props.getplayers.map((m) => (
                          <span style={{
                              lineHeight: '15px',
                              fontSize: '15px'
                          }}>{props.session.Name == m.Player && m.Balance}</span>
                      ))}
                  </div>
                </span>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={s.block_tree}>
                        <LoginAdmin {...props} />
                    </div>
                </div>
            </div>
        </>
    );
}
const afterSubmit = (result, dispatch) => {
    dispatch(reset("loginadminn"));
};
let LoginSimpleMenu = reduxForm({
    form: "loginadminn",
    onSubmitSuccess: afterSubmit,
})(SimpleMenu2);
const LoginAdmin = (props) => {
    const onSubmit = (values) => {
        let args = [values.email, values.password];
        props.addPlayerTokenThunk(args);
    };
    return (
        <div>
            <LoginSimpleMenu
                {...props}
                addPlayerTokenThunk={props.addPlayerTokenThunk}
                addPlayerSessionThunk={props.addPlayerSessionThunk}
                onSubmit={onSubmit}
            />
        </div>
    );
};
let mapStateToProps = (state) => ({
    token: state.Token,
    session: state.Session,
    getplayers: state.GetPlayers.AllPlayers,
});
let HeaderContainer = compose(
    connect(mapStateToProps, {
        logoutThunk,
        authPlayersThunk,
        addPlayerTokenThunk,
        addPlayerSessionThunk
    })
)(Header);
export default HeaderContainer;
