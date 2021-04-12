import {editTableApiGames, getOneGames} from "../API/Api";



const EDIT_TABLE = "EDIT_TABLE";
const EDIT_TABLE_RESULT_OK = "EDIT_TABLE_RESULT_OK";
const NAME_OK = "NAME_OK";
const EDIT_TABLE_RESULT_OK_NULL = "EDIT_TABLE_RESULT_OK_NULL";

let initialization = {
    Error: '',
    Object: {},
    Result: ''

};

let EditTableReducer = (state = initialization, action) => {
    switch (action.type) {
        case EDIT_TABLE:
            return {
                ...state,
                Error: action.result
            };

        case NAME_OK:
            return {

                ...state,
                Object: action.object,

            };

        case EDIT_TABLE_RESULT_OK:
            return {

                ...state,
                Result: action.result
            };

        case EDIT_TABLE_RESULT_OK_NULL:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let editTableForGames = (result) => ({type: EDIT_TABLE, result});
export let editTableForGamesResult = (result) => ({type: EDIT_TABLE_RESULT_OK, result});
export let editTableForGamesResultNull = (result) => ({type: EDIT_TABLE_RESULT_OK_NULL, result});
export let eddTablThunk = (object) => ({type: NAME_OK, object});


export const editTableThunk = (args) =>
    async (dispatch) => {

        let response = await editTableApiGames.editTableForApi(args);
        if (response.data.Result === "Error") {
            dispatch(editTableForGames(response.data.Error));
            dispatch(editTableForGamesResult(response.data.Result));
        } else {
            dispatch(editTableForGamesResult(response.data.Result));
            dispatch(editTableForGames(''));
        }
    }

export const getGameOneThunk = (name) =>
    async (dispatch) => {

        let response = await getOneGames.getGamesOneApi(name);
        if (response.status === 200) {
            dispatch(eddTablThunk(response.data));

        }
    }


export default EditTableReducer;
