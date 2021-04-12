import React from "react";
import {Redirect} from "react-router-dom";



let AuthRedirectNoneToken= (Component) => (props) => {



    if (props.token.Token === "" ) {


        // if (props.token.Token == "" || props.token.Token.indexOf('admintexas') == -1) {

        return <Redirect to='/'/>
    }
    return <Component {...props}/>
}
export default AuthRedirectNoneToken;
