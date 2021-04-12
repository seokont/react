import {textMessageTables} from "../API/Api";


const MESSAGE_TABLE_NAME = "MESSAGE_TABLE_NAME";
const MESSAGE_TABLE = "MESSAGE_TABLE";


let initialization = {

    Result:'',
    MessageName:''
};

let AddMessageTableReducer = (state = initialization, action) => {
    switch (action.type) {
        case MESSAGE_TABLE:
            return {
                ...state,
                Result: action.result
            };
            case MESSAGE_TABLE_NAME:
            return {
                ...state,
                MessageName: action.name
            };


        default:
            return state;
    }
}

export let addMessageForTable = (result) => ({type: MESSAGE_TABLE, result});
export let addMessageForTableName = (name) => ({type: MESSAGE_TABLE_NAME, name});


export const addMessageTableThunk=(name,message)=>
    async (dispatch)=>{

        let response = await textMessageTables.messageTextGamesForApi(name,message);
        if (response.data.Result === "ok") {
            dispatch(addMessageForTable(response.data.Result));

        }
    }

export default AddMessageTableReducer;
