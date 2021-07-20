import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Getplayers from "./Getplayers";
import {authPlayersThunk, authSessionThunk, NumberPage, NumberPageAction} from "../../Reducer/getplayers-reducer";

import {getObj} from "../../Reducer/getplayers-reducer";
import {eddPlayerThunk, editPlayerThunkByObject} from "../../Reducer/editplayer-reducer";
import {addPlayerForGamesResult} from "../../Reducer/addplayer-reducer";
import {deletePlayerThunk} from "../../Reducer/delplayer-reducer";
import {resetRakeAllThunk, resetRakeUserThunk, resetResultRakeOk} from "../../Reducer/rsetrakeall-reducer";
import {authPlayersIpThunk} from "../../Reducer/getplayersforip-reducer";
import {addImageCountryThunk} from "../../Reducer/ipcountry-reducer";
import {addPlayerTokenThunk} from "../../Reducer/auth-reducer";
import {addTotalRakeThunk} from "../../Reducer/totalrake-reducer";
import {searchPlayersThunk} from "../../Reducer/getplayers-reducer";


import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    getNumberPage: state.GetPlayers.NumberPage,
    getplayers: state.GetPlayers.AllPlayers,
    getplayersOne: state.GetPlayers.PlayerOne,
    resultgetplayers: state.GetPlayers.Result,
    resultresetallrake: state.Resetrake.Result,
    resultresetallrakeok: state.Resetrake.ResultOk,
    resultBalance: state.Balance,
    getplayersobj: state.GetPlayers.Obj,
    getip:state.GetPlayersIp,
    getimg:state.GetCountryIp,
    token: state.Token,
    totalrake:state.TotalRake.TotalRake


})

let GetplayersConteiner = compose(connect(mapStateToProps, {
    NumberPageAction,
    addPlayerTokenThunk,
    addImageCountryThunk,
    authPlayersIpThunk,
    authSessionThunk,
    getObj,
    resetRakeUserThunk,
    resetResultRakeOk,
    authPlayersThunk,
    eddPlayerThunk,
    addPlayerForGamesResult,
    deletePlayerThunk,
    resetRakeAllThunk,
    editPlayerThunkByObject,
    addTotalRakeThunk,
    searchPlayersThunk
}),AuthRedirectNoneToken)(Getplayers);
export default GetplayersConteiner;
