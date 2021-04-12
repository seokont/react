import React from "react";
import {Redirect} from "react-router-dom";



let AuthRedirect= (Component) => (props) => {  
    
 
    if (props.token.Token !== '' ) {  
           
        // if (props.token.Token.indexOf('admintexas') !== -1) {     
        
        return <Redirect to='/poker'/>
    }
    return <Component {...props}/>
}
export default AuthRedirect; 
