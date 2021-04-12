import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {authIncBalanceThunk} from "../../Reducer/balanceincdec-reducer";
import BalanceAddOrClearInc from "./BalanceInc";




let mapStateToProps = (state) => ({

    balance:state.Balance

})

let BalanceIncContainer = compose(connect(mapStateToProps, {authIncBalanceThunk}))(BalanceAddOrClearInc);
export default BalanceIncContainer;
