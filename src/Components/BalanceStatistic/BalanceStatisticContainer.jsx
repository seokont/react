import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import BalanceStatistic from "./BalanceStatistic";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";
import {addBalThunk} from "../../Reducer/balancestatistica-reducer";



let mapStateToProps = (state) => ({
    
allbal:state.Allbalance.Object,
token: state.Token

})

let BalanceStatisticContainer = compose(connect(mapStateToProps, {
    addBalThunk
}),AuthRedirectNoneToken)(BalanceStatistic);
export default BalanceStatisticContainer;
