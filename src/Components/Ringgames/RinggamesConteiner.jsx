import React from "react";
import {compose} from "redux";
import {deleteGameThunk} from "../../Reducer/delgame-reducer";
import {offlineGameThunk} from "../../Reducer/offlinegame-reducer";
import {onlineGameThunk} from "../../Reducer/onlinegame-reducer";
import {connect} from "react-redux";
import {authThunk, getGameObj} from "../../Reducer/getgame-reducer";
import AddMesage from "./Ringgames";
import {eddTablThunk, getGameOneThunk} from "../../Reducer/edittable-reducer";
import Ringgames from "./Ringgames";
import {addMessageForTableName} from "../../Reducer/messagetable-reducer";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";



let mapStateToProps = (state) => ({
    getgames: state.Getgamereducer.AllRingGames,
    getgamesobject: state.Getgamereducer.GameObj,
    resultgetgames: state.Getgamereducer.Result,
    token: state.Token

})

let RingGamesConteiner = compose(connect(mapStateToProps, {
    getGameOneThunk,
    getGameObj,
    authThunk,
    deleteGameThunk,
    offlineGameThunk,
    onlineGameThunk,
    eddTablThunk,
    addMessageForTableName
}),AuthRedirectNoneToken)(Ringgames);
export default RingGamesConteiner;
