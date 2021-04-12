import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {addPlayerThunk} from "../../Reducer/addplayer-reducer";
import AddPlayerfast from "./AddFastPlayer";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    adplayer:state.Addplayer,
    token: state.Token


})

let AddFastPlayerConteiner = compose(connect(mapStateToProps, {addPlayerThunk}))(AddPlayerfast);
export default AddFastPlayerConteiner;

