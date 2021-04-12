import {addPlayer} from "../API/Api";


const ADD_PLAYER = "ADD_PLAYER";
const ADD_PLAYER_RESULT_OK = "ADD_PLAYER_RESULT_OK";

let initialization = {
    Error:'',
    Result:''
};

let AddPlayerReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return {

                ...state,
                Error: action.result
            };

        case ADD_PLAYER_RESULT_OK:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let addPlayerForGames = (result) => ({type: ADD_PLAYER, result:result});
export let addPlayerForGamesResult = (result) => ({type: ADD_PLAYER_RESULT_OK, result:result});

export const addPlayerThunk=(args)=>
    async (dispatch)=>{
        let response = await addPlayer.addPlayerForApi(args);
        if (response.data.Result === "Error") {
            dispatch(addPlayerForGames(response.data.Error));
            dispatch(addPlayerForGamesResult(response.data.Result));
        } else{
            dispatch(addPlayerForGamesResult(response.data.Result));
            dispatch(addPlayerForGames(''));
        }
    }

export default AddPlayerReducer;
