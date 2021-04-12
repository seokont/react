import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import AddPlayer from "./NewPlayer";
import {addPlayerThunk} from "../../Reducer/addplayer-reducer";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    adplayer:state.Addplayer,
    token: state.Token

})

let NewPlayerConteiner = compose(connect(mapStateToProps, {addPlayerThunk}),AuthRedirectNoneToken)(AddPlayer);
export default NewPlayerConteiner;
