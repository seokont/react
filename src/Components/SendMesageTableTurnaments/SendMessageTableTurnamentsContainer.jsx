import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import MessageforTable from "./SendMessageTableTurnaments";

import {addMessageTableTournamentsThunk} from "../../Reducer/messagetableturnaments-reducer";



let mapStateToProps = (state) => ({
    messag:state.Messageournaments

})

let SendMessageTableTurnamentsContainer = compose(connect(mapStateToProps, {
    addMessageTableTournamentsThunk}))(MessageforTable);
export default SendMessageTableTurnamentsContainer;
