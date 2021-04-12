import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Poker from "./Poker";
import {addPlayerSessionThunk} from "../../Reducer/session-reducer";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";
import {addSessionThunk} from "../../Reducer/session-reducer";
import {addNameThunk} from "../../Reducer/session-reducer";
import {addBalanceThunk} from "../../Reducer/session-reducer";



let mapStateToProps = (state) => ({
    session: state.Session,
    token:state.Token



})

let PokerContainer = compose(connect(mapStateToProps, {
    addPlayerSessionThunk,
    addSessionThunk,
    addNameThunk,
    addBalanceThunk,



}))(Poker);
export default PokerContainer;
