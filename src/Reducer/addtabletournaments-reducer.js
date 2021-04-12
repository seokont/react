import {addTurnaments} from "../API/Api";


const ADD_TABLE_TOURNAMENTS = "ADD_TABLE_TOURNAMENTS";
const ADD_TURNAMENTS_RESULT_OK = "ADD_TURNAMENTS_RESULT_OK";
const MIXED_ADD = "MIXED_ADD";

let initialization = {
    Error:'',
    Result:'',
    Mixed:''
};

let AddTableTurnamentsReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_TABLE_TOURNAMENTS:
            return {

                ...state,
                Error: action.result
            };

        case ADD_TURNAMENTS_RESULT_OK:
            return {

                ...state,
                Result: action.result
            };
        case MIXED_ADD:
            return {
                ...state,
                Mixed: action.value
            };


        default:
            return state;
    }
}

export let addTableForTurnaments = (result) => ({type: ADD_TABLE_TOURNAMENTS, result:result});
export let addTableForTurnamentsResult = (result) => ({type: ADD_TURNAMENTS_RESULT_OK, result:result});
export let mixedThunk = (value) => ({type: MIXED_ADD, value});

export const addTurnamentsThunk=(args)=>
    async (dispatch)=>{
debugger
        let response = await addTurnaments.addTurnamentsForApi(args);

        if (response.data.Result === "Error") {
            dispatch(addTableForTurnaments(response.data.Error));
            dispatch(addTableForTurnamentsResult(response.data.Result));
        } else{
            dispatch(addTableForTurnamentsResult(response.data.Result));
            dispatch(addTableForTurnaments(''));
        }
    }

export default AddTableTurnamentsReducer;
