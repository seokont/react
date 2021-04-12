import React from "react";
import {addTableThunk, mixedRingGamesThunk} from "../../Reducer/addtable-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import AddTable from "./NewRingGame";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";





let mapStateToProps = (state) => ({
adtablenew:state.Addtablereducer,
token: state.Token

})

let NewRingGameConteiner = compose(connect(mapStateToProps, {mixedRingGamesThunk,addTableThunk}),AuthRedirectNoneToken)(AddTable);
export default NewRingGameConteiner;
