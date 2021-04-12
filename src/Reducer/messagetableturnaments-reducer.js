import {textMessageTablesTurnaments} from "../API/Api";


const MESSAGE_TABLE_TURNAMENTS = "MESSAGE_TABLE_TURNAMENTS";
const MESSAGE_TABLE_TURNAMENTS_NAME = "MESSAGE_TABLE_TURNAMENTS_NAME";


let initialization = {

    Result: '',
    TournametsName:''
};

let AddMessageTableTurnamentsReducer = (state = initialization, action) => {
    switch (action.type) {
        case MESSAGE_TABLE_TURNAMENTS:
            return {
                ...state,
                Result: action.result
            };
        case MESSAGE_TABLE_TURNAMENTS_NAME:
            return {
                ...state,
                TournametsName: action.name
            };

        default:
            return state;
    }
}

export let addMessageForTableTurnaments = (result) => ({type: MESSAGE_TABLE_TURNAMENTS,  result});
export let addMessageForTableTurnamentsName = (name) => ({type: MESSAGE_TABLE_TURNAMENTS_NAME, name});


export const addMessageTableTournamentsThunk = (name, message) =>
    async (dispatch) => {

        let response = await textMessageTablesTurnaments.messageTextTurnamentsForApi(name, message);
        if (response.data.Result === "ok") {
            dispatch(addMessageForTableTurnaments(response.data.Result));

        }
    }

export default AddMessageTableTurnamentsReducer;
