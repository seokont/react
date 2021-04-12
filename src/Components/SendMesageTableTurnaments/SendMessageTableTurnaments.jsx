import React from "react";
import {Field, reduxForm, reset} from "redux-form";



const SendMessageTableTurnaments = (props) => {

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
    dispatch(reset('addMessageTournaments'));
}

let AddMesageForTableTournaments = reduxForm({
    form: 'addMessageTournaments',
    onSubmitSuccess: afterSubmit
})(SendMessageTableTurnaments);

const MessageforTableTournaments = (props) => {
    const onSubmit = (values) => {
        props.addMessageTableTournamentsThunk(props.messag.TournametsName, values.textArea);
    }
    return <AddMesageForTableTournaments messag={props.messag} onSubmit={onSubmit}/>
}
export default MessageforTableTournaments;

