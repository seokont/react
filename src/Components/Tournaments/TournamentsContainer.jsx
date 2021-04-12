import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import {authTournamentsThunk, getTournamentsObj} from "../../Reducer/gettournamentsgame-reducer";
import Tournaments from "./Tournaments";
import {deleteTournamentsThunk} from "../../Reducer/deltournaments-reducer";
import {offlinetournamentsThunk} from "../../Reducer/offlinetournaments-reducer";
import {onlineTournamentsThunk} from "../../Reducer/onlinetournaments-reducer";
import {addMessageForTableTurnamentsName} from "../../Reducer/messagetableturnaments-reducer";
import {eddTournThunk, getTournamentsOneThunk} from "../../Reducer/edittournament-reducer";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    getgamestourn: state.Gettournaments.AllRingGamesTournaments,
    resultgetgames: state.Gettournaments.Result,
    gettsobject: state.Gettournaments.TournObj,
    token: state.Token


})

let TournamentsConteiner = compose(connect(mapStateToProps, {
    getTournamentsOneThunk,
    getTournamentsObj,
    deleteTournamentsThunk,
    authTournamentsThunk,
    offlinetournamentsThunk,
    addMessageForTableTurnamentsName,
    onlineTournamentsThunk,
    eddTournThunk
}),AuthRedirectNoneToken)(Tournaments);
export default TournamentsConteiner;
