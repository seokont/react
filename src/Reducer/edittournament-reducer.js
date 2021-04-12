import {editTurnaments, getOneTournaments} from "../API/Api";
import {eddTablThunk} from "./edittable-reducer";


const EDIT_TOURNAMENT = "EDIT_TOURNAMENT";
const EDIT_TOURNAMENTS_RESULT_OK = "EDIT_TOURNAMENTS_RESULT_OK";
const NAME_OK_TOURNAMENTS = "NAME_OK_TOURNAMENTS";
const EDIT_TOURNAMENTS_RESULT_OK_NULL = "EDIT_TOURNAMENTS_RESULT_OK_NULL";


let initialization = {
    Error: '',
    Object: {},
    Result: ''

};

let EditTournamentsReducer = (state = initialization, action) => {
    switch (action.type) {
        case EDIT_TOURNAMENT:
            return {
                ...state,
                Error: action.result
            };


        case NAME_OK_TOURNAMENTS:
            return {

                ...state,
                Object: action.object,

            };

        case EDIT_TOURNAMENTS_RESULT_OK:
            return {

                ...state,
                Result: action.result
            };
        case EDIT_TOURNAMENTS_RESULT_OK_NULL:
            return {

                ...state,
                Result: action.result
            };




        default:
            return state;
    }
}

export let editTForGames = (result) => ({type: EDIT_TOURNAMENT,  result});
export let editTForGamesResult = (result) => ({type: EDIT_TOURNAMENTS_RESULT_OK,  result});
export let eddTournThunk = (object) => ({type: NAME_OK_TOURNAMENTS, object});
export let editTForGamesResultNull = (result) => ({type: EDIT_TOURNAMENTS_RESULT_OK_NULL, result});



export const editTournamentsThunk = (args) =>
    async (dispatch) => {
        let response = await editTurnaments.editTurnamentsForApi(args);
        if (response.data.Result === "Error") {
            dispatch(editTForGames(response.data.Error));
            dispatch(editTForGamesResult(response.data.Result));
        } else {
            dispatch(editTForGamesResult(response.data.Result));
            dispatch(editTForGames(''));
        }
    }



export const getTournamentsOneThunk = (name) =>
    async (dispatch) => {

        let response = await getOneTournaments.getTournamentsOneApi(name);
        if (response.status === 200) {
            dispatch(eddTournThunk(response.data));

        }
    }


export default EditTournamentsReducer;
