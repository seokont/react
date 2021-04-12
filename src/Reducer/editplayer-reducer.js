import {editPlayer} from "../API/Api";


const EDIT_PLAYER = "EDIT_PLAYER";
const EDIT_TABLE_RESULT_PLAYER_OK = "EDIT_TABLE_RESULT_PLAYER_OK";
const PLAYER_OK = "PLAYER_OK";
const EDIT_TABLE_RESULT_PLAYER_OK_NULL = "EDIT_TABLE_RESULT_PLAYER_OK_NULL";

let initialization = {
    Error: '',
    Object: {},
    Result: ''

};

let EditPlayerReducer = (state = initialization, action) => {
    switch (action.type) {
        case EDIT_PLAYER:
            return {
                ...state,
                Error: action.result
            };

        case PLAYER_OK:
            return {

                ...state,
                Object: action.object,

            };

        case EDIT_TABLE_RESULT_PLAYER_OK:
            return {

                ...state,
                Result: action.result
            };

        case EDIT_TABLE_RESULT_PLAYER_OK_NULL:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let editPlayerForGames = (result) => ({type: EDIT_PLAYER,  result});
export let editPlayerResult = (result) => ({type: EDIT_TABLE_RESULT_PLAYER_OK,  result});
export let editPlayerResultNull = (result) => ({type: EDIT_TABLE_RESULT_PLAYER_OK_NULL,  result});
export let eddPlayerThunk = (object) => ({type: PLAYER_OK, object});


export const editPlayerThunk = (args) =>
    async (dispatch) => {

        let response = await editPlayer.editPlayerForApi(args);
        if (response.data.Result === "Error") {
            dispatch(editPlayerForGames(response.data.Error));
            dispatch(editPlayerResult(response.data.Result));
        } else {
            dispatch(editPlayerResult(response.data.Result));
            dispatch(editPlayerForGames(''));
        }
    }









export const editPlayerThunkByObject = (name) =>
    async (dispatch) => {

        let response = await editPlayer.getOnePlayer(name);
        if (response.data.Result === "Ok") {

            dispatch(eddPlayerThunk(response.data));
        }
    }

export default EditPlayerReducer;
