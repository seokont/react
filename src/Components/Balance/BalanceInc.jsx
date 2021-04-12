import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Button} from "@material-ui/core";


const SendMessageTable = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>


            <Field name={"numberbalance"} step="any" min="0" type="number" component={"input"}/>
            <div>


                <button style={{
                    background: 'red',
                    padding: '5px 15px',
                    color: '#fff',
                    border: 'solid red 1px',
                    borderRadius: '5px'
                }}>Send
                </button>
            </div>

            {props.balance.Result}

        </form>
    )
}

const afterSubmit = (result, dispatch) => {
    dispatch(reset('balanceforminc'));
}


let BalanceForm = reduxForm({form: 'balanceforminc', onSubmitSuccess: afterSubmit})(SendMessageTable);


const BalanceAddOrClearInc = (props) => {
    const onSubmit = (values) => {
        
for(let o=0; o<props.getplayersobj.length; o++)
{
    props.authIncBalanceThunk(values.numberbalance,props.getplayersobj[o]);
}


    }
    return <BalanceForm balance={props.balance} getplayersobj={props.getplayersobj} onSubmit={onSubmit}/>
}
export default BalanceAddOrClearInc;

