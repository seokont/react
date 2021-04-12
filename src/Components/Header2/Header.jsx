import React,{useEffect, useState}  from 'react';
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Button, Link, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import { Route, withRouter } from "react-router-dom";
import HomeButton from "./../../Hoc/Pokerhome";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { compose } from "redux";
import { connect } from "react-redux";
import { logoutThunk } from "../../Reducer/auth-reducer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {authPlayersThunk} from "../../Reducer/getplayers-reducer";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import LocalAtmSharpIcon from '@material-ui/icons/LocalAtmSharp';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BalanceTransferContainerContainer from '../BalanceTransfer/BalanceTransfer';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,

  },
  paper: {
    padding: "0px 10px 7px 10px",
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#000",
  },
}));

const Header = (props) => {

    // useEffect(() => {
    //     props.authPlayersThunk();

    // });


  return (
    <header className={s.App_header}>
      <div className={s.App_header_menu}>
        {/*<Button variant="contained" color="primary" href="/ringgames">*/}
        {/*    Ring Games*/}
        {/*</Button>*/}
        {/*&nbsp;&nbsp;*/}
        {/*<Button variant="contained" color="primary" href="/tournaments">*/}
        {/*    Tournaments Games*/}
        {/*</Button>*/}
        {/*&nbsp;&nbsp;*/}
        {/*<Button variant="contained" color="primary" href="/players">*/}
        {/*    Players*/}
        {/*</Button>*/}
        <SimpleMenu  {...props} />

      </div>
    </header>
  );
};

// const SimpleMenu2 = (props) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         aria-controls="simple-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <AddToPhotosIcon
//           style={{ color: "#ad2d2f", verticalAlign: "middle" }}
//         />
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// };

const SimpleMenu = (props) => {
  const classes = useStyles();
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
    <>


      <div className={classes.root}>
        <Grid container spacing={0}>



        {props.session.Role === 'admin' && <div><Grid
            item
            xs={12}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Paper className={classes.paper}>

        <div className={s.menu_desktop}>
          {/* <NavLink to="/">
            <Button
              variant="contained"
              color="default"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </NavLink>
          &nbsp;&nbsp; */}



<NavLink to="/ringgames">
            <Button
              variant="contained"
              style={{ backgroundColor: "#85582f", color: "#fff" }}
            >
              Ring Games
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/tournaments">
            <Button
              variant="contained"
              style={{ backgroundColor: "#85582f", color: "#fff" }}
            >
              Tournaments Games
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/newringgame">
            <Button
              variant="contained"
              style={{ backgroundColor: "#348119", color: "#fff" }}
            >
              Add Ring Games
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/newtournamentsgame">
            <Button
              variant="contained"
              style={{ backgroundColor: "#348119", color: "#fff" }}
            >
              Add Tournament
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/newplayers">
            <Button
              variant="contained"
              style={{ backgroundColor: "#348119", color: "#fff" }}
            >
              Add New Player
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/addplayersfast">
            <Button
              variant="contained"
              style={{ backgroundColor: "#348119", color: "#fff" }}
            >
              Add Fast Player
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/conplayers">
            <Button
              variant="contained"
              style={{ backgroundColor: "#f7941d", color: "#fff" }}
            >
              Players
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/balance">
            <Button
              variant="contained"
              style={{ backgroundColor: "#8892bf", color: "#fff" }}
            >
              Balance
            </Button>
          </NavLink>
          &nbsp;&nbsp;
          <NavLink to="/balanceplayers">
            <Button
              variant="contained"
              style={{ backgroundColor: "#8892bf", color: "#fff" }}
            >
              Balance Players
            </Button>
          </NavLink>
          {/* &nbsp;&nbsp;
            <NavLink to="/affiliate"><Button variant="contained" >Affiliate</Button></NavLink> */}
          &nbsp;&nbsp;
          <NavLink to="/poker">
            <Button variant="contained">Poker</Button>
          </NavLink>


          &nbsp;&nbsp;
          {/* {props.token.Token===''?'':<Button variant="contained" onClick={logout} style={{backgroundColor:'#ad1f2f', color:'#fff'}}><ExitToAppIcon/>  Log Out</Button>} */}
        </div>

        <div className={s.menu_mob}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="outlined"
            color="secondary"
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <NavLink to="/ringgames">Ring Games</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/tournaments">Tournaments Games</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/newringgame">Add Ring Games</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/newtournamentsgame">Add Tournament</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/newplayers">Add New Player</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/addplayersfast">Add Fast Player</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/conplayers">Players</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/balance">Balance</NavLink>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <NavLink to="/balanceplayers">Balance Players</NavLink>
            </MenuItem>

            {/* <MenuItem onClick={handleClose} ><NavLink to="/affiliate">Affiliate</NavLink></MenuItem> */}

            <MenuItem onClick={handleClose}>
              <NavLink to="/poker">Poker</NavLink>
            </MenuItem>

            {/* {props.token.Token===''?'':<MenuItem onClick={handleClose} ><Link href="/" ><ExitToAppIcon/>  Log Out</Link></MenuItem>} */}
          </Menu>
        </div>




            </Paper>
          </Grid></div>}





          <Grid
            item
            xs={5}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Paper className={classes.paper}>
              <span>

                <div style={{ textAlign: "left" }}>
                  <AccountCircleIcon style={{ verticalAlign: "middle" }} />
                  {props.session.Name}
                </div>
                <div style={{ color: "#348019", textAlign: "left" }}>
                  <MonetizationOnIcon style={{ verticalAlign: "middle" }} />
                  {props.getplayers.map(
                    (n) => n.Player === props.session.Name && n.Balance
                  )}
                </div>
              </span>
            </Paper>
          </Grid>
          <Grid item xs={2} container
  direction="row"
  justify="center"
  alignItems="center"
>
            <Paper className={classes.paper}>
            <div> <a href={`#fer`} title='Transfer Money' onClick={() => {
                                                    // formessage(props.getgamesobject[0])

                                                }}
                                                   style={{color: '#fff'}}><LocalAtmSharpIcon style={{ verticalAlign: "middle" }}/> Transfer Money</a>
                                                <div id='fer' className={s.modalDialog}>
                                                    <div>
                                                        <a href="#close" title="Close" className={s.close}>X</a>
                                                        <h2 style={{color:'#000'}}>Transfer Money</h2>
                                                        <BalanceTransferContainerContainer/>
                                                        {/* <SendMessageTableContainer myprops={props.getgamesobject[0]}/> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div><BusinessCenterIcon style={{ verticalAlign: "middle" }}/> My Rake: {props.getplayers.map(
                    (n) => n.Player === props.session.Name && n.ERake
                  )}</div>
            </Paper>
          </Grid>
          <Grid
            item
            xs={5}
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Paper className={classes.paper}>
              <span style={{ textAlign: "right" }}>
                {props.token.Token === "" ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    onClick={logout}
                    style={{ backgroundColor: "#ad1f2f", color: "#fff" }}
                  >
                    <ExitToAppIcon /> Log Out
                  </Button>
                )}
              </span>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
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
    authPlayersThunk
  })
)(Header);
export default HeaderContainer;
