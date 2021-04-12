import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Affiliate from "./Affiliate";
import AuthRedirectNoneToken from "./../../Hoc/AuthRedirectNoneToken";


let mapStateToProps = (state) => ({
    
    token: state.Token


})

let AffiliateContainer = compose(connect(mapStateToProps, {}),AuthRedirectNoneToken)(Affiliate);
export default AffiliateContainer;

