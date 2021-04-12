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

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const Header = (props) => {


    return (

        <SimpleMenu {...props} />
    );
};

const SimpleMenu2 = (props) => {

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


    const GlobalCss = withStyles({
        '@global': {

            '.MuiPaper-rounded': {
                borderRadius: '0'
            },
            '.MuiList-padding': {
                padding: '0'
            },
            '.MuiPaper-root': {
                backgroundColor: 'none'
            },
            '.MuiListItem-gutters': {
                padding: '0'
            },
        },
    })(MenuItem);


    return (
        <div>
            <div
                onClick={handleClick}
            >
                {props.token.Token === "" ? (
                    <div className={s.vegas_header_login_button}>
                        <p>Menu</p>
                    </div>
                ) : (
                    <div className={s.vegas_header_login_button}>
                        <p>Menu</p>
                    </div>
                )}
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{marginTop: '50px'}}
            >
                {props.token.Token === "" ? (
                    ""
                ) : (
                    <div>
                        <MenuItem onClick={handleClose} style={{color: 'green', padding: '10px'}}>
                            <AccountBalanceWalletIcon
                                style={{verticalAlign: "middle"}}/> Rake: {props.getplayers.map((m) => (
                            props.session.Name == m.Player ? m.ERake : ''))}
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
                )}
                <GlobalCss onSubmit={handleClose}>
                    {/*<MenuItem onClick={handleClose}>*/}
                    {props.token.Token === "" ? (
                        // <a
                        //                         //     href={`#fer`}
                        //                         //     title="Login"
                        //                         // >
                        //                         //     <Button
                        //                         //         variant="contained"
                        //                         //         style={{backgroundColor: "#ad1f2f", color: "#fff"}}
                        //                         //     >
                        //                         //         <ExitToAppIcon/> Login
                        //                         //     </Button>
                        //                         // </a>
                        <div className={s.sign_in_form}>
                            <div className={s.banner_content}>SIGN IN</div>
                            <form className={s.sign_in_form} onSubmit={props.handleSubmit}>

                                <Field component="input" type="text" id="login_game" placeholder="Log in"
                                       className={s.login_game}
                                       name={"email"}/>

                                <Field component="input" type="password" id="login_game_password"
                                       className={s.login_game}
                                       name={"password"}
                                       placeholder="Password"/>
                                <button type="submit"
                                        className={s.small_submit_btn}>LOG IN
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className={s.sign_in_form2}>
                            <Button
                                variant="contained"
                                onClick={logout}
                                style={{backgroundColor: "#ad1f2f", color: "#fff"}}
                            >
                                <ExitToAppIcon/> Log Out
                            </Button>
                        </div>
                    )}
                </GlobalCss>
            </Menu>
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

    // const logout = () => {
    //   props.logoutThunk(props.session.Name);
    // };

    const [countRender, setCountRender] = useState(0);

    useEffect(() => {
        props.authPlayersThunk();
    }, [countRender]);
    // counterState = () => {
    //     setState({countRender: state.countRender + 1})
    //
    //
    // };
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
                                    style={{backgroundColor: "#85582f", color: "#fff"}}
                                >
                                    Ring Games
                                </Button>
                            </NavLink>

                            <NavLink to="/tournaments">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#85582f", color: "#fff"}}
                                >
                                    Tournaments Games
                                </Button>
                            </NavLink>

                            <NavLink to="/newringgame">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff"}}
                                >
                                    Add Ring Games
                                </Button>
                            </NavLink>

                            <NavLink to="/newtournamentsgame">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff"}}
                                >
                                    Add Tournament
                                </Button>
                            </NavLink>

                            <NavLink to="/newplayers">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff"}}
                                >
                                    Add New Player
                                </Button>
                            </NavLink>

                            <NavLink to="/addplayersfast">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#348119", color: "#fff"}}
                                >
                                    Add Fast Player
                                </Button>
                            </NavLink>

                            <NavLink to="/conplayers">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#f7941d", color: "#fff"}}
                                >
                                    Players
                                </Button>
                            </NavLink>

                            <NavLink to="/balance">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#8892bf", color: "#fff"}}
                                >
                                    Balance
                                </Button>
                            </NavLink>

                            <NavLink to="/allrake">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#8892bf", color: "#fff"}}
                                >
                                    All Rake
                                </Button>
                            </NavLink>

                            <NavLink to="/balanceplayers">
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#8892bf", color: "#fff"}}
                                >
                                    Balance Players
                                </Button>
                            </NavLink>
                            {/*
    <NavLink to="/affiliate"><Button variant="contained" >Affiliate</Button></NavLink> */}

                            <NavLink to="/">
                                <Button
                                    style={{backgroundColor: "red", color: "#fff"}}
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
                                <NavLink to="/ringgames"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Ring Games</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/tournaments"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Tournaments Games</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/newringgame"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Add Ring Games</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/newtournamentsgame"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Add Tournament</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/newplayers"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Add New Player</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/addplayersfast"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Add Fast Player</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/conplayers"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Players</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/balance"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Balance</NavLink>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/balanceplayers"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Balance Players</NavLink>
                            </MenuItem>

                            {/* <MenuItem onClick={handleClose} ><NavLink to="/affiliate">Affiliate</NavLink></MenuItem> */}

                            <MenuItem onClick={handleClose} className={s.menuitem}>
                                <NavLink to="/poker"><ArrowForwardIcon style={{verticalAlign: "middle"}}/> Poker</NavLink>
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
                      {/*<span style={{*/}
                      {/*    lineHeight: '15px',*/}
                      {/*    fontSize: '15px'*/}
                      {/*}}>*/}
                      {/*{props.session.Balance}</span>*/}
                      {props.getplayers.map((m) => (
                          <span style={{
                              lineHeight: '15px',
                              fontSize: '15px'
                          }}>{props.session.Name == m.Player ? m.Balance : ''}</span>
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
    dispatch(reset("loginadmin"));

};

let LoginSimpleMenu = reduxForm({
    form: "loginadmin",
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
