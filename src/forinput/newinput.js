import {Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField} from "@material-ui/core";
import React from "react";
import {Field} from "redux-form";

export const myInputs=({input, meta,...props})=>{

   return (

       <TextField
       
           name="GameID"
           id="outlined-size-small"
           {...input}
           {...props}
           variant="outlined"
           size="medium"
       />


   )

}




export const myInputsField=({input, meta,...props})=>{

    return (
 
        <Field
        
            name="GameID"
            id="outlined-size-small"
            {...input}
            {...props}
            variant="outlined"
            size="medium"
        />
 
 
    )
 
 }




export const mySelected=({input, meta,...props})=>{

   return(


       <select>
           <option value="uno" selected="selected">{props.game}</option>
           <option value="Limit Hold'em">Limit Hold'em</option>
           <option value="Pot Limit Hold'em">Pot Limit Hold'em</option>
           <option value="No Limit Hold'em" selected="">No Limit Hold'em</option>
           <option value="Cap Limit Hold'em">Cap Limit Hold'em</option>
           <option value="Limit Omaha">Limit Omaha</option>
           <option value="Pot Limit Omaha">Pot Limit Omaha</option>
           <option value="No Limit Omaha">No Limit Omaha</option>
           <option value="Cap Limit Omaha">Cap Limit Omaha</option>
           <option value="Limit Omaha Hi-Lo">Limit Omaha Hi-Lo</option>
           <option value="Pot Limit Omaha Hi-Lo">Pot Limit Omaha Hi-Lo</option>
           <option value="No Limit Omaha Hi-Lo">No Limit Omaha Hi-Lo</option>
           <option value="Cap Limit Omaha Hi-Lo">Cap Limit Omaha Hi-Lo</option>
           <option value="Limit Omaha-5">Limit Omaha-5</option>
           <option value="Pot Limit Omaha-5">Pot Limit Omaha-5</option>
           <option value="No Limit Omaha-5">No Limit Omaha-5</option>
           <option value="Cap Limit Omaha-5">Cap Limit Omaha-5</option>
           <option value="Limit Omaha-5 Hi-Lo">Limit Omaha-5 Hi-Lo</option>
           <option value="Pot Limit Omaha-5 Hi-Lo">Pot Limit Omaha-5 Hi-Lo</option>
           <option value="No Limit Omaha-5 Hi-Lo">No Limit Omaha-5 Hi-Lo</option>
           <option value="Cap Limit Omaha-5 Hi-Lo">Cap Limit Omaha-5 Hi-Lo</option>
           <option value="Limit Razz">Limit Razz</option>
           <option value="Limit Stud">Limit Stud</option>
           <option value="Limit Stud Hi-Lo">Limit Stud Hi-Lo</option>
           <option value="Mixed">Mixed</option>
       </select>



   )
}




export const mySelectedPlayers=({input, meta,...props})=>{


    return(
 
 
        <select>
            <option value="uno" selected="selected">{props.game}</option>
            <option value="Limit Hold'em">Limit Hold'em</option>
            <option value="Pot Limit Hold'em">Pot Limit Hold'em</option>
            <option value="No Limit Hold'em" selected="">No Limit Hold'em</option>
            <option value="Cap Limit Hold'em">Cap Limit Hold'em</option>
            <option value="Limit Omaha">Limit Omaha</option>
            <option value="Pot Limit Omaha">Pot Limit Omaha</option>
            <option value="No Limit Omaha">No Limit Omaha</option>
            <option value="Cap Limit Omaha">Cap Limit Omaha</option>
            <option value="Limit Omaha Hi-Lo">Limit Omaha Hi-Lo</option>
            <option value="Pot Limit Omaha Hi-Lo">Pot Limit Omaha Hi-Lo</option>
            <option value="No Limit Omaha Hi-Lo">No Limit Omaha Hi-Lo</option>
            <option value="Cap Limit Omaha Hi-Lo">Cap Limit Omaha Hi-Lo</option>
            <option value="Limit Omaha-5">Limit Omaha-5</option>
            <option value="Pot Limit Omaha-5">Pot Limit Omaha-5</option>
            <option value="No Limit Omaha-5">No Limit Omaha-5</option>
            <option value="Cap Limit Omaha-5">Cap Limit Omaha-5</option>
            <option value="Limit Omaha-5 Hi-Lo">Limit Omaha-5 Hi-Lo</option>
            <option value="Pot Limit Omaha-5 Hi-Lo">Pot Limit Omaha-5 Hi-Lo</option>
            <option value="No Limit Omaha-5 Hi-Lo">No Limit Omaha-5 Hi-Lo</option>
            <option value="Cap Limit Omaha-5 Hi-Lo">Cap Limit Omaha-5 Hi-Lo</option>
            <option value="Limit Razz">Limit Razz</option>
            <option value="Limit Stud">Limit Stud</option>
            <option value="Limit Stud Hi-Lo">Limit Stud Hi-Lo</option>
            <option value="Mixed">Mixed</option>
        </select>
 
 
 
    )
 }