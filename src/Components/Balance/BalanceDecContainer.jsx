import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {authDecBalanceThunk} from "../../Reducer/balanceincdec-reducer";
import BalanceAddOrClearDec from "./BalanceDec";




let mapStateToProps = (state) => ({

    balance:state.Balance

})

let BalanceDecContainer = compose(connect(mapStateToProps, {authDecBalanceThunk}))(BalanceAddOrClearDec);
export default BalanceDecContainer;
