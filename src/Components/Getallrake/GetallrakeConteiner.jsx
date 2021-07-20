import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Getallrake from "./Getallrake";

import {addAllRakeThunk} from "../../Reducer/allrake-reducer";


import AuthRedirectNoneToken from "../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    getplayers: state.GetPlayers.AllPlayers,
    token: state.Token,
    totalrake:state.TotalRake.TotalRake,
    allrake:state.Allrake.AllRake


})

let GetallrakeConteiner = compose(connect(mapStateToProps, {
    addAllRakeThunk
}),AuthRedirectNoneToken)(Getallrake);
export default GetallrakeConteiner;
