import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import AddTournaments from "./NewTournaments";
import {addTurnamentsThunk, mixedThunk} from "../../Reducer/addtabletournaments-reducer";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
adturnamentsnew:state.Addturnaments,
token: state.Token

})

let NewTournamentsConteiner = compose(connect(mapStateToProps, {addTurnamentsThunk,mixedThunk}),AuthRedirectNoneToken)(AddTournaments);
export default NewTournamentsConteiner;
