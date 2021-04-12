import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import ConectedPlayers from "./ConectedPlayers";
import {conectedPlayersThunk} from "../../Reducer/conectedplayers-reducer";


let mapStateToProps = (state) => ({
    con:state.Conected.Allconected
})

let ConectedPlayersContainer = compose(connect(mapStateToProps, {conectedPlayersThunk}))(ConectedPlayers);
export default ConectedPlayersContainer;
