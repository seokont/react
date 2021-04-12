import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import MessageforTable from "./SendMessageTable";
import {addMessageForTableName, addMessageTableThunk} from "../../Reducer/messagetable-reducer";



let mapStateToProps = (state) => ({
    messag:state.AddMessag,

})

let SendMessageTableContainer = compose(connect(mapStateToProps, {addMessageTableThunk,addMessageForTableName}))(MessageforTable);
export default SendMessageTableContainer;
