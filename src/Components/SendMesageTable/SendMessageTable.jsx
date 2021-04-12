import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Button} from "@material-ui/core";


const SendMessageTable = (props) => {

    return (

        <form onSubmit={props.handleSubmit}>


            <Field name={"textArea"} component={"textarea"}/>
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

            {props.messag.Result}

        </form>
    )
}

const afterSubmit = (result, dispatch) => {
    dispatch(reset('addMessage'));
}


let AddMesageForTable = reduxForm({form: 'addMessage', onSubmitSuccess: afterSubmit})(SendMessageTable);


const MessageforTable = (props) => {
    const onSubmit = (values) => {

debugger
        props.addMessageTableThunk(props.messag.MessageName, values.textArea);
    }
    return <AddMesageForTable messag={props.messag} onSubmit={onSubmit}/>
}
export default MessageforTable;

