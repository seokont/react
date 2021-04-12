import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Button} from "@material-ui/core";
import {authDecBalanceThunk} from "../../Reducer/balanceincdec-reducer";


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
    dispatch(reset('balanceformdec'));
}


let BalanceForm = reduxForm({form: 'balanceformdec', onSubmitSuccess: afterSubmit})(SendMessageTable);


const BalanceAddOrClearDec = (props) => {

    const onSubmit = (values) => {

for(let o=0; o<props.getplayersobj.length; o++)
{
    props.authDecBalanceThunk(values.numberbalance,props.getplayersobj[o]);
}


    }
    return <BalanceForm balance={props.balance} getplayersobj={props.getplayersobj} onSubmit={onSubmit}/>
}
export default BalanceAddOrClearDec;

