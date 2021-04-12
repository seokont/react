import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import EditTournaments from "./Edittournament";
import {editTForGamesResultNull, editTournamentsThunk} from "../../Reducer/edittournament-reducer";
import RedirectAfterGoodTournaments from "../../Hoc/RedirectAfterGoodTournaments";

let mapStateToProps = (state) => ({
    EditMessag: state.EditTournaments,
    getgames: state.Gettournaments.AllRingGamesTournaments,
})

let EdittournamentConteiner = compose(connect(mapStateToProps, {
    editTournamentsThunk,
    editTForGamesResultNull
}), RedirectAfterGoodTournaments)(EditTournaments);
export default EdittournamentConteiner;
