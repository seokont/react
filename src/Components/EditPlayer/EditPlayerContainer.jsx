import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import RedirectAfterGood from "../../Hoc/RedirectAfterGood";
import EditTablePlayer from "./EditPlayer";
import {editPlayerThunk} from "../../Reducer/editplayer-reducer";






let mapStateToProps = (state) => ({
    EditPlayer:state.EditPlayerNice,
    getgames: state.Getgamereducer.AllRingGames,



})

let EditPlayerConteiner = compose(connect(mapStateToProps, {editPlayerThunk}))(EditTablePlayer);
export default EditPlayerConteiner;
