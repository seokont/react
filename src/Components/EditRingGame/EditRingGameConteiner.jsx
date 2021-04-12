import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import {editTableForGamesResultNull, editTableThunk} from "../../Reducer/edittable-reducer";
import EditTable from "./EditRingGame";
import RedirectAfterGood from "../../Hoc/RedirectAfterGood";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    EditMessag: state.EditMessag,
    getgames: state.Getgamereducer.AllRingGames,
    token: state.Token


})

let EditRingGameConteiner = compose(connect(mapStateToProps, {
    editTableThunk,
    editTableForGamesResultNull
}), RedirectAfterGood,AuthRedirectNoneToken)(EditTable);
export default EditRingGameConteiner;
