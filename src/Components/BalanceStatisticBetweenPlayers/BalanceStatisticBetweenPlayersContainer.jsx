import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import BalanceStatisticBetweenPlayers from "./BalanceStatisticBetweenPlayers";
import AuthRedirectNoneToken from "../../Hoc/AuthRedirectNoneToken";
import {addBalPlayersThunk} from "../../Reducer/balancestatisticaplayers-reducer";



let mapStateToProps = (state) => ({
    
allbalpl:state.AllbalancePlayer.Object,
token: state.Token

})

let BalanceStatisticBetweenPlayersContainer = compose(connect(mapStateToProps, {
    addBalPlayersThunk
}),AuthRedirectNoneToken)(BalanceStatisticBetweenPlayers);
export default BalanceStatisticBetweenPlayersContainer;
