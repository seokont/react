import React from 'react';
import {Redirect} from 'react-router-dom';


let RedirectAfterGoodTournaments = (Component) => (props) => {
    if (props.EditMessag.Result === "Ok") {
        props.editTForGamesResultNull('');
        return <Redirect to="/tournaments"/>
    }
    return <Component {...props}/>
}
export default RedirectAfterGoodTournaments;
