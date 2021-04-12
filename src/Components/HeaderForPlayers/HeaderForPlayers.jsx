import React,{useEffect, useState}  from 'react';
import s from "./HeaderForPlayers.module.css";
import {NavLink} from "react-router-dom";
import {Button, Link, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import {Route, withRouter} from "react-router-dom";
import HomeButton from "../../Hoc/Pokerhome";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {compose} from "redux";
import {connect} from "react-redux";
import {logoutThunk} from '../../Reducer/auth-reducer';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {authPlayersThunk} from "../../Reducer/getplayers-reducer";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BalanceTransferContainerContainer from '../BalanceTransfer/BalanceTransfer';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-elevation1': {
      boxShadow:'none'
    },
    flexGrow: 0,
    borderBottom:'1px solid green',
   
  },
  paper: {
    padding: '10px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor:'#000'
  },
}));


const HeaderForPlayers = (props) => {


    useEffect(() => {
        props.authPlayersThunk();
       

    });
    const logout = () => {

        props.logoutThunk(props.session.Name);

    }
    const classes = useStyles();





    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
          <Grid item xs container
  direction="row"
  justify="flex-start"
  alignItems="center">
              <Paper className={classes.paper}>
                  
              <span> <div style={{ textAlign:'left'}}><AccountCircleIcon style={{verticalAlign:'middle'}}/> {props.session.Name}</div>
              <div style={{color:'#348019', textAlign:'left'}}><MonetizationOnIcon style={{verticalAlign:'middle'}}/> {props.getplayers.map(n=>n.Player == props.session.Name && n.Balance)}</div>
              </span>


              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                
              
                <SimpleMenu/>
              
              
              
              </Paper>
            </Grid>
            <Grid item xs  container
  direction="row"
  justify="flex-end"
  alignItems="center">
              <Paper className={classes.paper}><span style={{ textAlign:'right'}}>{props.token.Token===''?'':<Button variant="contained" onClick={logout} style={{backgroundColor:'#ad1f2f', color:'#fff'}}><ExitToAppIcon/>  Log Out</Button>}</span></Paper>
            </Grid>
          </Grid>
         
        </div>
      );



    // return (
        
    //     <header className={s.App_header}>
    //     <div className={s.App_header_menu}>
    //     {props.token.Token===''?'':<Button variant="contained" onClick={logout} style={{backgroundColor:'#ad1f2f', color:'#fff'}}><ExitToAppIcon/>  Log Out</Button>}


    //     <div style={{color:'#fff'}}>dffdfdf</div>
    //     </div>
    // </header>
    //    )
}





const SimpleMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
           <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       <AddToPhotosIcon style={{color:'#ad2d2f', verticalAlign:'middle'}}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
       
        <span> <a href={`#fer`} title='Message' onClick={() => {
                                                    // formessage(props.getgamesobject[0])

                                                }}
                                                   style={{color: '#fff'}}>dfdfdf</a>
                                                <div id='fer' className={s.modalDialog}>
                                                    <div>
                                                        <a href="#close" title="Close" className={s.close}>X</a>
                                                        <h3>Message From </h3>
                                                        <BalanceTransferContainerContainer/>
                                                        {/* <SendMessageTableContainer myprops={props.getgamesobject[0]}/> */}
                                                    </div>
                                                </div>
                                            </span>


        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>


      

        </div>
    );
}








let mapStateToProps = (state) => ({
    
    token: state.Token,
    session: state.Session,
    getplayers: state.GetPlayers.AllPlayers,


})

let HeaderForPlayersContainer = compose(connect(mapStateToProps, {
  logoutThunk,
  authPlayersThunk
}))(HeaderForPlayers);
export default HeaderForPlayersContainer;